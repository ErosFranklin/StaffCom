function mostrarSenha(){
    var input = document.getElementById('senha');
    var eyesbtn = document.getElementById('eyes');
    
    if(input.type === 'password' ){
        input.setAttribute('type','text');
        eyesbtn.classList.replace('fa-eye', 'fa-eye-slash');
    }
    else{
        input.setAttribute('type','password');
        eyesbtn.classList.replace('fa-eye-slash', 'fa-eye');
    }
}
function mostrarConfSenha(){
    var inputC = document.getElementById('conf_password');
    var eyesbtnC = document.getElementById('eyes2');

    if(inputC.type === 'password'){
        inputC.setAttribute('type','text');
        eyesbtnC.classList.replace('fa-eye', 'fa-eye-slash');
    }
    else{
        inputC.setAttribute('type','password');
        eyesbtnC.classList.replace('fa-eye-slash', 'fa-eye');
    }
}
