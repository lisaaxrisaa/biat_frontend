// This file will be responsible for rendering a specific journal entry
// and also redirecting users to edit entry page

// isEditing variable: shows view only and if it is being modified
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const JournalEntry = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await fetch(`api/profile/journal/${id}`);
        const data = await response.json();
        setEntry(data);
      } catch (error) {
        console.error("Could not fetch entry", error);
      }
    };
    fetchEntry();
  }, [id]);
  if (!entry) return <p>No Entry found.</p>;
  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  //   FIX THE RETURN CONTENT!!!!
  return (
    <>
      <h2>{entry.title}</h2>
      <p>{entry.content}</p>
      {entry.imageUrl && <img src={entry.imageUrl} alt="EntryImage" />}
      <div>
        <button onClick={handleEdit}>Edit</button>
      </div>
    </>
  );
};
export default JournalEntry;
