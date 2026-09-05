export interface PredictMCFormData {
  // 1. ข้อมูลทั่วไป
  date: string;
  time: string;
  thickness: number | null;
  product: string;

  // 2. ข้อมูลวิเคราะห์
  tempDryerInlet: string;
  tempDryerOutlet: string;
  tempFiberDryer: string;
  scalper: string;
  bulk: string;
  tempAmbient: string;
  rh: string;
}

export interface PredictMCAnalysisResult {
  formData: PredictMCFormData;
  analyzedAt: string;
  predictedMC?: number;
}
