import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  title: {
    fontFamily : 'Lobster',
    fontSize: 42,
  },
});

class MyTitle extends React.Component {
    render() {
        return(
            <Typography
                variant="headline"
                component="h1"
                className={this.props.classes.title}
            >
                {this.props.children}
            </Typography>
        );
    }
}


export default withStyles(styles)(MyTitle);
