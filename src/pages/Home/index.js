import React, { useEffect, useState } from "react";
import { getTodos } from "../../api/todos";
import AddList from "../../components/AddList";
import Board from "../../components/Board";
import Card from "../../components/Card";
import Header from "../../components/Header";
import "./list.css";
export default function HomePage() {
  const [isToggleList, setisToggleList] = useState(false);

  const getTodosApi = async () => {
    const response = await getTodos();
    console.log(response);
  };

  useEffect(() => {
    getTodosApi();
  }, []);
  return (
    <>
      <Header>MERN Clone Trello</Header>
      <Board>
        <Card />
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

// Menit 02:17:43
