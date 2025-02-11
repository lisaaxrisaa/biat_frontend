// this file fetches entries from backend
import React, { useState, useEffect } from "react";
import JournalEntry from "./JournalEntry";

const JournalList = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [error, setError] = useState(null);
  //   the following stores entries and gets a list of journal entries
  useEffect(() => {
    const getEntries = async () => {
      try {
        const response = await fetch("/profile/journal", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();

          if (data.length === 0) {
            setError("No journal entries have been made.");
          } else {
            setJournalEntries(data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    getEntries();
  }, []);
  return (
    <>
      <h2>Journal Entries</h2>
      {error && <>{error}</>}
      {journalEntries.map((entry) => (
        <JournalEntry key={entry.id} entry={entry} />
      ))}
    </>
  );
};

export default JournalList;
