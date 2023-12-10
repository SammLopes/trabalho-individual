import Navigation from "../../components/navbar";
import Footer from "../../components/footer";
import Index from "../../components/menu.js";
const Menu = () => {
    return (
        <>
                <Navigation />
            <div className="menu" >
                <div>Resumo de tudo</div>
            </div>
            <div className="footer">
                <Footer />
            </div>
        </>
    )

};

export default Menu ;