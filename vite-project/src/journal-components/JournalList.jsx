import React, { useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { useGetJournalsQuery } from '../store/journalSlice';
import DeleteEntry from './DeleteEntry';
import './journal-background.css';

const JournalList = () => {
  const {
    data: journalEntries,
    error,
    isLoading,
    refetch,
  } = useGetJournalsQuery();

  useEffect(() => {
    document.body.classList.add('journal-page');
    return () => {
      document.body.classList.remove('journal-page');
    };
  }, []);

  const location = useLocation();
  useEffect(() => {
    refetch();
  }, [location, refetch]);

  const renderEntries = () => {
    if (!journalEntries || journalEntries.length === 0) {
      return (
        <div>
          <p>No entries.</p>
        </div>
      );
    }
    if (journalEntries && journalEntries.length > 0) {
      return journalEntries.map((entry) => (
        <div key={entry.id} className="journal-entry-box">
          <h3>{entry.title}</h3>

          <Link to={`/journal/${entry.id}`}>
            <button className="view-button">View Entry</button>
          </Link>
        </div>
      ));
    } else {
      return (
        <div>
          <p>No entries.</p>
          <Link to="/create-journal-entry">
            <button>Create a New Entry</button>
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="journal-background">
      <div className="journal-content-wrapper">
        <h2>Your Journal Entries</h2>

        <Link to="/create-journal-entry">
          <button className="create-entry-button">
            Create New Journal Entry
          </button>
        </Link>
        {isLoading ? <p>Loading...</p> : renderEntries()}
        {error && <p>{error.message}</p>}
      </div>
    </div>
  );
};

export default JournalList;
