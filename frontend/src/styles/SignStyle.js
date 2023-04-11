import { Link } from "react-router-dom";
import styled from "styled-components";

export const SignDiv = styled.section`
  max-width: 1344px;
  padding: 10rem;
  display: flex;
  justify-content: center;
  margin: auto;
  margin-top: 15em;
  margin-bottom: 6em;
  position: relative;
`;
export const LoginFormBlock = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  letter-spacing: -1px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin: auto;
  @media screen and (max-width: 767px) {
    top: 50%;
  }

  p {
    text-align: center;
    width: 100%;
    margin-top: 0.8rem;
    font-size: 0.9rem;
    color: gray;
    &:last-child {
      color: black;
      padding-top: 1.8rem;
      border-top: 1px solid gray;
      letter-spacing: 0;
    }
  }
  overflow-x: hidden;
`;

export const LogoBlock = styled(Link)`
  text-decoration-line: none;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 50px;
    border-radius: 8px;
    margin-right: 0.7rem;
  }
  span {
    font-family: "Jal_Onuel";
    font-size: 2rem;
    letter-spacing: -3px;
  }
`;

export const LoginBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  input {
    height: 50px;
    border: 1px solid lightgray;
    padding: 0 1rem;
    font-size: 1rem;
    &::placeholder {
      color: gray;
    }
    &:focus {
      outline: none;
      border: 1px solid #4996f3;
    }
    &:hover {
      background: #fafafa;
      transition: 0.5s;
    }
  }
  .email {
    border-radius: 5px 5px 0 0;
  }
  .password {
    border-radius: 0 0 5px 5px;
    border-top: none;
  }
  button {
    margin-top: 1.3rem;
    background-color: #4996f3;
    border: none;
    border-radius: 5px;
    color: white;
    height: 53px;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    &:hover {
      background: dark-blue;
    }
  }
  .smallButton {
    margin: 1rem auto;
    font-size: 0.8rem;
    cursor: pointer;
    span:first-child {
      margin-right: 1rem;
    }
  }
`;

export const SocialBlock = styled.div`
  margin: 0.8rem auto;
  span {
    font-size: 0.8rem;
    color: gray;
    margin: 0 auto;
    text-align: center;
  }
  .socialButton {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    img {
      width: 50px;
      height: 53px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
`;

export const SignUpBlock = styled.form`
  width: 350px;
  display: flex;
  flex-direction: column;
  letter-spacing: -1px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin: auto;
  @media screen and (max-width: 767px) {
    top: 50%;
  }

  hr {
    color: gray;
  }
  h6 {
    font-weight: 700;
    margin-top : 1.5rem;
    margin-bottom : 0.8rem;
  }
  overflow-x: hidden;
`;

export const EmailBlock = styled.div`
  margin: 0 auto;
  input {
    width: 46%;
    height: 35px;
    font-size: 14px;
    border: 1.5px solid lightgray;
    border-radius: 5%;
    &:focus {
      outline: none;
      border: 1px solid #4996f3;
    }
  }
  span {
    color : lightgray;
  }
  select {
    width: 47%;
    height: 35px;
    font-size: 14px;
    color: gray;
    border: 1px solid lightgray;
    border-radius: 5%;
    &:focus {
      outline: none;
      border: 1px solid #4996f3;
    }
  }
  button{
  margin-top : 0.8rem;
  border-radius: 5px;
  height: 45px;
  width : 100%;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  }
`;

export const PasswordBlock = styled.div`
p {
  width: 100%;
  font-size: 0.9rem;
}

input{
  width : 100%;

}
`