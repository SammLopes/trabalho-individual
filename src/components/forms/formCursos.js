import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

const FormularioCursos = () => {

  const formRef = useRef(null);

  const [validated, setValidated] = useState(false);
  const [cursos, setCursos] = useState([]);
  const [novoCurso, setNovoCurso] = useState({
    nome:"",
    coordenador:"", 
    data:"",
  });
  const [cursoEditado, setCursoEditado] = useState(null);
  const [editando, setEdit] = useState(false);
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
      return  alert("Preencha todos os campos !!!");
    } else {
        const updateCursos = Array.isArray(cursos) ? [...cursos, { ...novoCurso }] : [{ ...novoCurso }];
        console.log(updateCursos);
        setCursos(updateCursos);
        setLocalStorage(updateCursos);
        setValidated(true);
    }
  };


  const camposPreenchidos = (index) => {
      const cursoEditar = cursos[index];
      if (cursoEditar) {
         setCursoEditado(cursoEditar);
         setNovoCurso({
            nome: cursoEditar.nome, 
            coordenador: cursoEditar.coordenador, 
            data: cursoEditar.data
         });
         setEdit(true);
      } else {
        
         console.error("Curso não encontrado para o índice:", index);
      }
       
  }

  const edit = (event) => {
   
    const form = formRef.current;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return  alert("Preencha todos os campos !!!");
    } else {
      for(let curso of cursos){
        if(curso.nome === novoCurso.nome){
          alert("Ja existe este curso cadastrado");
          return;
        }
      }
      const cursosAtualizado = [...cursos];
      cursosAtualizado[cursos.indexOf(cursoEditado)] = novoCurso;
      setCursos(cursosAtualizado);
      setCursoEditado(null);
      setNovoCurso({
        nome: "",
        coordenador: " ",
        data: "", 
      });
      setEdit(false);
      localStorage.setItem("cursos", JSON.stringify(cursosAtualizado));
      console.log("Edit");
    }
  }

  const exitEdicao = () => {
    console.log("passei exitEdição");
    setCursoEditado(null);
    setNovoCurso({
      nome: "", 
      coordenador: "",
      data: ""
    });
    setEdit(false);
  }

  const deletar = (index) => {
    console.log("passei deletar");
    const novosCursos = cursos.filter((cursos, i) => i !== index);
    setCursos(novosCursos);
    setCursoEditado(null);
    setNovoCurso({
      nome: "", 
      coordenador: "",
      data: ""
    });
    setEdit(false);
    localStorage.setItem("cursos", JSON.stringify(novosCursos));
    console.log("Deletar");
  }

  return (
    <>
    <div className='form d-flex justify-content-center'>
    <Stack gap={2} className="col-md-5 mx-auto" >    
    <Form ref={formRef} className='div-form' noValidate validated={validated} onSubmit={handleSubmit}>
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

    <div >
      
      { cursos.length > 0 ? (  
          <table className='tabelaGeral' >
            <thead>
              <tr>
                <th >Nome</th>
                <th >Coordenador</th>
                <th >Data</th>
                <th >Ação</th>
              </tr>
            </thead>
            <tbody >
              {cursos.map((curso, index) => (
                <tr key={index}>
                  <td >{curso.nome}</td>
                  <td >{curso.coordenador}</td>
                  <td >{curso.data}</td>
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

export default FormularioCursos;