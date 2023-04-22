package com.backend.itryp.dao;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.itryp.controller.OrderController;
import com.backend.itryp.vo.TbUserVO;

@Service
public class OrderDao {
	
	Logger log = LogManager.getLogger(OrderController.class);
	
	@Autowired
	private SqlSessionTemplate sst = null;
	
	/**
	 * 
	 * @param pmap
	 * @return
	 */
	public List<Map<String, Object>> getOrderPage(Map<String, Object> pmap) {
		log.info("getOrderPage 호출");
		List<Map<String,Object>> list = null;
		list = sst.selectList("getOrderPage", pmap);
		return list;
	}

	/**
	 * orderInsert
	 * 
	 * @param pmap orderInfo
	 * @return result
	 */
	public int orderInsert(Map<String, Object> pmap) {
		log.info("orderInsert 호출");
		int result = 0;
		result = sst.update("InsertOrder", pmap);
		return result;
	}

	/**
	 * orderDetailInsert
	 * 
	 * @param pmap orderInfo
	 * @return result
	 */
	public int orderDetailInsert(Map<String, Object> pmap) {
		log.info("orderDetailInsert 호출");
		int result = 0;
		result = sst.update("InsertOrderDetail", pmap);
		return result;
	}

	/**
	 * getOrderNo
	 * 
	 * @return orderNo
	 */
	public int getOrderNo(Map<String, Object> pmap) {
		log.info("getOrderNo 호출");
		int orderNo = 0;
		orderNo = sst.selectOne("getOrderNo", pmap);
		return orderNo;
	}
	
	/**
	 * cancelOrder
	 * 
	 * @param pmap
	 * @return
	 */
	public List<Map<String, Object>> cancelOrder(Map<String, Object> pmap) {
		log.info("cancelOrder 호출");
		List<Map<String,Object>> list = null;
		list = sst.selectList("cancelOrder", pmap);
		return list;
	}

	/**
	 * 유저 정보 조회하기
	 * 
	 * @param pmap userId 정보
	 * @return TbUserVO 유저 정보
	 */
	public TbUserVO getUserInfo(Map<String, Object> pmap) {
		log.info("getUserInfo 호출");
		TbUserVO user = new TbUserVO();
		user = (TbUserVO) sst.selectOne("getUserInfo", pmap);
		return user;
	}

}
