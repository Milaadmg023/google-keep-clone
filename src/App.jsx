import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import SideDrawer from "./components/SideDrawer";
import Notes from "./pages/Notes";
import { AppContext } from "./context/AppContext";
import ArchivedNotes from "./pages/ArchivedNotes";
import TrashedNotes from "./pages/TrashedNotes";

function App() {
  const theme = createTheme({
    typography: { fontFamily: "DM Sans" },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppContext>
          <SideDrawer />
          <Routes>
            <Route path="/" element={<Notes />} />
            <Route path="/archivedNotes" element={<ArchivedNotes />} />
            <Route path="/trashedNotes" element={<TrashedNotes />} />
          </Routes>
        </AppContext>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
