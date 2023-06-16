<script setup lang="ts">
import { useSkillGraph } from "./index";

const graph = ref<HTMLCanvasElement>();

onMounted(() => {
  if (BleuVars.config.graph) {
    useSkillGraph(110, graph.value, BleuVars.config.graph);
  }
});
</script>

<template>
  <div class="skillgraph">
    <canvas ref="graph" class="graph" width="220" height="220"></canvas>
  </div>
</template>
