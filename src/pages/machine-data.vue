<template>
  <v-container fluid class="pa-6 pa-md-8">
    <!-- หน้าฟอร์มควบคุมและวิเคราะห์ข้อมูล Sifter -->
    <AnalysisForm
      :machine="machineInfo"
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
import AnalysisForm from "@/components/AnalysisForm.vue";
import type { Machine, AnalysisFormData } from "@/types/machine";

const router = useRouter();
const isAnalyzing = ref(false);

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

// ส่งข้อมูลวิเคราะห์
const handleAnalyze = async (data: AnalysisFormData) => {
  isAnalyzing.value = true;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  isAnalyzing.value = false;

  sessionStorage.setItem(
    "analysisResult",
    JSON.stringify({
      machine: machineInfo,
      formData: data,
      analyzedAt: new Date().toISOString(),
    }),
  );

  router.push("/analysis-result");
};
</script>
