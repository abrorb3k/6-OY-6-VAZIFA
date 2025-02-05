import { useState, useEffect } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const notify = (message) =>
    toast(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyy = (message) =>
    toast(message || "Ma'lumotlar olib kelinmadi", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
          notify("Ma'lumotlar muvaffaqiyatli yuklandi");
        }
      })
      .catch((error) => {
        notifyy("Ma'lumotlarni yuklashda xato yuz berdi");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleDelete(id) {
    let confirmDelete = window.confirm("Rostan o'chirmoqchimisz");
    if (confirmDelete) {
      axios
        .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => {
          if (response.status === 200) {
            const updatedUsers = users.filter((user) => user.id !== id);
            setUser(updatedUsers);
            notify("Post muvaffaqiyatli o'chirildi");
          }
        })
        .catch((error) => {
          notifyy("O'chirishda xato yuz berdi");
          console.log(error);
        });
    }
  }

  return (
    <div>
      <div className="cards">
        {loading && (
          <div className="loading">
            <RotatingLines
              visible={true}
              height="96"
              width="96"
              color="gray"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          </div>
        )}
        {users.length > 0 &&
          users.map((user) => (
            <div className="card" key={user.id}>
              <h3>{user.title}</h3>
              <h3>{user.body}</h3>
              <button className="del-btn" onClick={() => handleDelete(user.id)}>
                Delete
              </button>
            </div>
          ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default HomePage;
