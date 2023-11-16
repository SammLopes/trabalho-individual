import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import BotaoDel from '../button/buttonDel';
import BotaoEdit from '../button/buttonEdit';
import Table from 'react-bootstrap/Table'

const FormularioCursos = () => {
  
  const [validated, setValidated] = useState(false);
  const [cursos, setCursos] = useState([]);
  const [novoCurso, setNovoCurso] = useState({
    id: "",
    nome:"",
    coordenador:"", 
    data:"",
  });

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('cursos')) || [];
    setCursos(getLocalStorage);
  }, []);

  const setLocalStorage = (chave) => localStorage.setItem('cursos', JSON.stringify(chave));

  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return alert("Preencha todos os campos !!!");
    } 
        const updateCursos = Array.isArray(cursos) ? [...cursos, { ...novoCurso }] : [{ ...novoCurso }];
        console.log(updateCursos);
        setCursos(updateCursos);
        setLocalStorage(updateCursos);
        setValidated(true);
  };

  const edit = () => {
      console.log("Edit");
  }

  const deletar = () => {
    console.log("Deletar");
  }

  return (
    <>
    <div className='form d-flex justify-content-center'>
    <Stack gap={2} className="col-md-5 mx-auto" >    
    <Form className='div-form' noValidate validated={validated} onSubmit={handleSubmit}>
      <h1>Formulário de Cadastro de Curso</h1>
      <Row className="mb-4">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Nome do Curso</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nome do Curso"
            value={novoCurso.nome}
            onChange={(e) => setNovoCurso({...novoCurso, nome:e.target.value})
            }
          />
          <Form.Control.Feedback>Muito bom!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Digite o nome do Curso.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Nome Coordenador</Form.Label>
          <Form.Control type="text" placeholder="Nome Coordenador" 
          required  
           value={novoCurso.coordenador}
           onChange={(e) => setNovoCurso({...novoCurso, coordenador:e.target.value})}
          />
          <Form.Control.Feedback>Muito bom!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Digite o nome do Coordenador.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="5" controlId="validationCustom05">
          <Form.Label>Data Inicio</Form.Label>
          <Form.Control type="date"  
          required
          value={novoCurso.data}
          onChange={(e) => setNovoCurso({...novoCurso, data:e.target.value})}
          />
          <Form.Control.Feedback type="invalid">
            Escolha uma data
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Submit form</Button>
    </Form>
    </Stack>
    </div>

    <div className='div-tabelaCurso'>
      
      { cursos.length > 0 ? (  
          <table className='tabelaCurso' >
            <thead>
              <tr>
                <th >Id</th>
                <th >Nome</th>
                <th >Coordenador</th>
                <th >Data</th>
                <th >Ação</th>
              </tr>
            </thead>
            <tbody >
              {cursos.map((curso, index) => (
                <tr key={index}>
                  <td >{curso.id}</td>
                  <td >{curso.nome}</td>
                  <td >{curso.coordenador}</td>
                  <td >{curso.data}</td>
                  <td>
                    <BotaoEdit onClick={edit()}/>
                    <BotaoDel onClick={deletar()}/>    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )  : (
          <p className='info'>Nenhum dado disponível!!</p>
       )}   
    
    </div>
    </>
  );
}

export default FormularioCursos;