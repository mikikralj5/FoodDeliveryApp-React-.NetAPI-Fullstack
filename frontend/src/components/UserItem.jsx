import React from "react";
import { useGlobalContext } from "../context/AuthProvider";
import DoneIcon from "@mui/icons-material/Done";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import AdminService from "../APIService/AdminService";
const UserItem = ({ username, setUsers, users }) => {
  const handleClick = async (action) => {
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

  return (
    <article className="cart-item">
      <img src={"/6.png"} />
      <div>
        <h4>{username}</h4>
      </div>
      <div>
        <button onClick={() => handleClick("CONFIRMED")}>
          <DoneIcon></DoneIcon>
        </button>
        <button onClick={() => handleClick("DECLINED")}>
          <DoNotDisturbIcon></DoNotDisturbIcon>
        </button>
      </div>
    </article>
  );
};

export default UserItem;
