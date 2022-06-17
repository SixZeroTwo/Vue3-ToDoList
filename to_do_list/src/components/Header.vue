<template>
  <div>
    <h2>{{ todoTitle }}</h2>
    <input
      type="text"
      placeholder="输入你的任务名称，回车键确认"
      v-model="todoTitle"
      @keyup.enter="addTodoFn"
    />
  </div>
</template>
<script lang='ts'>
import Todo from "@/types/Todo";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Header",
  props: {
    addTodo: Function,
  },
  setup(props: any) {
    const todoTitle = ref("");
    //回车事件的回调
    const addTodoFn = () => {
      //调用addTodo
      const text = todoTitle.value;
      console.log(todoTitle);

      if (!text.trim()) return;
      else {
        const todo: Todo = {
          id: Date.now(),
          title: text,
          isCompleted: false,
        };
        props.addTodo(todo);
        todoTitle.value = "";
      }
    };
    return {
      addTodoFn,
      todoTitle,
    };
  },
});
</script>
<style scoped>
</style>