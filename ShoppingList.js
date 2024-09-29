import React from 'react';

function ShoppingList() {
  const shoppingItems = [
    { id: 1, name: 'Tomatoes', quantity: 3 },
    { id: 2, name: 'Pasta', quantity: 1 },
  ];

  const handleComparePrices = (item) => {
    // Compare prices between retailers for the item.
  };

  return (
    <div>
      <h2>Shopping List</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Compare Stores</th>
          </tr>
        </thead>
        <tbody>
          {shoppingItems.map((item) => (
            <tr key={item.id}>
              <td>
                <input type="checkbox" id={`item-${item.id}`} /> {item.name}
              </td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => handleComparePrices(item)}>Compare Prices</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShoppingList;
