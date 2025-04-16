/* js/main.js */

// سكريبت مخصص لصفحة التطبيق الرئيسية (main.html)

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupLogout();
  loadDashboardData();
  // يمكنك إضافة المزيد من دوال التهيئة هنا
});

const setupNavigation = () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const pageContainers = document.querySelectorAll('.page-container');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetPage = link.getAttribute('data-page');
      navLinks.forEach(l => l.classList.remove('bg-gray-100', 'dark:bg-gray-700', 'active'));
      link.classList.add('bg-gray-100', 'dark:bg-gray-700', 'active');
      pageContainers.forEach(container => container.classList.add('hidden'));
      const targetContainer = document.getElementById(`${targetPage}-container`);
      if (targetContainer) {
        targetContainer.classList.remove('hidden');
        // بناءً على الصفحة، قم بتحميل البيانات اللازمة
        switch (targetPage) {
          case 'dashboard':
            loadDashboardData();
            break;
          // أضف باقي الحالات للصفحات الأخرى إذا رغبت
        }
      }
    });
  });
};

const setupLogout = () => {
  const logoutButton = document.getElementById('logout-button');
  logoutButton.addEventListener('click', async () => {
    try {
      await firebase.auth().signOut();
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  });
};

const loadDashboardData = async () => {
  try {
    const salesSnapshot = await firebase.firestore().collection('sales').get();
    let totalSales = 0;
    salesSnapshot.forEach(doc => {
      const sale = doc.data();
      totalSales += parseFloat(sale.total || 0);
    });
    document.getElementById('total-sales').textContent = formatCurrency(totalSales);
    // يمكنك إضافة تحميل بيانات أخرى مثل العملاء النشطين والمرتجعات
  } catch (error) {
    console.error("Error loading dashboard data:", error);
  }
};

const formatCurrency = (amount) => {
  return amount.toLocaleString('ar-EG', { style: 'currency', currency: 'EGP' })
    .replace('E£', '') + ' ج.م';
};
