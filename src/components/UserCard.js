import React from "react";

const UserCard = ({ user, loggedInUserRole, onDelete }) => {
  // Function to handle deletion
  const handleDelete = () => {
    // Check if the logged-in user is a super admin
    if (loggedInUserRole === "superadmin") {
      // If the logged-in user is a super admin, allow deletion
      onDelete(user.id);
    } else {
      // If the logged-in user is not a super admin, show a pop-up message
      alert("You are not authorized to delete this user.");
    }
  };

  // Generate a random gender
  const gender = Math.random() < 0.7 ? "men" : "women";

  // Generate a random number between 0 and 50
  const randomNumber = Math.floor(Math.random() * 51);

  // Construct the image URL
  const imageUrl = user.profileImage
    ? user.profileImage
    : `https://randomuser.me/api/portraits/${gender}/${randomNumber}.jpg`;

  return (
    <div className="bg-white border border-gray-300 p-4 rounded shadow-md">
      <div className="mb-4">
        <img
          src={imageUrl}
          alt="Preview"
          className="rounded-full h-24 w-24 mx-auto"
        />
      </div>
      <h3 className="text-lg font-semibold">User ID: {user.id}</h3>
      <p className="text-gray-600">{user.role}</p>
      <p className="text-gray-600">{user.email}</p>
      {/* Render delete button only for super admin */}

      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default UserCard;


