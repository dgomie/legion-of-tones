import { useState } from 'react';
import { Container, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialItems = [
  { name: 'Member 1', image: 'path/to/image1.jpg' },
  { name: 'Member 2', image: 'path/to/image2.jpg' },
  { name: 'Member 3', image: 'path/to/image3.jpg' },
  { name: 'Member 4', image: 'path/to/image4.jpg' },
  { name: 'Member 5', image: 'path/to/image5.jpg' },
  { name: 'Member 6', image: 'path/to/image1.jpg' },
  { name: 'Member 7', image: 'path/to/image2.jpg' },
  { name: 'Member 8', image: 'path/to/image3.jpg' },
  { name: 'Member 9', image: 'path/to/image4.jpg' },
  { name: 'Member 10', image: 'path/to/image5.jpg' }
];

const calculatePoints = (items) => {
  const totalMembers = items.length;
  const points = {};

  items.forEach((item, index) => {
    points[item.name] = totalMembers - index;
  });

  return points;
};

const VoteComponent = () => {
  const [items, setItems] = useState(initialItems);
  const [points, setPoints] = useState(calculatePoints(initialItems));

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setItems(reorderedItems);
    setPoints(calculatePoints(reorderedItems));
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef} sx={{ backgroundColor: '#f7f7f7', padding: '10px', borderRadius: '8px', width: '100%', maxWidth: '400px' }}>
              {items.map((item, index) => (
                <Draggable key={item.name} draggableId={item.name} index={index}>
                  {(provided) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{ marginBottom: '8px', backgroundColor: '#d7bcfd', borderRadius: '4px', '&:hover': { backgroundColor: '#c5a3f7' } }}
                    >
                      <ListItemAvatar sx={{mr: 2}}>
                        <img src='https://i.ytimg.com/vi/nU8JvMTLuMY/default.jpg' />
                      </ListItemAvatar>
                      <ListItemText primary={`${item.name} - Points: ${points[item.name]}`} />
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};

export default VoteComponent;


// Youtube thumbnail
// https://i.ytimg.com/vi/nU8JvMTLuMY/hqdefault.jpg