<template>
  <div class="shell">
    <div class="cell">
      <h2>{{ item.title }}</h2>
      <h2>{{ item.subtitle }}</h2>
      <h3>{{ item.subsubtitle }}</h3>
      <par>{{ item.text }}</par>
      <ul>
        <li v-for="(highlight, h) in item.items" :key="h">{{ highlight }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TimeLineItem } from "@/components/slickTimeline/types";
export default defineComponent({
  name: "TimeLineCell",
  components: {},
  props: { item: { type: Object as () => TimeLineItem, required: true } },
  // setup(props) {
  // },
});
</script>
<style scoped>
.shell {
  box-sizing: border-box;
  height: 200px;
}
.cell {
  border: 1px #42b983 solid;
  margin-bottom: 10px;
  position: relative;
  width: 44%;
  /*margin-right: 50%;*/
}
.shell:nth-child(even) > .cell {
  float: right;
}

.shell:nth-child(odd) > .cell {
  float: left;
}
</style>
