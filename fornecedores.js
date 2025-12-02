// Mock de dados de fornecedores
const fornecedoresData = [
  { id: 1, nome: "Fornecedor Alpha", cnpj: "00.000.000/0001-00", telefone: "(11) 98765-4321", email: "contato@alpha.com", status: "Ativo" },
  { id: 2, nome: "Fornecedor Beta", cnpj: "11.111.111/0001-11", telefone: "(21) 91234-5678", email: "sac@beta.com", status: "Inativo" },
  { id: 3, nome: "Fornecedor Gama", cnpj: "22.222.222/0001-22", telefone: "(31) 99887-6655", email: "comercial@gama.com", status: "Ativo" }
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
  const modal = document.getElementById('fornecedores-modal');
  const modalTitle = document.getElementById('modalFornecedorTitle');
  const form = document.getElementById('form-fornecedores');

  currentFornecedorId = id;

  if (id) {
    modalTitle.textContent = "Editar Fornecedor";
    const fornecedor = fornecedoresData.find(f => f.id === id);
    if (fornecedor) {
      document.getElementById('forn_nome').value = fornecedor.nome;
      document.getElementById('forn_cnpj').value = fornecedor.cnpj;
      document.getElementById('forn_telefone').value = fornecedor.telefone;
      document.getElementById('forn_email').value = fornecedor.email;
      document.getElementById('forn_status').value = fornecedor.status;
    }
  } else {
    modalTitle.textContent = "Novo Fornecedor";
    form.reset(); // Limpa o formulário para um novo registro
    document.getElementById('forn_status').value = 'Ativo'; // Define um status padrão
  }
  modal.style.display = 'flex';
}

function closeFornecedorModal() {
  document.getElementById('fornecedores-modal').style.display = 'none';
  currentFornecedorId = null;
}

// Salvar Fornecedor (Adicionar ou Editar)
function saveFornecedor() {
  const nome = document.getElementById('forn_nome').value;
  const cnpj = document.getElementById('forn_cnpj').value;
  const telefone = document.getElementById('forn_telefone').value;
  const email = document.getElementById('forn_email').value;
  const status = document.getElementById('forn_status').value;

  if (!nome || !cnpj || !telefone || !email) {
    showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
    return;
  }

  if (currentFornecedorId) {
    // Editar
    const index = fornecedoresData.findIndex(f => f.id === currentFornecedorId);
    if (index !== -1) {
      fornecedoresData[index] = { ...fornecedoresData[index], nome, cnpj, telefone, email, status };
      showToast('Fornecedor atualizado com sucesso!');
    }
  } else {
    // Adicionar
    const newId = fornecedoresData.length > 0 ? Math.max(...fornecedoresData.map(f => f.id)) + 1 : 1;
    fornecedoresData.push({ id: newId, nome, cnpj, telefone, email, status });
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
  document.getElementById('btnNovoFornecedor')?.addEventListener('click', () => openFornecedorModal());

  // Adiciona listener para a busca
  document.getElementById('searchFornecedor')?.addEventListener('input', renderFornecedores);

  // Fecha o modal ao clicar fora
  document.getElementById('fornecedores-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'fornecedores-modal') closeFornecedorModal();
  });
});