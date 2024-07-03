import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";
function Footer() {
  return (
    <>
      <footer className="footer bg-light">
        <Container>
          <Row>
            <Col className="text-Center py-3">
              <p className="fs-5">
                Developed by{" "}
                <a href="https://github.com/kedarsingh10">Kedarsingh Chhetri</a>{" "}
                on GitHub
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
