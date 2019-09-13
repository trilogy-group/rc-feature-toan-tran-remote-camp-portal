import { IcDailyPlan } from './ic-daily-plan.model';

export interface IcWeeklyPlan {
  approved?: boolean;
  week: IcDailyPlan[];
}
