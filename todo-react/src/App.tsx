import { useEffect, useState } from "react";
import axios from "axios";
import Search from "./components/Input";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";
import stars from "../src/assets/starsbg.mp4";

interface Todo {
  id: number;
  task: string;
  status: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8000/todos").then((res) => setTodos(res.data));
  }, []);

  const addTodo = (data: { task: string }) => {
    const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
    const newTodo: Todo = {
      ...data,
      id: newId,
      status: "Active",
      completed: false,
    };
    setTodos([...todos, newTodo]);
    axios.post("http://localhost:8000/todos", data).then((res) => {
      setTodos([...todos, res.data]);
    });
  };

  const delTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    axios.delete(`http://localhost:8000/todos/${id}`);
  };

  const updateTodo = (
    e: React.FormEvent<HTMLFormElement>,
    id: number,
    text: string
  ) => {
    e.preventDefault();
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task: text, status: "Active" } : todo
    );
    setTodos(updatedTodos);

    const updateTodo: Todo = {
      id,
      task: text,
      status: "Active",
      completed: false,
    };
    axios.patch(`http://localhost:8000/todos/${id}`, updateTodo);
  };

  const completeTodo = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    todo: Todo
  ) => {
    if (e.target.checked) {
      console.log("okay");
      setTodos(todos.map((t) => (t.id === id ? { ...t, completed: true } : t)));
      const updateTodo: Todo = { ...todo, completed: true };
      axios.patch(`http://localhost:8000/todos/${id}`, updateTodo);
    } else {
      console.log("omo");
      setTodos(
        todos.map((t) => (t.id === id ? { ...t, completed: false } : t))
      );
      const updateTodo: Todo = { ...todo, completed: false };
      axios.patch(`http://localhost:8000/todos/${id}`, updateTodo);
    }
  };

  const filterTodo = async (cat_value: string) => {
    if (cat_value === "Completed") {
      setTodos(
        todos.filter((todo) => todo.status === cat_value || todo.completed)
      );
    } else if (cat_value === "Active") {
      try {
        const response = await axios.get(
          `http://localhost:8000/todos?status=${cat_value}`
        );
        const activeTasks = response.data.filter(
          (todo: Todo) => !todo.completed
        );
        const completedTasks = response.data.filter(
          (todo: Todo) => todo.completed
        );
        setTodos([...activeTasks, ...completedTasks]);
      } catch (error) {
        // Handle error
        console.error("Error fetching todos:", error);
      }
    } else {
      try {
        const response = await axios.get(
          `http://localhost:8000/todos?status=${cat_value}`
        );
        setTodos(response.data);
      } catch (error) {
        // Handle error
        console.error("Error fetching todos:", error);
      }
    }
  };

  return (
    <>
      <div className="video-container">
        <video
          src={stars}
          autoPlay
          muted
          loop
          id="video-bg"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        ></video>
        <div
          className="content"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              color: "#fff",
              marginBottom: "80px",
              marginTop: "0px",
              fontFamily: "Bungee Spice, sans-serif",
              fontSize: "3em",
              fontWeight: "bold",
            }}
          >
            My Todo App
          </h1>
          <div className="todo-container">
            {/* Rest of your components */}
            <Search addTodo={addTodo} />
            <Filter filter_todo={filterTodo} />
            <TodoList
              todos={todos}
              delTodo={delTodo}
              update_todo={updateTodo}
              complete_todo={completeTodo}
              filter_todo={filterTodo}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
