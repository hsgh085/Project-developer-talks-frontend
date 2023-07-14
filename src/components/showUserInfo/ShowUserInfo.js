import React from "react";
import s from "./showuserinfo.module.scss";
import { useState } from "react";
import DropDown from "components/dropdown/DropDown";
import MessageForm from "components/message/messageForm/MessageForm";
import classname from "classnames";
import axios from "axios";
import { ROOT_API } from "constants/api";
import { showToast } from "components/toast/showToast";
import { useNavigate } from "react-router-dom";
import MessageModal from "components/portalModal/messagemodal/MessageModal";
// import { useGetPostUser } from "hooks/useGetPostUser";
// import { useEffect } from "react";
const ShowUserInfo = ({ userinfo, type }) => {
  const [datas, setDatas] = useState([]);
  const [modal, setModal] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  let navigate = useNavigate();

  const viewUserInfo = async (e) => {
    axios
      .get(`${ROOT_API}/users/private/${userinfo.nickname}`)
      .then((response) => {
        if (response.data) {
          showToast("success", "😎 유저가 비공개인 상태입니다.");
        } else {
          navigate(`/showuser`, { state: userinfo });
        }
      })
      .catch((error) => {
        console.log('error', error);
        showToast("error", error.response.data.message);
      });
  };

  // const { isLoading: Loading, data: postUserData } = useGetPostUser();
  // useEffect(() => {
  //   if (!Loading && postUserData) {
  //     const postUser = postUserData.content.find((item) => item.id === post.id);
  //     if (postUser) {
  //       console.log(postUser);
  //     } else {
  //       console.log("id 값이 userPostId인 객체를 찾을 수 없습니다.");
  //     }
  //   }
  // }, [Loading, postUserData, post]);

  // console.log("cc", nickname);

  return (
    <>
      <span
        className={classname(`${s.nick} ${type}`, {
          [s.is_detail]: type === "detail",
        })}
        onClick={(e) => {
          e.stopPropagation();
          setDropdown(!dropdown);
        }}
      >
        {userinfo.nickname}
        {dropdown && (
          <DropDown>
            <li onClick={viewUserInfo}>유저정보보기</li>
            <li onClick={() => setModal(!modal)}>쪽지보내기</li>
          </DropDown>
        )}
      </span>
      {modal && (
        <MessageModal setOnModal={() => setModal()}>
          <MessageForm setDatas={setDatas} userinfo={userinfo} setOnModal={() => setModal()} />
        </MessageModal>
      )}
    </>
  );
};

export default ShowUserInfo;
