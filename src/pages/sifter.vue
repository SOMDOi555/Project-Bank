<template>
  <v-container fluid class="pa-6 pa-md-8">
    <transition name="fade" mode="out-in">
      <!-- 1. หน้าฟอร์มควบคุมและวิเคราะห์ข้อมูล Sifter -->
      <AnalysisForm
        v-if="!showResult"
        :machine="machineInfo"
        @back="goBack"
        @submit="handleAnalyze"
      />

      <!-- 2. หน้าแสดงผลลัพธ์ -->
      <AnalysisResult
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
import AnalysisForm from "@/components/AnalysisForm.vue";
import AnalysisResult from "@/components/AnalysisResult.vue";
import { analyzeSifter } from "@/utils/sifter";
import type { Machine, AnalysisFormData, SifterAnalysisResult } from "@/types/machine";

const router = useRouter();
const isAnalyzing = ref(false);
const showResult = ref(false);
const analysisResult = ref<SifterAnalysisResult | null>(null);

const machineInfo: Machine = {
  id: 1,
  name: "Control Sifter",
  icon: "mdi-filter-cog",
  color: "primary",
};

// กดย้อนกลับไปหน้าแรก (Home Portal)
const goBack = () => {
  router.push("/");
};

// เลื่อนหน้าจอกลับขึ้นด้านบนสุด
const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  document.querySelector('.v-main')?.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
};

// กลับจากหน้าแสดงผลลัพธ์มาที่ฟอร์ม
const handleBackToForm = () => {
  showResult.value = false;
  scrollToTop();
};

// ส่งข้อมูลวิเคราะห์
const handleAnalyze = async (data: AnalysisFormData) => {
  isAnalyzing.value = true;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  isAnalyzing.value = false;

  // คำนวณ Sifter Analysis
  const weight = Number(data.weight);
  const volume = Number(data.volume);
  const circulate = Number(data.circulate);
  const pressure = Number(data.pressure);

  const sifterResult = analyzeSifter(weight, volume, circulate, pressure);

  analysisResult.value = {
    machine: machineInfo,
    formData: data,
    analyzedAt: new Date().toISOString(),
    bulkDensity: sifterResult.bulkDensity,
    bulkDensityStatus: sifterResult.bulkDensityStatus,
    currentCombination: sifterResult.currentCombination,
    reductionLevel: sifterResult.reductionLevel,
    recommendedControlSifter: sifterResult.recommendedControlSifter,
  };

  showResult.value = true;
  scrollToTop();
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
