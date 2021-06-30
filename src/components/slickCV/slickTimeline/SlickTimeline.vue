<template>
  <div class="timeline">
    <TimeLineCell
      v-for="(item, i) in items"
      :ref="
        (el) => {
          cells[i] = el;
        }
      "
      :key="item.title"
      :item="item"
      :show="show[i]"
      :id="i"
      :indexRatio="i / items.length"
    ></TimeLineCell>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUpdate, onMounted, ref } from "vue";
import { TimeLineItem } from "@/components/slickCV/slickTimeline/types";
import TimeLineCell from "@/components/slickCV/slickTimeline/TimeLineCell.vue";
export default defineComponent({
  name: "SlickTimeline",
  components: { TimeLineCell },
  props: { items: { type: Object as () => TimeLineItem[], required: true } },
  setup(props) {
    const show = ref(Array(props.items.length).fill(false));
    const cells = ref([]);
    const callback = (
      intersectionOBserverEntryArray: IntersectionObserverEntry[]
    ) => {
      intersectionOBserverEntryArray.forEach(
        (entry: IntersectionObserverEntry) => {
          const id = Number(entry.target.id);
          const intersects: boolean = entry.isIntersecting;
          show.value[id] = intersects;
        }
      );
    };

    let options = {
      root: document.querySelector("#scrollArea"),
      rootMargin: "5px",
      threshold: 0.2,
    };

    let observer = new IntersectionObserver(callback, options);

    onMounted(() => {
      for (let i = 0; i < props.items.length; i++) {
        const target = cells.value[i];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        observer.observe(target.getRootElem());
      }
    });

    onBeforeUpdate(() => {
      cells.value = [];
    });

    return { cells, show };
  },
});
</script>

<style scoped>
.timeline {
  /*margin-top: 10em;*/
}
</style>
