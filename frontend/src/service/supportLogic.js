import axios from "axios";

/* 1대1문의글 전체 목록 조회 */
export const InquiryListDB = (support) => {
  console.log(support)
  return new Promise((resolve, reject) => {
    try {
      // axios 비동기요청 처리(ajax - fetch[브라우저, 클라이언트사이드] - axios[NodeJS-오라클 서버연동, 서버사이드])
      const response = axios({ // 3000번 서버에서 8000서버로 요청함 - 네트워크(다른서버-CORS이슈, 지연발생)
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "support/inquiryList",
        params: support, // 스프링 부트와 연동시 @RequestParam 사용
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 1대1문의글 상세보기 */
export const InquiryDetailDB = (support) => {
  console.log(support)
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "support/inquiryDetail",
        params: support,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 1대1문의글 글쓰기 */
export const inquiryInsertDB = (support) => {
  console.log(support)
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "support/inquiryInsert",
        data: support,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 1대1문의 답글쓰기 */
export const answerInsertDB = (support) => {
  console.log(support)
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "support/answerInsert",
        data: support,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 1대1문의글 글 수정 */
export const InquiryUpdateDB = (support) => {
  console.log(support)
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "support/inquiryUpdate",
        data: support,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 1대1문의글 사진 업로드 */
export const qUploadImageDB = (file) => {
  console.log(file);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "support/uploadImage",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        processData: false,
        contentType: false,
        data: file, // 스프링 부트와 연동시 @RequestBody 사용
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

/* 커뮤니티 글 삭제 */
export const InquiryDeleteDB = (support) => {
  console.log(support)
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "support/inquiryDelete",
        data: support,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

