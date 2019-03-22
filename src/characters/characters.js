import React from 'react';
import {Carousel} from "../carousel/carousel";
import {Link} from "react-router-dom";
import './characters.scss'

const axios = require('axios');

class Characters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            active: this.props.active,
            direction: ''
        };

        const url = new URLSearchParams(this.props.location.search).get('url');
        axios.get(url)
            .then(response => {
                this.setState({
                    items: response.data.characters.map(charName => {
                        return {
                            name: charName,
                            type: 'url'
                        }
                    })
                })
            })
    }

    render() {
        return (
            <div className="App">
                {
                    !this.state.items ?
                        <div>Loading</div>
                        :
                        <div>
                            <Link to={{pathname: '/'}}>
                                <button className="button">
                                    Back
                                </button>
                            </Link>
                            <Carousel items={this.state.items} active={0}/>
                        </div>
                }
            </div>
        )
    }
}

export {Characters};
