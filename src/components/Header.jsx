import React from "react";

const Header = () => (
  <header
    onClick={() => {
      window.location.href = "/";
    }}
    style={{
      width: "100%",
      color: "white",
      backgroundColor: "rgb(255, 66, 3)",
      textAlign: "center",
      fontSize: "2.4em",
      fontWeight: "700",
      padding: "0.6em",
    }}
  >
    VidSlide
  </header>
);

export default Header;
