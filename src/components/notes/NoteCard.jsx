import React from "react";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";
import { Grid, Tooltip, Typography } from "@mui/material";
import Pin from "../../assets/Pin.png";
import Unpin from "../../assets/Unpin.png";
import { useGlobalContext } from "../../context/AppContext";

const NoteCard = ({ item, fromNotes, fromDelete, fromArchive }) => {
  const {
    notes,
    archivedNotes,
    trashedNotes,
    pinnedNotes,
    setNotes,
    setArchivedNotes,
    setTrashedNotes,
    setPinnedNotes,
  } = useGlobalContext();

  const findNote = (note) => pinnedNotes?.find((item) => item.id === note.id);

  const archiveNote = (note) => {
    setNotes(notes?.filter((item) => item.id !== note.id));
    setPinnedNotes(pinnedNotes?.filter((item) => item.id !== note.id));
    setArchivedNotes((prevArr) => [note, ...prevArr]);
  };

  const unarchiveNote = (note) => {
    setArchivedNotes(archivedNotes?.filter((item) => item.id !== note.id));
    setNotes((prevArr) => [note, ...prevArr]);
  };

  const trashNote = (note) => {
    if (findNote(note))
      setPinnedNotes(pinnedNotes?.filter((item) => item.id !== note.id));
    else {
      setNotes(notes?.filter((item) => item.id !== note.id));
      setArchivedNotes(archivedNotes?.filter((item) => item.id !== note.id));
    }
    setTrashedNotes((prevArr) => [note, ...prevArr]);
  };

  const permanentlyDelete = (note) => {
    setTrashedNotes(trashedNotes?.filter((item) => item.id !== note.id));
  };

  const restoreNote = (note) => {
    setTrashedNotes(trashedNotes?.filter((item) => item.id !== note.id));
    setNotes((prevArr) => [note, ...prevArr]);
  };

  const pinNote = (note) => {
    setNotes(notes?.filter((item) => item.id !== note.id));
    setArchivedNotes(archivedNotes?.filter((item) => item.id !== note.id));
    setPinnedNotes((prevArr) => [note, ...prevArr]);
  };

  const unpinNote = (note) => {
    setPinnedNotes(pinnedNotes?.filter((item) => item.id !== note.id));
    setNotes((prevArr) => [note, ...prevArr]);
  };

  return (
    <div className="shadow-sm p-3 border rounded-2 position-relative">
      <Grid container alignItems="center">
        <Grid item md={11} xs={11}>
          <Typography fontSize={26} fontWeight="bold" mb={1}>
            {item?.title}
          </Typography>
        </Grid>
        <Grid item md={1} xs={1} textAlign="end">
          {(fromNotes || fromArchive) && (
            <Tooltip title={findNote(item) ? "Unpinned Note" : "Pinned Note"}>
              <img
                src={findNote(item) ? Unpin : Pin}
                alt="pin/unpin icon"
                width={30}
                className="icon"
                onClick={() =>
                  findNote(item) ? unpinNote(item) : pinNote(item)
                }
              />
            </Tooltip>
          )}
        </Grid>
      </Grid>

      <Typography fontSize={16} mb={2} textAlign="justify">
        {item?.text}
      </Typography>

      <div className="text-end">
        {(fromNotes || fromArchive) && (
          <Tooltip title={fromNotes ? "Archive Note" : "Unarchvie Note"}>
            <ArchiveIcon
              className="icon fs-5 text-secondary me-2"
              onClick={() =>
                fromNotes ? archiveNote(item) : unarchiveNote(item)
              }
            />
          </Tooltip>
        )}
        {(fromNotes || fromArchive) && (
          <Tooltip title="Move to trash">
            <DeleteIcon
              className="icon fs-5 text-secondary"
              onClick={() => trashNote(item)}
            />
          </Tooltip>
        )}
        {fromDelete && (
          <div>
            <Tooltip title="Restore Note">
              <RestoreIcon
                className="icon fs-5 me-2 text-secondary"
                onClick={() => restoreNote(item)}
              />
            </Tooltip>
            <Tooltip title="Permanently Delete Note">
              <DeleteIcon
                className="icon fs-5 text-secondary"
                onClick={() => permanentlyDelete(item)}
              />
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
