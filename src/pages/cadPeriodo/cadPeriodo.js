import Navigation from '../../components/navbar.js';
import Footer from '../../components/footer.js';
import FormularioPeriodo from '../../components/forms/formPeriodo.js';

const CadastroPeriodo = () => {
    return (
        <>
            <Navigation />
            <div className='form-comun'>
                <FormularioPeriodo/>
            </div>
            <Footer/>
        </>
    )   
}

export default CadastroPeriodo;