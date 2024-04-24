// Within your service worker file, you can import the Firebase Messaging SDK script using the importScripts function
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize Firebase app in the service worker
const firebaseConfig = {
    apiKey: "AIzaSyBQQ8MsKiVWOc4UjxLSvyNW-qPnEdOT9pI",
    authDomain: "ajay-project-3d722.firebaseapp.com",
    projectId: "ajay-project-3d722",
    storageBucket: "ajay-project-3d722.appspot.com",
    messagingSenderId: "172938665806",
    appId: "1:172938665806:web:b33adc1091f20daaae081f",
    measurementId: "G-BV0DDRQ4NS"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload)=>{
    console.log( "[firebase-messaging-sw.js] Received background message ", payload) 
const notificationTitle=payload.notification.title;
const notificationOptions={
    body:payload.notification.body,
    icon:payload.notification.image
}
 self.registration.showNotification(notificationTitle,notificationOptions)
})
