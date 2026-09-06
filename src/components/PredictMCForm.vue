<template>
  <div>
    <!-- Header Section (สไตล์เดียวกับหน้า index พร้อมภาพโรงงานและ Opacity) -->
    <div class="welcome-section">
      <!-- ภาพโรงงานพื้นหลัง พร้อมปรับ Opacity และเฟดขอบเนียนตามแบบหน้า index -->
      <div class="factory-bg-container">
        <img src="/factory2.jpg" alt="MDF Factory Plant" class="factory-img" />
      </div>

      <v-row align="center" justify="space-between" class="welcome-content">
        <v-col cols="12" md="8" lg="7">
          <div
            class="text-headline-medium font-weight-bold text-grey-darken-4 mb-1"
          >
            Predict %MC Forming
          </div>
          <div
            class="text-title-medium font-weight-bold text-grey-darken-3 mb-2"
          >
            กรอกข้อมูลสำหรับทำนายความชื้น (%MC)
          </div>
        </v-col>
      </v-row>
    </div>

    <!-- Form -->
    <v-form ref="formRef" @submit.prevent="handleSubmit">
      <!-- หมวดที่ 1: ข้อมูลทั่วไป (ไม่มี Badge ตามคำขอ) -->
      <div class="mb-6 border rounded-lg pa-4">
        <v-row class="mb-1">
          <v-col cols="12">
            <div class="text-title-medium font-weight-bold">1. ข้อมูลทั่วไป</div>
          </v-col>
        </v-row>

        <v-row>
          <!-- 1. Date -->
          <v-col cols="12" md="3">
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
                  persistent-hint
                  clearable
                  hint="(ตัวอย่าง 01/09/2026)"
                  v-bind="props"
                  :rules="[(v) => !!v || 'กรุณากรอก Date (วันที่)']"
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
          <v-col cols="12" md="3">
            <v-text-field
              v-model="formData.time"
              label="2. Time"
              placeholder="19:57"
              persistent-placeholder
              variant="outlined"
              density="comfortable"
              rounded="lg"
              persistent-hint
              hint="(ตัวอย่าง 19:57)"
              readonly
              :rules="[(v) => !!v || 'กรุณากรอก Time (เวลา)']"
            />
          </v-col>

          <!-- 3. Thickness (Required *) -->
          <v-col cols="12" md="3">
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
                <span
                  >3. Thickness
                  <span class="text-error font-weight-bold">*</span></span
                >
              </template>
            </v-select>
          </v-col>

          <!-- 4. Product -->
          <v-col cols="12" md="3">
            <v-select
              v-model="formData.product"
              :items="productOptions"
              label="4. Product"
              placeholder="HMR AA"
              persistent-placeholder
              variant="outlined"
              density="comfortable"
              rounded="lg"
              clearable
              :rules="[(v) => !!v || 'กรุณาเลือก Product']"
            />
          </v-col>
        </v-row>
      </div>

      <!-- หมวดที่ 2: ข้อมูลวิเคราะห์ (ไม่มี Badge ตามคำขอ) -->
      <div class="mb-6 border rounded-lg pa-4">
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
          <v-col cols="12" md="4">
            <v-text-field
              v-model="formData.tempDryerInlet"
              type="number"
              step="0.01"
              label="1. Temp dryer inlet"
              placeholder="00.00"
              persistent-placeholder
              variant="outlined"
              density="comfortable"
              rounded="lg"
              suffix="°C"
              persistent-hint
              hint="(ตัวอย่าง 120.50)"
              clearable
              :rules="[(v) => (v !== '' && v !== null && v !== undefined) || 'กรุณากรอก Temp dryer inlet']"
            />
          </v-col>

          <!-- 2. Temp dryer outlet -->
          <v-col cols="12" md="4">
            <v-text-field
              v-model="formData.tempDryerOutlet"
              type="number"
              step="0.01"
              label="2. Temp dryer outlet"
              placeholder="00.00"
              persistent-placeholder
              variant="outlined"
              density="comfortable"
              rounded="lg"
              suffix="°C"
              hint="(ตัวอย่าง 52.46)"
              persistent-hint
              clearable
              :rules="[(v) => (v !== '' && v !== null && v !== undefined) || 'กรุณากรอก Temp dryer outlet']"
            />
          </v-col>

          <!-- 3. Temp fiber dryer -->
          <v-col cols="12" md="4">
            <v-text-field
              v-model="formData.tempFiberDryer"
              type="number"
              step="0.01"
              label="3. Temp fiber dryer"
              placeholder="00.00"
              persistent-placeholder
              variant="outlined"
              density="comfortable"
              rounded="lg"
              suffix="°C"
              persistent-hint
              hint="(ตัวอย่าง 49.01)"
              clearable
              :rules="[(v) => (v !== '' && v !== null && v !== undefined) || 'กรุณากรอก Temp fiber dryer']"
            />
          </v-col>
        </v-row>

        <!-- Row 2: Scalper, Bulk, Ambient, RH (4 คอลัมน์) -->
        <v-row>
          <!-- 4. Scalper -->
          <v-col cols="12" md="4">
            <v-text-field
              v-model="formData.scalper"
              type="number"
              step="0.01"
              label="4. Scalper"
              placeholder="00.00"
              persistent-placeholder
              variant="outlined"
              density="comfortable"
              rounded="lg"
              suffix="mm"
              hint="(ตัวอย่าง 202.10)"
              persistent-hint
              clearable
              :rules="[(v) => (v !== '' && v !== null && v !== undefined) || 'กรุณากรอก Scalper']"
            />
          </v-col>

          <!-- 5. Bulk -->
          <v-col cols="12" md="4">
            <v-text-field
              v-model="formData.bulk"
              type="number"
              step="0.01"
              label="5. Bulk"
              placeholder="00.00"
              persistent-placeholder
              variant="outlined"
              density="comfortable"
              rounded="lg"
              suffix="kg/m³"
              hint="(ตัวอย่าง 81)"
              persistent-hint
              clearable
              :rules="[(v) => (v !== '' && v !== null && v !== undefined) || 'กรุณากรอก Bulk']"
            />
          </v-col>

          <!-- 6. Temp ambient -->
          <v-col cols="12" md="4">
            <v-text-field
              v-model="formData.tempAmbient"
              type="number"
              step="0.01"
              label="6. Temp ambient"
              placeholder="00.00"
              persistent-placeholder
              variant="outlined"
              density="comfortable"
              rounded="lg"
              suffix="°C"
              persistent-hint
              hint="(ตัวอย่าง 30.20)"
              clearable
              :rules="[(v) => (v !== '' && v !== null && v !== undefined) || 'กรุณากรอก Temp ambient']"
            />
          </v-col>
        </v-row>
        <v-row>
          <!-- 7. RH -->
          <v-col cols="12" md="4">
            <v-text-field
              v-model="formData.rh"
              type="number"
              step="1"
              label="7. RH"
              placeholder="00"
              persistent-placeholder
              variant="outlined"
              density="comfortable"
              rounded="lg"
              suffix="%"
              persistent-hint
              hint="(ตัวอย่าง 59)"
              clearable
              :rules="[(v) => (v !== '' && v !== null && v !== undefined) || 'กรุณากรอก RH']"
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
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useSwal } from "@/plugins/sweetalert";
import type { VForm } from "vuetify/components";
import { calculateMCFromFormData, formatMC } from "@/utils/predictMC";
import type { PredictMCFormData } from "@/types/predictMC";

