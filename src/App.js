import React, { useState, useRef, useEffect } from 'react'; 
import './App.css';
import Circle from './Circle';

function App() {
  const [circles, setCircles] = useState([]); // Состояние для хранения списка кругов
  const [selectedCircles, setSelectedCircles] = useState([]); // Состояние для хранения списка выделенных кругов
  const slideRef = useRef(null); // Ссылка на слайд, где будут размещаться круги

  // Функция для добавления нового круга на слайд
  const addCircle = () => {
    const slideWidth = slideRef.current.offsetWidth; // Получаем ширину слайда
    const slideHeight = slideRef.current.offsetHeight; // Получаем высоту слайда
    const sizePercent = Math.floor(Math.random() * 16) + 5; // Размер круга в процентах (от 5% до 20%)
    const sizePx = (sizePercent / 100) * slideWidth; // Преобразуем размер круга в пиксели

    const left = Math.random() * (slideWidth - sizePx); // Случайная позиция left внутри слайда
    const top = Math.random() * (slideHeight - sizePx); // Случайная позиция top внутри слайда

    const newCircle = {
      id: Date.now(), // Уникальный идентификатор круга
      left: `${left}px`, // Положение left в пикселях
      top: `${top}px`, // Положение top в пикселях
      size: `${sizePx}px`, // Размер круга в пикселях
    };

    setCircles([...circles, newCircle]); // Добавляем новый круг в состояние
  };

  // Функция для выделения или снятия выделения круга
  const toggleSelectCircle = (id) => {
    setSelectedCircles((prevSelected) =>
      prevSelected.includes(id) // Проверяем, выделен ли круг
        ? prevSelected.filter((circleId) => circleId !== id) // Убираем из списка выделенных, если он уже выделен
        : [...prevSelected, id] // Добавляем в список выделенных, если он не был выделен
    );
  };

  // useEffect для удаления выделенных кругов при нажатии клавиши Backspace
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Backspace' && selectedCircles.length > 0) { // Проверяем, нажата ли клавиша Backspace и есть ли выделенные круги
        setCircles(circles.filter((circle) => !selectedCircles.includes(circle.id))); // Удаляем все выделенные круги
        setSelectedCircles([]); // Очищаем список выделенных кругов после удаления
      }
    };

    document.addEventListener('keydown', handleKeyDown); // Добавляем обработчик события для клавиши Backspace
    return () => {
      document.removeEventListener('keydown', handleKeyDown); // Удаляем обработчик при размонтировании компонента
    };
  }, [circles, selectedCircles]);

  return (
    <div className="app">
      <button onClick={addCircle}>Добавить круг</button> {/* Кнопка для добавления нового круга */}
      <div className="slide" ref={slideRef}> {/* Область слайда для отображения кругов */}
        {circles.map((circle) => (
          <Circle
            key={circle.id}
            circle={circle}
            isSelected={selectedCircles.includes(circle.id)} // Передаем флаг выделения круга
            toggleSelectCircle={toggleSelectCircle} // Функция для переключения выделения круга
          />
        ))}
      </div>
    </div>
  );
}

export default App;


