<template>
  <div class="predict-mc-form-view">
    <!-- Header -->
    <div class="text-headline-medium font-weight-bold mb-3">
      Predict %MC Forming
    </div>
    <div class="text-title-medium font-weight-bold mb-2">
      กรอกข้อมูลสำหรับทำนายความชื้น (%MC)
    </div>

    <!-- หมวดที่ 1: ข้อมูลทั่วไป (ไม่มี Badge ตามคำขอ) -->
    <div class="mb-6">
      <v-row class="mb-1">
        <v-col cols="12">
          <div class="text-title-medium font-weight-bold">
            1. ข้อมูลทั่วไป
          </div>
        </v-col>
      </v-row>

      <v-row>
        <!-- 1. Date -->
        <v-col cols="12" sm="6" md="3">
          <v-menu
            v-model="dateMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            min-width="auto"
          >
            <template #activator="{ props }">
              <v-text-field
                v-model="formData.date"
                label="1. Date"
                placeholder="01/09/2026"
                persistent-placeholder
                variant="outlined"
                density="comfortable"
                rounded="lg"
                hint="(ตัวอย่าง 01/09/2026)"
                persistent-hint
                clearable
                v-bind="props"
              />
            </template>
            <v-date-picker
              v-model="selectedDate"
              color="primary"
              @update:model-value="onDateSelected"
            />
          </v-menu>
        </v-col>

        <!-- 2. Time -->
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="formData.time"
            label="2. Time"
            placeholder="19:57"
            persistent-placeholder
            variant="outlined"
            density="comfortable"
            rounded="lg"
            hint="(ตัวอย่าง 19:57)"
            persistent-hint
            clearable
          />
        </v-col>

        <!-- 3. Thickness (Required *) -->
        <v-col cols="12" sm="6" md="3">
          <v-select
            v-model="formData.thickness"
            :items="thicknessOptions"
            placeholder="15"
            persistent-placeholder
            variant="outlined"
            density="comfortable"
            rounded="lg"
            suffix="mm"
            clearable
            :rules="[(v) => !!v || 'กรุณาเลือก Thickness']"
          >
            <template #label>
              <span>3. Thickness <span class="text-error font-weight-bold">*</span></span>
            </template>
          </v-select>
        </v-col>

        <!-- 4. Product (Fix) -->
        <v-col cols="12" sm="6" md="3">
          <v-select
            v-model="formData.product"
            :items="productOptions"
            label="4. Product"
            variant="outlined"
            density="comfortable"
            rounded="lg"
            readonly
          />
        </v-col>
      </v-row>
    </div>

    <!-- หมวดที่ 2: ข้อมูลวิเคราะห์ (ไม่มี Badge ตามคำขอ) -->
    <div class="mb-6">
      <v-row class="mb-1">
        <v-col cols="12">
          <div class="text-title-medium font-weight-bold">
            2. ข้อมูลวิเคราะห์
          </div>
        </v-col>
      </v-row>

      <!-- Row 1: Temp Dryer Inputs (3 คอลัมน์) -->
      <v-row>
        <!-- 1. Temp dryer inlet -->
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="formData.tempDryerInlet"
            type="number"
            step="0.01"
            label="1. Temp dryer inlet"
            placeholder="120.50"
            persistent-placeholder
            variant="outlined"
            density="comfortable"
            rounded="lg"
            suffix="°C"
            hint="(ตัวอย่าง 120.5)"
            persistent-hint
            clearable
          />
        </v-col>

        <!-- 2. Temp dryer outlet -->
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="formData.tempDryerOutlet"
            type="number"
            step="0.01"
            label="2. Temp dryer outlet"
            placeholder="52.46"
            persistent-placeholder
            variant="outlined"
            density="comfortable"
            rounded="lg"
            suffix="°C"
            hint="(ตัวอย่าง 52.46)"
            persistent-hint
            clearable
          />
        </v-col>

        <!-- 3. Temp fiber dryer -->
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="formData.tempFiberDryer"
            type="number"
            step="0.01"
            label="3. Temp fiber dryer"
            placeholder="49.01"
            persistent-placeholder
            variant="outlined"
            density="comfortable"
            rounded="lg"
            suffix="°C"
            hint="(ตัวอย่าง 49.01)"
            persistent-hint
            clearable
          />
        </v-col>
      </v-row>

      <!-- Row 2: Scalper, Bulk, Ambient, RH (4 คอลัมน์) -->
      <v-row>
        <!-- 4. Scalper -->
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="formData.scalper"
            type="number"
            step="0.01"
            label="4. Scalper"
            placeholder="202.10"
            persistent-placeholder
            variant="outlined"
            density="comfortable"
            rounded="lg"
            suffix="mm"
            hint="(ตัวอย่าง 202.1)"
            persistent-hint
            clearable
          />
        </v-col>

        <!-- 5. Bulk -->
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="formData.bulk"
            type="number"
            step="0.01"
            label="5. Bulk"
            placeholder="81.00"
            persistent-placeholder
            variant="outlined"
            density="comfortable"
            rounded="lg"
            suffix="kg/m³"
            hint="(ตัวอย่าง 81)"
            persistent-hint
            clearable
          />
        </v-col>

        <!-- 6. Temp ambient -->
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="formData.tempAmbient"
            type="number"
            step="0.01"
            label="6. Temp ambient"
            placeholder="30.20"
            persistent-placeholder
            variant="outlined"
            density="comfortable"
            rounded="lg"
            suffix="°C"
            hint="(ตัวอย่าง 30.2)"
            persistent-hint
            clearable
          />
        </v-col>

        <!-- 7. RH -->
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="formData.rh"
            type="number"
            step="1"
            label="7. RH"
            placeholder="59"
            persistent-placeholder
            variant="outlined"
            density="comfortable"
            rounded="lg"
            suffix="%"
            hint="(ตัวอย่าง 59)"
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
          class="bg-primary"
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
import { ref, computed } from "vue";
import { useSwal } from "@/plugins/sweetalert";
import { calculateMCFromFormData, formatMC } from "@/utils/predictMC";
import type { PredictMCFormData } from "@/types/predictMC";

