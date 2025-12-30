importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: "AIzaSyAsVP2ylJa8qR436hh9qsRIyeZDz4696nk",
  authDomain: "hr-system-f60dd.firebaseapp.com",
  projectId: "hr-system-f60dd",
  storageBucket: "hr-system-f60dd.firebasestorage.app",
  messagingSenderId: "427655859826",
  appId: "1:427655859826:web:a29728a21de56323f8bceb",
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log('Background Message:', payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png'
  }
  self.registration.showNotification(notificationTitle, notificationOptions)
})