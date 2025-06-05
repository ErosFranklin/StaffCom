document.addEventListener('DOMContentLoaded', async function() {
    const token = localStorage.getItem('token');

    const btnAbreAddComanda = document.getElementById('btn-comanda');
    const modalAddComanda = document.querySelector('.modal-comanda');
    const overlay = document.querySelector('.overlay-modal-comanda');
    const btnFecharModal = document.querySelector('.btn-fechar-comanda');
    const formAddComanda = document.querySelector('#add-comanda');
    const formAddItensComanda = document.querySelector('#add-item-comanda');
    const mensagemErro = document.querySelector('.mensagem-erro');

    const managerId = await carregarDadosFuncionarios(token);
    const idChef = await carregarCozinheiros(managerId, token);
    console.log(managerId, idChef, token);
    //formAddItensComanda.style.display = 'none';

    btnAbreAddComanda.addEventListener('click', function() {
        overlay.style.display = 'flex';
        modalAddComanda.style.display = 'flex';
    })
    btnFecharModal.addEventListener('click', function() {
        overlay.style.display = 'none';
        modalAddComanda.style.display = 'none';
    })

    formAddComanda.addEventListener('submit', async function(event) {
        event.preventDefault();
        const numeroMesa = document.querySelector('#numero-mesa').value;

        try{
            const response = await await fetch(`http://127.0.0.1:8000/api/orders/create/${idChef}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, body: JSON.stringify({table: numeroMesa})
            })
             if(!response.ok) {
                throw new Error(data.message || "Erro ao criar comanda.");
            }
            const data = await response.json();
            console.log(data);
            formAddItensComanda.style.display = 'flex';
            carregarCardapio(data.id, numeroMesa);
        }catch(error) {
            console.error("Erro ao criar comanda:", error);
            mensagemErro.textContent = 'Erro ao criar comanda. Por favor, tente novamente.';
            mensagemErro.style.display = 'block';
        }
    })

    async function carregarCozinheiros(managerId){
        try{
            const response = await fetch(`http://127.0.0.1:8000/api/managers/cooks/${managerId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if(!response.ok) {
                throw new Error("Erro ao buscar cozinheiros.");
            }
            const data = await response.json();
            let idChef = null;
            data.forEach(element => {
                if(element.role === 'chef'){
                    idChef = element.id;
                }
            });
            console.log(data);
            return idChef;
        }catch(error) {
            console.error("Erro ao buscar cozinheiros:", error);
            return;
        }
    }

    async function carregarDadosFuncionarios(token){
        try{
            const response = await fetch('http://127.0.0.1:8000/api/waiters/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if(!response.ok) {
                throw new Error("Erro ao buscar dados do funcionário.");
            }
            const data = await response.json();
            return data.managerId;
        }catch(error) {
            console.error("Erro ao buscar dados do funcionário:", error);
            return;
        }
    }
    async function carregarCardapio(orderId, numeroMesa) {
        try {
            const response = await fetch('http://localhost:8000/api/menu/my-menu', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}` 
                }
            });
            if (!response.ok) {
                throw new Error("Erro ao buscar bebidas do cardápio.");
            }
        }catch (error) {
            console.error("Erro ao buscar bebidas do cardápio:", error);
            return;
        }
    }

});