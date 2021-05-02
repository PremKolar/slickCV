import { Ref, computed } from "vue";
import {
  ClassItem,
  EduItem,
  ProjectItem,
  Resume,
  ResumeItem,
  WorkItem,
} from "@/components/slickCV/types";
import { TimeLineItem } from "@/components/slickTimeline/types";

export default function useResumeToTimeline(resume: Ref<Resume>) {
  const resumeItemToTimeLineItem = (resume: ResumeItem): TimeLineItem => {
    const res = {} as TimeLineItem;
    res.items = resume.highlights;
    res.nuggets = resume.technologies;
    res.from = new Date(resume.startDate);
    res.till = new Date(resume.endDate);
    return res as TimeLineItem;
  };

  const workItemToTimeLineItem = (work: WorkItem): TimeLineItem => {
    const res: TimeLineItem = resumeItemToTimeLineItem(work);
    res.icon = "briefcase";
    res.color = "darkorange";
    res.title = work.position;
    res.subtitle = work.company;
    res.text = work.summary;
    return res;
  };

  const eduItemToTimeLineItem = (edu: EduItem): TimeLineItem => {
    const res: TimeLineItem = resumeItemToTimeLineItem(edu);
    res.icon = "university";
    res.color = "red";
    res.title = edu.major;
    res.subtitle = edu.studyType;
    res.subsubtitle = edu.minor;
    res.text = edu.thesis;
    res.text2 = "Grade: " + edu.grade;
    res.textLink = edu.thesisLink;
    res.titleAlt = "Minor: " + edu.minor;
    return res;
  };

  const classItemToTimeLineItem = (clas: ClassItem): TimeLineItem => {
    const res: TimeLineItem = resumeItemToTimeLineItem(clas);
    res.icon = "book-reader";
    res.color = "green";
    res.title = "Course";
    res.subtitle = clas.platform;
    res.text = clas.name;
    return res;
  };

  const projectItemToTimeLineItem = (proj: ProjectItem): TimeLineItem => {
    const res: TimeLineItem = resumeItemToTimeLineItem(proj);
    res.icon = "hamsa";
    res.color = "blue";
    res.title = proj.what;
    res.text = proj.summary;
    return res;
  };

  const trafoFunctions: {
    [index: string]: any;
  } = {
    classes: classItemToTimeLineItem,
    education: eduItemToTimeLineItem,
    work: workItemToTimeLineItem,
    projects: projectItemToTimeLineItem,
  };

  const sortedTimelineItems = computed((): TimeLineItem[] => {
    const res: TimeLineItem[] = [];

    for (const key in trafoFunctions) {
      const fun = trafoFunctions[key];
      const arr = (resume.value as any)[key];
      for (let i = 0; i < arr.length; i++) {
        res.push(fun(arr[i]));
      }
    }
    return res.sort((a, b) => -a.from.getTime() + b.from.getTime());
  });

  return {
    sortedTimelineItems,
  };
}
