// =================================================================================
// MOCK DATA & HELPERS
// =================================================================================

// Helper para formatar data
const formatDate = (isoString) => {
    if (!isoString) return '—';
    const [year, month, day] = isoString.split('-');
    return `${day}/${month}/${year}`;
};

// Dados de Exemplo Expandidos
const mockData = {
    contasPagar: [
        { id: 1, fornecedor: "Tech Solutions", nfe: "NFE-00123", vencimento: "2025-12-10", valor: 5250.75, centroCusto: "TI", status: "Pendente" },
        { id: 2, fornecedor: "Office Supplies Co.", nfe: "NFE-00124", vencimento: "2025-12-15", valor: 780.50, centroCusto: "Administrativo", status: "Aprovado" },
        { id: 3, fornecedor: "Marketing Criativo", nfe: "NFE-00125", vencimento: "2025-11-28", valor: 3500.00, centroCusto: "Marketing", status: "Pago" },
        { id: 4, fornecedor: "Infraestrutura Web", nfe: "NFE-00126", vencimento: "2025-12-20", valor: 1800.00, centroCusto: "TI", status: "Pendente" },
        { id: 5, fornecedor: "Consultoria Legal", nfe: "NFE-00127", vencimento: "2025-12-05", valor: 7500.00, centroCusto: "Jurídico", status: "Pago" },
        { id: 6, fornecedor: "Transportadora Veloz", nfe: "NFE-00128", vencimento: "2025-12-22", valor: 2100.00, centroCusto: "Logística", status: "Pendente" },
        { id: 7, fornecedor: "Agência de Viagens Corp", nfe: "NFE-00129", vencimento: "2025-12-18", valor: 4200.00, centroCusto: "Diretoria", status: "Pendente" },
        { id: 8, fornecedor: "Manutenção Predial Ltda", nfe: "NFE-00130", vencimento: "2025-12-12", valor: 1350.80, centroCusto: "Administrativo", status: "Aprovado" },
        { id: 9, fornecedor: "Cloud Services Inc.", nfe: "NFE-00131", vencimento: "2026-01-01", valor: 999.00, centroCusto: "TI", status: "Aprovado" },
        { id: 10, fornecedor: "Refeições Corporativas", nfe: "NFE-00132", vencimento: "2025-11-30", valor: 6800.00, centroCusto: "RH", status: "Pago" },
        { id: 11, fornecedor: "Segurança Patrimonial", nfe: "NFE-00133", vencimento: "2025-12-28", valor: 8800.00, centroCusto: "Segurança", status: "Pendente" },
        { id: 12, fornecedor: "Gráfica Impressão Total", nfe: "NFE-00134", vencimento: "2025-12-19", valor: 450.00, centroCusto: "Marketing", status: "Pendente" },
        { id: 13, fornecedor: "Limpeza & Cia", nfe: "NFE-00135", vencimento: "2025-11-25", valor: 2300.00, centroCusto: "Administrativo", status: "Pago" },
        { id: 14, fornecedor: "Telecomunicações S.A.", nfe: "NFE-00136", vencimento: "2025-12-10", valor: 3100.00, centroCusto: "Geral", status: "Aprovado" },
        { id: 15, fornecedor: "Aluguel de Equipamentos", nfe: "NFE-00137", vencimento: "2026-01-05", valor: 1250.00, centroCusto: "TI", status: "Pendente" },
    ],
    contasReceber: [
        { id: 1, cliente: "Inova Corp", nfe: "NFE-501", vencimento: "2025-12-05", valor: 15000, status: "Aberto", atraso: 0 },
        { id: 2, cliente: "Global Trade", nfe: "NFE-502", vencimento: "2025-11-15", valor: 8500, status: "Atrasado", atraso: 18 },
        { id: 3, cliente: "Varejo Express", nfe: "NFE-503", vencimento: "2025-12-25", valor: 22000, status: "Aberto", atraso: 0 },
        { id: 4, cliente: "Construtora Alfa", nfe: "NFE-504", vencimento: "2025-10-10", valor: 45000, status: "Atrasado", atraso: 54 },
        { id: 5, cliente: "Startup Vision", nfe: "NFE-505", vencimento: "2025-11-30", valor: 5500, status: "Pago", atraso: 0 },
        { id: 6, cliente: "Design Studio", nfe: "NFE-506", vencimento: "2025-12-29", valor: 9800, status: "Aberto", atraso: 0 },
        { id: 7, cliente: "Food Service Brasil", nfe: "NFE-507", vencimento: "2025-11-01", valor: 12400, status: "Pago", atraso: 0 },
    ],
    conciliacao: [
        { id: 1, data: "2025-12-01", descricao: "Recebimento NF-501", valorExtrato: 15000.00, valorSistema: 15000.00, status: "Conciliado" },
        { id: 2, data: "2025-12-01", descricao: "Taxa de Manutenção", valorExtrato: -35.50, valorSistema: 0, status: "Divergente" },
        { id: 3, data: "2025-12-02", descricao: "Pagamento Fornecedor Tech", valorExtrato: -5250.75, valorSistema: -5250.75, status: "Pendente" },
        { id: 4, data: "2025-12-03", descricao: "TED Cliente Y", valorExtrato: 4200.00, valorSistema: 4200.00, status: "Pendente" },
        { id: 5, data: "2025-12-03", descricao: "Pagamento Salários", valorExtrato: -85340.00, valorSistema: -85340.00, status: "Pendente" },
        { id: 6, data: "2025-12-04", descricao: "Estorno Compra", valorExtrato: 150.00, valorSistema: 0, status: "Divergente" },
    ]
};

