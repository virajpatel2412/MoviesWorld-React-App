import axios from "axios"
import { useState, useEffect } from 'react';
import SingleContent from "../SingleContent/SingleContent";
import BasicPagination from "../Pagination/BasicPagination";
import Genres from "../Genres";
import '../Trending/Trending.css';
import useGenres from "../../hooks/useGenres";

const Movies = () => {

    const [page, setPage] = useState(1);
    const [content, setContent] = useState();
    const [numOfPages, setNumOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreForURL = useGenres(selectedGenres);

    const fetchMovies = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`);

        setContent(data.results);

        if (data.total_pages > 100)
            setNumOfPages(100);
        else
            setNumOfPages(data.total_pages);

    }

    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line
    }, [page, genres])

    return (
        <div>
            <span className="pageTitle">Movies</span>
            <Genres
                type='movie'
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />

            <div className='trending'>
                {
                    content && content.length !== 0 ? content.map((c) =>
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            title={c.name || c.title}
                            media_type={"movie"}
                            poster_path={c.poster_path}
                            release_date={c.release_date}
                            vote={c.vote_average}
                        />) : "No movies found"
                }

            </div>



            {
                (numOfPages > 1) ?
                    <BasicPagination
                        setPage={setPage}
                        numOfPages={numOfPages}
                        className='pagination'
                    /> : ""

            }
        </div>
    )
}

export default Movies