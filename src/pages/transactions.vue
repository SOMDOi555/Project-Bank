<template>
  <v-container fluid class="pa-6">
    <v-card class="pa-6" rounded="lg" elevation="1">
      <h2 class="text-h5 font-weight-bold mb-2">หน้าประวัติธุรกรรม (Transactions)</h2>
      <p class="text-medium-emphasis mb-6">
        นี่คือหน้าตัวอย่างที่ 2 สำหรับทดสอบการกดเมนูจาก Sidebar และทดสอบ MDI Icon
      </p>

      <v-alert
        type="info"
        variant="tonal"
        icon="mdi-information"
        class="mb-6"
        rounded="lg"
      >
        ทดสอบใช้งาน <strong>MDI Icons กับ SweetAlert2</strong> ผ่านปุ่มด้านล่างนี้ได้ทันที:
      </v-alert>

      <!-- ทดสอบปุ่ม SweetAlert และ MDI Icon -->
      <div class="d-flex flex-wrap gap-2">
        <v-btn color="success" class="mr-2 mb-2" @click="testSuccess">
          <v-icon class="mr-1">mdi-check-circle</v-icon>
          Standard Success
        </v-btn>

        <v-btn color="primary" class="mr-2 mb-2" @click="testMdiBank">
          <v-icon class="mr-1">mdi-bank-transfer</v-icon>
          MDI Bank Alert
        </v-btn>

        <v-btn color="purple" class="mr-2 mb-2" @click="testMdiShield">
          <v-icon class="mr-1">mdi-shield-check</v-icon>
          MDI Shield Alert
        </v-btn>

        <v-btn color="warning" class="mr-2 mb-2" @click="testConfirm">
          <v-icon class="mr-1">mdi-help-circle</v-icon>
          Confirm Dialog
        </v-btn>

        <v-btn color="info" class="mr-2 mb-2" @click="testToast">
          <v-icon class="mr-1">mdi-bell-ring</v-icon>
          Toast Notification
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useSwal } from '@/plugins/sweetalert'

const swal = useSwal()

// ตัวอย่าง 1: Standard Success
const testSuccess = () => {
  swal.success('บันทึกสำเร็จ!', 'ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว')
}

// ตัวอย่าง 2: ใช้งาน MDI Icon โดยตรง (mdi-bank-transfer)
const testMdiBank = () => {
  swal.mdiAlert(
    'โอนเงินสำเร็จ!',
    'ทำรายการโอนเงินไปยังบัญชีปลายทางเรียบร้อยแล้ว',
    'mdi-bank-transfer',
    '#2563eb'
  )
}

// ตัวอย่าง 3: ใช้งาน MDI Icon อื่นๆ (mdi-shield-check)
const testMdiShield = () => {
  swal.mdiAlert(
    'ความปลอดภัยระดับสูง',
    'บัญชีของคุณได้รับการยืนยันความปลอดภัย 2 ชั้นแล้ว',
    'mdi-shield-check',
    '#8b5cf6'
  )
}

// ตัวอย่าง 4: Confirm
const testConfirm = async () => {
  const result = await swal.confirm(
    'คุณต้องการยืนยันหรือไม่?',
    'หากยืนยัน รายการนี้จะถูกประมวลผลทันที'
  )
  if (result.isConfirmed) {
    swal.toast('ยืนยันรายการเรียบร้อยแล้ว', 'success')
  }
}

// ตัวอย่าง 5: Toast
const testToast = () => {
  swal.toast('นี่คือข้อความแจ้งเตือนแบบ Toast', 'info')
}
</script>
