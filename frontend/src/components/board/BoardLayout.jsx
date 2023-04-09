import React, { useEffect, useState } from 'react'
import {BoardSection, BoardCategory, CategoryLi, BContentSection, SearchInput, Wrap, StyledSlider, SliderListF, CommunityH3, CategoryUl, BtnSearch, SearchDiv, SearchSelect, SearchInputText, SliderDiv, SliderDivCategory, SliderDivTitle, SliderDivWriter, SliderMain, SliderSub} from '../../styles/BoardStyle'
import { BiSearch } from 'react-icons/bi';
import { Outlet, useNavigate } from 'react-router-dom'
import BoardRow from './BoardRow';
import BoardTopPost from './BoardTopPost';
import { DropdownButton } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';

const BoardLayout = () => {
  const navigate = useNavigate()

  /* 왼쪽 카테고리 */
  const [selected, setSelected] = useState('전체')
  const categories = [
    {
    name: '전체',
    img: '/images/icon-all.png'},
    {
    name: '인기글',
    img: '/images/icon-hot.png'},
    {
    name: '자유',
    img: '/images/icon-free.png'},
    {
    name: '질문',
    img: '/images/icon-qna.png'},
    {
    name: '여행후기',
    img: '/images/icon-review.png'},
    {
    name: '동행찾기',
    img: '/images/icon-together2.png'},
]
const onClickCategory = (name) => {
  setSelected(name)
}

/* 글 목록 */
const [posts, setPosts] = useState([
  {
    board_no: 1,
    user_nickname: '닉네임1',
    board_category: '자유',
    board_title: '12321321 ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ ㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱ 자유게시판에 자유롭게 쓰지 않을 자유도 있으면 자유롭게 못쓰게 되는데 자유게시판이 맞나요?',
    board_content: '<img src=이러쿵 저러쿵 어쩌구 저쩌구 긴 내용이 들어갈수도? 어느정도 하다보면 축약할수도???',
    board_date: '2023-04-08 14:10:02',
    board_hit: 10,
    board_like: 12,
    type_board: 123,
    board_comment: 12,
    file_exist: '1',
  },
  {
    board_no: 2,
    user_nickname: '닉네임2',
    board_category: '질문',
    board_title: '질문합니다 어쩌구 저쩌구',
    board_content: '도배합니다 ㅁㅁㅁㅁㅁㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ',
    board_date: '2023-04-08 16:55:23',
    board_hit: 20,
    board_like: 44,
    type_board: 345,
    board_comment: 34,
  },
  {
    board_no: 3,
    user_nickname: '닉네임3',
    board_category: '여행후기',
    board_title: '여행후기 어쩌구 저쩌구',
    board_content: 'ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ',
    board_date: '2023-04-09 10:54:23',
    board_hit: 2,
    board_like: 2,
    type_board: 345,
    board_comment: 3,
  },
  {
    board_no: 4,
    user_nickname: '닉네임4',
    board_category: '동행찾기',
    board_title: '동행찾습니다',
    board_content: 'ㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ',
    board_date: '2023-04-05 12:22:23',
    board_hit: 1,
    board_like: 2,
    type_board: 345,
    board_comment: 1,
  },
])

/* 검색 */
const [search, setSearch] = useState('전체')
const [searchVal, setSearchVal] = useState('')

const handleSearch = (e) => {
  console.log('handleSearch => ' + e.target.value);
  setSearch(e.target.value)
}
const handleSearchVal = (e) => {
  console.log('handleSearchVal => ' + e.target.value);
  setSearchVal(e.target.value)
}
const btnSearch = () => {
  console.log('btnSearch => ' + search + searchVal);
}

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
                    onClick={() => onClickCategory(category.name)}
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
              return <BoardRow key={post.board_no} post={post} />
            })}
          </ul>

          {/* 검색 */}
          <SearchDiv className='searchDiv'>
            <SearchSelect id="search" aria-label="분류" onChange={handleSearch}>
              <option defaultValue>전체</option>
              <option value="작성자">작성자</option>
              <option value="제목">제목</option>
              <option value="내용">내용</option>
            </SearchSelect>
            <SearchInput type="text" id="keyword" placeholder="검색어를 입력하세요"
              onChange={handleSearchVal}/>
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