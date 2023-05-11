import { useState } from "react";
//itemを受け取って、表示させる部分 チェックボックスを有する チェックされたら親コンポーネントに知らせる
//親コンポーネントでitemのdoneプロパティをtoggleさせているのでその状態に応じてclassNameを変化させる
export default function TodoItem({ item, onCheck, onClick, onEdit }) {
  //編集中かどうかを判断するためのステート
  const [editing, setEditing] = useState(false);
  //編集したtextを保持するステート
  const [editedText, setEditedText] = useState(item.text);
  const [checked,setChecked] = useState(item.done);

  //アイテムのチェックボックスの変更を検知して親コンポーネントから渡されたonCheck関数を呼び出す
  const handleChange = () => {
    setChecked(!checked)
    onCheck(item.key);
  };

  //アイテムのDeleteボタンがクリックされたらそのアイテムをitemsから削除
  const handleDelete = () => {
    onClick(item.key);
  };

  //アイテムの編集ボタンがクリックされたらそのアイテムを編集できる状態にする
  const handleEdit = () => {
    setEditing(true);
  };

  //入力された新しいテキストをeditedTextに格納する
  const handleEditedTextChange = (e) => {
    setEditedText(e.target.value);
  };

  //ボタンを押したらテキストを更新する（keyとeditedTextを親コンポーネントに渡す
  const handleEditDone = () => {
    setEditing(false);
    onEdit(item.key, editedText);
  };
  //ボタンを押したら元のテキストに戻す
  const handleEditCansel = () => {
    setEditedText(item.text);
    setEditing(false);
  };
  return (
    <label className={`panel-block ${checked ? "has-text-grey-light" : ""}`}>
      {editing ? (
        <input
          type="text"
          value={editedText}
          onChange={handleEditedTextChange}
        />
      ) : (
        <>
          <input type="checkbox" checked={checked} onChange={handleChange} />
          {item.text}
        </>
      )}
      <button onClick={handleDelete}>Delete</button>
      {editing ? (
        <>
          <button onClick={handleEditDone}>Done</button>
          <button onClick={handleEditCansel}>Cansel</button>
        </>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
    </label>
  );
}
