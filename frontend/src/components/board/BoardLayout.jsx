import React, { useCallback, useEffect, useState } from 'react'
import {BoardSection, BoardCategory, CategoryLi, BContentSection, SearchInput, Wrap, StyledSlider, SliderListF, CommunityH3, CategoryUl, BtnSearch, SearchDiv, SearchSelect, SearchInputText, SliderDiv, SliderDivCategory, SliderDivTitle, SliderDivWriter, SliderMain, SliderSub} from '../../styles/BoardStyle'
import { BiSearch } from 'react-icons/bi';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import BoardRow from './BoardRow';
import BoardTopPost from './BoardTopPost';
import { DropdownButton } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { categories, search } from './boardData';
import { boardListDB } from "../../service/boardLogic";


const BoardLayout = () => {
  // 화면전환
  const navigate = useNavigate()

  /* 왼쪽 카테고리 */
  // 선택한 카테고리 담기
  const [selected, setSelected] = useState('전체')
  const handleCategory =  useCallback((name) => {
    console.log('handleCategory => ' + name);
    setSelected(name)
  }, [])


/* 검색 */
// 선택한 검색 조건
const [searchVal, setSearchVal] = useState('작성자')
// 입력한 검색값
const [keyword, setKeyword] = useState('')
// 검색조건 입력
const handleSearch = useCallback((e) => {
  console.log('handleSearch => ' + e);
  setSearchVal(e)
},[])
// 검색값 입력
const handleSearchKeyword = useCallback((e) => {
  console.log('handleSearchKeyword => ' + e);
  setKeyword(e);
},[]);
// useEffect쓰기위해 useState선언
  const [searchStart, setSearchStart] = useState('')

// 검색 버튼 클릭
const btnSearch =  useCallback((e) => {
  e.preventDefault()
  setSearchStart(new Date())
}, [])

/* 글 목록 */
// 게시글 담을 객체배열
const [posts, setPosts] = useState([{}])
//선택한 카테고리에따라 글목록 출력
useEffect(() => {
  console.log(searchStart)
  const boardList = async() => {
    let board = {}
    // DB로 보내는 조건 - 검색버튼 눌렀을때만 조건추가
    board = {
      board_category: selected,
      search: searchVal,
      keyword: keyword,
    }
    const res = await boardListDB(board)
    console.log(res.data)
    const list = []
    const datas = res.data
    datas.forEach((item) => {
      console.log(item)
      // DB에서 받은 데이터
      const obj = {
        board_no: item.BOARD_NO,
        user_nickname: item.USER_NICKNAME,
        board_category: item.BOARD_CATEGORY,
        board_title: item.BOARD_TITLE,
        board_content: item.BOARD_CONTENT,
        board_date: item.BOARD_DATE,
        board_hit: item.BOARD_HIT,
        type_board: item.TYPE_BOARD,
        like_count: item.LIKE_COUNT,
        comment_count: item.COMMENT_COUNT,
      }
      list.push(obj)
    })
    setPosts(list)
    setKeyword('')
    const keywordInput = document.getElementById('keyword')
    keywordInput.value = '' // 키워드 input창 초기화
  }
  boardList()
}, [selected, searchStart])


  return (
    <>
      <BoardSection>
        {/* 왼쪽 카테고리 */}
        <BoardCategory>
          <CategoryUl>
            {categories &&
              categories.map((category) => {
                return (
                  <CategoryLi
                    key={category.name}
                    active={category.name === selected}
                    onClick={() => handleCategory(category.name)}
                  >
                    <img src={category.img} alt={category.name} />
                    {category.name}
                  </CategoryLi>
                );
              })}
          </CategoryUl>
        </BoardCategory>

        {/* 오른쪽 커뮤 내용 */}
        <BContentSection className='content'>
          {/* 전체라면 BoardTopPost 보여줌 */}
          {selected === '전체' && (
            <>
              <h3>지금 가장 뜨거운 오행픽🔥</h3>
              <Wrap>
                <StyledSlider>
                  <div>
                    <BoardTopPost />
                  </div>
                </StyledSlider>
              </Wrap>
            </>
          )}

          {/* 글 목록 */}
          <ul>
            {posts && posts.map((post) => {
              return <BoardRow key={post.board_date} post={post} />
            })}
          </ul>

          {/* 검색 */}
          <SearchDiv className='searchDiv'>
            <DropdownButton className='searchDropdown' variant="" title={searchVal}>
              {search.map((item, index)=>(
                  <Dropdown.Item as="button" key={index} onClick={()=>{
                    handleSearch(item); 
                  }}>
                    {item}
                  </Dropdown.Item>
                )) 
              }
            </DropdownButton>
            <SearchInput type="text" id="keyword" maxLength="60" placeholder="검색어를 입력하세요"
              autoComplete="off" onChange={(e)=>{handleSearchKeyword(e.target.value)}} />
            <BtnSearch className='btnSearch' onClick={btnSearch}>
              검색
            </BtnSearch>
          </SearchDiv>
        </BContentSection>
      </BoardSection>
      
      {/* {isFetchingNextPage ? <Loading /> : <div ref={ref} />} */}      
    </>
  )
}

export default BoardLayout