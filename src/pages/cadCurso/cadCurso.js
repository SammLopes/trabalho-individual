import Navigation from "../../components/navbar";
import Footer from "../../components/footer";
import FormularioCursos from '../../components/forms/formCursos.js';
import '../../assets/css/formCurso.css';
import '../../assets/css/tableCurso.css'
import { useState } from "react";
const CadastroCursos = () => {
    
    
    return (
        <>
            <Navigation />
            <div className="form-cursos">
                <FormularioCursos/>
            </div>
            <Footer/>      
        </>
    )
}

export default CadastroCursos;