import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { heroes, pets, troops, spells, siegeMachines } from './data'

const Container = styled.div`
  display: flex;  
  height: auto;
  margin-top: 1rem;
  justify-content: space-around;
  width:100%;
  
  .tableBlock {
    padding-bottom: 3rem;
    width: 100%;

    @media (min-width: 576px) {
      max-width: 540px;
    }
    @media (min-width: 768px) {
      max-width: 720px;
    }
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }

  .head tr th {
    position: sticky;
    top: 0;
    font-weight: normal;
    color: ${({ theme }) => theme.fontColors.listHeader};
    font-size: 14px;
    padding: 12px 16px;
    background-color: ${({ theme }) => theme.bgColors.listSecondHeader};

    @media (max-width: 425px) {
      padding: 12px 12px;
    }
    @media (max-width: 385px) {
      font-size: 12px;
      padding: 12px 8px;
    }
  }

  th,
  td {
    padding: 0.5rem;
  }
  tbody {
    background-color: ${({ theme }) => theme.bgColors.listContents};
  }
  tbody tr td {
    border-bottom: ${({ theme }) => theme.borderColors.list};
    font-size: 14px;
    padding: 12px 16px;
    text-align: center;

    color: ${({ theme }) => theme.fontColors.listInfo};
  }

  tbody tr .name {
    width: 40%;

    color: ${({ theme }) => theme.fontColors.listName};
  }
`

const StandardList = (props) => {
  const [data, setData] = useState(heroes);
  const category = props.category;

  useEffect(() => {
    if (category === 'heroes') {
      setData(heroes);
    } else if (category === 'pets') {
      setData(pets);
    } else if (category === 'troops') {
      setData(troops);
    } else if (category === 'spells') {
      setData(spells);
    } else if (category === 'siegeMachines') {
      setData(siegeMachines);
    }
  }, [category])

  const set = data.map((arr, idx) =>
    <tr className="type spells" key={idx}>
      {arr.map((value, num) => {
        if (num === 0) {
          return <td key={idx * value + num} className="type name">{value}</td>
        } else if (num === 3) {
          return <td key={idx * value + num} className="type">{Math.ceil(value * 1000) / 1000}</td>
        }
        else {
          return <td key={idx * value + num}>{value}</td>
        }
      })}
    </tr>);

  return (
    <Container>
      <div className="tableBlock">
        <table className="apStandardTable">
          <thead className="head">
            <tr>
              <th className="type">종류</th>
              <th className="weight">최대 점수</th>
              <th className="maxScore">최대 레벨</th>
              <th className="maxLevel last">비례 점수</th>
            </tr>
          </thead>
          <tbody>
            {set}
          </tbody>
        </table>
      </div >
    </Container>
  );
};

export default StandardList;