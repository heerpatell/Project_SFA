import React,{useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Screen5() {
const {pnumber} = useParams()
const {condition} = useParams()
const navigate = useNavigate()

const [showFC, setShowFc] = useState(false)
const [showSC, setShowSC] = useState(false)
const [showPre, setShowPre] = useState(false)
const [showPost, setShowPost] = useState(false)

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
    if(condition === 'Fixed Condition'){
      setShowFc(true)
    }
    if(condition === 'Service Charge'){
        setShowSC(true)
    }
    if(condition === 'Pre-Tip'){
        setShowPre(true)
    }
    if(condition === 'Post-Tip'){
        setShowPost(true)
    }
  },[])

  const clickedNext = () => {
    navigate(`/screen7/${pnumber}/${condition}`) 
  }

  return (
    <>
      <div
        style={{
          backgroundColor: "black",
          padding:'3.5rem',
          color: "#6AD4DD",
          display: "flex",
            flexDirection: "column",
            justifyContent:'center',
            alignItems:'center',
        }}
      >
        <div
          style={{
            width:'40rem',
            display: "flex",
            flexDirection: "column",
            gap:'1.4rem'
          }}
        >
            <div style={{
              color: "aliceblue",
              textAlign:'center',
              fontSize:'1.5rem'
            }}><u>CUSTOMER PAYOFF</u></div>
            <div style={{
              fontSize:'1.2rem'
            }}>
              <div style={{color:'aliceblue', fontSize:'1.3rem', paddingBottom:'1rem'}}>Payoff</div>
              <div>As a Customer, your payoff in each round is calculated as follows:</div>
            </div>
            
            <div style={{
              fontSize:'1.2rem',
              display:'flex',
              flexDirection:'column',
              gap:'1.3rem'
            }}>
                {
                    showFC && (
                        <div style={{
                          fontSize:'1.2rem',
                          display:'flex',
                          flexDirection:'column',
                          gap:'1rem'
                        }}>
                            <div>Payoff = 60 + Satisfaction from Worker’s Service</div>
                            <div>where, Satisfaction from Worker’s Service = Worker Effort Level * 200</div>
                            <div>In each round, your payoff is determined by your level of satisfaction with the Worker’s service, which is determined by the Worker’s effort level. That is, the higher the effort level the Worker chooses to serve you, the higher your level of satisfaction with the Worker’s service. </div>
                            <div>For example, suppose the Worker you are paired with chooses an effort level of 0.6. The payoff for you in this round will be 60 + 0.6*200 = 180 tokens. </div>
                        </div>
                    )
                }
                {
                    showSC && (
                        <div style={{
                          fontSize:'1.2rem',
                          display:'flex',
                          flexDirection:'column',
                          gap:'1rem'
                        }}>
                            <div>Payoff = 60 + Satisfaction from Worker’s Service – Service Charge Paid to the Worker</div>
                            <div>where, Satisfaction from Worker’s Service = Worker Effort Level * 200, Service Charge Paid to the Worker = 40</div>
                            <div>In each round, your payoff is determined by your level of satisfaction with the Worker’s service minus the service charge paid to the Worker. Your level of satisfaction with the Worker’s service is determined by the Worker’s effort level. That is, the higher the effort level the Worker chooses to serve you, the higher your level of satisfaction with the Worker’s service. </div>
                            <div>Please note that you will pay a fixed amount of service charge of 40 tokens to the Worker in each round, regardless of how the Worker serves you.</div>
                            <div>For example, suppose the Worker you are paired with chooses an effort level of 0.6. The payoff for you in this round will be 60 + 0.6*200 – 40 = 140 tokens. </div>
                        </div>
                    )
                }
                {
                    showPre && (
                        <div style={{
                          fontSize:'1.2rem',
                          display:'flex',
                          flexDirection:'column',
                          gap:'1rem'
                        }}>
                            <div>Payoff = 60 + Satisfaction from Worker’s Service – Tip Paid to the Worker</div>
                            <div>where, Satisfaction from Worker’s Service = Worker Effort Level * 200</div>
                            <div>In each round, your payoff is determined by your level of satisfaction with the Worker’s service minus the tip paid to the Worker. Your level of satisfaction with the Worker’s service is determined by the Worker’s effort level. That is, the higher the effort level the Worker chooses to serve you, the higher your level of satisfaction with the Worker’s service. </div>
                            <div>Please note that you will decide how much to tip the Worker in each round. The amount of tip can range from zero up to 80 tokens. That is, you can tip nothing, can tip a maximum of 80 tokens, or can tip anywhere in between. Importantly, you tip the Worker before he/she serves you. </div>
                            <div>For example, suppose you decide to tip 40 tokens, and then the Worker you are paired with chooses an effort level of 0.6. The payoff for you in this round will be 60 + 0.6*200 – 40 = 140 tokens. </div>                        
                        </div>
                    )
                }
                {
                    showPost && (
                        <div style={{
                          fontSize:'1.2rem',
                          display:'flex',
                          flexDirection:'column',
                          gap:'1rem'
                        }}>
                            <div>Payoff = 60 + Satisfaction from Worker’s Service – Tip Paid to the Worker</div>
                            <div>where, Satisfaction from Worker’s Service = Worker Effort Level * 200</div>
                            <div>In each round, your payoff is determined by your level of satisfaction with the Worker’s service minus the tip paid to the Worker. Your level of satisfaction with the Worker’s service is determined by the Worker’s effort level. That is, the higher the effort level the Worker chooses to serve you, the higher your level of satisfaction with the Worker’s service. </div>
                            <div>Please note that you will decide how much to tip the Worker in each round. The amount of tip can range from zero up to 80 tokens. That is, you can tip nothing, can tip a maximum of 80 tokens, or can tip anywhere in between. Importantly, you tip the Worker after he/she serves you. </div>
                            <div>For example, suppose the Worker you are paired with chooses an effort level of 0.6, and then you decide to tip 40 tokens. The payoff for you in this round will be 60 + 0.6*200 – 40 = 140 tokens. </div> 
                        </div>
                    )
                }

                <div style={{color:'aliceblue'}}><b>Workers’ Cost of Effort and Compensation</b></div>
                <div>Importantly, Workers’ cost of effort increases with their effort levels. The higher the effort levels they choose to serve you, the higher their cost of effort. At the end of this study, Workers’ cost of effort will determine their compensation. The higher the Workers’ cost of effort, the lower the compensation they will receive.</div>
                {
                  showSC && (
                    <div>However, the service charge you pay the Workers increases the Workers’ compensation.</div>
                  )
                }
                {
                  showPre && (
                    <div>However, the tip you pay the Workers increases the Workers’ compensation. The higher the tip, the higher the compensation they will receive.</div>
                  )
                }
                {
                  showPost && (
                    <div>However, the tip you pay the Workers increases the Workers’ compensation. The higher the tip, the higher the compensation they will receive.</div>
                  )
                }
            </div>

            <div style={{
              fontSize:'1.2rem'
            }}>Please click ‘Next’ to continue.</div>
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
                  width: "2rem",
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

export default Screen5;
