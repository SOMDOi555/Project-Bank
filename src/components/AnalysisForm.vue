<template>
  <div class="machine-form-view">
    <!-- Header Section (สไตล์เดียวกับหน้า index พร้อมภาพโรงงานและ Opacity) -->
    <div class="welcome-section mb-6">
      <!-- ภาพโรงงานพื้นหลัง พร้อมปรับ Opacity และเฟดขอบเนียนตามแบบหน้า index -->
      <div class="factory-bg-container">
        <img src="/factory2.jpg" alt="MDF Factory Plant" class="factory-img" />
      </div>

      <v-row align="center" justify="space-between" class="welcome-content">
        <v-col cols="12" md="8" lg="7">
          <div
            class="text-headline-medium font-weight-bold text-grey-darken-4 mb-1"
          >
            {{ machine.name }}
          </div>
          <div
            class="text-title-medium font-weight-bold text-grey-darken-3 mb-2"
          >
            กรอกข้อมูลสำหรับวิเคราะห์ข้อมูล
          </div>
        </v-col>
      </v-row>
    </div>

    <!-- กลุ่มที่ 1: Product -->
      <div class="mb-6 border rounded-lg pa-4">
        <v-row>
          <v-col cols="12">
            <div class="text-title-medium font-weight-bold">1. Product</div>
          </v-col>
        </v-row>

        <v-row>
          <!-- 1. Lot -->
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="formData.lot"
              type="number"
              label="Lot"
              placeholder="000"
              persistent-placeholder
              variant="outlined"
              density="comfortable"
              rounded="lg"
              hint="Ex. 377"
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
              placeholder="00"
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
    <div class="mb-6 border rounded-lg pa-4">
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
            hint="Ex. 2.00 "
            persistent-hint
            clearable
          />
        </v-col>

        <!-- 2. Volume -->
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="formData.volume"
            label="Volume (ปริมาตร)"
            suffix="ml"
            hint="Ex. 41"
            persistent-placeholder
            persistent-hint
            clearable
            variant="outlined"
            density="comfortable"
            rounded="lg"
            :rules="[
              (v) =>
                v === '' ||
                v === null ||
                (!isNaN(v) && Number(v) >= 40) ||
                'ต้องไม่น้อยกว่า 40',
              (v) =>
                v === '' ||
                v === null ||
                (!isNaN(v) && Number(v) <= 50) ||
                'ต้องไม่เกิน 50',
            ]"
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
    <div class="mb-6 border rounded-lg pa-4">
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
            :rules="[
              (v) =>
                v === '' ||
                v === null ||
                (!isNaN(v) && Number(v) >= 55) ||
                'ต้องไม่น้อยกว่า 55',
              (v) =>
                v === '' ||
                v === null ||
                (!isNaN(v) && Number(v) <= 65) ||
                'ต้องไม่เกิน 65',
            ]"
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
            hint="Ex. 10"
            persistent-hint
            clearable
            :rules="[
              (v) =>
                v === '' ||
                v === null ||
                (!isNaN(v) && Number(v) >= 10) ||
                'ต้องไม่น้อยกว่า 10',
              (v) =>
                v === '' ||
                v === null ||
                (!isNaN(v) && Number(v) <= 20) ||
                'ต้องไม่เกิน 20',
            ]"
          />
        </v-col>

        <!-- 3. Damper 1 -->
        <v-col cols="12" sm="6" md="3">
          <v-select
            v-model="formData.damper1"
            :items="damperOptions"
            label="3. Damper 1"
            placeholder="00"
            persistent-placeholder
            variant="outlined"
            density="comfortable"
            rounded="lg"
            suffix="mm"
            clearable
          />
        </v-col>

        <!-- 4. Damper 2 -->
        <v-col cols="12" sm="6" md="3">
          <v-select
            v-model="formData.damper2"
            :items="damperOptions"
            label="4. Damper 2"
            placeholder="00"
            persistent-placeholder
            variant="outlined"
            density="comfortable"
            rounded="lg"
            suffix="mm"
            clearable
          />
        </v-col>
      </v-row>
    </div>

    <!-- ปุ่ม Action: Responsive เต็มจอบนมือถือ / กะทัดรัดชิดขวาบนคอม -->
    <v-row class="mt-4">
      <v-col
        cols="12"
        class="d-flex flex-column flex-sm-row justify-sm-end ga-3"
      >
        <v-btn
          variant="outlined"
          rounded="lg"
          size="large"
          class="w-100 w-sm-auto"
          prepend-icon="mdi-chevron-left"
          @click="emit('back')"
        >
          ย้อนกลับ
        </v-btn>
        <v-btn
          variant="outlined"
          rounded="lg"
          size="large"
          class="w-100 w-sm-auto"
          prepend-icon="mdi-reload"
          @click="resetForm"
        >
          ล้างค่า
        </v-btn>
        <v-btn
          variant="flat"
          rounded="lg"
          size="large"
          class="bg-primary w-100 w-sm-auto"
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

