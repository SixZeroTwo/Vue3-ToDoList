<template>
  <div>
    <Item v-for="(todo, index) in todos" index="index" :todo="todo"></Item>
  </div>
</template>
<script lang='ts'>
import Item from "./Item.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "List",
  props: ["todos"],
  components: {
    Item,
  },
});
</script>
<style scoped>
</style>