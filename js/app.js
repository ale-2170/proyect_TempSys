// View logic
function switchView(view) {
  const dashboard = document.getElementById('dashboard-view');
  const users = document.getElementById('users-view');
  const title = document.getElementById('page-title');
  const subtitle = document.getElementById('page-subtitle');
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach((item) => item.classList.remove('active'));

  if (view === 'dashboard') {
    dashboard.classList.remove('hidden');
    users.classList.add('hidden');
    title.innerText = 'Monitoring Dashboard';
    subtitle.innerText = 'Visualización en tiempo real del cuarto de servidores';
    document.querySelector('.nav-item:nth-child(1)').classList.add('active');
  } else if (view === 'users') {
    dashboard.classList.add('hidden');
    users.classList.remove('hidden');
    title.innerText = 'Gestión de Usuarios';
    subtitle.innerText = 'Administración de accesos y perfiles';
    document.querySelector('.nav-item:nth-child(2)').classList.add('active');
  }

  // Refresh icons just in case
  lucide.createIcons();
}

// Chart.js Setup
const ctx = document.getElementById('tempChart').getContext('2d');
let gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(0, 242, 254, 0.3)');
gradient.addColorStop(1, 'rgba(0, 242, 254, 0)');

const tempChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30'],
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: [23, 23.5, 24, 24.5, 24, 23.8, 24.5],
        borderColor: '#00f2fe',
        borderWidth: 3,
        fill: true,
        backgroundColor: gradient,
        tension: 0.4,
        pointBackgroundColor: '#00f2fe',
        pointRadius: 4,
      },
      {
        label: 'Humedad (%)',
        data: [45, 46, 45, 44, 45, 47, 45],
        borderColor: '#4facfe',
        borderWidth: 3,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: '#4facfe',
        pointRadius: 4,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#f8fafc',
          font: { family: 'Outfit' },
        },
      },
    },
    scales: {
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#94a3b8' },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8' },
      },
    },
  },
});
