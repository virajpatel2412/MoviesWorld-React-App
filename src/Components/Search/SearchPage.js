import { Search } from "@material-ui/icons";
import axios from "axios";
import { useState, useEffect } from 'react';
import { TextField, Button, createMuiTheme, ThemeProvider, Tab, Tabs } from '@material-ui/core';
import './SearchPage.css'
import SingleContent from "../SingleContent/SingleContent";
import BasicPagination from "../Pagination/BasicPagination";

const SearchPage = () => {
  const [page, setPage] = useState(1);
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: "#fff",
      }
    }
  })



  const fetchSearch = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}`);

    setContent(data.results);
    setNumOfPages(data.total_pages);
  }

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [page, type])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyConent: 'center' }}>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: 'flex', margin: '15px 0' }}>
          <TextField
            style={{ flex: 1 }}
            className='searchbox'
            label='Search'
            variant='filled'
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            style={{ marginLeft: '10px' }}
            variant='contained'
          >
            <Search />
          </Button>
        </div>

        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{
            paddingBottom: 15
          }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>

      <div>
        <div className='trending'>
          {
            content && content.length > 0 ? content.map((c) =>
              <SingleContent
                key={c.id}
                id={c.id}
                title={c.name || c.title}
                media_type={type ? "tv" : "movie"}
                poster_path={c.poster_path}
                release_date={c.release_date || c.first_air_date}
                vote={c.vote_average}
              />) : "Data Not Found"
          }

          {
            searchText && !content && (type ? <h2>No series Found</h2> : <h2>No Movies Found</h2>)
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

    </div>
  )
}

export default SearchPage