import React from 'react';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import CardCursos from './resumos/cardCurso.js'; 
import CardPeriodos from './resumos/cardPeriodos.js';
import CardProfessor from './resumos/cardProfessores.js';
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
        const getSalas = JSON.parse(localStorage.getItem('salas'));
        setSalas(getSalas);
        const getDesafios = JSON.parse(localStorage.getItem('desafios'));
        setDesafios(getDesafios)
      }, []);
    return(
        <>
            <div className='title'>
                <h1>Resumo de Cadastros</h1>
            </div>
            <div className='cards'>
                <div className='card-curso'>
                    <CardCursos cursos={cursos}/>
                </div>
                <div className='card-periodo'>
                    <CardPeriodos periodos={periodos}/>
                </div>
                <div className='card-professor'>
                    <CardProfessor professores={professores}/>
                </div>
                {
                /*
                <div className='card-sala'>
                    <CardProfessor salas={salas}/>
                </div>
                <div className='card-desafio'>
                    <CardProfessor desafios={desafios}/>
                </div>
                */
                }
            </div>
        </>
    );
}


export default Resumo;