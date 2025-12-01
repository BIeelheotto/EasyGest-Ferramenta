document.addEventListener('DOMContentLoaded', () => {
    // Para consistência com o prompt, vamos fixar "hoje" como 13 de Nov de 2025.
    // Em um ambiente real, usaríamos 'new Date()'.
    const hoje = new Date('2025-11-13T12:00:00');

    // Mock de dados de vendas (simulando uma API/backend)
    const allSalesData = [
        // Vendas de "hoje" (13/11/2025)
        { date: '2025-11-13', product: 'Teclado Mecânico', client: 'Mariana Lima', value: 350.00 },
        { date: '2025-11-13', product: 'Monitor 24"', client: 'Fábio Martins', value: 950.75 },
        
        // Vendas dos últimos 7 dias
        { date: '2025-11-12', product: 'Camiseta Azul M', client: 'João Silva', value: 129.90 },
        { date: '2025-11-11', product: 'Fone Bluetooth X', client: 'Maria Souza', value: 239.00 },
        { date: '2025-11-09', product: 'Arroz 5kg', client: 'Supermercado Dia', value: 29.50 },
        { date: '2025-11-07', product: 'Calça Jeans 42', client: 'Ana Costa', value: 169.00 },

        // Vendas dos últimos 30 dias
        { date: '2025-11-02', product: 'Mouse Óptico', client: 'Pedro Oliveira', value: 59.90 },
        { date: '2025-10-28', product: 'Café Torrado 500g', client: 'Padaria Pão Quente', value: 24.90 },
        { date: '2025-10-20', product: 'Camiseta Azul M', client: 'Carlos Ferreira', value: 129.90 },
        { date: '2025-10-15', product: 'Venda Corporativa', client: 'Loja Bom Preço LTDA', value: 1380.00 },
    ];

    const kpiGrid = document.getElementById('reportKpiGrid');
    const tableBody = document.getElementById('vendasTableBody');
    const chartCanvas = document.getElementById('vendasPeriodoChart');
    const customFiltersContainer = document.getElementById('customFilters');
    const specificDayInput = document.getElementById('specificDay');
    const specificMonthInput = document.getElementById('specificMonth');
    const applyCustomFilterBtn = document.getElementById('applyCustomFilter');
    let salesChart;

    // Função para formatar moeda
    const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    // Função para renderizar os dados (KPIs, tabela, gráfico)
    function renderReportData(data) {
        renderKPIs(data);
        renderTable(data);
        renderChart(data);
    }

    // Função principal para atualizar o relatório com base nos botões de período
    function updateSalesReport(period) {
        customFiltersContainer.style.display = 'none'; // Esconde os filtros personalizados
        
        const endDate = new Date(hoje);
        endDate.setHours(23, 59, 59, 999);

        let startDate = new Date(hoje);
        startDate.setHours(0, 0, 0, 0);

        if (period === 'today') {
            // startDate já está configurado
        } else if (period === '7d') {
            startDate.setDate(startDate.getDate() - 6);
        } else if (period === '30d') {
            startDate.setDate(startDate.getDate() - 29);
        } else if (period === 'custom') {
            customFiltersContainer.style.display = 'flex';
            // Não renderiza nada ainda, espera o usuário aplicar o filtro
            return;
        }

        const filteredData = allSalesData.filter(sale => {
            const saleDate = new Date(sale.date + 'T00:00:00');
            return saleDate >= startDate && saleDate <= endDate;
        });

        renderReportData(filteredData);
    }

    // Função para aplicar os filtros personalizados de dia ou mês
    function applyCustomFilter() {
        const day = specificDayInput.value;
        const month = specificMonthInput.value;
        let filteredData = [];
        let toastMessage = '';

        if (day) {
            // Prioriza o filtro por dia
            const targetDate = new Date(day + 'T00:00:00');
            filteredData = allSalesData.filter(sale => {
                const saleDate = new Date(sale.date + 'T00:00:00');
                return saleDate.getTime() === targetDate.getTime();
            });
            toastMessage = `Vendas para o dia ${targetDate.toLocaleDateString('pt-BR')}`;
            specificMonthInput.value = ''; // Limpa o outro campo
        } else if (month) {
            // Filtra pelo mês inteiro
            const [year, monthNum] = month.split('-');
            const startDate = new Date(year, monthNum - 1, 1);
            const endDate = new Date(year, monthNum, 0); // O dia 0 do próximo mês é o último dia do mês atual
            
            filteredData = allSalesData.filter(sale => {
                const saleDate = new Date(sale.date + 'T00:00:00');
                return saleDate >= startDate && saleDate <= endDate;
            });
            toastMessage = `Vendas para ${startDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}`;
        } else {
            if (typeof showToast === 'function') {
                showToast('Por favor, selecione um dia ou um mês.', 'error');
            }
            return;
        }

        renderReportData(filteredData);
        if (typeof showToast === 'function') {
            showToast(toastMessage);
        }
    }

    // Renderiza os Indicadores Chave (KPIs)
    function renderKPIs(data) {
        const totalVendas = data.reduce((sum, sale) => sum + sale.value, 0);
        const numVendas = data.length;
        const ticketMedio = numVendas > 0 ? totalVendas / numVendas : 0;

        kpiGrid.innerHTML = `
            <div class="kpi-card">
                <div class="kpi-label">Total Vendido</div>
                <div class="kpi-value">${formatCurrency(totalVendas)}</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-label">Nº de Vendas</div>
                <div class="kpi-value">${numVendas}</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-label">Ticket Médio</div>
                <div class="kpi-value">${formatCurrency(ticketMedio)}</div>
            </div>
        `;
    }

    // Renderiza a tabela de dados detalhados
    function renderTable(data) {
        if (data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">Nenhuma venda encontrada para o período.</td></tr>`;
            return;
        }
        tableBody.innerHTML = data.map(sale => `
            <tr>
                <td>${new Date(sale.date + 'T00:00:00').toLocaleDateString('pt-BR')}</td>
                <td>${sale.product}</td>
                <td>${sale.client}</td>
                <td>${formatCurrency(sale.value)}</td>
            </tr>
        `).join('');
    }

    // Renderiza o gráfico de vendas
    function renderChart(data) {
        if (salesChart) {
            salesChart.destroy();
        }

        const salesByDay = data.reduce((acc, sale) => {
            const day = sale.date;
            acc[day] = (acc[day] || 0) + sale.value;
            return acc;
        }, {});

        const sortedDays = Object.keys(salesByDay).sort((a, b) => new Date(a) - new Date(b));
        const chartLabels = sortedDays.map(day => new Date(day + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }));
        const chartData = sortedDays.map(day => salesByDay[day]);

        salesChart = new Chart(chartCanvas, {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: 'Vendas',
                    data: chartData,
                    borderColor: 'var(--primary)',
                    backgroundColor: 'rgba(30, 46, 79, 0.1)',
                    fill: true,
                    tension: 0.3,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, ticks: { callback: value => formatCurrency(value) } }
                }
            }
        });
    }

    // Conecta os botões de período à função de atualização
    const periodButtons = document.querySelectorAll('.period-btn');
    periodButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            periodButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateSalesReport(btn.dataset.period);
            if (btn.dataset.period !== 'custom' && typeof showToast === 'function') {
                showToast(`Filtro aplicado: ${btn.textContent}`);
            }
        });
    });

    // Conecta o botão de aplicar filtro personalizado
    applyCustomFilterBtn.addEventListener('click', applyCustomFilter);

    // Limpa o campo de dia se um mês for selecionado
    specificMonthInput.addEventListener('change', () => {
        if (specificMonthInput.value) {
            specificDayInput.value = '';
        }
    });

    // Limpa o campo de mês se um dia for selecionado
    specificDayInput.addEventListener('change', () => {
        if (specificDayInput.value) {
            specificMonthInput.value = '';
        }
    });

    // Carga inicial do relatório com o período padrão ("Hoje")
    updateSalesReport('today');
});