import React, { useEffect, useState } from "react";
import "../componentscss/Open.css";
import iLogo from "../images/logo_main.png";
import Footer from "./Footer";

function Open({ match }) {
  const [loading, setLoading] = useState(false);
  if (typeof window !== "undefined") {
    document.title = `${match.params.exam.replace(/_/g, " ")}`;
  }
  const [details, setDetails] = useState([
    { name: match.params.exam.replace(/_/g, " ") },
  ]);
  const getDetail = async (value) => {
    const res = await fetch("/api/exams/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ abbreviation: value }),
    });
    return await res.json();
  };
  useEffect(() => {
    if (!loading) {
      getDetail(match.params.exam.replace(/_/g, " ")).then((detail) => {
        setDetails(detail);
      });
    }
    return function cleanup() {
      setLoading(true);
      console.log("[log]Cleanup");
    };
  }, []);
  return (
    <>
      <div className="DetailBox-Container">
        {details.map((detail) => {
          const key = detail._id ? detail._id : `ABC${Math.random()}`;
          return (
            <div className="Detail-Container" key={key}>
              <section className="aboutBox">
                <h1>{detail.name}</h1>
                <div className="iLogoBox">
                  <img alt="Exam Logo" src={iLogo} />
                </div>
              </section>
              <section className="introBox">
                <h1>Intro</h1>
                <p>{detail.intro}</p>
                <h1>Abbreviation</h1>
                <p>{detail.abbreviation}</p>
                <h1>Type</h1>
                <p>{detail.type}</p>
                <h1>Duration</h1>
                <p>{detail.duration}</p>
                <h1>Times</h1>
                <p>{detail.times}</p>
                <h1>Prerequisites / Eligibility Criteria</h1>
                <p>{detail.eligibility}</p>
                <h1>Question Language</h1>
                <p>{detail.language}</p>
                <h1>Website</h1>
                <p>
                  <a href={detail.link}>{detail.link}</a>
                </p>
                <h1>Wikipedia</h1>
                <p>
                  <a href={detail.wikipedia}>{detail.wikipedia}</a>
                </p>
              </section>
              <section className="tableBox">
                <h1>Table</h1>
                <div>
                  <h1>Bachelor of Engineering / Bachelor of Technology </h1>
                  <section className="table">
                    <p>Subjects</p>
                    <p>Physics</p>
                    <p>Chemistry</p>
                    <p>Mathematics</p>
                    <p>Marks</p>
                    <p>100</p>
                    <p>100</p>
                    <p>100</p>
                    <p>No of Questions</p>
                    <p>25</p>
                    <p>25</p>
                    <p>25</p>
                    <p>Type</p>
                    <p>Computer Based</p>
                    <p>Computer Based</p>
                    <p>Computer Based</p>
                  </section>
                </div>
                <div>
                  <h1>Bachelor of Architecture</h1>
                  <section className="table">
                    <p>Subjects</p>
                    <p>Mathematics</p>
                    <p>Aptitude Test</p>
                    <p>Drawing Test</p>
                    <p>Marks</p>
                    <p>100</p>
                    <p>100</p>
                    <p>100</p>
                    <p>No of Questions</p>
                    <p>25</p>
                    <p>25</p>
                    <p>25</p>
                    <p>Type</p>
                    <p>Computer Based</p>
                    <p>Computer Based</p>
                    <p>Offline on a drawing sheet</p>
                  </section>
                </div>
                <div>
                  <h1>Bachelor of Planning </h1>
                  <section className="table">
                    <p>Subjects</p>
                    <p>Mathematics</p>
                    <p>Aptitude Test</p>
                    <p>Planning Based On Questions</p>
                    <p>Marks</p>
                    <p>100</p>
                    <p>100</p>
                    <p>100</p>
                    <p>No of Questions</p>
                    <p>25</p>
                    <p>25</p>
                    <p>25</p>
                    <p>Type</p>
                    <p>Computer Based</p>
                    <p>Computer Based</p>
                    <p>Computer Based</p>
                  </section>
                </div>
              </section>
              <section className="dateBox">
                <h1>Important Dates</h1>
                <section className="table">
                  <p>Registration Starting Date</p>
                  <p>{detail.regSdate}</p>
                  <p>Registration Ending Date</p>
                  <p>{detail.regEdate}</p>
                  <p>Last Date Of Fee Payment</p>
                  <p>{detail.lfeedate}</p>
                  <p>Admit Card</p>
                  <p>{detail.admit}</p>
                  <p>Exam Date</p>
                  <p>{detail.examdate}</p>
                </section>
              </section>
              <section className="feeBox">
                <h1>Application Fee</h1>
                <section className="table">
                  <p>General, OBC</p>
                  <p>{detail.genobcfee}</p>
                  <p>SC,ST</p>
                  <p>{detail.scstfee}</p>
                  <p>PH</p>
                  <p>{detail.phfee}</p>
                </section>
              </section>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}

export default Open;
