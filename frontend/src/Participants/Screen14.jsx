import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"], // Use default transports
});

function Screen14() {
  let { pnumber, condition, currentround } = useParams();
  const [effortlevel, setEffortlevel] = useState();
  const [showFC, setShowFc] = useState(false);
  const [showSC, setShowSC] = useState(false);
  const [showPre, setShowPre] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [error, setError] = useState("");
  if (currentround == 0) {
    currentround = "Practice Round";
  }
  const navigate = useNavigate();
  const handleInp = (e) => {
    const newValue = e.target.value;

    // Validate the input
    if (
      newValue === "" ||
      (isValidIncrement(newValue) && isInRange(newValue))
    ) {
      setEffortlevel(newValue);
      setError(""); // Clear any existing error
    } else {
      setError("Please enter a number between .1 and 1.0 in .1 increments.");
    }
  };

  const isValidIncrement = (value) => {
    const numberValue = parseFloat(value);
    // Check if the number is a multiple of 0.1
    return (
      Number.isFinite(numberValue) && Math.abs((numberValue * 10) % 1) < 1e-8
    );
  };

  const isInRange = (value) => {
    const numberValue = parseFloat(value);
    return numberValue >= 0.1 && numberValue <= 1.0;
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
    verifyUser();
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

  const apicall = async () => {
    try {
      const x = await axios.post(
        "http://localhost:5000/generate/addeffortlevel",
        { pnumber, currentround, effortlevel },
        {
          withCredentials: true,
        }
      );
      console.log(82, x.data);
    } catch (e) {
      console.log("error ", e);
    }
  };
  const clickedNext = async () => {
    try {
      await apicall();

      if (condition == "Pre-Tip") {
        navigate(`/waiting/${pnumber}/${condition}/${currentround}`);
        const categoryRes = await axios.post(
          "http://localhost:5000/generate/getassignedcategory",
          { pnumber },
          { withCredentials: true }
        );
        if (categoryRes.data.assignedCategory === "Worker") {
          navigate(`/screen17/${pnumber}/${condition}/${currentround}`);
        }
        socket.emit("nextto18");
      }
      if (condition == "Post-Tip") {
        navigate(`/waiting/${pnumber}/${condition}/${currentround}`);
        socket.emit("nextto15post", { currentPnumber: pnumber });
      }
      if (condition == "Service Charge" || condition == "Fixed Condition") {
        try {
          await axios.post('http://localhost:5000/generate/matchpnumber', { pnumber, currentround }, { withCredentials: true })
          .then((res)=>{
            console.log(120, res)
            navigate(`/screen17/${pnumber}/${condition}/${currentround}`);
            socket.emit("nextto15normal", {
              currentScreen: "screen14",
              participant:res.data.participant
            });
          })
        } catch (res) {
          console.error('Error in matchpnumber API call:', res.response ? res.response.data : res.message);
        }
      }
      console.log(104, "emitted");
    } catch (error) {
      console.error("Error in API call:", error);
    }
  };

  return (
    <>
      <div
        style={{
          height: "100%",
          backgroundColor: "black",
          color: "#6AD4DD",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
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
            WORKER EFFORT CHOICE &nbsp;|&nbsp; {currentround}
            <div
              style={{
                fontSize: "1.2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                paddingTop: "2rem",
                color: "#6AD4DD",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "800",
                  color: "aliceblue",
                }}
              >
                {" "}
                Your Task
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.4rem",
                }}
              >
                <div>
                  Possible effort levels and their associated costs are shown in
                  the table below.{" "}
                </div>
                <div>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      textAlign: "center",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          border: "1px solid aliceblue",
                          padding: "1rem",
                        }}
                      >
                        <th>Effort Level</th>
                        <th>0.1</th>
                        <th>0.2</th>
                        <th>0.3</th>
                        <th>0.4</th>
                        <th>0.5</th>
                        <th>0.6</th>
                        <th>0.7</th>
                        <th>0.8</th>
                        <th>0.9</th>
                        <th>1.0</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        style={{
                          border: "1px solid aliceblue",
                          padding: "1rem",
                        }}
                      >
                        <td>Cost (Tokens)</td>
                        <td>0</td>
                        <td>
                          <i>5</i>
                        </td>
                        <td>10</td>
                        <td>20</td>
                        <td>30</td>
                        <td>40</td>
                        <td>50</td>
                        <td>60</td>
                        <td>75</td>
                        <td>90</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  Importantly,{" "}
                  <b>
                    Customers’ level of satisfaction with your service increases
                    with your effort level.
                  </b>{" "}
                  The higher the effort level you choose, the <b>higher</b> the
                  Customers’ level of satisfaction. At the end of this study,
                  Customers’ satisfaction will determine their compensation. The
                  higher the Customers’ satisfaction, the higher the
                  compensation they will receive.
                </div>
              </div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "800",
                  color: "aliceblue",
                }}
              >
                Compensation
              </div>
              <div>
                As Worker, recall, your compensation in this round is calculated
                as follows:
              </div>
              {showFC && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    Compensation = Wage Paid by the Restaurant – Cost of Effort
                    Level
                  </div>
                  <div>
                    In each round, you will be paid{" "}
                    <b>a fixed wage of 200 tokens</b>
                    by the restaurant. Please note that this fixed wage is
                    <b>higher</b> than the standard wage at similar restaurants.
                    As a result, Customers will{" "}
                    <b>
                      <i>not</i>
                    </b>{" "}
                    pay you additional compensation for serving them.
                  </div>
                  <div>
                    Suppose you choose an effort level of 0.6. The compensation
                    for you in this round will be 200 – 40 = 160 tokens.
                  </div>
                </div>
              )}
              {showSC && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    Compensation = Wage Paid by the Restaurant + Service Charge
                    – Cost of Effort Level
                  </div>
                  <div>
                    In each round, you will be paid{" "}
                    <b>a fixed wage of 160 tokens</b>
                    by the restaurant. Please note that this fixed wage is the
                    <b>standard</b> wage paid at similar restaurants. In
                    addition, Customers pay you a <b>service charge</b> of{" "}
                    <b>40 tokens</b> for serving them, which you receive as
                    additional compensation.{" "}
                  </div>
                  <div>
                    Please note that Customers will pay you a <b>fixed</b>{" "}
                    amount of 40 tokens in each round, regardless of how you
                    serve them.
                  </div>
                  <div>
                    For example, suppose you choose an effort level of 0.6. The
                    compensation for you in this round will be 160 + 40 – 40 =
                    160 tokens.{" "}
                  </div>
                </div>
              )}
              {showPre && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    Compensation = Wage Paid by the Restaurant + Customer Tip –
                    Cost of Effort Level
                  </div>
                  <div>
                    In each round, you will be paid{" "}
                    <b>a fixed wage of 160 tokens</b>
                    by the restaurant. Please note that this fixed wage is the
                    <b>standard</b> wage paid at similar restaurants. In
                    addition, Customers pay you <b>tips</b> for serving them,
                    which you receive as additional compensation.{" "}
                  </div>
                  <div>
                    Please note that Customers will decide how much to tip you
                    in each round. The amount of tip can range from{" "}
                    <b>zero up to 80 tokens.</b> That is, Customers can tip
                    nothing, can tip a maximum of 80 tokens, or can tip anywhere
                    in between. Importantly, Customers tip you <b>before</b> you
                    serve them.{" "}
                  </div>
                </div>
              )}
              {showPost && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    Compensation = Wage Paid by the Restaurant + Customer Tip –
                    Cost of Effort Level
                  </div>
                  <div>
                    In each round, you will be paid{" "}
                    <b>a fixed wage of 160 tokens</b>
                    by the restaurant. Please note that this fixed wage is the
                    <b>standard</b> wage paid at similar restaurants. In
                    addition, Customers pay you <b>tips</b> for serving them,
                    which you receive as additional compensation.
                  </div>
                  <div>
                    In each round, you will be paid a fixed wage of 160 tokens
                    by the restaurant. Please note that this fixed wage is the
                    standard wage paid at similar restaurants. In addition,
                    Customers pay you tips for serving them, which you receive
                    as additional compensation. Please note that Customers will
                    decide how much to tip you in each round. The amount of tip
                    can range from <b>zero up to 80 tokens.</b> That is,
                    Customers can tip nothing, can tip a maximum of 80 tokens,
                    or can tip anywhere in between. Importantly, Customers tip
                    you <b>after</b>
                    you serve them.
                  </div>
                  <div>
                    For example, suppose you choose an effort level of 0.6, and
                    then the Customer you are paired with decides to tip X
                    tokens. The compensation for you in this round will be 160 +
                    X – 40 tokens.
                  </div>
                </div>
              )}
              {showPre && (
                <div>
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "800",
                      color: "aliceblue",
                    }}
                  >
                    Tip from Customer
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      In this round, the Customer that you are paired with has
                      chosen to tip you:
                    </div>
                    <div>Tip Paid to the Worker: </div>
                  </div>
                </div>
              )}
              <div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "800",
                    color: "aliceblue",
                    paddingBottom: "1rem",
                  }}
                >
                  Choice of Effort Level
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem",
                  }}
                >
                  <div>
                    As a Worker, you can choose an effort level between 0.1 and
                    1.0 (inclusive).{" "}
                  </div>
                  <div>Please make your choice: </div>
                  <div style={{ color: "aliceblue" }}>
                    How much do you want to tip the Worker for their service?
                  </div>
                  <div>
                    <input
                      style={{
                        width: "7rem",
                        border: "none",
                        outline: "none",
                        backgroundColor: "transparent",
                        padding: "0.5rem",
                        fontSize: "1rem",
                        color: "aliceblue",
                        borderBottom: "1px solid #6AD4DD",
                      }}
                      type="number"
                      placeholder="Enter Effort level"
                      name="effortlevel"
                      value={effortlevel}
                      onChange={handleInp}
                    />
                    {error && (
                      <div style={{ color: "red", marginTop: "0.5rem" }}>
                        {error}
                      </div>
                    )}
                  </div>
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

export default Screen14;
