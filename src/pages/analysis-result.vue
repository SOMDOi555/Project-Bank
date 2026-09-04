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
          <!-- <div class="d-flex align-center ga-1 text-grey">
            <v-icon size="14">mdi-robot-industrial</v-icon>
            <span class="meta-text">{{ result?.machine?.name || 'CNC Machine 01' }}</span>
          </div> -->
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
        prepend-icon="mdi-download"
        size="small"
      >
        Export Report
      </v-btn>
    </div>

    <!-- Top Cards Row: Overall Health, Prediction Breakdown, Recommendation -->
    <v-row class="mb-6">
      <!-- Overall Health -->
      <v-col cols="12" md="4">
        <v-card rounded="lg" elevation="0" class="result-card h-100">
          <v-card-text class="pa-6 text-center">
            <div class="d-flex align-center ga-2 mb-4">
              <v-icon color="primary" size="18">mdi-google-analytics</v-icon>
              <span class="section-title">ผลการวิเคราะห์</span>
            </div>

            <div class="gauge-container mb-4">
              <v-progress-circular
                :model-value="healthScore"
                :size="130"
                :width="12"
                color="primary"
                bg-color="#e2e8f0"
              >
                <div>
                  <div class="gauge-value">{{ healthScore }}%</div>
                  <div :class="['gauge-status', `gauge-status--${healthStatus.type}`]">
                    {{ healthStatus.label }}
                  </div>
                </div>
              </v-progress-circular>
            </div>

            <p class="result-desc">Machine condition is stable.</p>
            <p class="result-desc-sub">Confidence Score: {{ healthScore }}%</p>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Prediction Breakdown -->
      <v-col cols="12" md="4">
        <v-card rounded="lg" elevation="0" class="result-card h-100">
          <v-card-text class="pa-6">
            <div class="d-flex align-center ga-2 mb-5">
              <v-icon color="primary" size="18">mdi-chart-donut</v-icon>
              <span class="section-title">Prediction Breakdown</span>
            </div>

            <div class="breakdown-item mb-4">
              <div class="d-flex justify-space-between mb-1">
                <span class="breakdown-label">NORMAL</span>
                <span class="breakdown-value breakdown-value--normal">92%</span>
              </div>
              <v-progress-linear model-value="92" color="primary" rounded height="6" bg-color="#e2e8f0" />
            </div>

            <div class="breakdown-item mb-4">
              <div class="d-flex justify-space-between mb-1">
                <span class="breakdown-label">WARNING</span>
                <span class="breakdown-value breakdown-value--warning">6%</span>
              </div>
              <v-progress-linear model-value="6" color="warning" rounded height="6" bg-color="#e2e8f0" />
            </div>

            <div class="breakdown-item">
              <div class="d-flex justify-space-between mb-1">
                <span class="breakdown-label">CRITICAL</span>
                <span class="breakdown-value breakdown-value--critical">2%</span>
              </div>
              <v-progress-linear model-value="2" color="error" rounded height="6" bg-color="#e2e8f0" />
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
              Continue normal operation. Monitor vibration levels during the next operating cycle.
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

    <!-- Sensor Diagnostics -->
    <div class="mb-2">
      <h2 class="section-heading mb-4">Sensor Diagnostics</h2>
    </div>
    <v-row class="mb-6">
      <v-col
        v-for="sensor in sensors"
        :key="sensor.id"
        cols="12" sm="6" lg="3"
      >
        <v-card rounded="lg" elevation="0" :class="['sensor-card', sensor.status === 'warning' && 'sensor-card--warning']">
          <v-card-text class="pa-5">
            <div class="d-flex justify-space-between align-center mb-3">
              <div class="d-flex align-center ga-2">
                <v-icon size="16" :color="sensor.status === 'warning' ? 'warning' : 'grey-lighten-1'">
                  {{ sensor.icon }}
                </v-icon>
                <span class="sensor-label">{{ sensor.label }}</span>
              </div>
              <div :class="['sensor-dot', `sensor-dot--${sensor.status}`]"></div>
            </div>
            <div class="sensor-value">{{ sensor.value }} <span class="sensor-unit">{{ sensor.unit }}</span></div>
            <div :class="['sensor-status-text', `sensor-status-text--${sensor.status}`]">{{ sensor.statusText }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

// Load result from session storage
const result = ref<any>(null)
onMounted(() => {
  const stored = sessionStorage.getItem('analysisResult')
  if (stored) result.value = JSON.parse(stored)
})

const analyzedDate = computed(() => {
  if (!result.value?.analyzedAt) return '22 AUG 2026'
  const d = new Date(result.value.analyzedAt)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()
})

const healthScore = 92

const healthStatus = computed(() => {
  if (healthScore >= 80) return { label: 'NORMAL', type: 'normal' }
  if (healthScore >= 60) return { label: 'WARNING', type: 'warning' }
  return { label: 'CRITICAL', type: 'critical' }
})

const sensors = [
  { id: 'temp', label: 'TEMPERATURE', icon: 'mdi-thermometer', value: '72.5', unit: '°C', status: 'normal', statusText: 'NORMAL' },
  { id: 'vib', label: 'VIBRATION', icon: 'mdi-sine-wave', value: '3.42', unit: 'mm/s', status: 'warning', statusText: 'WARNING' },
  { id: 'pres', label: 'PRESSURE', icon: 'mdi-gauge', value: '5.8', unit: 'bar', status: 'normal', statusText: 'NORMAL' },
  { id: 'load', label: 'LOAD', icon: 'mdi-battery-charging-medium', value: '82', unit: '%', status: 'normal', statusText: 'NORMAL' },
]

const trendTabs = ['TEMP', 'VIB', 'PRES', 'LOAD']
const activeTrend = ref('TEMP')

const trendDatasets: Record<string, number[]> = {
  TEMP: [68, 70, 69, 72, 75, 73, 72, 74, 75],
  VIB: [1.2, 1.5, 2.0, 2.8, 3.1, 3.42, 3.2, 3.0, 2.8],
  PRES: [5.5, 5.6, 5.7, 5.8, 5.9, 5.8, 5.7, 5.8, 5.8],
  LOAD: [75, 78, 80, 82, 84, 82, 80, 82, 82],
}

const trendLabels = ['08:00', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30']

const trendChartData = computed(() => ({
  labels: trendLabels,
  datasets: [
    {
      data: trendDatasets[activeTrend.value],
      borderColor: '#8866FF',
      backgroundColor: 'rgba(136, 102, 255, 0.06)',
      borderWidth: 2.5,
      pointBackgroundColor: '#ffffff',
      pointBorderColor: '#8866FF',
      pointBorderWidth: 2,
      pointRadius: 4,
      fill: true,
      tension: 0.3,
    },
  ],
}))

const trendChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1E293B',
      bodyColor: '#ffffff',
      padding: 10,
      cornerRadius: 8,
    },
  },
  scales: {
    y: {
      grid: { color: 'rgba(0,0,0,0.04)' },
      ticks: { color: '#94a3b8', font: { size: 10 } },
      border: { display: false },
    },
    x: {
      grid: { display: false },
      ticks: { color: '#94a3b8', font: { size: 10 } },
      border: { display: false },
    },
  },
}

const executionSummary = [
  { title: 'TEMPERATURE PROFILE', description: 'Operating within expected thermal parameters.', status: 'normal' },
  { title: 'VIBRATION SPIKE DETECTED', description: 'Minor anomaly observed at 10:14 AM on Z-axis.', status: 'warning' },
  { title: 'LOAD STABILITY', description: 'Power draw consistent with scheduled task.', status: 'normal' },
]
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
