import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Screen26() {
  const navigate = useNavigate()
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
        END OF STUDY
        <div               style={{
                fontSize: "1.2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                paddingTop: "2rem",
                color: "#6AD4DD",
                textAlign: "left",
              }}>
                <div>Thank you very much for your participation today! 
                </div>
                <div>You have earned a total of [CumulativeComp] tokens in today’s study. Your tokens will be converted into actual cash at the rate of 100 tokens = $0.90 CND. 
                </div>
                <div>Please raise your hand and an experimenter will come to provide you with your pay before your leave the lab.</div>
        </div>
        </div>           
        </div>
      </div>
    </>
  );
}

export default Screen26;
