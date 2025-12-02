/* -------------------------------------------------------------------
   PRESTADORES DE SERVIÇO — CRUD COMPLETO
   Armazena em localStorage, renderiza tabela + mobile, cuida do modal,
   busca, edição e exclusão.
------------------------------------------------------------------- */

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
  prestadores = stored ? JSON.parse(stored) : [];
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
  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("open");

  if (editingIndex !== null) {
    const p = prestadores[editingIndex];
    document.getElementById("prest_nome").value = p.nome;
    document.getElementById("prest_documento").value = p.documento;
    document.getElementById("prest_especialidade").value = p.especialidade;
    document.getElementById("prest_telefone").value = p.telefone;
    document.getElementById("prest_email").value = p.email;

    document.getElementById("modalTitle").textContent = "Editar Prestador";
  } else {
    document.getElementById("form-prestadores").reset();
    document.getElementById("modalTitle").textContent = "Novo Prestador";
  }
}

// ----------------------------
// Fechar modal
// ----------------------------
function closePrestadorModal() {
  const modal = document.getElementById("prestadores-modal");
  modal.setAttribute("aria-hidden", "true");
  modal.classList.remove("open");
  editingIndex = null;
}

// ----------------------------
// Salvar (Criar ou Atualizar)
// ----------------------------
function savePrestador() {
  const obj = {
    nome: document.getElementById("prest_nome").value.trim(),
    documento: document.getElementById("prest_documento").value.trim(),
    especialidade: document.getElementById("prest_especialidade").value.trim(),
    telefone: document.getElementById("prest_telefone").value.trim(),
    email: document.getElementById("prest_email").value.trim(),
  };

  if (!obj.nome) {
    showToast("O nome é obrigatório.");
    return;
  }

  if (editingIndex === null) {
    prestadores.push(obj);
    showToast("Prestador cadastrado!");
  } else {
    prestadores[editingIndex] = obj;
    showToast("Prestador atualizado!");
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
  tableBody.innerHTML = "";
  mobileView.innerHTML = "";

  const termo = searchInput.value.toLowerCase();

  const filtrados = prestadores.filter(p =>
    p.nome.toLowerCase().includes(termo) ||
    p.especialidade.toLowerCase().includes(termo) ||
    p.documento.toLowerCase().includes(termo)
  );

  filtrados.forEach((p, index) => {
    // --- TABELA DESKTOP ---
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.nome}</td>
      <td>${p.documento || "-"}</td>
      <td>${p.especialidade || "-"}</td>
      <td>${p.telefone || "-"}</td>
      <td>${p.email || "-"}</td>
      <td class="actions">
        <button class="btn-action edit" onclick="openPrestadorModal(${index})">Editar</button>
        <button class="btn-action delete" onclick="deletePrestador(${index})">Excluir</button>
      </td>
    `;
    tableBody.appendChild(tr);

    // --- VIEW MOBILE ---
    const card = document.createElement("div");
    card.className = "mobile-card";
    card.innerHTML = `
      <h4>${p.nome}</h4>
      <p><strong>Documento:</strong> ${p.documento || "-"}</p>
      <p><strong>Especialidade:</strong> ${p.especialidade || "-"}</p>
      <p><strong>Telefone:</strong> ${p.telefone || "-"}</p>
      <p><strong>Email:</strong> ${p.email || "-"}</p>

      <div class="mobile-card-actions">
        <button onclick="openPrestadorModal(${index})" class="btn-mini edit">Editar</button>
        <button onclick="deletePrestador(${index})" class="btn-mini delete">Excluir</button>
      </div>
    `;
    mobileView.appendChild(card);
  });
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
// Inicialização
// ----------------------------
loadPrestadores();
