import { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Addpostt() {
  const [nextId, setNextId] = useState(102);
  const titleRef = useRef();
  const descRef = useRef();

  const notify = (message) =>
    toast(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  function handleSend(event) {
    event.preventDefault();

    const title = titleRef.current.value;
    const body = descRef.current.value;

    if (!title || !body) {
      notify("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    const data = {
      id: nextId,
      title: title,
      body: body,
    };

    axios
      .post(`https://jsonplaceholder.typicode.com/posts`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setNextId(nextId + 1);
          titleRef.current.value = "";
          descRef.current.value = "";
          notify("Post muvaffaqiyatli qo'shildi");
        }
      })
      .catch((error) => {
        notify("Post qo'shishda xato yuz berdi");
        console.log(error);
      });
  }

  return (
    <div>
      <form>
        <input ref={titleRef} type="text" placeholder="Title kiriting" />
        <input ref={descRef} type="text" placeholder="Fikr bildiring" />
        <button onClick={handleSend} className="add">
          Send
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Addpostt;

