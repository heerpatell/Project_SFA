import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Screen4() {
const navigate = useNavigate()
const {pnumber} = useParams()
const [condition, setCondition]  = useState()
const [showFC, setShowFc] = useState(false)
const [showSC, setShowSC] = useState(false)
const [showPre, setShowPre] = useState(false)
const [showPost, setShowPost] = useState(false)
const [assignedCategory,setAssignedCategory] = useState('')

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
    axios.get('http://localhost:5000/generate/getconditionandrole',{
        withCredentials:true
    })
    .then((res)=>{
        setCondition(res.data.condition)
        if(condition === 'Fixed Condition'){
            setShowFc(true)
        }
        if(condition === 'Service Charge'){
            setShowSC(true)
        }
        if(condition === 'Pre-Tip'){
            setShowPre(true)
        }
        if(condition === 'Post-Tip'){
            setShowPost(true)
        }
    })
},[])

const clickedNext = async () => {
    await axios.post('http://localhost:5000/generate/getassignedcategory',{pnumber},{
        withCredentials:true
    })
    .then((res)=>{
        setAssignedCategory(res.data.assignedCategory)
    })
    if(assignedCategory === 'Worker'){
        navigate(`/screen6/${pnumber}/${condition}`)
    }
}
  return (
    <>
    <div style={{
        backgroundColor:'black',
        display:'flex',
        justifyContent:'center',
        color:'#6AD4DD',
        height:'100%',
        padding:'2rem 0'
    }}>
        <div style={{
            width:'40rem',
            height:'max-content',
            display:'flex',
            height:'100%',
            flexDirection:'column',
            gap:'1.5rem',
            fontSize:'1.3rem'
        }}> 
            <div style={{fontSize:'1.5rem' ,color:'aliceblue', textAlign:'center'}}><u>WORKER COMPENSATION</u></div>
            <div style={{fontSize:'1.4rem', color:'aliceblue'}}>Your Task</div>
            <div>In each round, you will choose an effort level to serve the Customers. Possible effort levels and their associated costs are shown in the table below. You may choose an effort level between 0.1 and 1.0 (inclusive). The higher the effort level you choose, the higher the cost of your effort. </div>
            <div style={{
                margin: '1rem'
            }}>
      <table style={{
        width:'100%',
        borderCollapse:'collapse',
        textAlign:'center'
      }}>
        <thead>
          <tr style={{
            border:'1px solid aliceblue',
            padding:'1rem'
          }}>
            <th>Effort Level</th>
            <th>0.1</th>
            <th>0.2</th>
            <th>0.3</th>
            <th>0.4</th>
            <th>0.5</th>
            <th>0.6</th>
            <th>0.7</th>
            <th>0.8</th>
            <th>0.9</th>
            <th>1.0</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{
            border:'1px solid aliceblue',
            padding:'1rem'
          }}>
            <td>Cost (Tokens)</td>
            <td>0</td>
            <td><i>5</i></td>
            <td>10</td>
            <td>20</td>
            <td>30</td>
            <td>40</td>
            <td>50</td>
            <td>60</td>
            <td>75</td>
            <td>90</td>
          </tr>
        </tbody>
      </table>
    </div>
            <div style={{fontSize:'1.4rem', color:'aliceblue'}}>Compensation</div>
            <div>Worker’s compensation in each round is calculated as follows:</div>

             {
                showFC 
                 && (<div style={{
                    display:'flex',
                    flexDirection:'column',
                    gap:'1.4rem'
                 }}>
                    <div>Compensation of Worker = Wage Paid by the Restaurant - cost of effort level</div>
                    <div>In each round, Workers will be paid <b>a fixed wage of 200 tokens</b> by the restaurant. Please note that this fixed wage is <b>higher</b> than the standard wage at similar restaurants. As a result, Customers will <b>not</b> pay Workers additional compensation for serving them.</div>
                 </div>)
             }
            {
                showSC
                && (<div style={{
                    display:'flex',
                    flexDirection:'column',
                    gap:'1.4rem'
                 }}>
                   <div>Compensation of Worker = Wage Paid by the Restaurant + Service Charge – Cost of Effort Level</div>
                    <div>In each round, Workers will be paid <b>a fixed wage of 160 tokens</b> by the restaurant. Please note that this fixed wage is the standard wage paid at similar restaurants. In addition, Customers pay a <b>service charge</b> of <b>40 tokens</b> to Workers for serving them, which Workers receive as additional compensation. Please note that Customers will pay a <b>fixed</b> amount of 40 tokens to Workers in each round, regardless of how Workers serve them.</div>
                </div>)
            }
            {
                showPre
                && (<div style={{
                    display:'flex',
                    flexDirection:'column',
                    gap:'1.4rem'
                 }}>
                   <div>Compensation of Worker = Wage Paid by the Restaurant + Customer Tip – Cost of Effort Level</div>
                   <div>In each round, Workers will be paid <b>a fixed wage of 160 tokens</b> by the restaurant. Please note that this fixed wage is the standard wage paid at similar restaurants. In addition, Customers pay Workers <b>tips</b> for serving them, which Workers receive as additional compensation. </div>
                    <div>Please note that Customers will decide how much to tip the Workers in each round. The amount of tip can range from <b>zero up to 80 tokens</b>. That is, Customers can tip nothing to the Workers, can tip a maximum of 80 tokens to the Workers, or can tip anywhere in between. Importantly, Customers tip Workers <b>before</b> the Workers serve them. </div>
                </div>)
            }
            {
                showPost
                && (<div style={{
                    display:'flex',
                    flexDirection:'column',
                    gap:'1.4rem'
                 }}>
                   <div>Compensation of Worker = Wage Paid by the Restaurant + Customer Tip – Cost of Effort Level</div>
                    <div>In each round, Workers will be paid <b>a fixed wage of 160 tokens</b> by the restaurant. Please note that this fixed wage is the standard wage paid at similar restaurants. In addition, Customers pay Workers <b>tips</b> for serving them, which Workers receive as additional compensation. </div>
                    <div>Please note that Customers will decide how much to tip the Workers in each round. The amount of tip can range from <b>zero up to 80 tokens</b>. That is, Customers can tip nothing to the Workers, can tip a maximum of 80 tokens to the Workers, or can tip anywhere in between. Importantly, Customers tip Workers <b>after</b> the Workers serve them.  </div>
                </div>)
            }

            <div style={{
                display:'flex',
                flexDirection:'column',
                gap:'1.5rem'
            }}>
                <div style={{fontSize:'1.4rem', color:'aliceblue'}}>Customer's Satisfaction and Compensation</div>

                <div>
                Importantly, <b>Customers’ level of satisfaction with your service increases with your effort level.</b> The higher the effort level you choose, the higher the Customers’ level of satisfaction. At the end of this study, Customers’ satisfaction will determine their payoff. The higher the Customers’ satisfaction, the <b>higher</b> the payoff they will receive. </div>
                {
                    showSC 
                    && (<div>
                        However, the service charge the Customers pay you decreases the Customers’ compensation. 
                    </div>)
                }
                {
                    showPre &&(
                        <div>
                            However, the tip the Customers pay you decreases the Customers’ compensation. The higher the tip, the lower the compensation they will receive.
                        </div>
                    )
                }
                {
                    showPost &&(
                        <div>
                            However, the tip the Customers pay you decreases the Customers’ compensation. The higher the tip, the lower the compensation they will receive.
                        </div>
                    )
                }
                {
                  showSC && (
                    <div>However, Workers will be informed of the amount of the service charge you pay them.</div>
                  )
                }
                {
                  showPre && (
                    <div>However, Workers will be informed of the amount of the tip you pay them.</div>
                  )
                }
                {
                  showPost && (
                    <div>However, Workers will be informed of the amount of the tip you pay them.</div>
                  )
                }
            </div>

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
              cursor:'pointer',
            }}
            onClick={clickedNext}>Next</div>
            </div>
            
          </div>
        </div>
    </>
  )
}

export default Screen4