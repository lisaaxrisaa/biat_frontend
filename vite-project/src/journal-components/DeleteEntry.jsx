import React from "react";
import { useNavigate } from "react-router-dom";
// ask about prop validation!!!

const DeleteEntry = ({ id }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/user/journal/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Entry deleted.");
        navigate("/journals");
      } else {
        alert("Unable to delete entry, please try again later.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteEntry;
