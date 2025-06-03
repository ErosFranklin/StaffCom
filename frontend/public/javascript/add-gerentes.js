document.addEventListener('DOMContentLoaded',async function() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const btnAddGerente = document.querySelector('.btn-add-funcionario');
    const overlay = document.querySelector('.overlay');
    const modal = document.querySelector('.modal');
    const modalExcluirGerente = document.querySelector('.modal-excluir');
    const overlayExcluir = document.querySelector('.overlay-excluir');
    const formGerente = document.querySelector('#form-add-funcionario');
    const messagemErro = document.querySelector('.mensagem-erro');
    const spinner = document.querySelector('.container-spinner');
    const btnRemoverGerente = document.querySelector('.btn-excluir');
    const btnCancelarAddGerente = document.querySelector('.close-modal');
    const btnCancelarExGerente = document.querySelector('.close-modal-excluir');
    let idParaExcluir = null;

    carregarGerentes(token, userId);

    btnAddGerente.addEventListener('click', function() {
        modal.style.display = 'flex';
        overlay.style.display = 'flex';
    })
    formGerente.addEventListener('submit', async function(event) {
        event.preventDefault();
        const nome = document.getElementById('nome-funcionario').value;
        const dataNascimento = document.getElementById('nascimento-funcionario').value;
        const cpf = document.getElementById('cpf-funcionario').value;
        //const salario = document.getElementById('salario-funcionario').value;
        const email = document.getElementById('email-funcionario').value;
        const telefone = document.getElementById('numero-funcionario').value;
        const departamento = document.getElementById('departamento-funcionario').value;

        spinner.style.display = "block";

        const dataBody = {
            fullName: nome,
            birthdate: dataNascimento,
            cpf: cpf,
            //salary: salario,
            email: email,
            phoneNumber: telefone,
            department: departamento
        }
        try{
            const response = await fetch(`http://127.0.0.1:8000/api/owners/addManager`,{
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
    async function carregarGerentes(token) {
        
        const tabelaGerentes = document.getElementById('tbody-funcionarios');
        const tabela = document.getElementById('tabela-funcionarios');

        messagemErro.style.display = "none";
        tabelaGerentes.innerHTML = "";
        tabela.style.display = "table";
        spinner.style.display = "block";

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/owners/my-managers`, {
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

            if (data.length === 0) {
                messagemErro.textContent = "Nenhum gerente cadastrado.";
                messagemErro.style.display = "block";
                tabela.style.display = "none";
            } else {
                data.forEach(gerente => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${gerente.fullName || 'Nao informado'}</td>
                        <td>${dataFormatada(gerente.birthdate)}</td>
                        <td>${gerente.cpf || 'Nao informado'}</td>
                        <td>${gerente.phoneNumber || 'Nao informado'}</td>
                        <td>${gerente.department || 'Nao informado'}</td>
                        <td>${gerente.email || 'Nao informado'}</td>
                        <td>
                            <button class="btn-delete-funcionario"  data-id="${gerente.id}"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    `;
                    tabelaGerentes.appendChild(tr);
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
            modalExcluirGerente.style.display = 'flex';
            overlayExcluir.style.display = 'flex';
        }
    });
    btnRemoverGerente.addEventListener('click', async function () {
        if (idParaExcluir) {
            await removerGerente(idParaExcluir);
            idParaExcluir = null; // Limpa após excluir
            modalExcluirGerente.style.display = 'none';
            overlayExcluir.style.display = 'none';
        }
    });
    btnCancelarAddGerente.addEventListener('click', function() {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    })
    btnCancelarExGerente.addEventListener('click', function() {
        modalExcluirGerente.style.display = 'none';
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
})