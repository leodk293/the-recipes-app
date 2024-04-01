import React, { useState, useRef, useEffect } from 'react';
import {Link} from 'react-router-dom'
import './styles.css';

export default function Food() {
    const inputRef = useRef();
    const [data, setData] = useState({
        error: true,
        data: undefined
    });

    async function fetchData() {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputRef.current.value}`);
            const result = await response.json();
            console.log(result);
            setData({
                error: false,
                data: result
            });
        } catch(error) {
            setData({
                error: true,
                data: undefined
            });
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        fetchData();
    }

    const linkStyle = {
        color : "#fff",
        backgroundColor : "#000",
        border : "1px solid #000",
        padding : "10px",
        cursor : "pointer",
        borderRadius : "10px",
        width: "170px",
        textAlign : "center",
        textDecoration : "none"
    }

    return (
        <div className='container'>
            <h1>The Recipes App</h1>
            <form onSubmit={handleSubmit} action="">
                <input ref={inputRef} type="text" placeholder='Enter items...' />
            </form>
            <div className="recipes-container">
                {!data.error && data.data.meals && data.data.meals.map((element) => (
                    <div key={element.idMeal} className="pattern">
                        <img src={element.strMealThumb} alt={element.strMeal} />
                        <p style = {{color:"blue", fontWeight:"100", fontSize:"20px"}}>{element.strArea}</p>
                        <p>{element.strMeal}</p>
                        <Link style={linkStyle} to = {`/details/${element.idMeal}`}>RECIPE DETAILS</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
