import Navigation from "../../components/navbar";
import Footer from "../../components/footer";
import Calendario from "../../components/calendario/calendario.js";
import '../../assets/css/calendario.css';
const pageCalendario = () => {
    return(
        <>
            <Navigation/>
            <div className="form-comun">
                <Calendario/>
            </div>
            <Footer/>
        </>
    )
}

export default pageCalendario;