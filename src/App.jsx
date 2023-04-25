import { useEffect, useState } from "react";
import InputForm from "./components/InputForm";

export default function App() {
  //リストでtodos保存
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  //入力されたtodoを保存
  const [todo, setTodo] = useState("");
  //編集中かどうかの状態を保存
  const [isEdit, setIsEdit] = useState(false);
  //編集して新しく保存するtodoのtext
  const [currentTodo, setCurrentTodo] = useState({});

  //ドロップダウンリストでtodoのステータスを変更するためのステート
  const [selectedStatus, setSelectedStatus] = useState(todo.status);
  //リストで表示させたいもののフィルターの値　初期値すべて
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
          status: "notStarted",
        },
      ]);
      setTodo("");
    }
  }

  function handleDeleteClick(id) {
    const deleteTodos = todos.filter((todo) => todo.id !== id);
    setTodos(deleteTodos);
  }

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  }

  function handleEditClick(todo) {
    setIsEdit(true);

    setCurrentTodo({ ...todo });
  }

  function handleUpdateTodo(id, updatedTodo) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEdit(false);

    setTodos(updatedItem);
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  //選択されたステータスに更新
  function handleStatusChange(e) {
    setSelectedStatus(e.target.value);
  }
  //選択されたステータスにフィルターを更新
  function handleFilterChange(e) {
    setSelectedFilter(e.target.value);
  }

  return (
    <div className="App">
      {isEdit ? (
        <form onSubmit={handleEditFormSubmit}>
          <h2>Edit Todo</h2>
          <label htmlFor="editTodo">Edit todo: </label>
          <input
            name="editTodo"
            type="text"
            placeholder="Edit todo"
            value={currentTodo.text}
            onChange={handleEditInputChange}
          />

          <button type="submit">Update</button>
          <button onClick={() => setIsEdit(false)}>Cansel</button>
        </form>
      ) : (
        <>
          <h1>TodoApp</h1>
          <InputForm
            todo={todo}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
          />
          <select name="進行度" size="1" onChange={handleFilterChange}>
            <option value="all">すべて</option>
            <option value="notStarted">未着手</option>
            <option value="inProgress">着手</option>
            <option value="done">完了</option>
          </select>
        </>
      )}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <select name="進行度" size="1" onChange={handleStatusChange}>
              <option value="notStarted">未着手</option>
              <option value="inProgress">着手</option>
              <option value="done">完了</option>
            </select>
            <button onClick={() => handleEditClick(todo)}>編集</button>
            <button onClick={() => handleDeleteClick(todo.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
