<template>
  <div class="machine-form-view">
    <!-- Header -->
    <div class="text-headline-medium font-weight-bold mb-3">
      {{ machine.name }}
    </div>
    <div class="text-title-medium font-weight-bold mb-2">
      กรอกข้อมูลสำหรับวิเคราะห์ข้อมูล
    </div>

    <!-- กลุ่มที่ 1: Product -->
    <div class="mb-6">
      <v-row>
        <v-col cols="12">
          <div class="text-title-medium font-weight-bold">
            1. Product
          </div>
        </v-col>
      </v-row>

      <v-row>
        <!-- 1. Lot -->
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="formData.lot"
            type="number"
            step="0.01"
            label="Lot"
            placeholder="0.00"
            persistent-placeholder
            variant="outlined"
            density="comfortable"
            rounded="lg"
            hint="Ex. 555"
            persistent-hint
            clearable
          />
        </v-col>

        <!-- 2. Thickness -->
        <v-col cols="12" sm="6" md="4">
          <v-select
            v-model="formData.thickness"
            :items="thicknessOptions"
            label="Thickness"
            placeholder="0.00"
            persistent-placeholder
            variant="outlined"
            density="comfortable"
            rounded="lg"
            suffix="mm"
            clearable
          />
        </v-col>

        <!-- 3. Product -->
        <v-col cols="12" sm="6" md="4">
          <v-select
            v-model="formData.product"
            :items="productOptions"
            label="Product"
            placeholder="0.00"
            persistent-placeholder
            variant="outlined"
            density="comfortable"
            rounded="lg"
            persistent-hint
            clearable
          />
        </v-col>
      </v-row>
    </div>

    <!-- กลุ่มที่ 2: Fiber Condition -->
    <div class="mb-6">
      <v-row>
        <v-col cols="12">
          <div class="text-title-medium font-weight-bold">
            2. Fiber Condition
          </div>
        </v-col>
      </v-row>

      <v-row>
        <!-- 1. Weight -->
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="formData.weight"
            type="number"
            step="0.01"
            label="Weight(น้ำหนัก)"
            placeholder="00.00"
            persistent-placeholder
            variant="outlined"
            density="comfortable"
            rounded="lg"
            suffix="g"
            hint="Ex. 555"
            persistent-hint
            clearable
          />
        </v-col>

        <!-- 2. Volume -->
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="formData.volume"
            type="number"
            step="0.01"
            label="Volume (ปริมาตร)"
            placeholder="00"
            persistent-placeholder
            variant="outlined"
            density="comfortable"
            rounded="lg"
            suffix="ml"
            hint="Ex. 41"
            persistent-hint
            clearable
          />
        </v-col>

        <!-- 3. ความชื้น (%MC) -->
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="formData.moisture"
            type="number"
            step="0.01"
            label="ความชื้น (%MC)"
            placeholder="00.00"
            persistent-placeholder
            variant="outlined"
            density="comfortable"
            rounded="lg"
            suffix="%"
            hint="Ex. 10.25"
            persistent-hint
            clearable
          />
        </v-col>
      </v-row>
    </div>

    <!-- กลุ่มที่ 3: Sifter condition -->
    <div class="mb-6">
      <v-row>
        <v-col cols="12">
          <div class="text-title-medium font-weight-bold">
            3. Sifter condition
          </div>
        </v-col>
      </v-row>

      <v-row>
        <!-- 1. Circulate -->
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="formData.circulate"
            type="number"
            label="1. Circulate"
            placeholder="00"
            persistent-placeholder
            variant="outlined"
            density="comfortable"
            rounded="lg"
            suffix="%"
            hint="Ex. 65"
            persistent-hint
            clearable
          />
        </v-col>

        <!-- 2. Pressure control -->
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="formData.pressure"
            type="number"
            step="0.1"
            label="2. Pressure control"
            placeholder="00.0"
            persistent-placeholder
            variant="outlined"
            density="comfortable"
            rounded="lg"
            suffix="%"
            hint="Ex. 11.8"
            persistent-hint
            clearable
          />
        </v-col>

        <!-- 3. Damper 1 -->
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="formData.damper1"
            type="number"
            label="3. Damper 1"
            placeholder="00"
            persistent-placeholder
            variant="outlined"
            density="comfortable"
            rounded="lg"
            suffix="mm"
            hint="Ex. 30"
            persistent-hint
            clearable
          />
        </v-col>

        <!-- 4. Damper 2 -->
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="formData.damper2"
            type="number"
            label="4. Damper 2"
            placeholder="00"
            persistent-placeholder
            variant="outlined"
            density="comfortable"
            rounded="lg"
            suffix="mm"
            hint="Ex. 30"
            persistent-hint
            clearable
          />
        </v-col>
      </v-row>
    </div>

    <!-- ปุ่ม Action ด้านล่างขวา (Responsive) -->
    <v-row class="mt-4">
      <v-col cols="12" class="d-flex justify-end flex-wrap ga-3">
        <v-btn
          variant="outlined"
          rounded="lg"
          size="large"
          prepend-icon="mdi-chevron-left"
          @click="emit('back')"
        >
          ย้อนกลับ
        </v-btn>
        <v-btn
          variant="outlined"
          rounded="lg"
          size="large"
          prepend-icon="mdi-reload"
          @click="resetForm"
        >
          ล้างค่า
        </v-btn>
        <v-btn
          variant="flat"
          rounded="lg"
          size="large"
          class="bg-black"
          prepend-icon="mdi-google-analytics"
          @click="handleSubmit"
        >
          วิเคราะห์ข้อมูล
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSwal } from "@/plugins/sweetalert";
import type { Machine, AnalysisFormData } from "@/types/machine";

defineProps<{
  machine: Machine;
}>();

const emit = defineEmits<{
  (e: "back"): void;
  (e: "submit", data: AnalysisFormData): void;
}>();

const swal = useSwal();

// ตัวเลือกสำหรับ Thickness และ Product
const thicknessOptions = [4, 6, 9, 12, 15, 18, 25];
const productOptions = ["HMR AA"];

// ข้อมูล Form เริ่มต้น
const initialFormData: AnalysisFormData = {
  // 1. Product
  lot: "",
  thickness: null,
  product: null,

  // 2. Fiber Condition
  weight: "",
  volume: "",
  moisture: "",

  // 3. Sifter condition
  circulate: "",
  pressure: "",
  damper1: "",
  damper2: "",
};

const formData = ref<AnalysisFormData>({ ...initialFormData });

// ล้างค่าฟอร์ม
const resetForm = () => {
  formData.value = { ...initialFormData };
  swal.toast("ล้างค่าเรียบร้อย", "info");
};

// ส่งข้อมูลวิเคราะห์
const handleSubmit = () => {
  emit("submit", { ...formData.value });
};
</script>
