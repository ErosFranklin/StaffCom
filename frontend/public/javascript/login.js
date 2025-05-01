document.addEventListener('DOMContentLoaded', await function() {
    const btnLogin = document.getElementById('btnLogin');
    const messagemErro = document.querySelector('.messagemErro');
    btnLogin.addEventListener('click', async function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const spinner = document.querySelector('.container-spinner');
        const cargo = document.getElementById('cargo').value;

        if(email === "" || senha === ""){
            messagemErro.innerHTML = "Preencha todos os campos!";
            messagemErro.style.display = "block";
            spinner.style.display = "none";
            return;
        }
        if(!validandoSenha(password)){
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
                email:email,
                password:senha
            }
            const response = await fetch('api/user/login', {
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
            if(data.status === "success"){
                localStorage.setItem('token', data.token);
                switch(cargo){
                    case "gerente":
                        window.location.href = '../public/views/homeGerente.html';
                        break;
                    case "chefe_cozinheiro":
                        window.location.href = '../public/views/homeChefeCozinheiro.html';
                        break;
                    case "cozinheiro":
                        window.location.href = '../public/views/homeGarcom.html';
                        break;
                    default:
                        localStorage.setItem('cargo', "garcom");
                }
            }
        }catch(error){
            console.error("Erro ao capturar os dados do formulário:", error);
        }finally{
            spinner.style.display = "none";
            messagemErro.style.display = "none";
        }
    });
    function validandoSenha(password) {
        var passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,20}$/;
        return passwordRegex.test(password);
    }
    function validandoEmail(email) {
        var emailRegex =
          /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
        return emailRegex.test(email);
    }
});