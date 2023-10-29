let visible = false;
let bntEntrar = document.querySelector("#entrar")
let usuario = document.querySelector("#email")
let pass = document.querySelector("#pass")
let logginMostrar = document.querySelector("#loggion")
let btnLogin = document.querySelector("#Btn")
let mandarEmail = document.querySelector("#mandar__email")
let cajaCargando=document.querySelector("#caja__loader")
btnLogin.addEventListener("click", () => {

   
   setTimeout(() => {
      logginMostrar.classList.toggle("loggion__mostrar")
      setTimeout(() => {
         cajaCargando.remove();
      }, 2000);
   }, 500);
   
}
)

function verificarUsuPass() {
   let usuRegistrados = [];

   usuRegistrados = JSON.parse(localStorage.getItem("registrados"))

   if (usuRegistrados != null){
      let registradoUsu = usuRegistrados.some(usu => usu.usuario === usuario.value);
   let registradoPass = usuRegistrados.some(usu => usu.pasword === pass.value);
   if (!registradoUsu) {
      msgLoggin("input__usu", "usuario incorrecto");
   }
   else {
      if (registradoPass) {
         Swal.fire({
            title: 'usuario Correcto',
            icon: 'success',
            showClass: {
               popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
               popup: 'animate__animated animate__fadeOutUp'
            }
         })
         window.location.href = "pages/datos.html";
      }
      else {
         msgLoggin("input__pass", "contraseña incorrecta");
      }
   }
   }
   
}

function msgLoggin(idUbicacion, texto) {
   let spanEliminar = document.querySelector(".margen")
   spanEliminar != null && spanEliminar.remove();

   let prueba = document.querySelector("#" + idUbicacion)
   let nuevaEtiqueta = document.createElement("span")
   nuevaEtiqueta.classList.add("usuarioNoDisponible")
   nuevaEtiqueta.classList.add("margen")
   nuevaEtiqueta.innerText = texto
   prueba.append(nuevaEtiqueta)
}

bntEntrar.addEventListener("click", (e) => {
   e.preventDefault();//para qe no se actualicew nuestro form y perdamos datos
   localStorage.setItem("usuario", usuario.value)
   localStorage.setItem("pass", pass.value)

   let usu = localStorage.getItem("usuario")
   let pas = localStorage.getItem("pass")
   verificarUsuPass()
}
)
function enviarEmail(usus) {

   let objetos = [];
   let usuario = [];
   objetos = JSON.parse(localStorage.getItem("registrados"))

   if (objetos != null) {

      let Ecuetra = objetos.some(usu => usu.usuario === usus)
      if (Ecuetra) {
         usuario = objetos.find(usu => usu.usuario === usus)
      
         const body ={
            service_id:'service_cc28tsq',
            template_id:'template_qh466v9',
            user_id:'iUJCtcr1z2VtxSAod',
            template_params:{
               'to_name': usuario.usuario,
               'from_name':usuario.mail,
               'message':usuario.pasword,
            }
         }
         
            enviarEmail2(body);
            Swal.fire({
               title: `Se envio email correctamente`,
               icon: 'success',
               showClass: {
                  popup: 'animate__animated animate__fadeInDown'
               },
               hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
               }
            })
         
      } else {
         Swal.fire({
            title: `usuario ${usus} inexistente`,
            icon: 'error',
            showClass: {
               popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
               popup: 'animate__animated animate__fadeOutUp'
            }
         })
      }

   }

}

mandarEmail.addEventListener("click", async () => {
   const { value: formValues } = await Swal.fire({
      title: 'Ingrese su usario',
      html:
         '<input id="swal-input1" class="swal2-input">',
      focusConfirm: false,
      preConfirm:
         () => {
            enviarEmail(document.getElementById('swal-input1').value)
         }
   })
}
)

const enviarEmail2=async(body)=>{

const setings={
   method :'POST',
   headers:{
      'Content-Type':'application/json'
   },
   body: JSON.stringify(body)

}

   const response= await fetch('https://api.emailjs.com/api/v1.0/email/send' , setings);

}
