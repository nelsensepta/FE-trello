import React from "react";
import "./title.css";
export default function Title({ children, onClick }) {
  return (
    <div className="list-title" onClick={onClick}>
      {children}
    </div>
  );
}
