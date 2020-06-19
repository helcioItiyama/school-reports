import React from 'react';
import Action from './Action';

export default function GradesControl({grades, onDelete, onPersist}) {
  
  const tableGrades = [];
  let currentStudent = grades[0].student;
  let currentSubject = grades[0].subject;
  let currentGrades = [];
  let id = 1;

  console.log(tableGrades)
  
  grades.forEach((grade)   => {
    if(grade.subject !== currentSubject) {
      tableGrades.push({
        id: id++,
        student: currentStudent,
        subject: currentSubject,
        grades: currentGrades,
      })
      currentSubject = grade.subject;
      currentGrades = [];
    }

    if(grade.student !== currentStudent) {
      currentStudent = grade.student;
    }

    currentGrades.push(grade)
  });

  tableGrades.push({
    id: id++,
    student: currentStudent,
    subject: currentSubject,
    grades: currentGrades
  });

  const handleActionClick = (id, type) => {
    console.log(type)
    console.log(id)
  }

  return (
    <div>
      {tableGrades.map(({id, grades}) => (
        <table key={id}>
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Disciplina</th>
              <th>Avaliação</th>
              <th>Nota</th>
              <th>Ações</th>
            </tr>
          </thead>
          
          <tbody>
            {grades.map(({id, subject, student, type, value, isDeleted}) => {
              return (
                <tr key={id}>
                  <td>{student}</td>
                  <td>{subject}</td>
                  <td>{type}</td>
                  <td>{isDeleted ? '-' : value}</td>
                  <td>
                    <Action onActionClick={handleActionClick} id={id} type={isDeleted ? 'add' : 'edit'}/>
                    {!isDeleted && <Action onActionClick={handleActionClick} id={id} type={'deleted'}/>}
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ))}
    </div>
  )
}