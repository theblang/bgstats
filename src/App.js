import React, { Component } from 'react';
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
import Collection from './Collection';
import Sessions from './Sessions';
import Settings from './Settings';

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
    screens = {
        main: [
            {
                title: 'Collection',
                icon: <CollectionsIcon />,
                content: <Collection />
            },
            {
                title: 'Sessions',
                icon: <ScoreIcon />,
                content: <Sessions />
            }
        ],
        other: [
            {
                title: 'Settings',
                icon: <SettingsIcon />,
                content: <Settings />
            }
        ]
    };

    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false,
            activeScreen: this.screens.main[0]
        };
    }

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    onScreenSelected = (screen = this.screens[0]) => {
        this.setState(state => ({ activeScreen: screen }));
    };

    render() {
        const { classes, theme } = this.props;

        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    {this.screens.main.map((screen, index) => (
                        <ListItem
                            button
                            key={screen.title}
                            onClick={() => this.onScreenSelected(screen)}
                        >
                            <ListItemIcon>{screen.icon}</ListItemIcon>
                            <ListItemText primary={screen.title} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {this.screens.other.map((screen, index) => (
                        <ListItem
                            button
                            key={screen.title}
                            onClick={() => this.onScreenSelected(screen)}
                        >
                            <ListItemIcon>{screen.icon}</ListItemIcon>
                            <ListItemText primary={screen.title} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );

        return (
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
                            {this.state.activeScreen.title}
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
                    {this.state.activeScreen.content}
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(App);
