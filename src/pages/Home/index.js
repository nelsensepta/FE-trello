import React, { useEffect, useState } from "react";
import { getTodos } from "../../api/todos";
import AddList from "../../components/AddList";
import Board from "../../components/Board";
import Card from "../../components/Card";
import Header from "../../components/Header";
import "./list.css";
export default function HomePage() {
  const [isToggleList, setisToggleList] = useState(false);
  const [todos, setTodos] = useState([]);
  // console.log(todos);
  const getTodosApi = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodosApi();
  }, []);
  return (
    <>
      <Header>MERN Clone Trello Menit 02:35:00</Header>
      <Board>
        <Card todos={todos} />
        <div className="add-list">
          {isToggleList ? (
            <AddList handleCancel={() => setisToggleList(!isToggleList)} />
          ) : (
            <div
              className="add-list-button"
              onClick={() => setisToggleList(!isToggleList)}
            >
              <ion-icon name="add-outline"></ion-icon> Add a list
            </div>
          )}
        </div>
      </Board>
    </>
  );
}
