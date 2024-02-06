import React, { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

const AppContext = ({ children }) => {
  const getLocalStorageData = () => {
    const obj = JSON.parse(localStorage.getItem("my-gk-notes")) || {};
    return {
      notes: obj.notes || [],
      archivedNotes: obj.archivedNotes || [],
      trashedNotes: obj.trashedNotes || [],
      pinnedNotes: obj.pinnedNotes || [],
    };
  };

  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [trashedNotes, setTrashedNotes] = useState([]);
  const [pinnedNotes, setPinnedNotes] = useState([]);

  useEffect(() => {
    const { notes, archivedNotes, trashedNotes, pinnedNotes } = getLocalStorageData();
    setNotes(notes);
    setArchivedNotes(archivedNotes);
    setTrashedNotes(trashedNotes);
    setPinnedNotes(pinnedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "my-gk-notes",
      JSON.stringify({ notes, archivedNotes, trashedNotes, pinnedNotes })
    );
  }, [notes, archivedNotes, trashedNotes, pinnedNotes]);

  return (
    <Context.Provider
      value={{
        notes,
        archivedNotes,
        trashedNotes,
        pinnedNotes,
        setNotes,
        setArchivedNotes,
        setTrashedNotes,
        setPinnedNotes,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useGlobalContext = () => useContext(Context);
export { AppContext, useGlobalContext };