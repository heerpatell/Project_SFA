import React,{useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function Screen17() {
const navigate = useNavigate()
let {condition,pnumber,currentround } = useParams()
const [showFC, setShowFc] = useState(false);
const [showSC, setShowSC] = useState(false);
const [showPre, setShowPre] = useState(false);
const [showPost, setShowPost] = useState(false);
const [effort, setEffort] = useState(0)
const [cost, setCost] = useState()
if(currentround == 'Practice Round}'){
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
  console.log(currentround)
  await axios.post('http://localhost:5000/generate/geteffortlevelworker',{pnumber, currentround},{
    withCredentials:true
  })
  .then((res)=>{
    // console.log(36, res.data.effort)
    setEffort(res.data.effort)
    if(res.data.effort == 0.1) {setCost(0)}
    if(res.data.effort == 0.2) {setCost(5)}
    if(res.data.effort == 0.3) {setCost(10)}
    if(res.data.effort == 0.4) {setCost(20)}
    if(res.data.effort == 0.5) {setCost(30)}
    if(res.data.effort == 0.6) {setCost(40)}
    if(res.data.effort == 0.7) {setCost(50)}
    if(res.data.effort == 0.8) {setCost(60)}
    if(res.data.effort == 0.9) {setCost(75)}
    if(res.data.effort == 1.0) {setCost(90)}
  })
}
useEffect(() => {
  verifyUser()
  getEffort()
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
  if(currentround == 'Practice Round'){
    navigate(`/screen10/${pnumber}/${condition}`);
  }else{
    navigate(`/screen19/${pnumber}/${condition}/${currentround}`)
  }
};

const finalMessageStyle = {
  color: "#FFD700",
  fontSize: "1.5rem",
  marginTop: "1.5rem",
  textAlign: "center",
};

return (
    <>
    <div style={{
          height: "100vh",
          backgroundColor: "black",
          color: "#6AD4DD",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        }}>
        <div style={{
            width: "40rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.4rem",
            fontSize: "1.4rem",
          }}>
            <div style={{
              color: "aliceblue",
              fontSize: "1.5rem",
              textAlign: "center",
            }}>
              COMPENSATION OUTCOMES &nbsp;|&nbsp; {currentround}
              <div style={{
                fontSize: "1.2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                paddingTop: "2rem",
                color: "#6AD4DD",
                textAlign: "left",
              }}>
                {
                    (currentround === 'Practice Round') && <div style={{padding:'1rem 0'}}>
                        Please note that this round is for PRACTICE ONLY and will NOT be paid.
                        </div>
                }
                <div>Your compensation in this round is as follows:</div>
                {
                    showFC && <div style={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'1.3rem'
                    }}>
                       <div>
                       <div>1. Your wage paid by the restaurant: <span style={{color:'aliceblue'}}>200 tokens </span></div>
                       <div>2. Your cost of effort level: <span style={{color:'aliceblue'}}>{cost}</span> tokens.</div>
                       </div>

                       <div>Your total compensation in this round is: <span style={{color:'aliceblue'}}>{200-cost} </span>toekns.</div>
                        </div>
                }
                {
                    showSC && <div style={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'1.3rem'
                    }}>
                       <div>
                       1. Your wage paid by the restaurant: <span style={{color:'aliceblue'}}>160 tokens </span><br/>
                       2. Service charge paid by the Customer: <span style={{color:'aliceblue'}}>40 tokens </span><br/>
                       3. Your cost of effort level: <span style={{color:'aliceblue'}}>{cost}</span> tokens.
                       </div>

                       <div>Your total compensation in this round is: <span style={{color:'aliceblue'}}>{160+40-cost} </span>tokens</div>
                        </div>
                }
                {
                    (showPre || showPost) && <div style={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'1.3rem'
                    }}>
                       <div>
                       1. Your wage paid by the restaurant: <span style={{color:'aliceblue'}}>160 tokens </span><br/>
                       2. Tip paid by the Customer: <span style={{color:'aliceblue'}}>40</span>tokens<br/>
                       3. Your cost of effort level: <span style={{color:'aliceblue'}}>{cost}</span> tokens.
                       </div>

                       <div>Your total compensation in this round is: <span style={{color:'aliceblue'}}>{160-cost}</span>tokens</div>
                        </div>
                }
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
              }     */}

            </div>   
            </div>
        </div>
    </div>
    </>
  )
}

export default Screen17