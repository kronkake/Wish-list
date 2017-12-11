import React from 'react'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import WishCard from '.././WishCard'

// using some little inline style helpers to make the app look okay
const grid = 8;
const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  margin: `0 0 ${grid}px 0`,
  cursor: isDragging ? 'grab' : 'auto',

  // change background colour if dragging
  background: isDragging ? '#BDBDBD' : 'none',

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#BDBDBD' : 'none'
});

const WishCardList = ({ onDragEnd, onDragStart, wishes, editWish, deleteWish, disableDragAndDrop }) => {
    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                    {
                        wishes.map((wish, i) => {
                            return (
                                <Draggable isDragDisabled={!disableDragAndDrop} key={wish.id} draggableId={wish.id} >
                                    {(provided, snapshot) => (
                                    <div>
                                        <div
                                            ref={provided.innerRef}
                                            style={getItemStyle(
                                                provided.draggableStyle,
                                                snapshot.isDragging
                                            )}
                                            {...provided.dragHandleProps}>
                                            <WishCard 
                                                editWish={editWish}
                                                deleteWish={deleteWish}
                                                wish={wish}
                                            />
                                        </div>
                                        {provided.placeholder}
                                    </div>
                                    )}
                                </Draggable>
                            )
                        })
                    }
                    </div>
                )}
            </Droppable>
      </DragDropContext>
    );
}
export default WishCardList;