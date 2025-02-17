// this file fetches entries from backend
import React from "react";
// removed unnecessary journalentry import
import { Link } from "react-router-dom";
import { useGetJournalsQuery } from "../store/journalSlice";
import DeleteEntry from "./DeleteEntry";

const JournalList = () => {
  const {
    data: journalEntries,
    error,
    isLoading,
    refetch,
  } = useGetJournalsQuery();
  //   gets and renders a list of the users journal entries

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
        <div key={entry.id}>
          <h3>{entry.title}</h3>
          <p>{entry.content}</p>
          {/* Add other journal entry details if needed */}
          <Link to={`/journal/${entry.id}`}>
            <button>View Entry</button>
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
    <div>
      <h2>Your Journal Entries</h2>
      {isLoading ? <p>Loading...</p> : renderEntries()}
      {error && <p>{error.message}</p>}

      <Link to="/create-journal-entry">
        <button>Create New Journal Entry</button>
      </Link>
    </div>
  );
};

export default JournalList;
