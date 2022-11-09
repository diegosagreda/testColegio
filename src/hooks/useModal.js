import  {useState} from 'react'

export  default function  useModal(estadoInicial){

    const [modal, setModal] = useState(estadoInicial);
    const abrirModal=()=>{
        setModal(true)        
    }
    const cerrarModal=()=>{
        setModal(false)
    }  

  return [modal, abrirModal, cerrarModal] 

}