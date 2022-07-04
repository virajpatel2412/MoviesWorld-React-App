import axios from 'axios';
import { useEffect } from 'react';
import { Chip } from '@material-ui/core';

const Genres = ({
    type,
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    setPage,
}) => {

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    }

    const handleRemove = (genre) => {
        setGenres([...genres, genre]);
        setSelectedGenres(selectedGenres.filter((g) =>
            g.id !== genre.id));
        setPage(1)
    }

    const fetchGenres = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        setGenres(data.genres);
    }

    useEffect(() => {
        fetchGenres();

        return () => {
            setGenres({})
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div style={{ padding: "6px 0" }}>
            {
                selectedGenres && selectedGenres.map((g) => (
                    <Chip
                        key={g.id}
                        label={g.name}
                        color='primary'
                        clickable
                        style={{ margin: 2 }}
                        onClick={() => handleRemove(g)}
                    />
                ))
            }

            {genres && genres.map((g) => (
                <Chip
                    key={g.id}
                    label={g.name}
                    size='small'
                    clickable
                    style={{ margin: 2 }}
                    onClick={() => handleAdd(g)}
                />
            ))}
        </div>
    )
}

export default Genres