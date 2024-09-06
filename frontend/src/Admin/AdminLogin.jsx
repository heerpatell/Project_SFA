import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './adminLogin.scss'

function AdminLogin() {
  const navigate = useNavigate()
  const [inp,setInp] = useState({
    uname:'',pswd:''
  })

  const handleInput = (e) =>{
    const {name,value} = e.target;
    setInp({...inp,[name]:value})
  }

  const LoginClicked = (uname,pswd) => {
    console.log('clicked', uname, pswd)
    if(!uname || !pswd){
      alert('Enter username or password')
    }
    if(uname==='admin' && pswd==='admin'){
      navigate('/admindashboard')
    }
    else{
      alert('Enter valid username or password')
    }
  }

  return (
    <>
    <div className='admin-outer'>
        <div className='admin-credentials'>
          <div>
            <label>Username :</label>
            <input
            placeholder='Enter Username'
            name='uname'
            className='adminTextField'
            value={inp.uname}
            onChange={handleInput}/>
          </div>
          <div>
            <label>Password : </label>
            <input
            placeholder='Enter Password'
            type='password'
            name='pswd'
            className='adminTextField'
            value={inp.pswd}
            onChange={handleInput}/>
          </div>
          <div className='adminLoginBtn' onClick={()=>LoginClicked(inp.uname, inp.pswd)}>Log in</div>
        </div>
    </div>
    </>
  )
}

export default AdminLogin