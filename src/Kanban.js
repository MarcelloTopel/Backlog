import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Container from './components/Container';
import TaskColumnStyles from './components/TaskColumnStyles';
import TaskList from './components/TaskList';
import Title from './components/Title';
import TaskCard from './TaskCard';
import AddTaskButton from './components/AddTaskButton';
import { columnsFromBackend } from './KanbanData';

const Backlog = ({ backlogColumn }) => (
  <Droppable key={backlogColumn.id} droppableId={backlogColumn.id}>
    {(provided, snapshot) => (
      <TaskList ref={provided.innerRef} {...provided.droppableProps}>
        <Title>{backlogColumn.title}</Title>
        {backlogColumn.items.map((item, index) => (
          <TaskCard key={item.id} item={item} index={index} />
        ))}
        {provided.placeholder}
      </TaskList>
    )}
  </Droppable>
);

const Kanban = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const isBacklogColumn = source.droppableId === 'backlog' || destination.droppableId === 'backlog';

    if (isBacklogColumn) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns((prevColumns) => ({
        ...prevColumns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      }));
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns((prevColumns) => ({
        ...prevColumns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      }));
    }
  };

  const addTask = (columnId) => {
    if (columnId === 'backlog') {
      return;
    }

    const newTask = {
      id: String(Math.random()),
      Task: `Nova Tarefa`,
      isFixed: false,
    };

    setColumns((prevColumns) => ({
      ...prevColumns,
      [columnId]: {
        ...prevColumns[columnId],
        items: [...prevColumns[columnId].items, newTask],
      },
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <AddTaskButton onAddTask={() => addTask('inProgress')} />
          <AddTaskButton onAddTask={() => addTask('todo')} />
          <AddTaskButton onAddTask={() => addTask('done')} />
        </div>
        <TaskColumnStyles>
          {Object.entries(columns).map(([columnId, column], index) => {
            if (columnId === 'backlog') {
              // Use the Backlog component here
              return <Backlog key={columnId} backlogColumn={column} />;
            }
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                    <Title>{column.title}</Title>
                    {column.items.map((item, index) => (
                      <TaskCard key={item.id} item={item} index={index} />
                    ))}
                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable>
            );
          })}
        </TaskColumnStyles>
      </Container>
    </DragDropContext>
  );
};

export default Kanban;