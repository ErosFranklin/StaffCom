document.addEventListener('DOMContentLoaded',async function() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    console.log(token)
    const btnAddFuncionario = document.querySelector('.btn-add-funcionario');
    const overlay = document.querySelector('.overlay');
    const modal = document.querySelector('.modal');
    const modalExcluirFuncionario = document.querySelector('.modal-excluir');
    const modalEditFuncionario = document.querySelector('.modal-edit-funcionario');
    const overlayExcluir = document.querySelector('.overlay-excluir');
    const overlayEdit = document.querySelector('.overlay-edit-funcionario');
    const formFuncionario = document.querySelector('#form-add-funcionario');
    const formEditFuncionario = document.querySelector('#form-edit-funcionario');
    const messagemErro = document.querySelector('.mensagem-erro');
    const spinner = document.querySelector('.container-spinner');
    const btnRemoverFuncionario = document.querySelector('.btn-excluir');
    const btnCancelarAddFuncionario = document.querySelector('.close-modal');
    const btnCancelarExFuncionario = document.querySelector('.close-modal-excluir');
    let idParaExcluir = null;
    let idFuncionario = null;
    let managerId = null;

    carregarTodosFuncionarios(token);


    document.addEventListener('click', async function (event) {
        //const btnEdit = event.target.closest('.btn-editar-funcionario');
        //const btnDelete = event.target.closest('.btn-deletar-funcionario');
        /*
        if (btnEdit) {
            idFuncionario = btnEdit.dataset.id;
            managerId= btnEdit.dataset.managerId;
            cargo = btnEdit.dataset.cargo;
            console.log(idFuncionario, managerId, cargo)
            modalEditFuncionario.style.display = "flex";
            overlayEdit.style.display = "flex";
            //editarDadosFuncionario( idFuncionario, managerId, cargo, token);
        }*/
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
        console.log(cargo);
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
        }else if(cargo === 'cozinheiro'){
            url = `addCook`
            dataBody = {
                fullName: nome,
                birthdate: dataNascimento,
                cpf: cpf,
                email: email,
                phoneNumber: telefone,
                role: 'assistant'
            }
        }else if(cargo === 'chef-cozinheiro'){
            url = `addCook`
            dataBody = {
                fullName: nome,
                birthdate: dataNascimento,
                cpf: cpf,
                email: email,
                phoneNumber: telefone,
                role: 'chef'
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
            location.reload(); 
        }catch(error){
            console.error("Erro ao adicionar funcionario:", error);
            messagemErro = document.getElementById('mensagem-erro');
            messagemErro.textContent = "Erro ao adicionar gerente.";
            messagemErro.style.display = "block";
            spinner.style.display = "none";
            return;
        }


    })
    async function carregarTodosFuncionarios(token) {
        const tabelaFuncionario = document.getElementById('tbody-funcionarios');
        const tabela = document.getElementById('tabela-funcionarios');
        //const messagemErro = document.getElementById('mensagem-erro'); // certifique-se de que esse ID existe
        const spinner = document.querySelector('.container-spinner'); // idem

        //messagemErro.style.display = "none";
        tabelaFuncionario.innerHTML = "";
        tabela.style.display = "table";
        spinner.style.display = "block";

        try {
            const [resGarcom, resCozinheiro] = await Promise.all([
                fetch(`http://127.0.0.1:8000/api/managers/my-waiters`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                }),
                fetch(`http://127.0.0.1:8000/api/managers/my-cooks`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                })
            ]);

            if (!resGarcom.ok || !resCozinheiro.ok) {
                throw new Error("Erro ao buscar funcionários.");
            }

            const dataGarcom = await resGarcom.json();
            const dataCozinheiro = await resCozinheiro.json();
            let cozinheiro = ''
            const garconsAtivos = Array.isArray(dataGarcom) ? dataGarcom.filter(f => f.isActivated === 1) : [];
            const cozinheirosAtivos = Array.isArray(dataCozinheiro) ? dataCozinheiro.filter(f => f.isActivated === 1) : [];

            const todosFuncionarios = [...garconsAtivos.map(f => ({ ...f, cargo: 'Garçom' })), ...cozinheirosAtivos.map(f => ({ ...f, cargo: 'Cozinheiro' }))];
            console.log(todosFuncionarios);

            if (todosFuncionarios.length === 0) {
                messagemErro.textContent = "Nenhum funcionário ativo encontrado.";
                messagemErro.style.display = "block";
                tabela.style.display = "none";
            } else {
                todosFuncionarios.forEach(funcionario => {
                    const tr = document.createElement('tr');
                    if(funcionario.role === 'chef'){
                        cozinheiro = 'Chef de Cozinha';
                    }else if(funcionario.role === 'assistant'){
                        cozinheiro = 'Cozinheiro';
                    };
                    tr.innerHTML = `
                        <td>${funcionario.fullName || 'Não informado'}</td>
                        <td>${dataFormatada(funcionario.birthdate)}</td>
                        <td>${cozinheiro || 'Não informado'}</td>
                        <td>${funcionario.cpf || 'Não informado'}</td>
                        <td>${funcionario.phoneNumber || 'Não informado'}</td>
                        <td>${funcionario.email || 'Não informado'}</td>
                        <td>
                            <button class="btn-delete-funcionario" data-cargo="${funcionario.cargo.toLowerCase()}" data-id="${funcionario.id}" data-manager-id="${funcionario.managerId}">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    `;
                    tabelaFuncionario.appendChild(tr);
                });
            }

        } catch (error) {
            console.error("Erro ao carregar funcionários:", error);
            messagemErro.textContent = "Erro ao carregar funcionários.";
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
            managerId=  btn.getAttribute('data-manager-id');
            cargo =  btn.getAttribute('data-cargo');
            console.log(idParaExcluir, managerId, cargo)
            modalExcluirFuncionario.style.display = 'flex';
            overlayExcluir.style.display = 'flex';
            
       }
    })
    
    btnRemoverFuncionario.addEventListener('click', async function () {
        if (idParaExcluir) {
            console.log("ID do gerente a ser excluído:", idParaExcluir);
            await removerFuncionario( idParaExcluir, managerId, cargo, token);
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
    async function removerFuncionario( idFuncionario, managerId, cargo, token) {
        const spinner = document.querySelector('.container-spinner');
        const messagemErro = document.querySelector('.mensagem-erro');
        spinner.style.display = "block";
        messagemErro.style.display = "none";
        console.log(token);
        let url = '';
        if(cargo === 'waiter'){
            url = `excludeWaiter`;
        }else{
            url = `excludeCook`;
        }
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/managers/${idFuncionario}/${url}`, {
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
            await carregarFuncionarioCozinheiro(token);
            await carregarFuncionarioGarcom(token);
        } catch (error) {
            console.error("Erro ao remover gerente:", error);
            messagemErro.textContent = "Erro ao remover gerente.";
            messagemErro.style.display = "block";
        } finally {
            spinner.style.display = "none";
        }
    }


    /*
    async function editarDadosFuncionario(id, managerId, cargo, token) {

        formEditFuncionario.addEventListener('submit', async function(event) {
            event.preventDefault();
            const nome = document.getElementById('nome-funcionario-edit').value;
            const dataNascimento = document.getElementById('nascimento-funcionario-edit').value;
            const cpf = document.getElementById('cpf-funcionario-edit').value;
            const email = document.getElementById('email-funcionario-edit').value;
            const telefone = document.getElementById('numero-funcionario-edit').value;

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
            }else {
                url = `reactivateCook`;
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
                spinner.style.display = "none";
                
            } catch (error) {
                console.error("Erro ao editar treino:", error);
                errorMessageModal.style.display = "block";
                errorMessageModal.textContent = "Erro ao editar treino. Tente novamente mais tarde.";
            }
        })
    }
        */

});