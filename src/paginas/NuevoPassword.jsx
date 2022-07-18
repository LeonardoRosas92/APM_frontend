import React, { Fragment, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';
const NuevoPassword = () => {
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState('');
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);
    const params = useParams();
    const { token } = params;

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/doctores/olvide-password/${token}`)
                setAlerta({ msg: 'Coloca tu nuevo password', error: false });
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: 'Hubo un error con el enlace', error: true
                });
            }
        }
        comprobarToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setAlerta({
                msg: 'El password es muy corto, agrega minimo 6 caracteres', error: true
            });
            return;
        }
        try {
            const url = `/doctores/olvide-password/${token}`;
            const { data } = await clienteAxios.post(url, {
                password: password
            });
            setPasswordModificado(true);
            console.log(data);
            setAlerta({
                msg: data.msg, error: false
            });
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg, error: true
            });
        }
    }
    const { msg } = alerta;

    return (
        <Fragment>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl text-center">
                    Reestablece tu password y no Pierdas Acceso a {""}
                    <span className="text-black">Tus Pacientes</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 rounded-xl py-1 bg-white">
                {msg && <Alerta alerta={alerta}></Alerta>}
                {tokenValido &&
                    <Fragment>
                        <form onSubmit={handleSubmit}>
                            <div className="my-5">
                                <label className="uppercase text-gray-600 block text-xl font-bold">Nuevo password</label>
                                <input type="password" placeholder="Tu Nuevo Password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <input type="submit"
                                value="Guardar Nuevo Password"
                                className="bg-indigo-700 w-full py-3 px-10 rounded-lg text-white uppercase font-bold mb-2 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                            />
                        </form>

                    </Fragment>

                }
                {passwordModificado && <Link to="/"
                    className="block text-center my-5 text-gray-500">
                    Iniciar Sesion
                </Link>}
            </div>
        </Fragment>
    )
}

export default NuevoPassword