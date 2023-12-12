import React from 'react';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardCursos from './resumos/cardCurso.js'; 
import CardPeriodos from './resumos/cardPeriodos.js';
import CardProfessor from './resumos/cardProfessores.js';
import CardDesafios from './resumos/cardDesafios.js';
import CardSalas from './resumos/cardSalas.js';

const Resumo = () => {

    const [cursos, setCursos] = useState([]);
    const [periodos, setPeriodos] = useState([]);
    const [professores, setProfesores] = useState([]);
    const [salas, setSalas] = useState([]);
    const [desafios, setDesafios] = useState([]);
    useEffect(() => {
        const getCursos = JSON.parse(localStorage.getItem('cursos')) || [];
        setCursos(getCursos);
        const getPeriodos = JSON.parse(localStorage.getItem('periodos')) || [];
        setPeriodos(getPeriodos);
        const getProfessores = JSON.parse(localStorage.getItem('professores'))|| [];
        setProfesores(getProfessores);
        const getSalas = JSON.parse(localStorage.getItem('salas'))||[];
        setSalas(getSalas);
        const getDesafios = JSON.parse(localStorage.getItem('desafios'))||[];
        setDesafios(getDesafios)
      }, []);
    return(
        <>
            <div className='title'>
                <h1>Resumo de Cadastros</h1>
            </div>
            <div >
                <div className='cards'>
                <Row>
                    <Col>
                        <CardCursos cursos={cursos}/>
                    </Col>
                    <Col>
                        <CardPeriodos periodos={periodos}/>
                    </Col>
                    <Col>
                        <CardProfessor professores={professores}/>
                    </Col>
                    <Col style={{  marginBottom: '20px' }}>
                        <CardSalas salas={salas}/>
                    </Col>
                    <Col style={{ marginTop: '20px', marginBottom: '30px' }}>
                        <CardDesafios desafios={desafios}/>
                    </Col>
                </Row>
                </div>
            </div>
        </>
    );
}


export default Resumo;