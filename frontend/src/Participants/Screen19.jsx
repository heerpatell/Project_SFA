import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Screen19() {
  const navigate = useNavigate();
  const { pnumber, condition, currentround } = useParams();
  
  const [showFC, setShowFc] = useState(false);
  const [showSC, setShowSC] = useState(false);
  const [showPre, setShowPre] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  // Placeholder values for demonstration
  const CumulativeComp = 400; 
  const CostofEffortR1 = 50;
  const TotalCompR1 = 150;
  const TipR1 = 20; // for Pre-Service and Post-Service Tip Condition

  const renderTable = () => {
    if (!fetchedData) {
      return (
        <tr>
          <td colSpan="4" style={tdStyle}>Loading...</td>
        </tr>
      );
    }
  
    // Effort level to token mapping
    const effortToTokens = {
      0.1: 0,
      0.2: 5,
      0.3: 10,
      0.4: 20,
      0.5: 30,
      0.6: 40,
      0.7: 50,
      0.8: 60,
      0.9: 75,
      1.0: 90
    };
  
    let cumulativeComp = 0; // Initialize cumulative compensation
  
    // Filter out 'practice_round' and limit rows based on currentround
    return Object.keys(fetchedData)
      .filter(roundKey => roundKey !== 'practice_round' && parseInt(roundKey) <= parseInt(currentround))
      .map((roundKey, index) => {
        const roundData = fetchedData[roundKey][0];
        const effortTokens = effortToTokens[roundData.effort] || 0; // Get tokens based on effort
  
        // Calculate totalComp for this round (200 tokens + effort tokens)
        const totalComp = 200 + effortTokens;
  
        // Add this round's totalComp to the cumulativeComp
        cumulativeComp += totalComp;
  
        return (
          <tr key={index}>
            <td style={tdStyle}>{roundKey}</td>
            <td style={tdStyle}>200 tokens</td>
            <td style={tdStyle}>{effortTokens} tokens</td>
            <td style={tdStyle}>{cumulativeComp} tokens</td>
          </tr>
        );
      });
  };
  
  const renderTableSC = () => {
    if (!fetchedData) {
      return (
        <tr>
          <td colSpan="4" style={tdStyle}>Loading...</td>
        </tr>
      );
    }
    // Filter out 'practice_round' and limit rows based on currentround
    return Object.keys(fetchedData)
      .filter(roundKey => roundKey !== 'practice_round' && parseInt(roundKey) <= parseInt(currentround))
      .map((roundKey, index) => {
        const roundData = fetchedData[roundKey][0];
        return (
          <tr key={index}>
            <td style={tdStyle}>{roundKey}</td>
            <td style={tdStyle}>200 tokens</td>
            {roundData.effort == 0.1 && <td style={tdStyle}>0 tokens</td>}
            {roundData.effort == 0.2 && <td style={tdStyle}>5 tokens</td>}
            {roundData.effort == 0.3 && <td style={tdStyle}>10 tokens</td>}
            {roundData.effort == 0.4 && <td style={tdStyle}>20 tokens</td>}
            {roundData.effort == 0.5 && <td style={tdStyle}>30 tokens</td>}
            {roundData.effort == 0.6 && <td style={tdStyle}>40 tokens</td>}
            {roundData.effort == 0.7 && <td style={tdStyle}>50 tokens</td>}
            {roundData.effort == 0.8 && <td style={tdStyle}>60 tokens</td>}
            {roundData.effort == 0.9 && <td style={tdStyle}>75 tokens</td>}
            {roundData.effort == 1.0 && <td style={tdStyle}>90 tokens</td>}
            <td style={tdStyle}>40 tokens</td>
            <td style={tdStyle}>{roundData.totalComp} tokens</td>
          </tr>
        );
      });
  };

  const renderTablePre = () => {
    if (!fetchedData) {
      return (
        <tr>
          <td colSpan="4" style={tdStyle}>Loading...</td>
        </tr>
      );
    }
    // Filter out 'practice_round' and limit rows based on currentround
    return Object.keys(fetchedData)
      .filter(roundKey => roundKey !== 'practice_round' && parseInt(roundKey) <= parseInt(currentround))
      .map((roundKey, index) => {
        const roundData = fetchedData[roundKey][0];
        return (
          <tr key={index}>
            <td style={tdStyle}>{roundKey}</td>
            <td style={tdStyle}>200 tokens</td>
            {roundData.effort == 0.1 && <td style={tdStyle}>0 tokens</td>}
            {roundData.effort == 0.2 && <td style={tdStyle}>5 tokens</td>}
            {roundData.effort == 0.3 && <td style={tdStyle}>10 tokens</td>}
            {roundData.effort == 0.4 && <td style={tdStyle}>20 tokens</td>}
            {roundData.effort == 0.5 && <td style={tdStyle}>30 tokens</td>}
            {roundData.effort == 0.6 && <td style={tdStyle}>40 tokens</td>}
            {roundData.effort == 0.7 && <td style={tdStyle}>50 tokens</td>}
            {roundData.effort == 0.8 && <td style={tdStyle}>60 tokens</td>}
            {roundData.effort == 0.9 && <td style={tdStyle}>75 tokens</td>}
            {roundData.effort == 1.0 && <td style={tdStyle}>90 tokens</td>}
            <td style={tdStyle}>{roundData.pretip} tokens</td>
            <td style={tdStyle}>{roundData.totalComp} tokens</td>
          </tr>
        );
      });
  }

  const renderTablePost = () => {
    if (!fetchedData) {
      return (
        <tr>
          <td colSpan="4" style={tdStyle}>Loading...</td>
        </tr>
      );
    }
    // Filter out 'practice_round' and limit rows based on currentround
    return Object.keys(fetchedData)
      .filter(roundKey => roundKey !== 'practice_round' && parseInt(roundKey) <= parseInt(currentround))
      .map((roundKey, index) => {
        const roundData = fetchedData[roundKey][0];
        return (
          <tr key={index}>
            <td style={tdStyle}>{roundKey}</td>
            <td style={tdStyle}>200 tokens</td>
            {roundData.effort == 0.1 && <td style={tdStyle}>0 tokens</td>}
            {roundData.effort == 0.2 && <td style={tdStyle}>5 tokens</td>}
            {roundData.effort == 0.3 && <td style={tdStyle}>10 tokens</td>}
            {roundData.effort == 0.4 && <td style={tdStyle}>20 tokens</td>}
            {roundData.effort == 0.5 && <td style={tdStyle}>30 tokens</td>}
            {roundData.effort == 0.6 && <td style={tdStyle}>40 tokens</td>}
            {roundData.effort == 0.7 && <td style={tdStyle}>50 tokens</td>}
            {roundData.effort == 0.8 && <td style={tdStyle}>60 tokens</td>}
            {roundData.effort == 0.9 && <td style={tdStyle}>75 tokens</td>}
            {roundData.effort == 1.0 && <td style={tdStyle}>90 tokens</td>}
            <td style={tdStyle}>{roundData.posttip} tokens</td>
            <td style={tdStyle}>{roundData.totalComp} tokens</td>
          </tr>
        );
      });
  }

  const verifyUser = () => {
    axios
      .get("http://localhost:5000/generate/getlink", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.msg === "access denied") {
          navigate("/notfound");
        }
      })
      .catch(() => {
        navigate("/notfound");
      });
  };

  const fetchSummary = async () => {
    try {
      const res = await axios.get("http://localhost:5000/generate/fetchsummary", {
        withCredentials: true,
      });
      setFetchedData(res.data.matches.matches);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  useEffect(() => {
    verifyUser();
    fetchSummary();
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
  }, [condition]);

  const clickedNext = async () => {
    if(currentround == '10'){
      navigate(`/screen21/${pnumber}/${condition}`)
    }else{
      await axios.get("http://localhost:5000/generate/screen11reachedcountincrease",{
        withCredentials:true
      })  
      .then(async(res)=>{
        if(res.data.msg == 'activeAtMoment'){
          console.log(15, res.data)
        }
        console.log(17, res.data)
        navigate(`/screen11/${pnumber}/${condition}/${res.data.activeatpg11}`);
      })
    }
  };

  const containerStyle = {
    height: "100vh",
    backgroundColor: "black",
    color: "#6AD4DD",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    flexDirection: "column",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "1rem",
  };

  const thStyle = {
    border: "1px solid #6AD4DD",
    padding: "0.5rem 1rem",
    textAlign: "center",
    backgroundColor: "#333333",
  };

  const tdStyle = {
    border: "1px solid #6AD4DD",
    padding: "0.5rem 1rem",
    textAlign: "center",
  };

  const buttonStyle = {
    padding: "0.5rem 1rem",
    fontSize: '1.2rem',
    backgroundColor: "#6AD4DD",
    border: "none",
    color: "black",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: 'center', fontSize: '1.4rem', paddingBottom: '1rem' }}>CUMULATIVE RESULTS | ROUND {currentround}</div>
      {showFC && (
        <div>
          <div style={{ fontSize: '1.2rem', paddingBottom: '1rem' }}>As Worker, you have earned a total of {CumulativeComp} tokens in 1 round(s).</div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Round</th>
                <th style={thStyle}>Wage Paid by the Restaurant</th>
                <th style={thStyle}>Cost of Effort Level</th>
                <th style={thStyle}>Total Compensation</th>
              </tr>
            </thead>
            <tbody>
              {renderTable()}
            </tbody>
          </table>
        </div>
      )}
      {showSC && (
        <div>
          <div style={{ fontSize: '1.2rem', paddingBottom: '1rem' }}>As Worker, you have earned a total of {CumulativeComp} tokens in 1 round(s).</div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Round</th>
                <th style={thStyle}>Wage Paid by the Restaurant</th>
                <th style={thStyle}>Cost of Effort Level</th>
                <th style={thStyle}>Service Charge Paid to the Worker</th>
                <th style={thStyle}>Total Compensation</th>
              </tr>
            </thead>
            <tbody>
              {renderTableSC()}
            </tbody>
          </table>
        </div>
      )}
      {showPre && (
        <div>
          <div style={{ fontSize: '1.2rem', paddingBottom: '1rem' }}>As Worker, you have earned a total of {CumulativeComp} tokens in 1 round(s).</div>
          <br />
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Round</th>
                <th style={thStyle}>Wage Paid by the Restaurant</th>
                <th style={thStyle}>Cost of Effort Level</th>
                <th style={thStyle}>Tip Paid to the Worker</th>
                <th style={thStyle}>Total Compensation</th>
              </tr>
            </thead>
            <tbody>
              {renderTablePre()}
            </tbody>
          </table>
        </div>
      )}

      {showPost && (
        <div>
          <div style={{ textAlign: 'center', fontSize: '1.4rem', paddingBottom: '1rem' }}>Pre-Service and Post-Service Tip Condition</div>
          <div style={{ fontSize: '1.2rem', paddingBottom: '1rem' }}>As Worker, you have earned a total of {CumulativeComp} tokens in 1 round(s).</div>
          <br />
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Round</th>
                <th style={thStyle}>Wage Paid by the Restaurant</th>
                <th style={thStyle}>Cost of Effort Level</th>
                <th style={thStyle}>Tip Paid to the Worker</th>
                <th style={thStyle}>Total Compensation</th>
              </tr>
            </thead>
            <tbody>
              {renderTablePost()}
            </tbody>
          </table>
        </div>
      )}
      <button style={buttonStyle} onClick={() => clickedNext()}>Next</button>
    </div>
  );
}

export default Screen19;
