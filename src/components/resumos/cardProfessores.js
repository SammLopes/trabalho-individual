import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'; 
import Button from 'react-bootstrap/Button';

const ResumoProfessores = ({ professores }) => {

    const size = professores ? professores.length  : 0 ;
    return (
      <div >
        <Card style={{ width: '18rem', color:'white'}}  bg="dark">
            <Card.Img variant="top"  src='/icons/favicons/android-chrome-192x192.png' className="img-fluid" style={{ maxWidth: '100%', maxHeight: '250px', marginTop:'10px' }} />
            <Card.Body>
                <Card.Title>Professores</Card.Title>
                <Card.Text>Quantidade de professores: {size}</Card.Text>
            </Card.Body>
            <Card.Body>
                <Button size="sm" as={Link} to="/professores">Cadastros de Professores</Button>
            </Card.Body>
        </Card>

      </div>
    );
   }

   export default ResumoProfessores;