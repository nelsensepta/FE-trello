import React, { useState } from "react";
import TextField from "../TextField";
import Title from "../Title";
import "./card.css";
export default function Card() {
  const [editList, seteditList] = useState({
    status: false,
    id: "",
    name: "",
  });
  return (
    <>
      <div className="list">
        <div className="lists-card">
          {editList.status ? (
            <TextField
              name="name"
              value={editList.name}
              className="list-title-textarea"
              deleteList={() => null}
              handleCancel={() =>
                seteditList({ ...editList, status: !editList.status })
              }
            />
          ) : (
            <Title
              onClick={() =>
                seteditList({ ...editList, status: !editList.status })
              }
            >
              Doing
            </Title>
          )}

          <div className="card">Main Game</div>
          <div className="toggle-add-card">
            <ion-icon name="add-outline"></ion-icon> Add a Card
          </div>
        </div>
      </div>
    </>
  );
}
