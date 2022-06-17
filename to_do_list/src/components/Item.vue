<template>
  <div id="highlight">
    <label>
      <!--  最好不要在子组件中直接修改父组件传过来的属性 -->
      <!--    <input type="checkbox" v-model="todo.isCompleted" /> -->
      <input type="checkbox" v-model="isCompleted" />
      <span>{{ todo.title }}</span>
    </label>
    <button class="hov_del" @click="del">删除</button>
  </div>
</template>
<script lang='ts'>
import Todo from "@/types/Todo";
import { computed, defineComponent, inject, toRefs } from "vue";
export default defineComponent({
  name: "Item",
  props: {
    todo: {
      type: Object as () => Todo,
    },
  },
  setup(props: any) {
    const delTodo: any = inject("delTodo");
    const del = () => {
      //根据todo的id来完成对应的删除
      delTodo(props.todo.id);
    };
    const update: any = inject("update");
    const isCompleted = computed({
      get() {
        return props.todo.isCompleted;
      },
      set(val) {
        //通过函数更新新的值

        update(val, props.todo.id);
      },
    });
    return {
      ...toRefs(props),
      del,
      isCompleted,
    };
  },
});
</script>
<style scoped>
#highlight:hover {
  background-color: palevioletred;
}
</style>