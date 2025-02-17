// This file is responsible for allowing the user to create a new entry

// changes to be made later: fix error handling to be more specific!!!!!!

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateEntryMutation } from "../store/journalSlice";

const NewEntry = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const [createEntry, { isLoading, error }] = useCreateEntryMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newJournalEntry = { title, content, imageUrl };
    try {
      await createEntry(newJournalEntry).unwrap();
      navigate("/journals");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>Create a New Entry</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="title"
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating Entry..." : "Create Journal Entry"}
        </button>
      </form>
      {error && <p>{error.message}</p>}
    </>
  );
};

export default NewEntry;
