// Mock de dados de fornecedores
const fornecedoresData = [
  { 
    id: 1, 
    nome: "Fornecedor Alpha S.A.", 
    nomeFantasia: "Alpha Suprimentos",
    cnpj: "00.000.000/0001-00", 
    inscricaoEstadual: "ISENTA",
    inscricaoMunicipal: "",
    tipoPessoa: "Pessoa Jurídica",
    telefone: "(11) 98765-4321", 
    celular: "(11) 99876-5432",
    email: "contato@alpha.com", 
    emailFinanceiro: "financeiro@alpha.com",
    website: "https://www.alpha.com",
    
    // Endereço
    cep: "01000-000",
    logradouro: "Rua Exemplo Alpha",
    numero: "100",
    complemento: "Sala 10",
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP",

    // Dados Bancários
    banco: "341", // Itaú
    agencia: "1234",
    conta: "56789-0",
    tipoConta: "Corrente",
    titularConta: "Fornecedor Alpha S.A.",

    // Informações Fiscais
    codigoServico: "1234-5",
    regimeTributario: "Simples Nacional",
    cnaePrincipal: "4711-3/01",
    naturezaFornecedor: "Bens",

    // Classificação e Controle
    categoria: "Matéria-Prima",
    observacoes: "Fornecedor de alta qualidade.",
    anexos: [],

    status: "Ativo" 
  },
  { 
    id: 2, 
    nome: "Beta Distribuidora Ltda.", 
    nomeFantasia: "Beta Dist.",
    cnpj: "11.111.111/0001-11", 
    inscricaoEstadual: "123.456.789.000",
    inscricaoMunicipal: "1234567",
    tipoPessoa: "Pessoa Jurídica",
    telefone: "(21) 91234-5678", 
    celular: "(21) 99876-5432",
    email: "sac@beta.com", 
    emailFinanceiro: "contasapagar@beta.com",
    website: "https://www.beta.com.br",

    // Endereço
    cep: "20000-000",
    logradouro: "Avenida Principal Beta",
    numero: "500",
    complemento: "",
    bairro: "Botafogo",
    cidade: "Rio de Janeiro",
    estado: "RJ",

    // Dados Bancários
    banco: "001", // Banco do Brasil
    agencia: "4321",
    conta: "09876-5",
    tipoConta: "Corrente",
    titularConta: "Beta Distribuidora Ltda.",

    // Informações Fiscais
    codigoServico: "9876-0",
    regimeTributario: "Lucro Real",
    cnaePrincipal: "6202-3/00",
    naturezaFornecedor: "Serviços",

    // Classificação e Controle
    categoria: "Serviços de TI",
    observacoes: "Negociar prazos de pagamento.",
    anexos: [],

    status: "Inativo" 
  },
  { 
    id: 3, 
    nome: "Gama Importadora e Exportadora", 
    nomeFantasia: "Gama I/E",
    cnpj: "22.222.222/0001-22", 
    inscricaoEstadual: "ISENTA",
    inscricaoMunicipal: "",
    tipoPessoa: "Pessoa Jurídica",
    telefone: "(31) 99887-6655", 
    celular: "(31) 97654-3210",
    email: "comercial@gama.com", 
    emailFinanceiro: "pagamento@gama.com",
    website: "https://www.gama.com.br",

    // Endereço
    cep: "30000-000",
    logradouro: "Rua das Montanhas",
    numero: "123",
    complemento: "Andar 3",
    bairro: "Savassi",
    cidade: "Belo Horizonte",
    estado: "MG",

    // Dados Bancários
    banco: "237", // Bradesco
    agencia: "5678",
    conta: "11223-4",
    tipoConta: "Corrente",
    titularConta: "Gama Importadora e Exportadora",
    
    // Informações Fiscais
    codigoServico: "5555-1",
    regimeTributario: "Lucro Presumido",
    cnaePrincipal: "4930-2/02",
    naturezaFornecedor: "Ambos",

    // Classificação e Controle
    categoria: "Embalagens",
    observacoes: "Exige acompanhamento constante.",
    anexos: [],

    status: "Ativo" 
  }
];

let currentFornecedorId = null; // ID do fornecedor sendo editado

