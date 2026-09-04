<template>
  <div class="machine-list-view">
    <!-- Header -->
    <v-row class="mb-4">
      <v-col cols="12">
        <div class="text-headline-medium font-weight-bold text-grey-darken-4">
          รายการเครื่องจักร
        </div>
      </v-col>
    </v-row>

    <!-- กลุ่ม Card เครื่องจักร + ปุ่มเพิ่ม (+) -->
    <v-row>
      <v-col cols="12">
        <div class="d-flex flex-wrap align-center ga-5">
          <!-- Card เครื่องจักรแต่ละตัว -->
          <div
            v-for="machine in machines"
            :key="machine.id"
            class="machine-card position-relative"
            @click="emit('select', machine)"
          >

            <div
              class="d-flex flex-column align-center justify-center h-100 text-center px-2"
            >
              <v-icon
                size="48"
                :color="machine.color || 'grey-darken-3'"
                class="mb-2"
              >
                {{ machine.icon }}
              </v-icon>
              <span
                class="text-title-small font-weight-bold text-truncate w-100 text-grey-darken-3"
              >
                {{ machine.name }}
              </span>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Machine, NewMachinePayload } from "@/types/machine";

defineProps<{
  machines: Machine[];
}>();

const emit = defineEmits<{
  (e: "select", machine: Machine): void;
  (e: "delete", machine: Machine): void;
  (e: "add", payload: NewMachinePayload): void;
}>();

// รายการไอคอนที่มีให้เลือก
const availableIcons = [
  "mdi-robot-industrial",
  "mdi-cog",
  "mdi-cog-sync",
  "mdi-engine",
  "mdi-factory",
  "mdi-printer-3d",
  "mdi-hammer-wrench",
  "mdi-conveyor-belt",
];

const dialog = ref(false);
const newMachine = ref<NewMachinePayload>({
  name: "",
  icon: "mdi-robot-industrial",
});

const openAddDialog = () => {
  newMachine.value = {
    name: "",
    icon: "mdi-robot-industrial",
  };
  dialog.value = true;
};

const closeDialog = () => {
  newMachine.value = {
    name: "",
    icon: "mdi-robot-industrial",
  };
  dialog.value = false;
};

const saveMachine = () => {
  const trimmedName = newMachine.value.name?.trim();
  if (!trimmedName) return;

  emit("add", {
    name: trimmedName,
    icon: newMachine.value.icon,
  });

  closeDialog();
};
</script>

<style scoped>
.machine-card {
  width: 140px;
  height: 140px;
  background-color: #e5e7eb;
  border-radius: 28px;
  cursor: pointer;
  user-select: none;
}

.machine-card:hover {
  background-color: #d1d5db;
}

.add-card {
  background-color: #e5e7eb;
}

.add-card:hover {
  background-color: #d1d5db;
}

.delete-btn {
  position: absolute;
  top: 6px;
  right: 6px;
  opacity: 0;
  transition: opacity 0.15s ease;
}

.machine-card:hover .delete-btn {
  opacity: 1;
}

.icon-choice {
  transition: transform 0.15s ease;
}

.icon-choice:hover {
  transform: scale(1.1);
}
</style>
