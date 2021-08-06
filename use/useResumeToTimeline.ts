import {
  ClassItem,
  EduItem,
  ProjectItem,
  Resume,
  ResumeItem,
  WorkItem,
} from "@/components/slickCV/types";
import { TimeLineItem } from "@/components/slickCV/slickTimeline/types";

const resumeItemToTimeLineItem = (resume: ResumeItem): TimeLineItem => {
  const res = {} as TimeLineItem;
  res.items = resume.highlights;
  res.nuggets = resume.technologies?.length > 0 ? resume.technologies : ['n/a'] ??  ['n/a'];
  res.from = new Date(resume.startDate);
  res.till = new Date(resume.endDate);
  res.fromStr = resume.startDate;
  res.tillStr = resume.endDate;
  return res as TimeLineItem;
};

const workItemToTimeLineItem = (work: WorkItem): TimeLineItem => {
  const res: TimeLineItem = resumeItemToTimeLineItem(work);
  res.icon = "briefcase";
  res.color = "#acc172";
  res.title = work.position;
  res.subtitle = work.company;
  res.text = work.summary;
  res.textLink = work.website;
  return res;
};

const eduItemToTimeLineItem = (edu: EduItem): TimeLineItem => {
  const res: TimeLineItem = resumeItemToTimeLineItem(edu);

  res.icon = "university";
  // res.color = "#547980";
  res.color = "#67a77a";
  res.text = edu.thesis;
  // res.text2 = edu.grade ? "Grade: " + edu.grade : edu.grade;
  res.textLink = edu.thesisLink;
  res.titleAlt = edu.minor ? "Minor: " + edu.minor : edu.minor;

  if (edu.studyType) {
    res.title = edu.area ? `${edu.studyType} ${edu.area}` : edu.studyType;
    // res.subtitle = edu.studyType;
    res.subsubtitle = edu.grade ? "Grade: " + edu.grade : edu.grade;
  } else {
    res.title = edu.area;
    res.subtitle = edu.institution;
  }

  return res;
};

const classItemToTimeLineItem = (clas: ClassItem): TimeLineItem => {
  const res: TimeLineItem = resumeItemToTimeLineItem(clas);
  res.icon = "book-reader";
  // res.color = "#45ADA8";
  res.color = "#36897e";
  res.title = "Course";
  res.subtitle = clas.platform;
  res.text = clas.name;
  return res;
};

const projectItemToTimeLineItem = (proj: ProjectItem): TimeLineItem => {
  const res: TimeLineItem = resumeItemToTimeLineItem(proj);
  res.icon = "hamsa";
  // res.color = "#9DE0AD";
  res.color = "#286873";
  res.title = proj.what;
  res.textLink = proj.link;
  res.text = proj.summary;
  return res;
};

export const trafoFunctions: {
  [index: string]: any;
} = {
  courses: classItemToTimeLineItem,
  education: eduItemToTimeLineItem,
  work: workItemToTimeLineItem,
  projects: projectItemToTimeLineItem,
};
