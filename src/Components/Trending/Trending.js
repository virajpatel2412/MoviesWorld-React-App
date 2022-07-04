
import axios from "axios";
import { useState, useEffect } from "react";
import BasicPagination from "../Pagination/BasicPagination";
import SingleContent from "../SingleContent/SingleContent";
import './Trending.css';

const Trending = () => {
    // eslint-disable-next-line
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);


    const fetchTrending = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);

        setContent(data.results);
    }

    useEffect(() => {
        fetchTrending();
        // eslint-disable-next-line
    }, [page])

    return (
        <div>
            <span className="pageTitle">Trending</span>
            <div className='trending'>
                {
                    content ? content.map((c) =>
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            title={c.name || c.title}
                            media_type={c.media_type}
                            poster_path={c.poster_path}
                            release_date={c.release_date || c.first_air_date}
                            vote={c.vote_average}
                        />) : "No movies found"
                }

            </div>
            <BasicPagination setPage={setPage} className='pagination' />
        </div>
    )
}

export default Trending