import React, { useState, useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";

interface Todo {
  id: number;
  task: string;
  status: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  delTodo: (id: number) => void;
  update_todo: (
    e: React.FormEvent<HTMLFormElement>,
    id: number,
    text: string
  ) => void;
  complete_todo: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    todo: Todo
  ) => void;
  filter_todo: (cat_value: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  delTodo,
  update_todo,
  complete_todo,
}) => {
  const taskRef = useRef<HTMLInputElement>(null);

  const [todoId, setTodoId] = useState<number>(0);
  const [task, setTask] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [todo, setTodo] = useState<Todo | {}>({});

  const todoItem = (task: string, id: number) => {
    setTodoId(id);
    setTask(task);
    setToggle(true);
    setTodo(todo);
  };

  return (
    <>
      <div className="todo-list">
        {todos.length === 0 ? (
          <h1
            style={{
              textAlign: "center",
              marginBottom: "20px",
              marginTop: "130px",
              fontStyle: "italic",
            }}
          >
            No tasks
          </h1>
        ) : (
          <>
            <p
              style={{
                textAlign: "center",
                marginBottom: "20px",
                fontSize: "18px",
              }}
            >
              Your tasks:
            </p>
            {todos.map((todo, index) => (
              <div className="todo-list-item" key={index}>
                <div className="task">
                  <input
                    type="checkbox"
                    onChange={(e) => complete_todo(e, todo.id, todo)}
                  />
                  <p id="t_task" className={todo.completed ? "strike" : ""}>
                    {todo.task}
                  </p>
                </div>
                <div className="btn-container">
                  <div className="edit">
                    <TbEdit
                      size={25}
                      onClick={() => todoItem(todo.task, todo.id)}
                    />
                  </div>
                  <div className="del">
                    <AiFillDelete size={25} onClick={() => delTodo(todo.id)} />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {toggle && (
        <div className="modal-container">
          <div className="modal">
            <h1>Update Form</h1>
            <form
              action=""
              onSubmit={(e) => {
                update_todo(e, todoId, task);
                setToggle(false);
              }}
            >
              <input
                type="text"
                ref={taskRef}
                placeholder="Update Todo"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                required
              />
              <button id="add">Update</button>
            </form>
            <div className="btn-container">
              <button
                className="cancel mod-btn"
                onClick={() => setToggle(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoList;
