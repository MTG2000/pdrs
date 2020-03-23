import React from "react";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <h2>Hello World</h2>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
