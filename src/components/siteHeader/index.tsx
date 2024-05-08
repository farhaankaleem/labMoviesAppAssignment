import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const styles = {
  title: {
    flexGrow: 1,
  },
  leftSpace: {
    marginLeft: 10
  },
  Space: {
    marginRight: 2
  },
  appbar: {
    // background: 'none',
  },
  drawer: {
    width: 250,
  },
  search: {
    position: 'relative',
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
    marginLeft: 0,
    width: 'auto',
  },
  searchIcon: {
    padding: '10px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: '10px',
    paddingLeft: `calc(1em + 20px)`,
    transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    width: '100%',
  },
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Favorites", path: "/movies/favourites" },
    { label: "Popular Movies", path: "/movies/popular" },
    { label: "Actors", path: "/actors" },
    { label: "TV Series", path: "/series" }
  ];

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
    setIsDrawerOpen(false); 
  };

  const handleSearch = () => {
    console.log("Search value:", searchValue);
    navigate(`/seacrh/${searchValue}`)
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  return (
    <>
      <AppBar sx={styles.appbar} position="fixed" elevation={0} color="primary">
        <Toolbar>
          <IconButton
            aria-label="menu"
            onClick={toggleDrawer(true)}
            color="inherit"
            size="large"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" sx={{ ...styles.title, ...styles.leftSpace }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={styles.title}>
            All you ever wanted to know about Movies!
          </Typography>
              <SearchIcon sx={styles.Space} onClick={handleSearch} />
            <InputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
        </Toolbar>
      </AppBar>
      <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={styles.drawer}
      >
        <List>
          {menuOptions.map((opt) => (
            <ListItem
              key={opt.label}
              button
              onClick={() => handleMenuSelect(opt.path)}
            >
              <ListItemText primary={opt.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Offset />
    </>
  );
};

export default SiteHeader;