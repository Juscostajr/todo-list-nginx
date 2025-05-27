import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const backendUri = process.env.REACT_APP_BACKEND_URI;

  useEffect(() => {
    fetch(`${backendUri}/todos`)
      .then(res => res.json())
      .then(setTodos);
  }, [backendUri]);

  const addTodo = async () => {
    if (!text.trim()) return; // evitar itens vazios
    const res = await fetch(`${backendUri}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, completed: false })
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setText('');
  };

  const toggleTodo = async (id, completed) => {
    const res = await fetch(`${backendUri}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
    });
    const updatedTodo = await res.json();
    setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo));
  };

  const deleteTodo = async (id) => {
    await fetch(`${backendUri}/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>📒 Tarefas</h1>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Adicionar nova nota..."
        />
        <button style={styles.addButton} onClick={addTodo}>Adicionar</button>
      </div>
      <div style={styles.list}>
        {todos.map(todo => (
          <div key={todo._id} style={styles.card}>
            <div style={styles.cardContent}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo._id, todo.completed)}
                style={styles.checkbox}
              />
              <span style={{
                ...styles.text,
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#999' : '#333'
              }}>
                {todo.text}
              </span>
            </div>
            <button style={styles.deleteButton} onClick={() => deleteTodo(todo._id)}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: 20,
    maxWidth: 600,
    margin: '0 auto',
    backgroundColor: '#f3f3f3',
    minHeight: '100vh'
  },
  header: {
    textAlign: 'center',
    color: '#2f855a'
  },
  inputContainer: {
    display: 'flex',
    marginBottom: 20
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    border: '1px solid #ccc',
    borderRadius: 4
  },
  addButton: {
    padding: '10px 20px',
    marginLeft: 10,
    backgroundColor: '#38a169',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 10
  },
  checkbox: {
    transform: 'scale(1.2)'
  },
  text: {
    fontSize: 16
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    fontSize: 18,
    cursor: 'pointer'
  }
};

export default App;
