import React from "react";
import { useGlobalContext } from "../context/AppContext";
import { Box, Container, Typography } from "@mui/material";
import NoteLists from "../components/notes/NoteLists";
import styled from "@emotion/styled";

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const ArchivedNotes = () => {
  const { archivedNotes } = useGlobalContext();

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <DrawerHeader />
        <Typography fontSize={32} mb={-3} fontWeight="bold">
          Archived Notes
        </Typography>
        <NoteLists notes={archivedNotes} fromArchive={true} />
      </Box>
    </Container>
  );
};

export default ArchivedNotes;
