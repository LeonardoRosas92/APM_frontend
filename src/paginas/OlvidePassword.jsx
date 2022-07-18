import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'
const OlvidePassword = () => {
    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});
    const handleSubmit = async e => {
        e.preventDefault();
        if (email === '' ) {
            setAlerta({ msg: 'El Email es obligatorio', error: true });
            return;
        }
        try {
            const {data} = await clienteAxios.post('/doctores/olvide-password',{
                email: email
            });
            console.log(data);
            setAlerta({msg: data.msg, error: false})
        } catch (error) {
            setAlerta({msg: error.response.data.msg, error: true})
        }
    }
    const {msg} = alerta; 
    return (
        <Fragment>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl text-center">
                    Recupera tu Acceso y no Pierdas {""}
                    <span className="text-black">Tus Pacientes</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 rounded-xl py-1 bg-white">
                {msg && <Alerta alerta={alerta}></Alerta>}
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input
                            type="text"
                            placeholder="Tu Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)} className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
                    </div>
                    <input type="submit"
                        value="Recuperar password"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-lg text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
                    />
                </form>
                <nav className="mt-1 lg:flex lg:justify-between">
                    <Link to="/"
                        className="block text-center my-5 text-gray-500">
                        ¿Ya tienes una cuenta? Inicia Sesión
                    </Link>
                    <Link to="/registrar"
                        className="block text-center my-5 text-gray-500">
                        ¿No tienes una cuenta? Registrate
                    </Link>
                </nav>
            </div>
        </Fragment>
    )
}

export default OlvidePassword