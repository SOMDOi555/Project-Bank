import Swal, { type SweetAlertOptions } from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import type { App, Plugin } from 'vue'

// Custom instance with project defaults and Sarabun font
export const swal = Swal.mixin({
  customClass: {
    confirmButton: 'v-btn v-theme--light bg-primary v-btn--density-default v-btn--size-default v-btn--variant-elevated rounded-lg px-4 py-2 text-white font-weight-bold ml-2',
    cancelButton: 'v-btn v-theme--light bg-grey-darken-1 v-btn--density-default v-btn--size-default v-btn--variant-flat rounded-lg px-4 py-2 text-white font-weight-bold mr-2',
  },
  buttonsStyling: false,
})

// Helper methods for easy use in Vue components
export const useSwal = () => {
  const success = (title: string, text?: string, options?: SweetAlertOptions) => {
    return swal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonText: 'ตกลง',
      ...options,
    })
  }

  const error = (title: string, text?: string, options?: SweetAlertOptions) => {
    return swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonText: 'ตกลง',
      ...options,
    })
  }

  const warning = (title: string, text?: string, options?: SweetAlertOptions) => {
    return swal.fire({
      icon: 'warning',
      title,
      text,
      confirmButtonText: 'ตกลง',
      ...options,
    })
  }

  const info = (title: string, text?: string, options?: SweetAlertOptions) => {
    return swal.fire({
      icon: 'info',
      title,
      text,
      confirmButtonText: 'ตกลง',
      ...options,
    })
  }

  const confirm = (title: string, text?: string, confirmButtonText = 'ยืนยัน', cancelButtonText = 'ยกเลิก') => {
    return swal.fire({
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      reverseButtons: true,
    })
  }

  const toast = (title: string, icon: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    return Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon,
      title,
    })
  }

  /**
   * แสดง Alert พร้อมกำหนด MDI Icon ที่ต้องการได้โดยตรง
   * @param mdiIcon เช่น 'mdi-shield-check', 'mdi-bank', 'mdi-wallet'
   * @param iconColor เช่น '#2563eb', '#10b981', 'red'
   */
  const mdiAlert = (
    title: string,
    text: string,
    mdiIcon = 'mdi-information-outline',
    iconColor = '#2563eb',
    options?: SweetAlertOptions
  ) => {
    return swal.fire({
      title,
      text,
      iconHtml: `<i class="mdi ${mdiIcon}" style="font-size: 54px; color: ${iconColor};"></i>`,
      customClass: {
        icon: 'border-0',
        confirmButton: 'v-btn v-theme--light bg-primary v-btn--density-default v-btn--size-default v-btn--variant-elevated rounded-lg px-4 py-2 text-white font-weight-bold ml-2',
      },
      confirmButtonText: 'ตกลง',
      ...options,
    })
  }

  return {
    swal,
    Swal,
    success,
    error,
    warning,
    info,
    confirm,
    toast,
    mdiAlert,
  }
}

// Vue Plugin definition
export const sweetalertPlugin: Plugin = {
  install(app: App) {
    app.config.globalProperties.$swal = swal
    app.provide('$swal', swal)
  },
}

export default sweetalertPlugin
