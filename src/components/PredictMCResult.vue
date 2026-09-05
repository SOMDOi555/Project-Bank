<template>
  <div class="predict-mc-result-view">
    <!-- Page Header -->
    <div class="d-flex justify-space-between align-center mb-6 flex-wrap ga-3">
      <div>
        <h1 class="page-title">Predict %MC Forming Result</h1>
        <div class="d-flex align-center ga-3 mt-2 flex-wrap">
          <v-chip size="small" color="primary" variant="flat" class="font-mono">
            ID: MC-PREDICT
          </v-chip>
          <div class="d-flex align-center ga-1 text-grey">
            <v-icon size="14">mdi-calendar-clock</v-icon>
            <span class="meta-text">{{ analyzedDate }}</span>
          </div>
        </div>
      </div>
      <v-btn
        variant="outlined"
        color="grey-darken-2"
        rounded="lg"
        prepend-icon="mdi-arrow-left"
        size="large"
        @click="emit('back')"
      >
        กลับไปวิเคราะห์ใหม่
      </v-btn>
    </div>

    <!-- Cards Row: แสดงเฉพาะค่าเปอร์เซ็นต์ MC ที่คำนวณได้ และ ค่า Input ที่กรอกเข้าไป -->
    <v-row>
      <!-- 1. คอลัมน์ซ้าย: ค่า %MC ที่คำนวณได้ -->
      <v-col cols="12" lg="5" md="6">
        <v-card rounded="lg" elevation="0" class="result-card h-100">
          <v-card-text class="pa-6 text-center d-flex flex-column justify-space-between h-100">
            <div>
              <div class="d-flex align-center justify-center ga-2 mb-4">
                <span class="section-title">ค่า %MC ที่ทำนายได้</span>
              </div>

              <!-- Icon แสดงสัญลักษณ์ความชื้น (%MC) ตามตัวอย่าง -->
              <div class="mc-icon-container my-6">
                <div class="mc-icon-circle">
                  <svg
                    viewBox="0 0 100 100"
                    class="mc-drop-svg"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <!-- droplet outline -->
                    <path
                      d="M 50 22 C 50 22 31 46 31 61 C 31 72 39.5 80 50 80 C 60.5 80 69 72 69 61 C 69 46 50 22 50 22 Z"
                      stroke="#16a34a"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <!-- % symbol -->
                    <circle cx="43.5" cy="51.5" r="3.2" stroke="#16a34a" stroke-width="2.8" />
                    <line x1="57" y1="47" x2="43" y2="67" stroke="#16a34a" stroke-width="3" stroke-linecap="round" />
                    <circle cx="56.5" cy="62.5" r="3.2" stroke="#16a34a" stroke-width="2.8" />
                  </svg>
                </div>
              </div>

              <!-- แสดงค่า %MC ที่คำนวณได้ -->
              <div class="mb-3">
                <div class="d-flex align-baseline justify-center ga-2">
                  <span class="mc-value-display font-weight-bold text-primary">
                    {{ mcValue2 }} %
                  </span>
                </div>
              </div>

            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 2. คอลัมน์ขวา: ค่า Input ที่กรอกเข้าไป -->
      <v-col cols="12" lg="7" md="6">
        <v-card rounded="lg" elevation="0" class="result-card h-100">
          <v-card-text class="pa-6">
            <div class="d-flex align-center justify-space-between mb-4">
              <div class="d-flex align-center ga-2">
                <v-icon color="primary" size="22">mdi-clipboard-text-outline</v-icon>
                <span class="section-title">ข้อมูลที่ใช้ในการวิเคราะห์</span>
              </div>
              <v-chip size="small" variant="tonal" color="primary" class="font-weight-medium">
                Input Data
              </v-chip>
            </div>

            <div class="input-data-container">

              <!-- หมวดที่ 2: ข้อมูลวิเคราะห์ -->
              <div class="input-group-section">
                <div class="input-group-header">
                  <v-icon size="16" color="primary" class="me-1">mdi-tune-variant</v-icon>
                  <span>2. ข้อมูลวิเคราะห์</span>
                </div>
                <div class="input-grid input-grid--analysis">
                  <div class="input-item">
                    <span class="input-item-label">1. Temp dryer inlet</span>
                    <span class="input-item-val">
                      {{ result?.formData?.tempDryerInlet || '—' }}
                      <span v-if="result?.formData?.tempDryerInlet" class="input-item-unit">°C</span>
                    </span>
                  </div>
                  <div class="input-item">
                    <span class="input-item-label">2. Temp dryer outlet</span>
                    <span class="input-item-val">
                      {{ result?.formData?.tempDryerOutlet || '—' }}
                      <span v-if="result?.formData?.tempDryerOutlet" class="input-item-unit">°C</span>
                    </span>
                  </div>
                  <div class="input-item">
                    <span class="input-item-label">3. Temp fiber dryer</span>
                    <span class="input-item-val">
                      {{ result?.formData?.tempFiberDryer || '—' }}
                      <span v-if="result?.formData?.tempFiberDryer" class="input-item-unit">°C</span>
                    </span>
                  </div>
                  <div class="input-item">
                    <span class="input-item-label">4. Scalper</span>
                    <span class="input-item-val">
                      {{ result?.formData?.scalper || '—' }}
                      <span v-if="result?.formData?.scalper" class="input-item-unit">mm</span>
                    </span>
                  </div>
                  <div class="input-item">
                    <span class="input-item-label">5. Bulk</span>
                    <span class="input-item-val">
                      {{ result?.formData?.bulk || '—' }}
                      <span v-if="result?.formData?.bulk" class="input-item-unit">kg/m³</span>
                    </span>
                  </div>
                  <div class="input-item">
                    <span class="input-item-label">6. Temp ambient</span>
                    <span class="input-item-val">
                      {{ result?.formData?.tempAmbient || '—' }}
                      <span v-if="result?.formData?.tempAmbient" class="input-item-unit">°C</span>
                    </span>
                  </div>
                  <div class="input-item">
                    <span class="input-item-label">7. RH</span>
                    <span class="input-item-val">
                      {{ result?.formData?.rh || '—' }}
                      <span v-if="result?.formData?.rh" class="input-item-unit">%</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { formatMC } from "@/utils/predictMC";
