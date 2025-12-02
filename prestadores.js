/* -------------------------------------------------------------------
   PRESTADORES DE SERVIÇO — CRUD COMPLETO
   Armazena em localStorage, renderiza tabela + mobile, cuida do modal,
   busca, edição e exclusão.
------------------------------------------------------------------- */

// Mock de dados de prestadores
const initialPrestadoresData = [
  { 
    nome: "João Silva Consultoria", 
    nomeFantasia: "J. Silva Solutions",
    documento: "11.111.111/0001-11", // CNPJ
    inscricaoEstadual: "ISENTA",
    inscricaoMunicipal: "",
    tipoPessoa: "Pessoa Jurídica",
    telefone: "(11) 98765-4321", 
    celular: "(11) 99876-5432",
    email: "joao@jsilva.com", 
    emailFinanceiro: "financeiro@jsilva.com",
    website: "https://www.jsilva.com",
    
    // Endereço
    cep: "01000-000",
    logradouro: "Rua das Flores",
    numero: "123",
    complemento: "Sala 501",
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP",

    // Dados Bancários
    banco: "341", // Itaú
    agencia: "1234",
    conta: "56789-0",
    tipoConta: "Corrente",
    titularConta: "João Silva Consultoria",

    // Informações Fiscais
    codigoServico: "01.01", // Consultoria em TI
    regimeTributario: "Simples Nacional",
    cnaePrincipal: "6204-0/00", // Consultoria em TI
    naturezaPrestador: "Pessoa Jurídica",

    // Classificação e Controle
    categoria: "Consultoria",
    observacoes: "Especialista em segurança da informação.",
    status: "Ativo" 
  },
  { 
    nome: "Maria Oliveira - Designer", 
    nomeFantasia: "MO Design",
    documento: "222.333.444-55", // CPF
    inscricaoEstadual: "",
    inscricaoMunicipal: "MEI",
    tipoPessoa: "Pessoa Física",
    telefone: "(21) 91234-5678", 
    celular: "(21) 99876-5432",
    email: "maria@modesign.com", 
    emailFinanceiro: "pagamentos@modesign.com",
    website: "",

    // Endereço
    cep: "20000-000",
    logradouro: "Avenida Copacabana",
    numero: "456",
    complemento: "Apto 1002",
    bairro: "Copacabana",
    cidade: "Rio de Janeiro",
    estado: "RJ",

    // Dados Bancários
    banco: "001", // Banco do Brasil
    agencia: "4321",
    conta: "09876-5",
    tipoConta: "Poupança",
    titularConta: "Maria Oliveira",

    // Informações Fiscais
    codigoServico: "06.01", // Design Gráfico
    regimeTributario: "Simples Nacional",
    cnaePrincipal: "7311-4/00", // Agências de publicidade
    naturezaPrestador: "Pessoa Física",

    // Classificação e Controle
    categoria: "Marketing",
    observacoes: "Experiência em branding digital.",
    status: "Ativo" 
  },
  { 
    nome: "Serviços Gerais Express Ltda.", 
    nomeFantasia: "SG Express",
    documento: "33.333.333/0001-33", // CNPJ
    inscricaoEstadual: "123.456.789.000",
    inscricaoMunicipal: "7890123",
    tipoPessoa: "Pessoa Jurídica",
    telefone: "(31) 99887-6655", 
    celular: "(31) 97654-3210",
    email: "contato@sgexpress.com", 
    emailFinanceiro: "contas@sgexpress.com",
    website: "https://www.sgexpress.com.br",

    // Endereço
    cep: "30000-000",
    logradouro: "Rua da Serra",
    numero: "789",
    complemento: "",
    bairro: "Savassi",
    cidade: "Belo Horizonte",
    estado: "MG",

    // Dados Bancários
    banco: "237", // Bradesco
    agencia: "5678",
    conta: "11223-4",
    tipoConta: "Corrente",
    titularConta: "Serviços Gerais Express Ltda.",
    
    // Informações Fiscais
    codigoServico: "07.03", // Limpeza e conservação
    regimeTributario: "Lucro Presumido",
    cnaePrincipal: "8121-4/00", // Limpeza em edifícios
    naturezaPrestador: "Pessoa Jurídica",

    // Classificação e Controle
    categoria: "Manutenção",
    observacoes: "Disponibilidade 24h.",
    status: "Inativo" 
  }
];

