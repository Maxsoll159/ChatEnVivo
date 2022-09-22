import { useState } from "react"
import { Chat } from "./components/Chat"
import Socket from "./components/Socket"


export const Principal = () => {
    const [nombre, setNombre] = useState("")
    const [registrado, setRegistrado] = useState(false)

    const registrar = (e) => {
        e.preventDefault()
        if (nombre !== "") {
            setRegistrado(true)
        }
    }

    return (
        <div>
            {
                !registrado &&
                <form action="" onSubmit={registrar}>
                    <label htmlFor="">Introduzca su nombre</label>
                    <input value={nombre} onChange={e => setNombre(e.target.value)} type="text" />
                    <button>Ir a chat</button>
                </form>
            }
            {
                registrado &&
                <Chat nombre={nombre}/>
            }
        </div>
    )
}