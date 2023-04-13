import axios from "axios";

export const marketListDB = (market) => {
  console.log(market)
  return new Promise((resolve, reject) => {
    try {
      // axios 비동기요청 처리(ajax - fetch[브라우저, 클라이언트사이드] - axios[NodeJS-오라클 서버연동, 서버사이드])
      const response = axios({ // 3000번 서버에서 8000서버로 요청함 - 네트워크(다른서버-CORS이슈, 지연발생)
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "market/marketList",
        params: market, // 스프링 부트와 연동시 @RequestParam 사용
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const marketDetailDB = (market) => {
  console.log(market)
  return new Promise((resolve, reject) => {
    try {
      // axios 비동기요청 처리(ajax - fetch[브라우저, 클라이언트사이드] - axios[NodeJS-오라클 서버연동, 서버사이드])
      const response = axios({ // 3000번 서버에서 8000서버로 요청함 - 네트워크(다른서버-CORS이슈, 지연발생)
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "market/marketDetail",
        params: market, // 스프링 부트와 연동시 @RequestParam 사용
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
