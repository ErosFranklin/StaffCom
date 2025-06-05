document.addEventListener('DOMContentLoaded', function(){
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const modalEditEntrada = document.querySelector('.modal-entrada');
    const modalEditprincipal = document.querySelector('.modal-principal');
    const modalEditContent = document.querySelector('.modal-content-cardapio');

    

    const spinner = document.querySelector('.container-spinner');

    //const selectTipoGeralBebida = document.querySelector("#tipo-de-bebida-geral");
    //const campoTipoEmbalagem = document.querySelector("#campo-tipo-embalagem");
    //const campoTipoBebidaAlcoolica = document.querySelector("#campo-tipo-bebida-alcoolica");

    //modal de entrada

    const btnUploadEntrada = document.querySelector("#add-entrada .btn-img");
    const inputUploadEntrada = document.querySelector("#upload-img-entrada");
    const imgPreviewEntrada = document.querySelector("#add-entrada .img-comida img");
    const formAddEntrada = document.querySelector("#add-entrada");
    const closeModalEditEntrada = document.querySelector('.btn-fechar-entrada');


    const btnUploadPrincipal = document.querySelector("#add-principal .btn-img");
    const inputUploadPrincipal = document.querySelector("#upload-img-principal");
    const imgPreviewPrincipal = document.querySelector("#add-principal .img-comida img");
    const formAddPrincipal = document.querySelector("#add-principal");

    const closeModalEditPrincipal = document.querySelector('.btn-fechar-principal');


    const btnUploadSobremesa = document.querySelector("#add-sobremesa .btn-img");
    const inputUploadSobremesa = document.querySelector("#upload-img-sobremesa");
    const imgPreviewSobremesa = document.querySelector("#add-sobremesa .img-comida img");

    const btnUploadBebida = document.querySelector("#add-bebida .btn-img");
    const inputUploadBebida = document.querySelector("#upload-img-bebida");
    const imgPreviewBebida = document.querySelector("#add-bebida .img-comida img");

    let id = null;
    let menuId = null;


    getDadosCardapio(token, userId);

    function setupImageUpload(btnUpload, inputUpload, imgPreview) {
        btnUpload.addEventListener("click", function () {
            inputUpload.click();
        });

        inputUpload.addEventListener("change", function () {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    imgPreview.src = e.target.result;
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
    setupImageUpload(btnUploadEntrada, inputUploadEntrada, imgPreviewEntrada);

    setupImageUpload(btnUploadPrincipal, inputUploadPrincipal, imgPreviewPrincipal);


    //setupImageUpload(btnUploadPrincipal, inputUploadPrincipal, imgPreviewPrincipal);

   //setupImageUpload(btnUploadSobremesa, inputUploadSobremesa, imgPreviewSobremesa);
    //setupImageUpload(btnUploadBebida, inputUploadBebida, imgPreviewBebida);
    /*
    if (selectTipoGeralBebida && campoTipoEmbalagem && campoTipoBebidaAlcoolica) {
        selectTipoGeralBebida.addEventListener("change", function() {
            if (this.value === "nao-alcoolica") {
                campoTipoEmbalagem.classList.remove("hidden-field");
                campoTipoBebidaAlcoolica.classList.add("hidden-field");
                document.querySelector("#tipo-embalagem").setAttribute("required", "true");
                document.querySelector("#tipo-bebida-alcoolica").removeAttribute("required");
            } else if (this.value === "alcoolica") {
                campoTipoEmbalagem.classList.add("hidden-field");
                campoTipoBebidaAlcoolica.classList.remove("hidden-field");
                document.querySelector("#tipo-embalagem").removeAttribute("required");
                document.querySelector("#tipo-bebida-alcoolica").setAttribute("required", "true");
            } else {
                campoTipoEmbalagem.classList.add("hidden-field");
                campoTipoBebidaAlcoolica.classList.add("hidden-field");
                document.querySelector("#tipo-embalagem").removeAttribute("required");
                document.querySelector("#tipo-bebida-alcoolica").removeAttribute("required");
            }
        });
    } else {
        console.error("Erro: Existe algum erro com o select ou os campos condicionais.");
        console.log("selectTipoGeralBebida:", selectTipoGeralBebida);
        console.log("campoTipoEmbalagem:", campoTipoEmbalagem);
        console.log("campoTipoBebidaAlcoolica:", campoTipoBebidaAlcoolica);
    }
    */

    document.addEventListener('click', async function (event) {
        console.log("entrada");
        const btnEdit = event.target.closest('.btn-editar');
        const btnDelete = event.target.closest('.btn-deletar');


        const isInsideEntradaSection = (btnEdit && btnEdit.closest('.container-entradas-grid')) || (btnDelete && btnDelete.closest('.container-entradas-grid'));

        if (!isInsideEntradaSection) {
            console.log("O botão clicado não está dentro da seção de entradas.");
            return
        }
        

        if (btnEdit) {
            id = btnEdit.dataset.itemId;
            menuId = btnEdit.dataset.menuId;
            console.log('id do menu:', menuId)
            console.log('id do item:', id)
            modalEditEntrada.style.display = "flex";

            const currentModalContent = modalEditEntrada.querySelector('.modal-content-cardapio');
            currentModalContent.style.display = "flex";

            spinner.style.display = "block";
            try {
                const response = await fetch(`http://localhost:8000/api/menu/item/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Erro ao buscar item para edição.");
                }
                const data = await response.json();
                console.log("Dados do item:", data);
                spinner.style.display = "none";

                modalEditContent.querySelectorAll('input, select').forEach(el => {
                    if (el.tagName === 'SELECT') {
                        el.selectedIndex = 0;
                    } else {
                        el.value = '';
                    }
                });
                if(data.itemType === 'entrada'){
                    modalEditContent.querySelector("#image-produto").src = data.item.foodImg || data.item.drinkImg;
                    modalEditContent.querySelector("#nome-entrada").value = data.item.foodName || data.item.drinkName;
                    modalEditContent.querySelector("#descricao-entrada").value = data.item.description;
                    modalEditContent.querySelector("#tamanho-entrada").value = data.item.size || '';
                    modalEditContent.querySelector("#valor-entrada").value = data.item.value || data.item.unitValue;
                    id = data.item.id;
                }else{
                    console.log("Item não é uma entrada, tipo:", data.itemType);
                    return;
                }
            } catch (error) {
                console.error("Erro ao editar prato de entrada:", error);
                errorMessageModal.style.display = "block";
                errorMessageModal.textContent = "Erro ao editar prato de entrada. Tente novamente mais tarde.";
            }
        }else if(btnDelete){
            menuId = btnDelete.dataset.menuId;
            console.log('id do menu:', menuId)
            console.log(token)
            const confirmDelete = confirm("Você tem certeza que deseja excluir este item?");
            if (confirmDelete) {
                try {
                    const response = await fetch(`http://localhost:8000/api/menu/${menuId}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (!response.ok) {
                        throw new Error("Erro ao excluir item do cardápio.");
                    }
                    alert("Item excluído com sucesso!");
                    location.reload();
                } catch (error) {
                    console.error('Erro ao excluir item:', error);
                    alert("Erro ao excluir item: " + error.message);
                }
            }
        }
    });

    document.addEventListener('click', async function(event) {
        console.log("principal");
        const btnEditPrincipal = event.target.closest('.btn-editar');
        const btnDeletePrincipal = event.target.closest('.btn-deletar');

        const isInsidePrincipalSection = (btnEditPrincipal && btnEditPrincipal.closest('.container-prato-principal')) || (btnDeletePrincipal && btnDeletePrincipal.closest('.container-prato-principal'));

    if (!isInsidePrincipalSection) {
        // Se o clique não foi em um botão de principal dentro da seção de principal,
        // este listener não deve fazer nada.
        console.log("O botão clicado não está dentro da seção de pratos principais.");
        return;
    }
        if (btnEditPrincipal) {
            console.log("Editando prato principal");
            id = btnEditPrincipal.dataset.itemId;
            menuId = btnEditPrincipal.dataset.menuId;
            console.log('id do menu:', menuId)
            console.log('id do item:', id)
            modalEditprincipal.style.display = "flex";
            const currentModalContent = modalEditprincipal.querySelector('.modal-content-cardapio');
            currentModalContent.style.display = "flex";
            spinner.style.display = "block";
            try {
                const response = await fetch(`http://localhost:8000/api/menu/item/${menuId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Erro ao buscar item para edição.");
                }
                const data = await response.json();

                console.log("Dados do item:", data);

                spinner.style.display = "none";
                modalEditContent.querySelectorAll('input, select').forEach(el => {
                    if (el.tagName === 'SELECT') {
                        el.selectedIndex = 0;
                    } else {
                        el.value = '';
                    }
                });

                if(data.itemType === 'receita'){
                    currentModalContent.querySelector("#image-produto-principal").src = data.item.foodImg || '../image/logo.png';
                    currentModalContent.querySelector("#nome-principal").value = data.item.foodName || '';
                    currentModalContent.querySelector("#descricao-principal").value = data.item.description || '';
                    currentModalContent.querySelector("#valor-principal").value = data.item.value || '';
                }else {
                    console.log("Item não é um prato principal, tipo:", data.itemType);
                    return;
                }
            } catch (error) {
                console.error("Erro ao editar prato principal:", error);
                errorMessageModal.style.display = "block";
                errorMessageModal.textContent = "Erro ao editar prato principal. Tente novamente mais tarde.";

            }
        }else if(btnDeletePrincipal){
            menuId = btnDeletePrincipal.dataset.menuId;
            console.log('id do menu:', menuId)
            console.log(token)
            const confirmDelete = confirm("Você tem certeza que deseja excluir este item?");
            if (confirmDelete) {
                try {
                    const response = await fetch(`http://localhost:8000/api/menu/${menuId}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (!response.ok) {
                        throw new Error("Erro ao excluir item do cardápio.");
                    }
                    alert("Item excluído com sucesso!");
                    location.reload();
                } catch (error) {
                    console.error('Erro ao excluir item:', error);
                    alert("Erro ao excluir item: " + error.message);
                }
            }
        }else if(btnDelete){
            menuId = btnDelete.dataset.menuId;
            console.log('id do menu:', menuId)
            console.log(token)
            const confirmDelete = confirm("Você tem certeza que deseja excluir este item?");
            if (confirmDelete) {
                try {
                    const response = await fetch(`http://localhost:8000/api/menu/${menuId}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (!response.ok) {
                        throw new Error("Erro ao excluir item do cardápio.");
                    }
                    alert("Item excluído com sucesso!");
                    location.reload();
                } catch (error) {
                    console.error('Erro ao excluir item:', error);
                    alert("Erro ao excluir item: " + error.message);
                }
            }
        }
    });

    //Funcao para editar dados de uma entrada
    formAddEntrada.addEventListener("submit", async function(event) {
        event.preventDefault();
        spinner.style.display = "block";
        const imageFile = inputUploadEntrada.files[0];

        if(!imageFile){
            alert("Por favor, selecione uma imagem para a entrada.");
            return;
        }
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('foodName', document.querySelector("#nome-entrada").value);
        formData.append('foodDescription', document.querySelector("#descricao-entrada").value);
        formData.append('size', document.querySelector("#tamanho-entrada").value);
        formData.append('value', parseFloat(document.querySelector("#valor-entrada").value));

        try{
            const response = await fetch(`http://localhost:8000/api/appetizers/${id}`, {
                method: 'PUT',
                headers: {  
                    'Authorization': `Bearer ${token}`
                },
                body: formData

            })
            if (!response.ok) {
                    const errorText = await response.text(); 
                    let errorMessage = `Erro HTTP! Status: ${response.status}, Mensagem: ${response.statusText}`;
                    spinner.style.display = "none";
                    try {
                        const errorData = JSON.parse(errorText); 
                        errorMessage = `Erro HTTP! Status: ${response.status}, Mensagem: ${errorData.error || errorData.message || response.statusText}`;
                    } catch (jsonError) {
                        
                        errorMessage = `Erro HTTP! Status: ${response.status}, Resposta: ${errorText}`;
                    }
                    throw new Error(errorMessage);
                }

                const result = await response.json();
                formAddEntrada.reset();
                modalEditEntrada.style.display = "none";
                spinner.style.display = "none";
                imgPreviewEntrada.src = "../image/logo.png"; 
                location.reload(); 
                console.log('Entrada salva com sucesso:', result);
                
            } catch (error) {
                spinner.style.display = "none";
                console.error('Erro ao salvar receita:', error);
                alert("Erro ao adicionar receita: " + error.message);
            }

    })

    formAddPrincipal.addEventListener("submit", async function(event) {
        event.preventDefault();
        spinner.style.display = "block";
        const imageFile = inputUploadPrincipal.files[0];

        if(!imageFile){
            alert("Por favor, selecione uma imagem para o prato principal.");
            return;
        }
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('foodName', document.querySelector("#nome-principal").value);
        formData.append('foodDescription', document.querySelector("#descricao-principal").value);
        formData.append('value', parseFloat(document.querySelector("#valor-principal").value));

        try{
            const response = await fetch(`http://localhost:8000/api/recipes/${id}`, {
                method: 'PUT',
                headers: {  
                    'Authorization': `Bearer ${token}`
                },
                body: formData

            })
            if (!response.ok) {
                    const errorText = await response.text(); 
                    let errorMessage = `Erro HTTP! Status: ${response.status}, Mensagem: ${response.statusText}`;
                    spinner.style.display = "none";
                    try {
                        const errorData = JSON.parse(errorText); 
                        errorMessage = `Erro HTTP! Status: ${response.status}, Mensagem: ${errorData.error || errorData.message || response.statusText}`;
                    } catch (jsonError) {
                        
                        errorMessage = `Erro HTTP! Status: ${response.status}, Resposta: ${errorText}`;
                    }
                    throw new Error(errorMessage);
                }

                const result = await response.json();
                formAddPrincipal.reset();
                modalEditEntrada.style.display = "none";
                spinner.style.display = "none";
                imgPreviewPrincipal.src = "../image/logo.png"; 
                location.reload(); 
                console.log('Entrada salva com sucesso:', result);
                
            } catch (error) {
                spinner.style.display = "none";
                console.error('Erro ao salvar receita:', error);
                alert("Erro ao adicionar receita: " + error.message);
            }

    })

    async function getDadosCardapio(token, userId) {
        spinner.style.display = "block";
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
            
            spinner.style.display = "none";
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
                            <p>Tamanho: ${item.item.size}</p>
                            <p>Valor: R$ ${item.item.value}</p>
                        </div>
                        <div class="btns-produto">
                            <button class="btn-editar" data-item-id="${item.id}" data-menu-id="${item.id}"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button class="btn-deletar" data-item-id="${item.id}" data-menu-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
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
                            <button class="btn-editar" data-item-id="${item.item.id}" data-menu-id="${item.id}"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button class="btn-deletar" data-item-id="${item.item.id}" data-menu-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
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
            spinner.style.display = "none";
            console.error("Erro ao obter dados do cardápio:", error);
        }
    }
    closeModalEditEntrada.addEventListener('click', function() {
        modalEditEntrada.style.display = "none";
        modalEditContent.style.display = "none";
        imgPreviewEntrada.src = "../image/logo.png"; 
        formAddEntrada.reset(); 
    })

    closeModalEditPrincipal.addEventListener('click', function() {
        modalEditEntrada.style.display = "none";
        modalEditContent.style.display = "none";
        imgPreviewPrincipal.src = "../image/logo.png"; 
        formAddPrincipal.reset();
    })
})