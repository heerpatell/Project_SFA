import React, { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Screen10() {
  const { pnumber, condition } = useParams();
  const navigate = useNavigate();

  const clickedNext = () => {
    axios.get("http://localhost:5000/generate/screen11reachedcountincrease",{
      withCredentials:true
    })  
    .then(async(res)=>{
      if(res.data.msg == 'activeAtMoment'){
        console.log(15, res.data)
      }
      console.log(17, res.data)
      navigate(`/screen11/${pnumber}/${condition}/${res.data.activeatpg11}`);
    })
  };
  const verifyUser = () => {
    axios
      .get("http://localhost:5000/generate/authorize", {
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

  useEffect(()=>{
    verifyUser()
  },[])
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
            Starting Page
          </div>
          <div style={{ fontSize: "1.2rem" }}>
            Let's start!.
          </div>
          <div style={{ fontSize: "1.2rem" }}>
          The first round will be a practice round, followed by the actual rounds. You'll be able to see the round number in the heading.
          </div>

          <div style={{ fontSize: "1.2rem" }}>
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
    </>
  );
}

export default Screen10;
