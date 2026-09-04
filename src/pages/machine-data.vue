<template>
  <v-container fluid class="pa-6 pa-md-8">
    <!-- VIEW 1: หน้า Portal / Hub เลือกโมดูล -->
    <div v-if="!selectedMachine" class="portal-wrapper">
      <!-- ส่วน Header และ Status Bar -->
      <div class="welcome-section mb-8">
        <!-- ภาพโรงงานพื้นหลัง พร้อมปรับ Opacity และเฟดขอบเนียนตามแบบ -->
        <div class="factory-bg-container">
          <img
            src="/factory2.jpg"
            alt="MDF Factory Plant"
            class="factory-img"
          />
        </div>

        <v-row align="center" justify="space-between" class="welcome-content">
          <v-col cols="12" md="8" lg="7">
            <div
              class="text-headline-medium text-medium-emphasis font-weight-bold"
            >
              Welcome to
            </div>
            <div class="text-headline-large font-weight-bold">
              <span class="text-primary font-weight-bold brand-highlight"
                >Agro</span
              >
              Fiber Control Center
            </div>
            <p
              class="text-body-1 text-grey-darken-1 mb-4"
              style="max-width: 620px; line-height: 1.6"
            >
              ศูนย์รวมเครื่องมือสำหรับควบคุม วิเคราะห์ และคาดการณ์
              เพื่อเพิ่มประสิทธิภาพการผลิต ลดปัญหาคราบดำ
              และยกระดับคุณภาพผลิตภัณฑ์
            </p>

            <!-- แถบสถานะ (Status Bar) -->
            <div
              class="status-bar d-inline-flex align-center flex-wrap ga-2 ga-sm-4 px-4 py-2 rounded-lg bg-white border"
            >
              <div class="d-flex align-center ga-2">
                <v-icon size="16" color="success">mdi-gauge-full</v-icon>
                <span class="text-caption font-weight-bold text-success"
                  >ระบบทำงานปกติ</span
                >
              </div>
              <v-divider vertical class="my-1" />
              <div
                class="d-flex align-center ga-1 text-caption text-grey-darken-2"
              >
                <v-icon size="16" color="grey-darken-1">mdi-factory</v-icon>
                <span>Plant : MDF Line 1</span>
              </div>
              <v-divider vertical class="my-1" />
              <div
                class="d-flex align-center ga-1 text-caption text-grey-darken-2"
              >
                <v-icon size="16" color="grey-darken-1"
                  >mdi-clock-outline</v-icon
                >
                <span>อัปเดตล่าสุด : {{ currentTime }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- การ์ดทั้ง 3 โมดูล -->
      <v-row class="mt-2" justify="center">
        <!-- 1. Control Sifter (จริง) -->
        <v-col cols="12" sm="6" md="4">
          <v-card
            class="portal-card h-100 d-flex flex-column pa-6 rounded-xl"
            elevation="0"
            border
          >
            <!-- กล่องแสดงรูปทรงกลม -->
            <div class="card-media-wrapper mb-5">
              <div class="card-circle bg-green-lighten-5">
                <img src="/Sifter.png" alt="Sifter" class="card-img" />
              </div>
            </div>

            <!-- ป้ายชื่อโมดูล -->
            <div class="d-flex justify-center mb-3">
              <span class="module-badge">1. Control Sifter</span>
            </div>

            <!-- คำบรรยาย -->
            <p
              class="card-desc text-center text-body-2 text-grey-darken-2 flex-grow-1 px-2 mb-6"
            >
              ควบคุมและปรับพารามิเตอร์ของ Sifter
              เพื่อให้ได้สภาวะการทำงานที่เหมาะสม และลดปัญหาคราบดำ
            </p>

            <!-- ปุ่มเริ่มใช้งาน -->
            <v-btn
              variant="outlined"
              color="primary"
              rounded="lg"
              block
              class="action-btn font-weight-bold"
              @click="startSifter"
            >
              เริ่มใช้งาน
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card>
        </v-col>

        <!-- 2. Predict %MC Forming (จริง) -->
        <v-col cols="12" sm="6" md="4">
          <v-card
            class="portal-card h-100 d-flex flex-column pa-6 rounded-xl"
            elevation="0"
            border
          >
            <!-- กล่องแสดงรูปทรงกลม (เว้นว่างรอรูป) -->
            <div class="card-media-wrapper mb-5">
              <div class="card-circle bg-pink-lighten-5">
                <!-- ปล่อยว่างรอรูป หรือแสดง icon พักไว้ก่อน -->
                <v-icon size="48" color="pink-lighten-2"
                  >mdi-water-percent</v-icon
                >
              </div>
            </div>

            <!-- ป้ายชื่อโมดูล -->
            <div class="d-flex justify-center mb-3">
              <span class="module-badge badge-pink"
                >2. Predict %MC Forming</span
              >
            </div>

            <!-- คำบรรยาย -->
            <p
              class="card-desc text-center text-body-2 text-grey-darken-2 flex-grow-1 px-2 mb-6"
            >
              ทำนายความชื้น (%MC) ของ Fiber ที่ตำแหน่ง Forming ก่อนเข้า Kuster
              Press เพื่อการวางแผนและควบคุมคุณภาพ
            </p>

            <!-- ปุ่มเริ่มใช้งาน -->
            <v-btn
              variant="outlined"
              color="primary"
              rounded="lg"
              block
              class="action-btn font-weight-bold"
              @click="startPredictMC"
            >
              เริ่มใช้งาน
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card>
        </v-col>

        <!-- 3. Kuster Press (หลอก) -->
        <v-col cols="12" sm="6" md="4">
          <v-card
            class="portal-card h-100 d-flex flex-column pa-6 rounded-xl"
            elevation="0"
            border
          >
            <!-- กล่องแสดงรูปทรงกลม (เว้นว่างรอรูป) -->
            <div class="card-media-wrapper mb-5">
              <div class="card-circle bg-amber-lighten-5">
                <!-- ปล่อยว่างรอรูป หรือแสดง icon พักไว้ก่อน -->
                <v-icon size="48" color="amber-lighten-2"
                  >mdi-printer-3d-nozzle</v-icon
                >
              </div>
            </div>

            <!-- ป้ายชื่อโมดูล -->
            <div class="d-flex justify-center mb-3">
              <span class="module-badge badge-amber">3. Kuster Press</span>
            </div>

            <!-- คำบรรยาย -->
            <p
              class="card-desc text-center text-body-2 text-grey-darken-2 flex-grow-1 px-2 mb-6"
            >
              ติดตามและวิเคราะห์ประสิทธิภาพการทำงาน ของเครื่อง Kuster Press
              เพื่อคุณภาพแผ่นสม่ำเสมอ
            </p>

            <!-- ปุ่มเริ่มใช้งาน -->
            <v-btn
              variant="outlined"
              color="primary"
              rounded="lg"
              block
              class="action-btn font-weight-bold"
              @click="handleMockModule('Kuster Press')"
            >
              เริ่มใช้งาน
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- VIEW 2: หน้าฟอร์มวิเคราะห์ข้อมูล (เปิดเมื่อคลิกเริ่มใช้งาน Sifter) -->
    <AnalysisForm
      v-else
      :machine="selectedMachine"
      @back="selectedMachine = null"
      @submit="handleAnalyze"
    />

    <!-- Loading Overlay สำหรับการประมวลผล -->
    <LoadingOverlay v-model="isAnalyzing" />
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSwal } from "@/plugins/sweetalert";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import AnalysisForm from "@/components/AnalysisForm.vue";
import type { Machine, AnalysisFormData } from "@/types/machine";

