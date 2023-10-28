let registrados = [];

let registrarse__logearse = document.querySelector("#reg")
let registrarse_usu = document.querySelector("#registrarse_usu");
let inputUsu = document.querySelector(".input__usu")
let inputNom = document.querySelector(".input__nom")
let inputApe = document.querySelector(".input__ape")
let inputPass = document.querySelector(".input__pass")
let inputEmail = document.querySelector(".input__email")
let inputNum = document.querySelector(".input__num")


function registrado() {
    let objetos = [];
    let estaregistrado = false;
    objetos = JSON.parse(localStorage.getItem("registrados"))
    objetos == null ? estaregistrado = false : estaregistrado = objetos.some(usu => usu.usuario === registrarse__usu.value);;
    return estaregistrado

}

registrarse__usu.addEventListener("blur", () => {
    let objetos = [];

    objetos = JSON.parse(localStorage.getItem("registrados"))
    if (objetos != null) {
        //****verifico los usuarios y primero verifico que objetos no este vacio***** */
        let disponible = registrado();
        const disp = "Usuario Disponible"
        const Classdisp = "usuarioDisponible"

        const Nodisp = "Usuario No Disponible"
        const ClassNodisp = "usuarioNoDisponible"
        vacianSpan(ClassNodisp, Classdisp);
        disponible ? usuarioPermitido(Nodisp, ClassNodisp) : usuarioPermitido(disp, Classdisp);
    }

})
function vacianSpan(span1, span2) {
    const etiquetaSpan1 = document.querySelector("." + span1)
    const etiquetaSpan2 = document.querySelector("." + span2)

    etiquetaSpan1 != null && etiquetaSpan1.remove();
    etiquetaSpan2 != null && etiquetaSpan2.remove();
}
function usuarioPermitido(dispo, text) {
    const form = document.querySelector(".registrarse")
    const usu = document.querySelector("#registrarse__subtitulo")
    let usuPermitido = document.createElement("span");
    usuPermitido.classList.add(text)
    usuPermitido.innerHTML = `<span>${dispo}</span>`

    form.insertBefore(usuPermitido, usu)
}


registrarse__logearse.addEventListener("click", (e) => {
    e.preventDefault();//para qe no se actualicew nuestro form y perdamos datos

    let usu = document.querySelector("#registrarse__usu");
    let disponible = registrado();
    if (!disponible) {
        let Usuarios = {
            usuario: usu.value,
            nombre: document.querySelector("#registrarse__nom").value,
            apellido: document.querySelector("#registrarse__ape").value,
            pasword: document.querySelector("#registrarse__pass").value,
            mail: document.querySelector("#registrarse__mail").value,
            numero: document.querySelector("#registrarse__num").value
        };
        registrados.push(Usuarios)


        localStorage.setItem("registrados", JSON.stringify(registrados))
        Swal.fire({
            title: 'Registrado Correctamente',
            icon: 'success',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
        inputUsu.value="";
        inputNom.value="";
        inputApe.value="";
        inputPass.value="";
        inputEmail.value="";
        inputNum.value="";
    } else {
        usu.focus();
        Swal.fire({
            title: 'usuario no disponible',
            icon: 'error',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }

})