import React from 'react'
import {Routes,Route} from "react-router-dom"
import Chat from '../chat'
import Contacts from '../contacts'
import Login from '../login'
 const Routing=()=> {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Login/>} />
    <Route path='/Contacts' element={<Contacts/>}/>
    <Route path='/chat' element={<Chat/>}/>
    </Routes>
    </div>
  )
}
export default Routing