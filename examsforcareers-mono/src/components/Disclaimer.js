import React from "react";
import Footer from "./Footer";

function Disclaimer() {
  if (typeof window !== "undefined") {
    document.title = "Diclaimer";
  }
  return (
    <>
      <Footer />
    </>
  );
}

export default Disclaimer;