const formRef = ref<InstanceType<typeof VForm> | null>(null);

// นาฬิกาแสดงเวลาปัจจุบันสำหรับ Status Bar
const currentTime = ref("");
const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

onMounted(() => {
  updateTime();
  const timer = setInterval(updateTime, 1000);
  onUnmounted(() => clearInterval(timer));
});

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

// Helper: เวลาปัจจุบันในรูปแบบ HH:MM
const getCurrentTime = (): string => {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
};

// ค่าเริ่มต้นของฟอร์ม (ตั้งค่าตัวอย่างตามรูปภาพ)
const initialFormData: PredictMCFormData = {
  // 1. ข้อมูลทั่วไป
  date: "",
  time: getCurrentTime(),
  thickness: null,
  product: "",

  // 2. ข้อมูลวิเคราะห์
  tempDryerInlet: "",
  tempDryerOutlet: "",
  tempFiberDryer: "",
  scalper: "",
  bulk: "",
  tempAmbient: "",
  rh: "",
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
    time: getCurrentTime(),
    thickness: null,
    product: "",
    tempDryerInlet: "",
    tempDryerOutlet: "",
    tempFiberDryer: "",
    scalper: "",
    bulk: "",
    tempAmbient: "",
    rh: "",
  };
  formRef.value?.resetValidation();
  swal.toast("ล้างค่าเรียบร้อย", "success");
};

// ตรวจสอบความถูกต้องและครบถ้วนของข้อมูล
const validateForm = (): boolean => {
  if (!formData.value.date) {
    swal.warning("แจ้งเตือน", "กรุณากรอก Date (วันที่)");
    return false;
  }
  if (!formData.value.time) {
    swal.warning("แจ้งเตือน", "กรุณากรอก Time (เวลา)");
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
  if (!formData.value.tempDryerInlet) {
    swal.warning("แจ้งเตือน", "กรุณากรอก Temp dryer inlet");
    return false;
  }
  if (!formData.value.tempDryerOutlet) {
    swal.warning("แจ้งเตือน", "กรุณากรอก Temp dryer outlet");
    return false;
  }
  if (!formData.value.tempFiberDryer) {
    swal.warning("แจ้งเตือน", "กรุณากรอก Temp fiber dryer");
    return false;
  }
  if (!formData.value.scalper) {
    swal.warning("แจ้งเตือน", "กรุณากรอก Scalper");
    return false;
  }
  if (!formData.value.bulk) {
    swal.warning("แจ้งเตือน", "กรุณากรอก Bulk");
    return false;
  }
  if (!formData.value.tempAmbient) {
    swal.warning("แจ้งเตือน", "กรุณากรอก Temp ambient");
    return false;
  }
  if (!formData.value.rh) {
    swal.warning("แจ้งเตือน", "กรุณากรอก RH");
    return false;
  }
  return true;
};

// ส่งข้อมูลวิเคราะห์
const handleSubmit = async () => {
  if (formRef.value) {
    const { valid } = await formRef.value.validate();
    if (!valid) {
      validateForm();
      return;
    }
  }
  if (!validateForm()) {
    return;
  }
  emit("submit", { ...formData.value }, predictedMC.value);
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

.green-wave-accent {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 65%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-leaf {
  position: absolute;
  pointer-events: none;
  z-index: 2;
  opacity: 0.7;
}

.leaf-1 {
  top: 35%;
  left: 25%;
  transform: rotate(-20deg);
}

.leaf-2 {
  top: 60%;
  left: 15%;
  transform: rotate(40deg);
  opacity: 0.55;
}

@media (max-width: 768px) {
  .factory-bg-container {
    width: 65%;
    opacity: 0.35;
  }
}
</style>
