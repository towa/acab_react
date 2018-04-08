import React from 'react';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

class MyPagination extends React.Component {
    render() {
        return(
            //<div className={this.props.classes.root}>
            <Typography align="center">
                <Button
                    disabled={!(this.props.pagination.has_prev)}
                    onClick={() => this.props.onPageChange(this.props.pagination.prev_num)}
                    color={this.props.color ? this.props.color : "inherit"}
                    variant="fab" mini
                    className={this.props.classes.button}
                >
                    <Icon>navigate_before</Icon>
                </Button>
                    {this.props.pagination.page} / {this.props.pagination.pages}
                <Button
                    disabled={!(this.props.pagination.has_next)}
                    onClick={() => this.props.onPageChange(this.props.pagination.next_num)}
                    color={this.props.color ? this.props.color : "inherit"}
                    variant="fab" mini
                    className={this.props.classes.button}
                >
                    <Icon>navigate_next</Icon>
                </Button>
            </Typography>
            //</div>
        );
    }
}

export default withStyles(styles)(MyPagination);

