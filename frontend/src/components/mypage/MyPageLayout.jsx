// import React from 'react'
// import { AContentSection, AdminCategory, AdminCategoryLi, AdminCategoryUl, AdminPageUl, AdminSection, QnaCategory, ReportUl } from '../../styles/AdminStyle'
// import { aBanCategories, aMarketCategories, adminCategories } from './adminData';
// import { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useCallback } from 'react';
// import { useEffect } from 'react';
// import AdminQnaRow from './AdminQnaRow';
// import AdminReportRow from './AdminReportRow';
// import AdminResignRow from './AdminResignRow';
// import { AiFillPlusSquare } from 'react-icons/ai';
// import { Nav, Table } from "react-bootstrap";
// import Pagination from '../include/Pagination';
// import AdminBanList from './AdminBanList';
// import AdminOrderRow from './AdminOrderRow';

// const MyPageLayout = () => {
//   // 화면전환
//   const navigate = useNavigate()
//   // 페이지네이션
//   const [limit, setLimit] = useState(10);
//   const [page, setPage] = useState(1);
//   const offset = (page - 1) * limit;
//   // 새로고침용 변수
//   const [start, setStart] = useState()
//   const refresh = () => {
//     console.log('refresh');
//     setStart(new Date())
//   }
//   // 파라미터의 카테고리값
//   let {category} = useParams()
//   console.log(category);

//   // 마켓목록(새로운 문의) 변수
//   const [qnaList, setQnaList] = useState([{}])
//   // 신고 목록(새로운 신고) 변수
//   const [reportList, setReportList] = useState([{}])
//   // 탈퇴 목록(새로운 신청) 변수
//   const [resignList, setResignList] = useState([{}])
//   // 주문 목록(새로운 주문) 변수
//   const [orderList, setOrderList] = useState([{}])
//   // 차단 목록변수
//   const [userBanList, setUserBanList] = useState([{}])
//   const [boardBanList, setBoardBanList] = useState([{}])
//   const [commentBanList, setCommentBanList] = useState([{}])

