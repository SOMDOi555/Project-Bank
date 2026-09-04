/**
 * Sifter Analysis – Business Logic
 *
 * ลำดับ Combination เรียงตาม Reject น้อย → มาก (Business Rule ห้ามเรียงใหม่)
 */

// ─── Constants ────────────────────────────────────────────────────────────────

/** ลำดับ Combination ตามเกณฑ์ Reject น้อย → มาก */
export const SIFTER_COMBINATIONS = [
  '3A',
  '3B',
  '2A',
  '2B',
  '3C',
  '1A',
  '2C',
  '1B',
  '1C',
] as const

/** ช่วง Bulk Density ปกติ */
export const BULK_DENSITY_NORMAL_MIN = 39.0
export const BULK_DENSITY_NORMAL_MAX = 43.0

/** ช่วง Bulk Density ผิดปกติ */
export const BULK_DENSITY_ABNORMAL_MIN = 43.01
export const BULK_DENSITY_ABNORMAL_MAX = 52.0

// ─── Types ────────────────────────────────────────────────────────────────────

export type BulkDensityStatus = 'normal' | 'abnormal'
export type CirculateGroup = 1 | 2 | 3
export type PressureGroup = 'A' | 'B' | 'C'
export type Combination = (typeof SIFTER_COMBINATIONS)[number]

export interface SifterResult {
  bulkDensity: number
  bulkDensityStatus: BulkDensityStatus
  currentCombination: Combination | null
  reductionLevel: number | null
  recommendedControlSifter: Combination | null
}

// ─── Core Functions ───────────────────────────────────────────────────────────

/**
 * คำนวณ Bulk Density จากน้ำหนักและปริมาตร
 * สูตร: (weight / volume) × 1000
 */
export function calculateBulkDensity(weight: number, volume: number): number {
  return (weight / volume) * 1000
}

/**
 * ตรวจสอบสถานะ Bulk Density
 * 39.00 – 43.00 → ปกติ
 * 43.01 – 52.00 → ผิดปกติ
 */
export function getBulkDensityStatus(bulkDensity: number): BulkDensityStatus {
  if (bulkDensity <= BULK_DENSITY_NORMAL_MAX) {
    return 'normal'
  }
  return 'abnormal'
}

/**
 * แปลงค่า Circulate เป็น Group
 * 55–57 → Group 1
 * 58–61 → Group 2
 * 62–65 → Group 3
 */
export function getCirculateGroup(circulate: number): CirculateGroup {
  if (circulate <= 57) return 1
  if (circulate <= 61) return 2
  return 3
}

/**
 * แปลงค่า Pressure Control เป็น Group
 * 10.0–13.9 → A
 * 14.0–17.9 → B
 * 18.0–20.0 → C
 */
export function getPressureGroup(pressure: number): PressureGroup {
  if (pressure < 14.0) return 'A'
  if (pressure < 18.0) return 'B'
  return 'C'
}

/**
 * รวม Circulate Group + Pressure Group เป็น Combination
 * เช่น Group 3 + A = "3A"
 */
export function getCurrentCombination(
  circulateGroup: CirculateGroup,
  pressureGroup: PressureGroup,
): Combination {
  return `${circulateGroup}${pressureGroup}` as Combination
}

/**
 * กำหนดจำนวน Combination ที่ต้องลด ตามช่วง Bulk Density
 * 43.01–44.99 → ลด 1
 * 45.00–47.99 → ลด 2
 * 48.00–52.00 → ลด 3
 */
export function getReductionLevel(bulkDensity: number): number {
  if (bulkDensity < 45.0) return 1
  if (bulkDensity < 48.0) return 2
  return 3
}

/**
 * หา Recommended Control Sifter
 *
 * Logic: recommendedIndex = currentIndex + reduction + 1
 * (ไม่นับ Current Combination เป็นคู่ที่ลด → ข้ามไป reduction ตัว → เอาตัวถัดไป)
 *
 * ถ้า index เกินขอบเขต → คืนค่าตัวสุดท้ายใน array
 */
export function getRecommendedControlSifter(
  currentCombination: Combination,
  reduction: number,
): Combination {
  const currentIndex = SIFTER_COMBINATIONS.indexOf(currentCombination)
  const recommendedIndex = currentIndex + reduction + 1
  // Clamp ให้ไม่เกินขอบเขต
  const clampedIndex = Math.min(recommendedIndex, SIFTER_COMBINATIONS.length - 1)
  return SIFTER_COMBINATIONS[clampedIndex]
}

// ─── Main Analysis ────────────────────────────────────────────────────────────

/**
 * ฟังก์ชันหลัก: วิเคราะห์ข้อมูลทั้งหมดจาก form แล้วคืนผลลัพธ์
 */
export function analyzeSifter(
  weight: number,
  volume: number,
  circulate: number,
  pressure: number,
): SifterResult {
  const bulkDensity = calculateBulkDensity(weight, volume)
  const bulkDensityStatus = getBulkDensityStatus(bulkDensity)

  // กรณีปกติ → ไม่ต้องคำนวณ Control Sifter
  if (bulkDensityStatus === 'normal') {
    return {
      bulkDensity,
      bulkDensityStatus,
      currentCombination: null,
      reductionLevel: null,
      recommendedControlSifter: null,
    }
  }

  // กรณีผิดปกติ → คำนวณ Control Sifter
  const circulateGroup = getCirculateGroup(circulate)
  const pressureGroup = getPressureGroup(pressure)
  const currentCombination = getCurrentCombination(circulateGroup, pressureGroup)
  const reductionLevel = getReductionLevel(bulkDensity)
  const recommendedControlSifter = getRecommendedControlSifter(
    currentCombination,
    reductionLevel,
  )

  return {
    bulkDensity,
    bulkDensityStatus,
    currentCombination,
    reductionLevel,
    recommendedControlSifter,
  }
}
