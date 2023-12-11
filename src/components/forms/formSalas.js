import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';

const FormularioSalas = () => {
  const formRef = useRef(null);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [salas, setSalas] = useState([]);
  const [novaSala, setNovaSala] = useState({
    andar: "",
    numero:"", 
    predio:"", 
    numeroCadeiras:""
  });
  const [salaEditado, setSalaEditado] = useState(null);
  const [editando, setEdit] = useState(false);
  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('salas')) || [];
    setSalas(getLocalStorage);
  }, []);

  const setLocalStorage = (chave) => localStorage.setItem('salas', JSON.stringify(chave));

  const handleClose = () => setShow(false);
  const Aviso = (text)=>{
    return (
      <>
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>Aviso</Modal.Title>
          </Modal.Header>
          <Modal.Body>{text.text}</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
        for(let sala of salas ){
          if(sala.andar === novaSala.andar && sala.numero === novaSala.numero){
            event.preventDefault();
            setShow(true);
            return;
          }
        }
        const updateSalas = Array.isArray(salas) ? [...salas, { ...novaSala }] : [{ ...novaSala }];
        console.log(updateSalas);
        setSalas(updateSalas);
        setLocalStorage(updateSalas);
      }
      setValidated(true);
  };


  const camposPreenchidos = (index) => {
      const salaEditar = salas[index];
      if (salaEditar) {
         setSalaEditado(salaEditar);
         setNovaSala({
            andar: salaEditar.andar, 
            numero: salaEditar.numero, 
            predio: salaEditar.predio,
            numeroCadeiras: salaEditar.numeroCadeiras
         });
         setEdit(true);
      } else {
         console.error("Sala não encontrado para o índice:", index);
      }
       
  }

  const edit = (event) => {
   
    const form = formRef.current;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const salasAtualizado = [...salas];
      salasAtualizado[salas.indexOf(salaEditado)] = novaSala;
      setSalas(salasAtualizado);
      setSalaEditado(null);
      setNovaSala({
        andar: "",
        numero:"", 
        predio:"", 
        numeroCadeiras:""
      });
      setEdit(false);
      setLocalStorage(salasAtualizado);
    }
  }

  const exitEdicao = () => {
    setSalaEditado(null);
    setNovaSala({
      andar: "",
      numero:"", 
      predio:"", 
      numeroCadeiras:""
    });
    setEdit(false);
  }

  const deletar = (index) => {
    const novasSalas = salas.filter((salas, i) => i !== index);
    setSalas(novasSalas);
    setSalaEditado(null);
    setNovaSala({
      andar: "",
      numero:"", 
      predio:"", 
      numeroCadeiras:""
    });
    setEdit(false);
    setLocalStorage(novasSalas);
  }

  return (
    <>
      <div className='form d-flex justify-content-center'>
        <Stack gap={2} className="col-md-5 mx-auto" >    
        <Form ref={formRef} className='div-form' noValidate validated={validated} onSubmit={handleSubmit}>
          <h1>Formulário de Cadastro de Salas</h1>
          <Row className="mb-4">
            <Form.Group as={Col} md="5" controlId="validationCustom01">
              <Form.Label>Andar</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Andar"
                value={novaSala.andar}
                onChange={(e) => setNovaSala({...novaSala, andar:e.target.value})
                }
              />
              <Form.Control.Feedback>Muito bom!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Digite o Andar.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="validationCustom03">
              <Form.Label>Predio</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Predio" 
                required  
                value={novaSala.predio}
                onChange={(e) => setNovaSala({...novaSala, predio: e.target.value})}
              />
              <Form.Control.Feedback>Muito bom!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Digite o Predio.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="5" controlId="validationCustom03">
              <Form.Label>Numero da Sala</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Numero da Sala" 
                required  
                value={novaSala.numero}
                onChange={(e) => setNovaSala({...novaSala, numero: e.target.value})}
              />
              <Form.Control.Feedback>Muito bom!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Digite o numero da sala.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="validationCustom05">
              <Form.Label>Numero de Cadeiras</Form.Label>
              <Form.Control 
                type="text"  
                placeholder='Numero de Cadeiras'
                required
                value={novaSala.numeroCadeiras}
                onChange={(e) => setNovaSala({...novaSala, numeroCadeiras:e.target.value})}
              />
              <Form.Control.Feedback>Muito bom!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Escolha o numero de Cadeiras
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          {editando ? (
            <>
            <div className='combo-botoes'>
              <Row className='mb-3' >
                <Button
                  type="button"
                  onClick={edit}
                  variant = "primary"
                  as={Col} md="3"
                >Confirmar Edição</Button>
              </Row>
              <Row >
                <Button
                  type = "button"
                  onClick={exitEdicao}
                  variant = "danger"
                  className='text-right'
                  as={Col} md="3"
                >Cancelar Edição</Button>
              </Row>
            </div>
            </>
          ): (

          <Button type="submit">Adicionar</Button>
          )}
        </Form>
        </Stack>
      </div>

      <div> 
        { salas.length > 0 ? (  
            <table className='tabelaGeral' >
              <thead>
                <tr>
                  <th >Andar</th>
                  <th >Numero</th>
                  <th >Predio</th>
                  <th >Numero de Cadeiras</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody >
                {salas.map((salas, index) => (
                  <tr key={index}>
                    <td >{salas.andar}</td>
                    <td >{salas.numero}</td>
                    <td >{salas.predio}</td>
                    <td >{salas.numeroCadeiras}</td>
                    <td>
                      <Button type="button" size="sm" onClick={() => camposPreenchidos(index)}  variant="secondary">Editar</Button>
                      <Button type="button" size="sm" variant="danger" onClick={() => deletar(index)}>Delete</Button> 
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )  : (
            <p className='info'>Nenhum dado disponível!!</p>
        )}   
      </div>
      <Aviso text = "Sala já está cadastrada neste andar !"/>
    </>
  );
}
export default FormularioSalas;