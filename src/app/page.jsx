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
        todo.id === todoId ? { ...todo, checked: !todo.checked } : todo,
      ),
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
      "Are you sure you want to clear all completed tasks?",
    );
    if (!hariu) {
      return;
    }
    const clearedTodos = todos.filter((todo) => !todo.checked);
    setTodos(clearedTodos);
  };
  return (
    <div className="flex flex-col mx-auto w-94 bg-white mt-25 px-4 py-6 gap-5 rounded-xl shadow-2xl text-black font-display">
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
          onKeyDown={(enter) => {
            if (enter.key === "Enter") {
              enter.preventDefault();
              onAdd();
            }
          }}
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
          className={`px-3 py-1 flex items-center justify-center rounded-md border-0 ${sorted === "All" ? "bg-[#3c82f6] text-[#f9f9f9]" : "bg-[#F3F4F6] text-[#363636]"}`}
        >
          All
        </button>
        <button
          onClick={() => category("Active")}
          className={`px-3 py-1 flex items-center justify-center rounded-md border-0 ${sorted === "Active" ? "bg-[#3c82f6] text-[#f9f9f9]" : "bg-[#F3F4F6] text-[#363636]"}`}
        >
          Active
        </button>
        <button
          onClick={() => category("Completed")}
          className={`px-3 py-1 flex items-center justify-center rounded-md border-0 ${sorted === "Completed" ? "bg-[#3c82f6] text-[#f9f9f9]" : "bg-[#F3F4F6] text-[#363636]"}`}
        >
          Completed
        </button>
      </div>

      <div className="flex flex-col max-h-68 items-center gap-2.5 overflow-auto">
        {visibleTodos.map((todo, id) => {
          //category-d angilj haruulah

          return (
            <div
              key={id}
              className="flex rounded-xl bg-[#f9fafb] w-full items-center  justify-between px-4 py-2 gap-5 relative"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.checked}
                  onChange={() => toggleTodo(todo.id)}
                  className=" justify-items-start absolute h-5 w-5"
                />
                <p
                  className={`max-h-30 text-sm pl-8 pr-4 py-4 break-all items-center overflow-auto   ${
                    todo.checked ? "line-through" : ""
                  }`}
                >
                  {todo.text}
                </p>
              </div>
              <button
                className="py-1.5 px-3 rounded-md bg-[#fef2f2] text-[#ef4444] "
                onClick={() => deleted(todo.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>

      {/* ternary bichne */}
      {todos.length === 0 ? (
        <p className="h-7 text-center text-sm text-[#6b7280] relative t-2.5">
          No tasks yet. Add one above!
        </p>
      ) : (
        <div className="flex justify-between pt-4 border border-solid border-t-2 border-x-0 border-b-0 border-[#E4E4E7]">
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
      )}

      <div className="flex justify-center w-full h-4 gap-1">
        <div className="text-3 h-4 text-gray-500">Powered by</div>
        <div className="text-3 h-4 text-[#3b73ed]">Pinecone academy</div>
      </div>
    </div>
  );
}
