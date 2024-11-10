import React, { useState } from 'react'; 
import './Circle.css';

// Компонент Circle принимает пропсы circle (с данными о круге), isSelected (флаг выделения),
// и toggleSelectCircle (функция переключения выделения круга)
const Circle = ({ circle, isSelected, toggleSelectCircle }) => {
  const [position, setPosition] = useState({ left: circle.left, top: circle.top });

  const handleDrag = (e) => {
    e.preventDefault();
    setPosition({
      left: `${e.clientX - e.target.offsetWidth / 2}px`,
      top: `${e.clientY - e.target.offsetHeight / 2}px`,
    });
  };

  // Обработчик для выделения круга по клику
  const handleSelect = () => {
    toggleSelectCircle(circle.id);
  };

  return (
    <div
      className={`circle ${isSelected ? 'selected' : ''}`} // Добавляем класс selected для выделенного круга
      style={{ left: position.left, top: position.top, width: circle.size, height: circle.size }}
      draggable
      onDragEnd={handleDrag}
      onClick={handleSelect} // Выделяем круг при клике
      tabIndex="0"
    />
  );
};

export default Circle;

