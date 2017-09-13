module.exports = {
	createOrder: function(req, res, next) {
		req.app.get('db').create_order([req.params.userid]).then(response => {
            req.status(202).send('Order Created!')
        })
    },
    
	completeOrder: function(req, res, next) {
		req.app.get('db').complete_order([req.params.orderid]).then(response => {
            res.status(202).send('Order Completed')
            next()
        })
    },
    
	getUserOrder: function(req, res, next) {
		var completeOrder = {};
		req.app.get('db').user_order([req.params.userid]).then(order => {

            completeOrder.order = order[0];

       
			req.app.get('db').get_cart([completeOrder.order.id].then(products => {
				completeOrder.products = products;
				res.status(200)
					.send(completeOrder);
			}))

        })
    },
    
	getUserHistory: function(req, res, next) {
		req.app.get('db').user_order_history([req.params.userid]).then(history => {
            res.status(202).send(history)
        })
	},
};