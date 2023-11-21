import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
//import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

const   FormularioDesafio = () => {
  const formRef = useRef(null);
  const diasDaSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
  const [validated, setValidated] = useState(false);
  const [desafios, setDesafios] = useState([]);
  const [salas, setSalas] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [professores, setProfessores]  = useState([]);
  const [novoDesafio, setNovoDesafio] = useState({
    desafio: "",
    periodo:"",
    professor:"", 
    dataInicio:"",
    dataFim:"",
    semana: "",
    horarioStart:"",
    horarioEnd:"",
    sala: ""
  });
  const [desafioEditado, setDesafioEditado] = useState(null);
  const [editando, setEdit] = useState(false);
  useEffect(() => {
    const storageSalas = JSON.parse(localStorage.getItem('salas')) || [];
    const storageProfessores =JSON.parse(localStorage.getItem('professores')) || [];
    const getLocalStorage = JSON.parse(localStorage.getItem('periodos')) || [];
    const storageDesafios = JSON.parse(localStorage.getItem('desafios')) || [];
    setDesafios(storageDesafios);
    setSalas(storageSalas);
    setProfessores(storageProfessores);
    setPeriodos(getLocalStorage);
  }, []);

  const setLocalStorage = (chave) => localStorage.setItem('desafios', JSON.stringify(chave));

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return  alert("Preencha todos os campos !!!");
    } else {
        const updateDesafios = Array.isArray(desafios) ? [...desafios, { ...novoDesafio }] : [{ ...novoDesafio }];
        console.log(updateDesafios);
        setPeriodos(updateDesafios);
        setLocalStorage(updateDesafios);
        setValidated(true);
    }
  };


  const camposPreenchidos = (index) => {
      const desafioEditar =desafios[index];
      if (desafioEditar) {
         setDesafioEditado(desafioEditar);
         setNovoDesafio({
          desafio: desafioEditar.desafio,
          periodo:desafioEditar.periodo,
          professor: desafioEditar.professor, 
          dataInicio:desafioEditar.dataInicio,
          dataFim:desafioEditar.dataFim,
          semana:desafioEditar.semana,
          horarioStart:desafioEditar.horarioStart,
          horarioEnd:desafioEditar.horarioEnd,
          sala: desafioEditar.sala
         });
         setEdit(true);
      } else {
        
         console.error("Desafio não encontrado para o índice:", index);
      }
       
  }

  const edit = (event) => {
   
    const form = formRef.current;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return  alert("Preencha todos os campos !!!");
    } else {
      const desafiosAtualizado = [...desafios];
      desafiosAtualizado[desafios.indexOf(desafioEditado)] = novoDesafio;
      setDesafios(desafiosAtualizado);
      setDesafioEditado(null);
      setNovoDesafio({
        desafio: "",
        periodo:"",
        professor:"", 
        dataInicio:"",
        dataFim:"",
        semana: "",
        horarioStart:"",
        horarioEnd:"",
        sala: ""
      });
      setEdit(false);
      //localStorage.setItem("professores", JSON.stringify(professoresAtualizado));
      setLocalStorage(desafiosAtualizado);
      console.log("Edit");
    }
  }

  const exitEdicao = () => {
    console.log("passei exitEdição");
    setDesafioEditado(null);
    setNovoDesafio({
      desafio: "",
      periodo:"",
      professor:"", 
      dataInicio:"",
      dataFim:"",
      semana: "",
      horarioStart:"",
      horarioEnd:"",
      sala: ""
    });
    setEdit(false);
  }

  const deletar = (index) => {
    console.log("passei deletar");
    const novosDesafios = desafios.filter((desafios, i) => i !== index);
    setDesafios(novosDesafios);
    setDesafioEditado(null);
    setNovoDesafio({
      desafio: "",
      periodo:"",
      professor:"", 
      dataInicio:"",
      dataFim:"",
      semana: "",
      horarioStart:"",
      horarioEnd:"",
      sala: ""
    });
    setEdit(false);
    //localStorage.setItem("periodos", JSON.stringify(novosPeriodos));  
    setLocalStorage(novosDesafios);
    console.log("Deletar");
  }
    return(
      <>
        <div className='form d-flex justify-content-center'>
    <Stack gap={2} className="col-md-5 mx-auto" >    
    <Form ref={formRef} className='div-form' noValidate validated={validated} onSubmit={handleSubmit}>
      <h1>Formulário de Cadastro de Desafios(Matéria)</h1>
      <Row className="mb-4">
      <Form.Group as={Col} md="5" controlId="validationCustom03">
          <Form.Label>Desafio</Form.Label>
          <Form.Control type="text" placeholder="Desafio" 
          required  
           value={novoDesafio.desafio}
           onChange={(e) => setNovoDesafio({...novoDesafio, desafio:e.target.value})}
          />
          <Form.Control.Feedback>Muito bom!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Digite o Nome do Desafio.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Período</Form.Label>
          <Form.Select type="text" placeholder="Período" 
          required  
           value={novoDesafio.periodo}
           onChange={(e) => setNovoDesafio({...novoDesafio, periodo:e.target.value})}
          >
          <option value="">Período</option>
          {periodos.map((periodos, index) => (
              <option key={index} value={periodos.numeroPeriodo}>
                {periodos.numeroPeriodo}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback>Muito bom!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Escolha o Periodo.
          </Form.Control.Feedback>
        </Form.Group>        
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="5" controlId="validationCustom03">
          <Form.Label>Professores</Form.Label>
          <Form.Select
            value={novoDesafio.professor}
            onChange={(e) => {setNovoDesafio({...novoDesafio, professor:e.target.value})}}
            >
            <option value="">Professores</option>
            {professores.map((professores, index) => (
              <option key={index} value={professores.nome}>
                {professores.nome}
              </option>
            ))}
        </Form.Select>
          <Form.Control.Feedback>Muito bom!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Escolha o Periodo.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="5" controlId="validationCustom03">
          <Form.Label>Sala</Form.Label>
          <Form.Select
            value={novoDesafio.sala}
            onChange={(e) => {setNovoDesafio({...novoDesafio, sala:e.target.value})}}
            >
            <option value="">Salas</option>
            {salas.map((salas, index) => (
              <option key={index} value={salas.numero}>
                {salas.numero}
              </option>
            ))}
        </Form.Select>
          <Form.Control.Feedback>Muito bom!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Escolha o Periodo.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="5" controlId="validationCustom03">
          <Form.Label>Data de Inicio</Form.Label>
          <Form.Control type="date" placeholder="Data Inicio" 
          required  
           value={novoDesafio.dataInicio}
           onChange={(e) => setNovoDesafio({...novoDesafio, dataInicio:e.target.value})}
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
              value={novoDesafio.dataFim}
              onChange={(e) => setNovoDesafio({...novoDesafio, dataFim:e.target.value})}
            />
            <Form.Control.Feedback>Muito bom!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Escolha a data.
            </Form.Control.Feedback>
          </Form.Group>
      </Row>
      <Row className='mb-3'>
        <Form.Group as={Col} md="5" controlId="validationCustom03">
          <Form.Label>Dia da Semana</Form.Label>
            <Form.Select
            value={novoDesafio.semana}
            onChange={(e) => {setNovoDesafio({...novoDesafio, semana:e.target.value})}}
            >
            <option value="">Semana</option>
           {diasDaSemana.map((dia, index) => (
              <option key={index} value={dia}>
                {dia}
              </option>
           ))}
        </Form.Select>
        <Form.Control.Feedback>Muito bom!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Selecione dias da Semana.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="5" controlId="validationCustom03">
          <Form.Label>Horario Começo</Form.Label>
            <Form.Control
            type="time"
            value={novoDesafio.horarioStart}
            onChange={(e) => {setNovoDesafio({...novoDesafio, horarioStart:e.target.value})}}
            />
            
        <Form.Control.Feedback>Muito bom!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Selecione as Horas.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className='mb-3'>
        <Form.Group as={Col} md="5" controlId="validationCustom03">
        <Form.Label>Horario Começo</Form.Label>
        <Form.Control
              type="time"
              value={novoDesafio.horarioEnd}
              onChange={(e) => {setNovoDesafio({...novoDesafio, horarioEnd:e.target.value})}}
              />
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
      {console.log(desafios)}
      {desafios.length > 0 ? (  
          <table className='tabelaGeral' >
            <thead>
              <tr>
                <th >Desafio</th>
                <th >Periodos</th>
                <th >Professores</th>
                <th >Data de Inicio</th>
                <th >Data de Fim</th>
                <th >Dia Semana</th>
                <th >Horario Inicio</th>
                <th >Horario Fim</th>
                <th >Sala</th>
                <th >Ação</th>
              </tr>
            </thead>
            <tbody >
              {desafios.map((desafios, index) => (
                <tr key={index}>
                  <td >{desafios.desafio}</td>
                  <td >{desafios.periodo}</td>
                  <td >{desafios.professor}</td>
                  <td >{desafios.dataInicio}</td>
                  <td >{desafios.dataFim}</td>
                  <td >{desafios.semana}</td>
                  <td >{desafios.horarioStart}</td>
                  <td >{desafios.horarioEnd}</td>
                  <td >{desafios.sala}</td>
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

export default FormularioDesafio;