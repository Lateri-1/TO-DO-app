import { useEffect, useState } from "react";
import "./App.css";


// Header
function Header() {
  return (
    <header>
      To do list
    </header>
  );
}


// App
function App() {

  const API_URL = "http://localhost/Opdracht/index.php";


  // list van alle To Do items
  const [todos, setTodos] = useState([]);


  // waarde input
  const [newItem, setNewItem] = useState("");


  // get alle Todo PHP
  useEffect(() => {

    fetch(`${API_URL}?cmd=all`)
      .then(response => response.json())
      .then(data => {
        setTodos(data);
      });

  }, []);


  // toevoegen Todo
  function addTodo() {

    fetch(
      `${API_URL}?cmd=add&item=${encodeURIComponent(newItem)}`
    )
      .then(response => response.json())
      .then(data => {

        setTodos([
          ...todos,
          data
        ]);

        setNewItem("");

      });

  }


  // maken Todo DONE
  function markDone(id) {

    fetch(`${API_URL}?cmd=done&id=${id}`)
      .then(response => response.json())
      .then(() => {

        setTodos(
          todos.map(todo =>
            todo.id == id
              ? { ...todo, status: "DONE" }
              : todo
          )
        );

      });

  }


  // verdwijderen Todo
  function removeTodo(id) {

    fetch(`${API_URL}?cmd=remove&id=${id}`)
      .then(response => response.json())
      .then(() => {

        setTodos(
          todos.filter(todo => todo.id != id)
        );

      });

  }


  return (
    <div className="app">

      {/* Header */}
      <header className="header">

        <div className="header-content">

          <div>
            <h1>My To Do List</h1>
            <p>Keep track of your daily tasks</p>
          </div>

          <div className="counter">

            <span className="counter-number">
              {todos.length}
            </span>

            <span className="counter-label">
              tasks
            </span>

          </div>

        </div>

      </header>


      {/* Main */}
      <main className="container">


        {/* Add To Do */}
        <section className="add-section">

          <input
            type="text"
            className="todo-input"
            placeholder="What needs to be done?"
            value={newItem}
            onChange={(event) => setNewItem(event.target.value)}
          />


          <button
            className="add-button"
            onClick={addTodo}
          >
            + Add
          </button>

        </section>


        {/* Todo list */}
        <section className="todo-section">


          <div className="section-header">

            <h2>My Tasks</h2>

            <span className="task-count">
              {todos.length} items
            </span>

          </div>


          {/* Items */}
          {todos.map((todo) => (

            <div
              key={todo.id}
              className={`todo-item ${
                todo.status === "DONE" ? "done" : ""
              }`}
            >


              <div className="todo-left">

                {/* DONE button */}
                <button
                  className="check-button"
                  onClick={() => markDone(todo.id)}
                >
                  ✓
                </button>


                {/* Todo text */}
                <span className="todo-text">
                  {todo.item}
                </span>

              </div>


              <div className="todo-right">


                {/* Status */}
                <span
                  className={`status ${
                    todo.status === "DONE"
                      ? "status-done"
                      : "status-pending"
                  }`}
                >
                  {todo.status}
                </span>


                {/* Delete button */}
                <button
                  className="delete-button"
                  onClick={() => removeTodo(todo.id)}
                >
                  ✓
                </button>

              </div>

            </div>

          ))}


          {/* Empty list */}
          {todos.length === 0 && (

            <div className="empty-state">

              <div className="empty-icon">
                ✓
              </div>

              <h3>No tasks yet</h3>

              <p>
                Add your first task above.
              </p>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}


export default App;