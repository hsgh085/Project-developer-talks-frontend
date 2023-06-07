import axios from "axios";
import Logout from "components/logout/Logout";
import { ROOT_API } from "constants/api";
import { parseJwt } from "hooks/useParseJwt";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Userside.scss";

const Userside = () => {
  const [isActive, setIsActive] = useState("");
  const [imageFile, setImageFile] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
  };
  const handleClick = (value) => {
    setIsActive(value);
  };
  useEffect(() => {
    axios
      .get(`${ROOT_API}/users/profile/image`, {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then(function (response) {
        console.log("정보 성공:", response);
        // setImageFile(response.data);
      })
      .catch(function (error) {
        console.log("정보:실패 ", error.response);
      });
  }, []);

  const auth = useSelector((state) => state.authToken).accessToken;
  const userinfo = parseJwt(auth);

  const changeProfileImg = (e) => {
    if (e.target.files) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      axios
        .post(`${ROOT_API}/users/profile/image`, formData, {
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
            "X-AUTH-TOKEN": auth.accessToken,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <section className="sidebackground"></section>
      <section className="side">
        <div className="imgwrap">
          <img src={imageFile} alt="" />
          <input type="file" name="" id="" onChange={changeProfileImg} />
        </div>
        <ul className="nav">
          {/* <li>
            <Link to="/introduction" className={isActive ? 'active' : ''} onClick={handleClick}>🎆 내소개</Link>
          </li> */}
          <li>
            <Link to="/mypage" className={isActive === "mypage" ? "is-active" : ""} onClick={() => handleClick("mypage")}>
              🧥 활동내역
            </Link>
          </li>
          <li>
            <Link to="/my-studyroom" className={isActive === "my-studyroom" ? "is-active" : ""} onClick={() => handleClick("my-studyroom")}>
              스터디룸
            </Link>
          </li>
          <li>
            <Link to="/account" className={isActive === "account" ? "is-active" : ""} onClick={() => handleClick("account")}>
              🐹 회원정보수정 및 탈퇴
            </Link>
          </li>
          <li></li>
        </ul>
        <Logout />
      </section>
    </>
  );
};

export default Userside;