//   /* 오버뷰 불러오기 - 새로운 업데이트 표시용 */
//   useEffect(() => {
//     const adminOverview = async() => {
//       const res = await adminOverviewDB()
//       console.log(res.data);
//       const temp = JSON.stringify(res.data)
//       const jsonDoc = JSON.parse(temp)
//       // 조건용 변수
//       let market_count = 0
//       let report_count = 0
//       let resign_count = 0
//       let order_count = 0
//       let userBan_count = 0
//       let boardBan_count = 0
//       let commentBan_count = 0
//       // 마켓문의 db 담기 - 새로운문의 qna_new
//       const list1 = []
//       if(jsonDoc.length > 0) {
//         market_count = jsonDoc[0].MARKET_COUNT
//         report_count = jsonDoc[0].REPORT_COUNT
//         resign_count = jsonDoc[0].RESIGN_COUNT
//         order_count = jsonDoc[0].ORDER_COUNT
//         userBan_count = jsonDoc[0].USERBAN_COUNT
//         boardBan_count = jsonDoc[0].BOARDBAN_COUNT
//         commentBan_count = jsonDoc[0].COMMENTBAN_COUNT
//         console.log(market_count);
//         console.log(report_count);
//         console.log(resign_count);
//         console.log(userBan_count);
//         console.log(boardBan_count);
//         console.log(commentBan_count);
//         for(let i=0; i<market_count; i++) {
//           const obj = {
//             market_no: jsonDoc[i].MARKET_NO,
//             user_id: jsonDoc[i].USER_ID,
//             market_category: jsonDoc[i].MARKET_CATEGORY,
//             market_title: jsonDoc[i].MARKET_TITLE,
//             market_price: jsonDoc[i].MARKET_PRICE,
//             market_date: jsonDoc[i].MARKET_DATE,
//             sales_count: jsonDoc[i].SALES_COUNT,
//             qna_new: jsonDoc[i].QNA_NEW, // 새로운 문의 수
//             qna_count: jsonDoc[i].QNA_COUNT, // 해당글 문의 수
//           }
//           console.log(obj);
//           list1.push(obj)
//         }
//       }
//       setQnaList(list1)
//       // 신고 db 담기 - 새로운 신고 report_new
//       const list2 = []
//       const list3 = []
//       const list31 = []
//       if(jsonDoc.length > market_count) {
//         for(let i=market_count; i<(market_count + report_count); i++) {
//           const obj = {
//             report_no: jsonDoc[i].REPORT_NO,
//             user_id: jsonDoc[i].USER_ID,
//             report_type: jsonDoc[i].REPORT_TYPE,
//             report_num: jsonDoc[i].REPORT_NUM,
//             report_group: jsonDoc[i].REPORT_GROUP,
//             report_step: jsonDoc[i].REPORT_STEP,
//             report_user: jsonDoc[i].REPORT_USER,
//             report_reason: jsonDoc[i].REPORT_REASON,
//             report_date: jsonDoc[i].REPORT_DATE,
//             report_result: jsonDoc[i].REPORT_RESULT,
//             report_new: jsonDoc[i].REPORT_NEW,
//           }
//           console.log(obj);
//           list2.push(obj)
//         }
//         // 탈퇴신청 db 담기 - 새로운 탈퇴신청 resign_new
//         if(jsonDoc.length > (market_count + report_count)) {
//           for(let i=(market_count + report_count); i<(market_count + report_count + resign_count); i++) {
//             const obj = {
//               user_id: jsonDoc[i].USER_ID,
//               user_nickname: jsonDoc[i].USER_NICKNAME,
//               user_name: jsonDoc[i].USER_NAME,
//               user_phone: jsonDoc[i].USER_PHONE,
//               user_level: jsonDoc[i].USER_LEVEL,
//               status: jsonDoc[i].STATUS,
//               qna_no: jsonDoc[i].QNA_NO,
//               qna_title: jsonDoc[i].QNA_TITLE,
//               qna_content: jsonDoc[i].QNA_CONTENT,
//               qna_date: jsonDoc[i].QNA_DATE,
//               resign_new: jsonDoc[i].RESIGN_NEW,
//             }
//             console.log(obj);
//             list3.push(obj)
//           }
//         }
//         setReportList(list2)
//         setResignList(list3)
//         // 주문 목록 db 담기
//         if(jsonDoc.length > (market_count + report_count + resign_count)) {
//           for(let i=(market_count + report_count + resign_count); i<(market_count + report_count + resign_count + order_count); i++) {
//             const obj = {
//               order_no: jsonDoc[i].ORDER_NO,
//               user_id: jsonDoc[i].USER_ID,
//               order_payment: jsonDoc[i].ORDER_PAYMENT,
//               order_date: jsonDoc[i].ORDER_DATE,
//               order_status: jsonDoc[i].ORDER_STATUS,
//               order_new: jsonDoc[i].ORDER_NEW,
//             }
//             console.log(obj);
//             list31.push(obj)
//           }
//         }
//         setOrderList(list31)
//         // 차단 목록 담기 - 유저, 글, 댓글(각각 조건 걸기)
//         const list4 = []
//         const list5 = []
//         const list6 = []
//         if(jsonDoc.length > (market_count + report_count + resign_count + order_count)) {
//           // +유저 밴 목록 있는 경우
//           if(userBan_count > 0) {
//             for(let i=(market_count + report_count + resign_count + order_count);
//             i<(market_count + report_count + resign_count + order_count + userBan_count); i++) {
//               const obj = {
//                 user_id: jsonDoc[i].USER_ID,
//                 user_nickname: jsonDoc[i].USER_NICKNAME,
//                 user_name: jsonDoc[i].USER_NAME,
//                 user_phone: jsonDoc[i].USER_PHONE,
//                 user_level: jsonDoc[i].USER_LEVEL,
//                 status: jsonDoc[i].STATUS,
//               }
//               console.log(obj);
//               list4.push(obj)
//             }
//             setUserBanList(list4)
//             // ++글 밴 목록 있는 경우
//             if(boardBan_count > 0) {
//               for(let i=(market_count + report_count + resign_count + order_count + userBan_count);
//               i<(market_count + report_count + resign_count + order_count + userBan_count + boardBan_count); i++) {
//                 const obj = {
//                   board_no: jsonDoc[i].BOARD_NO,
//                   user_id: jsonDoc[i].USER_ID,
//                   board_category: jsonDoc[i].BOARD_CATEGORY,
//                   board_title: jsonDoc[i].BOARD_TITLE,
//                   board_date: jsonDoc[i].BOARD_DATE,
//                   board_status: jsonDoc[i].BOARD_STATUS,
//                 }
//                 console.log(obj)
//                 list5.push(obj)
//               }
//               setBoardBanList(list5)
//               // +++댓글 밴 목록 있는 경우
//               if(commentBan_count > 0) {
//                 for(let i=(market_count + report_count + resign_count + order_count + userBan_count + boardBan_count);
//                 i<(market_count + report_count + resign_count + order_count + userBan_count + boardBan_count + commentBan_count); i++) {
//                   const obj = {
//                     board_no: jsonDoc[i].BOARD_NO,
//                     user_id: jsonDoc[i].USER_ID,
//                     comment_no: jsonDoc[i].COMMENT_NO,
//                     comment_step: jsonDoc[i].COMMENT_STEP,
//                     comment_content: jsonDoc[i].COMMENT_CONTENT,
//                     comment_date: jsonDoc[i].COMMENT_DATE,
//                     comment_status: jsonDoc[i].COMMENT_STATUS,
//                   }
//                   console.log(obj)
//                   list6.push(obj)
//                 }
//                 setCommentBanList(list6)
//               }
//             }
//             // --글 밴 목록 없는 경우
//             else {
//               // +++댓글 밴 목록 있는 경우
//               if(commentBan_count > 0) {
//                 for(let i=(market_count + report_count + resign_count + order_count + userBan_count);
//                 i<(market_count + report_count + resign_count + order_count + userBan_count + commentBan_count); i++) {
//                   const obj = {
//                     board_no: jsonDoc[i].BOARD_NO,
//                     user_id: jsonDoc[i].USER_ID,
//                     comment_no: jsonDoc[i].COMMENT_NO,
//                     comment_step: jsonDoc[i].COMMENT_STEP,
//                     comment_content: jsonDoc[i].COMMENT_CONTENT,
//                     comment_date: jsonDoc[i].COMMENT_DATE,
//                     comment_status: jsonDoc[i].COMMENT_STATUS,
//                   }
//                   console.log(obj)
//                   list6.push(obj)
//                 }
//                 setCommentBanList(list6)
//               }
//             }
//           }

