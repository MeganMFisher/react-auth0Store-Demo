import React, { Component } from 'react';
import axios from 'axios';

export default class Store extends Component {
    constructor() {
        super();

        this.state = {
            products: []
        }
    }


    componentDidMount() {
        axios.get('/auth/me').then(res => {
            console.log(res.data)
        })
        axios.get('/api/products').then(res => {
            this.setState({
                products: res.data
            })
        })
    }

    render() {
        var products = this.state.products.map((product, i) => {
            return (
                <div key={i} className='product'>
                    <h2>{ product.name }</h2>
                    <img src={ product.image } />
                    <h4>${ product.price }</h4>
                    <h5>{ product.description }</h5>
                    <button>Add to Cart</button>
                </div>
            )
        })
        return (
            <div>
                <h1>Store</h1>
                <div className='products'>
                { products }
                </div>
            </div>
        )
    }
}