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
  damper1: number | string | null;
  damper2: number | string | null;
}

export interface NewMachinePayload {
  name: string;
  icon: string;
}
