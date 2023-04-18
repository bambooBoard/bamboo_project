package com.backend.itryp.logic;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.itryp.controller.OrderController;
import com.backend.itryp.dao.OrderDao;

@Service
public class OrderLogic {
	
	Logger log = LogManager.getLogger(OrderController.class);
	
	@Autowired
	OrderDao odao = null;
	

	/**
	 * getOrderPage
	 * 
	 * @param pmap 유저 아이디
	 * @return list 쿠폰 정보, 유저 정보
	 */
	public List<Map<String, Object>> getOrderPage(Map<String, Object> pmap) {
		log.info("getOrderPage 호출");
		List<Map<String,Object>> list = new ArrayList<>();
		list = odao.getOrderPage(pmap);
		return list;
	}


	/**
	 * orderUpdate
	 * 
	 * @param pmap
	 * @return
	 */
	public List<Map<String, Object>> orderUpdate(Map<String, Object> pmap) {
		log.info("orderUpdate 호출");
		List<Map<String,Object>> list = new ArrayList<>();
		list = odao.orderUpdate(pmap);
		return list;
	}
	
	
	/**
	 * cancelOrder
	 * 
	 * @param pmap
	 * @return
	 */
	public List<Map<String, Object>> cancelOrder(Map<String, Object> pmap) {
		log.info("cancelOrder 호출");
		List<Map<String,Object>> list = new ArrayList<>();
		list = odao.cancelOrder(pmap);
		return list;
	}
	

}
