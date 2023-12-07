import React, { useState, useEffect } from "react"; 
import Table from 'react-bootstrap/Table';


const Calendario = () => {
    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const [desafios, setDesafios] = useState([]);
    useEffect(() => {
      const storageDesafios =  JSON.parse(localStorage.getItem('desafios')) || [];
      setDesafios(storageDesafios);
      return() => {}
    }, []);

    

    const [dataAtual, setDataAtual] = useState(new Date());
    const [diaSelected, setDia] = useState(null);
    
    const handleDayClick = (dia) => {
      console.log("2");
      setDia(dia);
    };
    
      const events = {};
      const getDiasMes = (data) =>{
      
        const ano = data.getFullYear();
        const mes = data.getMonth();
        const primeiroDia = new Date(ano, mes, 1);
        const ultimoDia = new Date(ano, mes + 1, 0);
        const comecoDia = primeiroDia.getDay();
        const fimDia = ultimoDia.getDate();
    
        const dia = [];
        let semanaAtual = [];
    
        for (let i =0; i< comecoDia; i++) {
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

   
    console.log(desafios);
    return(
        <>
          <h1>Calendario de Novembro</h1>
          {desafios.length > 0 ?(
          <Table striped bordered hover variant="dark" className="custom-calendar">
            <thead>
              <tr>
              {diasDaSemana.map((day) => (
              <th key={day}>{day}</th>
            ))}
             </tr>
            </thead>
            <tbody>
              {getDiasMes(dataAtual).map((semana, index) => (
                
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
                    <div >{dia}</div>
                    <div >
                      {dia !== '' && // Verifica se o dia não está vazio
                      events[diasDaSemana[colIndex]] &&
                      events[diasDaSemana[colIndex]].map((desafios, index) => {
                        const dataInicio = new Date(desafios.dataInicio);
                        const dataFim = new Date(desafios.dataFim);
                        console.log(desafios.dataInicio);
                        console.log(desafios.dataFim);
                        // Verifica se o dia está dentro do intervalo de datas
                        if (dataAtual >= dataInicio && dataAtual <= dataFim) {
                          //{console.log(diasDaSemana[colIndex])}
                          //console.log("Passou");
                          return (
                            <div key={index}>
                              {desafios.desafio} - {desafios.horarioStart}- {desafios.horarioEnd} -
                              {desafios.professor} - {desafios.sala}
                            </div>
                          );
                        }
                    
                        return null; // Retorna null se o dia não estiver no intervalo de datas
                      })}
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