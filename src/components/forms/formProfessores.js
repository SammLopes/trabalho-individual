import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';

const FormularioProfessores = () => {
  const formRef = useRef(null);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [professores, setProfessores] = useState([]);
  const [novoProfessor, setNovoProfessor] = useState({
    nome:"",
    matricula:"", 
    telefone:"",
  });
  const [professorEditado, setProfessorEditado] = useState(null);
  const [editando, setEdit] = useState(false);
  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('professores')) || [];
    setProfessores(getLocalStorage);
  }, []);

  const setLocalStorage = (chave) => localStorage.setItem('professores', JSON.stringify(chave));

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
        for(let professor of professores){
          if(professor.matricula === novoProfessor.matricula){
            event.preventDefault();
            setShow(true);
            return;
          }
        }
        const updateProfessores = Array.isArray(professores) ? [...professores, { ...novoProfessor }] : [{ ...novoProfessor }];
        console.log(updateProfessores);
        setProfessores(updateProfessores);
        setLocalStorage(updateProfessores);
      }
      setValidated(true);
  };

  const camposPreenchidos = (index) => {
      const professoresEditar = professores[index];
      if (professoresEditar) {
         setProfessorEditado(professoresEditar);
         setNovoProfessor({
            nome: professoresEditar.nome, 
            matricula: professoresEditar.matricula, 
            telefone: professoresEditar.telefone
         });
         setEdit(true);
      } else {
         console.error("Professor não encontrado para o índice:", index);
      }    
  }

  const edit = (event) => {
    const form = formRef.current;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const professoresAtualizado = [...professores];
      professoresAtualizado[professores.indexOf(professorEditado)] = novoProfessor;
      setProfessores(professoresAtualizado);
      setProfessorEditado(null);
      setNovoProfessor({
        nome: "",
        matricula: "",
        telefone: "", 
      });
      setEdit(false);
      setLocalStorage(professoresAtualizado);
    }
  }

  const exitEdicao = () => {
    setProfessorEditado(null);
    setNovoProfessor({
      nome: "", 
      matricula: "",
      telefone: ""
    });
    setEdit(false);
  }

  const deletar = (index) => {
    const novosProfessores = professores.filter((professores, i) => i !== index);
    setProfessores(novosProfessores);
    setProfessorEditado(null);
    setNovoProfessor({
      nome: "", 
      matricula: "",
      telefone: ""
    });
    setEdit(false);
    setLocalStorage(novosProfessores);
  }

    return(
      <>
        <div className='form d-flex justify-content-center'>
          <Stack gap={2} className="col-md-5 mx-auto" >    
          <Form ref={formRef} className='div-form' noValidate validated={validated} onSubmit={handleSubmit}>
            <h1>Formulário de Cadastro de Professores</h1>
            <Row className="mb-4">
              <Form.Group as={Col} md="5" controlId="validationCustom01">
                <Form.Label>Nome do Professor</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nome do Professor"
                  value={novoProfessor.nome}
                  onChange={(e) => setNovoProfessor({...novoProfessor, nome:e.target.value})
                  }
                />
                <Form.Control.Feedback>Muito bom!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Digite o nome do Professor.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="5" controlId="validationCustom03">
                <Form.Label>Matricula</Form.Label>
                <Form.Control type="text" placeholder="Matricula" 
                  required  
                  value={novoProfessor.matricula}
                  onChange={(e) => setNovoProfessor({...novoProfessor, matricula:e.target.value})}
                />
                <Form.Control.Feedback>Muito bom!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Digite a Matricula.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="5" controlId="validationCustom03">
                <Form.Label>Telefone</Form.Label>
                <Form.Control type="text" placeholder="Telefone" 
                  required  
                  value={novoProfessor.telefone}
                  onChange={(e) => setNovoProfessor({...novoProfessor, telefone:e.target.value})}
                />
                <Form.Control.Feedback>Muito bom!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Digite o Telefone.
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
                ) : (
                  <Button type="submit">Adicionar</Button>
                )}
              </Form>
            </Stack>
          </div>
        
          <div>
            { professores.length > 0 ? (  
                <table className='tabelaGeral' /*variant="dark" bordered hover responsive striped*/  >
                  <thead>
                    <tr>
                      <th >Nome</th>
                      <th >Matricula</th>
                      <th >Telefone</th>
                      <th >Ação</th>
                    </tr>
                  </thead>
                  <tbody >
                    {professores.map((professores, index) => (
                      <tr key={index}>
                        <td >{professores.nome}</td>
                        <td >{professores.matricula}</td>
                        <td >{professores.telefone}</td>
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
          <Aviso text = "Professor ja cadastrado!"/>
        </>
    );
}

export default FormularioProfessores;