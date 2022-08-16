export interface Skills {
  skill: string;
  round: string;
}

export interface Interviewer {
  id?: number;
  name: string;
  email: string;
  role: string;
  skillset: Skills[];
  currentMonth: number;
  lastQuarter: number;
  yearToDate: number;
}
