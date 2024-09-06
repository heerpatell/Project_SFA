import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
function Screen25() {
  const {pnumber, condition} = useParams()
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [foodIndustryExperience, setFoodIndustryExperience] = useState('');
  const navigate = useNavigate()
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleWorkExperienceChange = (event) => {
    setWorkExperience(event.target.value);
  };

  const handleFoodIndustryExperienceChange = (event) => {
    setFoodIndustryExperience(event.target.value);
  };

  const clickedNext = async() => {
    const userResp = {
      gender, age, workExperience, foodIndustryExperience,pnumber
    }
    await axios.post('http://localhost:5000/generate/postanswersfrom25',userResp,{withCredentials:true})
    .then((res)=>{
      navigate(`/screen26/${pnumber}/${condition}`)
    })
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
          DEMOGRAPHICS
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
            In order to help us understand why your responses might be different from those of other participants in this study, please answer the following questions.
          </div>
          <div>
            <div style={{ color: "aliceblue" }}>Please indicate your gender:</div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>
                <input
                  type="radio"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={handleGenderChange}
                  style={{ marginRight: "0.5rem" }}
                />
                Male
              </label>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>
                <input
                  type="radio"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={handleGenderChange}
                  style={{ marginRight: "0.5rem" }}
                />
                Female
              </label>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>
                <input
                  type="radio"
                  value="Non-Binary"
                  checked={gender === "Non-Binary"}
                  onChange={handleGenderChange}
                  style={{ marginRight: "0.5rem" }}
                />
                Non-Binary
              </label>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>
                <input
                  type="radio"
                  value="Self-Define"
                  checked={gender === "Self-Define"}
                  onChange={handleGenderChange}
                  style={{ marginRight: "0.5rem" }}
                />
                I prefer to self-define: <input
                  type="text"
                  value={gender === "Self-Define" ? gender : ""}
                  onChange={(e) => setGender(e.target.value)}
                  style={{ marginLeft: "0.5rem", border: "1px solid #ccc", borderRadius: "5px", padding: "0.2rem" }}
                />
              </label>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>
                <input
                  type="radio"
                  value="Prefer not to say"
                  checked={gender === "Prefer not to say"}
                  onChange={handleGenderChange}
                  style={{ marginRight: "0.5rem" }}
                />
                I prefer not to say
              </label>
            </div>
          </div>

          <div>
            <div style={{ color: "aliceblue" }}>Please indicate your age (in years):</div>
            <input
              type="number"
              value={age}
              onChange={handleAgeChange}
              style={{
                width: "20%",
                padding: "0.5rem",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: "white",
                color: "black",
              }}
            />
          </div>

          <div>
            <div style={{ color: "aliceblue" }}>Please indicate the number of years of your full-time work experience:</div>
            <input
              type="number"
              value={workExperience}
              onChange={handleWorkExperienceChange}
              style={{
                width: "20%",
                padding: "0.5rem",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: "white",
                color: "black",
              }}
            />
          </div>

          <div>
            <div style={{ color: "aliceblue" }}>Please indicate the number of years you have worked (either part-time or full-time) in the food industry:</div>
            <input
              type="number"
              value={foodIndustryExperience}
              onChange={handleFoodIndustryExperienceChange}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: "white",
                color: "black",
              }}
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

export default Screen25;