let prestadores = [];
let editingIndex = null;

const LS_KEY = "prestadores_db";

const tableBody = document.getElementById("prestadoresTableBody");
const mobileView = document.getElementById("prestadoresMobileView");
const searchInput = document.getElementById("searchPrestador");

// ----------------------------
// Carregar do localStorage
// ----------------------------
function loadPrestadores() {
  const stored = localStorage.getItem(LS_KEY);
  prestadores = stored ? JSON.parse(stored) : initialPrestadoresData; // Load initial data if none in LS
  renderPrestadores();
}

// ----------------------------
// Salvar no localStorage
// ----------------------------
function savePrestadores() {
  localStorage.setItem(LS_KEY, JSON.stringify(prestadores));
}

// ----------------------------
// Abrir modal
// ----------------------------
function openPrestadorModal(editIndex = null) {
  editingIndex = editIndex;

  const modal = document.getElementById("prestadores-modal");
  const modalTitle = document.getElementById('modalPrestadorTitle');
  const form = document.getElementById('form-prestadores');

  modal.style.display = 'flex'; // Make it visible before starting transition
  void modal.offsetWidth; // Force reflow
  modal.classList.add("open");

  if (editingIndex !== null) {
    modalTitle.textContent = "Editar Prestador";
    const p = prestadores[editingIndex];
    document.getElementById("prest_nome").value = p.nome || '';
    document.getElementById("prest_nomeFantasia").value = p.nomeFantasia || '';
    document.getElementById("prest_documento").value = p.documento || '';
    document.getElementById("prest_inscricaoEstadual").value = p.inscricaoEstadual || '';
    document.getElementById("prest_inscricaoMunicipal").value = p.inscricaoMunicipal || '';
    document.getElementById("prest_tipoPessoa").value = p.tipoPessoa || 'Pessoa Jurídica';
    document.getElementById("prest_telefone").value = p.telefone || '';
    document.getElementById("prest_celular").value = p.celular || '';
    document.getElementById("prest_email").value = p.email || '';
    document.getElementById("prest_emailFinanceiro").value = p.emailFinanceiro || '';
    document.getElementById("prest_website").value = p.website || '';
    
    // Address fields
    document.getElementById("prest_cep").value = p.cep || '';
    document.getElementById("prest_logradouro").value = p.logradouro || '';
    document.getElementById("prest_numero").value = p.numero || '';
    document.getElementById("prest_complemento").value = p.complemento || '';
    document.getElementById("prest_bairro").value = p.bairro || '';
    document.getElementById("prest_cidade").value = p.cidade || '';
    document.getElementById("prest_estado").value = p.estado || '';

    // Bank Details fields
    document.getElementById("prest_banco").value = p.banco || '';
    document.getElementById("prest_agencia").value = p.agencia || '';
    document.getElementById("prest_conta").value = p.conta || '';
    document.getElementById("prest_tipoConta").value = p.tipoConta || 'Corrente';
    document.getElementById("prest_titularConta").value = p.titularConta || '';

    // Tax Information fields
    document.getElementById("prest_codigoServico").value = p.codigoServico || '';
    document.getElementById("prest_regimeTributario").value = p.regimeTributario || '';
    document.getElementById("prest_cnaePrincipal").value = p.cnaePrincipal || '';
    document.getElementById("prest_naturezaPrestador").value = p.naturezaPrestador || '';

    // Classification and Control fields
    document.getElementById("prest_categoria").value = p.categoria || '';
    document.getElementById("prest_observacoes").value = p.observacoes || '';
    document.getElementById("prest_status").value = p.status || 'Ativo';

  } else {
    modalTitle.textContent = "Novo Prestador";
    form.reset(); // Limpa o formulário para um novo registro
    
    // Clear any previous error states
    form.querySelectorAll('.input-error').forEach(el => {
      el.classList.remove('input-error');
    });

    document.getElementById('prest_status').value = 'Ativo';
    document.getElementById('prest_tipoPessoa').value = 'Pessoa Jurídica';
    document.getElementById('prest_estado').value = '';
    document.getElementById('prest_banco').value = '';
    document.getElementById('prest_tipoConta').value = 'Corrente';
    document.getElementById('prest_regimeTributario').value = '';
    document.getElementById('prest_naturezaPrestador').value = '';
    document.getElementById('prest_categoria').value = '';
  }
}

