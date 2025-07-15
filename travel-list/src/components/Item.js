export function Item({ item, handleDeleteItem, handleToggleItem }) {
  return (
    <li>
      <input type="checkbox" onChange={() => handleToggleItem(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDeleteItem(item.id)}>❌</button>
    </li>
  );
}
