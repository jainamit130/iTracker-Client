export interface Skills {
  skill: string;
  round: string;
}

export interface SlotData {
  id?: number;

  email: string;
  startDate: number;
  endDate: number;

  skill: string;
  round: string;
  recurringType: Boolean;
}
