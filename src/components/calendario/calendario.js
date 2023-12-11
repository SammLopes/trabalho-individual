import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

const Calendario = () => {
  const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const [desafios, setDesafios] = useState([]);
  const [diaSelected, setDia] = useState(null);

  useEffect(() => {
    const storageDesafios = JSON.parse(localStorage.getItem('desafios')) || [];
    setDesafios(storageDesafios);
  }, []);

  const getDiasMes = (ano, mes) => {
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const comecoDia = primeiroDia.getDay();
    const fimDia = ultimoDia.getDate();

    const dia = [];
    let semanaAtual = [];

    for (let i = 0; i < comecoDia; i++) {
      semanaAtual.push("");
    }

    for (let day = 1; day <= fimDia; day++) {
      const dataAtual = new Date(ano, mes, day);
      semanaAtual.push(
        `${ano}-${(mes + 1).toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`
      );
      if (semanaAtual.length === 7) {
        dia.push([...semanaAtual]);
        semanaAtual = [];
      }
    }

    if (semanaAtual.length > 0) {
      while (semanaAtual.length < 7) {
        semanaAtual.push("");
      }
      dia.push([...semanaAtual]);
    }

    return dia;
  }

  const anoAtual = new Date().getFullYear();
  const mesAtual = 10; // Coloque o número do mês desejado (0 a 11, sendo 0 janeiro e 11 dezembro)

  const [dataAtual, setDataAtual] = useState(new Date(anoAtual, mesAtual));

  const handleDayClick = (dia) => {
    setDia(dia);
  };

  return (
    <>
      <h1>Calendario de Novembro</h1>
      {desafios.length > 0 ? (
        <Table striped bordered hover variant="dark" className="custom-calendar">
          <thead>
            <tr>
              {diasDaSemana.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getDiasMes(dataAtual.getFullYear(), dataAtual.getMonth()).map((semana, index) => (
              <tr key={index}>
                {semana.map((dia, colIndex) => (
                  <td
                    key={colIndex}
                    onClick={() =>
                      handleDayClick(
                        `${dataAtual.getFullYear()}-${(dataAtual.getMonth() + 1).toString().padStart(2, "0")}-${dia.toString().padStart(2, "0")}`
                      )
                    }
                  >
                    <div>{dia}</div>
                    <div>
                      {dia !== '' &&
                        desafios.map((desafio, index) => {
                          const dataInicio = new Date(desafio.dataInicio);
                          const dataFim = new Date(desafio.dataFim);
                          const semanaDesafio = desafio.semana
                          const d = new Date(dia);
                          const isExitsDia = d >= dataInicio && d <= dataFim;
                          const isExitsSemana = diasDaSemana[colIndex] === semanaDesafio;
                          if (isExitsDia && isExitsSemana) {
                            return (
                              <div key={index}>
                                {desafio.desafio} - {desafio.horarioStart} - {desafio.horarioEnd} -
                                {desafio.professor} - {desafio.sala}
                              </div>
                            );
                          }
                          return null;
                        })
                      }
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className='info'>Nenhum dado disponível!!</p>
      )}
    </>
  )
}

export default Calendario;
