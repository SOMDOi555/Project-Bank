<template>
  <v-container fluid class="pa-6 pa-md-8">
    <transition name="fade" mode="out-in">
      <!-- 1. หน้าฟอร์ม Predict %MC Forming -->
      <PredictMCForm
        v-if="!showResult"
        @back="goBack"
        @submit="handleAnalyze"
      />

      <!-- 2. หน้าแสดงผลลัพธ์ Predict %MC Forming -->
      <PredictMCResult
        v-else
        :result="analysisResult"
        @back="handleBackToForm"
      />
    </transition>

    <!-- Loading Overlay สำหรับการประมวลผล -->
    <LoadingOverlay v-model="isAnalyzing" />
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import PredictMCForm from "@/components/PredictMCForm.vue";
import PredictMCResult from "@/components/PredictMCResult.vue";
import { useSwal } from "@/plugins/sweetalert";
import { analyzePredictMC, formatMC } from "@/utils/predictMC";
import type { PredictMCFormData, PredictMCAnalysisResult } from "@/types/predictMC";

const router = useRouter();
const swal = useSwal();
const isAnalyzing = ref(false);
const showResult = ref(false);
const analysisResult = ref<PredictMCAnalysisResult | null>(null);

// กดย้อนกลับไปหน้าแรก (Home Portal)
const goBack = () => {
  router.push("/");
};

// กลับจากหน้าแสดงผลลัพธ์มาที่ฟอร์ม
const handleBackToForm = () => {
  showResult.value = false;
};

// ส่งข้อมูลวิเคราะห์
const handleAnalyze = async (data: PredictMCFormData) => {
  isAnalyzing.value = true;
  // จำลองเวลาในการประมวลผล
  await new Promise((resolve) => setTimeout(resolve, 1500));
  isAnalyzing.value = false;

  // คำนวณจาก utils/predictMC.ts ที่รวบรวม logic ไว้ที่เดียว
  const result = analyzePredictMC(data);
  analysisResult.value = result;

  sessionStorage.setItem("predictMCResult", JSON.stringify(result));
  showResult.value = true;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
