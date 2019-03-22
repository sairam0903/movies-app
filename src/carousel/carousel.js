import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './carousel.scss'
import {Link} from "react-router-dom";
import update from 'immutability-helper';

const axios = require('axios');

class Carousel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            carouselItems: [],
            active: this.props.active,
            direction: ''
        };
        this.rightClick = this.moveRight.bind(this);
        this.leftClick = this.moveLeft.bind(this);

        this.init();
    }

    generateItems() {
        const items = [];
        let level;
        for (let i = this.state.active - 2; i < this.state.active + 3; i++) {
            let index = i;
            if (i < 0) {
                index = this.state.items.length + i
            } else if (i >= this.state.items.length) {
                index = i % this.state.items.length
            }
            level = this.state.active - i;
            if (this.state.items[index]) {
                items.push(<Item key={index} item={this.state.items[index]} level={level}/>)
            }
        }
        return items
    }

    moveLeft() {
        let newActive = this.state.active;
        newActive--;
        newActive = newActive < 0 ? this.state.items.length - 1 : newActive;
        this.setItemState(newActive, 'left');
    }

    moveRight() {
        let newActive = (this.state.active + 1) % this.state.items.length;
        this.setItemState(newActive, 'right');
    }

    setItemState(newActive, direction) {
        if (this.state.items[newActive].type === 'url') {
            this.getCharacterInfo(newActive).then(response => {
                this.setState({
                    items: update(this.state.items, {
                        [newActive]: {
                            name: {$set: response.name},
                            speciesName: {$set: response.speciesName},
                            type: {$set: 'name'}
                        }
                    }),
                    active: newActive,
                    direction: direction
                });
            })
        } else {
            this.setState({
                active: newActive,
                direction: direction
            })
        }
    }

    init() {
        if (this.state.items[this.state.active].type === 'url') {
            this.getCharacterInfo(this.state.active).then(response => {
                this.setState({
                    items: update(this.state.items, {
                        [this.state.active]: {
                            name: {$set: response.name},
                            speciesName: {$set: response.speciesName},
                            type: {$set: 'name'}
                        }
                    }),
                });
            });
        }
    }

    getCharacterInfo(active) {
        return axios
            .get(this.state.items[active].name)
            .then(response => {
                return axios
                    .get(response.data.species[0])
                    .then(speciesResponse => {
                        return {
                            name: response.data.name,
                            speciesName: speciesResponse.data.name
                        }
                    });
            });
    }

    render() {
        return (
            <div id="carousel" className="noselect">
                <div className="arrow arrow-left" onClick={this.leftClick}><i className="left"> </i></div>
                <ReactCSSTransitionGroup
                    transitionName={this.state.direction}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {this.generateItems()}
                </ReactCSSTransitionGroup>
                <div className="arrow arrow-right" onClick={this.rightClick}><i className="right"> </i></div>
            </div>
        )
    }
}

class Item extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            level: this.props.level,
        }
    }

    render() {
        const className = 'item level' + this.props.level;
        return (
            <div className={className}>
                <div>{this.props.item.name}</div>
                {
                    this.props.item.link ?
                        <Link
                            to={{pathname: this.props.item.link.pathname, search: "?url=" + this.props.item.link.url}}>
                            {this.props.item.link.label}
                        </Link>
                        :
                        <span>{this.props.item.speciesName}</span>
                }
            </div>
        )
    }
}

export {Carousel};
