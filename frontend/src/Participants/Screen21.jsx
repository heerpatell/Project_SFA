import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Screen21() {
  const navigate = useNavigate()
  const {pnumber, condition} = useParams()
  
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
    console.log(26, pnumber, condition)
    verifyUser()
  },[])

const clickedNext = async() =>{
  console.log(30, pnumber, condition)
  const categoryRes = await axios.post("http://localhost:5000/generate/getassignedcategory", { pnumber }, { withCredentials: true });
  if(categoryRes.data.assignedCategory === 'Customer'){
    navigate(`/screen23/${pnumber}/${condition}`)
  }else{
    navigate(`/screen22/${pnumber}/${condition}`)
  }
}
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
                POST-STUDY QUESTIONS
                <div style={{
                fontSize: "1.2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                paddingTop: "2rem",
                color: "#6AD4DD",
                textAlign: "left",
              }}>

              <div>Now you have completed the task. </div>
              <div>In the following pages, you will be asked to complete a short questionnaire. Please respond to each question as descriptively as possible. Your responses will assist us greatly in understanding this study.</div>
              
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
  )
}

export default Screen21