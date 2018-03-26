import React from 'react';
import axios from 'axios';
import MyButton from './components/MyButton.jsx';
import Icon from 'material-ui/Icon';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';


class VoteButton extends React.Component {
    state = {
        open: false,
        message: "",
    };


    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
    };
    
    votePoem() {
        axios.post("http://localhost:5000/vote",{
            c           : this.props.c,
            b           : this.props.b,
            downvote    : this.props.downvote,
        }).then((response) => {
            if (response.data.error !== undefined) {
                this.setState({ open : true, message : response.data.error });
            }
            if (response.data.vote !== undefined) {
                var msg = "you voted for: all " + response.data.vote.c
                        + " are " + response.data.vote.b;
                this.setState({ open : true, message : msg });
            }
        });
            
    }

    render() {
        var text = this.props.downvote ? "nicht witzig" : "witzig";
        var icon = this.props.downvote ? "thumb_down" : "favorite";
        return (
            <div>
                <MyButton
                    onClick={() => this.votePoem()}
                    color={this.props.color ? this.props.color : "inherit"}
                    variant={this.props.variant ? this.props.variant : "flat"}
                    text={text}
                    icon={icon}
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.message}</span>}
                    action={[
                        <MyButton
                            key="close"
                            aria-label="Close"
                            onClick={this.handleClose}
                            color="inherit"
                            icon="close"
                        />,
                    ]}
                />
            </div>
        )
    }
}

export default VoteButton;