// Status e classes de badge
const statusMap = {
    Pendente: 'warning',
    Aprovado: 'info',
    Pago: 'success',
    Aberto: 'info',
    Atrasado: 'danger',
    Conciliado: 'success',
    Divergente: 'danger',
};

// =================================================================================
// LÓGICA DE NAVEGAÇÃO DAS ABAS
// =================================================================================
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' de todos os botões e conteúdos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Adiciona 'active' ao botão clicado e ao conteúdo correspondente
            button.classList.add('active');
            const targetContent = document.getElementById(button.dataset.tab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}


// =================================================================================
// RENDERIZAÇÃO DAS TABELAS
// =================================================================================

function renderTables() {
    renderContasPagar();
    renderContasReceber();
    renderConciliacao();
}

function renderContasPagar() {
    const tableBody = document.querySelector('#contasPagar tbody');
    if (!tableBody) return;
    tableBody.innerHTML = mockData.contasPagar.map(conta => `
        <tr>
            <td>${conta.fornecedor}</td>
            <td>${conta.nfe}</td>
            <td>${formatDate(conta.vencimento)}</td>
            <td class="currency">${formatCurrency(conta.valor)}</td>
            <td>${conta.centroCusto}</td>
            <td><span class="chip ${statusMap[conta.status]}">${conta.status}</span></td>
            <td class="actions">
                ${conta.status === 'Pendente' ? `<button class="btn-icon" data-action="aprovar" data-id="${conta.id}" title="Aprovar Pagamento"><svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg></button>` : ''}
                <button class="btn-icon" data-action="detalhes-pagar" data-id="${conta.id}" title="Ver Detalhes"><svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8zm15 0A8 8 0 1 0 0 8a8 8 0 0 0 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/></svg></button>
            </td>
        </tr>
    `).join('');
}

function renderContasReceber() {
    const tableBody = document.querySelector('#contasReceber tbody');
    if (!tableBody) return;
    tableBody.innerHTML = mockData.contasReceber.map(conta => `
        <tr>
            <td>${conta.cliente}</td>
            <td>${conta.nfe}</td>
            <td>${formatDate(conta.vencimento)}</td>
            <td class="currency">${formatCurrency(conta.valor)}</td>
            <td><span class="chip ${statusMap[conta.status]}">${conta.status}</span></td>
            <td>${conta.atraso > 0 ? `<span class="text-danger">${conta.atraso} dias</span>` : '—'}</td>
            <td class="actions">
                 <button class="btn-icon" data-action="enviar-fatura" data-id="${conta.id}" title="Enviar Fatura"><svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M2 2a2 2 0 0 1 2-2h8.014a2 2 0 0 1 1.482.607l.012.012L15.393 2.5a2 2 0 0 1 .607 1.482V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm11.5 2.5L11.5 3H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-1zM9.5 7a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 2a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/></svg></button>
                 ${conta.status === 'Atrasado' ? `<button class="btn-icon" data-action="negociar" data-id="${conta.id}" title="Negociar Dívida"><svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.67 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/></svg></button>` : ''}
            </td>
        </tr>
    `).join('');
}

function renderConciliacao() {
    const tableBody = document.querySelector('#conciliacao tbody');
    if (!tableBody) return;
    tableBody.innerHTML = mockData.conciliacao.map(item => `
        <tr class="${item.status === 'Conciliado' ? 'reconciled' : ''}">
            <td>${formatDate(item.data)}</td>
            <td>${item.descricao}</td>
            <td class="currency">${formatCurrency(item.valorExtrato)}</td>
            <td class="currency">${formatCurrency(item.valorSistema)}</td>
            <td><span class="chip ${statusMap[item.status]}">${item.status}</span></td>
            <td class="actions">
                <div class="form-check">
                  <input type="checkbox" id="conciliar-${item.id}" data-id="${item.id}" ${item.status === 'Conciliado' ? 'checked' : ''}>
                  <label for="conciliar-${item.id}">Conciliar</label>
                </div>
            </td>
        </tr>
    `).join('');
}

// =================================================================================
// GRÁFICOS
// =================================================================================
let cashFlowChart;

