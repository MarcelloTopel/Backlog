// AddTaskButton.js
import React from 'react';

const AddTaskButton = ({ onAddTask }) => {
  return (
    <button onClick={onAddTask} style={{ marginBottom: '10px' }}>
      Adicionar Tarefa
    </button>
  );
};

export default AddTaskButton;
