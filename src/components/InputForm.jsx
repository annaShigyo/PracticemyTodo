import React from "react";

const InputForm=({todo, handleInputChange, handleFormSubmit})=> {
  return(
  <>
    <form onSubmit={handleFormSubmit}>
      <input
        name="todo"
        type="text"
        label="title"
        placeholder="Create a new todo"
        value={todo}
        onChange={handleInputChange}
      />
      <button>作成</button>
    </form>
  </>
  )
}
export default InputForm;
