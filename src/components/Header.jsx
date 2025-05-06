function Header({ onLogout }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h1 className="h3 flex-grow-1 text-center m-0">Painel de Tarefas</h1>
      <button className="btn btn-outline-danger" onClick={onLogout}>
        Sair
      </button>
    </div>
  );
}

export default Header;
