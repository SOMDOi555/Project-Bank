/**
 * Predict %MC Forming – Centralized Business Logic & Calculations
 *
 * รวบรวม Logic ทั้งหมดในการตรวจสอบข้อมูลและคำนวณค่า Moisture Content (%MC)
 * เพื่อแยกเป็นระบบ (Single Source of Truth)
 */

import type { PredictMCFormData, PredictMCAnalysisResult } from "@/types/predictMC";

/**
 * ฟังก์ชันช่วยแปลงค่า Input ให้เป็น Number อย่างปลอดภัย (ป้องกันปัญหา String หรือ NaN)
 */
export function parseNumber(val: unknown): number | null {
  if (val === null || val === undefined) return null;
  const str = String(val).trim();
  if (str === "") return null;
  const num = Number(str);
  return !Number.isNaN(num) && Number.isFinite(num) ? num : null;
}

/**
 * สูตรการคำนวณค่า MC (Moisture Content):
 *
 * MC =
 *   -50.851420
 *   - (2.090475 * Thickness)
 *   - (0.000344 * Temp driver inlet)
 *   + (0.026282 * Temp driver outlet)
 *   + (0.457930 * Temp fiber dryer)
 *   + (0.183634 * Scalper)
 *   + (0.560754 * Bulk)
 *   - (0.134782 * Ambient Temp)
 *   - (0.058436 * RH)
 */
export function calculateMC(
  thickness: number,
  tempDriverInlet: number,
  tempDriverOutlet: number,
  tempFiberDryer: number,
  scalper: number,
  bulk: number,
  ambientTemp: number,
  rh: number
): number {
  return (
    -50.851420
    - (2.090475 * thickness)
    - (0.000344 * tempDriverInlet)
    + (0.026282 * tempDriverOutlet)
    + (0.457930 * tempFiberDryer)
    + (0.183634 * scalper)
    + (0.560754 * bulk)
    - (0.134782 * ambientTemp)
    - (0.058436 * rh)
  );
}

/**
 * ตรวจสอบและคำนวณ %MC จาก Form Data โดยตรง
 * หากข้อมูลตัวแปรที่จำเป็นยังไม่ครบถ้วน จะคืนค่า null เพื่อไม่ให้ผลลัพธ์เป็น NaN
 */
export function calculateMCFromFormData(formData: PredictMCFormData): number | null {
  const thickness = parseNumber(formData.thickness);
  const tempDriverInlet = parseNumber(formData.tempDryerInlet);
  const tempDriverOutlet = parseNumber(formData.tempDryerOutlet);
  const tempFiberDryer = parseNumber(formData.tempFiberDryer);
  const scalper = parseNumber(formData.scalper);
  const bulk = parseNumber(formData.bulk);
  const ambientTemp = parseNumber(formData.tempAmbient);
  const rh = parseNumber(formData.rh);

  if (
    thickness === null ||
    tempDriverInlet === null ||
    tempDriverOutlet === null ||
    tempFiberDryer === null ||
    scalper === null ||
    bulk === null ||
    ambientTemp === null ||
    rh === null
  ) {
    return null;
  }

  return calculateMC(
    thickness,
    tempDriverInlet,
    tempDriverOutlet,
    tempFiberDryer,
    scalper,
    bulk,
    ambientTemp,
    rh
  );
}

/**
 * ฟอร์แมตตัวเลข %MC เป็นทศนิยมตามต้องการ (เช่น 2 หรือ 3 ตำแหน่ง)
 */
export function formatMC(mc: number | null | undefined, decimals: number = 2): string {
  if (mc === null || mc === undefined || Number.isNaN(mc)) return "-";
  return mc.toFixed(decimals);
}

/**
 * วิเคราะห์ข้อมูลและคืนผลลัพธ์การทำนายครบชุดสำหรับบันทึกและแสดงผล
 */
export function analyzePredictMC(formData: PredictMCFormData): PredictMCAnalysisResult {
  const predictedMC = calculateMCFromFormData(formData);

  return {
    formData: { ...formData },
    analyzedAt: new Date().toISOString(),
    predictedMC: predictedMC ?? undefined,
  };
}
