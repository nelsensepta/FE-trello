import React, { useState, useEffect } from "react";
import TextField from "../TextField";
import { getOneTodo, updateTodo, deleteTodo } from "../../api/todos";
import Title from "../Title";
import "./card.css";
import AddCard from "../AddCard";
export default function Card({ todos, getTodosAPI }) {
  const [editList, setEditlist] = useState({
    status: false,
    id: "",
    name: "",
  });

  const [card, setCard] = useState([]);
  const [todoID, setTodoID] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    setCard(todos);
  }, [todos]);
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

  const deleteTodoAPI = async (id) => {
    try {
      if (window.confirm("Yakin ingin menghapus ?")) {
        const response = await deleteTodo(id);
        if (response.status === 200) {
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

  const toggleAddCard = (id) => {
    const temp = [...card];
    temp.forEach((card) => {
      if (card.id === id) {
        card.status = !card.status;
      }
    });

    setCard(temp);
    setTodoID(id);
  };
  return (
    <>
      {card.map((todo, i) => {
        return (
          <div className="list" key={i}>
            <div className="lists-card">
              {editList.status && editList.id === todo.id ? (
                <TextField
                  name="name"
                  value={editList.name}
                  onChange={onChange}
                  className="list-title-textarea"
                  deleteList={() => deleteTodoAPI(editList.id)}
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
                <div
                  className="card"
                  key={item.id}
                  onMouseEnter={() => setHover(item.id)}
                  onMouseLeave={() => setHover(null)}
                >
                  {hover === item.id && (
                    <div className="card-icons">
                      <div className="card-icon">
                        <ion-icon name="pencil-outline"></ion-icon>
                      </div>
                    </div>
                  )}

                  {item.name}
                </div>
              ))}

              {todo.status ? (
                <AddCard
                  getTodosAPI={getTodosAPI}
                  todoID={todoID}
                  adding
                  cancel={() => toggleAddCard(todo.id)}
                />
              ) : (
                <div
                  className="toggle-add-card"
                  onClick={() => toggleAddCard(todo.id)}
                >
                  <ion-icon name="add-outline"></ion-icon> Add a Card
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
