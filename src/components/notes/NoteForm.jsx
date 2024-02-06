import styled from "@emotion/styled";
import { Box, ClickAwayListener, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { useGlobalContext } from "../../context/AppContext";

const note = {
  title: "",
  text: "",
};

const StyledBox = styled(Box)`
  height: auto;
  width: 650px;
  max-width: 100%;
  margin: auto;
  padding: 8px;
`;

const NoteForm = () => {
  const [showTextField, setShowTextField] = useState(false);
  const [addNote, setAddNote] = useState(note);
  const { notes, setNotes } = useGlobalContext();

  const handleChange = (e) =>
    setAddNote({ ...addNote, [e.target.name]: e.target.value });

  const handleClickAway = () => {
    if (addNote.text && addNote.title) {
      setShowTextField(false);
      setNotes([{ ...addNote, id: uuid() }, ...notes]);
      setAddNote(note);
    }
  };

  const currentRef = useRef();

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <StyledBox className="shadow-sm border rounded-2" ref={currentRef}>
        {showTextField && (
          <TextField
            type="text"
            name="title"
            value={addNote.title}
            onChange={handleChange}
            placeholder="Title"
            variant="standard"
            fullWidth
            className="p-2"
            autoFocus={true}
            InputProps={{ disableUnderline: true }}
          />
        )}
        <TextField
          type="text"
          name="text"
          value={addNote.text}
          onChange={handleChange}
          placeholder="Take a note.."
          variant="standard"
          onClick={() => {
            setShowTextField(true);
            currentRef.current.style.minHeight = "100px";
          }}
          className="p-2"
          multiline
          rows={2}
          fullWidth
          InputProps={{ disableUnderline: true }}
        />
      </StyledBox>
    </ClickAwayListener>
  );
};

export default NoteForm;
