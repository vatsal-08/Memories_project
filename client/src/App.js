import { Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";
const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/AUTH" exact Component={Auth} />
        </Routes>
        <Home />
      </Container>
    </BrowserRouter>
  );
};

export default App;
