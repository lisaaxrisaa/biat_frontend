import React from "react";
import { useDeleteEntryMutation } from "../store/journalSlice";

const DeleteEntry = ({ id, navigate }) => {
  const [deleteEntry, { isLoading, error }] = useDeleteEntryMutation();

  const handleDelete = async () => {
    try {
        console.log("Delete button clicked")
      await deleteEntry(id).unwrap();
      alert("Entry successfully deleted!");
      navigate("/journals");
    } catch (error) {
      console.error("Unable to delete entry, due to: ", error);
      alert("Error deleting entry.");
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
