// ======================
// Mock Data
// ======================
const kpis = {
  vendasHoje: 22850.40,
  variacaoVendas: 12.3,
  ticketMedio: 189.75,
  variacaoTicket: -3.1,
  itensVendidos: 342,
  variacaoItens: 5.8,
  margem: 34.2,
  variacaoMargem: 1.4
};

const vendasSemanal = [
  { dia: "Seg", valor: 1200 },
  { dia: "Ter", valor: 1650 },
  { dia: "Qua", valor: 1420 },
  { dia: "Qui", valor: 1980 },
  { dia: "Sex", valor: 2200 },
  { dia: "Sáb", valor: 1840 },
  { dia: "Dom", valor: 900 }
];

const movMensal = [
  { mes: "Jan", in: 3200, out: 2800 },
  { mes: "Fev", in: 4100, out: 3500 },
  { mes: "Mar", in: 3900, out: 3300 },
  { mes: "Abr", in: 4600, out: 4200 },
  { mes: "Mai", in: 5200, out: 4700 },
  { mes: "Jun", in: 4800, out: 5000 }
];

const estoqueCritico = [
  { sku: "AZ-001", produto: "Camiseta Azul M", estoque: 3, minimo: 10, status: "Crítico" },
  { sku: "AZ-114", produto: "Fone Bluetooth X", estoque: 2, minimo: 5, status: "Crítico" },
  { sku: "MR-090", produto: "Arroz 5kg", estoque: 8, minimo: 12, status: "Alerta" },
  { sku: "CL-442", produto: "Calça Jeans 42", estoque: 1, minimo: 6, status: "Crítico" }
];

const vendasRecentes = [
  { cliente: "João Silva", total: 320.50, hora: "10:21" },
  { cliente: "Maria Souza", total: 89.90, hora: "10:05" },
  { cliente: "Loja Bom Preço", total: 1380.00, hora: "09:47" }
];

const recebiveis = [
  { valor: 520.00, venc: "Hoje", status: "Em aberto" },
  { valor: 1290.00, venc: "D+3", status: "Em aberto" },
  { valor: 300.00, venc: "Vencido", status: "Atrasado" },
  { valor: 750.00, venc: "Pago", status: "Pago" }
];

// ======================
// Utility Functions
// ======================
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

