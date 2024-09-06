import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function Screen15() {
  const navigate = useNavigate();
  let { pnumber, condition, currentround } = useParams();
  const [showFC, setShowFc] = useState(false);
  const [showSC, setShowSC] = useState(false);
  const [showPre, setShowPre] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [effort, setEffort] = useState();
  if (currentround == 0) {
    currentround = "Practice Round";
  }
  const getEffortlevel = () => {
    axios
      .post(
        "http://localhost:5000/generate/geteffortlevel",
        { pnumber, currentround },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(36, res.data.effort);
        setEffort(res.data.effort);
      });
  };
  const verifyUser = () => {
    axios
      .get("http://localhost:5000/generate/getlink", {
        withCredentials: true,
      })
      .then(async(res) => {
        console.log(21, res.data);
        await getEffortlevel();
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

  const clickedNext = () => {
    if (condition === "Post-Tip") {
      navigate(`/screen16/${pnumber}/${condition}/${currentround}`);
    } else {
      navigate(`/screen18/${pnumber}/${condition}/${currentround}`);
    }
  };

  return (
    <>
      <div
        style={{
          height: "100vh",
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
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            <div style={{ paddingBottom: "1.3rem" }}>
              CUSTOMER TIP &nbsp;|&nbsp; {currentround}
            </div>
            <div
              style={{
                textAlign: "left",
                color: "#6AD4DD",
                fontSize: "1.2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div>
                As Customer, recall, your payoff in this round is calculated as
                follows:{" "}
              </div>
              {showFC && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    Payoff = 60 + Satisfaction from Worker’s Service
                  </div>
                  <div>Where, </div>
                  <div style={{ textAlign: "center" }}>
                    Satisfaction from Worker’s Service = Worker Effort Level *
                    200{" "}
                  </div>
                  <div>
                    In each round, your payoff is determined by your level of
                    satisfaction with the Worker’s service, which in turn is
                    determined by the Worker’s effort level. That is, the higher
                    the effort level the Worker chooses to serve you, the higher
                    your level of satisfaction with the Worker’s service.
                  </div>
                </div>
              )}
              {showSC && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    Payoff = 60 + Satisfaction from Worker’s Service – Service
                    Charge Paid to the Worker
                  </div>
                  <div>Where,</div>
                  <div style={{ textAlign: "center" }}>
                    Satisfaction from Worker’s Service = Worker Effort Level *
                    200
                  </div>
                  <div style={{ textAlign: "center" }}>
                    Service Charge Paid to the Worker = 40
                  </div>
                  <div>
                    In each round, your payoff is determined by your level of
                    satisfaction with the Worker’s service minus the service
                    charge paid to the Worker. Your level of satisfaction with
                    the Worker’s service is determined by the Worker’s effort
                    level. That is, the higher the effort level the Worker
                    chooses to serve you, the higher your level of satisfaction
                    with the Worker’s service.
                  </div>
                  <div>
                    Please note that you will pay a fixed amount of service
                    charge of 40 tokens to the Worker in each round, regardless
                    of how the Worker serves you.
                  </div>
                </div>
              )}
              {showPre && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    Payoff = 60 + Satisfaction from Worker’s Service – Tip Paid
                    to the Worker
                  </div>
                  <div>Where,</div>
                  <div style={{ textAlign: "center" }}>
                    Satisfaction from Worker’s Service = Worker Effort Level *
                    200
                  </div>
                  <div>
                    In each round, your payoff is determined by your level of
                    satisfaction with the Worker’s service minus the tip paid to
                    the Worker. Your level of satisfaction with the Worker’s
                    service is determined by the Worker’s effort level. That is,
                    the higher the effort level the Worker chooses to serve you,
                    the higher your level of satisfaction with the Worker’s
                    service.
                  </div>
                  <div>
                    Please note that you will decide how much to tip the Worker
                    in each round. The amount of tip can range from zero up to
                    80 tokens. That is, you can tip nothing, can tip a maximum
                    of 80 tokens, or can tip anywhere in between. Importantly,
                    you tip the Worker after he/she serves you.
                  </div>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem",
                }}
              >
                <div style={{ color: "aliceblue" }}>Worker Effort Level</div>
                <div>
                  In this round, the Worker that you are paired with has chosen
                  the effort level:
                </div>
                <div>
                  Worker Effort Level:{" "}
                  <span style={{ color: "aliceblue" }}>{effort}</span>
                </div>
              </div>

              <div
                style={{
                  fontSize: "1.2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                Please click ‘Next’ to continue.
              </div>
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
                    width: "2.9rem",
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
      </div>
    </>
  );
}

export default Screen15;
