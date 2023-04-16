import React from 'react'
import { PostContent, PostFooter, PostLi } from '../../styles/BoardStyle'
import { Link } from 'react-router-dom'
import { AiFillLike, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaCommentDots, FaHotjar } from 'react-icons/fa';
import { BsBookmarkStar, BsBookmarkStarFill, BsFillEyeFill, BsFillImageFill } from 'react-icons/bs';


const BoardRow = ({post}) => {
  return (
    <> 
      <PostLi>
        <Link className='postLink' to={`/board/detail/${post.board_no}`}>
          <p className='categoryP'>{post.board_category}</p>
          <PostContent liked={post.like_count}>
            <div>
              <p className='titleP'>
              {post.like_count >= 5 ? (post.like_count >= 10 ? (
                <BsBookmarkStarFill className='star-icon' color={'#4996F3'} />
              ): (
                <BsBookmarkStar className='star-icon' color={'#4996F3'} />
              )) : null}
                {post.board_title}
                {post.file_exist && (
                  <BsFillImageFill  id='fileI' />
                )}
              </p>
              <p className='contentP' dangerouslySetInnerHTML={{__html:post.board_content}}></p>
            </div>
          </PostContent>
          <PostFooter>
            <ul className="list-count">
              <li>
                <AiFillLike />
                {post.like_count ? post.like_count : 0}
              </li>
              <li>
                <FaCommentDots />
                {post.comment_count ? post.comment_count : 0}
              </li>
              <li>
                <BsFillEyeFill />
                {post.board_hit ? post.board_hit : 0}
              </li>
            </ul>
            <small>
              {new Date(post.board_date).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              })}
            </small>
          </PostFooter>
        </Link>
      </PostLi>
    </>
  )
}

export default BoardRow
