<template>
  <div>
    <label>
      <input type="checkbox" v-model="isAllComp" />
    </label>
    <span><span>已完成 0</span>/全部 2</span>
    <button @click="delIsComp">清除已经完成任务</button>
  </div>
</template>
<script lang='ts'>
import Todo from "@/types/Todo";
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "Footer",
  props: {
    todos: Object as () => Todo[],
    chooseAll: { type: Function, required: true },
    unChooseAll: { type: Function, required: true },
    delIsComp: { type: Function, required: true },
  },
  setup(props) {
    const isAllComp = computed({
      get() {
        return props.todos?.every((todo) => todo.isCompleted == true);
      },
      set(val) {
        //全选
        if (val) {
          props.chooseAll();
        }
        //全不选
        else {
          props.unChooseAll();
        }
      },
    });
    const delIsComp = props.delIsComp;
    return {
      isAllComp,
      delIsComp,
    };
  },
});
</script>
<style scoped>
</style>