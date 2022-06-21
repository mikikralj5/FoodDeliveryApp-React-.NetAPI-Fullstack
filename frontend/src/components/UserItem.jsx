import React from "react";
import { useGlobalContext } from "../context/AuthProvider";
import DoneIcon from "@mui/icons-material/Done";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
const UserItem = ({ username, setUsers, users }) => {
  const { auth } = useGlobalContext();
  //const [action, setAction] = React.useState[''];
  const handleClick = async (action) => {
    try {
      const respp = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Admin/VerifyUser`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            username: username,
            state: action,
          }),
        }
      );
      if (respp.ok) {
        const jsoned = await respp.json();
        setUsers(users.filter((item) => item.username != username));
      } else if (respp.status === 401) {
        console.log("Unathorized");
      } else if (respp.status === 400) {
        console.log("bad username or password");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <article className="cart-item">
      <img src={"/6.png"} />
      <div>
        <h4>{username}</h4>
      </div>
      <div>
        <button onClick={() => handleClick("ACCEPTED")}>
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
