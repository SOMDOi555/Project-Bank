<template>
  <v-container fluid class="pa-6 pa-md-8">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="page-title">Dashboard</h1>
      <p class="page-subtitle">Monitor machine conditions and analyze machine performance.</p>
    </div>

    <!-- Stats Cards Row -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" lg="3">
        <v-card class="stat-card" rounded="lg" elevation="0">
          <v-card-text class="pa-5">
            <div class="d-flex justify-space-between align-start mb-3">
              <div class="stat-label">TOTAL MACHINES</div>
              <div class="stat-icon stat-icon--blue">
                <v-icon size="20" color="primary">mdi-robot-industrial</v-icon>
              </div>
            </div>
            <div class="stat-value">128</div>
            <div class="stat-badge stat-badge--green mt-2">
              <v-icon size="12">mdi-trending-up</v-icon> +12 this month
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <v-card class="stat-card" rounded="lg" elevation="0">
          <v-card-text class="pa-5">
            <div class="d-flex justify-space-between align-start mb-3">
              <div class="stat-label">ANALYZED</div>
              <div class="stat-icon stat-icon--purple">
                <v-icon size="20" color="primary">mdi-google-analytics</v-icon>
              </div>
            </div>
            <div class="stat-value">96</div>
            <div class="d-flex align-center ga-2 mt-2">
              <v-icon size="14" color="primary">mdi-clock-outline</v-icon>
              <span class="stat-note">+8 today</span>
            </div>
            <v-progress-linear
              model-value="75"
              color="primary"
              rounded
              height="4"
              class="mt-2"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <v-card class="stat-card" rounded="lg" elevation="0">
          <v-card-text class="pa-5">
            <div class="d-flex justify-space-between align-start mb-3">
              <div class="stat-label">NORMAL</div>
              <div class="stat-icon stat-icon--green">
                <v-icon size="20" color="success">mdi-check-circle</v-icon>
              </div>
            </div>
            <div class="stat-value">82</div>
            <div class="d-flex align-center ga-1 mt-2">
              <div class="status-dot status-dot--green"></div>
              <span class="stat-note">Status: Normal</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <v-card class="stat-card stat-card--warning" rounded="lg" elevation="0">
          <v-card-text class="pa-5">
            <div class="d-flex justify-space-between align-start mb-3">
              <div class="stat-label">WARNING</div>
              <div class="stat-icon stat-icon--orange">
                <v-icon size="20" color="warning">mdi-alert-outline</v-icon>
              </div>
            </div>
            <div class="stat-value">14</div>
            <div class="d-flex align-center ga-1 mt-2">
              <div class="status-dot status-dot--orange"></div>
              <span class="stat-note stat-note--orange">Requires attention</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts Row -->
    <v-row>
      <!-- Machine Analysis Overview Chart -->
      <v-col cols="12" lg="8">
        <v-card rounded="lg" elevation="0" class="h-100">
          <v-card-text class="pa-5">
            <div class="d-flex justify-space-between align-center mb-1">
              <div>
                <div class="chart-title">Machine Analysis Overview</div>
                <div class="chart-subtitle">Condition scores over time</div>
              </div>
              <div class="d-flex ga-2">
                <v-btn
                  :variant="chartPeriod === 'day' ? 'flat' : 'outlined'"
                  :color="chartPeriod === 'day' ? 'primary' : 'grey'"
                  size="small"
                  rounded="lg"
                  @click="chartPeriod = 'day'"
                >Day</v-btn>
                <v-btn
                  :variant="chartPeriod === 'week' ? 'flat' : 'outlined'"
                  :color="chartPeriod === 'week' ? 'primary' : 'grey'"
                  size="small"
                  rounded="lg"
                  @click="chartPeriod = 'week'"
                >Week</v-btn>
              </div>
            </div>

            <div class="chart-wrapper mt-4">
              <Line :data="lineChartData" :options="lineChartOptions" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Machine Status List -->
      <v-col cols="12" lg="4">
        <v-card rounded="lg" elevation="0" class="h-100">
          <v-card-text class="pa-5">
            <div class="d-flex justify-space-between align-center mb-4">
              <div class="chart-title">Machine Status</div>
              <v-btn icon variant="text" size="small" color="grey">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </div>

            <div class="machine-status-list">
              <div
                v-for="machine in machineStatuses"
                :key="machine.id"
                class="machine-status-item"
              >
                <div class="d-flex align-center ga-3">
                  <div class="machine-avatar" :style="{ background: machine.avatarBg }">
                    <v-icon size="18" :color="machine.avatarColor">mdi-robot-industrial</v-icon>
                  </div>
                  <div class="flex-grow-1">
                    <div class="machine-id">{{ machine.id }}</div>
                    <div class="machine-name">{{ machine.name }}</div>
                  </div>
                  <div class="text-right">
                    <div :class="['machine-status-label', `machine-status-label--${machine.status}`]">
                      {{ machine.statusLabel }}
                      <span :class="['status-dot-inline', `status-dot-inline--${machine.status}`]"></span>
                    </div>
                    <div class="machine-score">{{ machine.score }} Score</div>
                  </div>
                </div>
              </div>
            </div>

            <v-btn
              variant="outlined"
              color="primary"
              block
              rounded="lg"
              class="mt-3"
              to="/machine-data"
            >
              View All Machines
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const chartPeriod = ref<'day' | 'week'>('week')

