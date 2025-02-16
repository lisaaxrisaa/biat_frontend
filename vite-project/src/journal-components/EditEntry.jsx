// this file allows users to edit a specific journal entry and delete if they wish (delete in another file but connected)

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DeleteEntry from "./DeleteEntry";
import {
  useGetJournalQuery,
  useUpdateEntryMutation,
} from "../store/journalSlice";

const EditEntry = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const { data: entry, error: fetchError, isLoading } = useGetJournalQuery(id);
  const [updateEntry, { isLoading: isUpdating, error: updateError }] =
    useUpdateEntryMutation();
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
      navigate("/journals");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h2>Edit</h2>
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
        {/* Removed div between image url and button, as it was giving errors */}
        <button type="submit" disabled={isUpdating}>
          {isUpdating ? "Saving..." : "Save"}
        </button>
      </form>

      <DeleteEntry id={id} navigate={navigate} />
    </div>
  );
};
export default EditEntry;
