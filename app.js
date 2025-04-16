/* js/app.js */

// هذا السكريبت المسؤول عن تحميل المحتوى المناسب (login.html أو main.html)
// استنادًا إلى حالة المصادقة في Firebase

document.addEventListener('DOMContentLoaded', () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // إذا كان المستخدم مسجلاً دخوله، يتم تحميل main.html
      fetch('main.html')
        .then(response => response.text())
        .then(html => {
          document.getElementById('content').innerHTML = html;
        })
        .catch(err => console.error("Error loading main page:", err));
    } else {
      // إذا لم يكن المستخدم مسجلاً الدخول، يتم تحميل login.html
      fetch('login.html')
        .then(response => response.text())
        .then(html => {
          document.getElementById('content').innerHTML = html;
        })
        .catch(err => console.error("Error loading login page:", err));
    }
  });
});
