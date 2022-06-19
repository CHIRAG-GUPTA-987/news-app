import React, { Component } from 'react';
import loading from './Loading.gif';
import PropTypes from 'prop-types'


export default class Spinner extends Component {
    static defaultProps = {
        height: '10vh',
        width: '40vw'
    }
    static propTypes = {
        height: PropTypes.string.isRequired,
        width: PropTypes.string.isRequired,
    }
    render() {
        return (
            <div>
                <div className="container d-flex justify-content-center" style={{height: `${this.props.height}`, width: `${this.props.width}`}}>
                    <img src={loading} alt="..." />
                </div>
            </div>
        )
    }
}