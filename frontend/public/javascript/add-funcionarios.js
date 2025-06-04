document.addEventListener('DOMContentLoaded',async function() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const btnAddFuncionario = document.querySelector('.btn-add-funcionario');
    const overlay = document.querySelector('.overlay');
    const modal = document.querySelector('.modal');
    const modalExcluirFuncionario = document.querySelector('.modal-excluir');
    const modalEditFuncionario = document.querySelector('.modal-edit-funcionario');
    const overlayExcluir = document.querySelector('.overlay-excluir');
    const formFuncionario = document.querySelector('#form-add-funcionario');
    const messagemErro = document.querySelector('.mensagem-erro');
    const spinner = document.querySelector('.container-spinner');
    const btnRemoverFuncionario = document.querySelector('.btn-excluir');
    const btnCancelarAddFuncionario = document.querySelector('.close-modal');
    const btnCancelarExFuncionario = document.querySelector('.close-modal-excluir');
    let idParaExcluir = null;
    let idFuncionario = null;
    let managerId = null;

    carregarFuncionarioGarcom(token, userId);
    carregarFuncionarioCozinheiro(token, userId);


    document.addEventListener('click', async function (event) {
        const btnEdit = event.target.closest('.btn-editar-funcionario');
        const btnDelete = event.target.closest('.btn-deletar-funcionario');
        if (btnEdit) {
            idFuncionario = btnEdit.dataset.id;
            managerId= btnEdit.dataset.managerId;
            cargo = btnEdit.dataset.cargo;
            modalEditFuncionario.style.display = "flex";
            
            spinner.style.display = "block";

            editarDadosFuncionario(idFuncionario, managerId, cargo, token);
        }
    })
    btnAddFuncionario.addEventListener('click', function() {
        modal.style.display = 'flex';
        overlay.style.display = 'flex';
    })
    formFuncionario.addEventListener('submit', async function(event) {
        event.preventDefault();
        const nome = document.getElementById('nome-funcionario').value;
        const dataNascimento = document.getElementById('nascimento-funcionario').value;
        const cpf = document.getElementById('cpf-funcionario').value;
        //const salario = document.getElementById('salario-funcionario').value;
        const email = document.getElementById('email-funcionario').value;
        const telefone = document.getElementById('numero-funcionario').value;
        const cargo = document.getElementById('cargo-funcionario').value;

        spinner.style.display = "block";
        let dataBody = {}
        let url = '';
        if(cargo === 'garcom'){
            url = `addWaiter`
            dataBody = {
                fullName: nome,
                birthdate: dataNascimento,
                cpf: cpf,
                email: email,
                phoneNumber: telefone,
            }
            console.log(dataBody);
        }else if(cargo === 'gozinheiro'){
            url = `addCook`
            dataBody = {
                fullName: nome,
                birthdate: dataNascimento,
                cpf: cpf,
                email: email,
                phoneNumber: telefone,
            }
        }else if(cargo === 'chef-cozinheiro'){
            url = `addCook`
            dataBody = {
                fullName: nome,
                birthdate: dataNascimento,
                cpf: cpf,
                email: email,
                phoneNumber: telefone,
                role
            }
        }
       
        try{
            const response = await fetch(`http://127.0.0.1:8000/api/managers/${url}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(dataBody)
            })

            const data = await response.json();
            if(!response.ok){
                throw new Error("Erro ao adicionar gerente.");
            }
            console.log(data);
            spinner.style.display = "none";
            overlay.style.display = 'none';
            modal.style.display = 'none';
            messagemErro.style.display = "none";
        }catch(error){
            console.error("Erro ao adicionar gerente:", error);
            messagemErro = document.getElementById('mensagem-erro');
            messagemErro.textContent = "Erro ao adicionar gerente.";
            messagemErro.style.display = "block";
            spinner.style.display = "none";
            return;
        }


    })
    async function carregarFuncionarioGarcom(token) {
        
        const tabelaFuncionario = document.getElementById('tbody-funcionarios');
        const tabela = document.getElementById('tabela-funcionarios');

        messagemErro.style.display = "none";
        tabelaFuncionario.innerHTML = "";
        tabela.style.display = "table";
        spinner.style.display = "block";

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/managers/my-waiters`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error("Erro ao buscar gerentes.");
            }
            const data = await response.json();
            console.log(data);
            if (!Array.isArray(data)) {
                messagemErro.textContent = "Nenhum funcionario cadastrado.";
                messagemErro.style.display = "block";
                tabela.style.display = "none";
            } else {
                data.forEach(funcionario => {
                    const tr = document.createElement('tr');
                    console.log(funcionario);
                    tr.innerHTML = `
                        <td>${funcionario.fullName || 'Nao informado'}</td>
                        <td>${dataFormatada(funcionario.birthdate)}</td>
                        <td>${'Garcom'}</td>
                        <td>${funcionario.cpf || 'Nao informado'}</td>
                        <td>${funcionario.phoneNumber || 'Nao informado'}</td>
                        <td>${funcionario.email || 'Nao informado'}</td>
                        <td>
                            <button class="btn-delete-funcionario"  data-cargo="waiter" data-id="${funcionario.id}" data-manager-id="${funcionario.managerId}"><i class="fa-solid fa-trash"></i></button>
                            <button class="btn-editar-funcionario"  data-id="${funcionario.id}" data-manager-id="${funcionario.managerId}"><i class="fa-solid fa-pen"></i></button>
                        </td>
                    `;
                    tabelaFuncionario.appendChild(tr);
                });
            }
        } catch (error) {
            console.error("Erro ao carregar gerentes:", error);
            messagemErro.textContent = "Erro ao carregar gerentes.";
            messagemErro.style.display = "block";
            tabela.style.display = "none";
        } finally {
            spinner.style.display = "none";
        }
    }
    async function carregarFuncionarioCozinheiro(token) {
        
        const tabelaFuncionario = document.getElementById('tbody-funcionarios');
        const tabela = document.getElementById('tabela-funcionarios');

        messagemErro.style.display = "none";
        tabelaFuncionario.innerHTML = "";
        tabela.style.display = "table";
        spinner.style.display = "block";

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/managers/my-cooks`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error("Erro ao buscar gerentes.");
            }
            const data = await response.json();

            if (!Array.isArray(data)) {
                messagemErro.textContent = "Nenhum funcionario cadastrado.";
                messagemErro.style.display = "block";
                tabela.style.display = "none";
            } else {
                data.forEach(funcionario => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${funcionario.fullName || 'Nao informado'}</td>
                        <td>${dataFormatada(funcionario.birthdate)}</td>
                        <td>${'Cozinheiro'}</td>
                        <td>${funcionario.cpf || 'Nao informado'}</td>
                        <td>${funcionario.phoneNumber || 'Nao informado'}</td>
                        <td>${funcionario.email || 'Nao informado'}</td>
                        <td>
                            <button class="btn-delete-funcionario"  data-id="${funcionario.id}" data-manager-id="${funcionario.managerId}"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    `;
                    tabelaFuncionario .appendChild(tr);
                });
            }
        } catch (error) {
            console.error("Erro ao carregar gerentes:", error);
            messagemErro.textContent = "Erro ao carregar gerentes.";
            messagemErro.style.display = "block";
            tabela.style.display = "none";
        } finally {
            spinner.style.display = "none";
        }
    }
    function dataFormatada(data) {
        if (!data) return 'Nao informado';
        const partes = data.split('T')[0].split('-');
        if (partes.length !== 3) return data;
        return `${partes[2].padStart(2, '0')}/${partes[1].padStart(2, '0')}/${partes[0]}`;
    }
    document.addEventListener('click', function(event) {
        const btn = event.target.closest('.btn-delete-funcionario');
        if (btn) {
            idParaExcluir = btn.getAttribute('data-id');
            modalExcluirFuncionario.style.display = 'flex';
            overlayExcluir.style.display = 'flex';
        }
    });
    btnRemoverFuncionario.addEventListener('click', async function () {
        if (idParaExcluir) {
            console.log("ID do gerente a ser excluído:", idParaExcluir);
            await removerGerente(idParaExcluir);
            idParaExcluir = null; // Limpa após excluir
            modalExcluirFuncionario.style.display = 'none';
            overlayExcluir.style.display = 'none';
        }
    });
    btnCancelarAddFuncionario.addEventListener('click', function() {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    })
    btnCancelarExFuncionario.addEventListener('click', function() {
        modalExcluirFuncionario.style.display = 'none';
        overlayExcluir.style.display = 'none';
    })
    async function removerGerente(id) {
        const token = localStorage.getItem('token');
        const spinner = document.querySelector('.container-spinner');
        const messagemErro = document.querySelector('.mensagem-erro');
        spinner.style.display = "block";
        messagemErro.style.display = "none";
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/owners/${id}/excludeManager`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (!response.ok) {
                throw new Error("Erro ao remover gerente.");
            }
            const data = await response.json();
            console.log(data);
            await carregarGerentes(token);
        } catch (error) {
            console.error("Erro ao remover gerente:", error);
            messagemErro.textContent = "Erro ao remover gerente.";
            messagemErro.style.display = "block";
        } finally {
            spinner.style.display = "none";
        }
    }
    async function editarDadosFuncionario(id, managerId, cargo, token) {

        modalEditFuncionario.querySelector('#form-edit-funcionario').addEventListener('submit', async function(event) {
            event.preventDefault();
            const nome = modalEditFuncionario.getElementById('nome-funcionario-edit').value;
            const dataNascimento = modalEditFuncionario.getElementById('nascimento-funcionario-edit').value;
            const cpf = modalEditFuncionario.getElementById('cpf-funcionario-edit').value;
            const email = modalEditFuncionario.getElementById('email-funcionario-edit').value;
            const telefone = modalEditFuncionario.getElementById('numero-funcionario-edit').value;

            const dataBody = {
                fullName: nome,
                birthdate: dataNascimento,
                cpf: cpf,
                email: email,
                phoneNumber: telefone,
            }
            let url = ``;
            if(cargo === 'waiter'){
                url = `reactivateWaiter`;
            }
            try {
                const response = await fetch(`http://localhost:8000/api/manager/${url}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(dataBody)
                });
                if (!response.ok) {
                    throw new Error("Erro ao buscar treino para edição.");
                }
                const data = await response.json();
                console.log(data);
                // Atualiza a tabela com os dados editados
                spinner.style.display = "none";
                /*modalEditContent.querySelectorAll('input, select').forEach(el => {
                    if (el.tagName === 'SELECT') {
                        el.selectedIndex = 0;
                    } else {
                        el.value = '';
                    }
                });*/
                
            } catch (error) {
                console.error("Erro ao editar treino:", error);
                errorMessageModal.style.display = "block";
                errorMessageModal.textContent = "Erro ao editar treino. Tente novamente mais tarde.";
            }
        })
    }
})