export interface Resume {
  work: WorkItem[];
  education: EduItem[];
  projects: ProjectItem[];
  classes: ClassItem[];
}

export interface ResumeItem {
  startDate: string;
  endDate: string;
  link: string;
  technologies: string[];
  highlights: string[];
}

export interface ClassItem extends ResumeItem {
  name: string;
  platform: string;
}

export interface ProjectItem extends ResumeItem {
  what: string;
  summary: string;
}

export interface EduItem extends ResumeItem {
  institution: string;
  studyType: string;
  info: string;
  area: string;
  minor: string;
  major: string;
  grade: string;
  thesis: string;
  thesisLink: string;
}

export interface WorkItem extends ResumeItem {
  company: string;
  position: string;
  website: string;
  summary: string;
}
