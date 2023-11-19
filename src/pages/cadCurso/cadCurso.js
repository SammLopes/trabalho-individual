import Navigation from "../../components/navbar";
import Footer from "../../components/footer";
import FormularioCursos from '../../components/forms/formCursos.js';
import '../../assets/css/formGeral.css';
import '../../assets/css/tableGeral.css'
import '../../assets/css/footer.css'

const CadastroCursos = () => {
    
    
    return (
        <>
            <Navigation />
            <div className="form-comun">
                <FormularioCursos/>
            </div>
            <div className="footer">
                <Footer />      
            </div>
        </>
    )
}

export default CadastroCursos;