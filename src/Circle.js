import React, { useState } from 'react';  
import './Circle.css';

// Компонент Circle принимает следующие пропсы:
// circle - объект с данными о круге (id, left, top, size)
// isSelected - флаг, который указывает, выделен ли круг
// toggleSelectCircle - функция, которая переключает выделение круга
const Circle = ({ circle, isSelected, toggleSelectCircle }) => {
  // Локальное состояние для хранения позиции круга (left и top)
  const [position, setPosition] = useState({ left: circle.left, top: circle.top });

  // Функция, которая обрабатывает завершение перетаскивания круга
  const handleDrag = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение браузера
    setPosition({
      left: `${e.clientX - e.target.offsetWidth / 2}px`, // Обновляем позицию по оси X
      top: `${e.clientY - e.target.offsetHeight / 2}px`, // Обновляем позицию по оси Y
    });
  };

  // Функция, которая обрабатывает клики по кругу для его выделения
  const handleSelect = () => {
    toggleSelectCircle(circle.id); // Вызываем функцию для переключения выделения круга
  };

  return (
    <div
      className={`circle ${isSelected ? 'selected' : ''}`} // Добавляем класс 'selected', если круг выделен
      style={{ left: position.left, top: position.top, width: circle.size, height: circle.size }} // Устанавливаем позицию и размер круга
      draggable // Устанавливаем, что круг можно перетаскивать
      onDragEnd={handleDrag} // Обработчик завершения перетаскивания
      onClick={handleSelect} // Выделяем круг при клике
      tabIndex="0" // Делает круг фокусируемым для работы с клавишами
    />
  );
};

export default Circle;


