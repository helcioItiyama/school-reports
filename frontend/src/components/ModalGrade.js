import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import * as api from '../services/api';

Modal.setAppElement('#root');

export default function ModalGrade({onSave, onClose, selectedGrade}) {
  const {id, student, subject, type} = selectedGrade;

  const [ gradeValue, setGradeValue ] = useState(selectedGrade.value);
  const [ gradeValidation, setGradeValidation ] = useState({});
  const [ errorMessage, setErrorMessage ] = useState('');

  useEffect(() => {
    const getValidation = async () => {
      const validation = await api.getValidationFromGradeType(type);
      setGradeValidation(validation);
    }
    getValidation()
  }, [type]);

  useEffect(() => {
    const {minValue, maxValue} = gradeValidation;

    if(gradeValue < minValue || gradeValue > maxValue) {
      setErrorMessage(
        `O valor da nota deve ser entre ${minValue} e ${maxValue} (inclusive)`
      );
      return;
    }
    setErrorMessage('')
  }, [gradeValue, gradeValidation]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  },[]);

  const handleKeyDown = (event) => {
    if(event.key === 'Escape') {
      onClose()
    }
  }

  const handleModalClose = () => {
    onClose()
  }

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const formData = {
      id,
      newValue: gradeValue
    };

    onSave(formData)
  };

  const handleGradeChange = (event) => {
   setGradeValue(+event.target.value)
  };

  return (
    <div>
      <Modal isOpen={true}>
        <div>
          <span>Manutenção de notas</span>
          <button onClick={handleModalClose}>x</button>
        </div>

        <form onSubmit={handleSubmitForm}>
          <div>
            <label htmlFor="inputName">Nome do aluno:</label>
            <input id="inputName" type="text" value={student} readOnly/>
          </div>

          <div>
            <label htmlFor="inputSubject">Disciplina:</label>
            <input id="inputSubject" type="text" value={subject} readOnly/>
          </div>

          <div>
            <label htmlFor="inputType">Tipo de avaliação:</label>
            <input id="inputType" type="text" value={type} readOnly/>
          </div>

          <div>
            <label htmlFor="inputGrade">Nota</label>
            <input 
              type="number" 
              id="inputGrade" 
              min={gradeValidation.minValue}
              max={gradeValidation.maxValue}
              step="1"
              autoFocus
              value={gradeValue}
              onChange={handleGradeChange}
              />
          </div>

          <div>
            <button disabled={errorMessage.trim() !== ''}>
              Salvar
            </button>
            <span>{errorMessage}</span>
          </div>
        </form>
      </Modal>    
    </div>
  )
}
