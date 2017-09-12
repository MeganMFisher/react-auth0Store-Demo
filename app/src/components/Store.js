import React, { Component } from 'react';
import axios from 'axios';

export default class Store extends Component {



    componentDidMount() {
        axios.get('/auth/me').then(res => {
            console.log(res.data)
        })
    }

    render() {
        return (
            <div>
                <h1>Store</h1>
            </div>
        )
    }
}