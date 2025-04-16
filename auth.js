/* js/auth.js */

// سكريبت خاص بصفحة تسجيل الدخول (login.html)

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      loginError.classList.add('hidden');
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // عند النجاح إعادة تحميل الصفحة لإظهار الصفحة الرئيسية
      window.location.reload();
    } catch (error) {
      loginError.textContent = getAuthErrorMessage(error.code);
      loginError.classList.remove('hidden');
    }
  });

  const getAuthErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'البريد الإلكتروني غير صحيح.';
      case 'auth/user-disabled':
        return 'تم تعطيل حساب المستخدم هذا.';
      case 'auth/user-not-found':
        return 'لا يوجد مستخدم بهذا البريد الإلكتروني.';
      case 'auth/wrong-password':
        return 'كلمة المرور غير صحيحة.';
      default:
        return 'حدث خطأ أثناء تسجيل الدخول.';
    }
  };
});
