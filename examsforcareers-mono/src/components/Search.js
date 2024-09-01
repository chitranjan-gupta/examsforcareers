import React, { useState, useEffect } from "react";
import PageNumber from "./PageNumber";
import Disclaimer from "./Disclaimer";
import { NavLink } from "react-router-dom";

function Search({ match }) {
  const [loading, setLoading] = useState(false);
  const searchWord = `${match.params.exam.replace(/_/g, " ")}`;
  if (typeof window !== "undefined") {
    document.title = searchWord;
  }
  const [relevant, setRelevant] = useState([]);
  const getResult = async (e) => {
    const res = await fetch("/api/exams/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ abbreviation: searchWord }),
    });
    return await res.json();
  };
  useEffect(() => {
    if (!loading) {
      getResult(searchWord).then((rel) => {
        setRelevant(rel);
      });
    }
    return function cleanup() {
      setLoading(true);
      console.log("[log]Cleanup");
    };
  }, []);
  return (
    <>
      <h3>You have search for {searchWord}</h3>
      <div className="card-container">
        {relevant.map((exam) => {
          return (
            <div className="card" key={exam.id}>
              <h1>
                <NavLink
                  exact
                  to={`/${exam.categoryBase.replace(
                    / /g,
                    "_"
                  )}/${exam.abbreviation.replace(/ /g, "_")}`}
                >
                  {exam.abbreviation}
                </NavLink>
              </h1>
            </div>
          );
        })}
      </div>
      <PageNumber />
      <Disclaimer />
    </>
  );
}

export default Search;
