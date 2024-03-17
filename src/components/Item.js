import React, { useState, useEffect } from 'react';
import '../styles/Item.css';

export default function Item({ items, handleEdit, onDelete }) {
  const [checkedItems, setCheckedItems] = useState(() => {
    // Initialize checked items from local storage or set default value as an empty array
    const storedCheckedItems = localStorage.getItem('checkedItems');
    return storedCheckedItems ? JSON.parse(storedCheckedItems) : [];
  });

  function toggleChecked(id) {
    const updatedCheckedItems = checkedItems.includes(id)
      ? checkedItems.filter(itemId => itemId !== id)
      : [...checkedItems, id];

    setCheckedItems(updatedCheckedItems);
    localStorage.setItem('checkedItems', JSON.stringify(updatedCheckedItems));
  }

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id} onClick={() => toggleChecked(item.id)} className={checkedItems.includes(item.id) ? 'checked' : ''}>
            <Task item={item} onDelete={onDelete} handleEdit={handleEdit} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Task({ item, onDelete, handleEdit }) {
  const [isEditing, setIsEditing] = useState(false);

  function saveEdit(editedText) {
    const updatedItem = { ...item, text: editedText };
    handleEdit(updatedItem);
  }

  return (
    <div>
      {isEditing ? (
        <>
          <input
            className='editItemInput'
            type="text"
            value={item.text}
            onChange={(e) => saveEdit(e.target.value)}
          />
          <button className='save' onClick={() => setIsEditing(false)}>Save</button>
          <span className='closeIcon' onClick={() => onDelete(item.id)} >&times;</span>
        </>
      ) : (
        <>
          {item.text}
          <span>
            <i className="fa-solid fa-pen-to-square position" onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}></i>
          </span>
          <span className='closeIcon' onClick={() => onDelete(item.id)} >&times;</span>
        </>
      )}
    </div>
  );
}
