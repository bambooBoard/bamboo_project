import { LoginBlock, LoginFormBlock, LogoBlock, SignDiv, SocialBlock } from "../../styles/SignStyle";
import { Logo } from "../../styles/FormStyle";
import { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  body{
    background-color : #fafafa
  }
`


const SignIn = () => {
  const navigate = useNavigate()
  return (
    <>
    <GlobalStyle/ >
      <SignDiv>
      <LoginFormBlock>
        <LogoBlock to="/">
          <Logo>오늘의 여행</Logo>
        </LogoBlock>
        <LoginBlock>
          <input className="email" type="text" placeholder="이메일" />
          <input className="password" type="password" placeholder="비밀번호" />
          <button>로그인</button>
          <div className="smallButton">
            <span onClick={()=>navigate("/findEmail")}>비밀번호 재설정</span>
            <span onClick={()=>navigate("/signup")}>회원가입</span>
          </div>
        </LoginBlock>
        <SocialBlock>
          <span>SNS계정으로 간편 로그인/회원가입</span>
          <div className="socialButton">
          <img src="images/google-icon.png" alt="구글" />
          <img src="images/kakao-icon.png" alt="네이버" />
          <img src="images/naver-icon.png" alt="카카오" />
          </div>
        </SocialBlock>
        <p>로그인에 문제가 있으신가요?</p>
      </LoginFormBlock>
      </SignDiv>
    </>
  );
};

export default SignIn;