// This file will be responsible for rendering a specific journal entry
// and also redirecting users to edit entry page

// isEditing variable: shows view only and if it is being modified
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetJournalQuery } from "../store/journalSlice";
import "./journal-entry.css";

const JournalEntry = () => {
  const { id } = useParams();
  const { data: entry, error, isLoading } = useGetJournalQuery(id);

  useEffect(() => {
    document.body.classList.add("journal-page");

    return () => {
      document.body.classList.remove("journal-page");
    };
  }, []);

  if (isLoading) return <p>Loading Entry...</p>;
  if (error) return <p>{error.message}</p>;
  if (!entry) return <p>No Such Entry.</p>;

  const formattedCreatedDate = new Date(entry.createdAt).toLocaleDateString();
  const formattedUpdatedDate = new Date(entry.updatedAt).toLocaleDateString();

  return (
    <div>
      <Link to="/journals">
      <button>Back to Journals</button></Link>
    <div className="journal-background">
      <div className="individual-entry-box">
        <h2>{entry.title}</h2>

        <div className="dates-container">
          <p>
            <strong>Created on:</strong> {formattedCreatedDate}
          </p>
          <p>
            <strong>Last Updated on:</strong> {formattedUpdatedDate}
          </p>
        </div>

        <Link to={`/edit-entry/${id}`}>
          <button className="edit-button">Edit</button>
        </Link>

        <p>{entry.content}</p>
        {entry.imageUrl && <img src={entry.imageUrl} alt="EntryImage" />}
      </div>
    </div>
    </div>
  );
};
export default JournalEntry;
