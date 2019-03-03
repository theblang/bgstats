import React, { Component } from 'react';
import logo from './logo.svg';
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
    state = {
        mobileOpen: false
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    onScreenSelected = screen => {
        switch (screen) {
            case 'Collection': {
                this.setState(state => ({ activeScreen: screen }));
                break;
            }
            default: {
                this.setState(state => ({ activeScreen: 'Collection' }));
            }
        }
    };

    render() {
        const { classes, theme } = this.props;

        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    {['Collection', 'Plays'].map((text, index) => (
                        <ListItem
                            button
                            key={text}
                            onClick={() => this.onScreenSelected(text)}
                        >
                            <ListItemIcon>
                                {index % 2 === 0 ? (
                                    <CollectionsIcon />
                                ) : (
                                    <ScoreIcon />
                                )}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Settings'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <SettingsIcon /> : null}
                            </ListItemIcon>
                            <ListItemText primary={text} />
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
                            {this.state.activeScreen}
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
                    {(() => {
                        switch (this.state.activeScreen) {
                            case 'Collection': {
                                return <Collection />;
                            }
                            default: {
                                return <Collection />;
                            }
                        }
                    })()}
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(App);
