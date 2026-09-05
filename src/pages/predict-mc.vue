<template>
  <v-container fluid class="pa-6 pa-md-8">
    <!-- หน้าฟอร์ม Predict %MC Forming -->
    <PredictMCForm
      @back="goBack"
      @submit="handleAnalyze"
    />

    <!-- Loading Overlay สำหรับการประมวลผล -->
    <LoadingOverlay v-model="isAnalyzing" />
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import PredictMCForm from "@/components/PredictMCForm.vue";
import { useSwal } from "@/plugins/sweetalert";
import type { PredictMCFormData, PredictMCAnalysisResult } from "@/types/predictMC";

const router = useRouter();
const swal = useSwal();
const isAnalyzing = ref(false);

// กดย้อนกลับไปหน้าแรก (Home Portal)
const goBack = () => {
  router.push("/");
};

// ส่งข้อมูลวิเคราะห์
const handleAnalyze = async (data: PredictMCFormData) => {
  isAnalyzing.value = true;
  // จำลองเวลาในการประมวลผล
  await new Promise((resolve) => setTimeout(resolve, 1500));
  isAnalyzing.value = false;

  const result: PredictMCAnalysisResult = {
    formData: data,
    analyzedAt: new Date().toISOString(),
    predictedMC: 11.25, // Mock prediction result
  };

  sessionStorage.setItem("predictMCResult", JSON.stringify(result));
  swal.success(
    "ส่งข้อมูลวิเคราะห์สำเร็จ",
    `บันทึกข้อมูลทำนาย %MC Forming เรียบร้อย (Thickness: ${data.thickness} mm)`
  );
};
</script>
