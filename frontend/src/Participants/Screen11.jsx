import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

// Create a socket connection only once
const socket = io("http://localhost:5000", {
  transports: ['websocket', 'polling'], // Use default transports
});

function Screen11() {
  const navigate = useNavigate();
  const [participantCount, setParticipantCount] = useState(0); // Track participants count
  const [hasEmitted, setHasEmitted] = useState(false); // Track if event has been emitted
  const [updatedCurrentRound,setUpdatedCurrentRound] = useState()
  let { pnumber, condition, activeatpg11 } = useParams();
  activeatpg11 = Number(activeatpg11);

  // Function to verify user and fetch assigned category
  const verifyUser = async () => {
    try {
      const authRes = await axios.get("http://localhost:5000/generate/authorize", { withCredentials: true });
      console.log('Authorization response:', authRes.data);
      if (authRes.data.msg === "access denied") {
        navigate("/notfound");
      } else {
        // console.log(28, authRes.data.sessionObj.no_of_participants)
        // console.log(29, totalParticipants)
      }
    } catch {
      navigate("/notfound");
    }
  };

  useEffect(() => {
    verifyUser();
  }, []); // Run only once on mount

  useEffect(() => {
    console.log(41, hasEmitted)
    if (!hasEmitted) {
      console.log('Emitting screen11-reached event');
      socket.emit('screen11-reached');
      setHasEmitted(true); // Set flag to true after emitting
    }

    // WebSocket event listeners
    socket.on('update-count', (count) => {
      console.log('Participants at Screen11:', count);
      setParticipantCount(count); // Update state with the new count
    });

    let pcount = 0;
    socket.on('threshold-reached', async() => {
      await axios.post('http://localhost:5000/generate/resetScreen11Count', {}, { withCredentials: true })
      .then((res)=>{console.log(55,res.data)});
      
      console.log('Threshold reached, moving to next screen');
      const categoryRes = await axios.post("http://localhost:5000/generate/getassignedcategory", { pnumber }, { withCredentials: true });
      console.log(28, categoryRes.data.assignedCategory)
      const roundRes = await axios.get('http://localhost:5000/generate/getroundnumber',{
        withCredentials:true
      })
      if(roundRes.data.currentRound == '0'){roundRes.data.currentRound = 'Practice Round'}

      if (categoryRes.data.assignedCategory === 'Customer') {
        // console.log(601, roundRes.data.currentRound)
        if(condition === 'Pre-Tip'){
          navigate(`/screen12/${pnumber}/${condition}/${roundRes.data.currentRound}`);
          // socket.off('update-count');
          // socket.off('threshold-reached');
        }else{
          navigate(`/waiting/${pnumber}/${condition}/${roundRes.data.currentRound}`);
        }
      } 
      if (categoryRes.data.assignedCategory === 'Worker') {
        // console.log(602, roundRes.data.currentRound)
        if(condition === 'Pre-Tip'){
          navigate(`/waiting/${pnumber}/${condition}/${roundRes.data.currentRound}`);
        }else{
          navigate(`/screen14/${pnumber}/${condition}/${roundRes.data.currentRound}`);
        }
      }

    });

    // Cleanup the socket listeners when the component unmounts
    return () => {
      console.log('Cleaning up socket listeners');
    };
  }, []);

  return (
    <div style={{ height: "100vh", backgroundColor: "black", color: "#6AD4DD", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: "40rem", display: "flex", flexDirection: "column", gap: "1.4rem", fontSize: "1.4rem" }}>
        <div style={{ color: "aliceblue", fontSize: "1.5rem", textAlign: "center" }}>
          Waiting Page
        </div>
        <div>
          <div>Waiting Page...</div>
          <br />
          <div>Please wait for the other participants to be grouped together to begin...</div>
          <br />
          <div>Please wait for the other participants to be grouped together to begin. As different participants go through each round at different paces, it might take a couple of minutes for other participants to reach this stage of the study. Please be patient during this time. </div>
          {/* <div>Your arrival count: {activeatpg11}</div> */}
          <br />
          {/* <div>Participants reached Screen11: {participantCount}</div>  */}
        </div>
      </div>
    </div>
  );
}

export default Screen11;
