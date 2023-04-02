package com.backend.itryp.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.itryp.logic.MemberLogic;
import com.google.gson.Gson;

@RestController
@RequestMapping("/member/*")
public class MemberController {
	Logger logger = LogManager.getLogger(MemberController.class);
	
	
	@Autowired
	private MemberLogic memberLogic = null;
	
	
	/******************
	 * 회원 목록
	 * @param pMap
	 * @return
	 ******************/
	@GetMapping("memberList")
	public String memberList(@RequestParam Map<String, Object> pMap) {
		logger.info("memberList 호출");
		logger.info(pMap);
		String temp = null;
		List<Map<String,Object>> mList = new ArrayList<>();
		mList = memberLogic.memberList(pMap);
		logger.info(mList);
		
		if(mList.size()>0) {
			Gson g = new Gson();
			temp = g.toJson(mList);
		}
		else {
			temp = "0";
		}
		return temp;
	}
	
	
	/*******************
	 * 회원 등록
	 * @param pMap
	 * @return
	 *******************/
	@PostMapping("memberInsert")
	public String memberInsert(@RequestBody Map<String,Object> pMap) {
		logger.info("memberInsert 호출");
		logger.info(pMap);
		int result = 0;
		result = memberLogic.memberInsert(pMap);
		return String.valueOf(result);
	}
	
	/*******************
	 * 회원 정보 수정
	 * @param pMap
	 * @return
	 *******************/
	@PostMapping("memberUpdate")
	public String memberUpdate(@RequestBody Map<String,Object> pMap) {
		logger.info("memberUpdate 호출");
		logger.info(pMap);
		int result = 0;
		result = memberLogic.memberUpdate(pMap);
		return String.valueOf(result);
	}
	
	@PostMapping("memberDelete")
	public String memberDelete(@RequestBody Map<String,Object> pMap) {
		logger.info("memberDelete 호출");
		logger.info(pMap);
		int result = 0;
		result = memberLogic.memberDelete(pMap);
		return String.valueOf(result);
	}

}