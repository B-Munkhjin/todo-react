"use client";

import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [sorted, setSorted] = useState("All");
  const onAdd = () => {
    if (inputValue.length === 0) {
      return;
    }
    // shineer todo oruulhad uuseh zuils
    const newTodo = {
      id: todos.length,
      text: inputValue,
      checked: false, //change its value (active)
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };
  // utga-iig ni avhiing tuld event.target.value bichj bn
  const handleChange = (event) => {
    setInputValue(event.target.value);
    // console.log(event);
  };

  const deleted = (todoId) => {
    const answer = confirm("Are you sure you want to delete this task?");

    if (!answer) {
      return;
    }

    const newTodos = todos.filter((todo) => {
      if (todo.id === todoId) {
        return false;
      } else {
        return true;
      }
    });
    setTodos(newTodos);
  };
  // checked iin shalgah
  const toggleTodo = (todoId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const category = (categoryValue) => {
    setSorted(categoryValue); //setSorted ni categoryValue-g avna
  };
  const visibleTodos = todos.filter((todo) => {
    if (sorted === "Active") {
      return todo.checked === false;
    }
    if (sorted === "Completed") {
      return todo.checked === true;
    }
    return true; // default all boloh
  });
  const completed = todos.filter((todo) => todo.checked === true).length;
  const total = todos.length;
  const clearCompleted = () => {
    const hariu = confirm(
      "Are you sure you want to clear all completed tasks?"
    );
    if (!hariu) {
      return;
    }
    const clearedTodos = todos.filter((todo) => !todo.checked);
    setTodos(clearedTodos);
  };
  return (
    <div className="flex flex-col mx-auto w-94 bg-white mt-25 px-4 py-6 gap-5 rounded-xl shadow-2xl text-black">
      <h1 className="w-86 h-7 flex justify-center text-xl font-semibold">
        To-Do list
      </h1>
      <div className="w-86.25 h-9 flex gap-1.5 justify-center items-center">
        <input
          type="text"
          className="w-70 h-9 text-sm border border-gray-300 rounded-md flex justify-center px-4 py-2"
          value={inputValue}
          onChange={(event) => handleChange(event)}
          placeholder="Add a new task..."
        ></input>
        <button
          onClick={onAdd}
          className="w-15 h-9 flex justify-center items-center rounded-md bg-[#3c82f6] text-[#f9f9f9] border-0"
        >
          Add
        </button>
      </div>

      <div className="flex gap-1.5">
        <button
          onClick={() => category("All")}
          className=" px-3 py-1 flex items-center justify-center rounded-md bg-[#3c82f6] text-[#f9f9f9] border-0"
        >
          All
        </button>
        <button
          onClick={() => category("Active")}
          className="px-3 py-1flex items-center justify-center rounded-md bg-[#3c82f6] text-[#f9f9f9] border-0"
        >
          Active
        </button>
        <button
          onClick={() => category("Completed")}
          className="px-3 py-1 flex items-center justify-center rounded-md bg-[#3c82f6] text-[#f9f9f9] border-0"
        >
          Completed
        </button>
      </div>
      <div className="flex flex-col items-center gap-2.5 ">
        {visibleTodos.map((todo, id) => {
          return (
            <div
              key={id}
              className="flex gap-2 rounded-xl bg-[#f9fafb] items-center px-3 w-86"
            >
              {/* <div >No tasks yet. Add one above!</div> */}
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={todo.checked}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-5 h-5 rounded-xs pl-4"
                ></input>
                <p
                  className={`w-61 text-lg whitespace-normal h-15 flex items-center  ${
                    todo.checked ? "line-through" : ""
                  }`}
                >
                  {todo.text}
                </p>
              </div>
              <button
                className="w-17 h-8 rounded-md bg-[#fef2f2] text-[#ef4444] py-1.5 px-3"
                onClick={() => deleted(todo.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between">
        <div className="text-sm text-gray-500">
          {completed} of {total} tasks completed
        </div>
        <button
          className="text-sm text-red-500 bg-white border-white "
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      </div>

      <div className="flex justify-center w-full h-4 gap-1">
        <div className="text-3 h-4 text-gray-500">Powered by</div>
        <div className="text-3 h-4 text-[#3b73ed]">Pinecone academy</div>
      </div>
    </div>
  );
}
