module.exports = {
    getCart: (req, res) => {
        req.app.get('db').get_cart(req.params.orderId).then(cart => {
            res.status(202).send(cart)
        })
    },

    addToCart: (req, res) => {
        console.log(req.params.id)
        var product = req.body;

        req.app.get('db').add_to_cart([req.params.cartid, product.id, product.quantity]).then(productInCart => {
            res.status(202).send('Added!')
        })
    
    },

    updateProductInCart: (req, res) => {
        req.app.get('db').update_cart_product([req.body.quantity, req.params.productid]).then(product => {
            res.status(202).send('Updated!')
        })  
    },

    deleteProductInCart: (req, res) => {
        req.app.get('db').delete_cart_product(req.params.productId).then(product => {
            res.status(202).send('Deleted!')
        })
    }
}