import { useState, useEffect } from 'react';// useEffect es un callback? 
import Error from './Error'

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false)

    useEffect(() => {//aqui llenamos el formulario cuando se le da en editar basado en si el key del id esta vacio o no
        if( Object.keys(paciente).length > 0  ) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    }, [paciente])//se ejecuta solo cuando paciente cambia si se pas [] solo se ejecutara una vez 


    

    const generarId = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36)
        return random + fecha; //genera un id random de la suma de un numero ramdon y la fecha 
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación del Formulario
        if( [ nombre, propietario, email, fecha, sintomas ].includes('') ) {
            console.log('Hay Al Menos un campo vacio')

            setError(true)
            return;
        } 
        
        setError(false)


        // Objeto de Paciente
        const objetoPaciente = {
            nombre, 
            propietario, 
            email, 
            fecha, 
            sintomas
        }

        if(paciente.id) {
            // Editando el Registro
            objetoPaciente.id = paciente.id //en la linea de abajo se crea una variable temporal llamada pacienteState
            const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState )
            //tranquitronco, las actualizaciones son las que siempre requieren mas logica y paciencia

            setPacientes(pacientesActualizados)
            setPaciente({})
            console.log(pacientes);
        } else {
            // Nuevo registro
            objetoPaciente.id = generarId();
            setPacientes([...pacientes, objetoPaciente]);//a la copia de pacientes se le coloca el objetoPaciente?
            console.log(pacientes);
        }

        // Reiniciar el form
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')

    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold ">Administralos</span>
            </p>

            <form 
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
            >
                { error &&  <Error><p>Todos los campos son obligatorios</p></Error>}
                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
                        Nombre Mascota
                    </label>
                    <input
                        id="mascota"
                        type="text"
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={ (e) => setNombre(e.target.value) }
                    />  
                </div>

                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
                        Nombre Propietario
                    </label>
                    <input
                        id="propietario"
                        type="text"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={ (e) => setPropietario(e.target.value) }
                    />  
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email Contacto Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={ (e) => setEmail(e.target.value) }
                    />  
                </div>

                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
                        Alta
                    </label>
                    <input
                        id="alta"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={ (e) => setFecha(e.target.value) }
                    />  
                </div>

                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
                        Síntomas
                    </label>
                    <textarea 
                        id="sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Describe los Síntomas"
                        value={sintomas}
                        onChange={ (e) => setSintomas(e.target.value) }
                    />
                </div>

                <input
                    type="submit"//boton de enviar
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente' }//para cambiar el texto del submit en caso de que la id este vacia o no, es decir si se va a editar o no el paciente
                />
            </form>
        </div>
    )
}

export default Formulario
