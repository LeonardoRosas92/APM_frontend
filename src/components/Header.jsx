import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Header = () => {
    const { cerrarSesion } = useAuth();
    return (
        <Fragment>
            <header className='py-10 bg-indigo-600'>
                <div className='container mx-auto flex flex-col lg:flex-row justify-between items-center'>
                    <h1 className='font-bold text-2xl text-indigo-200 text-center'>
                        Administrador de Pacientes de {''}
                        <span className='text-white font-black'>
                            Medicos
                        </span>
                    </h1>
                    <nav className='flex flex-col items-center lg:flex-row gap-4 mt-5 md:mt-0'>
                        <Link to="/admin" className='text-white text-xl'>Pacientes</Link>
                        <Link to="/admin/perfil" className='text-white text-xl'>Perfil</Link>
                        <button className='text-white text-xl' onClick={cerrarSesion}> Cerrar Sesión</button>
                    </nav>
                </div>
            </header> 
        </Fragment>

    )
}

export default Header