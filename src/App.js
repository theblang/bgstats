import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import {
    AppBar,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    CssBaseline,
    Toolbar,
    IconButton,
    Typography,
    Hidden,
    Drawer,
    withStyles
} from '@material-ui/core';
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

const styles = theme => ({
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
        marginRight: 20,
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
        padding: theme.spacing.unit * 3
    }
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false
        };
    }

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    render() {
        const { classes, theme } = this.props;

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
                                onClick={this.handleDrawerToggle}
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
                                container={this.props.container}
                                variant="temporary"
                                anchor={
                                    theme.direction === 'rtl' ? 'right' : 'left'
                                }
                                open={this.state.mobileOpen}
                                onClose={this.handleDrawerToggle}
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
}

export default withStyles(styles, { withTheme: true })(App);