// ตัวเลือกสำหรับ Thickness, Product และ Damper
const thicknessOptions = [4, 6, 9, 12, 15, 18, 25];
const productOptions = ["HMR AA"];
const damperOptions = [30];

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
  damper1: null,
  damper2: null,
};

const formData = ref<AnalysisFormData>({ ...initialFormData });

// ล้างค่าฟอร์ม
const resetForm = () => {
  formData.value = { ...initialFormData };
  swal.toast("ล้างค่าเรียบร้อย", "success");
};

// ตรวจสอบความถูกต้องและครบถ้วนของข้อมูล
const validateForm = (): boolean => {
  if (!formData.value.lot) {
    swal.warning("แจ้งเตือน", "กรุณากรอก Lot");
    return false;
  }
  if (!formData.value.thickness) {
    swal.warning("แจ้งเตือน", "กรุณาเลือก Thickness");
    return false;
  }
  if (!formData.value.product) {
    swal.warning("แจ้งเตือน", "กรุณาเลือก Product");
    return false;
  }
  if (!formData.value.weight) {
    swal.warning("แจ้งเตือน", "กรุณากรอก Weight (น้ำหนัก)");
    return false;
  }
  if (!formData.value.volume) {
    swal.warning("แจ้งเตือน", "กรุณากรอก Volume (ปริมาตร)");
    return false;
  }
  const vol = Number(formData.value.volume);
  if (isNaN(vol) || vol < 40 || vol > 50) {
    swal.warning("แจ้งเตือน", "Volume ต้องอยู่ระหว่าง 40 ถึง 50 ml");
    return false;
  }
  if (!formData.value.moisture) {
    swal.warning("แจ้งเตือน", "กรุณากรอก ความชื้น (%MC)");
    return false;
  }
  if (!formData.value.circulate) {
    swal.warning("แจ้งเตือน", "กรุณากรอก Circulate");
    return false;
  }
  const circ = Number(formData.value.circulate);
  if (isNaN(circ) || circ < 55 || circ > 65) {
    swal.warning("แจ้งเตือน", "Circulate ต้องอยู่ระหว่าง 55 ถึง 65 %");
    return false;
  }
  if (!formData.value.pressure) {
    swal.warning("แจ้งเตือน", "กรุณากรอก Pressure control");
    return false;
  }
  const press = Number(formData.value.pressure);
  if (isNaN(press) || press < 10 || press > 20) {
    swal.warning("แจ้งเตือน", "Pressure control ต้องอยู่ระหว่าง 10 ถึง 20 %");
    return false;
  }
  if (formData.value.damper1 === null || formData.value.damper1 === undefined) {
    swal.warning("แจ้งเตือน", "กรุณาเลือก Damper 1");
    return false;
  }
  if (formData.value.damper2 === null || formData.value.damper2 === undefined) {
    swal.warning("แจ้งเตือน", "กรุณาเลือก Damper 2");
    return false;
  }
  return true;
};

// ส่งข้อมูลวิเคราะห์
const handleSubmit = () => {
  if (!validateForm()) {
    return;
  }
  emit("submit", { ...formData.value });
};
</script>

<style scoped>
.welcome-section {
  position: relative;
  min-height: 180px;
}

.welcome-content {
  position: relative;
  z-index: 1;
}

.factory-bg-container {
  position: absolute;
  top: -15px;
  right: 0;
  width: 50%;
  max-width: 540px;
  height: calc(100% + 20px);
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.factory-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 65%;
  opacity: 0.45;
  -webkit-mask-image:
    linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 1) 35%),
    linear-gradient(to top, transparent 0%, rgba(0, 0, 0, 1) 25%);
  mask-image:
    linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 1) 35%),
    linear-gradient(to top, transparent 0%, rgba(0, 0, 0, 1) 25%);
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
}

@media (max-width: 768px) {
  .factory-bg-container {
    width: 65%;
    opacity: 0.35;
  }
}
</style>
