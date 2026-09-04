<template>
  <v-container fluid class="pa-6 pa-md-8">
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
        @click="router.push('/sifter')"
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
                :color="isNormal ? 'success' : 'warning'"
                bg-color="#e2e8f0"
              >
                <div>
                  <div class="gauge-value">{{ bulkDensityDisplay }}</div>
                  <div :class="['gauge-status', isNormal ? 'gauge-status--normal' : 'gauge-status--warning']">
                    {{ isNormal ? 'ปกติ' : 'ผิดปกติ' }}
                  </div>
                </div>
              </v-progress-circular>
            </div>

            <p class="result-desc">
              {{ isNormal ? 'ค่า Bulk Density อยู่ในเกณฑ์ปกติ' : 'ค่า Bulk Density อยู่ในเกณฑ์ผิดปกติ' }}
            </p>
            <p class="result-desc-sub">
              ช่วงปกติ: 39.00 – 43.00
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Current Sifter Combination -->
      <v-col cols="12" md="4">
        <v-card rounded="lg" elevation="0" class="result-card h-100">
          <v-card-text class="pa-6">
            <div class="d-flex align-center ga-2 mb-5">
              <v-icon color="primary" size="18">mdi-chart-donut</v-icon>
              <span class="section-title">Sifter Combination</span>
            </div>

            <template v-if="!isNormal && result">
              <div class="breakdown-item mb-4">
                <div class="d-flex justify-space-between mb-1">
                  <span class="breakdown-label">CURRENT COMBINATION</span>
                  <span class="breakdown-value breakdown-value--normal">{{ result.currentCombination }}</span>
                </div>
                <v-progress-linear
                  :model-value="currentCombinationProgress"
                  color="primary"
                  rounded
                  height="6"
                  bg-color="#e2e8f0"
                />
              </div>

              <div class="breakdown-item mb-4">
                <div class="d-flex justify-space-between mb-1">
                  <span class="breakdown-label">REDUCTION LEVEL</span>
                  <span class="breakdown-value breakdown-value--warning">{{ result.reductionLevel }} คู่</span>
                </div>
                <v-progress-linear
                  :model-value="(result.reductionLevel ?? 0) * 33.3"
                  color="warning"
                  rounded
                  height="6"
                  bg-color="#e2e8f0"
                />
              </div>

              <div class="breakdown-item">
                <div class="d-flex justify-space-between mb-1">
                  <span class="breakdown-label">RECOMMENDED</span>
                  <span class="breakdown-value breakdown-value--critical">{{ result.recommendedControlSifter }}</span>
                </div>
                <v-progress-linear
                  :model-value="recommendedCombinationProgress"
                  color="error"
                  rounded
                  height="6"
                  bg-color="#e2e8f0"
                />
              </div>
            </template>

            <template v-else>
              <div class="d-flex flex-column align-center justify-center" style="min-height: 120px;">
                <v-icon color="success" size="48" class="mb-3">mdi-check-circle-outline</v-icon>
                <p class="result-desc">ค่าปกติ ไม่ต้องปรับ Control Sifter</p>
              </div>
            </template>
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
                Bulk Density อยู่ในเกณฑ์ปกติ สามารถดำเนินการผลิตต่อได้ตามปกติ
              </template>
              <template v-else>
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

    <!-- Input Parameters Summary -->
    <div class="mb-2">
      <h2 class="section-heading mb-4">Input Parameters</h2>
    </div>
    <v-row class="mb-6">
      <v-col
        v-for="param in inputParams"
        :key="param.id"
        cols="12" sm="6" lg="3"
      >
        <v-card rounded="lg" elevation="0" class="sensor-card">
          <v-card-text class="pa-5">
            <div class="d-flex justify-space-between align-center mb-3">
              <div class="d-flex align-center ga-2">
                <v-icon size="16" color="grey-lighten-1">
                  {{ param.icon }}
                </v-icon>
                <span class="sensor-label">{{ param.label }}</span>
              </div>
              <div class="sensor-dot sensor-dot--normal"></div>
            </div>
            <div class="sensor-value">{{ param.value }} <span class="sensor-unit">{{ param.unit }}</span></div>
            <div class="sensor-status-text sensor-status-text--normal">{{ param.statusText }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { SifterAnalysisResult } from '@/types/machine'
import { SIFTER_COMBINATIONS } from '@/utils/sifter'

const router = useRouter()

// Load result from session storage
const result = ref<SifterAnalysisResult | null>(null)
onMounted(() => {
  const stored = sessionStorage.getItem('analysisResult')
  if (stored) result.value = JSON.parse(stored)
})

const analyzedDate = computed(() => {
  if (!result.value?.analyzedAt) return '—'
  const d = new Date(result.value.analyzedAt)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()
})

const isNormal = computed(() => result.value?.bulkDensityStatus === 'normal')

const bulkDensityDisplay = computed(() => {
  if (!result.value) return '—'
  return result.value.bulkDensity.toFixed(2)
})

/** แสดงเป็น % สำหรับ gauge: map ช่วง 39–52 → 0–100 */
const bulkDensityPercent = computed(() => {
  if (!result.value) return 0
  const bd = result.value.bulkDensity
  return Math.min(100, Math.max(0, ((bd - 39) / (52 - 39)) * 100))
})

/** Progress bar แสดงตำแหน่งของ combination ใน array (1-indexed / 9) */
const currentCombinationProgress = computed(() => {
  if (!result.value?.currentCombination) return 0
  const idx = SIFTER_COMBINATIONS.indexOf(result.value.currentCombination as typeof SIFTER_COMBINATIONS[number])
  return ((idx + 1) / SIFTER_COMBINATIONS.length) * 100
})

const recommendedCombinationProgress = computed(() => {
  if (!result.value?.recommendedControlSifter) return 0
  const idx = SIFTER_COMBINATIONS.indexOf(result.value.recommendedControlSifter as typeof SIFTER_COMBINATIONS[number])
  return ((idx + 1) / SIFTER_COMBINATIONS.length) * 100
})

/** แสดง Input Parameters ที่ผู้ใช้กรอก */
const inputParams = computed(() => {
  if (!result.value?.formData) return []
  const fd = result.value.formData
  return [
    { id: 'weight', label: 'WEIGHT', icon: 'mdi-weight', value: fd.weight, unit: 'g', statusText: 'น้ำหนัก' },
    { id: 'volume', label: 'VOLUME', icon: 'mdi-cup-water', value: fd.volume, unit: 'ml', statusText: 'ปริมาตร' },
    { id: 'circulate', label: 'CIRCULATE', icon: 'mdi-rotate-3d-variant', value: fd.circulate, unit: '%', statusText: 'Circulate' },
    { id: 'pressure', label: 'PRESSURE CONTROL', icon: 'mdi-gauge', value: fd.pressure, unit: '%', statusText: 'Pressure' },
  ]
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
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
}

.section-heading {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
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
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-align: center;
  padding: 2px 6px;
  border-radius: 4px;
  margin-top: 4px;
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

/* --- Breakdown --- */
.breakdown-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.07em;
  color: #94a3b8;
  font-family: 'JetBrains Mono', monospace !important;
}

.breakdown-value {
  font-size: 12px;
  font-weight: 700;
}

.breakdown-value--normal { color: #8866FF; }
.breakdown-value--warning { color: #f59e0b; }
.breakdown-value--critical { color: #CC4284; }

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

/* --- Sensors --- */
.sensor-card {
  border: 1px solid #e2e8f0;
}

.sensor-card--warning {
  border-color: #fed7aa;
  background: #fff7ed;
}

.sensor-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.07em;
  color: #94a3b8;
  font-family: 'JetBrains Mono', monospace !important;
}

.sensor-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.sensor-dot--normal { background: #8866FF; }
.sensor-dot--warning { background: #f59e0b; }

.sensor-value {
  font-size: 28px;
  font-weight: 800;
  color: #1e293b;
  line-height: 1.1;
}

.sensor-unit {
  font-size: 14px;
  font-weight: 500;
  color: #475569;
}

.sensor-status-text {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-top: 4px;
}

.sensor-status-text--normal { color: #8866FF; }
.sensor-status-text--warning { color: #d97706; }

/* --- Chart --- */
.chart-wrapper {
  height: 220px;
}

/* --- Summary --- */
.summary-item {
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  background: #f8fafc;
}

.summary-item--warning {
  background: #fff7ed;
  border-left: 3px solid #f59e0b;
}

.summary-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #374151;
  font-family: 'JetBrains Mono', monospace !important;
}

.summary-title--warning { color: #d97706; }

.summary-desc {
  font-size: 12px;
  color: #64748b;
  margin-top: 2px;
  line-height: 1.5;
}
</style>
