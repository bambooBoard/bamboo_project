import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap'
import { MdRateReview } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { reviewListDB } from '../../service/marketLogic';
import {  ParentContainer, ReviewUI, RSelectBlock, SelectBlock, Star } from '../../styles/MarketStyle';
import Pagination from '../include/Pagination';

import ReviewRow from './ReviewRow';

const MarketReview = ({mno}) => {
  //마켓글의 리뷰갯수
  let [rcount,setRcount]=useState(0);
  
  // 리프레쉬용 변수
  const [start, setStart] = useState()

/*
  //리뷰하나의 별점 
  const star=0;
  // 별 스타일
  const ratingToPercent = {
    width: `${(star / 5) * 100}%`,
  };*/

  //마켓글 별점 배열
  const [rstar, setRstar]=useState([{}]);
  console.log("별점배열 : "+ rstar);//undefined

  const [avgStar, setAvgStar]=useState(0);
  console.log("평균별점 바깥"+avgStar);

  //평균 star rating percentage 계산 후 style로 반영
    const ratingToPercentAvg = {
      width: `${(avgStar / 5) * 100}%`,   
    };

  //필터선택
  let [filter,setFilter]=useState('high');
  console.log(filter)

  const handleFilter=(select)=>{
    setFilter(select.target.value)
  }
  

  /* 리뷰내용 가져오기 */
  //리뷰 배열
  const [reviews, setReviews]=useState([{}])
  useEffect(()=>{
    const reviewList=async()=>{
      let market = {}
      let starList=[]
      
      // DB로 보내는 조건 
      market = {
        market_no: mno ,
        sort:filter
      }
      const res = await reviewListDB(market)
      console.log(res.data)
      const list = []
      const datas = res.data
      //datas가 배열이다. 안에 객체있음. forEach로 돌려야된다...item으로 쪼갠다. 그안에 데이터있음
      datas.forEach((item) => {
      // DB에서 받은 데이터
      //like_no=market_no
      //like_group=review_no
      const obj = {
        review_no: item.REVIEW_NO,
        market_no: item.MARKET_NO,
        user_nickname: item.USER_NICKNAME,
        review_star: item.REVIEW_STAR,
        review_content: item.REVIEW_CONTENT,
        review_date  : item.REVIEW_DATE,
        like_count: item.LIKE_COUNT,
        review_count:item.REVIEW_COUNT,
        avg_review_star:item.AVG_REVIEW_STAR
      }
      list.push(obj)
      starList.push(item.REVIEW_STAR);
    })
    setReviews(list)
    setRcount(datas[0].REVIEW_COUNT)
    setRstar(datas[0].REVIEW_STAR)
    setAvgStar(datas[0].AVG_REVIEW_STAR)
    console.log(list);
    console.log("리뷰갯수 =>"+rcount);
    console.log("별점평균 :"+avgStar);
  }
  reviewList()
},[mno, filter, rcount, start])
console.log(reviews);


  // 페이지넘기기-pagination
  const [limit, setLimit]= useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;


  return (
    <>

      <ReviewUI>
        <div className='reviewheader'>
          <h5 style={{fontWeight:'bold'}}>
            <MdRateReview size='30' color='#4996F3'/>
            &nbsp;&nbsp;리뷰&nbsp;{rcount}</h5>
          &nbsp;&nbsp;
          {/* 평균별점 */}
          <Star>
              <div className="star_rating">
                <div className="star_rating_fill" style={ratingToPercentAvg}>
                  
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <div className="star_rating_base">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>
          </Star>
          <ParentContainer>
          <SelectBlock defaultValue="high" onChange={handleFilter}>
            <option key="1" value="new">
              최신순
            </option>
            <option key="2" value="like">
              좋아요순
            </option>
            <option key="3" value="high">
              별점높은순
            </option>
            <option key="4" value="low">
              별점낮은순
            </option>
            
          </SelectBlock>
          </ParentContainer>
        </div>
          
       {/* 리뷰 리스트  */}
         <ul>{reviews&&//데이터가 한건도 없는 경우를 고려
              reviews.slice(offset, offset + limit).map((review)=>(
                <ReviewRow key={review.review_no} review={review} start={start} setStart={setStart}/>
              ))
          }
          </ul>

        <Pagination total={reviews.length} limit={limit} page={page} setPage={setPage} />
      </ReviewUI>
    </>
  )
}


export default MarketReview
