import Navigation from "../../components/navbar";
import Footer from "../../components/footer";
import Resumo from "../../components/resumo.js";
import '../../assets/css/resumo.css';
const Menu = () => {
    return (
        <>
            <Navigation />
            <div className="menu" >
                <Resumo/>
            </div>
            <div className="footer">
                <Footer />
            </div>
        </>
    )

};

export default Menu;