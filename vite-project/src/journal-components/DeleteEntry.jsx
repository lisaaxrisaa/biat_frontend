import React from "react";
import { useDeleteEntryMutation } from "../store/journalSlice";
import "./journal-delete.css";


const DeleteEntry = ({ id, navigate }) => {
  const [deleteEntry, { isLoading, error }] = useDeleteEntryMutation();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you would like to delete this entry?"
    );
    if (!confirmed) return;
    try {
      console.log("Delete button clicked");
      await deleteEntry(id).unwrap();
      alert("Entry successfully deleted!");
      navigate("/journals");
    } catch (error) {
      console.error("Unable to delete entry, due to: ", error);
      alert("Error deleting entry.");
    }
  };

  return (
    <div className="journal-delete">
        <button
          className="delete-entry"
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? "Deleting Entry..." : "Delete"}
        </button>
        {error && <p>{error.message}</p>}
      </div>
    
  );
};

export default DeleteEntry;
