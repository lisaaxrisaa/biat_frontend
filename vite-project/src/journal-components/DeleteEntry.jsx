import React from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteEntryMutation } from "../store/journalSlice";
const DeleteEntry = ({ id }) => {
  const navigate = useNavigate();
  const [deleteEntry, { isLoading, error }] = useDeleteEntryMutation;
  const handleDelete = async () => {
    try {
      await deleteEntry(id).unwrap();
      alert("Entry successfully deleted!");
      navigate("/journals");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <button onClick={handleDelete} disabled={isLoading}>
        {isLoading ? "Deleting Entry..." : "Delete"}
      </button>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default DeleteEntry;
