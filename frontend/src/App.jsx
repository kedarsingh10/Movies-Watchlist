import React from "react";
import Header from "./components/Header/Header";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <div className="App">
        <Header />
        <main className="py-3">
          <Container>
            <Outlet />
          </Container>
        </main>
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
