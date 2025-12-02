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

const vendasDetalhadas = [
  { data: "01/11/2025", produto: "Produto A", cliente: "Cliente 1", valor: 100.00 },
  { data: "01/11/2025", produto: "Produto B", cliente: "Cliente 2", valor: 150.00 },
  { data: "02/11/2025", produto: "Produto A", cliente: "Cliente 3", valor: 100.00 },
  { data: "03/11/2025", produto: "Produto C", cliente: "Cliente 1", valor: 200.00 },
  { data: "04/11/2025", produto: "Produto B", cliente: "Cliente 4", valor: 150.00 },
  { data: "05/11/2025", produto: "Produto A", cliente: "Cliente 2", valor: 100.00 },
  { data: "06/11/2025", produto: "Produto C", cliente: "Cliente 3", valor: 200.00 },
  { data: "07/11/2025", produto: "Produto A", cliente: "Cliente 4", valor: 100.00 },
  { data: "08/11/2025", produto: "Produto B", cliente: "Cliente 1", valor: 150.00 },
  { data: "09/11/2025", produto: "Produto C", cliente: "Cliente 2", valor: 200.00 },
  { data: "10/11/2025", produto: "Produto A", cliente: "Cliente 3", valor: 100.00 },
  { data: "11/11/2025", produto: "Produto B", cliente: "Cliente 4", valor: 150.00 },
  { data: "12/11/2025", produto: "Produto C", cliente: "Cliente 1", valor: 200.00 },
];

