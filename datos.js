
let personajes=[]
let Genero=[]
let Especie=[]
let Estado=[]
let body = document.querySelector("#body")
let row = document.querySelector("#row")
let ComboGenero = document.querySelector("#filtro__genero")
let ComboEspecie = document.querySelector("#filtro__especie")
let ComboEstado = document.querySelector("#filtro__vivo")
let Buscar = document.querySelector("#buscar")

function Personajes(){
    fetch("https://rickandmortyapi.com/api/character")
    .then(response => response.json())
    .then(data =>{
         personajes=data.results;  
         
    })
}
function CargarDatos(personaje){
    personaje.forEach(personajes => {
        let div =document.createElement("div")
            div.classList.add("col-md-6","col-lg-4","col-xxl-3")
            div.id="per"
            div.innerHTML=`
                <h3>${personajes.name}</h3>
                <img src=${personajes.image} alt=${personajes.name}><br>
                ${personajes.gender} <br>
                ${personajes.species} <br>
                ${personajes.status} <br><br><br>
            ` 
            row.append(div)
    });
} 

function CargarCombo(personaje){
    Especie= personaje.map(especie=>especie.species)
    Genero= personaje.map(genero=>genero.gender)
    Estado= personaje.map(estado=>estado.status)

    CargarCombo2(Especie,ComboEspecie)
    CargarCombo2(Genero,ComboGenero)
    CargarCombo2(Estado,ComboEstado)
 
}
function CargarCombo2(combo/*arrayCombo*/,c){

    combo=combo.filter((item,index)=>{
        return combo.indexOf(item)===index;
    })
    combo.forEach(variable=>{
        let option=document.createElement("option");
        option.textContent=`
            ${variable}
        `
        option.value=variable;
        c.append(option)
    })
}

 Personajes();
 
 setTimeout(() => {
    
    CargarDatos(personajes)
    CargarCombo(personajes)
 }, 500);
   

Buscar.addEventListener("click",()=>{
     
/*********************elimina las imagenes cargadas */
    let ir=document.querySelectorAll("#per");
    ir.forEach(i=>{
        i.parentNode.removeChild(i);
    })
/*********************************************************** */
        filtro = [];
            filtro= personajes.filter(personaje=>
            ComboGenero.value!="" ?  personaje.gender==ComboGenero.value : personaje
            )   
            filtro= filtro.filter(personaje=>
                ComboEspecie.value!="" ?  personaje.species==ComboEspecie.value : filtro
                )
            filtro= filtro.filter(personaje=>
                ComboEstado.value!="" ?  personaje.status==ComboEstado.value : filtro
                )
            if(filtro.length==0){
                Swal.fire({
                    title: 'No Hay Datos para mostrar',
                    icon: 'error',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                filtro=personajes;
                CargarDatos(filtro);
                console.log(ComboEspecie.value)
                ComboEspecie.value="";
                ComboGenero.value="";
                ComboEstado.value="";
                
                
            }else{
                CargarDatos(filtro);
            }
}
)
