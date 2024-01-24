
export const data = [
  {
    id: '1',
    Task: 'teste1',
    isFixed: true,
  },
  {
    id: '2',
    Task: 'teste2',
    isFixed: true,
  },
  {
    id: '3',
    Task: 'teste3',
    isFixed: true,
  },
  {
    id: '4',
    Task: 'teste4',
    isFixed: true,
  },
  




];

export const columnsFromBackend = {
  backlog: {
    title: 'Backlog',
    items: data,
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
