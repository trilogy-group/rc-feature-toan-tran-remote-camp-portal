import { Injectable } from '@angular/core';
import { differenceInDays, isSaturday, isSunday, parse } from 'date-fns';

@Injectable()
export class UtilsService {
  public calculateDaysCompleted(startDate: string): number {
    let daysCompleted: number;
    const now = new Date();
    const daysBetween = differenceInDays(new Date(), parse(startDate));
    if (isSaturday(now)) {
      daysCompleted = daysBetween - 2 * Math.floor(daysBetween / 7);
    } else if (isSunday(now)) {
      daysCompleted = daysBetween - 2 * Math.floor((daysBetween + 2) / 7) + 1;
    } else {
      daysCompleted = daysBetween - 2 * Math.floor((daysBetween + 2) / 7);
    }
    return daysCompleted;
  }

  public getCurrentWeek(startDate: string): number {
    const daysBetween = differenceInDays(new Date(), parse(startDate));
    return Math.floor(daysBetween / 7) + 1;
  }
}
