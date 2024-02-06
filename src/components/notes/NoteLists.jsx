import React from "react";
import { Grid, Typography } from "@mui/material";
import NoteCard from "./NoteCard";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGlobalContext } from "../../context/AppContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const NoteLists = ({ notes, fromNotes, fromArchive, fromDelete }) => {
  const { setNotes, setArchivedNotes, setTrashedNotes } = useGlobalContext();

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(notes, result.source.index, result.destination.index);
    console.log(items);
    fromNotes
      ? setNotes(items)
      : fromArchive
      ? setArchivedNotes(items)
      : setTrashedNotes(items);
  };

  return notes?.length > 0 ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <Grid
            container
            ref={provided.innerRef}
            {...provided.droppableProps}
            columnSpacing={2}
            rowSpacing={4}
            mt={2}
          >
            {notes?.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <Grid
                    item
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    key={item.id}
                  >
                    <NoteCard
                      item={item}
                      fromNotes={fromNotes}
                      fromArchive={fromArchive}
                      fromDelete={fromDelete}
                    />
                  </Grid>
                )}
              </Draggable>
            ))}
          </Grid>
        )}
      </Droppable>
    </DragDropContext>
  ) : (
    <div className="d-flex align-items-center justify-content-center w-100 no-div">
      {fromArchive ? (
        <ArchiveIcon sx={{ fontSize: "8rem" }} className="text-secondary" />
      ) : fromDelete ? (
        <DeleteIcon sx={{ fontSize: "8rem" }} className="text-secondary" />
      ) : (
        <LightbulbIcon sx={{ fontSize: "8rem" }} className="text-secondary" />
      )}
      <Typography fontSize={38} color="GrayText" p={2}>
        {fromArchive
          ? "Your archived notes appear here"
          : fromDelete
          ? "No notes in Trash"
          : "Notes you add appear here"}
      </Typography>
    </div>
  );
};

export default NoteLists;
