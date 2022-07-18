import { Fragment, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';
const ConfirmarCuenta = () => {
    const params = useParams();
    const { id } = params;
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState('');
    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `doctores/confirmar/${id}`;
                const { data } = await clienteAxios.get(url);
                setCuentaConfirmada(true)
                setAlerta({
                    msg: data.msg,
                    error: false
                })
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });
            }
            setCargando(false);
        }
        confirmarCuenta()
    }, [])

    return (
        <Fragment>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl text-center">
                    Confirma tu cuenta y Comienza a Administrar {""}
                    <span className="text-black">tus Pacientes</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 rounded-xl py-1 bg-white">
                {!cargando && <Alerta alerta={alerta}></Alerta>}
                {cuentaConfirmada && (<Link to="/"
                    className="block text-center my-5 text-gray-500">
                    Iniciar Sesión
                </Link>)}
            </div>
        </Fragment>
    )
}

export default ConfirmarCuenta