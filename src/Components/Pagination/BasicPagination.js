import React from 'react';
import { Pagination } from '@material-ui/lab';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark'
    }
});

export default function BasicPagination({ setPage, numOfPages = 100 }) {

    const handlePageChange = (count) => {
        setPage(count);
        window.scroll(0, 0);
    } 

    return (
        <div style={{
            width:'100%',
            display:'flex',
            justifyContent:'center',
            marginTop:10,
        }}>

            <ThemeProvider theme={darkTheme}>
                <Pagination
                    count={numOfPages}
                    onChange={(e) => handlePageChange(e.target.textContent)}
                    hideNextButton
                    hidePrevButton
                    color='primary'
                />
            </ThemeProvider >

        </div>
    )
}