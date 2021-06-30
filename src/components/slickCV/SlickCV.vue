<template>
  <SlickTimeline :items="sortedTimelineItems"></SlickTimeline>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Resume } from "@/components/slickCV/types";
import { toRefs } from "vue";
import useResumeToTimeline from "@/components/slickCV/use/useResumeToTimeline";
import SlickTimeline from "@/components/slickCV/slickTimeline/SlickTimeline.vue";
export default defineComponent({
  name: "SlickCV",
  components: { SlickTimeline },
  props: { resume: { type: Object as () => Resume, required: true } },
  setup(props) {
    const { resume } = toRefs(props);
    const { sortedTimelineItems } = useResumeToTimeline(resume);
    return { sortedTimelineItems };
  },
});
</script>

<style scoped></style>
