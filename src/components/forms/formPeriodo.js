import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';

const FormularioPeriodo = () => {
  const formRef = useRef(null);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [cursos, setCursos] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [novoPeriodo, setNovoPeriodo] = useState({
    numeroPeriodo:"",
    semestre:"", 
    dataInicio:"",
    dataFim:"",
    turno:"",
    cursoPeriodo: ""
  });
  const [periodoEditado, setPeriodoEditado] = useState(null);
  const [editando, setEdit] = useState(false);
  useEffect(() => {
    const storageCursos =JSON.parse(localStorage.getItem('cursos')) || [];
    const getLocalStorage = JSON.parse(localStorage.getItem('periodos')) || [];
    setCursos(storageCursos);
    setPeriodos(getLocalStorage);
  }, []);

  const setLocalStorage = (chave) => localStorage.setItem('periodos', JSON.stringify(chave));

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
      for(let periodo of periodos){
        if(periodo.numeroPeriodo === novoPeriodo.numeroPeriodo && 
          periodo.semestre === novoPeriodo.semestre &&
          periodo.turno === novoPeriodo.turno){
          event.preventDefault();
          setShow(true);
          return;
        }
      }
        const updatePeriodos = Array.isArray(periodos) ? [...periodos, { ...novoPeriodo }] : [{ ...novoPeriodo }];
        console.log(updatePeriodos);
        setPeriodos(updatePeriodos);
        setLocalStorage(updatePeriodos);
      }
      setValidated(true);
    };


  const camposPreenchidos = (index) => {
      const periodoEditar = periodos[index];
      if (periodoEditar) {
         setPeriodoEditado(periodoEditar);
         setNovoPeriodo({
          numeroPeriodo:periodoEditar.numeroPeriodo,
          semestre:periodoEditar.semestre, 
          dataInicio:periodoEditar.dataInicio,
          dataFim:periodoEditar.dataFim,
          turno:periodoEditar.turno,
          cursoPeriodo: periodoEditar.cursoPeriodo
         });
         setEdit(true);
      } else {    
         console.error("Periodo não encontrado para o índice:", index);
      }  
  }

  const edit = (event) => {
    const form = formRef.current;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const periodosAtualizado = [...periodos];
      periodosAtualizado[periodos.indexOf(periodoEditado)] = novoPeriodo;
      setPeriodos(periodosAtualizado);
      setPeriodoEditado(null);
      setNovoPeriodo({
        numeroPeriodo:"",
        semestre:"", 
        dataInicio:"",
        dataFim:"",
        turno:"",
        cursoPeriodo: ""
      });
      setEdit(false);
      setLocalStorage(periodosAtualizado);
    }
  }

  const exitEdicao = () => {
    setPeriodoEditado(null);
    setNovoPeriodo({
      numeroPeriodo:"",
      semestre:"", 
      dataInicio:"",
      dataFim:"",
      turno:"",
      cursoPeriodo: ""
    });
    setEdit(false);
  }

  const deletar = (index) => {
    const novosPeriodos = periodos.filter((periodos, i) => i !== index);
    setPeriodos(novosPeriodos);
    setPeriodoEditado(null);
    setNovoPeriodo({
      numeroPeriodo:"",
      semestre:"", 
      dataInicio:"",
      dataFim:"",
      turno:"",
      cursoPeriodo: ""
    });
    setEdit(false);  
    setLocalStorage(novosPeriodos);
  }

    return(
      <>
        <div className='form d-flex justify-content-center'>
          <Stack gap={2} className="col-md-5 mx-auto" >    
          <Form ref={formRef} className='div-form' noValidate validated={validated} onSubmit={handleSubmit}>
            <h1>Formulário de Cadastro de Periodo</h1>
            <Row className="mb-4">
            <Form.Group as={Col} md="5" controlId="validationCustom03">
                <Form.Label>Periodo</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Periodo" 
                  required  
                  value={novoPeriodo.numeroPeriodo}
                  onChange={(e) => setNovoPeriodo({...novoPeriodo, numeroPeriodo:e.target.value})}
                />
                <Form.Control.Feedback>Muito bom!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Digite o periodo.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Semestre/Ano</Form.Label>
                <Form.Select  
                  required  
                  value={novoPeriodo.semestre}
                  onChange={(e) => setNovoPeriodo({...novoPeriodo, semestre:e.target.value})}
                >
                  <option value="">Semestre/Ano</option>
                  <option value="1/2023">1/2023</option>
                  <option value="2/2023">2/2023</option>
                </Form.Select>
                <Form.Control.Feedback>Muito bom!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Digite o semestre.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="5" controlId="validationCustom03">
                <Form.Label>Data de Inicio</Form.Label>
                <Form.Control 
                  type="date" 
                  placeholder="Data Inicio" 
                  required  
                  value={novoPeriodo.dataInicio}
                  onChange={(e) => setNovoPeriodo({...novoPeriodo, dataInicio:e.target.value})}
                />
                <Form.Control.Feedback>Muito bom!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Escolha a data.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="5" controlId="validationCustom03">
                  <Form.Label>Data de Fim</Form.Label>
                  <Form.Control 
                    type="date" 
                    placeholder="Data Fim" 
                    required  
                    value={novoPeriodo.dataFim}
                    onChange={(e) => setNovoPeriodo({...novoPeriodo, dataFim:e.target.value})}
                  />
                  <Form.Control.Feedback>Muito bom!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Escolha a data.
                  </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className='mb-3'>
              <Form.Group as={Col} md="5" controlId="validationCustom03">
                <Form.Label>Turno</Form.Label>
                  <Form.Select
                    required
                    value={novoPeriodo.turno}
                    onChange={(e) => {setNovoPeriodo({...novoPeriodo, turno:e.target.value})}}
                  >
                  <option value="">Turnos</option>
                  <option value="matutino">Matutino</option>
                  <option value="vespertino">Vespertino</option>
                  <option value="noturno">Noturno</option>
                </Form.Select>
                <Form.Control.Feedback>Muito bom!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Selecione Turno.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="5" controlId="validationCustom03">
                <Form.Label>Cursos</Form.Label>
                  <Form.Select
                    required
                    value={novoPeriodo.cursoPeriodo}
                    onChange={(e) => {setNovoPeriodo({...novoPeriodo, cursoPeriodo:e.target.value})}}
                  >
                  <option value="">Cursos</option>
                  {cursos.map((cursos, index) => (
                    <option key={index} value={cursos.nome}>
                      {cursos.nome}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback>Muito bom!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Selecione Cursos.
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
          { periodos.length > 0 ? (  
              <table className='tabelaGeral' >
                <thead>
                  <tr>
                    <th >Nemero de Periodos</th>
                    <th >Semestre/Ano</th>
                    <th >Data de Inicio</th>
                    <th >Data de Fim</th>
                    <th >Turno</th>
                    <th >Curso</th>
                    <th >Ação</th>
                  </tr>
                </thead>
                <tbody >
                  {periodos.map((periodos, index) => (
                    <tr key={index}>
                      <td >{periodos.numeroPeriodo}</td>
                      <td >{periodos.semestre}</td>
                      <td >{periodos.dataInicio}</td>
                      <td >{periodos.dataFim}</td>
                      <td >{periodos.turno}</td>
                      <td >{periodos.cursoPeriodo}</td>
                      <td>
                        <Button  onClick={() => camposPreenchidos(index)}  variant="secondary">Editar</Button>
                        <Button type="button" variant="danger" onClick={() => deletar(index)}>Delete</Button> 
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )  : (
              <p className='info'>Nenhum dado disponível!!</p>
          )}    
        </div>
        <Aviso text = "Periodo já cadastrado"/>
    </>
    );
}

export default FormularioPeriodo;