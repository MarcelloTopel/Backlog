// BacklogList.js
import React from 'react';
import styled from '@emotion/styled';
import TaskCard from '../TaskCard';

const BacklogListContainer = styled.div`
  height: 200px;  /* Altura fixa desejada */
  display: flex;
  flex-direction: column;
  background: lightblue;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
  overflow-y: auto;
`;

const BacklogList = ({ backlogItems }) => (
  <BacklogListContainer>
    {backlogItems.map((item, index) => (
      <TaskCard key={item.id} item={item} index={index} />
    ))}
  </BacklogListContainer>
);

export default BacklogList;
