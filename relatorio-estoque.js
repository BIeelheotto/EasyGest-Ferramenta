document.addEventListener('DOMContentLoaded', () => {
    // Mock de dados de estoque (simulando uma API/backend)
    const mockStockData = [
        { product: 'Teclado Mecânico', sku: 'TEC-MEC-001', currentStock: 8, minStock: 10, supplier: 'Distribuidora Tech' },
        { product: 'Mouse Óptico', sku: 'MSE-OPT-003', currentStock: 15, minStock: 15, supplier: 'Importados XYZ' },
        { product: 'Monitor 27" 4K', sku: 'MON-4K-27P', currentStock: 3, minStock: 5, supplier: 'Atacado Eletrônicos' },
        { product: 'Café Torrado 500g', sku: 'CAF-500-T', currentStock: 25, minStock: 50, supplier: 'Fazenda a Grão' },
        { product: 'Camiseta Azul M', sku: 'CAM-AZ-M', currentStock: 48, minStock: 30, supplier: 'Fábrica de Roupas' },
        { product: 'Fone Bluetooth X', sku: 'FONE-BT-X1', currentStock: 9, minStock: 10, supplier: 'Importados XYZ' },
        { product: 'Cadeira de Escritório', sku: 'CAD-ERG-02', currentStock: 1, minStock: 5, supplier: 'Móveis & Cia' },
    ];

    const kpiGrid = document.getElementById('reportKpiGrid');
    const tableBody = document.getElementById('estoqueTableBody');

    // Função para renderizar os dados (KPIs, tabela)
    function renderReportData(data) {
        const criticalItems = data.filter(item => item.currentStock < item.minStock);
        renderKPIs(criticalItems, data.length);
        renderTable(data);
    }

    // Renderiza os Indicadores Chave (KPIs)
    function renderKPIs(criticalItems, totalItems) {
        const criticalCount = criticalItems.length;
        const needsAttentionCount = totalItems - criticalCount;
        
        kpiGrid.innerHTML = `
            <div class="kpi-card status-critical">
                <div class="kpi-label">Itens Críticos</div>
                <div class="kpi-value">${criticalCount}</div>
                <div class="kpi-subtext">Abaixo do estoque mínimo</div>
            </div>
            <div class="kpi-card status-attention">
                <div class="kpi-label">Itens em Atenção</div>
                <div class="kpi-value">${mockStockData.filter(i => i.currentStock === i.minStock).length}</div>
                <div class="kpi-subtext">No limite do estoque</div>
            </div>
            <div class="kpi-card status-ok">
                <div class="kpi-label">Itens OK</div>
                <div class="kpi-value">${mockStockData.filter(i => i.currentStock > i.minStock).length}</div>
                <div class="kpi-subtext">Acima do estoque mínimo</div>
            </div>
        `;
    }

    // Renderiza a tabela de dados detalhados
    function renderTable(data) {
        if (data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Nenhum item encontrado.</td></tr>`;
            return;
        }

        // Ordena para mostrar os mais críticos primeiro
        data.sort((a, b) => (a.currentStock / a.minStock) - (b.currentStock / b.minStock));

        tableBody.innerHTML = data.map(item => {
            let statusClass = 'status-ok';
            let statusText = 'OK';
            if (item.currentStock < item.minStock) {
                statusClass = 'status-critical';
                statusText = 'Crítico';
            } else if (item.currentStock === item.minStock) {
                statusClass = 'status-attention';
                statusText = 'Atenção';
            }

            return `
                <tr>
                    <td>${item.product}</td>
                    <td>${item.sku}</td>
                    <td>${item.currentStock}</td>
                    <td>${item.minStock}</td>
                    <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                </tr>
            `;
        }).join('');
    }

    // Adicionar estilos para os status badges (opcional, mas melhora a UI)
    const style = document.createElement('style');
    style.innerHTML = `
        .status-badge {
            padding: 4px 12px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
        }
        .status-critical {
            background-color: var(--danger-light);
            color: var(--danger-dark);
        }
        .status-attention {
            background-color: var(--warning-light);
            color: var(--warning-dark);
        }
        .status-ok {
            background-color: var(--success-light);
            color: var(--success-dark);
        }
        .kpi-card.status-critical { border-left-color: var(--danger); }
        .kpi-card.status-attention { border-left-color: var(--warning); }
        .kpi-card.status-ok { border-left-color: var(--success); }
        .kpi-subtext { font-size: 12px; color: var(--text-secondary); margin-top: 4px; }
    `;
    document.head.appendChild(style);

    // Carga inicial do relatório
    renderReportData(mockStockData);
});
