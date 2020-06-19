import React from 'react';

export default function Action({id, type, onActionClick}) {
  const handleIconClick = () => {
    onActionClick(id, type)
  }
  return (
    <span onClick={handleIconClick}>{type}</span>
  )
}