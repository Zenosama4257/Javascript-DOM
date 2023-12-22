window.addEventListener("load",CargarDatos);
let ver2=document.getElementById("ver2");
ver2.addEventListener("click",VerDatos);
let DatosGlobales=[];
let CapaPersonajes= document.getElementById("CapaPersonajes");
let ver1=document.getElementById("ver1");
ver1.addEventListener("click",generaTablaPersonajes);
let borrarTabla=document.getElementById("borrarTablaP");
borrarTabla.addEventListener("click", function (){
    // Comprobacion si existe, por no duplicar
    let existeTabla=document.getElementById("tablaPersonajes");

    if (existeTabla!=null && existeTabla!="undefined"){
       
        let padre=document.getElementById("tablaPersonajes").parentElement;
         padre.removeChild(existeTabla);
    }    
    

} );

let quitarTodo=document.getElementById("QuitarT");
quitarTodo.addEventListener("click", QuitarTodo );

let resaltarpares=document.getElementById("ResaltarP");
resaltarpares.addEventListener("click",ResaltarPares);

let resaltarTodo=document.getElementById("ResaltarT");
resaltarTodo.addEventListener("click",ResaltarTodo);

let quitarImpares=document.getElementById("Quitar");
quitarImpares.addEventListener("click",QuitarImpares);

let resaltarI=document.getElementById("ResaltarI");
resaltarI.addEventListener("click", ResaltarImpares);

let eliminarImpares=document.getElementById("EliminarI");
quitarImpares.addEventListener("click",EliminarI);


function Cargar (){
    alert ("OTRO ALERT");
}

function CargarDatos(){
    //alert ("Otro Boton VER 2");
    const myInit={
        method:"GET",
        mode:"cors",
        cache:"no-cache",
    };
    let peticion= new Request("https://swapi.dev/api/people",myInit);
    // fetch (peticion).
    //     then(respuesta=>respuesta.json()).
    //     then (function (personajes){
    //         DatosGlobales=personajes.results;
    //         console.log (DatosGlobales);
    //     }).
    //     catch ( function (error){
    //         alert (error.message);
    //     }

    //     );

    if (localStorage.getItem("MisDatos")==null && localStorage.getItem("MisDatos")=="undefined"){
        //2ª Version
        fetch (peticion).
        then(respuesta=>respuesta.json()).
        then (function (personajes){
            //Solo es necesario ejecutarlo 1 vez porque con el localstorage los datos se mantienen 
             localStorage.setItem("MisDatos", JSON.stringify(personajes.results));
             Datos=personajes.results;
           
        }).
        catch ( function (error){
            alert (error.message);
        }

        );
    }
    else{// hay datos
        let Datos=JSON.parse(localStorage.getItem("MisDatos"));
        console.log(Datos);

    }
}

// let Datos=JSON.parse(localStorage.getItem("MisDatos"));
//  console.log(Datos);


function VerDatos(){
    CapaPersonajes.innerHTML="";
    let select=document.createElement("select");
    select.id="personajes";
    select.name="personajes";
    for (let personaje of Datos){
        let option=document.createElement("option");
        option.text=personaje.name;
        select.appendChild(option);
    }
    CapaPersonajes.appendChild(select);
}

