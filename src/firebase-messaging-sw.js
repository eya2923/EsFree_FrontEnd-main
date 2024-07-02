importScripts('https://www.gstatic.com/firebasejs/<v9+>/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/<v9+>/firebase-messaging-compat.js');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp ({
    apiKey: "AIzaSyBK_o8n8Cb5VOSx5DnfwT8VGVFz_1iIsJc",
    authDomain: "my-firebase-88087.firebaseapp.com",
    projectId: "my-firebase-88087",
    storageBucket: "my-firebase-88087.appspot.com",
    messagingSenderId: "369746130444",
    appId: "1:369746130444:web:ccbcb060a1532a9b8ce029",
    measurementId: "G-X9W74Q2KYJ"
  });
  const messaging = firebase.messaging();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
      }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
      });
    }