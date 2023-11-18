import Navigation from "../../components/navbar";
import Footer from "../../components/footer";
import FormularioCursos from '../../components/forms/formCursos.js';
import '../../assets/css/formCurso.css';
import '../../assets/css/tableCurso.css'
import '../../assets/css/footer.css'

const CadastroCursos = () => {
    
    
    return (
        <>
            <Navigation />
            <div className="form-cursos">
                <FormularioCursos/>
            </div>
            <div className="footer">
                <Footer />      
            </div>
        </>
    )
}

export default CadastroCursos;