//           // -유저밴 없는 경우
//           else {
//             // ++글 밴 목록 있는 경우
//             if(boardBan_count > 0) {
//               for(let i=(market_count + report_count + resign_count + order_count);
//               i<(market_count + report_count + resign_count + order_count + boardBan_count); i++) {
//                 const obj = {
//                   board_no: jsonDoc[i].BOARD_NO,
//                   user_id: jsonDoc[i].USER_ID,
//                   board_category: jsonDoc[i].BOARD_CATEGORY,
//                   board_title: jsonDoc[i].BOARD_TITLE,
//                   board_date: jsonDoc[i].BOARD_DATE,
//                   board_status: jsonDoc[i].BOARD_STATUS,
//                 }
//                 console.log(obj)
//                 list5.push(obj)
//               }
//               setBoardBanList(list5)
//               // +++댓글 밴 목록 있는 경우
//               if(commentBan_count > 0) {
//                 for(let i=(market_count + report_count + resign_count + order_count + boardBan_count);
//                 i<(market_count + report_count + resign_count + order_count + boardBan_count + commentBan_count); i++) {
//                   const obj = {
//                     board_no: jsonDoc[i].BOARD_NO,
//                     user_id: jsonDoc[i].USER_ID,
//                     comment_no: jsonDoc[i].COMMENT_NO,
//                     comment_step: jsonDoc[i].COMMENT_STEP,
//                     comment_content: jsonDoc[i].COMMENT_CONTENT,
//                     comment_date: jsonDoc[i].COMMENT_DATE,
//                     comment_status: jsonDoc[i].COMMENT_STATUS,
//                   }
//                   console.log(obj)
//                   list6.push(obj)
//                 }
//                 setCommentBanList(list6)
//               }
//             }
//             // --글 밴 목록 없는 경우
//             else {
//               // +++댓글 밴 목록 있는 경우
//               if(commentBan_count > 0) {
//                 for(let i=(market_count + report_count + resign_count + order_count);
//                 i<(market_count + report_count + resign_count + order_count + commentBan_count); i++) {
//                   const obj = {
//                     board_no: jsonDoc[i].BOARD_NO,
//                     user_id: jsonDoc[i].USER_ID,
//                     comment_no: jsonDoc[i].COMMENT_NO,
//                     comment_step: jsonDoc[i].COMMENT_STEP,
//                     comment_content: jsonDoc[i].COMMENT_CONTENT,
//                     comment_date: jsonDoc[i].COMMENT_DATE,
//                     comment_status: jsonDoc[i].COMMENT_STATUS,
//                   }
//                   console.log(obj)
//                   list6.push(obj)
//                 }
//                 setCommentBanList(list6)
//               }
//             }
//           }
//         }
//       }
//     }
//     adminOverview()
//   }, [category, start])
  
