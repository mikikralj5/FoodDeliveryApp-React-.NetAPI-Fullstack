import { React, useState, useEffect } from "react";
import { useGlobalContext } from "../context/AuthProvider";
import DoneIcon from "@mui/icons-material/Done";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import AdminService from "../APIService/AdminService";
import emailjs from "@emailjs/browser";
import ConsumerService from "../APIService/ConsumerService";

const UserItem = ({ username, setUsers, users, email }) => {
  const [img, setImg] = useState();

  const fetchImg = async (username) => {
    const userImgBlob = await ConsumerService.GetUserImageByUsername(username);
    setImg(URL.createObjectURL(userImgBlob));
  };

  useEffect(() => {
    fetchImg(username);
  }, []);
  const handleClick = async (action) => {
    console.log(action);
    const respp = await AdminService.PostUser({
      username: username,
      state: action,
    });

    if (respp.ok) {
      const jsoned = await respp.json();
      setUsers(users.filter((item) => item.username != username));
    } else if (respp.status === 401) {
      console.log("Unathorized");
    } else if (respp.status === 400) {
      console.log("bad username or password");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_epiwf4s",
        "template_wq9ux0c",
        e.target,
        "38XQ2UXCry6qGRKU1"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <article className="cart-item">
      <img src={img} />
      <div>
        <h4>{username}</h4>
      </div>
      <div>
        {/* <button onClick={() => handleClick("CONFIRMED")}>
          <DoneIcon></DoneIcon>
        </button>
        <button onClick={() => handleClick("DECLINED")}>
          <DoNotDisturbIcon></DoNotDisturbIcon>
        </button> */}
        <form onSubmit={handleSubmit}>
          <input type="hidden" value={email} name="toEmail" />
          <input type="hidden" value="CONFIRMED" name="state" />
          <button type="submit" onClick={() => handleClick("CONFIRMED")}>
            <DoneIcon></DoneIcon>
          </button>
        </form>
        <form onSubmit={handleSubmit}>
          <input type="hidden" value={email} name="toEmail" />
          <input type="hidden" value="DECLINED" name="state" />
          <button type="submit" onClick={() => handleClick("DECLINED")}>
            <DoNotDisturbIcon></DoNotDisturbIcon>
          </button>
        </form>
      </div>
    </article>
  );
};

export default UserItem;
