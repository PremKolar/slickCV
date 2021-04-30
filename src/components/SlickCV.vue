<template>
  <div>{{ resume.work }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref, computed } from "vue";

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

export interface TimeLineItem {
  icon: string;
  color: string;
  title: string;
  titleAlt: string;
  subtitle: string;
  subsubtitle: string;
  text: string;
  text2: string;
  textLink: string;
  items: string[];
  nuggets: string[];
  from: Date;
  till: Date;
}

export default defineComponent({
  name: "SlickCV",
  components: {},
  props: { resume: { type: Object as () => Resume, required: true } },
  setup(props) {
    const resumeItemToTimeLineItem = (resume: ResumeItem): TimeLineItem => {
      const res: TimeLineItem = {};
      res.items = resume.highlights;
      res.nuggets = resume.technologies;
      res.from = resume.startDate;
      res.till = resume.endDate;
    };

    const workItemToTimeLineItem = (work: WorkItem): TimeLineItem => {
      const res: TimeLineItem = resumeItemToTimeLineItem(work);
      res.icon = "briefcase";
      res.color = "yellow";
      res.title = work.position;
      res.subtitle = work.company;
      res.text = work.summary;
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
    };

    const classItemToTimeLineItem = (clas: ClassItem): TimeLineItem => {
      const res: TimeLineItem = resumeItemToTimeLineItem(clas);
      res.icon = "book-reader";
      res.color = "green";
      res.title = "Course";
      res.subtitle = clas.platform;
      res.text = clas.name;
    };

    const projectItemToTimeLineItem = (proj: ProjectItem): TimeLineItem => {
      const res: TimeLineItem = resumeItemToTimeLineItem(proj);
      res.icon = "hamsa";
      res.color = "blue";
      res.title = proj.what;
      res.text = proj.summary;
    };

    const sortedTimelineItems = computed(() => {});
  },
});
</script>

<style scoped></style>
