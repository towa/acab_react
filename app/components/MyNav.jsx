import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class BackButton extends React.Component {
    render() {
        return(
            <IconButton
                className={this.props.classes.menuButton}
                onClick={() => this.props.history.push("/")}
                color="inherit"
                aria-label="back"
            >
                <Icon>arrow_back</Icon>
            </IconButton> 
        );
    }
}

const RoutingBackButton = withStyles(styles)(withRouter(BackButton));

class MyNav extends React.Component {
    render() {
        var backBtn = this.props.submenu ? <RoutingBackButton/> : "";
        return(
            <AppBar position="static">
                <Toolbar>
                    {backBtn}
                    <Typography variant="title" color="inherit" style={{flex:1}}>
                        {this.props.title}
                    </Typography>
                    {this.props.children}
                </Toolbar>
            </AppBar>
        );
    }
}

export default MyNav;
