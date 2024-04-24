import logo from './logo.svg';
import './App.css';
import Routing from './Components/RoutingComp/Routing';
import Gcon from './Components/globalContext';
import { useState,useEffect } from "react"
import { messaging } from './firebase';
import {  getToken } from "firebase/messaging";
function App() {
  let updateContact=(data)=>{
    console.log("==============================",data)
    setContacts({...contact,...data})
  }
  let [contact,setContacts]=useState({id: undefined, firstname: '', lastname: '', tCode: undefined,updateContact:updateContact,receiverId:undefined,firstname: '', lastname: ''})
async function requestPermission(){
  const Permission = await Notification.requestPermission();
  if(Permission === 'granted'){
      console.log('permission granted');
      
      const fcmToken=await getToken(messaging,{vapidKey:"BCegm4tPdyj1IBkb0iCdTEGNzP1DlAt5wEt52rsddIADwhZV_D7OUNtxD61jFuNbVOwTYEQzWsJnT1lx7-2xLvM"});
      console.log("fcm token ",fcmToken)

    }else if(Permission=="denied"){
    console.log("u denied for hte Notification")

}
}
  useEffect( ()=>{
    requestPermission()
})
  return (
    <div className="App">
       <Gcon.Provider value={contact}>  
     <Routing/>
     </Gcon.Provider>
 
    </div>
  );
}

export default App;
