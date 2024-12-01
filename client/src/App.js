import { Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar.js";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";
import PostDetails from "./components/PostDetails/PostDetails.jsx";
const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" exact Component={() => <Navigate to="/posts" />} />
          <Route path="/posts" exact Component={Home} />
          <Route path="/posts/search" exact Component={Home} />
          <Route path="/posts/:id" Component={PostDetails} />
          <Route
            path="/auth"
            exact
            Component={() => (!user ? <Auth /> : <Navigate to="/posts" />)}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
