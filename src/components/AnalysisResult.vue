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
    </div>

    <!-- Top Cards Row: Bulk Density, Current Sifter, Recommendation -->
    <v-row class="mb-6">
      <!-- Bulk Density Result -->
      <v-col cols="12" md="6">
        <v-card rounded="lg" elevation="0" class="result-card h-100">
          <v-card-text class="pa-6 text-center">
            <div class="d-flex align-center ga-2 mb-4">
              <v-icon color="primary" size="18">mdi-google-analytics</v-icon>
              <span class="section-title">Bulk Density</span>
            </div>

            <div class="bd-icon-container mb-4">
              <div :class="['bd-icon-wrapper', isNormal ? 'bd-icon-wrapper--normal' : 'bd-icon-wrapper--critical']">
                <v-icon
                  :icon="isNormal ? 'mdi-check-circle' : 'mdi-close-circle'"
                  :color="isNormal ? 'success' : 'error'"
                  size="72"
                />
              </div>
              <div class="gauge-value mt-3">{{ bulkDensityDisplay }} kg/m³</div>
              <div :class="['gauge-status mt-2', isNormal ? 'gauge-status--normal' : 'gauge-status--critical']">
                <v-icon
                  :icon="isNormal ? 'mdi-check-bold' : 'mdi-close-thick'"
                  size="12"
                  class="me-1"
                />
                <span>{{ isNormal ? 'ปกติ' : 'ผิดปกติ' }}</span>
              </div>
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
      <v-col cols="12" md="6">
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
    </v-row>
    <v-row>
      <!-- Recommendation -->
      <v-col cols="12">
        <v-card rounded="lg" elevation="0" class="result-card h-100">
          <v-card-text class="pa-5">
            <!-- Header -->
            <div class="d-flex align-center ga-2 mb-4">
              <div class="rec-icon" :class="isNormal ? 'rec-icon--ok' : 'rec-icon--warn'">
                <v-icon :color="isNormal ? 'success' : 'warning'" size="20">mdi-tune</v-icon>
              </div>
              <div>
                <div class="section-title" style="font-size:16px;">
                  {{ isNormal ? 'ค่าอยู่ในเกณฑ์ปกติ' : 'ควรปรับลดค่า Sifter เพื่อลด Bulk Density' }}
                </div>
                <div class="rec-subtitle">
                  {{ isNormal ? 'ไม่จำเป็นต้องปรับค่า' : 'แนะนำให้ปรับค่าตามช่วงด้านล่างนี้' }}
                </div>
              </div>
            </div>

            <!-- Adjustment Table -->
            <div class="adj-table-wrapper">
              <div class="adj-table">
                <!-- Table Header -->
              <div class="adj-table-header">
                <div class="adj-col adj-col--var">ตัวแปรที่ต้องปรับ</div>
                <div class="adj-col adj-col--current">ค่าปัจจุบัน</div>
                <div class="adj-col adj-col--range adj-col--highlight">ช่วงที่แนะนำ</div>
                <div class="adj-col adj-col--change">การเปลี่ยนแปลง</div>
              </div>

              <!-- Row: Circulate -->
              <div class="adj-table-row">
                <div class="adj-col adj-col--var">
                  <v-icon size="16" color="primary" class="me-1">mdi-rotate-3d-variant</v-icon>
                  <div>
                    <div class="adj-var-name">Circulate</div>
                    <div class="adj-var-sub">จัดการหมุนเวียน</div>
                  </div>
                </div>
                <div class="adj-col adj-col--current adj-val--current">
                  {{ result?.formData?.circulate ? `${result.formData.circulate} %` : '—' }}
                </div>
                <div class="adj-col adj-col--range adj-col--highlight">
                  <template v-if="recommendedRanges">
                    <div class="adj-val--range">
                      {{ recommendedRanges.circulateMin }} – {{ recommendedRanges.circulateMax }} %
                    </div>
                    <div class="adj-val--hint">
                      {{ diffDirection(recommendedRanges.circulateDiffMin, recommendedRanges.circulateDiffMax) === 'same'
                          ? 'คงเดิม'
                          : `แนะนำ: ${diffDirection(recommendedRanges.circulateDiffMin, recommendedRanges.circulateDiffMax) === 'down' ? 'ลดลง' : 'เพิ่มขึ้น'}ประมาณ ${formatDiff(recommendedRanges.circulateDiffMin, recommendedRanges.circulateDiffMax)} %` }}
                    </div>
                  </template>
                  <span v-else class="adj-val--ok">คงเดิม</span>
                </div>
                <div class="adj-col adj-col--change">
                  <template v-if="recommendedRanges">
                    <template v-if="diffDirection(recommendedRanges.circulateDiffMin, recommendedRanges.circulateDiffMax) === 'down'">
                      <span class="adj-change--down">ลดลง</span>
                      <div class="adj-change--val">{{ formatDiff(recommendedRanges.circulateDiffMin, recommendedRanges.circulateDiffMax) }} %</div>
                      <v-icon color="success" size="16">mdi-arrow-down-bold</v-icon>
                    </template>
                    <template v-else-if="diffDirection(recommendedRanges.circulateDiffMin, recommendedRanges.circulateDiffMax) === 'up'">
                      <span class="adj-change--up">เพิ่มขึ้น</span>
                      <div class="adj-change--val adj-change--val-up">{{ formatDiff(recommendedRanges.circulateDiffMin, recommendedRanges.circulateDiffMax) }} %</div>
                      <v-icon color="warning" size="16">mdi-arrow-up-bold</v-icon>
                    </template>
                    <template v-else>
                      <span class="adj-change--neutral">คงเดิม</span>
                      <div class="adj-change--val">—</div>
                    </template>
                  </template>
                  <span v-else class="adj-change--neutral">—</span>
                </div>
              </div>

              <!-- Row: Pressure Control -->
              <div class="adj-table-row">
                <div class="adj-col adj-col--var">
                  <v-icon size="16" color="primary" class="me-1">mdi-gauge</v-icon>
                  <div>
                    <div class="adj-var-name">Pressure</div>
                    <div class="adj-var-sub">Control</div>
                  </div>
                </div>
                <div class="adj-col adj-col--current adj-val--current">
                  {{ result?.formData?.pressure ? `${result.formData.pressure} %` : '—' }}
                </div>
                <div class="adj-col adj-col--range adj-col--highlight">
                  <template v-if="recommendedRanges">
                    <div class="adj-val--range">
                      {{ recommendedRanges.pressureMin.toFixed(1) }} – {{ recommendedRanges.pressureMax.toFixed(1) }} %
                    </div>
                    <div class="adj-val--hint">
                      {{ diffDirection(recommendedRanges.pressureDiffMin, recommendedRanges.pressureDiffMax) === 'same'
                          ? 'คงเดิม'
                          : `แนะนำ: ${diffDirection(recommendedRanges.pressureDiffMin, recommendedRanges.pressureDiffMax) === 'down' ? 'ลดลง' : 'เพิ่มขึ้น'}ประมาณ ${formatDiff(recommendedRanges.pressureDiffMin, recommendedRanges.pressureDiffMax)} %` }}
                    </div>
                  </template>
                  <span v-else class="adj-val--ok">คงเดิม</span>
                </div>
                <div class="adj-col adj-col--change">
                  <template v-if="recommendedRanges">
                    <template v-if="diffDirection(recommendedRanges.pressureDiffMin, recommendedRanges.pressureDiffMax) === 'down'">
                      <span class="adj-change--down">ลดลง</span>
                      <div class="adj-change--val">{{ formatDiff(recommendedRanges.pressureDiffMin, recommendedRanges.pressureDiffMax) }} %</div>
                      <v-icon color="success" size="16">mdi-arrow-down-bold</v-icon>
                    </template>
                    <template v-else-if="diffDirection(recommendedRanges.pressureDiffMin, recommendedRanges.pressureDiffMax) === 'up'">
                      <span class="adj-change--up">เพิ่มขึ้น</span>
                      <div class="adj-change--val adj-change--val-up">{{ formatDiff(recommendedRanges.pressureDiffMin, recommendedRanges.pressureDiffMax) }} %</div>
                      <v-icon color="warning" size="16">mdi-arrow-up-bold</v-icon>
                    </template>
                    <template v-else>
                      <span class="adj-change--neutral">คงเดิม</span>
                      <div class="adj-change--val">—</div>
                    </template>
                  </template>
                  <span v-else class="adj-change--neutral">—</span>
                </div>
              </div>

              <!-- Row: Damper -->
              <div class="adj-table-row">
                <div class="adj-col adj-col--var">
                  <v-icon size="16" color="primary" class="me-1">mdi-expand-all</v-icon>
                  <div>
                    <div class="adj-var-name">Damper 1, 2</div>
                  </div>
                </div>
                <div class="adj-col adj-col--current adj-val--current">
                  {{ result?.formData?.damper1 != null ? `${result.formData.damper1} mm` : '—' }}
                </div>
                <div class="adj-col adj-col--range adj-col--highlight">
                  <div class="adj-val--range">
                    {{ result?.formData?.damper1 != null ? `${result.formData.damper1} mm` : '—' }}
                  </div>
                  <div class="adj-val--hint">(คงเดิม)</div>
                </div>
                <div class="adj-col adj-col--change">
                  <span class="adj-change--neutral">คงเดิม</span>
                  <div class="adj-change--val">—</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer note -->
            <div class="rec-footer mt-3">
              <v-icon size="14" color="info" class="me-1">mdi-information-outline</v-icon>
              <span>หลังปรับแล้ว ให้ตรวจวัดค่า Bulk Density อีกครั้ง</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Bottom Actions -->
    <v-row class="mt-4 mb-2">
      <v-col cols="12" class="d-flex justify-center justify-sm-end">
        <v-btn
          variant="flat"
          color="primary"
          rounded="lg"
          size="large"
          prepend-icon="mdi-arrow-left"
          class="w-100 w-sm-auto px-8 font-weight-bold"
          @click="emit('back')"
        >
          กลับไปวิเคราะห์ใหม่
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { SifterAnalysisResult } from '@/types/machine'
import { getRecommendedRanges, type RecommendedRanges } from '@/utils/sifter'

