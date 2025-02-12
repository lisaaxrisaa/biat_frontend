// this file fetches entries from backend
import React, { useState, useEffect } from "react";
// removed unnecessary journalentry import
import { Link } from "react-router-dom";

const JournalList = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //   gets and renders a list of the users journal entries
  useEffect(() => {
    const getEntries = async () => {
      try {
        const response = await fetch("/user/journal", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Unable to fetch entries");
        }
        const data = await response.json();
        setJournalEntries(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    getEntries();
  }, []);

  const renderEntries = () => {
    if (journalEntries.length === 0) {
      return (
        <div>
          <p>No entries.</p>

          <Link to="/create-journal-entry">
            <button>Create New Journal Entry</button>
          </Link>
        </div>
      );
    } else {
      return journalEntries.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.title}</h3>
          <p>{entry.content}</p>
          {/* Add other journal entry details if needed */}
        </div>
      ));
    }
  };

  return (
    <div>
      <h2>Your Journal Entries</h2>
      {isLoading ? <p>Loading...</p> : renderEntries()}
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default JournalList;
