import React, { Fragment } from 'react';
import usePacientes from '../hooks/usePacientes';
import Paciente from './Paciente';

function ListadoPaciente() {
    const { pacientes } = usePacientes();
    return (
        <Fragment>
            {
                pacientes.length ?
                    (
                        <Fragment>
                            <h2 className='font-black text-3xl text-center'>Listado Pacientes</h2>
                            <p className='text-xl mt-5 mb-10 text-center'>
                                Administra tus {''}
                                <span className='text-indigo-600 font-bold'>
                                    Pacientes y Citas
                                </span>
                            </p>
                            {
                                pacientes.map(paciente => (
                                    <Paciente
                                        key={paciente._id}
                                        paciente={paciente}
                                    />
                                ))
                            }
                        </Fragment>
                    )
                    :
                    (
                        <Fragment>
                            <h2 className='font-black text-3xl text-center'>No hay pacientes</h2>
                            <p className='text-xl mt-5 mb-10 text-center'>
                                Comienza agregando pacientes {''}
                                <span className='text-indigo-600 font-bold'>
                                    y apareceran aqui.
                                </span>
                            </p>
                        </Fragment>
                    )
            }
        </Fragment>
    )
}

export default ListadoPaciente