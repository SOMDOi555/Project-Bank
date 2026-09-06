<template>
  <div>
    <!-- Page Header with Breadcrumb info -->
    <div class="d-flex justify-space-between align-center mb-6">
      <div>
        <h1 class="page-title">Sifter Control Result</h1>
        <div class="d-flex align-center ga-3 mt-2 flex-wrap">
          <v-chip size="small" color="primary" variant="flat" class="font-mono">
            ID: {{ result?.machine?.id ? `MC-00${result.machine.id}` : 'MC-001' }}
          </v-chip>
          <div class="d-flex align-center ga-1 text-grey">
            <v-icon size="14">mdi-calendar</v-icon>
            <span class="meta-text">{{ analyzedDate }}</span>
          </div>
        </div>
      </div>
      <v-btn
        variant="outlined"
        color="grey-darken-2"
        rounded="lg"
        prepend-icon="mdi-arrow-left"
        size="small"
        @click="emit('back')"
      >
        กลับไปวิเคราะห์ใหม่
      </v-btn>
    </div>

    <!-- Top Cards Row: Bulk Density, Current Sifter, Recommendation -->
    <v-row class="mb-6">
      <!-- Bulk Density Result -->
      <v-col cols="12" md="4">
        <v-card rounded="lg" elevation="0" class="result-card h-100">
          <v-card-text class="pa-6 text-center">
            <div class="d-flex align-center ga-2 mb-4">
              <v-icon color="primary" size="18">mdi-google-analytics</v-icon>
              <span class="section-title">Bulk Density</span>
            </div>

            <div class="gauge-container mb-4">
              <v-progress-circular
                :model-value="bulkDensityPercent"
                :size="130"
                :width="12"
                :color="isNormal ? 'success' : 'error'"
                bg-color="#e2e8f0"
              >
                <div>
                  <div class="gauge-value">{{ bulkDensityDisplay }}</div>
                  <div :class="['gauge-status', isNormal ? 'gauge-status--normal' : 'gauge-status--critical']">
                    <v-icon
                      :icon="isNormal ? 'mdi-check-bold' : 'mdi-close-thick'"
                      size="12"
                      class="me-1"
                    />
                    <span>{{ isNormal ? 'ปกติ' : 'ผิดปกติ' }}</span>
                  </div>
                </div>
              </v-progress-circular>
            </div>

            <p class="result-desc d-flex align-center justify-center ga-1">
              <v-icon
                :icon="isNormal ? 'mdi-check-circle' : 'mdi-close-circle'"
                :color="isNormal ? 'success' : 'error'"
                size="16"
              />
              <span>{{ isNormal ? 'ค่า Bulk Density อยู่ในเกณฑ์ปกติ' : 'ค่า Bulk Density อยู่ในเกณฑ์ผิดปกติ' }}</span>
            </p>
            <p class="result-desc-sub">
              ช่วงปกติ: 39.00 – 43.00
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Analysis Input Data (Form Data Summary) -->
      <v-col cols="12" md="4">
        <v-card rounded="lg" elevation="0" class="result-card h-100">
          <v-card-text class="pa-6">
            <div class="d-flex align-center justify-space-between mb-4">
              <div class="d-flex align-center ga-2">
                <v-icon color="primary" size="20">mdi-clipboard-text-outline</v-icon>
                <span class="section-title">ข้อมูลที่ใช้ในการวิเคราะห์</span>
              </div>
              <v-chip size="small" variant="tonal" color="primary" class="font-weight-medium">
                Input Data
              </v-chip>
            </div>

            <div class="input-data-container">
              <!-- 1. Product -->
              <div class="input-group-section">
                <div class="input-group-header">
                  <v-icon size="16" color="primary" class="me-1">mdi-package-variant-closed</v-icon>
                  <span>1. Product</span>
                </div>
                <div class="input-grid">
                  <div class="input-item">
                    <span class="input-item-label">Lot</span>
                    <span class="input-item-val">{{ result?.formData?.lot || '—' }}</span>
                  </div>
                  <div class="input-item">
                    <span class="input-item-label">Thickness</span>
                    <span class="input-item-val">
                      {{ result?.formData?.thickness ?? '—' }}
                      <span v-if="result?.formData?.thickness" class="input-item-unit">mm</span>
                    </span>
                  </div>
                  <div class="input-item">
                    <span class="input-item-label">Product</span>
                    <span class="input-item-val">{{ result?.formData?.product || '—' }}</span>
                  </div>
                </div>
              </div>

              <!-- 2. Fiber Condition -->
              <div class="input-group-section">
                <div class="input-group-header">
                  <v-icon size="16" color="primary" class="me-1">mdi-water-percent</v-icon>
                  <span>2. Fiber Condition</span>
                </div>
                <div class="input-grid">
                  <div class="input-item">
                    <span class="input-item-label">Weight</span>
                    <span class="input-item-val">
                      {{ result?.formData?.weight || '—' }}
                      <span v-if="result?.formData?.weight" class="input-item-unit">g</span>
                    </span>
                  </div>
                  <div class="input-item">
                    <span class="input-item-label">Volume</span>
                    <span class="input-item-val">
                      {{ result?.formData?.volume || '—' }}
                      <span v-if="result?.formData?.volume" class="input-item-unit">ml</span>
                    </span>
                  </div>
                  <div class="input-item">
                    <span class="input-item-label">ความชื้น (%MC)</span>
                    <span class="input-item-val">
                      {{ result?.formData?.moisture || '—' }}
                      <span v-if="result?.formData?.moisture" class="input-item-unit">%</span>
                    </span>
                  </div>
                </div>
              </div>

              <!-- 3. Sifter Condition -->
              <div class="input-group-section">
                <div class="input-group-header">
                  <v-icon size="16" color="primary" class="me-1">mdi-tune-vertical</v-icon>
                  <span>3. Sifter Condition</span>
                </div>
                <div class="input-grid input-grid--4">
                  <div class="input-item">
                    <span class="input-item-label">Circulate</span>
                    <span class="input-item-val">
                      {{ result?.formData?.circulate || '—' }}
                      <span v-if="result?.formData?.circulate" class="input-item-unit">%</span>
                    </span>
                  </div>
                  <div class="input-item">
                    <span class="input-item-label">Pressure</span>
                    <span class="input-item-val">
                      {{ result?.formData?.pressure || '—' }}
                      <span v-if="result?.formData?.pressure" class="input-item-unit">%</span>
                    </span>
                  </div>
                  <div class="input-item">
                    <span class="input-item-label">Damper 1</span>
                    <span class="input-item-val">
                      {{ result?.formData?.damper1 ?? '—' }}
                      <span v-if="result?.formData?.damper1" class="input-item-unit">mm</span>
                    </span>
                  </div>
                  <div class="input-item">
                    <span class="input-item-label">Damper 2</span>
                    <span class="input-item-val">
                      {{ result?.formData?.damper2 ?? '—' }}
                      <span v-if="result?.formData?.damper2" class="input-item-unit">mm</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Recommendation -->
      <v-col cols="12" md="4">
        <v-card rounded="lg" elevation="0" class="result-card result-card--purple h-100">
          <v-card-text class="pa-6">
            <div class="d-flex align-center ga-2 mb-4">
              <div class="rec-icon">
                <v-icon color="primary" size="20">mdi-lightbulb</v-icon>
              </div>
              <span class="section-title">Recommendation</span>
            </div>

            <p class="rec-text mb-4">
              <template v-if="isNormal">
                <v-icon color="success" size="18" class="me-1">mdi-check-circle</v-icon>
                Bulk Density อยู่ในเกณฑ์ปกติ สามารถดำเนินการผลิตต่อได้ตามปกติ
              </template>
              <template v-else>
                <v-icon color="error" size="18" class="me-1">mdi-close-circle</v-icon>
                ค่า Bulk Density ผิดปกติ แนะนำให้ปรับ Control Sifter จาก
                <strong>{{ result?.currentCombination }}</strong>
                เป็น
                <strong>{{ result?.recommendedControlSifter }}</strong>
                (ลด {{ result?.reductionLevel }} คู่)
              </template>
            </p>

            <v-btn
              color="primary"
              variant="flat"
              block
              rounded="lg"
              prepend-icon="mdi-check-circle-outline"
            >
              Acknowledge
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SifterAnalysisResult } from '@/types/machine'

