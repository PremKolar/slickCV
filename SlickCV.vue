<template>
  <div class="frame">
    <div class="allTechnosBox" @mouseleave="hoveringOnTechnoBox=false" @mouseover="hoveringOnTechnoBox = true">
      <p class="technotitle">{{ titleOfTechnoBox }}</p>
      <div class="allTechnosBoxInside">
        <Nugget
          v-for="techno in allTechnos"
          :key="techno"
          :active="isActive(techno)"
          :nugget="techno"
          class="nugget"
          @contextmenu="contextMenuCB"
          @click.left="technoClicked(techno)"
          @click.right="technoRightClicked(techno)"
        >
        </Nugget>
      </div>
    </div>
    <SlickTimeline
      ref="timeline"
      :items="sortedFilteredTimelineItems"
    ></SlickTimeline>
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
  components: { SlickTimeline, Nugget }
})
export default class SlickCV extends Vue {
  @Prop({ required: true }) resume!: Resume;
  private technoSwitches: Record<string, boolean> = {};
  private hoveringOnTechnoBox = false;

  get allTechnos() {
    const allNuggets: Set<string> = new Set<string>();
    this.sortedTimelineItems.forEach((tlitem) => {
      tlitem.nuggets?.forEach((nugget) => {
        allNuggets.add(nugget);
      });
    });
    return allNuggets;
  }

  get titleOfTechnoBox(): string {
    return this.hoveringOnTechnoBox ? "right click for single toggle!" : "Filters";
  }

  get sortedFilteredTimelineItems(): TimeLineItem[] {
    let items = this.sortedTimelineItems.filter((tl) => this.hasActiveTechno(tl));
    console.table(items);
    return items;
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

  created() {
    this.allTechnos.forEach((t) => this.activateTechno(t));
  }

  isActive(tec: string): boolean {
    // if (this.technoSwitches[tec]==undefined){
    //   this.activateTechno(tec);
    // }
    return this.technoSwitches[tec];
  }

  technoClicked(tec: string) {
    this.technoSwitches[tec] = !this.technoSwitches[tec];
    // this.$forceUpdate();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$refs.timeline.refresh();
  }

  contextMenuCB(e: any) {
    console.log(typeof e);
    e.preventDefault();
  }

  technoRightClicked(tec: string) {
    const isOn = this.technoSwitches[tec];
    for (let technoSwitchesKey in this.technoSwitches) {
      this.technoSwitches[technoSwitchesKey] = !isOn;
    }
    this.technoSwitches[tec] = isOn;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$refs.timeline.refresh();
  }

  private activateTechno(tec: string) {
    this.technoSwitches[tec] = true;
  }

  private hasActiveTechno(tl: TimeLineItem): boolean {
    return tl.nuggets?.some((n) => this.isActive(n)) ?? false;
  }
}
</script>

<style scoped>
.technotitle {
  text-align: center;
  /*background-color: var(--cardColor);*/
}

.allTechnosBox {
  max-width: min(90vw, calc(700px - 1em));
  min-height: 100px;
  background: var(--cardColor);
  border-radius: 5px;
  margin: 0 1em 60px 1em;
}

.allTechnosBoxInside {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 1em;
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
