import React, { useState } from "react";
import ButtonGroup from "../ButtonGroup";
import TextField from "../TextField";
import "./add-card.css";
import { createItem } from "../../api/items";

export default function AddCard({ getTodosAPI, todoID, adding, cancel }) {
  const [name, setName] = useState("");
  const clear = () => {
    setName("");
    cancel();
  };
  const saveItem = async () => {
    try {
      const payload = {
        name: name,
        todoId: todoID,
      };
      const response = await createItem(payload);
      if (response.status === 201) {
        getTodosAPI();
        clear();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateItem = async () => {};

  return (
    <div className="edit-card">
      <div className="card">
        <TextField
          className="edit-card-textarea"
          name="name"
          vlaue={name}
          placeholder="Enter a title for this card"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <ButtonGroup
        handleSave={() => {
          adding ? saveItem() : updateItem();
        }}
        saveLabel={adding ? "Add card" : "Edit card"}
        handleCancel={cancel}
      />
    </div>
  );
}
