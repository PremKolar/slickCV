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
import { TimeLineItem } from "@/components/slickCV/slickTimeline/types";

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
    return { rootElement };
  },
  methods: {
    getRootElem() {
      return this.rootElement;
    },
  },
});
</script>
<style scoped>
.shell {
  height: 100%;
  display: inline-flex;
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



.cell {
  background-color: #e5fcc2;
  border-radius: 0;
  width: 100%;
  height: 100%;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 5px;
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

.nugget {
  text-transform: lowercase;
  background-color: #45ada8;
  border-radius: 0.125rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  --text-opacity: 1;
  color: #f7fafc;
  color: rgba(247, 250, 252, var(--text-opacity));
  /*margin-right: 0.5rem;*/
  /*margin-bottom: 0.5rem;*/
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.nugget:hover {
  /*padding: 5px 5px 0 5px;*/
  color: black;
}

.technoBox {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, max-content));
  justify-content: center;
  grid-gap: 1rem;
}

.iconCase {
  position: relative;
  height: 100%;
  /*margin: 0;*/
  /*!*position: absolute;*!*/
  /*top: 50%;*/
  /*-ms-transform: translateY(-50%);*/
  /*transform: translateY(-50%);*/
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


@media all and (max-width: 900px) {
  .shell {
    width: 420px;
  }
}
@media all and (max-width: 419px) {
  .shell {
    width: 300px;
    padding-left: 0;
    padding-right: 0;
  }
}

</style>
