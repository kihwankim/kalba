/* React */
import React, { useState } from 'react';

/* Styled */
import styled from 'styled-components';

/* Sub Components */
import Categories from '../../components/Categories/Category';
import UserList from '../../components/UserList';
import html2canvas from 'html2canvas';
import XLSX from 'xlsx';
import { isMobile } from "../../tools/tools";
import { getPromotionDate, getLeagueStartDate, calRemainTime, getRemainTime, useInterval } from '../../tools/tools';

const Container = styled.div`
  padding-top: 1.5rem;
  .print_to_pdf {
    display: flex;
    height: auto;
    margin-top: 1rem;
    justify-content: space-around;
    width:100%;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 1.5rem;
`;
const Button = styled.div`
    margin: 0 5px; 
    background-color: ${props => props.image ? '#e74c3d' : '#1aab8a'};
    color: #fff;
    cursor: pointer;
    position: relative;
    width: 200px;
    height: 60px;
    line-height: 60px;
    font-size: 1.2em;
    transition:8 00ms ease all;
    outline: none;
    text-align: center;
    
    button {
      all: unset;
    }

    &:hover  {
      background: #fff;
      color: ${props => props.image ? '#e74c3d' : '#1aab8a'};
    }
    &:before,&:after {
      content:'';
      position: absolute;
      top: 0;
      right: 0;
      height: 2px;
      width: 0;
      background: ${props => props.image ? '#e74c3d' : '#1aab8a'};
      transition: 400ms ease all;
    }
    &:after{
      right: inherit;
      top: inherit;
      left: 0;
      bottom: 0;
    }
    &:hover:before,&:hover:after{
      width: 100%;
      transition: 800ms ease all;
    }
    
    .text {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
`

const CountDown = styled.div`
  height: auto !important;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  position: relative !important;
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }

  background-color: ${({ theme }) => theme.bgColors.category};
  font-size: 18px;
  padding: 15px;
  border: ${({ theme }) => theme.borderColors.category};
  border-top-width: 0px;
`

const items = [
  { name: 'score', text: '공격력' },
  { name: 'donations', text: '지원량' }
];

const saveBoard = () => {
  const target = document.getElementById('save-target')
  window.scrollTo(0, 0);
  let moveX = isMobile() ? 0 : -8;
  html2canvas(target, { scrollX: moveX }).then(canvas => {
    download(canvas.toDataURL(), "ranking_list.png");
  });
};

const download = (url, fileName) => {
  if (isMobile()) {
    loadImageInThisPage(url, fileName);
  } else {
    downloadURL(url, fileName);
  }
};

const loadImageInThisPage = (url, fileName) => {
  document.write("<html><body>");
  document.write("<a href=''><img src='" + url + "' alt = '" + fileName + "'></a>");
  document.write("</body><html>");
  if (window.localStorage.getItem("isAlertOn") !== "true") {
    window.setTimeout(function () {
      if (window.confirm("사진을 꾹 눌러 저장하세요.\n사진을 누르면 이전 페이지로 돌아갑니다.\n\n알림을 다시 보지 않으시겠습니까?")) {
        window.localStorage.setItem("isAlertOn", "true");
      }
    }, 1);
  }
}

const downloadURL = (url, fileName) => {
  const link = document.createElement("a")
  link.download = fileName;
  link.href = url;
  document.body.appendChild(link);
  link.click();
}

const Count = () => {
  const current = new Date();
  let [promotionTime, setPromotionTime] = useState(calRemainTime(current, getPromotionDate(current)));
  let [leagueTime, setLeagueTime] = useState(calRemainTime(current, getLeagueStartDate(current)));

  useInterval(() => {
    const current = new Date();
    setPromotionTime(calRemainTime(current, getPromotionDate(current)));
    setLeagueTime(calRemainTime(current, getLeagueStartDate(current)));
  }, 1000);

  return <div>
    <div className='league'>
      <span>승강전 : {(promotionTime != null)?getRemainTime(promotionTime):"wait.."}</span>
    </div>
    <div className='promotion'>
      <span>리그전 : {(leagueTime != null)?getRemainTime(leagueTime):"wait.."}</span>
    </div>
  </div>
}

const LeaderBoards = ({ match }) => {
  const type = match.params.category || 'score';
  return (
    <Container>
      <Categories items={items} type="leaderboards" any="score" />
      <CountDown>
        {Count()}
      </CountDown>
      <div>
        <UserList type={type} />
      </div>
      <ButtonWrap>
        <Button
          image
          className="downloadBtn"
          onClick={saveBoard}
        >
          <div className="text">
            Download PNG
          </div>
        </Button>
        <Button onClick={extractTableToXLSX}>Download XLSX</Button>
      </ButtonWrap>
    </Container>
  );
}

const extractTableToXLSX = () => {
  let target = document.getElementById('save-target').cloneNode(true);
  let spanArr = target.querySelectorAll("span");
  for (let i = 0; i < spanArr.length; i++) {
    spanArr[i].innerText = '';
  }
  let wb = XLSX.utils.table_to_book(target, { sheet: "ranking list", raw: true });
  XLSX.writeFile(wb, ('ranking_list.xlsx'));
}

export default LeaderBoards;