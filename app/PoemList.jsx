import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import capitalizeFirstLetter from './helpers.js';
import VoteButton from './VoteButton.jsx';
import MyPagination from './components/MyPagination.jsx';

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
    getAcabs(page = 1) {
        axios.get('http://localhost:5000/list/' + page)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        acabs       : response.data.items,
                        pagination  : response.data.pagination,
                    });
                }
            });
    }
    componentDidMount() {
        this.getAcabs();
    }
    render(){
        var paginationButtons = this.state.pagination
            ? <MyPagination color="primary"
                onPageChange={this.getAcabs.bind(this)}
                pagination={this.state.pagination}/>
            : <div/>
        return(
            <div>
                <List component="nav">
                    {this.state.acabs.map((acab) => {
                        return (
                            <RoutingPoemListItem
                                key={acab.c + acab.b}
                                c={acab.c}
                                b={acab.b}
                                votes={acab.vote}
                            />
                        );
                    })}
                </List>
                {paginationButtons}
            </div>
        );
    }
}

export default PoemList;
