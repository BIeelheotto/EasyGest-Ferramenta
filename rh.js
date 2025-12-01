document.addEventListener('DOMContentLoaded', () => {
    const RH = {
        // =================================================================================
        // MOCK DATA
        // =================================================================================
        funcionarios: [
            { id: 1, nome: 'Ana Carolina', cpf: '111.222.333-44', cargoId: 1, depto: 'Financeiro', salario: 4500.00, dataAdmissao: '2022-05-10', banco: '341', agencia: '1234', conta: '56789-0', foto: 'https://via.placeholder.com/120', status: 'Ativo' },
            { id: 2, nome: 'Bruno Santos', cpf: '222.333.444-55', cargoId: 2, depto: 'TI', salario: 7800.00, dataAdmissao: '2021-02-15', banco: '001', agencia: '4321', conta: '98765-1', foto: 'https://via.placeholder.com/120', status: 'Ativo' },
            { id: 3, nome: 'Carlos Pereira', cpf: '333.444.555-66', cargoId: 3, depto: 'Comercial', salario: 3200.00, dataAdmissao: '2023-01-20', banco: '237', agencia: '5678', conta: '12345-2', foto: 'https://via.placeholder.com/120', status: 'Ativo' },
            { id: 4, nome: 'Daniela Lima', cpf: '444.555.666-77', cargoId: 4, depto: 'Marketing', salario: 5100.00, dataAdmissao: '2022-11-01', banco: '104', agencia: '8765', conta: '23456-3', foto: 'https://via.placeholder.com/120', status: 'Inativo' },
        ],
        cargos: [
            { id: 1, nome: 'Analista Financeiro', nivel: 'Pleno', salarioBase: 4200.00, sindicato: true },
            { id: 2, nome: 'Desenvolvedor Backend', nivel: 'Sênior', salarioBase: 7500.00, sindicato: false },
            { id: 3, nome: 'Vendedor', nivel: 'Júnior', salarioBase: 2800.00, sindicato: true },
            { id: 4, nome: 'Designer de Produto', nivel: 'Pleno', salarioBase: 4800.00, sindicato: false },
        ],
        candidatos: [
            { id: 1, nome: 'Fernanda Costa', email: 'fe.costa@email.com', cargo: 'Desenvolvedor Frontend', fase: 'Entrevista' },
            { id: 2, nome: 'Gustavo Martins', email: 'gu.martins@email.com', cargo: 'Analista de Dados', fase: 'To Do' },
            { id: 3, nome: 'Helena Almeida', email: 'helena.a@email.com', cargo: 'UX Designer', fase: 'Oferta' },
        ],

        // =================================================================================
        // ÍCONES E DEFINIÇÕES DAS SEÇÕES
        // =================================================================================
        icons: {
            funcionarios: `<svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/></svg>`,
            cargos: `<svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" /><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0010 15c-2.796 0-5.487-.46-8-1.308z" /></svg>`,
            folha: `<svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clip-rule="evenodd" /></svg>`,
            ponto: `<svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" /></svg>`,
            ferias: `<svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.706-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm-.707 7.072l.707-.707a1 1 0 10-1.414-1.414l-.707.707a1 1 0 001.414 1.414zM3 11a1 1 0 100-2H2a1 1 0 100 2h1z" clip-rule="evenodd" /></svg>`,
            beneficios: `<svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 11a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1v-1z" /></svg>`,
            recrutamento: `<svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 11a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1v-1z" /></svg>`,
            relatorios: `<svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>`,
        },
        sections: {
            funcionarios: { title: 'Funcionários', description: 'Cadastro completo, status, admissão e desligamento.' },
            cargos: { title: 'Cargos & Salários', description: 'Gestão de cargos, níveis, salários e reajustes.' },
            folha: { title: 'Folha de Pagamento', description: 'Cálculo, fechamento, holerites e exportação CNAB.' },
            ponto: { title: 'Ponto & Frequência', description: 'Controle de marcações, banco de horas e abonos.' },
            ferias: { title: 'Férias & 13º', description: 'Agendamento de férias e pagamento de 13º salário.' },
            beneficios: { title: 'Benefícios', description: 'Administração de vales, planos de saúde e outros.' },
            recrutamento: { title: 'Recrutamento', description: 'Banco de talentos e pipeline de seleção visual.' },
            relatorios: { title: 'Relatórios Trabalhistas', description: 'Emissão de holerites, rescisões e quadros de pessoal.' },
        },

        // =================================================================================
        // RENDERIZAÇÃO E NAVEGAÇÃO
        // =================================================================================
        init() {
            this.contentEl = document.getElementById('rh-content');
            if (!this.contentEl) return;

            this.renderMainGrid();
            this.addEventListeners();
        },

        addEventListeners() {
            this.contentEl.addEventListener('click', (e) => {
                const card = e.target.closest('.rh-card');
                if (card) {
                    this.navigateTo(card.dataset.section);
                }
                const backButton = e.target.closest('.back-to-grid');
                if(backButton) {
                    this.renderMainGrid();
                }
            });
        },

        renderMainGrid() {
            const gridHtml = Object.keys(this.sections).map(key => {
                const section = this.sections[key];
                return `
                    <div class="rh-card" data-section="${key}" role="button" tabindex="0">
                        <div class="rh-card-icon">${this.icons[key] || ''}</div>
                        <h3 class="rh-card-title">${section.title}</h3>
                        <p class="rh-card-description">${section.description}</p>
                    </div>
                `;
            }).join('');

            this.contentEl.innerHTML = `
                <h2 style="font-size: 24px; font-weight: 700; color: var(--text-primary); margin-bottom: 24px;">Módulos de Recursos Humanos</h2>
                <div class="rh-grid">${gridHtml}</div>
            `;
        },

        navigateTo(sectionId) {
            const section = this.sections[sectionId];
            if (!section) return;

            // Atualiza o placeholder da busca principal
            const searchInput = document.getElementById('searchInput');
            if(searchInput) {
                searchInput.placeholder = `Buscar em ${section.title}...`;
            }

            // Renderiza o cabeçalho da seção
            this.contentEl.innerHTML = `
                <div class="rh-section" id="section-${sectionId}" style="display: block;">
                    <div class="rh-section-header">
                        <h2 class="rh-section-title">${section.title}</h2>
                        <button class="btn-secondary back-to-grid">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" style="transform: rotate(180deg);"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clip-rule="evenodd" /></svg>
                            Voltar
                        </button>
                    </div>
                    <div class="section-content">
                        <!-- O conteúdo específico da seção será renderizado aqui -->
                        <p>Conteúdo para ${section.title} em breve...</p>
                    </div>
                </div>
            `;
            
            // Chama a função de renderização específica da seção (que será criada depois)
            const renderFunction = this[`render_${sectionId}_section`];
            if (typeof renderFunction === 'function') {
                renderFunction();
            }
        },

        // =================================================================================
        // FUNÇÕES DE RENDERIZAÇÃO DAS SEÇÕES
        // =================================================================================
        
        /**
         * Funções auxiliares para formatação
         */
        formatCurrency(value) {
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
        },

        formatDate(dateString) {
            const [year, month, day] = dateString.split('-');
            return `${day}/${month}/${year}`;
        },

        /**
         * Seção: Funcionários
         */
        render_funcionarios_section() {
            const contentEl = this.contentEl.querySelector('.section-content');
            if (!contentEl) return;

            const tableRows = this.funcionarios.map(func => {
                const cargo = this.cargos.find(c => c.id === func.cargoId);
                return `
                    <tr>
                        <td>
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <img src="${func.foto}" alt="${func.nome}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;">
                                <strong>${func.nome}</strong>
                            </div>
                        </td>
                        <td>${cargo ? cargo.nome : 'N/A'}</td>
                        <td>${this.formatCurrency(func.salario)}</td>
                        <td>${this.formatDate(func.dataAdmissao)}</td>
                        <td><span class="chip ${func.status === 'Ativo' ? 'success' : 'danger'}">${func.status}</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn-action btn-outline" onclick="RH.handleFuncionarioAction('view', ${func.id})">Ver</button>
                                <button class="btn-action btn-primary" onclick="RH.handleFuncionarioAction('edit', ${func.id})">Editar</button>
                                <button class="btn-action btn-danger" onclick="RH.handleFuncionarioAction('terminate', ${func.id})">Desligar</button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');

            contentEl.innerHTML = `
                <div class="table-card">
                    <div class="card-header">
                        <h3>Quadro de Pessoal</h3>
                        <button class="btn-primary" id="openFuncionarioModalBtn">
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0V11H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"/></svg>
                            + Admissão
                        </button>
                    </div>
                    <div class="table-wrapper">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Cargo</th>
                                    <th>Salário</th>
                                    <th>Admissão</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>${tableRows}</tbody>
                        </table>
                    </div>
                </div>

                <!-- Modal Funcionário -->
                <div class="modal-overlay" id="funcionarioModal" style="display: none;">
                    <div class="modal" style="max-width: 700px;">
                        <div class="modal-header">
                            <h3 class="modal-title" id="funcionarioModalTitle">Nova Admissão</h3>
                            <button class="btn-secondary" id="closeFuncionarioModalBtn">✕</button>
                        </div>
                        <form id="funcionarioForm">
                            <div class="modal-body">
                                <input type="hidden" id="funcionarioId">
                                <label for="photoUpload" class="photo-upload-area" id="photoUploadArea">
                                    <svg width="32" height="32" viewBox="0 0 20 20" fill="currentColor"><path d="M5.5 13a3.5 3.5 0 01-1.586-6.854 4.5 4.5 0 118.672 2.02A3 3 0 0113.5 16h-8a.5.5 0 010-1h8a2 2 0 100-4H4.5a3.5 3.5 0 010-7h.5a1 1 0 011 1v.518a2.5 2.5 0 104.5.396V7a1 1 0 011-1h.5a4.5 4.5 0 010 9h- инвалид.5a.5.5 0 01-.5-.5v-1a1 1 0 10-2 0v1a.5.5 0 01-.5.5h-2.5a3 3 0 01-3 3z"/></svg>
                                    <span>Upload de foto</span>
                                </label>
                                <input type="file" id="photoUpload" accept="image/*">
                                
                                <div class="form-group">
                                    <label for="nome">Nome Completo*</label>
                                    <input type="text" id="nome" class="form-input" required>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="cpf">CPF*</label>
                                        <input type="text" id="cpf" class="form-input" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="dataAdmissao">Data de Admissão*</label>
                                        <input type="date" id="dataAdmissao" class="form-input" required>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="cargoId">Cargo*</label>
                                        <select id="cargoId" class="form-select" required>
                                            ${this.cargos.map(c => `<option value="${c.id}">${c.nome}</option>`).join('')}
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="depto">Departamento*</label>
                                        <input type="text" id="depto" class="form-input" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="salario">Salário (R$)*</label>
                                    <input type="text" id="salario" class="form-input" required>
                                </div>
                                <hr style="border: none; border-top: 1px solid var(--border); margin: 16px 0;">
                                <h4 style="font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">Dados Bancários</h4>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="banco">Banco*</label>
                                        <input type="text" id="banco" class="form-input" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="agencia">Agência*</label>
                                        <input type="text" id="agencia" class="form-input" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="conta">Conta Corrente*</label>
                                        <input type="text" id="conta" class="form-input" required>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn-secondary" id="cancelFuncionarioModalBtn">Cancelar</button>
                                <button type="submit" class="btn-primary">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
            this.addFuncionarioEventListeners();
        },

        addFuncionarioEventListeners() {
            const modal = document.getElementById('funcionarioModal');
            const openBtn = document.getElementById('openFuncionarioModalBtn');
            const closeBtn = document.getElementById('closeFuncionarioModalBtn');
            const cancelBtn = document.getElementById('cancelFuncionarioModalBtn');
            const form = document.getElementById('funcionarioForm');
            const searchInput = document.getElementById('searchInput');

            openBtn.onclick = () => {
                form.reset();
                document.getElementById('funcionarioId').value = '';
                document.getElementById('funcionarioModalTitle').textContent = 'Nova Admissão';
                document.getElementById('photoUploadArea').style.backgroundImage = 'none';
                modal.style.display = 'flex';
            };
            closeBtn.onclick = () => modal.style.display = 'none';
            cancelBtn.onclick = () => modal.style.display = 'none';
            window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };

            document.getElementById('photoUpload').onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        document.getElementById('photoUploadArea').style.backgroundImage = `url('${event.target.result}')`;
                    }
                    reader.readAsDataURL(file);
                }
            };
            
            form.onsubmit = (e) => {
                e.preventDefault();
                this.saveFuncionario();
            };

            searchInput.oninput = () => {
                const searchTerm = searchInput.value.toLowerCase();
                const filtered = this.funcionarios.filter(f => 
                    f.nome.toLowerCase().includes(searchTerm) ||
                    f.cpf.includes(searchTerm) ||
                    (this.cargos.find(c => c.id === f.cargoId)?.nome || '').toLowerCase().includes(searchTerm)
                );
                this.updateFuncionariosTable(filtered);
            };

            this.mascaraReal(document.getElementById('salario'));
        },

        updateFuncionariosTable(funcionarios) {
            const tableBody = this.contentEl.querySelector('.data-table tbody');
            if (!tableBody) return;

            tableBody.innerHTML = funcionarios.map(func => {
                const cargo = this.cargos.find(c => c.id === func.cargoId);
                return `
                    <tr>
                        <td>
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <img src="${func.foto}" alt="${func.nome}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;">
                                <strong>${func.nome}</strong>
                            </div>
                        </td>
                        <td>${cargo ? cargo.nome : 'N/A'}</td>
                        <td>${this.formatCurrency(func.salario)}</td>
                        <td>${this.formatDate(func.dataAdmissao)}</td>
                        <td><span class="chip ${func.status === 'Ativo' ? 'success' : 'danger'}">${func.status}</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn-action btn-outline" onclick="RH.handleFuncionarioAction('view', ${func.id})">Ver</button>
                                <button class="btn-action btn-primary" onclick="RH.handleFuncionarioAction('edit', ${func.id})">Editar</button>
                                <button class="btn-action btn-danger" onclick="RH.handleFuncionarioAction('terminate', ${func.id})">Desligar</button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
        },

        saveFuncionario() {
            const id = document.getElementById('funcionarioId').value;
            const foto = document.getElementById('photoUploadArea').style.backgroundImage.slice(4, -1).replace(/"/g, "");
            const salarioValue = document.getElementById('salario').value.replace(/\./g, '').replace(',', '.');

            const funcionarioData = {
                nome: document.getElementById('nome').value,
                cpf: document.getElementById('cpf').value,
                dataAdmissao: document.getElementById('dataAdmissao').value,
                cargoId: parseInt(document.getElementById('cargoId').value),
                depto: document.getElementById('depto').value,
                salario: parseFloat(salarioValue),
                banco: document.getElementById('banco').value,
                agencia: document.getElementById('agencia').value,
                conta: document.getElementById('conta').value,
                foto: foto || 'https://via.placeholder.com/120',
                status: 'Ativo'
            };

            if (id) { // Edit mode
                const index = this.funcionarios.findIndex(f => f.id == id);
                this.funcionarios[index] = { ...this.funcionarios[index], ...funcionarioData, id: parseInt(id) };
                showToast('Funcionário atualizado com sucesso!');
            } else { // Create mode
                funcionarioData.id = this.funcionarios.length > 0 ? Math.max(...this.funcionarios.map(f => f.id)) + 1 : 1;
                this.funcionarios.unshift(funcionarioData);
                showToast('Funcionário cadastrado com sucesso!');
            }
            
            document.getElementById('funcionarioModal').style.display = 'none';
            this.render_funcionarios_section();
            document.getElementById('searchInput').value = ''; // Limpa a busca
        },

        handleFuncionarioAction(action, id) {
            const funcionario = this.funcionarios.find(f => f.id === id);
            if (!funcionario) return;

            const modal = document.getElementById('funcionarioModal');
            const form = document.getElementById('funcionarioForm');
            const modalTitle = document.getElementById('funcionarioModalTitle');
            
            if (action === 'terminate') {
                if (confirm(`Tem certeza que deseja desligar o funcionário ${funcionario.nome}?`)) {
                    const index = this.funcionarios.findIndex(f => f.id === id);
                    this.funcionarios[index].status = 'Inativo';
                    this.render_funcionarios_section();
                    showToast('Funcionário desligado.');
                }
                return;
            }

            // Preencher o formulário
            document.getElementById('funcionarioId').value = funcionario.id;
            document.getElementById('nome').value = funcionario.nome;
            document.getElementById('cpf').value = funcionario.cpf;
            document.getElementById('dataAdmissao').value = funcionario.dataAdmissao;
            document.getElementById('cargoId').value = funcionario.cargoId;
            document.getElementById('depto').value = funcionario.depto;
            document.getElementById('salario').value = funcionario.salario.toFixed(2).replace('.', ',');
            this.mascaraReal(document.getElementById('salario')); // Aplica a máscara
            document.getElementById('banco').value = funcionario.banco;
            document.getElementById('agencia').value = funcionario.agencia;
            document.getElementById('conta').value = funcionario.conta;
            document.getElementById('photoUploadArea').style.backgroundImage = `url('${funcionario.foto}')`;

            const isView = action === 'view';
            modalTitle.textContent = isView ? 'Detalhes do Funcionário' : 'Editar Funcionário';
            
            Array.from(form.elements).forEach(el => el.disabled = isView);
            document.getElementById('closeFuncionarioModalBtn').disabled = false;
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const cancelBtn = document.getElementById('cancelFuncionarioModalBtn');

            if (isView) {
                if(submitBtn) submitBtn.style.display = 'none';
                if(cancelBtn) cancelBtn.style.display = 'none';
            } else {
                if(submitBtn) submitBtn.style.display = 'inline-block';
                if(cancelBtn) cancelBtn.style.display = 'inline-block';
            }

            modal.style.display = 'flex';
        },

        mascaraReal(input) {
            let value = input.value.replace(/\D/g, '');
            value = (value / 100).toFixed(2) + '';
            value = value.replace(".", ",");
            value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            input.value = value;
        },

        render_cargos_section() {
            const contentEl = this.contentEl.querySelector('.section-content');
            contentEl.innerHTML = `<p>Funcionalidade de <strong>Cargos & Salários</strong> será implementada aqui.</p>`;
        },
        render_folha_section() {
            const contentEl = this.contentEl.querySelector('.section-content');
            contentEl.innerHTML = `<p>Funcionalidade de <strong>Folha de Pagamento</strong> será implementada aqui.</p>`;
        },
        render_ponto_section() {
            const contentEl = this.contentEl.querySelector('.section-content');
            contentEl.innerHTML = `<p>Funcionalidade de <strong>Ponto & Frequência</strong> será implementada aqui.</p>`;
        },
        render_ferias_section() {
            const contentEl = this.contentEl.querySelector('.section-content');
            contentEl.innerHTML = `<p>Funcionalidade de <strong>Férias & 13º</strong> será implementada aqui.</p>`;
        },
        render_beneficios_section() {
            const contentEl = this.contentEl.querySelector('.section-content');
            contentEl.innerHTML = `<p>Funcionalidade de <strong>Benefícios</strong> será implementada aqui.</p>`;
        },
        render_recrutamento_section() {
            const contentEl = this.contentEl.querySelector('.section-content');
            contentEl.innerHTML = `<p>Funcionalidade de <strong>Recrutamento</strong> será implementada aqui.</p>`;
        },
        render_relatorios_section() {
            const contentEl = this.contentEl.querySelector('.section-content');
            contentEl.innerHTML = `<p>Funcionalidade de <strong>Relatórios Trabalhistas</strong> será implementada aqui.</p>`;
        },

    };

    RH.init();
});
