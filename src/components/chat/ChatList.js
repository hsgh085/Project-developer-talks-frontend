import axios from "axios";
import { ROOT_API } from "constants/api";
import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import "./chat.scss";
import { parseJwt } from "hooks/useParseJwt";
import classNames from "classnames";

const ChatList = ({ postId }) => {
  const auth = useSelector((state) => state.authToken);
  const nickname = auth && parseJwt(auth.accessToken).nickname;

  async function getChatList() {
    const { data } = await axios.get(`${ROOT_API}/${postId}/chats`, {
      params: { page: 0, size: 10 },
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": auth.accessToken,
      },
    });
    return data;
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["chatList"],
    queryFn: getChatList,
  });

  console.log("data", data && data.content);

  return (
    <div className="chat_list">
      {data &&
        data.content &&
        data.content.map((item, i) => (
          <div
            key={i}
            className={classNames("chat-item", {
              "is-my": nickname === item.sender,
            })}
          >
            {nickname !== item.sender && <span className="sender">{item.sender}&nbsp; : &nbsp;</span>}
            <span className="message">{item.message.replaceAll('"', "")}</span>
            <span className="createDate">{item.createDate}</span>
          </div>
        ))}
    </div>
  );
};

export default ChatList;
