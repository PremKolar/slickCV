<template>
  <div class="frame">
    <p class="technotitle">Filter</p>
    <div class="allTechnosBox">
      <Nugget
        class="nugget"
        v-for="techno in allTechnos"
        :key="techno"
        :nugget="techno"
        :active="isActive(techno)"
        @click="technoClicked(techno)"
      >
      </Nugget>
    </div>
    <SlickTimeline :items="sortedFilteredTimelineItems"></SlickTimeline>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SlickTimeline from "@/components/slickCV/slickTimeline/SlickTimeline.vue";
import { Prop } from "vue-property-decorator";
import { Resume } from "@/components/slickCV/types";
import { trafoFunctions } from "@/components/slickCV/use/useResumeToTimeline";
import { TimeLineItem } from "@/components/slickCV/slickTimeline/types";
import Nugget from "@/components/slickCV/Nugget.vue";

@Options({
  components: { SlickTimeline, Nugget },
})
export default class SlickCV extends Vue {
  @Prop({ required: true }) resume!: Resume;
  private technoSwitches: Record<string, boolean> = {};

  created() {
    this.allTechnos.forEach((t) => this.activateTechno(t));
  }

  isActive(tec: string): boolean {
    // if (this.technoSwitches[tec]==undefined){
    //   this.activateTechno(tec);
    // }
    return this.technoSwitches[tec];
  }

  private activateTechno(tec: string) {
    this.technoSwitches[tec] = true;
  }

  technoClicked(tec: string) {
    this.technoSwitches[tec] = !this.technoSwitches[tec];
    this.$forceUpdate();
  }

  get allTechnos() {
    const allNuggets: Set<string> = new Set<string>();
    this.sortedTimelineItems.forEach((tlitem) => {
      console.log(tlitem);
      tlitem.nuggets?.forEach((nugget) => {
        allNuggets.add(nugget);
      });
    });
    return allNuggets;
  }

  get sortedFilteredTimelineItems(): TimeLineItem[] {
    return this.sortedTimelineItems.filter((tl) => this.hasActiveTechno(tl));
  }

  get sortedTimelineItems(): TimeLineItem[] {
    const res: TimeLineItem[] = [];

    for (const key in trafoFunctions) {
      const fun = trafoFunctions[key];
      const arr = (this.resume as any)[key];
      console.log(`building ${key}-items`);
      for (let i = 0; i < arr.length; i++) {
        res.push(fun(arr[i]));
      }
    }
    return res.sort((a, b) => -a.from.getTime() + b.from.getTime());
  }

  private hasActiveTechno(tl: TimeLineItem):boolean {
    return tl.nuggets?.some((n) => this.isActive(n)) ?? false;
  }
}
</script>

<style scoped>
.technotitle {
  text-align: center;
}
.allTechnosBox {
  max-width: min(90vw, calc(700px - 1em));
  min-height: 100px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 1em 60px 1em;
  padding: 1em;
  border-radius: 5px;
}

.nugget {
  cursor: pointer;
}
.frame {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
