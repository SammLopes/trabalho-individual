import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
const Navigation = () => {
   
    return(
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark" >
      <Container>
        <Navbar.Brand as={Link} to="/">Ensalamento</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" >
            <NavDropdown title="Cadastros" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/curso">
                  Cadastro de Cursos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/periodo">
                Cadastro de Período
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/professores">
                Cadastro de Professores
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/salas">
                Cadastro de Salas
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/desafio">
                Cadastro de Desafios
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/calendario">
                Calendário de Horarios
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;