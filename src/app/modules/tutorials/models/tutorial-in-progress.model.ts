import { TutorialStep } from './tutorial-step.model';

export interface TutorialInProgress {
  name: string;
  id: number;
  currentStep: TutorialStep;
  totalSteps: number;
}
