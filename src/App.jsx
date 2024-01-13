import React from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Video2PDFConverter from "./components/Video2PDFConverter";

import "./App.css";

const App = () => {
  return (
    <>
      <Header />
      <Video2PDFConverter />
      <Footer />
    </>
  );
};

export default App;
