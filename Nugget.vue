<template>
  <div class="nugget" :class="{ activated: !active }">
    {{ nugget }}
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({
  components: {},
})
export default class Nugget extends Vue {
  @Prop({ required: true }) nugget!: string;
  @Prop({ required: false, default: true }) active!: boolean;
}
</script>
<style scoped>
.nugget {
  text-transform: lowercase;
  background-color: var(--highlightColor);
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

.activated{
  background-color: #c1bdbd;
  font-size: 0.775rem;
  font-weight: 500;
  --text-opacity: 0.9;
  color: rgba(120, 120, 120, var(--text-opacity));
}

.nugget:hover {
  color: black;
}
</style>