//   /* 왼쪽 카테고리 */
//   // 선택한 카테고리 담기
//   const [selected, setSelected] = useState('마켓')
//   const handleCategory =  useCallback((name) => {
//     let category = ''
//     {adminCategories.map((item) => {
//       if(item.name === name) {
//         category = item.category
//       }
//     })}
//     navigate('/admin/'+category)
//   }, [])
//   useEffect(() => {
//     let name = ''
//     {adminCategories.map((item) => {
//       if(item.category === category) {
//         name = item.name
//       }
//     })}
//     console.log('effect=> ' + name);
//     setSelected(name)
//   }, [category])

//   /* 마켓 상단 카테고리*/
//   const [selectedMarket, setSelectedMarket] = useState('전체')
//   /* 차단 상단 카테고리 */
//   const [selectedBan, setSelectedBan] = useState('회원')
  
//   return (
//     <>
//       <AdminSection>
//         {/* 왼쪽 카테고리 */}
//         <AdminCategory>
//           <AdminPageUl onClick={() => navigate('/admin/market')}>
//             관리자 페이지
//           </AdminPageUl>
//           <AdminCategoryUl>
//             {adminCategories &&
//               adminCategories.map((category) => {
//                 return (
//                   <AdminCategoryLi
//                     key={category.name}
//                     active={category.name === selected}
//                     onClick={() => handleCategory(category.name)}
//                     >
//                     <img src={category.img} alt={category.category} />
//                     {category.name}
//                     {qnaList.length > 0 && category.name === '마켓' && qnaList[0].qna_new > 0 ? (
//                       <AiFillPlusSquare key={category.name} active={category.name === selected} className='icon' />
//                     ) : null}
//                     {reportList.length > 0 && category.name === '신고' && reportList[0].report_new > 0 ? (
//                       <AiFillPlusSquare key={category.name} active={category.name === selected} className='icon' />
//                     ) : null}
//                     {resignList.length > 0 && category.name === '탈퇴' && resignList[0].resign_new > 0 ? (
//                       <AiFillPlusSquare key={category.name} active={category.name === selected} className='icon' />
//                     ) : null}
//                     {orderList.length > 0 && category.name === '주문' && orderList[0].order_new > 0 ? (
//                       <AiFillPlusSquare key={category.name} active={category.name === selected} className='icon' />
//                     ) : null}
//                   </AdminCategoryLi>
//                 );
//               })}
//           </AdminCategoryUl>
//         </AdminCategory>

//         {/* 오른쪽 글 내용 */}
//         <AContentSection className='content'>
//           {/* 마켓 목록 */}
//           {qnaList.length > 0 && selected === '마켓' ? (
//             <ul>
//               <Nav className='qnaNav' fill variant="tabs">
//                 {aMarketCategories && aMarketCategories.map((marketCategory) => (
//                     <Nav.Item>
//                       <Nav.Link
//                         onClick={() => setSelectedMarket(marketCategory.name)}>
//                         <QnaCategory active={marketCategory.name === selectedMarket}>{marketCategory.name}</QnaCategory>
//                       </Nav.Link>
//                     </Nav.Item>
//                 ))}
//               </Nav>
//               {/* 카테고리 selected에따른 조건 설정할것! 패키지, 레저, 티켓, 교통, 숙소 */}
//               {qnaList.map((qna) => {
//                 return <AdminQnaRow key={qna.market_no} qna={qna} selectedMarket={selectedMarket} />
//               })}
//             </ul>
//           ) : null}

