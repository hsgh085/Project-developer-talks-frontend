import axios from "axios";
import { ROOT_API } from "constants/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import s from "./boardDetail.module.scss";
import BoardReply from "components/boardReply/BoardReply";
import { useSelector } from "react-redux";
import Editor from "components/editor/Editor";
import { parseJwt } from "hooks/useParseJwt";

const BoardDetail = ({ type }) => {
  const { postId } = useParams();
  const navigate=useNavigate();
  const auth = useSelector((state) => state.authToken);
  const [post, setPost] = useState([]);
  let nickname = "";

  if (auth.accessToken !== null) {
    nickname = parseJwt(auth.accessToken).nickname;
  }

  useEffect(() => {
    axios
      .get(`${ROOT_API}/${type}/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then((res) => setPost(res.data))
      .catch((error) => console.log(error));
  }, []);

  // TODO: 백엔드 통신: 답변 가져오기
  const editPost = () => {
    // axios
    //   .put(`${ROOT_API}/${type}/${postId}`, {
    //     body: {},
    //     headers: {
    //       "Content-Type": "application/json",
    //       "X-AUTH-TOKEN": auth.accessToken,
    //     },
    //   })
    //   .then((res) => setPost(res.data))
    //   .catch((error) => console.log(error));
  };

  const deletePost = () => {
    axios
      .delete(`${ROOT_API}/${type}/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": auth.accessToken,
        },
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  const clickUpdate=()=>{
    navigate(`/${type==='post'?'board':'qna'}/update/${post.id}`,{state:{title:post.title, content:post.content}})
  }
  return (
    <>
      <div className={s.container}>
        <header>
          <span className={s.nick}>{post.nickname}</span>
          <div className={s.info}>
            <span>{post.createDate} •</span>
            <span>👁️‍🗨️{post.viewCount}</span>
          </div>
          {nickname === post.nickname && (
            <div>
              <button onClick={clickUpdate}>수정</button>
              <button onClick={deletePost}>삭제</button>
            </div>
          )}
        </header>
        <main>
          <span className={s.title}>{post.title}</span>
          {/* TODO: content 내용 이슈 */}
          <div
            className={s.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </main>
        <div className={s.notice_reply}>
          <span className={s.title}>답변 0</span>
          <Editor />
          <button>작성</button>
          <ul className={s.replies}>
            <BoardReply type={type} />
          </ul>
        </div>
      </div>
    </>
  );
};

export default BoardDetail;
