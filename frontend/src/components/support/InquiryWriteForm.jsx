import React, { useCallback, useRef, useState } from "react";
import Header from "../include/Header";
import Footer from "../include/Footer";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SQuillEditor from "./SQuillEditor";
import {
  InqCheckDiv,
  InqDiv,
  InquiryH3,
  InquiryP,
  InquirySection,
} from "../../styles/SupportStyle";
import { BsDot } from "react-icons/bs";
import { inquiryInsertDB } from "../../service/supportLogic";
import QCheckbox from "./QCheckbox";
import InquiryRow from "./InquiryRow";

const InquiryWriteForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [isProtected, setIsProtected] = useState(false);
  const quillRef = useRef();

  const handleTitle = useCallback((e) => {
    console.log(e);
    setTitle(e);
  }, []);

  const handleContent = useCallback((value) => {
    console.log(value);
    setContent(value);
  }, []);

  const handleProtected = useCallback((event) => {
    setIsProtected(event.target.checked);
  }, []);

  const handleFiles = useCallback(
    (value) => {
      console.log(value);
      setFiles([...files, value]);
    },
    [files]
  );

  const inquiryInsert = async () => {
    console.log("inquiryInsert");
    console.log(files);
    const inquiry = {
      // user_id: sessionStorage.getItem("user_id"),
      user_id: "user",
      qna_title: title,
      qna_content: content,
      qna_step: 0,
      qna_sort: isProtected ? 4 : 2, // isProtected의 값을 기준으로 qna_sort를 설정합니다
      imageNames: files,
    };
    const res = await inquiryInsertDB(inquiry);
    console.log(res.data);
    navigate("/support/inquiryBoard");
  };

  return (
    <>
      <Header />
      <InquirySection>
        <InquiryH3>1대1 문의</InquiryH3>
        <InquiryP>
          <BsDot /> 문의 답변은 최대 3일까지 소요될 수 있습니다.
          <br />
          <BsDot /> 비밀글로 작성된 문의는 관리자와 작성자 이외에는 열람할 수
          없습니다.
          <br />
          <BsDot /> 작성한 글은 마이페이지에서 작성한 글 목록에서 확인하실 수
          있습니다.
        </InquiryP>
        <InqDiv>
          <input
            type="text"
            id="inquiry_title"
            maxLength="60"
            placeholder="문의 글 제목을 작성해주세요"
            autoComplete="off"
            onChange={(e) => {
              handleTitle(e.target.value);
            }}
          />
          <div className="inqInnerDiv">
            <InqCheckDiv>
              <label>
                <input
                  type="checkbox"
                  checked={isProtected}
                  onChange={handleProtected}
                />
                비밀글
              </label>
            </InqCheckDiv>
            <button
              className="btnInsert"
              onClick={(e) => {
                inquiryInsert();
              }}
            >
              등록
            </button>
          </div>
        </InqDiv>
        <SQuillEditor
          value={content}
          handleContent={handleContent}
          quillRef={quillRef}
          files={files}
          handleFiles={handleFiles}
        />
        <InquiryRow inquiryInsert={inquiryInsert}/>
      </InquirySection>
      <Footer />
    </>
  );
};

export default InquiryWriteForm;
