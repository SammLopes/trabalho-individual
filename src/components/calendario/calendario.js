import React, { useState, useEffect } from "react"; 


const Calendario = () => {
    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const [desafios, setDesafios] = useState([]);
    const [semanaAtual, setSemanaAtual] = useState(diasDaSemana);
    useEffect(() => {
      const storageDesafios =  JSON.parse(localStorage.getItem('desafios')) || [];
      setDesafios(storageDesafios);
    }, []);

    function getSemana(date) {
      const firstDay = new Date(date.getFullYear(), 0, 1);
      const days = Math.floor((date - firstDay) / 86400000);
      return Math.ceil((days + firstDay.getDay() + 1) / 7);
    }


    // Filtra os desafios com base na semana atual
    const desafiosDaSemanaAtual = desafios.filter(desafio => desafio.semana === semanaAtual);
    console.log(desafiosgit );
    return(
        <>
          <h1>Calendario de Novembro</h1>
          <div className="calendario">
        {desafios.length > 0 ? (
          <div className="semana">
            {diasDaSemana.map((dia, index) => (
              <div key={index} className="dia">
                <div className="chead">{dia}</div>
                <div className="ccontent">
                  {/* Conteúdo do dia {dia} será gerado aqui dinamicamente */}
                  {desafiosDaSemanaAtual.map((desafio, desafioIndex) => (
                    <div key={desafioIndex} className="aula">
                      <span>{desafio.hora}|{desafio.sala}</span>
                      <span>{desafio.professor}</span>
                      <span>{desafio.materia}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
       ) : (
            <p className='info'>Nenhum dado disponível!!</p>
          )}
        </div>
    
           
        </>
    )
}

export default Calendario;