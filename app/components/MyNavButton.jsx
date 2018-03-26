import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'material-ui/Button';

class NavButton extends React.Component {
    render() {
        return(
            <Button
                onClick={() => this.props.history.push(this.props.to)}
                color="inherit"
            >
                {this.props.children}
            </Button>
        );
    }
}

export default withRouter(NavButton);
