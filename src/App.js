import './App.css';
import Header from './Components/Header/Header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Trending from './Components/Trending/Trending';
import Movies from './Components/Movies/Movies';
import Series from './Components/Series/Series';
import SearchPage from './Components/Search/SearchPage';
import Navbar from './Components/NavBar/Navbar';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={SearchPage} />
          </Switch>
        </Container>
      </div>
      <Navbar />
    </BrowserRouter>
  );
}

export default App;
