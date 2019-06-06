import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    CssBaseline,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Hidden,
    Drawer
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import CollectionsIcon from '@material-ui/icons/Collections';
import ScoreIcon from '@material-ui/icons/Score';
import SearchIcon from '@material-ui/icons/Search';
import Collection from './Collection';

import Sessions from './Sessions';
import Settings from './Settings';
import Dashboard from './Dashboard';
import Title from './Title';
import GameDetails from './GameDetails';
import Search from './Search';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}));

export default function App(props) {
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <Link to="/collection" style={{ textDecoration: 'none' }}>
                    <ListItem button>
                        <ListItemIcon>
                            <CollectionsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Collection" />
                    </ListItem>
                </Link>
                <Link to="/sessions" style={{ textDecoration: 'none' }}>
                    <ListItem button>
                        <ListItemIcon>
                            <ScoreIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sessions" />
                    </ListItem>
                </Link>
                <Link to="/search" style={{ textDecoration: 'none' }}>
                    <ListItem button>
                        <ListItemIcon>
                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText primary="Search" />
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <List>
                <Link to="/settings" style={{ textDecoration: 'none' }}>
                    <ListItem button>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>
                </Link>
            </List>
        </div>
    );

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            <Title location={{}} />
                        </Typography>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer}>
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={
                                theme.direction === 'rtl' ? 'right' : 'left'
                            }
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/collection" component={Collection} />
                    <Route path="/sessions" component={Sessions} />
                    <Route path="/search" component={Search} />
                    <Route path="/settings" component={Settings} />
                    <Route path="/game/:id" component={GameDetails} />
                </main>
            </div>
        </Router>
    );
}
