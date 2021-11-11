import React, { useState } from "react";
import ButtonGroup from "../ButtonGroup";
import TextField from "../TextField";
import "./add-list.css";
export default function AddList({ handleCancel }) {
  const [name, setName] = useState("");
  return (
    <div className="add-list-editor">
      <TextField
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter list title"
        className="list-title-textarea"
      />
      <ButtonGroup saveLabel="Add list" handleCancel={handleCancel} />
    </div>
  );
}
