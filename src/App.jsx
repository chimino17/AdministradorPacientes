import { useState, useEffect } from 'react'
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {

  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  useEffect(() => {//primer useEffect en ejecutarse (los useEffect se ejecutan por orden decendente)
    const obtenerLS = () => {//obtenerLS ---> obtener loca storage
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];//si no hay nada en local storage se agrega un arreglo vacio
      setPacientes(pacientesLS)// JSON.pars para almacenarlo como un arreglo
    }
    obtenerLS();
  }, []);//para ejecutarse una sola vez

  useEffect(() => {//para guardarlo en un Json y en loca storage
    localStorage.setItem('pacientes', JSON.stringify( pacientes ));// localStorage hace que se guarde en el local storage del navegador
  }, [pacientes])

  const eliminarPaciente = id => {
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id);
    setPacientes(pacientesActualizados)
  }

  return (
    <div className="container mx-auto mt-20">
      <Header />

      <div className="mt-12 md:flex">
          <Formulario 
            pacientes={pacientes}
            setPacientes={setPacientes}
            paciente={paciente}
            setPaciente={setPaciente}
          />
          <ListadoPacientes 
            pacientes={pacientes}
            setPaciente={setPaciente}
            eliminarPaciente={eliminarPaciente}
          />
      </div>

    </div>
  )
}

export default App


//notas finales netlify y vercel son los mejores para subir los proyectos (video 88 del curso)
//para aprender git el vato juan recomienda Bitbucket
 