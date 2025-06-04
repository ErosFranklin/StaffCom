document.addEventListener('DOMContentLoaded', function(){
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const modalEditEntrada = document.querySelector('.modal-entrada');
    const modalEditContent = document.querySelector('.modal-content-cardapio');
    const spinner = document.querySelector('container-spinner')

    getDadosCardapio(token, userId);

    document.addEventListener('click', async function (event) {
        const btnEdit = event.target.closest('.btn-editar');
        //const btnDelete = event.target.closest('.btn-delete-exercise');
        if (btnEdit) {
            id = btnEdit.dataset.itemId;
            console.log('id do item:', id)
            modalEditEntrada.style.display = "flex";
            modalEditContent.style.display = "flex";
            
            try {
                const response = await fetch(`http://localhost:8000/api/menu/item/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Erro ao buscar treino para edição.");
                }
                const data = await response.json();
                console.log(data)
                modalEditContent.querySelectorAll('input, select').forEach(el => {
                    if (el.tagName === 'SELECT') {
                        el.selectedIndex = 0;
                    } else {
                        el.value = '';
                    }
                });
                modalEditContent.querySelector("#image-produto").value = data.image
                modalEditContent.querySelector(".nome-entrada").value = treino.exercise[index].name;
                modalEditContent.querySelector(".descricao-entrada").value = treino.muscleArea[0];
                modalEditContent.querySelector(".tamanho-entrada").value = treino.exercise[index].series;
                modalEditContent.querySelector(".valor-entrada").value = treino.exercise[index].equipment;
            } catch (error) {
                console.error("Erro ao editar treino:", error);
                errorMessageModal.style.display = "block";
                errorMessageModal.textContent = "Erro ao editar treino. Tente novamente mais tarde.";
            }
        }
    });
    async function getDadosCardapio(token, userId) {
        //spinner.style.display = "block";
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
            const data = await response.json();
            console.log("RETORNANDO: ",data);
            //spinner.style.display = "none";
            data.forEach(item => {
                if(item.itemType === 'entrada'){
                     const containerEntrada = document.querySelector(".container-entradas-grid");

                    const containerSubEntrada = document.createElement("div");
                    containerSubEntrada.classList.add("container-sub-comidas");

                    const entradaDiv = document.createElement("div");
                    entradaDiv.classList.add("entrada-item");

                    entradaDiv.innerHTML = `
                        <img src="${item.item.foodImg}" alt="${item.item.foodName}">
                        <div class="entrada-info">
                            <h3>${item.item.foodName}</h3>
                            <p>${item.item.description}</p>
                            <p>Valor: R$ ${item.item.value}</p>
                        </div>
                        <div class="btns-produto">
                            <button class="btn-editar" data-item-id="${item.id}"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button class="btn-deletar" data-item-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    `;

                    containerSubEntrada.appendChild(entradaDiv);
                    containerEntrada.appendChild(containerSubEntrada);
                }
                else if(item.itemType === 'receita'){
                    const containerPrincipal = document.querySelector(".container-principal-grid");

                    const containerSubPrincipal = document.createElement("div");
                    containerSubPrincipal.classList.add("container-sub-comidas");

                    const principalDiv = document.createElement("div");
                    principalDiv.classList.add("principal-item");

                    principalDiv.innerHTML = `
                        <img src="${item.item.foodImg}" alt="${item.item.foodName}">
                        <div class="principal-info">
                            <h3>${item.item.foodName}</h3>
                            <p>${item.item.description}</p>
                            <p>Valor: R$ ${item.item.value}</p>
                        </div>
                        <div class="btns-produto">
                            <button class="btn-editar" data-item-id="${item.id}"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button class="btn-deletar" data-item-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    `;

                    containerSubPrincipal.appendChild(principalDiv);
                    containerPrincipal.appendChild(containerSubPrincipal);           
                }
                else if(item.itemType === 'sobremesa'){

                }
                else if (item.itemType === 'bebida_alcoolica') {
                    const containerBebidas = document.querySelector(".container-bebidas-grid");

                    const containerSubBebidas = document.createElement("div");
                    containerSubBebidas.classList.add("container-sub-comidas");

                    const bebidaDiv = document.createElement("div");
                    bebidaDiv.classList.add("bebida-item");

                    bebidaDiv.innerHTML = `
                        <img src="${item.item.drinkImg}" alt="${item.item.drinkName}">
                        <div class="bebida-info">
                            <h3>${item.item.drinkName}</h3>
                            <p>${item.item.drinkType}</p>
                            <p>Tamanho: ${item.item.size}</p>
                            <p>Valor: R$ ${item.item.unitValue}</p>
                            <p>Quantidade: ${item.item.quantity}</p>
                        </div>
                        <div class="btns-produto">
                            <button class="btn-editar" data-item-id="${item.id}"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button class="btn-deletar" data-item-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    `;

                    containerSubBebidas.appendChild(bebidaDiv);
                    containerBebidas.appendChild(containerSubBebidas);
            }
                else if(item.itemType === 'bebida_nao_alcoolica'){
                    console.log("Bebida Não Alcoólica:", item);
                }
                else{
                    console.error("Tipo de item desconhecido:", item.itemType);
                }


            })
        } catch (error) {
            //spinner.style.display = "none";
            console.error("Erro ao obter dados do cardápio:", error);
        }
    }



})