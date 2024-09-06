import React, { useEffect } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import axios from 'axios';

function Screen9() {
  const navigate = useNavigate()
  const { pnumber, condition } = useParams();
  const clickedNext = async() => {
    await axios.get("http://localhost:5000/generate/getroundnumber",{
      withCredentials:true
    })  
    .then(async(res)=>{
      if(res.data.msg == 'activeAtMoment'){
        console.log(15, res.data)
      }
      console.log(17, res.data.currentRound)
      if(res.data.currentRound == 0){
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
      }else{
        navigate(`/screen10/${pnumber}/${condition}`)  
      }
    })
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
        <div style={{
            width: "40rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.4rem",
            fontSize: "1.4rem",
          }}>
 <div
            style={{
              color: "aliceblue",
              textAlign: "center",
              fontSize: "1.3rem",
            }}
          >
            <b>
              <u>PRACTICE ROUND</u>
            </b>
          </div>
          <div style={{
            display:'flex',
            flexDirection:'column',
            gap:'1.2rem'
          }}>
            <div>You will first have the opportunity to familiarize yourself with the computer interface during a practice round. This round is for practice ONLY and is intended to help you have a better understanding of the study. This round will NOT be paid.</div>
            <div>You will start the practice round on the next page.</div>
          </div>

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
  )
}

export default Screen9