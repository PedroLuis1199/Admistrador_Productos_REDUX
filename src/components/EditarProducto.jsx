import React, { useState, useEffect } from 'react'
 import { useDispatch, useSelector } from 'react-redux'
 import { editarProductoAction } from '../actions/productoActions'
 import { useNavigate } from 'react-router-dom'

const EditarProducto = () => {

const dispatch = useDispatch()

const navigate = useNavigate()

  //nuevo state de productos
  const [producto, setProducto] = useState({
    nombre: '',
    precio: ''
  })

//producto a editar
const productoEditar = useSelector(state => state.productos.productoeditar)

//console.log(producto)

//llenar state automaticamente 
useEffect(()=> {
  setProducto(productoEditar)

}, [productoEditar])

//leer datos del formulario
const onChangeFormulario = e => {
      setProducto({
        ...producto,
        [e.target.name] : e.target.value
      })
}


  const submitEditarProducto = e => {
  e.preventDefault()
   dispatch(editarProductoAction(producto)) 
   navigate('/')
  }

  return (
    <div className='row justify-content-center'>
    <div className='col-md-8'>
       <div className='card'>
         <div className='card-body'>
           <h2 className='text-center mb-4 font-weight-bold'>Editar Producto</h2>

           <form onSubmit={submitEditarProducto}>

             <div className='form-group'>
               <label htmlFor="">Nombre Producto</label>
               <input type="text" value={producto.nombre} onChange={onChangeFormulario} name = 'nombre'className='form-control' placeholder='Nombre del producto' />
             </div>

             <div className='form-group'>
               <label htmlFor="">Precio Producto</label>
               <input type="number" value={producto.precio} onChange={onChangeFormulario}  name = 'precio'className='form-control' placeholder='Precio del producto' />
             </div>

             <button type='submit' className=' btn btn-primary font-weight-bold text-uppercase d-block w-100'>Guardar cambios</button>

           </form>

         </div>

       </div>

    </div>
 </div>
  )
}

export default EditarProducto
