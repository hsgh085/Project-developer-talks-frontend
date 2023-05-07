import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import NotPage from "pages/NotPage";
import BoardDetail from "pages/board/boardDetail/BoardDetail";
import BoardList from "pages/board/boardList/BoardList";
import BoardPost from "pages/board/boardPost/BoardPost";
import Individual from "pages/individual/Individual";
import Login from "pages/login/Login";
import Main from "pages/main/Main";
import Regist from "pages/regist/Regist";
import { Outlet, Route, Routes } from "react-router-dom";
import "./assets/style/index.scss";
import Mypage from "pages/mypage/Mypage";
import Account from "pages/mypage/Account";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* */}

        <Route path="/" element={<NavigateMain />}>
          <Route index element={<Main />} />
          <Route path="developer-talks-frontend" element={<Main />} />
          <Route path="individual" element={<Individual />} />
          <Route path="mypage" element={<Mypage />} />
          <Route path="account" element={<Account />} />

          <Route path="/board/list" element={<BoardList type="board" />} />
          <Route path="/board/list/:postId" element={<BoardDetail type="board" />} />

          <Route path="/qna/list" element={<BoardList type="qna" />} />
          <Route path="/qna/list/:postId" element={<BoardDetail type="qna" />} />
          <Route path="*" element={<NotPage />} />
        </Route>

        <Route element={<NavigatePost />}>
          <Route path="/board/post" element={<BoardPost />} />
          <Route path="/qna/post" element={<BoardPost type="qna"/>} />
          <Route path="/regist" element={<Regist />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

// 헤더 포함
function NavigateMain() {
  return (
    <>
      <Header />
      <div className="page">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

// 헤더 미포함
function NavigatePost() {
  return (
    <>
      <div className="page">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
