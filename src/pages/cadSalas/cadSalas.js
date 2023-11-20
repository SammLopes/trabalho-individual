import Navigation from "../../components/navbar";
import Footer from "../../components/footer";
import FormularioSalas from "../../components/forms/formSalas.js";
const CadastroSalas = () => {
    return(
        <>
            <Navigation/>
            <div className="form-comun">
                <FormularioSalas/>
            </div>
            <Footer/>
        </>
    )
}

export default CadastroSalas;