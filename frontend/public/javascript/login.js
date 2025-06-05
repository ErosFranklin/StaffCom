document.addEventListener('DOMContentLoaded', async function() {
    const btnLogin = document.getElementById('btn-login');
    const messagemErro = document.querySelector('.messagemErro');
    const spinner = document.querySelector('.container-spinner');

    btnLogin.addEventListener('click', async function(event){
        event.preventDefault();
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const cargo = document.getElementById('cargo').value;
        const tipo_user = tipoUsuario(cargo);
        spinner.style.display = "block";
        console.log(email, senha);

        console.log(email, senha);

        if(email === "" || senha === ""){
            messagemErro.innerHTML = "Preencha todos os campos!";
            messagemErro.style.display = "block";
            spinner.style.display = "none";
            return;
        }
        /*
        if(!validandoSenha(senha)){
            messagemErro.textContent = "A senha deve conter entre 6 e 20 caracteres, pelo menos um número e uma letra.";
            messagemErro.style.display = "block";
            spinner.style.display = "none";
            return;
        }  */
        if(!validandoEmail(email)){
            messagemErro.textContent = "Email inválido!";
            messagemErro.style.display = "block";
            spinner.style.display = "none";
            return;
        }

        try{
            const dados = {
                email:email,
                password:senha
            }
            console.log(tipo_user)
            const response = await fetch(`http://127.0.0.1:8000/api/${tipo_user}/signIn`, {
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
            console.log(data);
            const decode = jwt_decode(data.token);
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', decode.ownerId || decode.managerId || decode.kitchenChefId || decode.cookId || decode.waiterId);
            console.log("Token armazenado no localStorage:", data.token);
            
            console.log(decode);
            switch(cargo){
                        case "proprietario":
                            window.location.href = '../public/views/cadastro-cardapio.html';
                            break;
                        case "gerente":
                            window.location.href = '../public/views/home-gerente.html';
                            break;
                        case "chefe_cozinheiro":
                            window.location.href = '../public/views/home-chefe.html';
                            break;
                        case "cozinheiro":
                            window.location.href = '#';
                            break;
                        case "garcom":
                            window.location.href = '#';
                            break;
                    }
        }catch(error){
            console.error("Erro ao capturar os dados do formulário:", error);
            messagemErro.style.display = "block";
            messagemErro.textContent = "Erro ao fazer login. Verifique suas credenciais.";
            
        }finally{
            spinner.style.display = "none";
        }
})
    function validandoSenha(password) {
        var passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,20}$/;
        return passwordRegex.test(password);
    }
    function validandoEmail(email) {
        var emailRegex =
          /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
        return emailRegex.test(email);
    }
    function tipoUsuario(cargo){
        switch(cargo){
            case "proprietario":
                return "owners";
            case "gerente":
                return "managers";
            case "chefe_cozinheiro":
                return "kitchenChefs";
            case "cozinheiro":
                return "cooks";
            case "garcom":
                return "waiters";
        }
    }
});