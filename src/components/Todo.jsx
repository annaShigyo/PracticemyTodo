import { useState } from "react";
import TodoItem from "./TodoItem";
import Filter from "./Filter";
import Input from "./Input";

//一番大枠のコンポーネント Todoのリストを管理する（フィルタリングも）
export default function Todo() {
  //tasklistのステート管理
  const getKey = () => Math.random().toString(32).substring(2);
  const [items, setItems] = useState([
    { key: getKey(), text: "Learn JavaScript", done: false },
    { key: getKey(), text: "Learn React", done: false },
    { key: getKey(), text: "Learn TypeScript", done: false },
  ]);
  //フィルターの状態をステート管理
  const [filter, setFilter] = useState("ALL");

  //チェックボックスの変化でdoneプロパティをtoggle
  const handleCheck = (key) => {
    const newItems = items.map((item) => {
      if (item.key === key) {
        return {
          ...item,
          done: !item.done,
        };
      }
      return item;
    });
    setItems(newItems);
  };

  //入力されたテキストを受け取って新しいtodoをitemsに追加
  const handleAdd = (text) => {
    setItems([...items, { key: getKey(), text: text, done: false }]);
  };

  //フィルターが変化したのを検知してフィルターを更新
  const handleFilterChange = (value) => {
    if (["ALL", "TODO", "DONE"].includes(value)) {
      setFilter(value);
    }
  };

  //フィルターの変化に応じてreturnするItemを変化させる
  const displayItems = items.filter((item) => {
    if (filter === "ALL") return true;
    if (filter === "TODO") return !item.done;
    if (filter === "DONE") return item.done;
  });

  //TodoItemコンポーネントから押されたitemのkeyプロパティを受け取り、filterメソッドで新しくフィルタリングした配列を定義
  //setItemにnewTodosを渡すことで、itemsを更新
  const handleDeleteClick = (key) => {
    const newTodos = items.filter((item) => {
      if (item.key !== key) {
        return item;
      }
    });
    setItems(newTodos);
  };

  const handleEdit = (key, editedText) => {
    const newItems = items.map((item) => {
      if (item.key === key) {
        return { ...item, text: editedText };
      }
      return item;
    });
    setItems(newItems)
  };

  return (
    <div>
      <Input onAdd={handleAdd} />
      <Filter onChange={handleFilterChange} value={filter} />
      {displayItems.map((item) => (
        <TodoItem
          key={item.key}
          item={item}
          onCheck={() => handleCheck(item.key)}
          onClick={handleDeleteClick}
          onEdit={handleEdit}
        />
      ))}

      <div className="panel-block">{displayItems.length} items</div>
    </div>
  );
}