//           {/* 주문 목록 */}
//           {orderList.length > 0  && selected === '주문' ? (
//             <ReportUl>
//               <Table>
//                 <colgroup>
//                   <col style={{ width: "18%" }} />
//                   <col style={{ width: "18%" }} />
//                   <col style={{ width: "18%" }} />
//                   <col style={{ width: "18%" }} />
//                   <col style={{ width: "18%" }} />
//                   <col style={{ width: "10%" }} />
//                 </colgroup>
//                 <thead>
//                   <tr>
//                     <th className='reportTd'>주문번호</th>
//                     <th className='reportTd'>아이디</th>
//                     <th className='reportTd'>결제액</th>
//                     <th className='reportTd'>결제일</th>
//                     <th className='reportTd'>주문상태</th>
//                     <th className='reportTdLast'>적용</th>
//                   </tr>
//                 </thead>
//               {orderList.slice(offset, offset + limit).map((order) => {
//                 return <AdminOrderRow key={order.order_no} order={order} refresh={refresh} />
//               })}
//               <tr>
//                 <td colSpan="6">
//               {orderList.length > limit ? (<Pagination total={orderList.length} limit={limit} page={page} setPage={setPage} />) : null}
//                 </td>
//               </tr>
//               </Table>
//             </ReportUl>
//           ) : null}

//           {/* 신고 목록 */}
//           {reportList.length > 0  && selected === '신고' ? (
//             <ReportUl>
//               <Table>
//                 <colgroup>
//                   <col style={{ width: "10%" }} />
//                   <col style={{ width: "15%" }} />
//                   <col style={{ width: "35%" }} />
//                   <col style={{ width: "15%" }} />
//                   <col style={{ width: "15%" }} />
//                   <col style={{ width: "10%" }} />
//                 </colgroup>
//                 <thead>
//                   <tr>
//                     <th className='reportTd'>유형</th>
//                     <th className='reportTd'>대상</th>
//                     <th className='reportTd'>신고이유</th>
//                     <th className='reportTd'>신고날짜</th>
//                     <th className='reportTd'>처리여부</th>
//                     <th className='reportTdLast'>적용</th>
//                   </tr>
//                 </thead>
//               {reportList.slice(offset, offset + limit).map((report) => {
//                 return <AdminReportRow key={report.report_no} report={report} refresh={refresh} />
//               })}
//               <tr>
//                 <td colSpan="6">
//               {reportList.length > limit ? (<Pagination total={reportList.length} limit={limit} page={page} setPage={setPage} />) : null}
//                 </td>
//               </tr>
//               </Table>
//             </ReportUl>
//           ) : null}

//           {/* 차단 목록 */}
//           {(userBanList.length > 0 || boardBanList.length > 0 || commentBanList.length > 0) && selected === '차단' ? (
//             <ul>
//               <Nav className='qnaNav' fill variant="tabs">
//                 {aBanCategories && aBanCategories.map((banCategory) => (
//                     <Nav.Item>
//                       <Nav.Link
//                         onClick={() => setSelectedBan(banCategory.name)}>
//                         <QnaCategory active={banCategory.name === selectedBan}>{banCategory.name}</QnaCategory>
//                       </Nav.Link>
//                     </Nav.Item>
//                 ))}
//               </Nav>
//               <AdminBanList userBanList={userBanList} boardBanList={boardBanList} commentBanList={commentBanList} selectedBan={selectedBan} />
//             </ul>
//           ) : null}

//           {/* 탈퇴 목록 */}
//           {resignList.length > 0 && selected === '탈퇴' ? (
//             <ReportUl>
//             <Table>
//               <colgroup>
//                 <col style={{ width: "15%" }} />
//                 <col style={{ width: "15%" }} />
//                 <col style={{ width: "30%" }} />
//                 <col style={{ width: "15%" }} />
//                 <col style={{ width: "15%" }} />
//                 <col style={{ width: "10%" }} />
//               </colgroup>
//               <thead>
//                 <tr>
//                   <th className='reportTd'>아이디</th>
//                   <th className='reportTd'>제목</th>
//                   <th className='reportTd'>내용</th>
//                   <th className='reportTd'>등록일</th>
//                   <th className='reportTd'>처리여부</th>
//                   <th className='reportTdLast'>적용</th>
//                 </tr>
//               </thead>
//             {resignList.slice(offset, offset + limit).map((resign) => {
//               return <AdminResignRow key={resign.qna_date} resign={resign} refresh={refresh} />
//             })}
//             <tr>
//               <td colSpan="6">
//             {resignList.length > limit ? (<Pagination total={resignList.length} limit={limit} page={page} setPage={setPage} />) : null}
//               </td>
//             </tr>
//             </Table>
//             </ReportUl>
//           ) : null}
//         </AContentSection>
//       </AdminSection>
//     </>
//   )
// }

// export default MyPageLayout