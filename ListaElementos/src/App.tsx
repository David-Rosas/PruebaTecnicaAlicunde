import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState<string>('');
  const [items, setItems] = useState<string[]>([]);

  const handleAddItem = () => {
    if (inputText.trim() !== '') {
      setItems([...items, inputText]);
      setInputText('');
    }
  };

  const handleDeleteItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  return (
    <div className="App">
      <h1>Lista de Elementos</h1>
      <div>
        <input
          type="text"
          placeholder="Ingrese un elemento"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={handleAddItem}>Agregar</button>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index} onClick={() => handleDeleteItem(index)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

