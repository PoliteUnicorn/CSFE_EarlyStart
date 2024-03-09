import { useEffect, useState } from "react";
import "./styles.css";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue === null) return [];

    return JSON.parse(localValue);
  });

  //count the number of completed tasks
  const [completedCount, setCompletedCount] = useState(() => {
    return todos.filter((todo) => todo.completed).length;
  });

  //
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
    setCompletedCount(todos.filter((todo) => todo.completed).length);
  }, [todos]);

  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  // return (
  //   <>
  //     <NewTodoForm onSubmit={addTodo} />
  //     <h1 className="header">Todo List</h1>
  //     <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
  //   </>
  // );
  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <p className="counter">Number of completed todos: {completedCount}</p>
      <TodoList
        todos={todos}
        toggleTodo={(id, completed) => {
          const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed } : todo
          );
          setTodos(updatedTodos);
          setCompletedCount(
            updatedTodos.filter((todo) => todo.completed).length
          );
        }}
        deleteTodo={deleteTodo}
      />
    </>
  );
}
