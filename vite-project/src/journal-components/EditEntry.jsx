// this file allows users to edit a specific journal entry and delete if they wish (delete in another file but connected)

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DeleteEntry from "./DeleteEntry";

const EditEntry = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await fetch(`/api/user/journal/${id}`);
        if (!response.ok) {
          throw new Error("Unable to fetch entry");
        }
        const data = await response.json();
        setEntry(data);
        setTitle(data.title);
        setContent(data.content);
        setImageUrl(data.imageUrl || "");
      } catch (error) {
        console.error(error);
      }
    };
    fetchEntry();
  }, [id]);
  const handleSave = async (event) => {
    event.preventDefault();
    const modifiedEntry = { title, content, imageUrl };
    try {
      const response = await fetch(`/api/user/journal/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modifiedEntry),
      });
      if (response.ok) {
        alert("Journal entry updated");
        navigate("/journals");
      } else {
        alert("Could not update entry, please try again later");
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (!entry) {
    return <p>No such entry found.</p>;
  }
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
        <button type="submit">Save</button>
      </form>

      <DeleteEntry id={id} navigate={navigate} />
    </div>
  );
};
export default EditEntry;
