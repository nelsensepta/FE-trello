import React from "react";
import "./button-group.css";
export default function ButtonGroup({
  handleSave,
  saveLabel,
  handleDelete,
  handleCancel,
}) {
  return (
    <div className="edit-buttons">
      <div className="edit-button" onClick={handleSave}>
        {saveLabel}
      </div>
      <div className="edit-button-cancel" onClick={handleCancel}>
        <ion-icon name="close-outline"></ion-icon>
      </div>
    </div>
  );
}
