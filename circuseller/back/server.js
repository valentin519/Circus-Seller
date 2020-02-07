const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
const connection = require('./conf.js');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const signature = require('./signature.js');

app.use(bodyParser.json());

app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);

app.use(cors());

function verifyToken(req, res, next){
   const bearerHeader = req.headers.authorization
   if (typeof bearerHeader !== 'undefined') {
       const bearer = bearerHeader.split(' ')
       const bearerToken = bearer[1]
	   const authData = jwt.verify(bearerToken, signature)
	   req.authData = authData
       next()
   } else {
       res.sendStatus(403)
   }
}


app.get('/products', (req, res) => {
	let sqlQuery = `SELECT product.title, product.content, product.price, product.pictur from product`
  	connection.query(sqlQuery, (err, results) => {
    if (err) {
		console.log(err)
      res.status(500).send('Erreur lors de la récupération des posts');
    } else {
      res.json(results);
    }
  });
});
app.post('/products', verifyToken, (req, res) => {
  	const formData = {
		name: req.body.title,
		content: req.body.content,
		price: req.body.price,
		picture: req.body.picture
	}
	const sqlQuery = 'INSERT INTO product SET ?';
  	connection.query(sqlQuery, formData, (err, results) => {
		if (err) {
		console.log(err);
		res.status(500).send("Error sending a new post");
		} else {
		res.sendStatus(200);
		}
  	});
});

app.post('/login', (req, res) => {
	const userPassword = req.body.password;
	const userEmail = req.body.email
	const sqlQuery = `SELECT id, email, password from user where user.email='${userEmail}'`
	connection.query(sqlQuery, (err, matchs) => {
		if (err) {
			res.status(500).send('error')
			return
		}
		const oneMatchFound = (matchs.length === 1)
		if (!oneMatchFound || matchs[0].password !== userPassword) {
			res.status(400).send('Wrong email or password')
			return
		} else {
			jwt.sign({ sub: matchs[0].id }, signature, {expiresIn: '600sec'}, (err, token) => {
				res.status(200).json({
					token
				});
			});
		}
	})
})

app.post('/register', (req, res) => {
  	const formData = req.body;
	const sqlQuery = 'INSERT INTO user SET ?';
  	connection.query(sqlQuery, formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error registering new user");
    } else {
      res.sendStatus(200);
    }
  	});
})
app.post('/registerproduct', (req, res) => {
	const formData = req.body;
  const sqlQuery = 'INSERT INTO product SET ?';
	connection.query(sqlQuery, formData, (err, results) => {
  if (err) {
	console.log(err);
	res.status(500).send("Error registering new product");
  } else {
	res.sendStatus(200);
  }
	});
})



app.get('/productsaves', verifyToken, (req, res) => {
	const userId = req.authData.sub
	const sqlQuery = `SELECT product.id, CASE WHEN EXISTS (SELECT * FROM panier WHERE product.id=panier.product_id AND panier.user_id=${userId}) THEN TRUE ELSE FALSE END AS savedByUser FROM post LEFT JOIN panier ON product.id=product.product_id GROUP BY product.id`
	connection.query(sqlQuery, (err, results) => {
		if (err) {
			console.log(err);
			res.status(500).send('error getting saved posts from user');
		} else {
			res.json(results)
		}
	})
})

app.put('/postsaves', verifyToken, (req, res) => {
	const userId = req.authData.sub
	const productId = req.body.product_id
	const formData = {user_id: userId, product_id: productId}
	const sqlQuery1 = `SELECT * FROM panier WHERE product_id = ${productId} AND user_id = ${userId}`
	connection.query(sqlQuery1, (err, results) => {
		if (err) {
			console.log(err);
			res.status(500).send('error getting saved posts');
		} else {
			if (results[0]) {
				const sqlQuery2 = `DELETE FROM panier WHERE product_id = ${productId} AND user_id = ${userId}`
				connection.query(sqlQuery2, err => {
					if (err) {
						console.log(err);
						res.status(500).send("Error deleting saved product");
					} else {
						res.sendStatus(204)
					}
				})
			} else {
				const sqlQuery3 = 'INSERT INTO `panier` SET ?';
				connection.query(sqlQuery3, formData, (err, results2) => {
					if (err) {
						console.log(err);
						res.status(500).send("Error saving a panier");			
					} else {
						res.json(results2);
					}
				})
			}
		}
	})
})

app.listen(port, err => {
	if (err) {
		throw new Error('Something bad happened...');
	}
	console.log(`Server is listening on ${port}`);
});
