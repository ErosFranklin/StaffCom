document.addEventListener('DOMContentLoaded', async function() {
    const token = localStorage.getItem('token');

    const btnAbreAddComanda = document.getElementById('btn-comanda');
    const modalAddComanda = document.querySelector('.modal-comanda');
    const overlay = document.querySelector('.overlay-modal-comanda');
    const btnFecharModal = document.querySelector('.btn-fechar-comanda');
    const btnFecharSalvarComanda = document.querySelector('.btn-fechar-comanda-salva');
    const formAddComanda = document.querySelector('#add-comanda');
    const formAddItensComanda = document.querySelector('#add-item-comanda');
    const mensagemErro = document.querySelector('.mensagem-erro');
    const spinner = document.querySelector('.container-spinner');
    const managerId = await carregarDadosFuncionarios(token);
    const idChef = await carregarCozinheiros(managerId, token);
    const idDono = await carregarDadosDono(managerId);
    const nomeGarcom = await carregarDadosGarcom(token);

    console.log(nomeGarcom)
    carregarComandas(token, nomeGarcom)
   
    formAddItensComanda.style.display = 'none';

    btnAbreAddComanda.addEventListener('click', function() {
        overlay.style.display = 'flex';
        modalAddComanda.style.display = 'flex';
    })
    btnFecharModal.addEventListener('click', function() {
        overlay.style.display = 'none';
        modalAddComanda.style.display = 'none';
    })
    btnFecharSalvarComanda.addEventListener('click', function() {
        overlay.style.display = 'none';
        modalAddComanda.style.display = 'none';
        formAddItensComanda.style.display = 'none';
        formAddComanda.reset();
        document.querySelector('.cardapio-entradas').innerHTML = '';
        document.querySelector('.cardapio-principal').innerHTML = '';
        mensagemErro.style.display = 'none';
        location.reload();
    })

    formAddComanda.addEventListener('submit', async function(event) {
        event.preventDefault();
        const numeroMesa = document.querySelector('#numero-mesa').value;
        spinner.style.display = 'flex';

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
            spinner.style.display = 'none';
            formAddItensComanda.style.display = 'flex';
            carregarCardapio(data.id, numeroMesa, idDono);
        }catch(error) {
            console.error("Erro ao criar comanda:", error);
            mensagemErro.textContent = 'Erro ao criar comanda. Por favor, tente novamente.';
            mensagemErro.style.display = 'block';
            spinner.style.display = 'none';
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
    async function carregarDadosDono(managerId) {
         try {
            const response = await fetch(`http://localhost:8000/api/managers/${managerId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error("Erro ao buscar bebidas do cardápio.");
            }
            const data = await response.json();
            console.log(data);
            return data.ownerId;
        }catch (error) {
            console.error("Erro ao buscar bebidas do cardápio:", error);
            return;
        }
    }
    async function carregarCardapio(orderId, numeroMesa, idDono) {
        try {
            const response = await fetch(`http://localhost:8000/api/menu/owner/${idDono}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}` 
                }
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro ${response.status}: ${errorText}`);
            }
            const data = await response.json();
            console.log(data);
            if (!Array.isArray(data) || data.length === 0) {
                const mensagemVazia = document.createElement('div');
                mensagemVazia.classList.add('mensagem-vazia');
                mensagemVazia.textContent = 'Nenhum item encontrado no cardápio.';
                document.querySelector('.cardapio-entradas').appendChild(mensagemVazia);
                document.querySelector('.cardapio-principal').appendChild(mensagemVazia);
                return;
            }
            data.forEach(item => {
                if(item.itemType === 'entrada') {
                    const containerEntrada = document.querySelector('.cardapio-entradas');
                    const entradaItem = document.createElement('div');
                    entradaItem.classList.add('item-entrada');
                    entradaItem.innerHTML += `
                        <img src="${item.item.foodImg}" alt="${item.foodName}">
                        <h3>${item.item.foodName}</h3>
                        <p>${item.item.size}</p>
                        <p>R$${item.item.value}</p>
                        <div class="quantidade">
                            <button type="button" class="btn-decrementar-entrada">-</button>
                            <label class="quantidade-entrada">0</label>
                            <button type="button" class="btn-incrementar-entrada">+</button>
                        </div>
                        <button type="button" class="btn-adicionar-entrada" data-item-id="${item.itemId}" data-order-id="${orderId}" data-table="${numeroMesa}">Adicionar</button>
                    `;
                    containerEntrada.appendChild(entradaItem);

                    const btnIncrementarEntrada = entradaItem.querySelector('.btn-incrementar-entrada');
                    const btnDecrementarEntrada = entradaItem.querySelector('.btn-decrementar-entrada');
                    const labelQuantidadeEntrada = entradaItem.querySelector('.quantidade-entrada');
                    const btnAdicionarEntrada = entradaItem.querySelector('.btn-adicionar-entrada');

                    btnIncrementarEntrada.addEventListener('click', () => {
                        let quantidade = parseInt(labelQuantidadeEntrada.textContent);
                        quantidade++;
                        labelQuantidadeEntrada.textContent = quantidade;
                    });

                    btnDecrementarEntrada.addEventListener('click', () => {
                        let quantidade = parseInt(labelQuantidadeEntrada.textContent);
                        if (quantidade > 0) {
                            quantidade--;
                            labelQuantidadeEntrada.textContent = quantidade;
                        }
                    });

                    btnAdicionarEntrada.addEventListener('click', async () => {
                        const quantidade = parseInt(labelQuantidadeEntrada.textContent);
                        if (quantidade > 0) {
                                console.log({
                                    itemId: btnAdicionarEntrada.dataset.itemId,
                                    orderId: btnAdicionarEntrada.dataset.orderId,
                                    table: btnAdicionarEntrada.dataset.numeroMesa,
                                    quantidade
                                });

                                const response = await fetch(`http://localhost:8000/api/orders/${orderId}/addItem`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}` 
                                    },body: JSON.stringify({itemId: btnAdicionarEntrada.dataset.itemId, itemType: 'entrada', quantity: quantidade})
                                });
                                if (!response.ok) {
                                    const errorText = await response.text();
                                    throw new Error(`Erro ${response.status}: ${errorText}`);
                                }
                                const data = await response.json();
                                console.log(data);
                                alert("Item adicionado com sucesso!");
                            } else {
                                alert("Quantidade deve ser maior que zero.");
                            }
                        });

                }
                if(item.itemType === 'receita') {
                    const containerPrincipal = document.querySelector('.cardapio-principal');
                    const principalItem = document.createElement('div');
                    principalItem.classList.add('item-principal');
                    principalItem.innerHTML += `
                        <img src="${item.item.foodImg}" alt="${item.foodName}">
                        <h3>${item.item.foodName}</h3>
                        <p>R$${item.item.value}</p>
                        <div class="quantidade">
                            <button type="button" class="btn-decrementar-principal">-</button>
                            <label class="quantidade-principal">0</label>
                            <button type="button" class="btn-incrementar-principal">+</button>
                        </div>
                        <button type="button" class="btn-adicionar-prato-principal" data-item-id="${item.itemId}" data-order-id="${orderId}" data-table="${numeroMesa}">Adicionar</button>
                    `;
                    containerPrincipal.appendChild(principalItem);

                    const btnIncrementarPrincipal = principalItem.querySelector('.btn-incrementar-principal');
                    const btnDecrementarPrincipal = principalItem.querySelector('.btn-decrementar-principal');
                    const labelQuantidadePrincipal = principalItem.querySelector('.quantidade-principal');
                    const btnAdicionarPrincipal = principalItem.querySelector('.btn-adicionar-prato-principal');

                    btnIncrementarPrincipal.addEventListener('click', () => {
                        let quantidade = parseInt(labelQuantidadePrincipal.textContent);
                        quantidade++;
                        labelQuantidadePrincipal.textContent = quantidade;
                    });

                    btnDecrementarPrincipal.addEventListener('click', () => {
                        let quantidade = parseInt(labelQuantidadeEntrada.textContent);
                        if (quantidade > 0) {
                            quantidade--;
                            labelQuantidadePrincipal.textContent = quantidade;
                        }
                    });

                    btnAdicionarPrincipal.addEventListener('click', async () => {
                        const quantidade = parseInt(labelQuantidadePrincipal.textContent);
                        if (quantidade > 0) {
                                console.log({
                                    itemId: btnAdicionarPrincipal.dataset.itemId,
                                    orderId: btnAdicionarPrincipal.dataset.orderId,
                                    table: btnAdicionarPrincipal.dataset.numeroMesa,
                                    quantidade
                                });

                                const response = await fetch(`http://localhost:8000/api/orders/${orderId}/addItem`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}` 
                                    },body: JSON.stringify({itemId: btnAdicionarPrincipal.dataset.itemId, itemType: 'receita', quantity: quantidade})
                                });
                                if (!response.ok) {
                                    const errorText = await response.text();
                                    throw new Error(`Erro ${response.status}: ${errorText}`);
                                }
                                const data = await response.json();
                                console.log(data);
                                alert("Item adicionado com sucesso!");
                            } else {
                                alert("Quantidade deve ser maior que zero.");
                            }
                        });
                }
            })
        }catch (error) {
            console.error("Erro ao buscar itens cardápio:", error);
            return;
        }
    }
    async function carregarComandas(token, nomeGarcom) {
        spinner.style.display = 'flex';
        try {
            const response = await fetch(`http://localhost:8000/api/orders/waiter/my-orders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }
            });
            if(!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro ${response.status}: ${errorText}`);
            }
            const data = await response.json();
            spinner.style.display = 'none';
            console.log(data);
            if(!Array.isArray(data) || data.length === 0) {
                const mensagemVazia = document.createElement('div');
                mensagemVazia.classList.add('mensagem-vazia');
                mensagemVazia.textContent = 'Nenhuma comanda encontrada.';
                comandaContainer.appendChild(mensagemVazia);
                document.querySelector('.container-grid-comandas').appendChild(comandaContainer);
                return;
            }
            const totalComandas = document.querySelector('#total-comandas');
            totalComandas.textContent = data.length;
            let valorComandaAbertas = 0;
            let valorTotalComandas = 0;
           for (const item of data) {
                spinner.style.display = 'flex';
                if (item.id) {

                    const comandaContainer = document.createElement('div');
                    comandaContainer.classList.add('comanda');

                    const comandaHeader = document.createElement('div');
                    comandaHeader.classList.add('comanda-header');
                    let valorTotal = 0;
                    
                    let statusComanda = '';
                    if (item.isActivated === 1) {
                        statusComanda = 'Aberta';
                        valorComandaAbertas += 1;
                    }

                    comandaHeader.innerHTML = `
                        <div class="info-tabela">
                            <h2>Mesa</h2>
                            <p>${item.table}</p>
                        </div>
                        <div class="info-status">
                            <span id="status-comanda">${statusComanda}</span>
                        </div>
                    `;

                    const comandaTotalMesa = document.createElement('div');
                    comandaTotalMesa.classList.add('comanda-total-mesa');
                    comandaTotalMesa.innerHTML = `
                        <span class="info-garcom">
                            <h3>Garçom</h3>
                            <p>${nomeGarcom}</p>
                        </span>
                        <span class="info-valores">
                            <h3>Total</h3>
                            <p id="valor-total">R$ ${valorTotal}</p>
                        </span>
                    `;
                    const quantComandaAbertas = document.querySelector('#total-comandas-abertas');
                    quantComandaAbertas.textContent = valorComandaAbertas;
                    console.log(valorComandaAbertas);
                    
                    comandaContainer.appendChild(comandaHeader);
                    comandaContainer.appendChild(comandaTotalMesa);

                    try {
                        const responseTemporario = await fetch(`http://localhost:8000/api/orders/${item.id}/items`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        });

                        if (!responseTemporario.ok) {
                            const errorText = await responseTemporario.text();
                            throw new Error(`Erro ${responseTemporario.status}: ${errorText}`);
                        }

                        const items = await responseTemporario.json();

                        items.forEach(item => {
                            console.log(item);
                            const comandaItem = document.createElement('div');
                            comandaItem.classList.add('comanda-item');

                            const comandaBody = document.createElement('div');
                            comandaBody.classList.add('comanda-body');

                            comandaBody.innerHTML += `
                                <div class="container-itens">
                                    <div class="item-comanda">
                                        <span class="quantidade-item">X${item.quantity}</span>
                                        <span class="nome-item">${item.item.foodName || item.drinkName}</span>
                                    </div>
                                    <div class="valor-itens">
                                        <span class="valor-item">R$${(item.quantity * item.item.value).toFixed(2)}</span>
                                    </div>
                                </div>
                            `;
                            valorTotal += item.quantity * item.item.value;
                            valorTotalComandas += valorTotal;
                            const valorTotalComandasElement = document.querySelector('#faturamento');
                            valorTotalComandasElement.textContent = `R$ ${valorTotalComandas.toFixed(2)}`;
                            comandaTotalMesa.querySelector('#valor-total').textContent = `R$ ${valorTotal.toFixed(2)}`;
                            
                            comandaItem.appendChild(comandaBody);
                            comandaContainer.appendChild(comandaItem);
                        });

                        document.querySelector('.container-grid-comandas').appendChild(comandaContainer);

                    } catch (error) {
                        console.error("Erro ao buscar itens da comanda:", error);
                        return;
                    }
                }
            }
            spinner.style.display = 'none';
            }catch (error) {
                console.error("Erro ao buscar comandas:", error);
                spinner.style.display = 'none';
                const mensagemErro = document.createElement('div');
                mensagemErro.classList.add('mensagem-erro');
                mensagemErro.textContent = 'Erro ao carregar comandas. Por favor, tente novamente.';
                document.querySelector('.container-grid-comandas').appendChild(mensagemErro);
        }
    }
    async function carregarDadosGarcom(token) {
        try {
            const response = await fetch(`http://localhost:8000/api/waiters/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }
            });
            if(!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro ${response.status}: ${errorText}`);
            }
            const data = await response.json();
            return data.fullName;
        }catch (error) {
                console.error("Erro ao buscar dados do garçom:", error);
                return;
        }
    }

});