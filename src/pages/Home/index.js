import React, { useEffect, useState } from "react";
import { getTodos } from "../../api/todos";
import AddList from "../../components/AddList";
import Board from "../../components/Board";
import Card from "../../components/Card";
import Header from "../../components/Header";
import "./list.css";
export default function HomePage() {
  const [isToggleList, setIsToggleList] = useState(false);
  const [todos, setTodos] = useState([]);
  console.log(todos);
  const getTodosAPI = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodosAPI();
  }, []);
  return (
    <>
      <Header>MERN Clone Trello Menit 02:41:20</Header>
      <Board>
        <Card todos={todos} getTodosAPI={() => getTodosAPI()} />
        <div className="add-list">
          {isToggleList ? (
            <AddList
              handleCancel={() => setIsToggleList(!isToggleList)}
              getTodosAPI={() => getTodosAPI()}
            />
          ) : (
            <div
              className="add-list-button"
              onClick={() => setIsToggleList(!isToggleList)}
            >
              <ion-icon name="add-outline"></ion-icon> Add a list
            </div>
          )}
        </div>
      </Board>
    </>
  );
}
