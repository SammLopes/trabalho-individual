import React from "react"; 


const Calendario = () => {
    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const horariosNovembro = [
        { dia: 'Segunda-feira', horario: '10:00 - 12:00', professor: 'Prof. Silva', sala: 'Sala 101' },
        { dia: 'Terça-feira', horario: '14:00 - 16:00', professor: 'Prof. Oliveira', sala: 'Sala 203' },
        // Adicione mais horários conforme necessário
      ];

    return(
        <>
     <div className="calendario-container">
      <h1>Calendário de Horários - Novembro</h1>
      <table className="calendario-table">
        <thead>
          <tr>
            <th>Dia</th>
            <th>Horário</th>
            <th>Professor</th>
            <th>Sala</th>
          </tr>
        </thead>
        <tbody>
          {diasDaSemana.map((dia, index) => (
            <tr key={index}>
              <td>{dia}</td>
              <td>{horariosNovembro.find(horario => horario.dia === dia)?.horario || '-'}</td>
              <td>{horariosNovembro.find(horario => horario.dia === dia)?.professor || '-'}</td>
              <td>{horariosNovembro.find(horario => horario.dia === dia)?.sala || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </>
    )
}