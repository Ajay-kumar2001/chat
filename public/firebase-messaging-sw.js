// Within your service worker file, you can import the Firebase Messaging SDK script using the importScripts function
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize Firebase app in the service worker
const firebaseConfig = {
    apiKey: "AIzaSyCnfosk-VJyHUCajMFmWAF9lkYYJ6nTTbc",
    authDomain: "thapala-01.firebaseapp.com",
    projectId: "thapala-01",
    storageBucket: "thapala-01.appspot.com",
    messagingSenderId: "396233703044",
    appId: "1:396233703044:web:9944638ee43406d692ccd1",
    measurementId: "G-EC1YZKKM9K"
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
