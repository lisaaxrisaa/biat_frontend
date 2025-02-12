// This file will be responsible for rendering a specific journal entry
// and also redirecting users to edit entry page

// isEditing variable: shows view only and if it is being modified
import React, { useState, useEffect } from "react";
import JournalList from "./JournalList";
import { useParams, Link } from "react-router-dom";

const JournalEntry = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await fetch(`/api/user/journal/${id}`);
        if (!response.ok) {
          throw new Error("Could not load entry.");
        }
        const data = await response.json();
        setEntry(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchEntry();
  }, [id]);
  if (!entry) return <p>No Entry found.</p>;
  const handleEdit = () => {};

  //   FIX THE RETURN CONTENT!!!!
  return (
    <>
      <h2>{entry.title}</h2>
      <p>{entry.content}</p>
      {entry.imageUrl && <img src={entry.imageUrl} alt="EntryImage" />}
      <div>
        <Link to={`/edit-entry/${id}`}></Link>
        <button onClick={handleEdit}>Edit</button>
      </div>
    </>
  );
};
export default JournalEntry;
