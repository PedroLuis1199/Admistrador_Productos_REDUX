import React from 'react'

import Swal from 'sweetalert2'


import { useNavigate } from "react-router-dom";

//redux
import { useDispatch } from 'react-redux'
import { borrarProductoActions, obtenerProductoEditar } from '../actions/productoActions'

const Producto = ({producto}) => {
const {nombre, precio, id} = producto

const dispatch = useDispatch()
//const history = useHistory()//habilitar history para redireccion
const navigate = useNavigate()


//confirmar si se desea eliminar el producto
const confirmarEliminarProducto = id => {


  //preguntar al usuario

  Swal.fire({
    title: '¿Estas seguro?',
    text: "Un producto que se eliminar no se puede recuperar!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {

      //pasarlo al action
      dispatch(borrarProductoActions(id))     
     
    }
  })


}
  //funcion que redirige de forma programada
  //dispatch(obtenerProductoEditar(producto))

  const redireccionarEdicion = producto => {
  dispatch(obtenerProductoEditar(producto))
  navigate(`/productos/editar/${producto.id}`)
  }
   


  return (
    <tr>
     <td>{producto.nombre}</td>
     <td><span className='font-weight-bold'>${producto.precio}</span></td>
     <td className='acciones'>
        <button type='button' onClick={() => redireccionarEdicion(producto) } className='btn btn-primary mr-2 '>Editar</button>
        <button onClick={() => confirmarEliminarProducto(id)} className='btn btn-danger' type='button' >Eliminar</button>
     </td>
    </tr>
  )
}

export default Producto
