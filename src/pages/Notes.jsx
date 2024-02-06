import { Box, Container, Typography } from "@mui/material";
import React from "react";
import NoteForm from "../components/notes/NoteForm";
import NoteLists from "../components/notes/NoteLists";
import { useGlobalContext } from "../context/AppContext";
import styled from "@emotion/styled";
import PinnedNotes from "../components/PinnedNotes";

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Notes = () => {
  const { notes } = useGlobalContext();

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <DrawerHeader />
        <NoteForm />
        <PinnedNotes />
        <>
          <Typography fontSize={16} mt={2} mb={-3}>Others</Typography>
          <NoteLists notes={notes} fromNotes={true} />
        </>
      </Box>
    </Container>
  );
};

export default Notes;
