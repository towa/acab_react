import React from 'react';
import axios from 'axios';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import MyButton from './components/MyButton.jsx';
import MyTitle from './components/MyTitle.jsx';
import Typography from 'material-ui/Typography';
import VoteButton from './VoteButton.jsx';
import Hidden from 'material-ui/Hidden';
import withWidth from 'material-ui/utils/withWidth';
import { configureUrlQuery } from 'react-url-query';
import createHistory from 'history/createBrowserHistory';
import capitalizeFirstLetter from './helpers.js';
const history = createHistory();
 
configureUrlQuery({ history });

const urlPropsQueryConfig = {
  c: { type: UrlQueryParamTypes.string },
  b: { type: UrlQueryParamTypes.string },
};

class PoemCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            c : this.props.c,
            b : this.props.b,
        };  
    }
    getPoem() {
        axios.get('http://localhost:5000/random')
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        c       : response.data.gen.c,
                        b       : response.data.gen.b,
                        source  : response.data.gen.source,
                    });
                    this.props.onChangeC();
                    this.props.onChangeB();
                }
            });
    }
    componentDidMount() {
        if (!(this.state.c && this.state.b)) {
            this.getPoem();
        }
    }
    render() {
        var c = capitalizeFirstLetter(this.state.c);
        var b = capitalizeFirstLetter(this.state.b);
        return (
            <div>
                <Card>
                    <CardContent>
                      <MyTitle>
                        all {c} are {b}
                      </MyTitle>
                      <Typography color="textSecondary">
                        {this.state.source}
                      </Typography>
                    </CardContent>
                    <Hidden xsDown>
                        <CardActions>
                            <MyButton
                                onClick={() => this.getPoem()}
                                color="primary"
                                variant="raised"
                                icon="shuffle"
                                text="Random"
                            />
                            <VoteButton
                                color="secondary"
                                variant="raised"
                                onVote={() => this.getPoem()}
                                c={this.state.c} b={this.state.b} downvote={false}
                            />
                            <VoteButton
                                variant="raised"
                                color="secondary"
                                onVote={() => this.getPoem()}
                                c={this.state.c} b={this.state.b} downvote={true}
                            />
                        </CardActions>
                    </Hidden>
                </Card>
                <Hidden smUp>
                    <MyButton
                        onClick={() => this.getPoem()}
                        color="primary"
                        variant="raised"
                        icon="shuffle"
                        text="Random"
                    />
                    <VoteButton
                        color="secondary"
                        variant="raised"
                        c={this.state.c} b={this.state.b} downvote={false}
                        onVote={() => this.getPoem()}
                    />
                    <VoteButton
                        variant="raised"
                        color="secondary"
                        c={this.state.c} b={this.state.b} downvote={true}
                        onVote={() => this.getPoem()}
                    />
                </Hidden>
            </div>
        );
    }
}


export default addUrlProps({ urlPropsQueryConfig })(withWidth()(PoemCard));
