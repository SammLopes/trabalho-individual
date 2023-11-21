import Navigation from "../../components/navbar";
import Footer from "../../components/footer";
import FormularioDesafios from "../../components/forms/formDesafio";
import '../../assets/css/formGeral.css';
import '../../assets/css/tableGeral.css';
const CadastroDesafios = () => {
    return(
        <>
            <Navigation/>
            <div className="form-comun">
                <FormularioDesafios/>
            </div>
            <Footer/>
        </>
    )
}

export default CadastroDesafios;