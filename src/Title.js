import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Title extends Component {
    getTitle = pathname => {
        switch (pathname) {
            case '/':
                return 'Dashboard';
            case '/collection':
                return 'Collection';
            case '/sessions':
                return 'Sessions';
            case '/settings':
                return 'Settings';
            default: {
                return '';
            }
        }
    };

    render() {
        return <div>{this.getTitle(this.props.location.pathname)}</div>;
    }
}

export default withRouter(Title);
