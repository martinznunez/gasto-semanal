//variables
 let cantidadPresupuesto;
const presupuestoUsuario = prompt('cual es su presupuesto semanal?');
const formulario = document.getElementById('agregar-gasto');




//clases
//clase de presupuesto

class presupuesto{
    constructor (presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
    //metodo para ir restando del presupuesto
    presupuestoRestante (cantidad = 0){
        return this.restante -= Number(cantidad);

    }
}


class Interfaz{

    insertarPresupuesto(cantidad){

        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        //insertar al html
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }
    imprimirMensaje(mensaje,tipo){

        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if(divMensaje === 'error'){
            divMensaje.classList.add('alert-danger');
        }else {
            divMensaje.classList.add('alert-success');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        document.querySelector('.primario').insertBefore(divMensaje,formulario);

        //quitar el alert despues de 3 segundos
        setTimeout(function(){

            document.querySelector('.primario .alert').remove();
            formulario.reset();

        },3000);
    }
    //insertar los gastos a la lista
    agregarGastoListado (nombreGasto,cantidadGasto){

        const gastosListado = document.querySelector('#gastos ul');

        //crear un li
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        //insertar el gasto
        li.innerHTML = `
            ${nombreGasto}
            <span class= "badge badge-primary badge-pill"> ${cantidadGasto}</span>
        
        `;
    
        //insertar al html
        gastosListado.appendChild(li);
    }

    //
    presupuestoRestante(cantidadGasto){

        const restante = document.querySelector('span#restante');
        const presupuestoUsuario = cantidadPresupuesto.presupuestoRestante(cantidadGasto);
        
        restante.innerHTML = `${presupuestoUsuario}`;

        this.comprobarPresupuesto();
    }

    //comprobar presupuesto
    comprobarPresupuesto(){

        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        //comprobar el 25%
        if( (presupuestoTotal / 4) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success','alert-warning');
            restante.classList.add('alert-danger')
        } else if( (presupuestoTotal / 2)> presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning')
        }

    }
    
}



//addEventListener

document.addEventListener('DOMContentLoaded', function(){

    if(presupuestoUsuario === null || presupuestoUsuario === ''){
        window.location.reload();
    }else {
        cantidadPresupuesto = new presupuesto(presupuestoUsuario);

        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);

        
    }
    
});

formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    
    //leer del formulario de gastos
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;
    

    //instancia de interfaz
    const ui = new Interfaz();

    //comprobar que los campos no esten vacios
    if(nombreGasto === '' || cantidadGasto === ''){
        ui.imprimirMensaje('hubo un error', 'error');
        
    } else {

        //insertar en el html
        ui.imprimirMensaje('correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
            
    }

});