<template>
  <Header :addTodo="addTodo"></Header>
  <List :todos="todos"></List>
  <Footer
    :todos="todos"
    :chooseAll="chooseAll"
    :unChooseAll="unChooseAll"
    :delIsComp="delIsComp"
  ></Footer>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onUnmounted,
  onUpdated,
  provide,
  reactive,
  toRefs,
  watch,
} from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import List from "@/components/List.vue";
import Todo from "@/types/Todo";
import { saveTodos, readTodos } from "@/utils/localStorageUtils";
export default defineComponent({
  name: "App",
  components: { Header, Footer, List },
  setup() {
    //读取缓存中的state对象或者
    //定义一个含有数据类型为Todo的属性的对象，类型从src/types/Todo引入
    let state: { todos: Array<Todo> };
    let temp = readTodos();
    state = reactive<{ todos: Array<Todo> }>({
      todos: temp
        ? temp
        : [
            {
              id: 1,
              title: "宝马",
              isCompleted: false,
            },
            {
              id: 2,
              title: "奔驰",
              isCompleted: false,
            },
          ],
    });
    //定义添加数据的方法
    const addTodo = (todo: Todo) => {
      state.todos.unshift(todo);
      console.log(state.todos);
    };
    const delTodo = (id: number) => {
      const index = state.todos.findIndex((item) => item.id == id);
      state.todos.splice(index, 1);
    };
    const updateTodoIsComp = (val: boolean, id: number) => {
      const index = state.todos.findIndex((item) => item.id == id);
      state.todos[index].isCompleted = val;
      console.log(state.todos);
    };
    const chooseAll = () => {
      state.todos.forEach((todo) => (todo.isCompleted = true));
    };
    const unChooseAll = () => {
      state.todos.forEach((todo) => (todo.isCompleted = false));
    };
    const delIsComp = () => {
      state.todos = state.todos.filter((todo) => todo.isCompleted == false);
      console.log(state.todos);
    };
    //监视state.todos的变化并写入缓存
    watch(() => state.todos, saveTodos, { deep: true });
    provide("delTodo", delTodo);
    provide("update", updateTodoIsComp);
    return {
      ...toRefs(state),
      addTodo,
      chooseAll,
      unChooseAll,
      delIsComp,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
