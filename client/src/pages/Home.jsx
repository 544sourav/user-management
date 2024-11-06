/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { getUsers } from "../service/operations/userAPI";
import AddUser from "../components/AddUser";
import PeopleCard from "../components/PeopleCard";

export const Home = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isloading , setIsloading]  = useState(false);

  // Fetch users from the backend
  const fetchUsers = async () => {
    setIsloading(true);
    const response = await getUsers(page);
    if (!response.error) {
      setUsers(response);
    } else {
      console.error(response.error);
    }
    setIsloading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const openAddUserModal = () => setIsAddUserModalOpen(true);
  const closeAddUserModal = () => setIsAddUserModalOpen(false);

  // Handle page change for pagination
  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {isloading ? (
        <div className="grid min-h-screen place-items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div>
          {/* Navbar */}
          <nav className="bg-gradient-to-r from-purple-500 to-indigo-600 p-3 md:px-20 flex justify-between items-center shadow-lg">
            <div
              className="text-lg md:text-2xl font-extrabold cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 hover:opacity-90"
              onClick={() => window.location.reload()}
            >
              NeonLogo
            </div>
            <button
              onClick={openAddUserModal}
              className="bg-gradient-to-r text-base md:text-lg  from-pink-500 to-purple-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              Add User
            </button>
          </nav>

          {/* Main Content */}
          <main className="container mx-auto p-4">
            <h1 className="text-3xl text-center font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              Users
            </h1>
            <div className="grid grid-cols-1  md:grid-cols-2 gap-4 lg:grid-cols-5 ">
              {users.length > 0 ? (
                users.map((user) => (
                  <PeopleCard
                    key={user._id}
                    user={user}
                    className="bg-gray-800 bg-opacity-60 border border-purple-500 rounded-lg p-4 shadow-lg hover:bg-gray-700 transition"
                  />
                ))
              ) : (
                <p className="text-gray-400 text-center">No users found.</p>
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={handlePreviousPage}
                disabled={page === 1}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-2 px-5 rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-2 px-5 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                Next
              </button>
            </div>
          </main>

          {/* Add User Modal */}
          {isAddUserModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-md">
              <div className="bg-gray-800 text-white rounded-xl w-full max-w-md  ">
                <AddUser onClose={closeAddUserModal} onUserAdded={fetchUsers} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
