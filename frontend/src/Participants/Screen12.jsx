import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import io from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ['websocket', 'polling'], // Use default transports
});

function Screen12() {
  let {pnumber,condition,currentround} = useParams()
  const navigate = useNavigate()
  if(currentround == 0){
    currentround = 'Practice Round'
  }
const clickedNext = () => {
  navigate(`/screen13/${pnumber}/${condition}/${currentround}`)
}

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

useEffect(()=>{
  verifyUser()
},[])
  return (
    <>
    <div style={{
          height: "100vh",
          backgroundColor: "black",
          color: "#6AD4DD",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
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
            Customer Tip &nbsp;|&nbsp; {currentround}
          </div>
          <div style={{
            fontSize:'1.2rem',
            display:'flex',
            flexDirection:'column',
            gap:'1rem',
            paddingTop:'2rem'
          }}>
          <div>As Customer, recall, your payoff in this round is calculared as follows: </div>
            <div style={{color:'aliceblue'}}>Payoff = 60 + Satisfaction from Worker's service - Tip paid to the Worker</div>
            <div>where,</div>
            <div style={{color:'aliceblue'}}>Satisfaction from Worker's Service = Worker Effort Level * 200</div>
            <div>In each round, your payoff is determined by your level of satisfaction with the Worker’s service minus the tip paid to the Worker. Your level of satisfaction with the Worker’s service is determined by the Worker’s effort level. That is, the higher the effort level the Worker chooses to serve you, the higher your level of satisfaction with the Worker’s service. 
            </div>
            <div>Please note that you will decide how much to tip the Worker in each round. The amount of tip can range from zero up to 80 tokens. That is, you can tip nothing, can tip a maximum of 80 tokens, or can tip anywhere in between. Importantly, you tip the Worker before he/she serves you. 
            </div>
          </div>

          <div style={{             
            fontSize:'1.2rem',
            display:'flex',
            flexDirection:'column',
            gap:'1rem' }}>
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
  )
}

export default Screen12