import type { PredictMCAnalysisResult } from "@/types/predictMC";

interface Props {
  result: PredictMCAnalysisResult | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "back"): void;
}>();

// จัดรูปแบบวันที่วิเคราะห์
const analyzedDate = computed(() => {
  if (!props.result?.analyzedAt) return "—";
  try {
    const d = new Date(props.result.analyzedAt);
    return d.toLocaleString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return props.result.analyzedAt;
  }
});

// ค่า %MC ทศนิยม 2 ตำแหน่ง
const mcValue2 = computed(() => {
  return formatMC(props.result?.predictedMC, 2);
});

// ค่า %MC ทศนิยม 3 ตำแหน่ง
const mcValue3 = computed(() => {
  return formatMC(props.result?.predictedMC, 3);
});
</script>

<style scoped>
.predict-mc-result-view {
  width: 100%;
}

.page-title {
  font-size: 24px;
  font-weight: 800;
  color: #1e293b;
  margin: 0;
}

.font-mono {
  font-family: 'JetBrains Mono', monospace !important;
}

.meta-text {
  font-size: 13px;
  color: #64748b;
}

/* Card Styling ตาม analysis-result.vue */
.result-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
}

/* Water Droplet Icon ตามตัวอย่าง */
.mc-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mc-icon-circle {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-color: #edf6ef;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(22, 163, 74, 0.08);
}

.mc-drop-svg {
  width: 76px;
  height: 76px;
}

.mc-value-display {
  font-size: 38px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.mc-unit-display {
  font-size: 18px;
  font-weight: 700;
  margin-top: 4px;
}

.result-desc {
  font-size: 14px;
  color: #334155;
  font-weight: 600;
}

.result-desc-sub {
  font-size: 12px;
  color: #94a3b8;
  margin: 0;
}

.mc-summary-box {
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #edf2f7;
}

/* Input Data Summary Card */
.input-data-container {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.input-group-section {
  background: #f8fafc;
  border-radius: 8px;
  padding: 12px 16px;
  border: 1px solid #f1f5f9;
}

.input-group-header {
  font-size: 14px;
  font-weight: 700;
  color: #334155;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.input-grid {
  display: grid;
  gap: 12px;
}

.input-grid--4 {
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
}

.input-grid--analysis {
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

.input-item {
  display: flex;
  flex-direction: column;
}

.input-item-label {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
  margin-bottom: 2px;
}

.input-item-val {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.3;
}

.input-item-unit {
  font-size: 12px;
  font-weight: 500;
  color: #64748b;
  margin-left: 3px;
}
</style>
