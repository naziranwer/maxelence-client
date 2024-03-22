import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetAllUsers from "../hooks/useGetAllUsers";
import UserCard from "./UserCard";
import Navbar from "./Navbar";
import { host } from "../constant";
import axios from "axios";

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Number of users to display per page
  const [authenticated, setAuthenticated] = useState(true);
  const { users, loading, error } = useGetAllUsers();
  const navigate = useNavigate();
  const [loggedInUserRole, setLoggedInUserRole] = useState(
    JSON.parse(localStorage.getItem("user")).role
  );

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token found, redirect to the login page
      setAuthenticated(false);
      navigate("/");
    }
  }, [navigate]);

  // Handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const onDelete = (userId) => {
    // Implement deletion logic here
    console.log("Deleting user with ID:", userId);

    const apiUrl = host + `/data/users/${userId}`;

    axios
      .delete(apiUrl)
      .then((response) => {
        console.log("User deleted successfully:", response.data);
        alert("User deleted Successfully");
        window.location.reload();
      })
      .catch((error) => {
        alert("Something went wrong");
        console.error("Error deleting user:", error);
      });
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  let filteredUsers = [];
  if (users && users.data) {
    filteredUsers = users.data.filter(
      (user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toString().includes(searchTerm.toLowerCase())
    );
  }
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="flex justify-center">
          <h2 className="text-2xl font-semibold m-4 ">Browse Users</h2>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 m-4 flex justify-center"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentUsers?.length > 0 ? (
            currentUsers?.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                loggedInUserRole={loggedInUserRole}
                onDelete={onDelete}
              />
            ))
          ) : (
            <div>No users found</div>
          )}
        </div>
        {/* Pagination */}
        <ul className="flex justify-center mt-4">
          {Array.from({
            length: Math.ceil(filteredUsers.length / usersPerPage),
          }).map((_, i) => (
            <li
              key={i}
              className={`mx-1 ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              <button className="px-4 py-2" onClick={() => paginate(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Browse;
