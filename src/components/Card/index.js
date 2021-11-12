import React, { useState } from "react";
import TextField from "../TextField";
import { getOneTodo, updateTodo } from "../../api/todos";
import Title from "../Title";
import "./card.css";
export default function Card({ todos, getTodosAPI }) {
  const [editList, setEditlist] = useState({
    status: false,
    id: "",
    name: "",
  });
  const toggleEditList = async (id, status) => {
    try {
      const response = await getOneTodo(id);

      if (response.status === 200) {
        setEditlist({
          ...editList,
          status: status,
          id: response.data.data.id,
          name: response.data.data.name,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onEnter = async (e, id) => {
    try {
      if (e.keyCode === 13) {
        const payload = { name: editList.name };
        const response = await updateTodo(payload, id);
        if (response.status === 200) {
          setEditlist({
            ...editList,
            status: false,
            id: "",
            name: "",
          });
          getTodosAPI();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onChange = (e) => {
    setEditlist({ ...editList, [e.target.name]: e.target.value });
  };
  return (
    <>
      {todos.map((todo, i) => {
        return (
          <div className="list" key={i}>
            <div className="lists-card">
              {editList.status && editList.id === todo.id ? (
                <TextField
                  name="name"
                  value={editList.name}
                  onChange={onChange}
                  className="list-title-textarea"
                  deleteList={() => null}
                  handleCancel={() =>
                    setEditlist({
                      ...editList,
                      status: !editList.status,
                      id: "",
                      name: "",
                    })
                  }
                  onEnter={(e) => onEnter(e, editList.id)}
                />
              ) : (
                <Title onClick={() => toggleEditList(todo.id, true)}>
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
