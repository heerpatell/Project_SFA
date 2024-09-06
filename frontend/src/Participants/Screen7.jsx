import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function Screen7() {
  const { pnumber } = useParams();
  const { condition } = useParams();

  const navigate = useNavigate();
  const [showFC, setShowFc] = useState(false);
  const [showSC, setShowSC] = useState(false);
  const [showPre, setShowPre] = useState(false);
  const [showPost, setShowPost] = useState(false);

  const clickedNext = () => {
    navigate(`/screen8/${pnumber}/${condition}`);
  };

  const verifyUser = () => {
    axios
      .get("http://localhost:5000/generate/getlink", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(21, res.data);
        if (res.data.msg === "access denied") {
          navigate("/notfound");
        }
      })
      .catch((e) => {
        navigate("/notfound");
      });
  };

  useEffect(() => {
    verifyUser()
    if (condition === "Fixed Condition") {
      setShowFc(true);
    }
    if (condition === "Service Charge") {
      setShowSC(true);
    }
    if (condition === "Pre-Tip") {
      setShowPre(true);
    }
    if (condition === "Post-Tip") {
      setShowPost(true);
    }
  }, []);
  return (
    <>
      <div
        style={{
          height: "max-content",
          padding:'2rem',
          backgroundColor: "black",
          color: "#6AD4DD",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "40rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.4rem",
            fontSize: "1.4rem",
          }}
        >
          <div
            style={{
              color: "aliceblue",
              textAlign: "center",
              fontSize: "1.3rem",
            }}
          >
            <b>
              <u>CUSTOMER FEEDBACK</u>
            </b>
          </div>

          <div>
            {(showFC || showSC) && (
              <div style={{ fontSize: "1.2rem" }}>
                In each round, <b>after</b> the Worker you are paired with chooses their effort level, you will be informed of their chosen effort level. You will also be informed of your payoff in that round. 
              </div>
            )}
            {showPre && (
              <div style={{ fontSize: "1.2rem" }}>
                In each round, before the Worker you are paired with chooses their effort level, you will decide how much to tip the Worker. Then, you will be informed of the Worker’s chosen effort level. You will also be informed of your payoff in that round.
              </div>
            )}
            {showPost && (
              <div style={{ fontSize: "1.2rem" }}>
                In each round, after the Worker you are paired with chooses their effort level, you will be informed of their chosen effort level. Then, you will decide how much to tip the Worker. You will also be informed of your payoff in that round.
              </div>
            )}
          </div>

          <div style={{ fontSize: "1.3rem" }}>
          Please note that Workers will not be informed of your level of satisfaction with their service or your total payoff in each round.  
          </div>
          <div>
            {(showFC || showSC) && (
              <div style={{ fontSize: "1.2rem" }}>
                In each round, after Workers make their choice for effort level,
                Customers will receive feedback about the Worker’s choice of
                effort level. Customers will also be informed of their
                compensation in that round.
              </div>
            )}
            {(showPre || showPost) && (
              <div style={{ fontSize: "1.2rem" }}>
                In each round, after Workers make their choice for effort level,
                Customers will receive feedback about the Worker’s choice of
                effort levels. Customers will also be informed of the amount of
                tokens they chose to tip the Worker, as well as their
                compensation in that round.
              </div>
            )}
          </div>

          <div>Please note that Workers will not be informed of your level of satisfaction with their service or your total payoff in each round.  </div>
          
          {
            showSC && (<div>
              However, Workers will be informed of the amount of the service charge you pay them.
            </div>)
          }
          {
            showPre && (<div>
              However, Workers will be informed of the amount of the tip you pay them.
            </div>)
          }
          {
            showPost && (<div>
              However, Workers will be informed of the amount of the tip you pay them.
            </div>)
          }
          <div style={{ color: "aliceblue", fontSize: "1.3rem"}}>
            End of Round Feedback
          </div>
          <div>At the end of each round, all customers will receive feedback about <b><i>their own payoffs</i></b> and <b><i>the individual components</i></b> that are added to the sum of their payoffs in that round, as well as their own cumulative payoffs up to that round.</div>
          <div>Similarly, at the end of each round, all workers will receive feedback about <b><i>their own compensation</i></b> and <b><i>the individual components</i></b> that are added to the sum of their compensation in that round, as well as their own cumulative compensation up to that round. </div>
          <div>Next, you will take a short quiz to test your comprehension of the instructions. </div>

          <div>Please click ‘Next’ to continue.</div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "aliceblue",
                color: "black",
                marginTop: "1rem",
                padding: "1rem",
                borderRadius: "0.2rem",
                cursor: "pointer",
              }}
              onClick={clickedNext}
            >
              Next
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Screen7;