const props = defineProps<{
  result: SifterAnalysisResult | null
}>()

const emit = defineEmits<{
  (e: 'back'): void
}>()

const analyzedDate = computed(() => {
  if (!props.result?.analyzedAt) return '—'
  const d = new Date(props.result.analyzedAt)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()
})

const isNormal = computed(() => props.result?.bulkDensityStatus === 'normal')

const bulkDensityDisplay = computed(() => {
  if (!props.result) return '—'
  return props.result.bulkDensity.toFixed(2)
})

/** แสดงเป็น % สำหรับ gauge: map ช่วง 39–52 → 0–100 */
const bulkDensityPercent = computed(() => {
  if (!props.result) return 0
  const bd = props.result.bulkDensity
  return Math.min(100, Math.max(0, ((bd - 39) / (52 - 39)) * 100))
})
</script>

<style scoped>
.page-title {
  font-size: 28px;
  font-weight: 800;
  color: #1e293b;
}

.meta-text {
  font-size: 13px;
  color: #64748b;
}

.font-mono {
  font-family: 'JetBrains Mono', monospace !important;
}

/* --- Result Cards --- */
.result-card {
  border: 1px solid #e2e8f0;
}

.result-card--purple {
  background: #f5f3ff;
  border-color: #ddd6fe;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
}

/* --- Gauge --- */
.gauge-container {
  display: flex;
  justify-content: center;
}

.gauge-value {
  font-size: 26px;
  font-weight: 800;
  color: #1e293b;
  line-height: 1;
  text-align: center;
}

.gauge-status {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-align: center;
  padding: 2px 8px;
  border-radius: 4px;
  margin-top: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.gauge-status--normal { background: #dcfce7; color: #15803d; }
.gauge-status--warning { background: #fef3c7; color: #d97706; }
.gauge-status--critical { background: #ffe4e6; color: #be123c; }

.result-desc {
  font-size: 13px;
  color: #475569;
  margin-bottom: 2px;
}

.result-desc-sub {
  font-size: 12px;
  color: #94a3b8;
}

/* --- Input Data Summary Card --- */
.input-data-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-group-section {
  background: #f8fafc;
  border-radius: 8px;
  padding: 10px 14px;
  border: 1px solid #f1f5f9;
}

.input-group-header {
  font-size: 14px;
  font-weight: 700;
  color: #334155;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.input-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.input-grid--4 {
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 16px;
}

.input-item {
  display: flex;
  flex-direction: column;
}

.input-item-label {
  font-size: 13px;
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
  font-size: 13px;
  font-weight: 400;
  color: #64748b;
  margin-left: 2px;
}

/* --- Recommendation --- */
.rec-icon {
  width: 36px;
  height: 36px;
  background: #ede9ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rec-text {
  font-size: 13px;
  color: #475569;
  line-height: 1.6;
}
</style>
