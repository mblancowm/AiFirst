export interface LessonSection {
  heading: string;
  body: string;
}

export interface CourseModuleSeed {
  id: string;
  week: number;
  title: string;
  tagline: string;
  summary: string;
  objective: string;
  minutes: number;
  sections: LessonSection[];
  exampleTitle: string;
  example: string;
  practiceTitle: string;
  practice: string;
  deliverables: string[];
  checkpointQuestion: string;
  checkpointOptions: string[];
  correctAnswerIndex: number;
  promptCode: string;
  sortOrder: number;
}