// Renderizar tabela de fornecedores
function renderFornecedores() {
  const tbody = document.getElementById('fornecedoresTableBody');
  if (!tbody) return;

  const searchTerm = document.getElementById('searchFornecedor')?.value.toLowerCase() || '';
  
  const filtered = fornecedoresData.filter(fornecedor => 
    fornecedor.nome.toLowerCase().includes(searchTerm) || 
    fornecedor.cnpj.toLowerCase().includes(searchTerm) ||
    fornecedor.email.toLowerCase().includes(searchTerm)
  );

  tbody.innerHTML = filtered.map(fornecedor => {
    const statusClass = fornecedor.status === 'Ativo' ? 'success' : 'critical';
    return `
      <tr>
        <td>${fornecedor.nome}</td>
        <td>${fornecedor.cnpj}</td>
        <td>${fornecedor.telefone}</td>
        <td>${fornecedor.email}</td>
        <td><span class="chip ${statusClass}">${fornecedor.status}</span></td>
        <td>
          <div class="action-buttons">
            <button class="btn-action btn-outline" onclick="openFornecedorModal(${fornecedor.id})">Editar</button>
            <button class="btn-action btn-danger" onclick="deleteFornecedor(${fornecedor.id})">Excluir</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Abrir/Fechar Modal de Fornecedor
function openFornecedorModal(id = null) {
  console.log(`Abrindo modal de fornecedor. ID: ${id}`);
  try {
    const modal = document.getElementById('fornecedores-modal');
    const modalTitle = document.getElementById('modalFornecedorTitle');
    const form = document.getElementById('form-fornecedores');

    currentFornecedorId = id;

    if (id) {
      modalTitle.textContent = "Editar Fornecedor";
      const fornecedor = fornecedoresData.find(f => f.id === id);
      if (fornecedor) {
        document.getElementById('forn_nome').value = fornecedor.nome;
        document.getElementById('forn_nomeFantasia').value = fornecedor.nomeFantasia;
        document.getElementById('forn_cnpj').value = fornecedor.cnpj;
        document.getElementById('forn_inscricaoEstadual').value = fornecedor.inscricaoEstadual;
        document.getElementById('forn_inscricaoMunicipal').value = fornecedor.inscricaoMunicipal;
        document.getElementById('forn_tipoPessoa').value = fornecedor.tipoPessoa;
        document.getElementById('forn_telefone').value = fornecedor.telefone;
        document.getElementById('forn_celular').value = fornecedor.celular;
        document.getElementById('forn_email').value = fornecedor.email;
        document.getElementById('forn_emailFinanceiro').value = fornecedor.emailFinanceiro;
        document.getElementById('forn_website').value = fornecedor.website;
        
        // Address fields
        document.getElementById('forn_cep').value = fornecedor.cep;
        document.getElementById('forn_logradouro').value = fornecedor.logradouro;
        document.getElementById('forn_numero').value = fornecedor.numero;
        document.getElementById('forn_complemento').value = fornecedor.complemento;
        document.getElementById('forn_bairro').value = fornecedor.bairro;
        document.getElementById('forn_cidade').value = fornecedor.cidade;
        document.getElementById('forn_estado').value = fornecedor.estado;

        // Bank Details fields
        document.getElementById('forn_banco').value = fornecedor.banco;
        document.getElementById('forn_agencia').value = fornecedor.agencia;
        document.getElementById('forn_conta').value = fornecedor.conta;
        document.getElementById('forn_tipoConta').value = fornecedor.tipoConta;
        document.getElementById('forn_titularConta').value = fornecedor.titularConta;

        // Tax Information fields
        document.getElementById('forn_codigoServico').value = fornecedor.codigoServico;
        document.getElementById('forn_regimeTributario').value = fornecedor.regimeTributario;
        document.getElementById('forn_cnaePrincipal').value = fornecedor.cnaePrincipal;
        document.getElementById('forn_naturezaFornecedor').value = fornecedor.naturezaFornecedor;

        // Classification and Control fields
        document.getElementById('forn_categoria').value = fornecedor.categoria;
        document.getElementById('forn_observacoes').value = fornecedor.observacoes;
        // Anexos (attachments) would require a more complex handling, like displaying names or providing download links.
        // For now, we'll just acknowledge its existence in the data.

        document.getElementById('forn_status').value = fornecedor.status;
      } else {
        // Fornecedor not found, perhaps it was deleted by another user/session
        // or ID was invalid. In a real app, handle this gracefully (e.g., show error, close modal).
        console.warn(`Fornecedor com ID ${id} não encontrado.`);
      }
    } else {
      modalTitle.textContent = "Novo Fornecedor";
      form.reset(); // Limpa o formulário para um novo registro
      
      // Clear any previous error states
      form.querySelectorAll('.input-error').forEach(el => {
        el.classList.remove('input-error');
      });

      document.getElementById('forn_status').value = 'Ativo'; // Define um status padrão
      document.getElementById('forn_tipoPessoa').value = 'Pessoa Jurídica'; // Define um tipo padrão
      document.getElementById('forn_estado').value = ''; // Define um estado padrão
      document.getElementById('forn_banco').value = ''; // Define um banco padrão
      document.getElementById('forn_tipoConta').value = 'Corrente'; // Define um tipo de conta padrão
      document.getElementById('forn_regimeTributario').value = ''; // Define um regime tributário padrão
      document.getElementById('forn_naturezaFornecedor').value = ''; // Define uma natureza padrão
      document.getElementById('forn_categoria').value = ''; // Define uma categoria padrão
    }
    modal.style.display = 'flex'; // Make it visible before starting transition
    // Force reflow to ensure display: flex is applied before transition starts
    void modal.offsetWidth; 
    modal.classList.add('open');
  } catch (error) {
    console.error("Erro ao abrir o modal de fornecedor:", error);
    showToast("Erro ao carregar o formulário de fornecedor.", "error");
  }
}

function closeFornecedorModal() {
  const modal = document.getElementById('fornecedores-modal');
  modal.classList.remove('open');
  // Wait for the transition to complete before setting display to none
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300); // Matches the CSS transition duration
  currentFornecedorId = null;
}

// Salvar Fornecedor (Adicionar ou Editar)
function saveFornecedor() {
  const form = document.getElementById('form-fornecedores');
  const formData = new FormData(form);
  const newFornecedorData = {};
  let isValid = true;
  let missingFields = [];

  // Collect data and perform validation
  form.querySelectorAll('input[id^="forn_"], select[id^="forn_"], textarea[id^="forn_"]').forEach(input => {
    const fieldName = input.id.replace('forn_', '');
    newFornecedorData[fieldName] = input.value;

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
  form.querySelectorAll('select[id^="forn_"][required]').forEach(select => {
    const fieldName = select.id.replace('forn_', '');
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
  
  // Attachments are still an empty array for now as they require a more complex handler
  newFornecedorData.anexos = [];

  if (currentFornecedorId) {
    // Editar
    const index = fornecedoresData.findIndex(f => f.id === currentFornecedorId);
    if (index !== -1) {
      fornecedoresData[index] = { ...fornecedoresData[index], ...newFornecedorData };
      showToast('Fornecedor atualizado com sucesso!');
    }
  } else {
    // Adicionar
    const newId = fornecedoresData.length > 0 ? Math.max(...fornecedoresData.map(f => f.id)) + 1 : 1;
    fornecedoresData.push({ id: newId, ...newFornecedorData });
    showToast('Fornecedor adicionado com sucesso!');
  }

  renderFornecedores();
  closeFornecedorModal();
}

// Excluir Fornecedor
function deleteFornecedor(id) {
  if (confirm('Tem certeza que deseja excluir este fornecedor?')) {
    const initialLength = fornecedoresData.length;
    fornecedoresData = fornecedoresData.filter(f => f.id !== id);
    if (fornecedoresData.length < initialLength) {
      renderFornecedores();
      showToast('Fornecedor excluído com sucesso!', 'success');
    } else {
      showToast('Erro ao excluir fornecedor.', 'error');
    }
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Inicializa a renderização da tabela
  renderFornecedores();

  // Adiciona listener para o botão "Novo Fornecedor"
  document.getElementById('btnNovoFornecedor')?.addEventListener('click', () => {
    console.log("Botão 'Novo Fornecedor' clicado.");
    openFornecedorModal();
  });

  // Adiciona listener para a busca
  document.getElementById('searchFornecedor')?.addEventListener('input', renderFornecedores);

  // Fecha o modal ao clicar fora
  document.getElementById('fornecedores-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'fornecedores-modal') closeFornecedorModal();
  });
});