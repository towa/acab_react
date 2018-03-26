import React from 'react';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class MyButton extends React.Component {
    render() {
        if (!this.props.text) {
            return (
                <IconButton
                    onClick={this.props.onClick}
                    color={this.props.color ? this.props.color : "inherit"}
                    variant={this.props.variant ? this.props.variant : "flat"}
                >
                    <Icon>{this.props.icon}</Icon>
                </IconButton>
            );
        } else {
            return(
                <Button
                    onClick={this.props.onClick}
                    color={this.props.color ? this.props.color : "inherit"}
                    variant={this.props.variant ? this.props.variant : "flat"}
                    className={this.props.classes.button}
                >
                    {this.props.text}
                    <Icon
                        className={this.props.classes.rightIcon}
                    >
                        {this.props.icon}
                    </Icon>
                </Button>
            );
        }
    }
}

export default withStyles(styles)(MyButton);
