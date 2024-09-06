import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Screen24() {
  const navigate = useNavigate()
  const [response, setResponse] = useState('')

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
    verifyUser()
  },[])

  const handleResponse = (event) => {
    setResponse(event.target.value);
  };

  const clickedNext = () => {
    console.log("Response:", response)
    navigate(`/screen25/${pnumber}/${condition}`)
  };

  return (
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
          POST-STUDY QUESTIONS 3
        </div>
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
          <div>
            <div style={{ color: "aliceblue", marginBottom: "0.5rem" }}>
              Recall that you played the role of Worker today.
            </div>
            <div style={{paddingBottom:'0.3rem'}}>
              Given your experience today, please describe how you made your choices of effort levels in each round:
            </div>
            <textarea
              value={response}
              onChange={handleResponse}
              rows="3"
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: "white",
                color: "black",
                resize: "vertical",
              }}
            />
          </div>

          {/* <div>
            <div style={{ color: "aliceblue", marginBottom: "0.5rem" }}>
              Recall that you played the role of Customer today.
            </div>
            <div style={{paddingBottom:'0.3rem'}}>
              Given your experience today, please describe how you made your choices of the tips paid to the Workers in each round:
            </div>
            <textarea
              value={response}
              onChange={handleResponse}
              rows="3"
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: "white",
                color: "black",
                resize: "vertical",
              }}
            />
          </div> */}

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
                textAlign: "center",
              }}
              onClick={clickedNext}
            >
              Next
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Screen24;
