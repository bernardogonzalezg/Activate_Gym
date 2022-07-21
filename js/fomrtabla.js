"use strict";

const url = "https://60da60aa5f7bf10017547aaf.mockapi.io/api/Inscriptos"
const fila = document.querySelector("#cuerpotabla");

async function obtenerdatos(){
    
    fila.innerHTML = "";
    try {
        let res = await fetch (url);
        let json = await res.json();

        for (const i of json) {
           
            mostrarfila(i);
    }
    } catch (error) {
        console.log(error);
    }
}

async function enviar(e){
    e.preventDefault();
                        
    let apellido = document.querySelector("#apellido").value
    let nombre = document.querySelector("#nombre").value
    let edad = document.querySelector("#edad").value
        
    let inscriptos = {
        "apellido": apellido,
        "nombre": nombre,
        "edad": Number(edad)
    };

    try {
        let res = await fetch (url, {
        "method": "POST",
        "headers": {"Content-type":"application/json"},
        "body": JSON.stringify(inscriptos)
        });
        if(res.status === 201){
        document.querySelector("#respuesta").innerHTML = "inscripcion completada con exito."
        }
        } catch (error) {
        console.log(error);
        }
            
    obtenerdatos();
    
    document.getElementById("submit").reset();
}

async function borrar(e){
    e.preventDefault();

    let id = this.dataset.id;
    
    try {
       let res = await fetch (`${url}/${id}`, {
        "method" : "DELETE"
    });
    if(res.status === 200){
        document.querySelector("#respuesta").innerHTML = "borrado!"
    }
      
    } catch (error) {
        document.querySelector("#respuesta").innerHTML = "Error de conexion!"
    }
    obtenerdatos();
   
}

async function modificar(e){
    e.preventDefault();

    let id = this.dataset.id;

    let apellido = document.querySelector("#apellido").value
    let nombre = document.querySelector("#nombre").value
    let edad = document.querySelector("#edad").value
        
    let inscriptos = {
        "apellido": apellido,
        "nombre": nombre,
        "edad": Number(edad)
    };
   
    try {
        let res = await fetch (`${url}/${id}`, {
        "method": "PUT",
        "headers": {"Content-type":"application/json"},
        "body": JSON.stringify(inscriptos)
        });
        if(res.status === 200){
        document.querySelector("#respuesta").innerHTML = "Modificacion completada con exito."
        }
        } catch (error) {
        console.log(error);
        }

    obtenerdatos();
    
    document.getElementById("submit").reset();
}


async function filtro() {

    let input, filter;
    input = document.getElementById("filtro");
    filter = input.value.toUpperCase();

    try {        
        let res = await fetch (url);
        if (res.status == 200){
            let json = await res.json();
            for (const i of json) {
               
                if(filter == i.apellido.toUpperCase()){
                    
                    fila.innerHTML =   `<tr> 
                                        <td> ${i.apellido} </td>
                                        <td> ${i.nombre} </td>
                                        <td> ${i.edad} </td>
                                        <td> <button class="modificar" data-id=${i.id}>MODIFICAR</button></td>
                                        <td> <button class="eliminar" data-id=${i.id}>BORRAR</button></td>  
                                    </tr>`   
                                    
                                    document.querySelectorAll(".modificar").forEach((button) => {
                                        button.addEventListener("click", modificar);
                                    });
                                    document.querySelectorAll(".eliminar").forEach((button) => {
                                        button.addEventListener("click", borrar);
                                    });

                    document.querySelector("#respuesta").innerHTML = "Filtrado exitoso."    
                } 
                if (filter == "")   {
                    mostrarfila(i);
                }   
            }            
        }
    }catch (error) {
        console.log(error);
    } 
}



async function triplicar(){
    try {
        let res = await fetch (url);
        let json = await res.json();
        let primerdato = [json[0]];
        let segundodato = [json[1]];
        let tercerdato = [json[2]];
        console.log(primerdato);
        
        for (const i of primerdato) {
        
            mostrarfila(i);
            
        }

        for (const i of segundodato) {
        
            mostrarfila(i);
            
        }

        for (const i of tercerdato) {
        
            mostrarfila(i);
            
        }
      
        
    }catch (error) {
        console.log(error);
    } 
}


function mostrarfila(i){
    fila.innerHTML +=   `<tr> 
                                        <td> ${i.apellido} </td>
                                        <td> ${i.nombre} </td>
                                        <td> ${i.edad} </td>
                                        <td> <button class="modificar" data-id=${i.id}>MODIFICAR</button></td>
                                        <td> <button class="eliminar" data-id=${i.id}>BORRAR</button></td>  
                                    </tr>`   
                                    
                                    document.querySelectorAll(".modificar").forEach((button) => {
                                        button.addEventListener("click", modificar);
                                    });
                                    document.querySelectorAll(".eliminar").forEach((button) => {
                                        button.addEventListener("click", borrar);
                                    });
}

obtenerdatos();   
document.querySelector("#enviar").addEventListener("click",enviar);
document.querySelector("#btn-filtrar").addEventListener("click", filtro);
document.querySelector("#triplicar").addEventListener("click", triplicar);

