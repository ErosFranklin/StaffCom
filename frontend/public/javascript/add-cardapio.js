document.addEventListener("DOMContentLoaded", function () {
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

    const btnUploadPrincipal = document.querySelector("#add-principal .btn-img");
    const inputUploadPrincipal = document.querySelector("#upload-img-principal");
    const imgPreviewPrincipal = document.querySelector("#add-principal .img-comida img");

    const btnUploadSobremesa = document.querySelector("#add-sobremesa .btn-img");
    const inputUploadSobremesa = document.querySelector("#upload-img-sobremesa");
    const imgPreviewSobremesa = document.querySelector("#add-sobremesa .img-comida img");

    const btnUploadBebida = document.querySelector("#add-bebida .btn-img");
    const inputUploadBebida = document.querySelector("#upload-img-bebida");
    const imgPreviewBebida = document.querySelector("#add-bebida .img-comida img");

    getDadosBebidasCardapio();

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
        const nomeEntrada = document.querySelector("#nome-entrada").value;
        const descricaoEntrada = document.querySelector("#descricao-entrada").value;
        const tamanhoEntrada = document.querySelector("#tamanho-entrada").value;
        const valorEntrada = document.querySelector("#valor-entrada").value;
        const btnAdicionarEntrada = document.querySelector("#btn-adicionar-entrada").value;
    });

    btnPrincipal.addEventListener("click", function () {
        modalPrincipal.style.display = "flex";
        const nomePrincipal = document.querySelector("#nome-principal").value;
        const descricaoPincipal = document.querySelector("#descricao-principal").value;
        const valorPrincipal = document.querySelector("#valor-principal").value;
        const btnAdicionarPrincipal = document.querySelector("#btn-adicionar-principal").value;
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

    // Envio do formulário de bebida
    formAddBebida.addEventListener("submit", async function(event) {
        event.preventDefault();

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
        
        if (tipoGeralBebida === "nao-alcoolica") {
            const packagingType = document.querySelector("#tipo-embalagem").value;
            if (!packagingType) { 
                 alert("Por favor, preencha o Tipo de Embalagem.");
                 return;
            }
            formData.append('packagingType', packagingType);
            endpoint = 'http://localhost:8000/api/nonAlcoholic/create';
        } else if (tipoGeralBebida === "alcoolica") {
            const drinkType = document.querySelector("#tipo-bebida-alcoolica").value;
            if (!drinkType) { 
                 alert("Por favor, preencha o Tipo de Bebida.");
                 return;
            }
            formData.append('drinkType', drinkType);
            endpoint = 'http://localhost:8000/api/alcoholic/create';
        } else {
            alert("Por favor, selecione o tipo de bebida (Alcoólica/Não Alcoólica).");
            return;
        }

        if (endpoint) {
            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    //O backend espera um formdata,nao um json, entao nao é necessário definir o tipo de conteúdo
                    //O navegador define o Content-Type correto (multipart/form-data) automaticamente para FormData
                    body: formData
                });

                if (!response.ok) {
                    // Tentar ler a resposta como texto se não for JSON, para depuração
                    const errorText = await response.text(); 
                    let errorMessage = `Erro HTTP! Status: ${response.status}, Mensagem: ${response.statusText}`;
                    try {
                        const errorData = JSON.parse(errorText); // Tenta parsear como JSON para obter a mensagem de erro
                        errorMessage = `Erro HTTP! Status: ${response.status}, Mensagem: ${errorData.error || errorData.message || response.statusText}`;
                    } catch (jsonError) {
                        // Se não for JSON, usa o texto puro para depuração
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
                selectTipoGeralBebida.value = ""; // Limpa a seleção do dropdown para a opção inicial
                imgPreviewBebida.src = "../image/logo.png"; // Resetar a imagem de pré-visualização

                console.log('Bebida salva com sucesso:', result);
            } catch (error) {
                console.error('Erro ao salvar bebida:', error);
                alert("Erro ao adicionar bebida: " + error.message);
            }
        }
    });

    async function getDadosBebidasCardapio() {
        try {
            const response = await fetch('http://localhost:8000/api/alcoholic/get-all', {
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
        } catch (error) {
            console.error("Erro ao obter dados do cardápio:", error);
        }
    }
});