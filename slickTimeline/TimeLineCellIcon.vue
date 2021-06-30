<template>
  <div class="iconInnerCase" :style="{ backgroundColor: item.color }">
    <font-awesome-icon
      class="icon_inner"
      :icon="item.icon"
      size="2x"
    ></font-awesome-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TimeLineItem } from "@/components/slickCV/slickTimeline/types";

export default defineComponent({
  name: "TimeLineCellIcon",
  props: {
    item: { type: Object as () => TimeLineItem, required: true },
  },
});
</script>
<style scoped>
@keyframes cellBounce {
  0% {
    opacity: 0;
    -webkit-transform: translateX(-100px);
    transform: translateX(-100px);
  }
  60% {
    opacity: 1;
    -webkit-transform: translateX(20px);
    transform: translateX(20px);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

.iconInnerCase {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  -webkit-box-shadow: 0 0 0 4px #fff, inset 0 2px 0 rgba(0, 0, 0, 0.08),
    0 3px 0 4px rgba(0, 0, 0, 0.05);
  box-shadow: 0 0 0 4px #fff, inset 0 2px 0 rgba(0, 0, 0, 0.08),
    0 3px 0 4px rgba(0, 0, 0, 0.05);
  animation: iconPlopp 0.6s;
}

.icon_inner {
  fill: white;
  width: 24px;
  height: 24px;
}

@keyframes iconPlopp {
  0% {
    opacity: 1;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  60% {
    opacity: 1;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@media all and (max-width: 1000px) {
}

@media all and (max-width: 700px) {
}
</style>