onMounted(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  // Scroll main content container if Vuetify uses internal scrolling
  document.querySelector('.v-main')?.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' })
})

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

/**
 * คำนวณช่วงค่าที่แนะนำและ diff จาก recommendedControlSifter
 * คืน null ถ้า normal หรือไม่มีข้อมูลพอ
 */
const recommendedRanges = computed((): RecommendedRanges | null => {
  const r = props.result
  if (!r || isNormal.value) return null
  if (!r.recommendedControlSifter) return null

  const circulate = parseFloat(r.formData?.circulate ?? '')
  const pressure  = parseFloat(r.formData?.pressure ?? '')
  if (isNaN(circulate) || isNaN(pressure)) return null

  return getRecommendedRanges(r.recommendedControlSifter, circulate, pressure)
})

/** แสดงช่วง diff เป็น string เช่น "-5 – -2" หรือ "ลดลง 2 – 5" */
function formatDiff(dMin: number, dMax: number): string {
  const lo = Math.min(dMin, dMax)
  const hi = Math.max(dMin, dMax)
  return `${Math.abs(lo).toFixed(1)} – ${Math.abs(hi).toFixed(1)}`
}

/** ทิศทางการเปลี่ยนแปลง: negative = ลดลง, positive = เพิ่มขึ้น, 0 = คงเดิม */
function diffDirection(dMin: number, dMax: number): 'down' | 'up' | 'same' {
  const avg = (dMin + dMax) / 2
  if (avg < -0.001) return 'down'
  if (avg > 0.001) return 'up'
  return 'same'
}
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