const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const dayLabels = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00']

const weekData = [80, 77, 72, 65, 70, 74, 82]
const dayData = [75, 78, 76, 71, 80, 83, 85]

const lineChartData = computed(() => ({
  labels: chartPeriod.value === 'week' ? weekLabels : dayLabels,
  datasets: [
    {
      label: 'Condition Score',
      data: chartPeriod.value === 'week' ? weekData : dayData,
      borderColor: '#8866FF',
      backgroundColor: 'rgba(136, 102, 255, 0.08)',
      borderWidth: 3,
      pointBackgroundColor: '#ffffff',
      pointBorderColor: '#8866FF',
      pointBorderWidth: 2.5,
      pointRadius: 5,
      pointHoverRadius: 7,
      fill: true,
      tension: 0.4,
    },
  ],
}))

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1E293B',
      titleColor: '#94a3b8',
      bodyColor: '#ffffff',
      padding: 12,
      cornerRadius: 8,
    },
  },
  scales: {
    y: {
      min: 50,
      max: 100,
      grid: { color: 'rgba(0,0,0,0.04)' },
      ticks: { color: '#94a3b8', font: { size: 11 } },
      border: { display: false },
    },
    x: {
      grid: { display: false },
      ticks: { color: '#94a3b8', font: { size: 11 } },
      border: { display: false },
    },
  },
}

const machineStatuses = [
  { id: 'MC-001', name: 'Main Extruder', status: 'normal', statusLabel: 'Normal', score: '92%', avatarBg: '#f0fdf4', avatarColor: 'success' },
  { id: 'MC-002', name: 'Cooling Fan B', status: 'warning', statusLabel: 'Warning', score: '71%', avatarBg: '#fffbeb', avatarColor: 'warning' },
  { id: 'MC-003', name: 'Assembly Robot 1', status: 'normal', statusLabel: 'Normal', score: '95%', avatarBg: '#f0fdf4', avatarColor: 'success' },
  { id: 'MC-004', name: 'Press Unit A', status: 'normal', statusLabel: 'Normal', score: '88%', avatarBg: '#f0fdf4', avatarColor: 'success' },
]
</script>

<style scoped>
.page-title {
  font-size: 28px;
  font-weight: 800;
  color: #1e293b;
  line-height: 1.2;
  margin-bottom: 4px;
}

.page-subtitle {
  font-size: 14px;
  color: #64748b;
}

/* --- Stat Cards --- */
.stat-card {
  border: 1px solid #e2e8f0;
  transition: box-shadow 0.2s ease;
}

.stat-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.07) !important;
}

.stat-card--warning {
  border-color: #fde68a;
  background: #fffdf5;
}

.stat-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #94a3b8;
  font-family: 'JetBrains Mono', monospace !important;
}

.stat-value {
  font-size: 38px;
  font-weight: 800;
  color: #1e293b;
  line-height: 1;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon--blue { background: #ede9ff; }
.stat-icon--purple { background: #ede9ff; }
.stat-icon--green { background: #f0fdf4; }
.stat-icon--orange { background: #fffbeb; }

.stat-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
}

.stat-badge--green {
  background: #f0fdf4;
  color: #15803d;
}

.stat-note {
  font-size: 12px;
  color: #64748b;
}

.stat-note--orange {
  color: #d97706;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-dot--green { background: #22c55e; }
.status-dot--orange { background: #f59e0b; }

/* --- Chart --- */
.chart-title {
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
}

.chart-subtitle {
  font-size: 12px;
  color: #94a3b8;
}

.chart-wrapper {
  height: 240px;
}

/* --- Machine Status List --- */
.machine-status-item {
  padding: 10px 0;
  border-bottom: 1px solid #f1f5f9;
}

.machine-status-item:last-child {
  border-bottom: none;
}

.machine-avatar {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.machine-id {
  font-size: 12px;
  font-weight: 700;
  color: #1e293b;
  font-family: 'JetBrains Mono', monospace !important;
}

.machine-name {
  font-size: 11px;
  color: #64748b;
}

.machine-status-label {
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: flex-end;
}

.machine-status-label--normal { color: #16a34a; }
.machine-status-label--warning { color: #d97706; }

.status-dot-inline {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  display: inline-block;
}

.status-dot-inline--normal { background: #22c55e; }
.status-dot-inline--warning { background: #f59e0b; }

.machine-score {
  font-size: 11px;
  color: #94a3b8;
  text-align: right;
}
</style>
