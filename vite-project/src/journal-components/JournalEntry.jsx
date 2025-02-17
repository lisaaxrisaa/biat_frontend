// This file will be responsible for rendering a specific journal entry
// and also redirecting users to edit entry page

// isEditing variable: shows view only and if it is being modified
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetJournalQuery } from "../store/journalSlice";
import "./journal-background.css";

const JournalEntry = () => {
  const { id } = useParams();
  const { data: entry, error, isLoading } = useGetJournalQuery(id);

  console.log(entry);

  if (isLoading) return <p>Loading Entry...</p>;
  if (error) return <p>{error.message}</p>;
  if (!entry) return <p>No Such Entry.</p>;

  //   FIX THE RETURN CONTENT!!!!
  return (
    <div className="journal-background">
      <div className="journal-entry-box">
        <h2>{entry.title}</h2>
        <p>{entry.content}</p>
        {entry.imageUrl && <img src={entry.imageUrl} alt="EntryImage" />}
        <div>
          <Link to={`/edit-entry/${id}`}>
            <button className="create-entry-button">Edit</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default JournalEntry;
