//親コンポーネントから現在のフィルターが何になっているかを値を受け取る(value）
export default function Filter ({value, onChange}) {

  const handleClick = (key, e) => {
    e.preventDefault();
    onChange(key)
  }

  return(
    <div>
      <a
        href="#"
        onClick={handleClick.bind(null, 'ALL')}
      >All</a>
      <a
        href="#"
        onClick={handleClick.bind(null, 'TODO')}
      >ToDo</a>
      <a
        href="#"
        onClick={handleClick.bind(null, 'DONE')}
      >Done</a>
    </div>
  )
}