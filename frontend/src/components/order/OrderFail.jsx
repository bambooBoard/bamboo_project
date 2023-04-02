import React from 'react'
import Bottom from '../include/Bottom'
import Header from '../include/Header'
import fail_icon from '../../images/failed.png'
import './orderResult.css'

const OderFail = () => {
  return (
    <>
      <Header/>
        <div className='order body'>
          <div className='complete sentence'>주문에 실패하였습니다.</div>
          <div className='img'><img src={fail_icon} alt="fail_icon" className='fail icon'/></div>
          <div className='num'>실패 사유 : 어쩌고저쩌고</div>
          <hr/>
          <button className='order button'>이전으로</button>
          <button className='order button home'>메인으로</button>
          <hr/>
        </div>
      <Bottom/>
    </>
  )
}

export default OderFail