import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  task: string;
}

interface InputProps {
  addTodo: (data: { task: string }) => void;
}

const Search: React.FC<InputProps> = ({ addTodo }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>(); // Specify the FormData type here

  const onSubmit: SubmitHandler<FormData> = (data) => {
    addTodo(data);
    reset();
  };

  return (
    <div className="todo-input">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          id="task"
          placeholder="Enter Todo"
          {...register("task", { required: true })}
        />
        <button type="submit">Add</button>
      </form>
      {errors.task?.type === "required" && (
        <small>This field is required</small>
      )}
    </div>
  );
};

export default Search;
