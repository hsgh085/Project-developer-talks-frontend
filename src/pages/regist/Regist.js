import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./Regist.scss";
import Footer from "../../components/footer/Footer";
import Form from "components/form/Form";
import Header from 'components/header/Header';

const Regist = () => {
  const duplicatedId = ["dddd1", "dddd2"];

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    // axios
    //   .post(`https://url`, {
    //     modelName: data["modelName"],
    //     brand: data["brand"],
    //     price: data["price"],
    //     // size: data["size"],
    //   })
    //   .then(function (response) {
    //     // console.log("dta", response.data);
    //     alert("회원가입 완료");
    //   })
    //   .catch(function (error) {
    //     // 오류발생시 실행
    //   })
    //   .then(function () {
    //     // 항상 실행
    //   });
    console.log("data", data);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onChange" });

  const validateId = (value) => {
    if (duplicatedId.includes(value)) {
      return "중복!!";
    }
  };

  return (
    <div className="regist-page page">
      <Header/>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="form_1">
          <legend>정보입력</legend>
          <h2>Developer-Talks 계정 만들기</h2>
          <p className="chk">*필수사항 입니다.</p>
          <table>
            <thead />
            <tbody>
              <tr>
                <th>
                  <label htmlFor="userEmail">이메일</label>
                  <span className="star" title="필수사항">
                    *
                  </span>
                </th>
                <td>
                  <input
                    type="email"
                    id="userEmail"
                    placeholder="이메일을 입력해주세요"
                    tabIndex="1"
                    aria-invalid={
                      !isDirty ? undefined : errors.userEmail ? "true" : "false"
                    }
                    {...register("userEmail", {
                      required: "이메일은 필수 입력입니다.",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "이메일 형식에 맞지 않습니다.",
                      },
                    })}
                  />
                  {errors.userEmail && (
                    <small role="alert">{errors.userEmail.message}</small>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="userNickname">닉네임</label>
                  <span className="star" title="필수사항">
                    *
                  </span>
                </th>
                <td>
                  <input
                    type="text"
                    id="userNickname"
                    placeholder="닉네임을 입력해주세요"
                    tabIndex="2"
                    maxLength={15}
                    aria-invalid={
                      !isDirty
                        ? undefined
                        : errors.userNickname
                        ? "true"
                        : "false"
                    }
                    {...register("userNickname", {
                      required: "닉네임은 필수 입력입니다.",
                      minLength: {
                        value: 8,
                        message: "8자리 이상 입력해주세요.",
                      },
                    })}
                  />
                  <button title="중복체크">중복체크</button>
                  {errors.userNickname && (
                    <small role="alert">{errors.userNickname.message}</small>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="userId">아이디</label>
                  <span className="star" title="필수사항">
                    *
                  </span>
                </th>
                <td>
                  <input
                    type="text"
                    id="userId"
                    placeholder="아이디를 입력해주세요"
                    maxLength={15}
                    tabIndex="3"
                    aria-invalid={
                      !isDirty ? undefined : errors.userId ? "true" : "false"
                    }
                    {...register("userId", {
                      required: "아이디는 필수 입력입니다.",
                      minLength: {
                        value: 5,
                        message: "5자리 이상 아이디를 사용해주세요.",
                      },
                      maxLength: {
                        value: 15,
                        message: "15자리 이하 아이디를 사용해주세요.",
                      },
                      validate: validateId,
                    })}
                  />
                  <button title="중복체크" onClick={validateId}>
                    중복체크
                  </button>
                  {errors.userId && (
                    <small role="alert">{errors.userId.message}</small>
                  )}
                </td>
              </tr>

              <tr>
                <th>
                  <label htmlFor="password_1">비밀번호</label>
                  <span className="star" title="필수사항">
                    *
                  </span>
                </th>
                <td>
                  <input
                    type="password"
                    id="password_1"
                    placeholder="영문,숫자 조합으로 입력해주세요"
                    maxLength={15}
                    tabIndex="4"
                    aria-invalid={
                      !isDirty
                        ? undefined
                        : errors.password_1
                        ? "true"
                        : "false"
                    }
                    {...register("password_1", {
                      required: "비밀번호는 필수 입력입니다.",
                      minLength: {
                        value: 5,
                        message: "5자리 이상 비밀번호를 사용해주세요.",
                      },
                      maxLength: {
                        value: 15,
                        message: "15자리 이히 비밀번호를 사용해주세요.",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
                        message: "특수문자를 포함해주세요",
                      },
                    })}
                  />
                  {errors.password_1 && (
                    <small role="alert">{errors.password_1.message}</small>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="password_2">비밀번호 확인</label>
                  <span className="star" title="필수사항">
                    *
                  </span>
                </th>
                <td>
                  <input
                    type="password"
                    id="password_2"
                    placeholder="비밀번호를 한 번 더 입력해주세요"
                    tabIndex="5"
                    maxLength={15}
                    aria-invalid={
                      !isDirty
                        ? undefined
                        : errors.password_2
                        ? "true"
                        : "false"
                    }
                    {...register("password_2", {
                      required: "비밀번호는 필수 입력입니다.",
                      minLength: {
                        value: 5,
                        message: "5자리 이상 비밀번호를 사용해주세요.",
                      },
                      maxLength: {
                        value: 15,
                        message: "15자리 이히 비밀번호를 사용해주세요.",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
                        message: "특수문자를 포함해주세요",
                      },
                    })}
                  />
                  {errors.password_2 && (
                    <small role="alert">{errors.password_2.message}</small>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </Form>
      <div className="submit">
        <button type="submit" tabIndex="7" disabled={isSubmitting}>
          {" "}
          가입하기
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Regist;
