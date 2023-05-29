<script setup lang="ts">
import { useSkillGraph } from "./index";

const graph = ref<HTMLCanvasElement>();

onMounted(() => {
  if (EcyVars.config.graph) {
    useSkillGraph(110, graph.value, EcyVars.config.graph);
  }
});
</script>

<template>
  <div class="skillgraph f-c-c">
    <canvas ref="graph" class="graph" width="220" height="220"></canvas>
  </div>
</template>
