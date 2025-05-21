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

    btnFecharModalEntrada.addEventListener("click", function () {
        modalEntradas.style.display = "none";
    });
    btnFecharModalPrincipal.addEventListener("click", function () {
        modalPrincipal.style.display = "none";
    });
    btnFecharModalSobremesa.addEventListener("click", function () {
        modalSobremesa.style.display = "none";
    });



})