module.exports = {
    getProducts: (req, res) => {
        req.app.get('db').get_products().then(products => {
            return res.send(products)
        })
    }
}