<template>
  <div class="timeline">
    <TimeLineCell
      v-for="item in items"
      ref="cells"
      :key="item.title"
      :item="item"
    ></TimeLineCell>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TimeLineItem } from "@/components/slickTimeline/types";
import TimeLineCell from "@/components/slickTimeline/TimeLineCell.vue";
export default defineComponent({
  name: "SlickTimeline",
  components: { TimeLineCell },
  props: { items: { type: Object as () => TimeLineItem[], required: true } },
  // created() {
  //   window.addEventListener("scroll", this.handleScroll);
  // },
  // unmounted() {
  //   window.removeEventListener("scroll", this.handleScroll);
  // },
  // methods: {
  //   handleScroll() {
  //     (this.$refs
  //       .cell as typeof TimeLineCell).forEach((cell: typeof TimeLineCell) =>
  //       cell.recalcVisibility()
  //     );
  //   },
  // },
  // setup(props) {
  // },
});
</script>

<style scoped>
/*.timeline::before {*/
/*  z-index: -1;*/
/*  content: "";*/
/*  background-color: azure;*/
/*  width: 10px;*/
/*  height: 100%;*/
/*  left: 5%;*/
/*  position: absolute;*/
/*}*/
</style>
