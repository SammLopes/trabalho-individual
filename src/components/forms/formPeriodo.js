import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
//import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

const FormularioPeriodo = () => {
  const formRef = useRef(null);

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

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return  alert("Preencha todos os campos !!!");
    } else {
        const updatePeriodos = Array.isArray(periodos) ? [...periodos, { ...novoPeriodo }] : [{ ...novoPeriodo }];
        console.log(updatePeriodos);
        setPeriodos(updatePeriodos);
        setLocalStorage(updatePeriodos);
        setValidated(true);
    }
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
      return  alert("Preencha todos os campos !!!");
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
      //localStorage.setItem("professores", JSON.stringify(professoresAtualizado));
      setLocalStorage(periodosAtualizado);
      console.log("Edit");
    }
  }

  const exitEdicao = () => {
    console.log("passei exitEdição");
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
    console.log("passei deletar");
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
    //localStorage.setItem("periodos", JSON.stringify(novosPeriodos));  
    setLocalStorage(novosPeriodos);
    console.log("Deletar");
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
          <Form.Control type="text" placeholder="Periodo" 
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
          <Form.Control type="text" placeholder="Semestre/Ano" 
          required  
           value={novoPeriodo.semestre}
           onChange={(e) => setNovoPeriodo({...novoPeriodo, semestre:e.target.value})}
          />
          <Form.Control.Feedback>Muito bom!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Digite o semestre.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="5" controlId="validationCustom03">
          <Form.Label>Data de Inicio</Form.Label>
          <Form.Control type="date" placeholder="Data Inicio" 
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
            <Form.Control type="date" placeholder="Data Fim" 
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
            value={novoPeriodo.cursoPeriodo}
            onChange={(e) => {setNovoPeriodo({...novoPeriodo, cursoPeriodo:e.target.value})}}
            >
            <option value="">Cursos</option>
            {cursos.map((cursos) => (
              <option key={cursos.id} value={cursos.nome}>
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
        
    <div >
      
      { periodos.length > 0 ? (  
          <table className='tabelaGeral' >
            <thead>
              <tr>
                <th >Nuemro de Periodos</th>
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
    </>
    );
}

export default FormularioPeriodo;