const swal = useSwal();
const router = useRouter();
const isAnalyzing = ref(false);
const selectedMachine = ref<Machine | null>(null);
const currentTime = ref("14:25 น.");

// เริ่มใช้งานโมดูล 1: Control Sifter (จริง)
const startSifter = () => {
  selectedMachine.value = {
    id: 1,
    name: "Control Sifter",
    icon: "mdi-filter-cog",
    color: "primary",
  };
};

// เริ่มใช้งานโมดูล 2: Predict %MC Forming (จริง)
const startPredictMC = () => {
  swal.toast("กำลังเข้าสู่โมดูล Predict %MC Forming", "info");
};

// โมดูล 3: Kuster Press (หลอก)
const handleMockModule = (name: string) => {
  swal.info(
    "กำลังพัฒนา",
    `ฟังก์ชัน "${name}" อยู่ระหว่างการพัฒนา (Coming Soon)`,
  );
};

// ส่งข้อมูลวิเคราะห์
const handleAnalyze = async (data: AnalysisFormData) => {
  isAnalyzing.value = true;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  isAnalyzing.value = false;

  sessionStorage.setItem(
    "analysisResult",
    JSON.stringify({
      machine: selectedMachine.value,
      formData: data,
      analyzedAt: new Date().toISOString(),
    }),
  );

  router.push("/analysis-result");
};
</script>

<style scoped>
.brand-highlight {
  position: relative;
  display: inline-block;
}

.brand-highlight::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 100%;
  height: 4px;
  background-color: #2a835f;
  border-radius: 2px;
}

.status-dot {
  width: 8px;
  height: 8px;
  background-color: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.welcome-section {
  position: relative;
  min-height: 200px;
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

.portal-card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  background: #ffffff;
}

.portal-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.08) !important;
}

.card-media-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-circle {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.card-img {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
}

.module-badge {
  padding: 4px 16px;
  font-size: 0.9rem;
  font-weight: 700;
  border-radius: 9999px;
  display: inline-block;
}

.badge-green {
  background-color: #dcfce7;
  color: #15803d;
}

.badge-pink {
  background-color: #fce7f3;
  color: #be185d;
}

.badge-amber {
  background-color: #fef9c3;
  color: #a16207;
}

.card-desc {
  line-height: 1.6;
}

.action-btn {
  border-color: #2a835f !important;
  color: #2a835f !important;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background-color: #2a835f !important;
  color: #ffffff !important;
}
</style>
