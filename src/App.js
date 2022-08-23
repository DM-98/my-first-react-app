import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const APIURL = "http://www.omdbapi.com/?i=tt3896198&apikey=e3a2a47f";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${APIURL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('');
    }, []);

    return (
        <div className='app'>
            <h1>My First React App</h1>

            <div className='search'>
                <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder='Search for movies' />
                <img src={SearchIcon} onClick={() => searchMovies(searchTerm)} />
            </div>

            {
                movies?.length > 0
                ?
                <div className='container'>
                    {movies.map((movie) => <MovieCard movie={movie} />)}
                </div>
                :
                <div className='empty'>
                    <h2>Begin search to see results here</h2>
                </div>
            }
        </div>
    );
}

export default App;