/* --- Bulk Density Icon --- */
.bd-icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bd-icon-wrapper {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bd-icon-wrapper--normal {
  background: #dcfce7;
  box-shadow: 0 0 0 8px #bbf7d0;
}

.bd-icon-wrapper--critical {
  background: #ffe4e6;
  box-shadow: 0 0 0 8px #fecdd3;
}

/* --- Gauge (legacy kept for gauge-value/gauge-status reuse) --- */

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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.rec-icon--ok   { background: #dcfce7; }
.rec-icon--warn { background: #fef3c7; }

.rec-subtitle {
  font-size: 16px;
  color: #64748b;
  margin-top: 2px;
}

/* --- Adjustment Table --- */
.adj-table-wrapper {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.adj-table {
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 16px;
  min-width: 580px;
}

.adj-table-header,
.adj-table-row {
  display: grid;
  grid-template-columns: 2fr 1.2fr 2fr 1.4fr;
  align-items: center;
}

.adj-table-header {
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 700;
  color: #64748b;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.adj-table-row {
  border-bottom: 1px solid #f1f5f9;
  min-height: 60px;
}

.adj-table-row:last-child {
  border-bottom: none;
}

.adj-col {
  padding: 8px 6px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
}

.adj-col--var {
  flex-direction: row;
  align-items: center;
  padding-left: 8px;
}

.adj-col--current { text-align: center; align-items: center; }
.adj-col--range   { text-align: center; align-items: center; }
.adj-col--change  { text-align: center; align-items: center; }

.adj-col--highlight {
  background: #f0fdf4;
  border-left: 2px solid #22c55e;
  border-right: 2px solid #22c55e;
}

.adj-var-name {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;
}

.adj-var-sub {
  font-size: 13px;
  color: #94a3b8;
}

.adj-val--current {
  font-size: 16px;
  font-weight: 800;
  color: #000000;
}

.adj-val--range {
  font-size: 16px;
  font-weight: 800;
  color: #16a34a;
  text-align: center;
}

.adj-val--hint {
  font-size: 12px;
  color: #64748b;
  text-align: center;
  line-height: 1.3;
}

.adj-val--ok {
  font-size: 16px;
  font-weight: 600;
  color: #64748b;
}

.adj-change--down {
  font-size: 14px;
  font-weight: 700;
  color: #16a34a;
}

.adj-change--val {
  font-size: 16px;
  font-weight: 800;
  color: #16a34a;
}

.adj-change--neutral {
  font-size: 14px;
  color: #94a3b8;
}

.adj-change--up {
  font-size: 14px;
  font-weight: 700;
  color: #d97706;
}

.adj-change--val-up {
  color: #d97706;
}

/* --- Footer note --- */
.rec-footer {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #64748b;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 6px;
  padding: 8px 12px;
  line-height: 1.5;
}

.shadow-btn {
  box-shadow: 0 4px 14px rgba(22, 163, 74, 0.35) !important;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.shadow-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(22, 163, 74, 0.45) !important;
}

.shadow-btn:active {
  transform: translateY(0);
}

@media (max-width: 600px) {
  .adj-table {
    min-width: 520px;
    font-size: 14px;
  }
  .adj-table-header {
    font-size: 12px;
  }
  .adj-var-name {
    font-size: 14px;
  }
  .adj-val--current,
  .adj-val--range,
  .adj-val--ok,
  .adj-change--val {
    font-size: 14px;
  }
  .rec-subtitle {
    font-size: 14px;
  }
}
</style>
