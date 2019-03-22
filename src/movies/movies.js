import React from 'react';
import {Carousel} from "../carousel/carousel";

const axios = require('axios');

class Movies extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            active: this.props.active,
            direction: ''
        };

        axios.get('https://swapi.co/api/films/')
            .then(response => {
                this.setState({
                    items: response.data.results.map(result => {
                        return {
                            name: result.title,
                            link: {
                                url: result.url,
                                pathname: '/characters',
                                label: 'Characters'
                            },
                            type: 'name'
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
                            <Carousel items={this.state.items} active={0}/>
                        </div>
                }
            </div>
        )
    }
}

export {Movies};
