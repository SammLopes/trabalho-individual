import Navigation from "../../components/navbar";
import Footer from "../../components/footer";
import FormularioDesafios from "../../components/forms/formDesafio";
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