// ----------------------------
// Fechar modal
// ----------------------------
function closePrestadorModal() {
  const modal = document.getElementById("prestadores-modal");
  modal.classList.remove("open");
  // Wait for the transition to complete before setting display to none
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300); // Matches the CSS transition duration
  editingIndex = null;
}

// ----------------------------
// Salvar (Criar ou Atualizar)
// ----------------------------
function savePrestador() {
  const form = document.getElementById('form-prestadores');
  const newPrestadorData = {};
  let isValid = true;
  let missingFields = [];

  // Collect data and perform validation
  form.querySelectorAll('input[id^="prest_"], select[id^="prest_"], textarea[id^="prest_"]').forEach(input => {
    const fieldName = input.id.replace('prest_', '');
    newPrestadorData[fieldName] = input.value;

    if (input.hasAttribute('required') && !input.value.trim()) {
      isValid = false;
      missingFields.push(input.previousElementSibling ? input.previousElementSibling.textContent.replace('*', '').trim() : fieldName);
      input.classList.add('input-error'); // Add a class for styling invalid fields
    } else {
      input.classList.remove('input-error');
    }

    if (input.type === 'email' && input.value.trim() && !/\S+@\S+\.\S+/.test(input.value)) {
      isValid = false;
      showToast(`Por favor, insira um e-mail válido para ${input.previousElementSibling.textContent.trim()}.`, 'error');
      input.classList.add('input-error');
    }
  });

  // Handle special case for select elements that might be required but have an empty initial option
  form.querySelectorAll('select[id^="prest_"][required]').forEach(select => {
    const fieldName = select.id.replace('prest_', '');
    if (!select.value) {
        isValid = false;
        missingFields.push(select.previousElementSibling ? select.previousElementSibling.textContent.replace('*', '').trim() : fieldName);
        select.classList.add('input-error');
    } else {
        select.classList.remove('input-error');
    }
  });

  if (!isValid) {
    showToast(`Por favor, preencha todos os campos obrigatórios: ${missingFields.join(', ')}.`, 'error');
    return;
  }
  
  if (editingIndex === null) {
    prestadores.push(newPrestadorData);
    showToast("Prestador cadastrado com sucesso!");
  } else {
    prestadores[editingIndex] = { ...prestadores[editingIndex], ...newPrestadorData };
    showToast("Prestador atualizado com sucesso!");
  }

  savePrestadores();
  renderPrestadores();
  closePrestadorModal();
}

// ----------------------------
// Excluir
// ----------------------------
function deletePrestador(index) {
  if (!confirm("Tem certeza que deseja excluir este prestador?")) return;

  prestadores.splice(index, 1);
  savePrestadores();
  renderPrestadores();
  showToast("Prestador removido.");
}

