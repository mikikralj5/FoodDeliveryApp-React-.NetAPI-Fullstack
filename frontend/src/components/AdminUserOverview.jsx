import React from "react";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import AdminService from "../APIService/AdminService.js";
import { useGlobalContext } from "../context/AuthProvider";
import AdminUserOverviewItem from "./AdminUserOverviewItem";

const AdminUserOverview = () => {
  const [users, setUsers] = useState([]);
  const { loading, setLoading } = useGlobalContext();

  const fetchUsers = async () => {
    setLoading(true);
    const data = await AdminService.GetVerifiedUsers();

    if (data) {
      setUsers(data);
    } else {
      setUsers([]);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (users.length === 0) {
    return (
      <section className="cart">
        <header>
          <h2>No users</h2>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>Users overview</h2>
      </header>

      <div>
        {users.map((item) => {
          return <AdminUserOverviewItem key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};

export default AdminUserOverview;
