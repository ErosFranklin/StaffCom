document.addEventListener('DOMContentLoaded', function() {
    const btnCadastrar = document.getElementById('btnCadastrar');
    const messagemErro = document.querySelector('.messagemErro');
    const spinner = document.querySelector('.container-spinner');

    btnCadastrar.addEventListener('click', async function(event){
        event.preventDefault();
        const restaurante_nome = document.getElementById('restaurante-nome').value;
        const restaurante_cnpj = document.getElementById('restaurante-cnpj').value;
        const nome = document.getElementById('nome-dono').value;
        const email = document.getElementById('email-dono').value;
        const confirmaEmail = document.getElementById('conf-email-dono').value;
        const senha = document.getElementById('senha').value;
        const confSenha = document.getElementById('conf-senha').value;

        if(nome === "" || email === "" || senha === "" || confSenha === ""){
            messagemErro.innerHTML = "Preencha todos os campos!";
            messagemErro.style.display = "block";
            spinner.style.display = "none";
            return;
        }
        if(senha !== confSenha){
            messagemErro.innerHTML = "As senhas não coincidem!";
            messagemErro.style.display = "block";
            spinner.style.display = "none";
            return;
        }
        if(email !== confirmaEmail){
            messagemErro.innerHTML = "Os emails não coincidem!";
            messagemErro.style.display = "block";
            spinner.style.display = "none";
            return;
        }
        if(!validandoSenha(senha)){
            messagemErro.textContent = "A senha deve conter entre 6 e 20 caracteres, pelo menos um número e uma letra.";
            messagemErro.style.display = "block";
            spinner.style.display = "none";
            return;
        }  
        if(!validandoEmail(email)){
            messagemErro.textContent = "Email inválido!";
            messagemErro.style.display = "block";
            spinner.style.display = "none";
            return;
        }

        try{
            const dados = {
                fullnome: nome,
                email: email,
                password: senha,
                restaurantName: restaurante_nome,
                cpnj: restaurante_cnpj
            }
            const response = await fetch('api/owners/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });
            if(!response.ok){
                throw new Error("Erro ao registrar usuário.");
            }
            const data = await response.json();
           
            window.location.href = "../index.html";
        }catch(error){
            console.error("Erro:", error);
            messagemErro.innerHTML = "Erro ao registrar usuário.";
            messagemErro.style.display = "block";
            spinner.style.display = "none";
        }
    });
    function validandoSenha(password) {
        var passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,20}$/;
        return passwordRegex.test(password);
    }
    function validandoEmail(email) {
        var emailRegex =
          /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
        return emailRegex.test(email);
    }
});