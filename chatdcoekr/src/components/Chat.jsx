import { useEffect, useState } from "react"
import Socket from "./Socket"

export const Chat = ({ nombre }) => {
    const [mensaje, setMensaje] = useState("")
    const [mensajes, setMensajes] = useState([])

    useEffect(() => {
        Socket.emit('conectado', nombre)
    }, [nombre])


    useEffect(() => {
        Socket.on('mensajes', mensaje => {
            setMensajes([...mensajes, mensaje]);
        })
        return () => { Socket.off() }
    }, [mensajes])

    const submit = (e) => {
        e.preventDefault();
        Socket.emit('mensaje', nombre, mensaje)
    }
    console.log(mensajes)
    return (
        <div>
            <div>
                {mensajes.map((e, index)=>(
                    <div key={index}>
                        <div>{e.nombre}</div>
                        <div>{e.mensaje}</div>
                    </div>
                ))}
            </div>


            <form onSubmit={submit}>
                <label htmlFor="">Escriba su mensaje</label>
                <textarea name="" id="" cols="30" rows="10" value={mensaje} onChange={e => setMensaje(e.target.value)}></textarea>
                <button>Enviar</button>
            </form>
        </div>

    )
}