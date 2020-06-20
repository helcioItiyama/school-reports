import React from 'react';
import Action from './Action';

export default function GradesControl({grades, onDelete, onPersist}) {
  
  const tableGrades = [];
  let currentStudent = grades[0].student;
  let currentSubject = grades[0].subject;
  let currentGrades = [];
  let id = 1;
  
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
    const grade = grades.find(grade => grade.id === id);
    if(type === 'deleted') {
      onDelete(grade);
      return;
    }

    onPersist(grade);
  }

  
  return (
    <div>
      {tableGrades.map(({id, grades}) => {
        const finalGrade = grades.reduce((acc, curr) => acc + curr.value, 0);
        const gradeStyle = finalGrade >= 70 ? styles.goodGrade : styles.badGrade;
        
      return(
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
          <tfoot>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td><strong>Total</strong></td>
              <td><span style={gradeStyle}>{finalGrade}</span></td>
            </tr>
          </tfoot>
        </table>
      )})}
    </div>
  )
}

const styles = {
  goodGrade: {
    fontWeight: 'bold',
    color: 'green',
  },

  badGrade: {
    fontWeight: 'bold',
    color: 'red',
  }
}