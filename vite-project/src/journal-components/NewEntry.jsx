// This file is responsible for allowing the user to create a new entry

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCreateEntryMutation } from '../store/journalSlice';
import './journal-background.css';

const NewEntry = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  const [createEntry, { isLoading, error }] = useCreateEntryMutation();

  useEffect(() => {
    document.body.classList.add('journal-page');

    return () => {
      document.body.classList.remove('journal-page');
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newJournalEntry = { title, content, imageUrl };
    try {
      const result = await createEntry(newJournalEntry).unwrap();
      navigate('/journals');
      console.log('Entry has been created: ', result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Link to="/journals">
        <button>Back to Journals</button>
      </Link>
      <div className="journal-background">
        <div className="journal-content-wrapper">
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
              placeholder="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="image url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <button
              className="create-entry-button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Entry...' : 'Create Journal Entry'}
            </button>
          </form>
          {error && <p>{error.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default NewEntry;
