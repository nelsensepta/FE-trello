import React from "react";
import "./text-field.css";
import TextareaAutosize from "react-textarea-autosize";
export default function TextField({
  name,
  value,
  onChange,
  placeholder,
  className,
  deleteList,
  onEnter,
  handleCancel,
}) {
  return (
    <div className="list-title-edit">
      <TextareaAutosize
        autoFocus
        onKeyDown={onEnter}
        className={className}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ width: deleteList ? 220 : 254 }}
      />
      {deleteList && (
        <>
          <ion-icon name="trash" onClick={deleteList}></ion-icon>
          <ion-icon name="close" onClick={handleCancel}></ion-icon>
        </>
      )}
    </div>
  );
}
