export interface Step {
  step: number;
  code: string;
  duration_in_frames: number;
}

export interface VideoProps {
  stepsJsonPath: string;
}
