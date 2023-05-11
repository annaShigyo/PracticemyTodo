import { useState } from "react";

//フォームに入力された値を管理するコンポーネント
export default function Input({onAdd}) {
  const [text, setText] = useState("");

  //フォームの内容の変化を感知して、値を都度更新
  const handleChange = (e) => {
    setText(e.target.value)
  }

  //フォームの内容が空でなければTodoコンポーネントのonAddメソッドを呼び出してitemsに新たに追加する
  //追加が終わったらフォームの内容を初期値に戻す
  const handleSubmit = (e) => {
    e.preventDefault();
    if(text !== "") {
      onAdd(text)
      setText("")
    }

  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="task"
          value={text}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