function renderCharts() {
    const cashFlowSimChartEl = document.getElementById('cashFlowSimulationChart');
    if (!cashFlowSimChartEl) return;

    const labels = Array.from({ length: 7 }, (_, i) => `D+${i * 5}`);
    const projectedData = [58000, 55000, 62000, 68000, 65000, 72000, 78000];

    const chartData = {
        labels: labels,
        datasets: [{
            label: 'Saldo Projetado',
            data: projectedData,
            borderColor: '#1E2E4F',
            backgroundColor: 'rgba(30, 46, 79, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#1E2E4F',
        },
        {
            label: 'Saldo Simulado',
            data: [], // Inicia vazio
            borderColor: '#E94A4A',
            backgroundColor: 'rgba(233, 74, 74, 0.1)',
            fill: true,
            tension: 0.4,
            borderDash: [5, 5],
            pointBackgroundColor: '#E94A4A',
        }]
    };

    if (cashFlowChart) {
        cashFlowChart.destroy();
    }
    
    cashFlowChart = new Chart(cashFlowSimChartEl, {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: 'Projeção de Fluxo de Caixa (Próximos 30 dias)' },
                tooltip: { mode: 'index', intersect: false },
            },
            scales: {
                y: { ticks: { callback: (value) => formatCurrency(value) } }
            },
        },
    });
}

function simulateCashFlowChange() {
    if (!cashFlowChart) return;

    // Simulação: adiar um pagamento de R$7.500 que ocorreria em D+10
    const originalData = cashFlowChart.data.datasets[0].data.slice(); // Copia os dados originais
    const simulatedData = originalData.map((value, index) => {
        // A simulação afeta do D+10 em diante
        if (index >= 2) { // 'D+10' é o terceiro item (índice 2)
            return value + 7500;
        }
        return value;
    });

    cashFlowChart.data.datasets[1].data = simulatedData;
    cashFlowChart.update();
    showToast('Simulação aplicada: Pagamento adiado.', 'info');
}

// =================================================================================
// INICIALIZAÇÃO E EVENT LISTENERS
// =================================================================================

document.addEventListener('DOMContentLoaded', () => {
    setupTabs();
    renderTables();
    renderCharts();
    setupEventListeners();

    // Adiciona o botão de simulação se estivermos na aba de fluxo de caixa
    const fluxoCaixaContent = document.getElementById('fluxoCaixa');
    if(fluxoCaixaContent && !fluxoCaixaContent.querySelector('#simulateBtn')) {
        const btn = document.createElement('button');
        btn.id = 'simulateBtn';
        btn.className = 'btn btn-secondary';
        btn.textContent = 'Simular Adiantamento de Recebível';
        btn.style.marginTop = '1rem';
        btn.style.marginLeft = '1rem';
        fluxoCaixaContent.appendChild(btn);
        btn.addEventListener('click', simulateCashFlowChange);
    }
});

function setupEventListeners() {
    const content = document.querySelector('.content');
    if (!content) return;
    
    content.addEventListener('click', (e) => {
        const button = e.target.closest('button[data-action]');
        const checkbox = e.target.closest('input[type="checkbox"][data-id]');

        if (button) {
            handleAction(button.dataset.action, button.dataset.id);
        }
        if (checkbox) {
            handleConciliation(checkbox.dataset.id, checkbox.checked);
        }
    });

    // Relatórios
    const reportContent = document.querySelector('#relatorios');
    if (reportContent) {
        reportContent.addEventListener('click', e => {
            if(e.target.matches('.btn-secondary')) {
                const reportName = e.target.previousElementSibling.textContent;
                showToast(`Gerando exportação para ${reportName}...`, 'info');
            }
        });
    }
}

function handleAction(action, id) {
    id = parseInt(id, 10);
    switch (action) {
        case 'aprovar':
            const contaPagar = mockData.contasPagar.find(c => c.id === id);
            if (contaPagar) {
                contaPagar.status = 'Aprovado';
                renderContasPagar();
                showToast(`Pagamento para ${contaPagar.fornecedor} aprovado!`, 'success');
            }
            break;
        
        case 'enviar-fatura':
            const contaReceber = mockData.contasReceber.find(c => c.id === id);
            if(contaReceber) showToast(`Fatura ${contaReceber.nfe} enviada para ${contaReceber.cliente}.`, 'info');
            break;

        case 'negociar':
            const contaAtrasada = mockData.contasReceber.find(c => c.id === id);
            if(contaAtrasada) showToast(`Iniciando negociação com ${contaAtrasada.cliente}.`, 'info');
            break;
        
        case 'detalhes-pagar':
            showToast(`Exibindo detalhes do item ${id}...`, 'info');
            break;
    }
}

function handleConciliation(id, isChecked) {
    id = parseInt(id, 10);
    const item = mockData.conciliacao.find(i => i.id === id);
    if (item) {
        item.status = isChecked ? 'Conciliado' : 'Pendente';
        renderConciliacao();
        showToast(`Item ${item.descricao} foi ${isChecked ? 'conciliado' : 'marcado como pendente'}.`, 'success');
    }
}

// =================================================================================
// FUNÇÃO DE TOAST (pode ser movida para um script global)
// =================================================================================
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (container.contains(toast)) {
                container.removeChild(toast);
            }
        }, 300);
    }, 3000);
}
