document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem('token');
    const spinner = document.querySelector(".container-spinner");
    if (!token) {
        console.error("Token não encontrado. Redirecionando para a página de login.");
        window.location.href = "../public/views/login.html"; 
    }
    const modalEntradas = document.querySelector(".modal-entrada");
    const btnEntradas = document.querySelector(".btn-mais-entrada");
    const btnFecharModalEntrada = document.querySelector(".btn-fechar-entrada");

    const modalPrincipal = document.querySelector(".modal-principal");
    const btnPrincipal = document.querySelector(".btn-mais-principal");
    const btnFecharModalPrincipal = document.querySelector(".btn-fechar-principal");

    const modalSobremesa = document.querySelector(".modal-sobremesa");    
    const btnSobremesa = document.querySelector(".btn-mais-sobremesa");
    const btnFecharModalSobremesa = document.querySelector(".btn-fechar-sobremesa");

    const modalBebida = document.querySelector(".modal-bebida");
    const btnBebida = document.querySelector(".btn-mais-bebida");
    const btnFecharModalBebida = document.querySelector(".btn-fechar-bebida");
    const formAddBebida = document.querySelector("#add-bebida");

    const selectTipoGeralBebida = document.querySelector("#tipo-de-bebida-geral");
    const campoTipoEmbalagem = document.querySelector("#campo-tipo-embalagem");
    const campoTipoBebidaAlcoolica = document.querySelector("#campo-tipo-bebida-alcoolica");

    const btnUploadEntrada = document.querySelector("#add-entrada .btn-img");
    const inputUploadEntrada = document.querySelector("#upload-img-entrada");
    const imgPreviewEntrada = document.querySelector("#add-entrada .img-comida img");
    const formAddEntrada = document.querySelector("#add-entrada");

    const btnUploadPrincipal = document.querySelector("#add-principal .btn-img");
    const inputUploadPrincipal = document.querySelector("#upload-img-principal");
    const imgPreviewPrincipal = document.querySelector("#add-principal .img-comida img");
    const formAddPrincipal = document.querySelector("#add-principal");

    const btnUploadSobremesa = document.querySelector("#add-sobremesa .btn-img");
    const inputUploadSobremesa = document.querySelector("#upload-img-sobremesa");
    const imgPreviewSobremesa = document.querySelector("#add-sobremesa .img-comida img");

    const btnUploadBebida = document.querySelector("#add-bebida .btn-img");
    const inputUploadBebida = document.querySelector("#upload-img-bebida");
    const imgPreviewBebida = document.querySelector("#add-bebida .img-comida img");

    getDadosCardapio();

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
    setupImageUpload(btnUploadSobremesa, inputUploadSobremesa, imgPreviewSobremesa);
    setupImageUpload(btnUploadBebida, inputUploadBebida, imgPreviewBebida);


    btnEntradas.addEventListener("click", function () {
        modalEntradas.style.display = "flex";
    });

    btnPrincipal.addEventListener("click", function () {
        modalPrincipal.style.display = "flex";
    });

    btnSobremesa.addEventListener("click", function () { 
        modalSobremesa.style.display = "flex";
        const nomeSobremesa = document.querySelector("#nome-sobremesa").value;
        const descricaoSobremesa = document.querySelector("#descricao-sobremesa").value;
        const valorSobremesa = document.querySelector("#valor-sobremesa").value;
        const btnAdicionarSobremesa = document.querySelector("#btn-adicionar-sobremesa").value;
    });

    btnBebida.addEventListener("click", function () {
        modalBebida.style.display = "flex";
        const nomeBebida = document.querySelector("#nome-bebida").value;
        const tamanhoBebida = document.querySelector("#tamanho-bebida").value;
        const valorBebida = document.querySelector("#valor-bebida").value;
        const quantidadeBebida = document.querySelector("#quantidade-bebida").value;
        const btnAdicionarBebida = document.querySelector("#btn-adicionar-bebida").value;
    });

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

    btnFecharModalEntrada.addEventListener("click", function () {
        modalEntradas.style.display = "none";
    });
    btnFecharModalPrincipal.addEventListener("click", function () {
        modalPrincipal.style.display = "none";
    });
    btnFecharModalSobremesa.addEventListener("click", function () {
        modalSobremesa.style.display = "none";
    });
    btnFecharModalBebida.addEventListener("click", function () {
        modalBebida.style.display = "none";
        campoTipoEmbalagem.classList.add("hidden-field");
        campoTipoBebidaAlcoolica.classList.add("hidden-field");
        document.querySelector("#tipo-embalagem").removeAttribute("required");
        document.querySelector("#tipo-bebida-alcoolica").removeAttribute("required");
        selectTipoGeralBebida.value = "";
        imgPreviewBebida.src = "../image/logo.png";
    });

     
    formAddPrincipal.addEventListener("submit", async function(event) {
        console.log("Enviando formulário de prato principal...");
        event.preventDefault();
        spinner.style.display = "block"; 
        const imageFile = inputUploadPrincipal.files[0];
        if (!imageFile) {
            alert("Por favor, selecione uma imagem para o prato principal.");
            return;
        }
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('foodName', document.querySelector("#nome-principal").value);
        formData.append('foodDescription', document.querySelector("#descricao-principal").value);
        formData.append('value', parseFloat(document.querySelector("#valor-principal").value));

        try{
            const response = await fetch('http://localhost:8000/api/recipes/', {
                method: 'POST',
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
                alert("Prato Principal adicionada com sucesso!");
                formAddPrincipal.reset();
                modalPrincipal.style.display = "none";
                
                imgPreviewPrincipal.src = "../image/logo.png"; 

                console.log('Prato salvo com sucesso:', result);
                adicionarMenu(result,'receita', result.recipe.id);
            } catch (error) {
                spinner.style.display = "none";
                console.error('Erro ao salvar receita:', error);
                alert("Erro ao adicionar receita: " + error.message);
            }
    })

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
            const response = await fetch('http://localhost:8000/api/appetizers', {
                method: 'POST',
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
                alert("Entrada adicionada com sucesso!");
                formAddEntrada.reset();
                modalEntradas.style.display = "none";
                
                imgPreviewEntrada.src = "../image/logo.png"; 

                console.log('Entrada salva com sucesso:', result);
                adicionarMenu(result,'entrada', result.appetizer.id);
            } catch (error) {
                spinner.style.display = "none";
                console.error('Erro ao salvar receita:', error);
                alert("Erro ao adicionar receita: " + error.message);
            }

    })


    
    formAddBebida.addEventListener("submit", async function(event) {
        event.preventDefault();
        spinner.style.display = "block";
        const imageFile = inputUploadBebida.files[0];
        if (!imageFile) {
            alert("Por favor, selecione uma imagem para a bebida.");
            return;
        }
        const formData = new FormData();
        formData.append('image', imageFile); 
        formData.append('drinkName', document.querySelector("#nome-bebida").value);
        formData.append('size', document.querySelector("#tamanho-bebida").value);
        formData.append('unitValue', parseFloat(document.querySelector("#valor-bebida").value));
        formData.append('quantity', parseInt(document.querySelector("#quantidade-bebida").value));

        const tipoGeralBebida = selectTipoGeralBebida.value;
        let endpoint = '';
        let tipoBebida = '';
        
        if (tipoGeralBebida === "nao-alcoolica") {
            tipoBebida = 'bebida_nao_alcoolica';
            const packagingType = document.querySelector("#tipo-embalagem").value;
            if (!packagingType) { 
                 alert("Por favor, preencha o Tipo de Embalagem.");
                 return;
            }
            formData.append('packagingType', packagingType);
            endpoint = 'http://localhost:8000/api/nonAlcoholic/';
        } else if (tipoGeralBebida === "alcoolica") {
            tipoBebida = 'bebida_alcoolica';
            const drinkType = document.querySelector("#tipo-bebida-alcoolica").value;
            if (!drinkType) { 
                 alert("Por favor, preencha o Tipo de Bebida.");
                 return;
            }
            formData.append('drinkType', drinkType);
            endpoint = 'http://localhost:8000/api/alcoholic/';
        } else {
            alert("Por favor, selecione o tipo de bebida (Alcoólica/Não Alcoólica).");
            return;
        }

        if (endpoint) {
            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                     headers: {
                        'Authorization': `Bearer ${token}`
    
                    },
                    body: formData
                });

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
                alert("Bebida adicionada com sucesso!");
                formAddBebida.reset();
                modalBebida.style.display = "none";
                
                campoTipoEmbalagem.classList.add("hidden-field");
                campoTipoBebidaAlcoolica.classList.add("hidden-field");
                document.querySelector("#tipo-embalagem").removeAttribute("required");
                document.querySelector("#tipo-bebida-alcoolica").removeAttribute("required");
                selectTipoGeralBebida.value = ""; 
                imgPreviewBebida.src = "../image/logo.png"; 

                console.log('Bebida salva com sucesso:', result);
                adicionarMenu(result,tipoBebida, result.drink.id);
            } catch (error) {
                spinner.style.display = "none";
                console.error('Erro ao salvar bebida:', error);
                alert("Erro ao adicionar bebida: " + error.message);
            }
        }
    });

    async function getDadosCardapio() {
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
                            <p>Valor: R$ ${item.item.value}</p>
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
    async function adicionarMenu(dados, tipo, id) {
        console.log("Adicionando item ao cardápio:", dados);
        spinner.style.display = "block";
        const dadosMenu = {
            ownerId: localStorage.getItem('userId'),
            itemType: tipo,
        }
        try {
            const response = await fetch(`http://localhost:8000/api/menu/new-item/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(dadosMenu)
            });
            if (!response.ok) {
                throw new Error("Erro ao adicionar item ao cardápio.");
            }
            spinner.style.display = "none";
            const data = await response.json();
            console.log("Item adicionado ao cardápio:", data);
        } catch (error) {
            spinner.style.display = "none";
            console.error("Erro ao adicionar item ao cardápio:", error);
        }
    }
});