function generaTablaPersonajes() {
    CapaPersonajes.innerHTML="";

    // Comprobacion si existe, por no duplicar
    let existeTabla=document.getElementById("tablaPersonajes");

    if (existeTabla!=null && existeTabla!="undefined"){
        alert ("Tabla Ya creada")
        return;
    }

    // Crea un elemento <table> y un elemento <tbody>
    let tabla = document.createElement("table");
    tabla.id="tablaPersonajes";
    let tblhead=document.createElement("thead");
    let tblBody = document.createElement("tbody");
 
    // Crea las celdas
    for (personaje of Datos) {
        // Crea las filas de la tabla
        let fila = document.createElement("tr");
        //atributos que no existen
        fila.setAttribute("nombre",personaje.name);
        //nombre
        let celda = document.createElement("td");
        let textoCelda = document.createTextNode(personaje.name);
        celda.appendChild(textoCelda);
        fila.appendChild(celda);

        


        // //aprovecho la misma notacion especie
        celda = document.createElement("td");
        textoCelda = document.createTextNode(personaje.url);
        celda.appendChild(textoCelda);
        fila.appendChild(celda);

        // //aprovecho la misma notacion genero
        celda = document.createElement("td");
        textoCelda = document.createTextNode(personaje.gender);
        celda.appendChild(textoCelda);
        fila.appendChild(celda);
            
             //Para el peso
             celda = document.createElement("td");
             textoCelda = document.createTextNode(personaje.mass);
             celda.appendChild(textoCelda);
             fila.appendChild(celda);
                 
        //Para el color del ojos
        celda = document.createElement("td");
             textoCelda = document.createTextNode(personaje.eye_color);
             celda.appendChild(textoCelda);
             fila.appendChild(celda);

        //Para el cumpleaños
        celda = document.createElement("td");
             textoCelda = document.createTextNode(personaje.birth_year);
             celda.appendChild(textoCelda);
             fila.appendChild(celda);

        // agrega la fila al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(fila);
    }

    //Celdas para el thead
    //Para el thead

    let celda=document.createElement("td");
    let fila = document.createElement("tr");

    //Para añadir el nombre
    let textoCelda=document.createTextNode("nombre");
    celda.appendChild(textoCelda);
    fila.appendChild(celda);
    tblhead.appendChild(fila);

    //Para añadir el url
    textoCelda=document.createTextNode("URL");
    celda = document.createElement("td");
    celda.appendChild(textoCelda);
    fila.appendChild(celda);
    tblhead.appendChild(fila);

    //Para el genero
    textoCelda=document.createTextNode("Genero");
    celda = document.createElement("td");
    celda.appendChild(textoCelda);
    fila.appendChild(celda);
    tblhead.appendChild(fila);
    //Para el peso
    textoCelda=document.createTextNode("Peso");
    celda = document.createElement("td");
    celda.appendChild(textoCelda);
    fila.appendChild(celda);
    tblhead.appendChild(fila);

    //Para el color de ojos
    textoCelda=document.createTextNode("Color de Ojos");
    celda = document.createElement("td");
    celda.appendChild(textoCelda);
    fila.appendChild(celda);
    tblhead.appendChild(fila);

    //Para la especie
    textoCelda=document.createTextNode("Cumpleaños");
    celda = document.createElement("td");
    celda.appendChild(textoCelda);
    fila.appendChild(celda);
    tblhead.appendChild(fila);

    tabla.appendChild(tblhead);
    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    CapaPersonajes.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
}

function ResaltarPares(){

    let tabla=document.getElementById ("tablaPersonajes");
    if (tabla!=null && tabla!="undefined"){
        //filas= tabla.getElementsByTagName("tr");
        filas= tabla.querySelectorAll("tr");
        for (let i=2;i<filas.length;i+=2){
            filas[i].classList.add ("pares")
        }

    }
    else{
        alert ("no rp");
    }
}

function ResaltarTodo(){
    let tabla=document.getElementById ("tablaPersonajes");
    if (tabla!=null && tabla!="undefined"){
        //filas= tabla.getElementsByTagName("tr");
        filas= tabla.querySelectorAll("tr");
        for (let i=1;i<filas.length;i++){
            if (i%2==0) filas[i].classList.add ("pares");
            else filas[i].classList.add ("impares");
        }

    }
    else{
        alert ("no rt");
    }
}

function QuitarImpares(){
    let tabla=document.getElementById ("tablaPersonajes");

    if (tabla!=null && tabla!="undefined"){
        filas= tabla.querySelectorAll('tr' );
        
        console.log (filas);
        for (let i=0;i<filas.length;i++){
            if(filas[i].classList=="impares"){
                filas[i].classList.remove ("impares");

            }
            
        }
        // let padre=filas.parentElement;
        // padre.removeChild(filas[1]);

    }
    else{
        alert ("no impare");
    }


}

 function ResaltarImpares(){
    let tabla=document.getElementById ("tablaPersonajes");

    if (tabla!=null && tabla!="undefined"){
        //filas= tabla.getElementsByTagName("tr");
        filas= tabla.querySelectorAll("tr");
        for (let i=1;i<filas.length;i++){
            if (i%2!=0) filas[i].classList.add ("impares");       
         }

    }else{
            alert ("no resalto impare");
        }
 }

function QuitarTodo(){
    CapaPersonajes.innerHTML="";

}

function EliminarI(){
    let tabla=document.getElementById ("tablaPersonajes");

//     if (tabla!=null && tabla!="undefined"){
//         let filas=[];
//             for(let i=0;i < tabla.length; i++){
//                 filas[i]=tabla.childNodes;

//             }
        
//         console.log (filas);
       
//          tabla.removeChild(filas[1]);

//     }
//     else{
//         alert ("no impare");
//     }

//Segundo intento
filas=tabla.querySelectorAll("tr");
for (let i=0;i<filas.length;i++){
    celdas=filas[i].getElementsByTagName("td");
    if (celdas[i]%2!=0){
        papito=filas[i].parentNode;
        papito.removeChild(filas[i]);
    }
}

if (tabla!=null && tabla!="undefined"){
    filasTag=tabla.getElementsByTagName("tr");
    filas=tabla.querySelectorAll("tr");
    console.log (filasTag);
    console.log (filas);
    // array con query selector
    for (let i=0;i<filas.length;i++){
        celdas=filas[i].getElementsByTagName("td");
        celda=celdas[2];
        if (celda.hasChildNodes() && celda%2!=0){
            papito=filas[i].parentNode;
            papito.removeChild(filas[i]);
        }
    }
}
else{
    alert ("Y dice Yoda: NO Elimino impares");
}
}