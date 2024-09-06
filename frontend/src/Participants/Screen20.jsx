import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Screen20() {
  const navigate = useNavigate();
  const { pnumber, condition, currentround } = useParams();
  
  const [showFC, setShowFc] = useState(false);
  const [showSC, setShowSC] = useState(false);
  const [showPre, setShowPre] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [fetchedData, setFetchedData] = useState();

  // Placeholder values for demonstration
  const CumulativeComp = 500; 
  const CustomerSatR1 = 30;
  const TotalCompR1 = 90;
  const TipR1 = 20; // for Pre-Service and Post-Service Tip Conditions
 
  const renderTable = () => {
    if (!fetchedData) {
      return (
        <tr>
          <td colSpan="4" style={tdStyle}>Loading...</td>
        </tr>
      );
    }
  
    let cumulativeComp = 0; // Initialize cumulative compensation
  
    // Filter out 'practice_round' and limit rows based on currentround
    return Object.keys(fetchedData)
      .filter(roundKey => roundKey !== 'practice_round' && parseInt(roundKey) <= parseInt(currentround))
      .map((roundKey, index) => {
        const roundData = fetchedData[roundKey][0];
        
        // Calculate TotalComp for this round
        const totalComp = 60 + (roundData.effort * 200);
        
        // Add this round's TotalComp to the cumulativeComp
        cumulativeComp += totalComp;
  
        return (
          <tr key={index}>
            <td style={tdStyle}>{roundKey}</td>
            <td style={tdStyle}>60 tokens</td>
            <td style={tdStyle}>{roundData.effort * 200} tokens</td>
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
            <td style={tdStyle}>60 tokens</td>
            <td style={tdStyle}>{roundData.effort * 200} tokens</td>
            <td style={tdStyle}>40 tokens</td>
            <td style={tdStyle}>{60 + (roundData.effort * 200)} tokens</td>
          </tr>
        );
      });
  }

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
            <td style={tdStyle}>60 tokens</td>
            <td style={tdStyle}>{roundData.effort * 200} tokens</td>
            <td style={tdStyle}>{roundData.pretip}</td>
            <td style={tdStyle}>{60 + (roundData.effort * 200)} tokens</td>
          </tr>
        );
      });
  }

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
    marginTop: "1rem",
  };

  const clickedNext = async () => {
    if (currentround === '10') {
      navigate(`/screen21/${pnumber}/${condition}`);
    } else {
      await axios.get("http://localhost:5000/generate/screen11reachedcountincrease", {
        withCredentials: true,
      })
      .then(async (res) => {
        if (res.data.msg === 'activeAtMoment') {
          console.log(15, res.data);
        }
        console.log(17, res.data);
        navigate(`/screen11/${pnumber}/${condition}/${res.data.activeatpg11}`);
      });
    }
  };

  return (
    <div style={containerStyle}>
      {currentround > 0 && currentround <= 10 && (
        <>
          <div style={{ fontSize: '1.5rem', paddingBottom: '1rem', textAlign: 'center' }}>
            CUMULATIVE RESULTS | ROUND {currentround}
          </div>
          {showFC && (
            <div>
              <div style={{textAlign: 'center', fontSize: '1.4rem', paddingBottom: '1rem'}}>Fixed Wage Compensation</div>
              <div style={{fontSize: '1.2rem', paddingBottom: '1rem'}}>As Customer, you have earned a total of {CumulativeComp} tokens in {currentround} round(s).</div>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Round</th>
                    <th style={thStyle}>Base Payoff</th>
                    <th style={thStyle}>Satisfaction from Worker’s Service</th>
                    <th style={thStyle}>Total Payoff</th>
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
              <div style={{textAlign: 'center', fontSize: '1.4rem', paddingBottom: '1rem'}}>Service Charge Compensation</div>
              <div style={{fontSize: '1.2rem', paddingBottom: '1rem'}}>As Customer, you have earned a total of {CumulativeComp} tokens in {currentround} round(s).</div>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Round</th>
                    <th style={thStyle}>Base Payoff</th>
                    <th style={thStyle}>Satisfaction from Worker’s Service</th>
                    <th style={thStyle}>Service Charge Paid to the Worker</th>
                    <th style={thStyle}>Total Payoff</th>
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
              <div style={{textAlign: 'center', fontSize: '1.4rem', paddingBottom: '1rem'}}>Pre-Service Tip Compensation</div>
              <div style={{fontSize: '1.2rem', paddingBottom: '1rem'}}>As Customer, you have earned a total of {CumulativeComp} tokens in {currentround} round(s).</div>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Round</th>
                    <th style={thStyle}>Base Payoff</th>
                    <th style={thStyle}>Satisfaction from Worker’s Service</th>
                    <th style={thStyle}>Tip Paid to the Worker</th>
                    <th style={thStyle}>Total Payoff</th>
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
              <div style={{textAlign: 'center', fontSize: '1.4rem', paddingBottom: '1rem'}}>Post-Service Tip Compensation</div>
              <div style={{fontSize: '1.2rem', paddingBottom: '1rem'}}>As Customer, you have earned a total of {CumulativeComp} tokens in {currentround} round(s).</div>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Round</th>
                    <th style={thStyle}>Base Payoff</th>
                    <th style={thStyle}>Satisfaction from Worker’s Service</th>
                    <th style={thStyle}>Tip Paid to the Worker</th>
                    <th style={thStyle}>Total Payoff</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={tdStyle}>R1</td>
                    <td style={tdStyle}>60 tokens</td>
                    <td style={tdStyle}>{CustomerSatR1} tokens</td>
                    <td style={tdStyle}>{TipR1} tokens</td>
                    <td style={tdStyle}>{TotalCompR1} tokens</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <button style={buttonStyle} onClick={clickedNext}>Next</button>
        </>
      )}
    </div>
  );
}

export default Screen20;
