import axios from 'axios'
import React,{useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

function Screen2() {
  const [numOfRounds, setNoOfRounds] = useState(0)
  const navigate = useNavigate()
  const {pnumber} = useParams()

  const clickedNext = () => {
    navigate(`/screen3/${pnumber}`)
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
    axios.get("http://localhost:5000/generate/getrounds",{
      withCredentials:true
    })
    .then((res)=>{
      if(res.data.msg === 'positive'){
        console.log(20, res.data.sessionObj)
        setNoOfRounds([res.data.sessionObj.no_of_rounds])
      }
    })
    .catch(error => {
      console.log(error)
    });

  },[])
  return (
    <>
    <div>
        <div style={{
          backgroundColor:'black',
          height:'100vh',
          padding:'2rem 0',
          color:'#6AD4DD',
            display:'flex',
            justifyContent:'center',
            fontSize:'1.3rem',
            alignItems:'center',
            height:'100%',
            textAlign:'justify'
          }}>
          <div style={{
            width:'45rem',
            display:'flex',
            flexDirection:'column',
            gap:'1rem',
          }}>
            <div style={{textAlign:'center', fontSize:'2rem', marginBottom:'1rem'}}>Background</div>
            <div style={{fontSize:'1.5rem', color:'aliceblue'}}>Role</div>
            <div>Imagine a restaurant situated in a typical urban setting. The restaurant attracts customers with diverse needs and preferences, so the menu has a wide variety of options. </div>
            <div>In this restaurant setting, you will be randomly assigned the role of <u><b>Worker</b></u> or <u><b>Customer</b></u>. </div>
            <div>Your role will remain <b>unchanged</b> throughout the study. </div>
            <div style={{fontSize:'1.5rem', color:'aliceblue'}}>Rounds and Dyads</div>     
            <div>There will be {numOfRounds} rounds in this study</div>  
            <div>In each round, you will be randomly paired with another participant to form a Customer-Worker dyad. You will be randomly paired with a <b>different</b> participant to form a <b>new</b> Customer-Worker dyad after each round. </div>      
            <div>That is, if you are a Customer, then you will be paired with a Worker. If you are a Worker, then you will be paired with a Customer.</div>
            <div style={{fontSize:'1.5rem', color:'aliceblue'}}>Earnings</div>
            <div>During this study, your earnings will be paid in ‘tokens’ that will be converted to Canadian Dollars when you exit. Specifically, you will earn tokens based on your decisions and the decisions of the other participants you are paired with in each round. Your compensation depends on the total amount of tokens you <b>earn over all rounds</b>. At the end of the study, we will convert your tokens into actual Canadian Dollars at the rate of <b>100 tokens = $0.90 CND</b>. Thus, the more tokens you earn in each round, the more money you will receive at the end of the study.</div>
            <div>Please click ‘Next’ to continue.</div>
            <div style={{
              display:'flex',
              justifyContent:'center'
            }}>
            <div style={{
              backgroundColor:'aliceblue',
              color:'black',
              width:'2rem',
              padding:'1rem',
              borderRadius:'0.2rem',
              cursor:'pointer'
            }}
            onClick={clickedNext}>Next</div>
          </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Screen2