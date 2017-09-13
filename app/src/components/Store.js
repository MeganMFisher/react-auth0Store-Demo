import React, { Component } from 'react';
import axios from 'axios';

export default class Store extends Component {
    constructor() {
        super();

        this.state = {
            products: [],
        }

        this.addToCart = this.addToCart.bind(this)
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

    addToCart(productId) {
       return axios.post('/api/addToCart/', productId).then(response => {
           console.log(response)
       })
    }

    render() {
        var products = this.state.products.map((product, i) => {
            return (
                <div key={i} className='product'>
                    <h2>{ product.name }</h2>
                    <img src={ product.image } alt=''/>
                    <h4>${ product.price }</h4>
                    <h5>{ product.description }</h5>
                    <button onClick={ () => this.addToCart(product.id) }>Add to Cart</button>
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