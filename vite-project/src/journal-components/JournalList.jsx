// this file fetches entries from backend
import React, { useState, useEffect } from "react";
// removed unnecessary journalentry import
import { Link,} from "react-router-dom";

const JournalList = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //   gets and renders a list of the users journal entries
  useEffect(() => {
    const getEntries = async () => {
      try {
        const response = await fetch("api/user/journal");
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
  if (isLoading) return <p>Loading Entries...</p>;
  return (
    <div>
      <h2>Journal Entries</h2>
      {error && <>{error}</>}
      <Link to="/new-entry">Create New Entry</Link>
      <div>
        {journalEntries.length === 0 ? (
          <p>No journal entries.</p>
        ) : (
          journalEntries.map((entry) => (
            <div key={entry.id}>
              <h3>{entry.title}</h3>
              <p>{entry.content}</p>
              <Link to={`/entry/${entry.id}`}>View Entry</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JournalList;
