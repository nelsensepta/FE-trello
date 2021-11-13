import React, { useCallback, useEffect, useState } from "react";
import ButtonGroup from "../ButtonGroup";
import TextField from "../TextField";
import "./add-card.css";
import {
  createItem,
  getOneItem,
  updateItem,
  deleteItem,
} from "../../api/items";

export default function AddCard({
  getTodosAPI,
  itemID,
  todoID,
  adding,
  cancel,
}) {
  const [name, setName] = useState("");

  const getOneItemAPI = useCallback(async () => {
    try {
      const response = await getOneItem(itemID);
      if (response.status === 200) {
        setName(response.data.data.name);
      }
    } catch (err) {
      console.log(err);
    }
  }, [itemID]);

  useEffect(() => {
    getOneItemAPI();
  }, [getOneItemAPI]);

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

  const updateItemAPI = async () => {
    try {
      const payload = {
        name: name,
      };
      const response = await updateItem(itemID, payload);
      if (response.status === 200) {
        getTodosAPI();
        clear();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteItemAPI = async () => {
    try {
      const response = await deleteItem(itemID);
      if (response.status === 200) {
        getTodosAPI();
        clear();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="edit-card">
      <div className="card">
        <TextField
          className="edit-card-textarea"
          name="name"
          value={name}
          placeholder="Enter a title for this card"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <ButtonGroup
        handleSave={() => {
          adding ? saveItem() : updateItemAPI();
        }}
        saveLabel={adding ? "Add card" : "Edit card"}
        handleCancel={cancel}
        handleDelete={() => deleteItemAPI()}
      />
    </div>
  );
}
