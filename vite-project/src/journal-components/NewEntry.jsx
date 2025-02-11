// This file is responsible for allowing the user to create a new entry

// changes to be made later: fix error handling to be more specific!!!!!!

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewEntry = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newJournalEntry = { title, content, imageUrl };
    try {
      const response = await fetch("api/user/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJournalEntry),
      });
      if (response.ok) {
        navigate("/journals");
      } else {
        console.error("Unable to create journal entry", response);
      }
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
        <button type="submit">Create Journal Entry</button>
      </form>
    </>
  );
};

export default NewEntry;
