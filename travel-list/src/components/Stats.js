export function Stats({ items }) {
  const totalItems = items.length;
  const packedItenms = items.filter((item) => item.packed !== false).length;
  const packedPercentage = Math.round((packedItenms / totalItems) * 100 || 0);

  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  return (
    <footer className="stats">
      <em>
        {packedPercentage === 100
          ? "You got everything! Ready to go ✈️"
          : `🧳 You have ${totalItems} ${
              totalItems > 1 ? "items" : "item"
            } on your
        list, and you already packed ${packedItenms} (${packedPercentage}%)`}
      </em>
    </footer>
  );
}
