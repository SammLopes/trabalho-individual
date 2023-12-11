import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'; 
import Button from 'react-bootstrap/Button';

const ResumoSalas = ({ salas }) => {

    const size = salas.length;
    return (
      <div >
        <Card style={{ width: '18rem', color:'white'}}  bg="dark">
            <Card.Img variant="top"  src='/icons/favicons/android-chrome-192x192.png' className="img-fluid" style={{ maxWidth: '100%', maxHeight: '250px', marginTop:'10px' }} />
            <Card.Body>
                <Card.Title>Salas</Card.Title>
                <Card.Text>Quantidade de sala: {size}</Card.Text>
            </Card.Body>
            <Card.Body>
                <Button size="sm" as={Link} to="/sala">Cadastros de sala</Button>
            </Card.Body>
        </Card>

      </div>
    );
   }

   export default ResumoSalas;