import { Fragment, useState, useEffect } from 'react';
import Alerta from '../components/Alerta';
import usePacientes from '../hooks/usePacientes';

function Formulario() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setfecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [id, setId] = useState(null);

    const [alerta, setAlerta] = useState({});

    const { guardarPaciente, paciente } = usePacientes();

    useEffect(() => {
        if (paciente?.nombre) {
            setNombre(paciente.nombre);
            setEmail(paciente.email);
            setfecha(new Date(paciente.fecha).toISOString());
            setSintomas(paciente.sintomas);
            setId(paciente._id);
        }
    },[paciente]);

    const handleSubmit = e => {
        e.preventDefault();
        console.log(nombre);
        if ([nombre, email, fecha, sintomas].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return;
        }
        guardarPaciente({nombre, email, fecha, sintomas, id});
        setAlerta({msg: 'Guardado correctamente'});
        setNombre('');
        setEmail('');
        setfecha('');
        setSintomas('');
        setId('');
    }
    const {msg} = alerta;
    return (
        
        <Fragment>
            <h2 className='font-black text-3xl text-center'>
                Administrador de pacientes
            </h2>
            <p className='text-xl mt-5 text-center mb-10'>
                Añade tus pacientes y {''}
                <span className='text-indigo-600 font-bold'>Administralos</span>
            </p>
            
            <form
                className='bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md'
                onSubmit={handleSubmit}
            >
                <div className='mb-5'>
                    <label 
                        htmlFor='nombre'
                        className='text-gray-700  uppercase font-bold'
                    >
                        Nombre Paciente
                    </label>
                    <input
                    id='nombre'
                    type='text'
                    placeholder='Nombre del paciente'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
                </div>
                <div className='mb-5'>
                    <label 
                        htmlFor='email'
                        className='text-gray-700  uppercase font-bold'
                    >
                        Email
                    </label>
                    <input
                    id='email'
                    type='email'
                    placeholder='Email del paciente'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                </div>
                <div className='mb-5'>
                    <label 
                        htmlFor='fecha'
                        className='text-gray-700  uppercase font-bold'
                    >
                        Fecha
                    </label>
                    <input
                    id='fecha'
                    type='date'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={fecha}
                    onChange={e => setfecha(e.target.value)}
                />
                </div>
                <div className='mb-5'>
                    <label 
                        htmlFor='sintomas'
                        className='text-gray-700  uppercase font-bold'
                    >
                        Sintomas
                    </label>
                    <textarea
                    id='sintomas'
                    placeholder='Describe los sintomas'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={sintomas}
                    onChange={e => setSintomas(e.target.value)}
                />
                </div>
                <input
                    type="submit"
                    className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors rounded-md'
                    value={id ? 'Guardar Cambios' : 'Agregar Pacientes'}
                />
            </form>
            {msg && <Alerta alerta={alerta}/>}
        </Fragment>
    )
}

export default Formulario;