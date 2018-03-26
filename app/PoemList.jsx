import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import capitalizeFirstLetter from './helpers.js';
import VoteButton from './VoteButton.jsx';

class PoemListItem extends React.Component {
    showPoem(){
        this.props.history.push("/?c=" + this.props.c + "&b=" + this.props.b);;
    }
    render(){
        var acab    = "all " + capitalizeFirstLetter(this.props.c)
                    + " are " + capitalizeFirstLetter(this.props.b);
        var votes = this.props.votes + " votes";
        return(
            <ListItem button onClick={() => this.showPoem()}>
                <ListItemText primary={acab} secondary={votes}/>
            </ListItem>
        );
    }
}

const RoutingPoemListItem = withRouter(PoemListItem);

class PoemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            acabs : [],
        };  
    }
    getAcabs() {
        axios.get('http://localhost:5000/list')
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        acabs       : response.data.lst
                    });
                }
            });
    }
    componentDidMount() {
        this.getAcabs();
    }
    render(){
        return(
            <List component="nav">
                {this.state.acabs.map((acab) => {
                    return (
                        <RoutingPoemListItem key={acab.c + acab.b} c={acab.c} b={acab.b} votes={acab.votes} />
                    );
                })}
            </List>
        );
    }
}

export default PoemList;
