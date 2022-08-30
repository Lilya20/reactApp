import React, { useEffect, useState } from "react";

export function App() {
    const [listState, setListState] = useState([]);
    
    const getData = () => {
        return fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json());
    };

    useEffect(() => {
        getData().then((data) => {
            setListState(data);
        });
    }, []);

    return (
        <>
        <h1>to do list:</h1>
        {listState.map(item => {
            return (
            <div>Номер пользователя: {item.userId}, Номер дела: {item.id}, Текст: {item.title}, Завершено: {item.completed ? "Да" : "Нет"} </div>
            )
        })}
        </>
    );
}