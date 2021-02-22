import { RcaStatus } from './rca-status';

export class RcaItem {
  ticket: string;
  ticketLink: string;
  ticketSummary: string;
  riqb: string;
  riqbLink: string;
  riqbSummary: string;
  dayNumber: number;
  storyOfIncident: string;
  rootCause: string;
  correctiveAction: string;
  status: RcaStatus;
}