const emit = defineEmits<{
  (e: "back"): void;
  (e: "submit", data: PredictMCFormData, predictedMC?: number | null): void;
}>();

const swal = useSwal();

// ตัวเลือก
const thicknessOptions = [4, 6, 9, 12, 15, 18, 25];
const productOptions = ["HMR AA"];

// จัดการ DatePicker Pop-up
const dateMenu = ref(false);
const selectedDate = ref<Date | null>(null);

const onDateSelected = (val: unknown) => {
  if (val) {
    const d = new Date(val as string | number | Date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    formData.value.date = `${day}/${month}/${year}`;
  }
  dateMenu.value = false;
};

// ค่าเริ่มต้นของฟอร์ม (ตั้งค่าตัวอย่างตามรูปภาพ)
const initialFormData: PredictMCFormData = {
  // 1. ข้อมูลทั่วไป
  date: "01/09/2026",
  time: "19:57",
  thickness: 15,
  product: "HMR AA",

  // 2. ข้อมูลวิเคราะห์
  tempDryerInlet: "120.50",
  tempDryerOutlet: "52.46",
  tempFiberDryer: "49.01",
  scalper: "202.10",
  bulk: "81.00",
  tempAmbient: "30.20",
  rh: "59",
};

const formData = ref<PredictMCFormData>({ ...initialFormData });

// ─── MC Calculation Logic (Using Centralized Utils) ──────────────────────────

// Computed property คำนวณ %MC อัตโนมัติทุกครั้งที่ Input เปลี่ยนแปลง
const predictedMC = computed<number | null>(() => {
  return calculateMCFromFormData(formData.value);
});

// รูปแบบแสดงผลทศนิยม 2 ตำแหน่ง
const formattedMC2 = computed<string>(() => {
  return formatMC(predictedMC.value, 2);
});

// รูปแบบแสดงผลทศนิยม 3 ตำแหน่ง
const formattedMC3 = computed<string>(() => {
  return formatMC(predictedMC.value, 3);
});

// ล้างค่าฟอร์ม
const resetForm = () => {
  formData.value = {
    date: "",
    time: "",
    thickness: null,
    product: "HMR AA",
    tempDryerInlet: "",
    tempDryerOutlet: "",
    tempFiberDryer: "",
    scalper: "",
    bulk: "",
    tempAmbient: "",
    rh: "",
  };
  swal.toast("ล้างค่าเรียบร้อย", "info");
};

// ส่งข้อมูลวิเคราะห์
const handleSubmit = () => {
  if (!formData.value.thickness) {
    swal.warning("กรุณากรอกข้อมูล", "กรุณาเลือก Thickness ก่อนทำการวิเคราะห์");
    return;
  }
  emit("submit", { ...formData.value }, predictedMC.value);
};
</script>

