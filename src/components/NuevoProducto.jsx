import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux/es/exports'
import { useSelector } from 'react-redux/es/exports'
import { useNavigate } from 'react-router-dom'


//actions de redux
import { crearNuevoProductoAction } from '../actions/productoActions'
import { mostrarAlerta } from '../actions/alertaAction'
import { ocultarAlertaAction } from '../actions/alertaAction'

const NuevoProducto = ({history}) => {

  //state del componente
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState(0)

  //variable para navegacion y redireccion
  const navigate = useNavigate()
  

  //dispatch
  const dispatch = useDispatch()

  //acceder al state del store
  const cargando = useSelector(state => state.productos.loading)
  const error = useSelector(state => state.productos.error)
  const alerta = useSelector(state => state.alerta.alerta)

  //llamado al action de producto action
  const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto)) 

//cuando el usuario envie el producto ingresado
const submitNuevoProducto = e =>{
  e.preventDefault();

  //validar formulario
  if(nombre.trim() === '' || precio <= 0){

    const alerta = {
      msg: 'Ambos campos son obligatorios',
      classes: 'alert alert-danger text-center text-uppercase p-3'
    }
     dispatch(mostrarAlerta(alerta)) 

    return
  }

  //sino hay errores
  dispatch(ocultarAlertaAction()) 

  //crear el nuevo producto
  agregarProducto({nombre, precio})

  //redireccionar despues de agregar un producto
  navigate('/')
} 

  return (
    <div className='row justify-content-center'>
       <div className='col-md-8'>
          <div className='card'>
            <div className='card-body'>
              <h2 className='text-center mb-4 font-weight-bold'>Agregar Nuevo Producto</h2>

              {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}

              <form onSubmit={submitNuevoProducto}>

                <div className='form-group'>
                  <label htmlFor="">Nombre Producto</label>
                  <input type="text" name = 'nombre' value={nombre} onChange={e => setNombre(e.target.value)}
                  className='form-control' placeholder='Nombre del producto' />
                </div>

                <div className='form-group'>
                  <label htmlFor="">Precio Producto</label>
                  <input type="number" name = 'precio' value={precio} onChange={e => setPrecio(Number(e.target.value))}
                  className='form-control' placeholder='Precio del producto' />
                </div>

                <button type='submit' className=' btn btn-primary font-weight-bold text-uppercase d-block w-100'>Agregar</button>

              </form>

              {cargando ? <p>Cargandoo</p> : null}
              {error ? <p className='alert alert-danger p-2 mt-4 text-center'>Hubo un error</p> : null }

            </div>

          </div>

       </div>
    </div>
  )
}

export default NuevoProducto
