// this file allows users to edit a specific journal entry and delete if they wish (delete in another file but connected)

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import DeleteEntry from "./DeleteEntry";
import {
  useGetJournalQuery,
  useUpdateEntryMutation,
} from "../store/journalSlice";
import "./journal-edit.css";

const EditEntry = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const { data: entry, error: fetchError, isLoading, refetch } = useGetJournalQuery(id);
  const [updateEntry, { isLoading: isUpdating, error: updateError }] =
    useUpdateEntryMutation();
  useEffect(() => {
    document.body.classList.add("journal-page");

    return () => {
      document.body.classList.remove("journal-page");
    };
  }, [id]);

  if (fetchError) return <p>{fetchError.message}</p>;

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
      setImageUrl(entry.imageUrl || "");
    }
  }, [entry]);
  const handleSave = async (event) => {
    event.preventDefault();
    const modifiedEntry = { title, content, imageUrl };
    try {
      await updateEntry({ id, updatedEntry: modifiedEntry }).unwrap();
      alert("Journal entry has been updated!");
      refetch();
      navigate(`/journal/${id}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Link to="/journals">
        <button className="back-to-journals-button">Back to Journals</button>
      </Link>
      <div className="journal-background">
        <div className="edit-entry-container">
          <h2>Edit Journal Entry</h2>

          <form onSubmit={handleSave}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Content:</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Image Url:</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <button type="submit" disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
            <DeleteEntry id={id} navigate={navigate} />
          </form>

          {updateError && (
            <p className="error-message">{updateError.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditEntry;
