import React from "react";
import { useGlobalContext } from "../context/AppContext";
import { Typography } from "@mui/material";
import NoteLists from "./notes/NoteLists";

const PinnedNotes = () => {
  const { pinnedNotes } = useGlobalContext();

  return (
    pinnedNotes?.length > 0 && (
      <div className="mb-5">
        <Typography fontSize={14} mb={-3}>Pinned</Typography>
        <NoteLists notes={pinnedNotes} fromNotes={true} fromArchive={true} />
      </div>
    )
  );
};

export default PinnedNotes;
