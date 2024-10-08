import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import "../componentscss/Details.css";

function Details({ match }) {
  const [loading, setLoading] = useState(false);
  const param = `${match.params.exam.replace(/_/g, " ")}`;
  if (typeof window !== "undefined") {
    document.title = param;
  }
  var type = "New_Updates";
  const contains = (param, str) => {
    for (var i = 0; i < param.length; i++) {
      if (param.charAt(i) === str.charAt(0)) {
        if (param.substr(i, str.length) === str) {
          return true;
        }
      }
    }
  };
  if (contains(param, "Admit")) {
    type = "Admit_Card";
  } else if (contains(param, "Result")) {
    type = "Result";
  } else {
    type = "New_Updates";
  }
  const [details, setDetails] = useState([{ name: param }]);
  const getDetail = async (name, type) => {
    const res = await fetch("/api/exams/type", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, type: type }),
    });
    return await res.json();
  };
  useEffect(() => {
    if (!loading) {
      getDetail(param, type).then((detail) => {
        if (!detail.message) {
          setDetails(detail);
        }
      });
    }
    return function cleanup() {
      setLoading(true);
      console.log("[log]Cleanup");
    };
  }, []);
  return (
    <>
      <div className="UpdateBox-Container">
        {details.map((detail) => {
          const key = detail._id
            ? detail._id
            : Math.random().toString() + "ABC";
          return (
            <div className="UpdateBox" key={key}>
              <section className="aboutBox">
                <h1>{param}</h1>
              </section>
              <section className="introBox">
                <h1>Intro</h1>
                <p>{detail.intro}</p>
              </section>
              <div className="struct" key={key}>
                <section className="dateBox">
                  <h1>Important Dates</h1>
                  <p>{detail.date}</p>
                </section>
                <section className="feeBox">
                  <h1>Application Fee</h1>
                  <p>{detail.fee}</p>
                </section>
                <section className="eligibilityBox">
                  <h1>Eligibility</h1>
                  <p>{detail.req}</p>
                </section>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}

export default Details;
