import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function Screen6() {
  const { pnumber } = useParams();
  const { condition } = useParams();

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

  const navigate = useNavigate();

  const [showFC, setShowFc] = useState(false);
  const [showSC, setShowSC] = useState(false);
  const [showPre, setShowPre] = useState(false);
  const [showPost, setShowPost] = useState(false);

  const clickedNext = () => {
    navigate(`/screen8/${pnumber}/${condition}`)
  }
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
    <div
      style={{
        height: "100%",
        padding:'2rem 0',
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
        <div style={{ color: "aliceblue", textAlign: "center" }}>
          <b>
            <u>WORKER FEEDBACK</u>
          </b>
        </div>

        <div style={{
          display:'flex',
          flexDirection:'column',
          gap:'1.3rem'
        }}>
          {showFC && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div>In each round, <b>after</b> you choose your effort level, you will be informed of your compensation in that round. </div>
            </div>
          )}
          {showSC && <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
          >
              <div>In each round, after you choose your effort level, you will be informed of your compensation in that round. </div>
            </div>}
            {
              showPre && <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.6rem",
              }}
              >
                <div>In each round, before you choose your effort level, you will be informed of how much the Customer you are paired with has chosen to tip you. Then, after you make your choice of effort level, you will be informed of your compensation in that round.</div>
              </div>
            }
            {
              showPost && <div>
                  <div>In each round, after you choose your effort level, you will be informed of how much the Customer you are paired with has chosen to tip you. You will also be informed of your compensation in that round.</div>
                </div>
            }
            <div>Please note that Customers will be informed of your chosen effort levels in each round. However, Customers will not know the cost associated with your effort levels, how much you are paid by the restaurant, or your total compensation. In other words, Customers will <b>only</b> know how much effort you choose to serve them. </div>
             
             <div style={{color:'aliceblue'}}><b>End of Round feedback</b></div>
             <div>At the end of each round, all participants will receive feedback about <b><i>their own compensation</i></b> and <b><i> the individual components</i></b> that are added to the sum of their compensation in that round, as well as their own cumulative compensation up to that round. </div>
             <div>Similarly, at the end of each round, all customers will receive feedback about <b><i>their own payoffs</i></b> and <b><i>the individual components</i></b> that are added to the sum of their payoffs in that round, as well as their own cumulative payoffs up to that round.</div>
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
                  marginTop:'1rem',
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
    </div>
  );
}

export default Screen6;
