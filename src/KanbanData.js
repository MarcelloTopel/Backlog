import { backlogData } from './components/BacklogData.js';


export const columnsFromBackend = {
  backlog: {
    title: 'Backlog',
    items: backlogData, // Use the imported backlogData here
  },
  inProgress: {
    title: 'In Progress',
    items: [],
  },
  todo: {
    title: 'Todo',
    items: [],
  },
  done: {
    title: 'Done',
    items: [],
  },
};