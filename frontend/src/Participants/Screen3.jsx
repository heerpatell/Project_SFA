import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Screen3() {
  const [assignedCategory, setAssignedCategory] = useState('')
  const [condition, setCondition]  = useState()
  const [showFC, setShowFc] = useState(false)
const [showSC, setShowSC] = useState(false)
const [showPre, setShowPre] = useState(false)
const [showPost, setShowPost] = useState(false)
const navigate = useNavigate()
const {pnumber} = useParams()

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
    axios.post("http://localhost:5000/generate/getassignedcategory",{pnumber},{
        withCredentials:true
    })
    .then((res)=>{
      setAssignedCategory([res.data.assignedCategory])
     axios.get('http://localhost:5000/generate/getconditionandrole',{
        withCredentials:true
    })
    .then((res)=>{
        setCondition([res.data.condition])
        console.log(26, condition)
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
    })
    .catch((e)=>{
        console.log(17, e)
    })
},[])
  const clickedNext = () => {
    // console.log(46,assignedCategory[0])
    if(assignedCategory[0] === 'Worker'){
      navigate(`/screen4/${pnumber}/${condition}`)
    }
    if(assignedCategory[0] === 'Customer'){
      navigate(`/screen5/${pnumber}/${condition}`)
    }
  }

  return (
    <>
    <div style={{
        backgroundColor:'black',
        height:'100vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:'2rem 0',
        fontSize:'1.3rem',
        color:'#6AD4DD',
    }}>
        <div style={{
            display:'flex',
            flexDirection:'column',
            gap:'1.5rem'
        }}>
            <div style={{textAlign:'center', fontSize:'2rem'}}>Your Role</div>
            <div>In this study, you are assigned to the role of &nbsp;<span style={{color:'aliceblue'}}>{assignedCategory}</span></div>
            <div>Your role will remain unchanged throughout the study. </div>
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

export default Screen3