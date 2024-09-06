import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function WaitingEndPage() {

let {pnumber, condition, currentround} = useParams()
const [updatedCurrentRound, setUpdatedCurrentRound] = useState()
const [assignedCategory, setAssignedCategory] = useState()
const navigate = useNavigate()
const verifyUser = async () => {
    try {
      const authRes = await axios.get("http://localhost:5000/generate/authorize", { withCredentials: true });
      console.log('Authorization response:', authRes.data);
      if (authRes.data.msg === "access denied") {
        navigate("/notfound");
      } else {
        // const categoryRes = await axios.post("http://localhost:5000/generate/getassignedcategory", { pnumber }, { withCredentials: true });
        // console.log(28, categoryRes.data.assignedCategory)
        // setAssignedCategory(categoryRes.data.assignedCategory);
      }
    } catch {
      navigate("/notfound");
    }
  };

const updateRound = () => {
    axios.get('http://localhost:5000/generate/getroundnumber',{
        withCredentials:true
    })
    .then((res)=>{
        setUpdatedCurrentRound(res.data.currentRound+1)
        axios.post('http://localhost:5000/generate/updateroundnumber',{updatedCurrentRound:res.data.currentRound+1},{
            withCredentials:true
        })
        .then((res)=>{
            console.log(36,res.data)    
            setTimeout(() => {
              navigate(`/screen10/${pnumber}/${condition}`);
          }, 3000);
        })
    })
} 
const getAssignedCategory = async() => {
  await axios.post('http://localhost:5000/generate/getassignedcategory',{pnumber},{withCredentials:true})
  .then((res)=>{
    setAssignedCategory(res.data.assignedCategory)
    // if(res.data.assignedCategory === 'Customer'){
    //   axios.get('http://localhost:5000/generate/getroundnumber',{
    //     withCredentials:true
    // })
    // .then((res)=>{
    //   setUpdatedCurrentRound(res.data.currentRound+1)
    // })  
    // }
    if(res.data.assignedCategory === 'Worker'){
      updateRound()
    }else{
      axios.get('http://localhost:5000/generate/getroundnumber',{
        withCredentials:true
    })
    .then((res)=>{
      setUpdatedCurrentRound(res.data.currentRound+1)
    })
      setTimeout(() => {
        navigate(`/screen10/${pnumber}/${condition}`);
    }, 3000);   
    }
  })
}
useEffect(()=>{
    verifyUser()
    getAssignedCategory() 
},[])
  return (
    <>
    <div
      style={{
        backgroundColor: "black",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ color: "white", fontSize: "3rem" }}>
        {/* Moving to another round - {updatedCurrentRound} ...  */}
        Moving to next round
      </div>
    </div>
    </>
  )
}

export default WaitingEndPage