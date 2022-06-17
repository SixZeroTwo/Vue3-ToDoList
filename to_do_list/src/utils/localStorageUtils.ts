import Todo from "@/types/Todo";
//写数据
export function saveTodos(todos: Todo[]) {
  console.log('write');
  localStorage.setItem('todos', JSON.stringify(todos))
}
//读数据
export function readTodos(): Todo[] | undefined {
  console.log('read');
  let todos = localStorage.getItem('todos')
  if (todos) return JSON.parse(todos)
  else return undefined
}