// ----------------------------
// Renderização da tabela
// ----------------------------
function renderPrestadores() {
  const tbody = document.getElementById('prestadoresTableBody');
  const mobileView = document.getElementById('prestadoresMobileView');
  const desktopTableWrapper = document.getElementById('desktopTableWrapper');
  if (!tbody || !mobileView || !desktopTableWrapper) return;

  tbody.innerHTML = "";
  mobileView.innerHTML = "";

  const termo = searchInput.value.toLowerCase();

  const filtrados = prestadores.filter(p =>
    p.nome.toLowerCase().includes(termo) ||
    (p.especialidade && p.especialidade.toLowerCase().includes(termo)) ||
    (p.documento && p.documento.toLowerCase().includes(termo))
  );

  const isMobile = window.innerWidth <= 768; // Define mobile breakpoint

  if (isMobile) {
    desktopTableWrapper.style.display = 'none';
    mobileView.style.display = 'flex'; // Use flex for mobile cards container

    filtrados.forEach((p, index) => {
      const statusClass = p.status === 'Ativo' ? 'success' : 'critical';
      const card = document.createElement("div");
      card.className = "mobile-card";
      card.innerHTML = `
        <div class="mobile-card-row">
          <span class="mobile-card-label">Nome</span>
          <span class="mobile-card-value">${p.nome || ''}</span>
        </div>
        <div class="mobile-card-row">
          <span class="mobile-card-label">Documento</span>
          <span class="mobile-card-value">${p.documento || '-'}</span>
        </div>
        <div class="mobile-card-row">
          <span class="mobile-card-label">Especialidade</span>
          <span class="mobile-card-value">${p.especialidade || '-'}</span>
        </div>
        <div class="mobile-card-row">
          <span class="mobile-card-label">Telefone</span>
          <span class="mobile-card-value">${p.telefone || '-'}</span>
        </div>
        <div class="mobile-card-row">
          <span class="mobile-card-label">E-mail</span>
          <span class="mobile-card-value">${p.email || '-'}</span>
        </div>
        <div class="mobile-card-row">
          <span class="mobile-card-label">Status</span>
          <span class="chip ${statusClass}">${p.status || 'Inativo'}</span>
        </div>

        <div class="mobile-card-actions">
          <button onclick="openPrestadorModal(${index})" class="btn-block btn-outline">Editar</button>
          <button onclick="deletePrestador(${index})" class="btn-block btn-danger">Excluir</button>
        </div>
      `;
      mobileView.appendChild(card);
    });
  } else {
    desktopTableWrapper.style.display = 'block';
    mobileView.style.display = 'none';

    filtrados.forEach((p, index) => {
      const statusClass = p.status === 'Ativo' ? 'success' : 'critical';
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.nome || ''}</td>
        <td>${p.documento || '-'}</td>
        <td>${p.especialidade || '-'}</td>
        <td>${p.telefone || '-'}</td>
        <td>${p.email || '-'}</td>
        <td><span class="chip ${statusClass}">${p.status || 'Inativo'}</span></td>
        <td>
          <div class="action-buttons">
            <button class="btn-action btn-outline" onclick="openPrestadorModal(${index})">Editar</button>
            <button class="btn-action btn-danger" onclick="deletePrestador(${index})">Excluir</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }
}

// ----------------------------
// Buscar ao digitar
// ----------------------------
searchInput.addEventListener("input", renderPrestadores);

// Atalho "/" para focar na busca
document.addEventListener("keydown", (e) => {
  if (e.key === "/") {
    e.preventDefault();
    searchInput.focus();
  }
});

// ----------------------------
// IMask Initialization
// ----------------------------
let documentoMask;
function initIMasks() {
  IMask(document.getElementById('prest_cep'), { mask: '00000-000' });
  IMask(document.getElementById('prest_telefone'), { mask: '(00) 0000-0000' });
  IMask(document.getElementById('prest_celular'), { mask: '(00) 00000-0000' });

  const documentoInput = document.getElementById('prest_documento');
  const tipoPessoaSelect = document.getElementById('prest_tipoPessoa');

  function applyDocumentMask() {
    if (documentoMask) {
      documentoMask.destroy();
    }
    if (tipoPessoaSelect.value === 'Pessoa Física') {
      documentoMask = IMask(documentoInput, { mask: '000.000.000-00' }); // CPF
    } else {
      documentoMask = IMask(documentoInput, { mask: '00.000.000/0000-00' }); // CNPJ
    }
  }

  tipoPessoaSelect.addEventListener('change', applyDocumentMask);
  // Apply mask initially based on default or loaded value
  applyDocumentMask();
}

// ----------------------------
// Inicialização
// ----------------------------
  document.addEventListener('DOMContentLoaded', () => {
    loadPrestadores();
    initIMasks(); // Initialize masks after loading prestadores
    
    // Attach event listener for "Novo Prestador" button
    document.getElementById('btnNovoPrestador')?.addEventListener('click', () => openPrestadorModal());

    // Attach event listener for search input
    document.getElementById('searchPrestador')?.addEventListener('input', renderPrestadores);

    // Re-render on window resize to switch between desktop/mobile view
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(renderPrestadores, 250);
    });
  });
