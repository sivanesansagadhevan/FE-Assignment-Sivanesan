import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';


function App() {

  const [data, setData] = useState([])
  const [selectedMovie, SetSelectedMovie] = useState(null)
  const [sort, setSort] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://swapi.dev/api/films/?format=json')
      .then(res => { setData(res.data.results) })

      .catch((err) => {
        console.log("error", err);
      })
  }, [])

  const handleMovieClick = (movie) => {
    SetSelectedMovie(movie)
    console.log(selectedMovie);
  }

  const handleSort = (info) => {
    setSort(info)
    return false;
  };

  const sortedMovies = () => {
    if (sort === 'year') {
      return [...data].sort((a, b) => a.year - b.year);
    } else if (sort === 'Episode') {
      return [...data].sort((a, b) => a.episode_id - b.episode_id)
    } else {
      return data
    }
  }

  console.log(search);
  return (
    <div className="App">
      <div className="navbar">
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Sort by..
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <p className="dropdown-item" onClick={() => { handleSort('year') }}>Year</p>
            <p className="dropdown-item" onClick={() => { handleSort('Episode') }}>Episode</p>
          </div>
        </div>
        <input type="text" className='form-control' placeholder='Search' onChange={(e) => { setSearch(e.target.value) }}></input>
      </div>
      <div className="dashboard">
        <div className='movie-list'>
          {sortedMovies().filter(item => item.title.toLowerCase().includes(search.toLowerCase())).map((item, index) => (
            <table className="table" key={index}>
              <thead >
                <tr >
                  <td scope="col" className="thead">{`EPISODE ${item.episode_id}`} </td>
                  <td scope="col" className="thead" onClick={() => { handleMovieClick(item) }}>{item.title}</td>
                  <td scope="col" className="thead">{item.release_date}</td>
                </tr>
              </thead>
            </table>
          ))}
        </div>
        <div className='movie-info'>
          {!selectedMovie && (<p className=' d-flex  justify-content-center '> No movie selected</p>)}
          {selectedMovie && (
            <>
              <h3 className='title-heading'>{selectedMovie.title}</h3>
              <p className='story'>{selectedMovie.opening_crawl}</p>
              <p className='director'>{selectedMovie.director}</p>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
