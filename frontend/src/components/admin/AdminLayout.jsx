import React from 'react'
import { AContentSection, AdminCategory, AdminCategoryLi, AdminCategoryUl, AdminPageUl, AdminSection, NoneDiv, QnaCategory, ReportUl } from '../../styles/AdminStyle'
import { aBanCategories, aMarketCategories, adminCategories } from './adminData';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { adminOverviewDB } from "../../service/adminLogic";
import AdminQnaRow from './AdminQnaRow';
import AdminReportRow from './AdminReportRow';
import AdminResignRow from './AdminResignRow';
import { AiFillPlusSquare } from 'react-icons/ai';
import { Nav, Table } from "react-bootstrap";
import Pagination from '../include/Pagination';
import AdminBanList from './AdminBanList';
import AdminOrderRow from './AdminOrderRow';
import AdminInquiryRow from './AdminInquiryRow';

const AdminLayout = () => {
  // 화면전환
  const navigate = useNavigate()
  // 페이지네이션
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  // 새로고침용 변수
  const [start, setStart] = useState()
  const refresh = () => {
    console.log('refresh');
    setStart(new Date())
  }
  // 파라미터의 카테고리값
  let {category} = useParams()
  console.log(category);

  // 마켓목록(새로운 문의) 변수
  const [qnaList, setQnaList] = useState([])
  // 신고 목록(새로운 신고) 변수
  const [reportList, setReportList] = useState([])
  // 탈퇴 목록(새로운 신청) 변수
  const [resignList, setResignList] = useState([])
  // 주문 목록(새로운 주문) 변수
  const [orderList, setOrderList] = useState([])
  // 차단 목록변수
  const [userBanList, setUserBanList] = useState([])
  const [boardBanList, setBoardBanList] = useState([])
  const [commentBanList, setCommentBanList] = useState([])
  // 문의 목록 변수
  const [inquiryList, setInquiryList] = useState([])
  // 새로운 알림 변수
  const [newList, setNewList] = useState([{
    qna_new: 0, // 새로운 마켓 문의
    report_new: 0, // 새로운 신고
    resign_new: 0, // 새로운 탈퇴
    order_new: 0, // 새로운 주문
    inquiry_new: 0, // 새로운 문의
    }])

  /* 왼쪽 카테고리 */
  // 선택한 카테고리 담기
  const [selected, setSelected] = useState('마켓')
  const handleCategory =  useCallback((name) => {
    let category = ''
    {adminCategories.map((item) => {
      if(item.name === name) {
        category = item.category
      }
    })}
    navigate('/admin/'+category)
  }, [])
  useEffect(() => {
    let name = ''
    {adminCategories.map((item) => {
      if(item.category === category) {
        name = item.name
      }
    })}
    console.log('effect=> ' + name);
    setSelected(name)
  }, [category])

  /* 마켓 상단 카테고리*/
  const [selectedMarket, setSelectedMarket] = useState('전체')
  /* 차단 상단 카테고리 */
  const [selectedBan, setSelectedBan] = useState('회원')
  
  /* 오버뷰 불러오기 - 새로운 업데이트 표시용 */
  useEffect(() => {
    const adminOverview = async() => {
      const category = {
        category: selected
      }
      const res = await adminOverviewDB(category)
      console.log(res.data);
      const temp = JSON.stringify(res.data)
      const jsonDoc = JSON.parse(temp)
      if(jsonDoc.length > 0) {
        const list = []
        // 새로운 문의 담기
        setNewList([{
          qna_new: jsonDoc[0].QNA_NEW,
          report_new: jsonDoc[0].REPORT_NEW,
          resign_new: jsonDoc[0].RESIGN_NEW,
          order_new: jsonDoc[0].ORDER_NEW,
          inquiry_new: jsonDoc[0].INQUIRY_NEW,
        }])
        console.log(newList)
        if(selected === '마켓') {
          // 마켓문의 db 담기 - 새로운문의 qna_new
          for(let i=0; i<jsonDoc.length; i++) {
            const obj = {
              market_no: jsonDoc[i].MARKET_NO,
              user_id: jsonDoc[i].USER_ID,
              market_category: jsonDoc[i].MARKET_CATEGORY,
              market_title: jsonDoc[i].MARKET_TITLE,
              market_price: jsonDoc[i].MARKET_PRICE,
              market_date: jsonDoc[i].MARKET_DATE,
              file_url: jsonDoc[i].FILE_URL,
              sales_count: jsonDoc[i].SALES_COUNT,
              qna_count: jsonDoc[i].QNA_COUNT, // 해당글 문의 수
            }
            const newAlert = {
              qna_new: jsonDoc[i].QNA_NEW, // 새로운 마켓 문의
              report_new: jsonDoc[i].REPORT_NEW, // 새로운 신고
              resign_new: jsonDoc[i].RESIGN_NEW, // 새로운 탈퇴
              order_new: jsonDoc[i].ORDER_NEW, // 새로운 주문
              inquiry_new: jsonDoc[i].INQUIRY_NEW, // 새로운 문의
            }
            console.log(obj);
            list.push(obj)
          }
          setQnaList(list)
        }
        else if(selected === '주문') {
          // 주문 목록 db 담기
          for(let i=0; i<jsonDoc.length; i++) {
            const obj = {
              order_no: jsonDoc[i].ORDER_NO,
              user_id: jsonDoc[i].USER_ID,
              order_payment: jsonDoc[i].ORDER_PAYMENT,
              order_date: jsonDoc[i].ORDER_DATE,
              order_status: jsonDoc[i].ORDER_STATUS,
              order_new: jsonDoc[i].ORDER_NEW,
            }
            console.log(obj);
            list.push(obj)
          }
        setOrderList(list)
        }
        else if(selected === '문의') {
          // 1:1문의 목록 담기
          for(let i=0; i<jsonDoc.length; i++) {
            const obj = {
              qna_no: jsonDoc[i].QNA_NO,
              qna_step: jsonDoc[i].QNA_STEP,
              user_id: jsonDoc[i].USER_ID,
              qna_title: jsonDoc[i].QNA_TITLE,
              qna_date: jsonDoc[i].QNA_DATE,
              inquiry_new: jsonDoc[i].INQUIRY_NEW,
            }
            console.log(obj)
            list.push(obj)
          }
          setInquiryList(list)
        }
        else if(selected === '신고') {
          // 신고 db 담기 - 새로운 신고 report_new
          for(let i=0; i<jsonDoc.length; i++) {
            const obj = {
              report_no: jsonDoc[i].REPORT_NO,
              user_id: jsonDoc[i].USER_ID,
              report_type: jsonDoc[i].REPORT_TYPE,
              report_num: jsonDoc[i].REPORT_NUM,
              report_group: jsonDoc[i].REPORT_GROUP,
              report_step: jsonDoc[i].REPORT_STEP,
              report_user: jsonDoc[i].REPORT_USER,
              report_reason: jsonDoc[i].REPORT_REASON,
              report_date: jsonDoc[i].REPORT_DATE,
              report_result: jsonDoc[i].REPORT_RESULT,
              report_new: jsonDoc[i].REPORT_NEW,
            }
            console.log(obj);
            list.push(obj)
          }
          setReportList(list)
        }
        else if(selected === '차단') {
          // 차단 카운트 변수
          let userBan_count = 0
          let boardBan_count = 0
          let commentBan_count = 0
          userBan_count = jsonDoc[0].USERBAN_COUNT
          boardBan_count = jsonDoc[0].BOARDBAN_COUNT
          commentBan_count = jsonDoc[0].COMMENTBAN_COUNT
          if(userBan_count > 0) {
            // 차단 목록 담기 - 유저
            const list1 = []
            for(let i=0; i<userBan_count; i++) {
              const obj = {
                user_id: jsonDoc[i].USER_ID,
                user_nickname: jsonDoc[i].USER_NICKNAME,
                user_name: jsonDoc[i].USER_NAME,
                user_phone: jsonDoc[i].USER_PHONE,
                user_level: jsonDoc[i].USER_LEVEL,
                status: jsonDoc[i].STATUS,
              }
              console.log(obj);
              list1.push(obj)
            }
            setUserBanList(list1)
          }
          if(boardBan_count > 0) {
            // 차단 목록 담기 - 글
            const list2 = []
            for(let i=userBan_count; i<(userBan_count + boardBan_count); i++) {
              const obj = {
                board_no: jsonDoc[i].BOARD_NO,
                user_id: jsonDoc[i].USER_ID,
                board_category: jsonDoc[i].BOARD_CATEGORY,
                board_title: jsonDoc[i].BOARD_TITLE,
                board_date: jsonDoc[i].BOARD_DATE,
                board_status: jsonDoc[i].BOARD_STATUS,
              }
              console.log(obj)
              list2.push(obj)
            }
            setBoardBanList(list2)
          }
          if(commentBan_count > 0) {
            // 차단 목록 담기 - 댓글
            const list3 = []
            for(let i=(userBan_count + boardBan_count); i<(userBan_count + boardBan_count + commentBan_count); i++) {
              const obj = {
                board_no: jsonDoc[i].BOARD_NO,
                user_id: jsonDoc[i].USER_ID,
                comment_no: jsonDoc[i].COMMENT_NO,
                comment_step: jsonDoc[i].COMMENT_STEP,
                comment_content: jsonDoc[i].COMMENT_CONTENT,
                comment_date: jsonDoc[i].COMMENT_DATE,
                comment_status: jsonDoc[i].COMMENT_STATUS,
              }
              console.log(obj)
              list3.push(obj)
            }
            setCommentBanList(list3)
          }
        }
        else if(selected === '탈퇴') {
          // 탈퇴신청 db 담기 - 새로운 탈퇴신청 resign_new
          for(let i=0; i<jsonDoc.length; i++) {
            const obj = {
              user_id: jsonDoc[i].USER_ID,
              user_nickname: jsonDoc[i].USER_NICKNAME,
              user_name: jsonDoc[i].USER_NAME,
              user_phone: jsonDoc[i].USER_PHONE,
              user_level: jsonDoc[i].USER_LEVEL,
              status: jsonDoc[i].STATUS,
              qna_no: jsonDoc[i].QNA_NO,
              qna_title: jsonDoc[i].QNA_TITLE,
              qna_content: jsonDoc[i].QNA_CONTENT,
              qna_date: jsonDoc[i].QNA_DATE,
              resign_new: jsonDoc[i].RESIGN_NEW,
            }
            console.log(obj);
            list.push(obj)
          }
        setResignList(list)
        }
      }
    }
    adminOverview()
  }, [selected, start])

  return (
    <>
      <AdminSection>
        {/* 왼쪽 카테고리 */}
        <AdminCategory>
          <AdminPageUl onClick={() => navigate('/admin/market')}>
            관리자 페이지
          </AdminPageUl>
          <AdminCategoryUl>
            {adminCategories &&
              adminCategories.map((category) => {
                return (
                  <AdminCategoryLi
                    key={category.name}
                    active={category.name === selected}
                    onClick={() => handleCategory(category.name)}
                    >
                    <img src={category.img} alt={category.category} />
                    {category.name}
                    {newList.length > 0 && category.name === '마켓' && newList[0].qna_new > 0 ? (
                      <AiFillPlusSquare key={category.name} active={category.name === selected} className='icon' />
                    ) : null}
                    {newList.length > 0 && category.name === '신고'  && newList[0].report_new > 0 ? (
                      <AiFillPlusSquare key={category.name} active={category.name === selected} className='icon' />
                    ) : null}
                    {newList.length > 0 && category.name === '탈퇴'  && newList[0].resign_new > 0 ? (
                      <AiFillPlusSquare key={category.name} active={category.name === selected} className='icon' />
                    ) : null}
                    {newList.length > 0 && category.name === '주문'  && newList[0].order_new > 0 ? (
                      <AiFillPlusSquare key={category.name} active={category.name === selected} className='icon' />
                    ) : null}
                    {newList.length > 0 && category.name === '문의'  && newList[0].inquiry_new > 0 ? (
                      <AiFillPlusSquare key={category.name} active={category.name === selected} className='icon' />
                    ) : null}
                  </AdminCategoryLi>
                );
              })}
          </AdminCategoryUl>
        </AdminCategory>

        {/* 오른쪽 글 내용 */}
        <AContentSection className='content'>
          {/* 마켓 목록 */}
          {selected === '마켓' ? (
            <ul>
              <Nav className='qnaNav' fill variant="tabs">
                {aMarketCategories && aMarketCategories.map((marketCategory) => (
                    <Nav.Item>
                      <Nav.Link
                        onClick={() => setSelectedMarket(marketCategory.name)}>
                        <QnaCategory active={marketCategory.name === selectedMarket}>{marketCategory.name}</QnaCategory>
                      </Nav.Link>
                    </Nav.Item>
                ))}
              </Nav>
              {/* 카테고리 selected에따른 조건 설정할것! 패키지, 레저, 티켓, 교통, 숙소 */}
              {qnaList && qnaList.map((qna) => {
                return <AdminQnaRow key={qna.market_no} qna={qna} selectedMarket={selectedMarket} />
              })}
            </ul>
          ) : null}

          {/* 주문 목록 */}
          {selected === '주문' ? (
            <ReportUl>
              <Table>
                <colgroup>
                  <col style={{ width: "18%" }} />
                  <col style={{ width: "18%" }} />
                  <col style={{ width: "18%" }} />
                  <col style={{ width: "18%" }} />
                  <col style={{ width: "18%" }} />
                  <col style={{ width: "10%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th className='reportTd'>주문번호</th>
                    <th className='reportTd'>아이디</th>
                    <th className='reportTd'>결제액</th>
                    <th className='reportTd'>주문일</th>
                    <th className='reportTd'>주문상태</th>
                    <th className='reportTdLast'>적용</th>
                  </tr>
                </thead>
              {orderList && orderList.slice(offset, offset + limit).map((order) => {
                return <AdminOrderRow key={order.order_no} order={order} refresh={refresh} />
              })}
              <tr>
                <td colSpan="6">
              {orderList.length > limit ? (<Pagination total={orderList.length} limit={limit} page={page} setPage={setPage} />) : null}
                </td>
              </tr>
              </Table>
            </ReportUl>
          ) : null}

          {/* 문의 목록 */}
          {selected === '문의' ? (
            <ReportUl>
              <Table>
                <colgroup>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "40%" }} />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "15%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th className='reportTd'>번호</th>
                    <th className='reportTd'>아이디</th>
                    <th className='reportTd'>문의제목</th>
                    <th className='reportTd'>문의날짜</th>
                    <th className='reportTdLast'>문의상태</th>
                  </tr>
                </thead>
              {inquiryList && inquiryList.slice(offset, offset + limit).map((inquiry) => {
                return <AdminInquiryRow key={inquiry.qna_no} inquiry={inquiry} refresh={refresh} />
              })}
              <tr>
                <td colSpan="5">
              {inquiryList.length > limit ? (<Pagination total={inquiryList.length} limit={limit} page={page} setPage={setPage} />) : null}
                </td>
              </tr>
              </Table>
            </ReportUl>
          ) : null}

          {/* 신고 목록 */}
          {selected === '신고' ? (
            <ReportUl>
              <Table>
                <colgroup>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "35%" }} />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "10%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th className='reportTd'>유형</th>
                    <th className='reportTd'>대상</th>
                    <th className='reportTd'>신고이유</th>
                    <th className='reportTd'>신고날짜</th>
                    <th className='reportTd'>처리여부</th>
                    <th className='reportTdLast'>적용</th>
                  </tr>
                </thead>
              {reportList && reportList.slice(offset, offset + limit).map((report) => {
                return <AdminReportRow key={report.report_no} report={report} refresh={refresh} />
              })}
              <tr>
                <td colSpan="6">
              {reportList.length > limit ? (<Pagination total={reportList.length} limit={limit} page={page} setPage={setPage} />) : null}
                </td>
              </tr>
              </Table>
            </ReportUl>
          ) : null}

          {/* 차단 목록 */}
          {selected === '차단' ? (
            <ul>
              <Nav className='qnaNav' fill variant="tabs">
                {aBanCategories && aBanCategories.map((banCategory) => (
                    <Nav.Item>
                      <Nav.Link
                        onClick={() => setSelectedBan(banCategory.name)}>
                        <QnaCategory active={banCategory.name === selectedBan}>{banCategory.name}</QnaCategory>
                      </Nav.Link>
                    </Nav.Item>
                ))}
              </Nav>
              <AdminBanList key={selectedBan} userBanList={userBanList} boardBanList={boardBanList} commentBanList={commentBanList} selectedBan={selectedBan} />
            </ul>
          ) : null}

          {/* 탈퇴 목록 */}
          {selected === '탈퇴' ? (
            <ReportUl>
            <Table>
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "30%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "10%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th className='reportTd'>아이디</th>
                  <th className='reportTd'>제목</th>
                  <th className='reportTd'>내용</th>
                  <th className='reportTd'>등록일</th>
                  <th className='reportTd'>처리여부</th>
                  <th className='reportTdLast'>적용</th>
                </tr>
              </thead>
            {resignList && resignList.slice(offset, offset + limit).map((resign) => {
              return <AdminResignRow key={resign.qna_date} resign={resign} refresh={refresh} />
            })}
            <tr>
              <td colSpan="6">
            {resignList.length > limit ? (<Pagination total={resignList.length} limit={limit} page={page} setPage={setPage} />) : null}
              </td>
            </tr>
            </Table>
            </ReportUl>
          ) : null}
        </AContentSection>
      </AdminSection>
    </>
  )
}

export default AdminLayout
