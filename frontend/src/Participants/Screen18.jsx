import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'

function Screen18() {
  const navigate = useNavigate()
  let { pnumber, condition,currentround } = useParams();
  const [updatedCurrentRound, setUpdatedCurrentRound] = useState()
  const [showFC, setShowFc] = useState(false);
  const [showSC, setShowSC] = useState(false);
  const [showPre, setShowPre] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [effort, setEffort] = useState()
  const [tip, setTip] = useState(0)

  if(currentround == 0){
    currentround = 'Practice Round'
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
  const getEffort = async() => {
    await axios.post('http://localhost:5000/generate/geteffortlevel',{pnumber, currentround},{
      withCredentials:true
    })
    .then((res)=>{
      // console.log(36, res.data.effort)
      setEffort(res.data.effort)
    })
  }

  const getTip = async () =>{
    await axios.post('http://localhost:5000/generate/gettip',{pnumber, currentround},{
      withCredentials:true
    })
    .then((res)=>{
      console.log(36, res.data.tip)
      setTip(res.data.tip)
    })  
  }
  useEffect(() => {
    getEffort()
    getTip()
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

  const updateRound = () => {
    axios.get('http://localhost:5000/generate/getroundnumber',{
      withCredentials:true
  })
  .then((res)=>{
      setUpdatedCurrentRound(res.data.currentRound+1)
      axios.post('http://localhost:5000/generate/updateroundnumber',{updatedCurrentRound:res.data.currentRound+1},{
          withCredentials:true
      })
      .then((res)=>{
          console.log(36,res.data)    
      })
  })
  }
  const clickedNext = () => {
    if(currentround == 'Practice Round'){
      navigate(`/screen10/${pnumber}/${condition}`);
    }else{
      navigate(`/screen20/${pnumber}/${condition}/${currentround}`)
    }
    updateRound()
  };
  const finalMessageStyle = {
    color: "#FFD700",
    fontSize: "1.5rem",
    marginTop: "1.5rem",
    textAlign: "center",
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
            COMPENSATION OUTCOMES &nbsp;|&nbsp; {currentround}
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
              {currentround === "Practice Round" && (
                <div style={{ padding: "1rem 0" }}>
                  Please note that this round is for PRACTICE ONLY and will NOT
                  be paid.
                </div>
              )}
              <div>Your compensation in this round is as follows:</div>

              {
                showFC && <div style={{
                    display:'flex',
                        flexDirection:'column',
                        gap:'1.3rem'
                }}>
                    <div>
                        <div>1. Your base payoff: <span style={{color:'aliceblue'}}>60 tokens</span></div>
                        <div>2. Your satisfaction from Worker’s service: <span style={{color:'aliceblue'}}>{effort*200}</span></div>
                    </div>
                    <div>Your total compensation in this round is: <span style={{color:'aliceblue'}}>{60+(effort*200)} </span></div>
                </div>
              }

              {
                showSC && <div style={{
                    display:'flex',
                        flexDirection:'column',
                        gap:'1.3rem'
                }}>
                    <div>
                        1. Your base payoff: <span style={{color:'aliceblue'}}>60 tokens</span><br/>
                        2. Your satisfaction from Worker’s service: <span style={{color:'aliceblue'}}>{effort*200}</span><br/>
                        3. Service charge paid to the Worker: <span style={{color:'aliceblue'}}> 40 tokens</span>
                    </div>
                    <div>Your total compensation in this round is: <span style={{color:'aliceblue'}}>{60+(effort*200)-40} </span></div>
                </div>
              }
              {
                (showPre || showPost) && <div style={{
                    display:'flex',
                    flexDirection:'column',
                    gap:'1.3rem'
                }}>
                   <div>
                   1. Your base payoff: <span style={{color:'aliceblue'}}>60 tokens </span><br/>
                   2. Your satisfaction from Worker’s service: <span style={{color:'aliceblue'}}>{effort*200} tokens </span><br/>
                   3. Tip paid to the Worker: <span style={{color:'aliceblue'}}>{tip}</span> tokens.
                   </div>

                   <div>Your total compensation in this round is: <span style={{color:'aliceblue'}}>200 tokens </span></div>
                  </div>
              }
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
              {/* {
                currentround == 'Practice Round' &&
                <div style={finalMessageStyle}>Lets go for actual rounds!</div> 
              }   */}
        </div>
      </div>
    </>
  );
}

export default Screen18;
