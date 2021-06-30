<template>
  <div ref="rootElement" class="rootElem">
    <div class="shell" v-if="show" :class="{ link: hasLink }" @click="goToLink">
      <div class="iconCase">
        <div class="icon" :style="{ backgroundColor: item.color }">
          <div class="date dateTop" :style="dateTextColorStyle">
            {{ makeTillString() }}
          </div>
          <font-awesome-icon
            class="icon_inner"
            :icon="item.icon"
            size="2x"
          ></font-awesome-icon>
          <div class="date dateBottom" :style="dateTextColorStyle">
            {{ makeFromString() }}
          </div>
        </div>
      </div>
      <div
        class="cell"
        ref="cell"
        @mouseover="showAltTitle()"
        @mouseleave="showNormalTitle()"
      >
        <h2 class="texts title">
          {{ title }}
        </h2>
        <h2 v-if="item.subtitle" class="texts subtitle">
          {{ item.subtitle }}
        </h2>
        <h3 v-if="item.subsubtitle" class="texts">{{ item.subsubtitle }}</h3>
        <div class="texts">{{ item.text }}</div>
        <ul style="padding-left: 1em">
          <li
            v-for="(highlight, h) in item.items"
            :key="h"
            style="text-align: left"
          >
            {{ highlight }}
          </li>
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
import { TimeLineItem } from "@/components/slickCV/slickTimeline/types";

export default defineComponent({
  name: "TimeLineCell",
  components: {},
  props: {
    indexRatio: { type: Number, required: true },
    item: { type: Object as () => TimeLineItem, required: true },
    show: { type: Boolean, required: true },
  },

  computed: {
    hasLink(): boolean {
      return this.item.textLink?.length > 0 ?? false;
    },
    dateTextColorStyle(): Record<string, any> {
      const interp = (a: number, b: number, ratio: number) =>
        a + (b - a) * ratio;
      const col1 = [0, 15, 30];
      const col2 = [222, 164, 146];
      const col3 = [141, 217, 181];
      let red;
      let green;
      let blue;
      if (this.indexRatio < 0.5) {
        let ratio1 = this.indexRatio * 2;
        red = interp(col1[0], col2[0], ratio1);
        green = interp(col1[1], col2[1], ratio1);
        blue = interp(col1[2], col2[2], ratio1);
      } else {
        let ratio2 = (this.indexRatio - 0.5) * 2;
        red = interp(col2[0], col3[0], ratio2);
        green = interp(col2[1], col3[1], ratio2);
        blue = interp(col2[2], col3[2], ratio2);
      }
      return {
        color: `rgb(${red},${blue},${green})`,
      };
    },
  },
  setup(props) {
    const rootElement = ref(null);
    const title = ref(props.item.title);

    return { rootElement, title };
  },
  methods: {
    showNormalTitle() {
      this.title = this.item.title;
    },
    showAltTitle() {
      this.title = this.item.titleAlt ?? this.item.title;
    },
    goToLink() {
      if (this.hasLink) {
        window.open(this.item.textLink, "_blank");
      }
    },
    getRootElem() {
      return this.rootElement;
    },
    makeDateString: function (dateStr: string, date: Date) {
      function date2string() {
        const pad = (n: number): string => ("" + n).padStart(2, "0");
        let month = pad(date.getMonth() + 1);
        let day = pad(date.getDate());
        let year = date.getFullYear();
        return `${year}-${month}-${day}`;
      }

      if (dateStr.match(/\d{4}\/\d{2}\/\d{2}/) != null) {
        return date2string();
      } else {
        return dateStr;
      }
    },
    makeTillString: function (): string {
      const date = this.item.till;
      let dateStr = this.item.tillStr ?? "ongoing";
      if (date.getTime() > new Date().getTime()) dateStr = "ongoing";
      return this.makeDateString(dateStr, date);
    },
    makeFromString: function (): string {
      const date = this.item.from;
      const dateStr = this.item.fromStr ?? "?";
      console.log(dateStr);
      return this.makeDateString(dateStr, date);
    },
  },
});
</script>
<style scoped>
.rootElem {
  /*height: auto !important;*/
  min-height: 200px;
  /*height: 250px;*/
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
}

.shell {
  /*height: 100%;*/
  display: flex;
  justify-content: center;
  width: 700px;
  margin-bottom: 10px;
  animation: cellBounce 0.6s;
  /*animation-name: cellBounce;*/
  /*animation-duration: 0.6s;*/
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

.link {
  cursor: pointer;
}

.cell {
  background-color: #e5fcc2;
  border-radius: 0;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /*margin-top: auto;*/
  /*margin-bottom: auto;*/
}

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

.icon {
  color: white;
  width: 60px;
  height: 60px;
  left: 50%;
  margin-left: -30px;
  position: absolute;
  border-radius: 50%;
  -webkit-box-shadow: 0 0 0 4px #fff, inset 0 2px 0 rgba(0, 0, 0, 0.08),
    0 3px 0 4px rgba(0, 0, 0, 0.05);
  box-shadow: 0 0 0 4px #fff, inset 0 2px 0 rgba(0, 0, 0, 0.08),
    0 3px 0 4px rgba(0, 0, 0, 0.05);
  animation: iconPlopp 0.6s;
  top: 40%;
  /*-ms-transform: translateY(-50%);*/
  /*transform: translateY(-50%);*/
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

.technoBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 2em;
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

.iconCase {
  position: relative;
  min-height: 250px;
  /*height: 100%;*/
  /*margin: 0;*/
  /*!*position: absolute;*!*/
  /*top: 50%;*/
  /*-ms-transform: translateY(-50%);*/
  /*transform: translateY(-50%);*/
  z-index: 1;
}

.icon::before {
  position: absolute;
  content: "🠑";
  left: -33px;
  font-size: xx-large;
  top: 6px;
  color: #2c3e50;
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

.date {
  font-size: smaller;
  padding-left: -5em;
  padding-right: -5em;
  position: absolute;
  /*color: #2c3e50;*/
  left: -57px;
}

.dateTop {
  bottom: 70px;
}

.dateBottom {
  bottom: -25px;
}

.subtitle {
  /*height: 2em;*/
}

.texts {
  padding-left: 5em;
  padding-right: 5em;
  align-self: center;
}

@media all and (max-width: 700px) {
  .shell {
    width: 90vw;
  }

  .texts {
    padding-left: 5px;
    padding-right: 5px;
  }
}
</style>
