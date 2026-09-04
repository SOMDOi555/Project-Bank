<template>
  <v-container fluid class="pa-6 pa-md-8">
    <!-- VIEW 1: หน้ารายการเครื่องจักร -->
    <MachineList
      v-if="!selectedMachine"
      :machines="machines"
      @select="selectMachine"
      @delete="deleteMachine"
      @add="addMachine"
    />

    <!-- VIEW 2: หน้าฟอร์มกรอกข้อมูลเครื่องจักร -->
    <AnalysisForm
      v-else
      :machine="selectedMachine"
      @back="selectedMachine = null"
      @submit="handleAnalyze"
    />

    <!-- Loading Overlay แบบ Spinner เรียบง่าย -->
    <LoadingOverlay v-model="isAnalyzing" />
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSwal } from "@/plugins/sweetalert";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import MachineList from "@/components/MachineList.vue";
import AnalysisForm from "@/components/AnalysisForm.vue";
import type { Machine, NewMachinePayload, AnalysisFormData } from "@/types/machine";

const swal = useSwal();
const isAnalyzing = ref(false);
const selectedMachine = ref<Machine | null>(null);

// รายการเครื่องจักรเริ่มต้น (Mock data)
const machines = ref<Machine[]>([
  {
    id: 1,
    name: "เครื่องจักร A",
    icon: "mdi-robot-industrial",
    color: "grey-darken-3",
  },
  {
    id: 2,
    name: "เครื่องจักร B",
    icon: "mdi-cog-sync",
    color: "grey-darken-3",
  },
]);

const selectMachine = (machine: Machine) => {
  selectedMachine.value = machine;
};

const addMachine = (payload: NewMachinePayload) => {
  machines.value.push({
    id: Date.now(),
    name: payload.name,
    icon: payload.icon,
    color: "grey-darken-3",
  });
  swal.toast(`เพิ่ม "${payload.name}" เรียบร้อยแล้ว`, "success");
};

const deleteMachine = async (machine: Machine) => {
  const result = await swal.warning(
    `ลบ ${machine.name}`,
    "คุณแน่ใจหรือไม่ว่าต้องการลบเครื่องจักรนี้ออกจากรายการ",
  );
  if (result.isConfirmed) {
    machines.value = machines.value.filter((m) => m.id !== machine.id);
    if (selectedMachine.value?.id === machine.id) {
      selectedMachine.value = null;
    }
    swal.toast("ลบเรียบร้อยแล้ว", "success");
  }
};

// วิเคราะห์ข้อมูล
const handleAnalyze = async (_data: AnalysisFormData) => {
  isAnalyzing.value = true;

  // จำลอง Mock API/Processing เป็นเวลา 2 วินาที
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // ซ่อน loading overlay
  isAnalyzing.value = false;

  // แสดง SweetAlert Success
  await swal.success(
    "สำเร็จ",
    `วิเคราะห์ข้อมูลสำเร็จแล้ว`,
  );
};
</script>
