import AdminLogin from './Admin/AdminLogin';
import AdminDashboard from './Admin/AdminDashboard';
import './app.css'
import {Route, Routes } from 'react-router-dom'
import Screen0 from './Participants/Screen0';
import Screen1 from './Participants/Screen1';
import AccessDenied from './AccessDenied';
import AdminPage from './Admin/AdminPage';
import ParticipantPage from './Participants/ParticipantPage';
import Screen2 from './Participants/Screen2';
import Screen3 from './Participants/Screen3';
import Screen4 from './Participants/Screen4';
import Screen5 from './Participants/Screen5';
import Screen6 from './Participants/Screen6';
import Screen7 from './Participants/Screen7';
import Screen8 from './Participants/Screen8';
import Screen9 from './Participants/Screen9';
import Screen10 from './Participants/Screen10';
import Screen11 from './Participants/Screen11';
import Screen12 from './Participants/Screen12';
import Screen13 from './Participants/Screen13';
import Screen14 from './Participants/Screen14';
import Screen15 from './Participants/Screen15';
import Screen16 from './Participants/Screen16';
import Screen17 from './Participants/Screen17';
import Screen18 from './Participants/Screen18';
import Screen19 from './Participants/Screen19';
import Screen20 from './Participants/Screen20'
import Screen21 from './Participants/Screen21';
import Screen22 from './Participants/Screen22';
import Screen23 from './Participants/Screen23';
import Screen24 from './Participants/Screen24';
import Screen26 from './Participants/Screen26';
import Screen25 from './Participants/Screen25';
import Waiting from './Participants/Waiting';
import WaitingEndPage from './Participants/WaitingEndPage';

function App() {
  return (
    <Routes>
      <Route excat path='/' element={<AdminLogin/>} />
      <Route exact path='/participant/:pnumber' element={<ParticipantPage/>} />
      <Route path="/link/:linkId" element={<Screen0/>} />
      <Route excat path='/admindashboard' element={<AdminDashboard/>} />
      <Route excat path='/adminpage' element={<AdminPage/>} />
      <Route exact path='/notfound' element={<AccessDenied/>} />
      <Route exact path='/screen1/:pnumber' element={<Screen1/>}/>
      <Route exact path='/screen2/:pnumber' element={<Screen2/>}/>  
      <Route exact path='/screen3/:pnumber' element={<Screen3/>} />
      <Route exact path='/screen4/:pnumber/:condition' element={<Screen4/>}/>
      <Route exact path='/screen5/:pnumber/:condition' element={<Screen5/>}/>
      <Route exact path='/screen6/:pnumber/:condition' element={<Screen6/>}/>
      <Route exact path='/screen7/:pnumber/:condition' element={<Screen7/>}/>
      <Route exact path='/screen8/:pnumber/:condition' element={<Screen8/>}/>
      <Route exact path='/screen9/:pnumber/:condition' element={<Screen9/>}/>
      <Route exact path='/screen10/:pnumber/:condition' element={<Screen10/>}/>
      <Route exact path='/screen11/:pnumber/:condition/:activeatpg11' element={<Screen11/>}/>
      <Route exact path='/screen12/:pnumber/:condition/:currentround' element={<Screen12/>}/>
      <Route exact path='/screen13/:pnumber/:condition/:currentround' element={<Screen13/>}/>
      <Route exact path='/screen14/:pnumber/:condition/:currentround' element={<Screen14/>}/>
      <Route exact path='/screen15/:pnumber/:condition/:currentround' element={<Screen15/>}/>
      <Route exact path='/screen16/:pnumber/:condition/:currentround' element={<Screen16/>}/>
      <Route exact path='/screen17/:pnumber/:condition/:currentround' element={<Screen17/>}/>
      <Route exact path='/screen18/:pnumber/:condition/:currentround' element={<Screen18/>}/>
      <Route exact path='/screen19/:pnumber/:condition/:currentround' element={<Screen19/>}/>
      <Route exact path='/screen20/:pnumber/:condition/:currentround' element={<Screen20/>}/>
      <Route exact path='/screen21/:pnumber/:condition' element={<Screen21/>}/>
      <Route exact path='/screen22/:pnumber/:condition' element={<Screen22/>}/>
      <Route exact path='/screen23/:pnumber/:condition' element={<Screen23/>}/>
      <Route exact path='/screen24/:pnumber/:condition' element={<Screen24/>}/>
      <Route exact path='/screen25/:pnumber/:condition' element={<Screen25/>}/>
      <Route exact path='/screen26/:pnumber/:condition' element={<Screen26/>}/>
      <Route exact path='/waiting/:pnumber/:condition/:currentround' element={<Waiting/>}/>
      <Route exact path='/waitinglast/:pnumber/:condition/:currentround' element={<WaitingEndPage/>}/>
      <Route exact path='*' element={<AccessDenied/>} />
    </Routes>
  );
}

export default App;
