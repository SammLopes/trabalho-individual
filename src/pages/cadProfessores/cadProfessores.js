import Navigation from "../../components/navbar";
import Footer from "../../components/footer";
import FormularioProfessores from "../../components/forms/formProfessores.js";
import '../../assets/css/formGeral.css';
import '../../assets/css/tableGeral.css';
const CadastroProfessores = () => {
    return(
        <>
            <Navigation/>
            <div className="form-comun">
                <FormularioProfessores />
            </div>
            <Footer/>
        </>
    )
}

export default CadastroProfessores;