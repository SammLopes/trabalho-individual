import Navigation from "../../components/navbar";
import Footer from "../../components/footer";
import Resumo from "../../components/resumo.js";
import '../../assets/css/resumo.css';
import '../../assets/css/formGeral.css';
const Menu = () => {
    return (
        <>
            <Navigation />
            <div className="resumo" >
                <Resumo/>
            </div>
            <div className="footer">
                <Footer />
            </div>
        </>
    )

};

export default Menu;