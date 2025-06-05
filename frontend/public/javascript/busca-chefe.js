document.addEventListener('DOMContentLoaded', async function() {
    const token = localStorage.getItem('token');

    const managerId = await carregarDadosFuncionarios(token);
    console.log(managerId)

    async function carregarCozinheiros(managerId, token){
        try{
            const response = await fetch(`http://127.0.0.1:8000/api/managers/my-cooks`)
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

});