function formatNumber(value) {
  return new Intl.NumberFormat('pt-BR').format(value);
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
    </svg>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ======================
// Render KPIs
// ======================
function renderKPIs() {
  const kpiGrid = document.getElementById('kpiGrid');
  
  const kpiData = [
    {
      label: 'Vendas do dia',
      value: formatCurrency(kpis.vendasHoje),
      variation: kpis.variacaoVendas,
      subtitle: 'vs. 7d'
    },
    {
      label: 'Ticket médio',
      value: formatCurrency(kpis.ticketMedio),
      variation: kpis.variacaoTicket,
      subtitle: 'vs. 7d'
    },
    {
      label: 'Itens vendidos',
      value: formatNumber(kpis.itensVendidos),
      variation: kpis.variacaoItens,
      subtitle: 'vs. 7d'
    },
    {
      label: 'Margem',
      value: `${kpis.margem}%`,
      variation: kpis.variacaoMargem,
      subtitle: 'vs. 7d'
    }
  ];
  
  kpiGrid.innerHTML = kpiData.map(kpi => {
    const isPositive = kpi.variation > 0;
    const badgeClass = isPositive ? 'success' : 'danger';
    const arrow = isPositive ? '↑' : '↓';
    
    return `
      <div class="kpi-card">
        <div class="kpi-label">${kpi.label}</div>
        <div class="kpi-value">${kpi.value}</div>
        <div class="kpi-footer">
          <span class="kpi-subtitle">${kpi.subtitle}</span>
          <span class="badge ${badgeClass}">
            ${arrow} ${Math.abs(kpi.variation)}%
          </span>
        </div>
      </div>
    `;
  }).join('');
}

// ======================
// Render Charts
// ======================
let salesChart, movementChart;

function renderCharts() {
  // Sales Chart (Line)
  const salesCtx = document.getElementById('salesChart').getContext('2d');
  salesChart = new Chart(salesCtx, {
    type: 'line',
    data: {
      labels: vendasSemanal.map(d => d.dia),
      datasets: [{
        label: 'Vendas',
        data: vendasSemanal.map(d => d.valor),
        borderColor: '#31487A',
        backgroundColor: 'rgba(49, 72, 122, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#31487A',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: '#1E2E4F',
          padding: 12,
          titleFont: { size: 14, weight: 'bold' },
          bodyFont: { size: 13 },
          callbacks: {
            label: function(context) {
              return 'Vendas: ' + formatCurrency(context.parsed.y);
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          },
          grid: {
            color: '#E5E7EB'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });

  // Movement Chart (Bar)
  const movementCtx = document.getElementById('movementChart').getContext('2d');
  movementChart = new Chart(movementCtx, {
    type: 'bar',
    data: {
      labels: movMensal.map(d => d.mes),
      datasets: [
        {
          label: 'Entradas',
          data: movMensal.map(d => d.in),
          backgroundColor: '#1E2E4F',
          borderRadius: 6
        },
        {
          label: 'Saídas',
          data: movMensal.map(d => d.out),
          backgroundColor: '#8FB3E2',
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2,
      plugins: {
        legend: {
          position: 'top',
          align: 'end',
          labels: {
            usePointStyle: true,
            padding: 15,
            font: { size: 12, weight: '500' }
          }
        },
        tooltip: {
          backgroundColor: '#1E2E4F',
          padding: 12,
          titleFont: { size: 14, weight: 'bold' },
          bodyFont: { size: 13 },
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          },
          grid: {
            color: '#E5E7EB'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });
}

// ======================
// Render Stock Table
// ======================
function renderTabela() {
  const tbody = document.getElementById('stockTableBody');
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Mobile: render as cards
    const tableWrapper = document.querySelector('.table-wrapper');
    tableWrapper.style.display = 'none';
    
    let mobileCards = document.querySelector('.mobile-cards');
    if (!mobileCards) {
      mobileCards = document.createElement('div');
      mobileCards.className = 'mobile-cards';
      tableWrapper.parentNode.insertBefore(mobileCards, tableWrapper.nextSibling);
    }
    
    mobileCards.innerHTML = estoqueCritico.map(item => {
      const chipClass = item.status === 'Crítico' ? 'critical' : 'warning';
      return `
        <div class="mobile-card">
          <div class="mobile-card-row">
            <span class="mobile-card-label">SKU</span>
            <span class="mobile-card-value">${item.sku}</span>
          </div>
          <div class="mobile-card-row">
            <span class="mobile-card-label">Produto</span>
            <span class="mobile-card-value">${item.produto}</span>
          </div>
          <div class="mobile-card-row">
            <span class="mobile-card-label">Estoque</span>
            <span class="mobile-card-value">${item.estoque} / ${item.minimo}</span>
          </div>
          <div class="mobile-card-row">
            <span class="mobile-card-label">Status</span>
            <span class="chip ${chipClass}">${item.status}</span>
          </div>
          <div class="mobile-card-actions">
            <button class="btn-action btn-primary btn-block" onclick="showToast('Ajuste registrado!')">
              Ajustar
            </button>
          </div>
        </div>
      `;
    }).join('');
  } else {
    // Desktop: render as table
    const mobileCards = document.querySelector('.mobile-cards');
    if (mobileCards) {
      mobileCards.style.display = 'none';
    }
    
    const tableWrapper = document.querySelector('.table-wrapper');
    tableWrapper.style.display = 'block';
    
    tbody.innerHTML = estoqueCritico.map(item => {
      const chipClass = item.status === 'Crítico' ? 'critical' : 'warning';
      return `
        <tr>
          <td><strong>${item.sku}</strong></td>
          <td>${item.produto}</td>
          <td>${item.estoque}</td>
          <td>${item.minimo}</td>
          <td><span class="chip ${chipClass}">${item.status}</span></td>
          <td>
            <div class="action-buttons">
              <button class="btn-action btn-outline" onclick="showToast('Ajuste registrado!')">
                Ajustar
              </button>
              <button class="btn-action btn-primary" onclick="showToast('Pedido gerado!')">
                Gerar pedido
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }
}

// ======================
// Render Recent Sales
// ======================
function renderRecentSales() {
  const list = document.getElementById('recentSalesList');
  list.innerHTML = vendasRecentes.map(venda => `
    <div class="list-item">
      <div class="list-item-header">
        <span class="list-item-title">${venda.cliente}</span>
        <span class="list-item-value">${formatCurrency(venda.total)}</span>
      </div>
      <div class="list-item-meta">${venda.hora}</div>
    </div>
  `).join('');
}

// ======================
// Render Receivables
// ======================
function renderReceivables() {
  const list = document.getElementById('receivablesList');
  list.innerHTML = recebiveis.map(rec => {
    let chipClass = 'info';
    if (rec.status === 'Pago') chipClass = 'success';
    if (rec.status === 'Atrasado') chipClass = 'critical';
    
    return `
      <div class="list-item">
        <div class="list-item-header">
          <span class="list-item-title">${rec.venc}</span>
          <span class="list-item-value">${formatCurrency(rec.valor)}</span>
        </div>
        <div class="list-item-meta">
          <span class="chip ${chipClass}">${rec.status}</span>
        </div>
      </div>
    `;
  }).join('');
}

// ======================
// Bind Interactions
// ======================
function bindInteractions() {
  // Menu toggle (mobile)
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
  
  // Close sidebar when clicking outside (mobile)
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    }
  });
  
  // Search shortcut "/"
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      document.getElementById('searchInput').focus();
    }
  });
  
  // Period selector
  const periodButtons = document.querySelectorAll('.period-btn');
  periodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      periodButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showToast(`Filtro aplicado: ${btn.textContent}`);
    });
  });
  
  // Window resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      renderTabela();
    }, 250);
  });
}

// ======================
// Initialize App
// ======================
function init() {
  // Show brief skeleton/loading state
  setTimeout(() => {
    renderKPIs();
    renderCharts();
    renderTabela();
    renderRecentSales();
    renderReceivables();
    bindInteractions();
  }, 100);
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}