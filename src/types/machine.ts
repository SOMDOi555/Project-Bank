import type { Combination } from '@/utils/sifter';

export interface Machine {
  id: number;
  name: string;
  icon: string;
  color?: string;
}

export interface AnalysisFormData {
  // 1. Product
  lot: string;
  thickness: number | null;
  product: string | null;

  // 2. Fiber Condition
  weight: string;
  volume: string;
  moisture: string;

  // 3. Sifter condition
  circulate: string;
  pressure: string;
  damper1: number | null;
  damper2: number | null;
}

export interface SifterAnalysisResult {
  machine: Machine;
  formData: AnalysisFormData;
  analyzedAt: string;
  // Sifter computed results
  bulkDensity: number;
  bulkDensityStatus: 'normal' | 'abnormal';
  currentCombination: Combination | null;
  reductionLevel: number | null;
  recommendedControlSifter: Combination | null;
}

export interface NewMachinePayload {
  name: string;
  icon: string;
}
