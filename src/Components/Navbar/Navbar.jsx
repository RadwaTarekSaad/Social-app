import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../Context/AuthContext'

const Navbar = () => {
  const{token,logoutContext}=useContext(authContext)
  const navigate=useNavigate()
  function logout(){
    logoutContext();
    navigate("/login")

  }
  return (
   <div className="navbar bg-base-100 shadow-xl px-15 shadow-blue-300/15">
  <div className="flex-1">
    {token? <Link to="/" className="btn btn-ghost text-2xl text-blue-700">Linked Posts</Link>: <h1 className='text-2xl text-blue-700'>Login First</h1>}
   
  </div>
  {token? <div className="flex gap-2">
    
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>

      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       
       
          <li><button onClick={ logout}>Logout</button></li>
           <li><Link to="/profile">profile</Link></li>
      </ul>
    </div>
  </div>:<div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      
       <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
    </ul>
  </div>
 }
  
</div>
  )
}

export default Navbar