// ======================
// Mock Data for Reports
// ======================
const relatorios = [
      {
        id: 1,
        titulo: 'Vendas por Período',
        descricao: 'Análise detalhada das vendas realizadas em um período específico, com gráficos e totalizadores.',
        link: 'relatorio-vendas-periodo.html',
        icone: `<svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
        </svg>`
      },
      {
        id: 2,
        titulo: 'Estoque Crítico',
        descricao: 'Lista de produtos com estoque abaixo do mínimo, incluindo sugestões de reposição.',
        link: 'relatorio-estoque-critico.html',
        icone: `<svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM13 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z"/>
        </svg>`
      },
      {
        id: 3,
        titulo: 'Fluxo de Caixa',
        descricao: 'Demonstrativo de entradas e saídas financeiras, com projeções e análise de saldo.',
        link: '#',
        icone: `<svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
        </svg>`
      },
      {
        id: 4,
        titulo: 'Clientes Ativos',
        descricao: 'Relatório completo de clientes ativos, com histórico de compras e informações de contato.',
        link: '#',
        icone: `<svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
        </svg>`
      },
      {
        id: 5,
        titulo: 'Produtos Mais Vendidos',
        descricao: 'Ranking dos produtos com maior volume de vendas, incluindo análise de margem e lucratividade.',
        link: '#',
        icone: `<svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
        </svg>`
      },
      {
        id: 6,
        titulo: 'Contas a Receber',
        descricao: 'Listagem de todas as contas a receber, com datas de vencimento e status de pagamento.',
        link: '#',
        icone: `<svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
        </svg>`
      },
      {
        id: 7,
        titulo: 'Contas a Pagar',
        descricao: 'Demonstrativo de todas as despesas pendentes, com priorização por data de vencimento.',
        link: '#',
        icone: `<svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd"/>
        </svg>`
      },
      {
        id: 8,
        titulo: 'Análise de Margem',
        descricao: 'Análise detalhada da margem de lucro por produto, categoria e período.',
        link: '#',
        icone: `<svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clip-rule="evenodd"/>
        </svg>`
      }
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
  if (!container) return;
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
  if (!kpiGrid) return;
  
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
  const salesCtx = document.getElementById('salesChart')?.getContext('2d');
  if(salesCtx) {
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
  }


  // Movement Chart (Bar)
  const movementCtx = document.getElementById('movementChart')?.getContext('2d');
  if(movementCtx) {
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
}

// ======================
// Render Stock Table
// ======================
function renderTabela() {
  const tbody = document.getElementById('stockTableBody');
  if (!tbody) return;

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
  if (!list) return;
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
  if (!list) return;
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
// Reports Page Functions
// ======================
function renderRelatorios() {
  const grid = document.getElementById('reportGrid');
  if (!grid) return;

  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
  
  const filtered = relatorios.filter(r => 
    r.titulo.toLowerCase().includes(searchTerm) || 
    r.descricao.toLowerCase().includes(searchTerm)
  );

  grid.innerHTML = filtered.map(r => `
    <a href="${r.link}" class="report-card" role="button" tabindex="0" aria-label="Gerar ${r.titulo}" data-id="${r.id}">
      <div class="report-icon">${r.icone}</div>
      <div class="report-title">${r.titulo}</div>
      <div class="report-description">${r.descricao}</div>
    </a>
  `).join('');
}

function handleReportClick(event) {
  const card = event.target.closest('.report-card');
  if (!card) return;

  const id = parseInt(card.dataset.id, 10);
  const relatorio = relatorios.find(r => r.id === id);
  
  if (relatorio && relatorio.link === '#') {
    event.preventDefault();
    showToast(`Gerando relatório: ${relatorio.titulo}...`);
    
    setTimeout(() => {
      showToast(`Relatório "${relatorio.titulo}" gerado com sucesso!`);
    }, 1500);
  }
}

// ======================
// Bind Interactions
// ======================
function bindInteractions() {
  // Menu toggle (mobile)
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.querySelector('.sidebar');
  
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent the click from immediately closing the sidebar
      sidebar.classList.toggle('open');
    });
  }
  
  // Close sidebar when clicking outside (mobile)
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      if (sidebar && !sidebar.contains(e.target) && menuToggle && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    }
  });
  
  // Search shortcut "/"
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
      const searchInput = document.getElementById('searchInput');
      if (searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    }
  });
  
  // Period selector
  const periodButtons = document.querySelectorAll('.period-btn');
  periodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      periodButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const period = btn.dataset.period;
      showToast(`Filtro aplicado: ${btn.textContent}`);

      // Se estiver na página de relatório de vendas, atualiza o relatório
      if (typeof window.updateSalesReport === 'function') {
        window.updateSalesReport(period);
      }
    });
  });

  // Report page specific bindings
  const reportGrid = document.getElementById('reportGrid');
  if (reportGrid) {
      const searchInput = document.getElementById('searchInput');
      if (searchInput) {
        searchInput.addEventListener('input', renderRelatorios);
      }

      reportGrid.addEventListener('click', handleReportClick);

      reportGrid.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && e.target.classList.contains('report-card')) {
              e.target.click();
          }
      });
  }
  
  // Window resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if(document.getElementById('stockTableBody')) {
        renderTabela();
      }
    }, 250);
  });
}

// ======================
// Initialize App
// ======================
function highlightCurrentNavItem() {
  const currentPath = window.location.pathname.split('/').pop(); // Get the current file name
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item, .sidebar-footer .nav-item');

  navItems.forEach(item => {
    item.classList.remove('active');
    const href = item.getAttribute('href');
    if (href && href.includes(currentPath)) {
      item.classList.add('active');
    }
  });
}

function init() {
    if(document.getElementById('kpiGrid')) {
      renderKPIs();
    }
    if(document.getElementById('salesChart') || document.getElementById('movementChart')) {
      renderCharts();
    }
    if(document.getElementById('stockTableBody')) {
      renderTabela();
    }
    if(document.getElementById('recentSalesList')) {
      renderRecentSales();
    }
    if(document.getElementById('receivablesList')) {
      renderReceivables();
    }
    if(document.getElementById('reportGrid')) {
      renderRelatorios();
    }
    highlightCurrentNavItem(); // Highlight the current navigation item
    bindInteractions();
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}