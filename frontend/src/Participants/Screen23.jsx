import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function QuestionScale({ question, name, onChange }) {
  const [selectedValue, setSelectedValue] = useState(null);
  const navigate = useNavigate()
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value); 
  };
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
    <div style={{ marginBottom: "1rem" }}>
      <p style={{ color: "aliceblue", marginBottom: "0.5rem" }}>{question}</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {Array.from({ length: 7 }, (_, i) => i + 1).map(value => (
          <React.Fragment key={value}>
            <input
              type="radio"
              id={`${name}-${value}`}
              name={name}
              value={value}
              checked={selectedValue === value.toString()}
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <label
              htmlFor={`${name}-${value}`}
              style={{
                display: "block",
                padding: "0.5rem",
                cursor: "pointer",
                border: "none",
                borderRadius: "3px",
                textAlign: "center",
                backgroundColor: selectedValue === value.toString() ? "#007BFF" : "white",
                color: selectedValue === value.toString() ? "white" : "black",
              }}
            >
              {value}
            </label>
          </React.Fragment>
        ))}
      </div>
      <div style={{display:'flex', justifyContent:'space-between', paddingTop:'0.2rem', color:'gray', fontSize:'1rem', paddingBottom:'0.5rem'}}>
        <div><i>Not at all</i></div>
        <div><i>Somewhat</i></div>
        <div><i>Very much</i></div>
      </div>
      <hr/>
    </div>
  );
}

function Screen23() {
  const [responses, setResponses] = useState({});
  const navigate = useNavigate()
  const {pnumber, condition} = useParams()
  const handleScaleChange = (name, value) => {
    setResponses(prev => ({ ...prev, [name]: value }));
  };


  const clickedNext = () => {
    console.log("Responses:", responses); 
    navigate(`/screen24/${pnumber}/${condition}`)
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
          POST-STUDY QUESTIONS 2
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
            <div style={{ color: "#6AD4DD", paddingBottom:'0.2rem' }}>
              When you gave a low tip to the Worker,
            </div>
            <QuestionScale
              question="To what extent was the low tip likely the result of low effort level chosen by the Worker?"
              name="low-effort"
              onChange={(value) => handleScaleChange("low-effort", value)}
            />
            <QuestionScale
              question="To what extent was the low tip likely the result of low social pressure to tip?"
              name="low-pressure"
              onChange={(value) => handleScaleChange("low-pressure", value)}
            />
          </div>

          <div>
            <div style={{ color: "#6AD4DD", paddingBottom:'0.2rem' }}>
              When you gave a high tip to the Worker,
            </div>
            <QuestionScale
              question="To what extent was the high tip likely the result of high effort level chosen by the Worker?"
              name="high-effort"
              onChange={(value) => handleScaleChange("high-effort", value)}
            />
            <QuestionScale
              question="To what extent was the high tip likely the result of high social pressure to tip?"
              name="high-pressure"
              onChange={(value) => handleScaleChange("high-pressure", value)}
            />
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

export default Screen23;