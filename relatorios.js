document.addEventListener('DOMContentLoaded', () => {
  const reportGrid = document.getElementById('reportGrid');
  const searchInput = document.getElementById('searchInput');

  // Lista de relatórios disponíveis
  const reports = [
    {
      title: 'Vendas por Período',
      description: 'Analise o volume de vendas em um intervalo de datas.',
      url: 'relatorio-vendas-periodo.html',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V10M18 20V4M6 20V16"/></svg>`
    },
    {
      title: 'Estoque Crítico',
      description: 'Liste produtos com estoque abaixo do nível mínimo.',
      url: 'relatorio-estoque-critico.html',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5zM16 8L2 22M17.5 15H9"/></svg>`
    },
    {
      title: 'Fluxo de Caixa',
      description: 'Visualize as entradas e saídas financeiras.',
      url: '#', // Substituir pelo link real
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`
    },
    {
      title: 'Produtos Mais Vendidos',
      description: 'Ranking dos produtos com maior volume de vendas.',
      url: '#', // Substituir pelo link real
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`
    },
    // Adicione os outros 4 relatórios aqui quando estiverem prontos
  ];

  // Função para renderizar os cards de relatório
  function renderReports(filter = '') {
    reportGrid.innerHTML = '';
    const filteredReports = reports.filter(report =>
      report.title.toLowerCase().includes(filter.toLowerCase()) ||
      report.description.toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredReports.length === 0) {
      reportGrid.innerHTML = `<p class="no-results">Nenhum relatório encontrado.</p>`;
      return;
    }

    filteredReports.forEach(report => {
      const card = document.createElement('a');
      card.href = report.url;
      card.className = 'report-card';
      card.innerHTML = `
        <div class="report-card-icon">${report.icon}</div>
        <div class="report-card-content">
          <h3 class="report-card-title">${report.title}</h3>
          <p class="report-card-description">${report.description}</p>
        </div>
      `;
      reportGrid.appendChild(card);
    });
  }

  // Event listener para a busca em tempo real
  searchInput.addEventListener('input', () => {
    renderReports(searchInput.value);
  });

  // Renderização inicial
  renderReports();
});