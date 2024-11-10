import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Circle from './Circle';

function App() {
  const [circles, setCircles] = useState([]);
  const [selectedCircles, setSelectedCircles] = useState([]); // Для хранения выделенных кругов
  const slideRef = useRef(null);

  const addCircle = () => {
    const slideWidth = slideRef.current.offsetWidth;
    const slideHeight = slideRef.current.offsetHeight;
    const sizePercent = Math.floor(Math.random() * 16) + 5;
    const sizePx = (sizePercent / 100) * slideWidth;

    const left = Math.random() * (slideWidth - sizePx);
    const top = Math.random() * (slideHeight - sizePx);

    const newCircle = {
      id: Date.now(),
      left: `${left}px`,
      top: `${top}px`,
      size: `${sizePx}px`,
    };

    setCircles([...circles, newCircle]);
  };

  // Переключение выделения круга
  const toggleSelectCircle = (id) => {
    setSelectedCircles((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((circleId) => circleId !== id)
        : [...prevSelected, id]
    );
  };

  // Обработчик для удаления выделенных кругов при нажатии Backspace
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Backspace' && selectedCircles.length > 0) {
        setCircles(circles.filter((circle) => !selectedCircles.includes(circle.id)));
        setSelectedCircles([]); // Очистить список выделенных кругов после удаления
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [circles, selectedCircles]);

  return (
    <div className="app">
      <button onClick={addCircle}>Добавить круг</button>
      <div className="slide" ref={slideRef}>
        {circles.map((circle) => (
          <Circle
            key={circle.id}
            circle={circle}
            isSelected={selectedCircles.includes(circle.id)}
            toggleSelectCircle={toggleSelectCircle}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

