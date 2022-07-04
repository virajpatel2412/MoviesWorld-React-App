import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Search, Tv, Whatshot, Movie } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import React from "react";


const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "black",
    zIndex: 100,
  }
})

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (value === 0) history.push("/")
    else if (value === 1) history.push("/movies")
    else if (value === 2) history.push("/series")
    else if (value === 3) history.push("/search")
  }, [value, history])

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Trending"
        icon={<Whatshot />}
        style={{ color: "white" }}
      />

      <BottomNavigationAction
        label="Movies"
        icon={<Tv />}
        style={{ color: "white" }}
      />

      <BottomNavigationAction
        label="Series"
        icon={<Movie />}
        style={{ color: "white" }}
      />

      <BottomNavigationAction
        label="Search"
        icon={<Search />}
        style={{ color: "white" }}
      />

    </BottomNavigation>
  )
}

export default Navbar