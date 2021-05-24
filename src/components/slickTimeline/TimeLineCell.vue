<template>
  <div ref="rootElement" class="rootElem">
    <div class="shell" v-if="show">
      <div class="iconCase">
        <div class="icon" :style="{ backgroundColor: item.color }">
          <font-awesome-icon
            class="icon_inner"
            :icon="item.icon"
            size="2x"
          ></font-awesome-icon>
        </div>
      </div>
      <div class="cell" ref="cell">
        <h2 class="title">{{ item.title }}</h2>
        <h2 class="subtitle">{{ item.subtitle }}</h2>
        <h3>{{ item.subsubtitle }}</h3>
        <a :href="item.textLink">{{ item.text }}</a>
        <ul>
          <li v-for="(highlight, h) in item.items" :key="h">{{ highlight }}</li>
        </ul>
        <div class="technoBox">
          <div class="nugget" v-for="techno in item.nuggets" :key="techno">
            {{ techno }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { TimeLineItem } from "@/components/slickTimeline/types";

export default defineComponent({
  name: "TimeLineCell",
  components: {},
  props: {
    item: { type: Object as () => TimeLineItem, required: true },
    show: { type: Boolean, required: true },
  },

  computed: {},
  setup(props) {
    const rootElement = ref(null);
    // const isMounted = ref(false);
    // const visible: any = "visible";
    // onMounted(() => {
    //   nextTick(() => {
    //     isMounted.value = true;
    //   });
    // });
    return { rootElement };
  },
  methods: {
    getRootElem() {
      return this.rootElement;
    },
    // isInViewport(): "hidden" | "visible" {
    //   if (!this.isMounted) return "visible";
    //   console.log((this.$refs.cell as any).getBoundingClientRect());
    //   const rect = (this.$refs.cell as any).getBoundingClientRect();
    //   return rect.top >= 200 &&
    //     rect.bottom <=
    //       (window.innerHeight || document.documentElement.clientHeight) - 200
    //     ? "visible"
    //     : "hidden";
    // },
    //
    // recalcVisibility() {
    //   // this.visible = this.isInViewport();
    // },
  },
});
</script>
<style scoped>
.shell {
  /*box-sizing: border-box;*/
  height: 100%;
  display: inline-flex;
  width: 700px;
  margin-bottom: 10px;
  animation: cd-bounce-2 1.6s;
  animation-name: cd-bounce-2;
  animation-duration: 0.6s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  /*position: relative;*/
}
.cell {
  border-radius: 5px;
  background-color: white;
  /*position: relative;*/
  width: 100%;
  height: 100%;
  /*margin-right: 50%;*/
}

@keyframes cd-bounce-2 {
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
.shell:nth-child(even) > .cell {
  /*float: right;*/
}

.shell:nth-child(odd) > .cell {
  /*float: left;*/
}

.icon {
  color: white;
  width: 60px;
  height: 60px;
  left: 50%;
  margin-left: -30px;
  position: absolute;
  top: 0;
  border-radius: 50%;
  -webkit-box-shadow: 0 0 0 4px #fff, inset 0 2px 0 rgba(0, 0, 0, 0.08),
    0 3px 0 4px rgba(0, 0, 0, 0.05);
  box-shadow: 0 0 0 4px #fff, inset 0 2px 0 rgba(0, 0, 0, 0.08),
    0 3px 0 4px rgba(0, 0, 0, 0.05);
}

.nugget {
  text-transform: lowercase;
  background-color: #8dd9b5;
  border-radius: 0.125rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  --text-opacity: 1;
  color: #f7fafc;
  color: rgba(247, 250, 252, var(--text-opacity));
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.nugget:hover {
  /*padding: 5px 5px 0 5px;*/
  color: black;
}

.technoBox {
  display: inline-flex;
}

.iconCase {
  position: relative;
}

.icon_inner {
  fill: white;
  display: block;
  width: 24px;
  height: 24px;
  position: relative;
  left: 50%;
  top: 50%;
  margin-left: -12px;
  margin-top: -12px;
}

.rootElem {
  height: 250px;
  margin-bottom: 10px;
}
</style>
