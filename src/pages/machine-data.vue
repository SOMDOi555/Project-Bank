<template>
  <v-container fluid class="pa-6 pa-md-8">
    <MachineList
      v-if="!selectedMachine"
      :machines="machines"
      @select="selectMachine"
      @delete="deleteMachine"
      @add="addMachine"
    />

    <AnalysisForm
      v-else
      :machine="selectedMachine"
      @back="selectedMachine = null"
      @submit="handleAnalyze"
    />

    <LoadingOverlay v-model="isAnalyzing" />
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSwal } from '@/plugins/sweetalert'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import MachineList from '@/components/MachineList.vue'
import AnalysisForm from '@/components/AnalysisForm.vue'
import type { Machine, NewMachinePayload, AnalysisFormData } from '@/types/machine'

const swal = useSwal()
const router = useRouter()
const isAnalyzing = ref(false)
const selectedMachine = ref<Machine | null>(null)

const machines = ref<Machine[]>([
  { id: 1, name: 'เครื่องจักร A', icon: 'mdi-robot-industrial', color: 'grey-darken-3' },
  { id: 2, name: 'เครื่องจักร B', icon: 'mdi-cog-sync', color: 'grey-darken-3' },
])

const selectMachine = (machine: Machine) => {
  selectedMachine.value = machine
}

const addMachine = (payload: NewMachinePayload) => {
  machines.value.push({
    id: Date.now(),
    name: payload.name,
    icon: payload.icon,
    color: 'grey-darken-3',
  })
  swal.toast(`เพิ่ม "${payload.name}" เรียบร้อยแล้ว`, 'success')
}

const deleteMachine = async (machine: Machine) => {
  const result = await swal.warning(
    `ลบ ${machine.name}`,
    'คุณแน่ใจหรือไม่ว่าต้องการลบเครื่องจักรนี้ออกจากรายการ'
  )
  if (result.isConfirmed) {
    machines.value = machines.value.filter((m) => m.id !== machine.id)
    if (selectedMachine.value?.id === machine.id) selectedMachine.value = null
    swal.toast('ลบเรียบร้อยแล้ว', 'success')
  }
}

const handleAnalyze = async (data: AnalysisFormData) => {
  isAnalyzing.value = true
  await new Promise((resolve) => setTimeout(resolve, 2000))
  isAnalyzing.value = false

  // Store result in sessionStorage and navigate to result page
  sessionStorage.setItem('analysisResult', JSON.stringify({
    machine: selectedMachine.value,
    formData: data,
    analyzedAt: new Date().toISOString(),
  }))

  router.push('/analysis-result')
}
</script>
