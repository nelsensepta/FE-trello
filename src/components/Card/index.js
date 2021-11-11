import React, { useState } from "react";
import TextField from "../TextField";
import Title from "../Title";
import "./card.css";
export default function Card({ todos }) {
  const [editList, setEditlist] = useState({
    status: false,
    id: "",
    name: "",
  });
  return (
    <>
      {todos.map((todo, i) => {
        return (
          <div className="list" key={i}>
            <div className="lists-card">
              {editList.status ? (
                <TextField
                  name="name"
                  value={editList.name}
                  className="list-title-textarea"
                  deleteList={() => null}
                  handleCancel={() =>
                    setEditlist({ ...editList, status: !editList.status })
                  }
                />
              ) : (
                <Title
                  onClick={() =>
                    setEditlist({ ...editList, status: !editList.status })
                  }
                >
                  {todo.name}
                </Title>
              )}

              {todo.Items.map((item) => (
                <div className="card" key={item.id}>
                  {item.name}
                </div>
              ))}
              <div className="toggle-add-card">
                <ion-icon name="add-outline"></ion-icon> Add a Card
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
