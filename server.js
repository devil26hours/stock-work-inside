const express = require('express');
const app = express();
const mysql = require('mysql2');
const _ = require('lodash');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require('cors');
const { json } = require('body-parser');
const { result } = require('lodash');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const Connection = require('mysql2');
const { response, request } = require('express');
const path = require('path');
const session = require('express-session');
const secret = 'popstock'

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'imgs')));

app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true }));


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "stock_db"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/login.html'));
});


// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		db.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

//logout
app.get('/logout', (req, res) =>{
    //sessiondestroy
    req.session = null;
    res.redirect('/');
})

// http://localhost:3000/home
app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/HomePage.html'));
        
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));
	}
	response.end();
});

// http://localhost:3000/index
app.get('/index', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/index.html'));
	} else {
		// Not logged in

       return response.sendFile(path.join(__dirname + '/login.html'));
	}
	response.end();
});

// http://localhost:3000/indexshipsabuy
app.get('/indexshipsabuy', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/indexshipsabuy.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));
	}
	response.end();
});

// http://localhost:3000/indexflash
app.get('/indexflash', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/indexflash.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));
	}
	response.end();
});

// http://localhost:3000/indexbitkub
app.get('/indexbitkub', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/indexbitkub.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));
	}
	response.end();
});

// http://localhost:3000/Requisition
app.get('/Requisition', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/Requisition.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));
	}
	response.end();
});
// http://localhost:3000/rpa
app.get('/rpa', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/rpa.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));
	}
	response.end();
});
// http://localhost:3000/rpaBitkub
app.get('/rpaBitkub', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/rpaBitkub.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));
	}
	response.end();
});
// http://localhost:3000/rpaflash
app.get('/rpaflash', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/rpaflash.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));
	}
	response.end();
});
// http://localhost:3000/rpashipsabuy
app.get('/rpashipsabuy', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/rpashipsabuy.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));
	}
	response.end();
});
// http://localhost:3000/rpashipsabuy
app.get('/rpashipsabuy', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/rpashipsabuy.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));
	}
	response.end();
});
// http://localhost:3000/Requisition
app.get('/Requisition', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/Requisition.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));
	}
	response.end();
});
// http://localhost:3000/HistorySetShop
app.get('/HistorySetShop', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/HistorySetShop.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));     
	}
	response.end();
});
// http://localhost:3000/HistorySetPlus
app.get('/HistorySetPlus', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/HistorySetPlus.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));     
	}
	response.end();
});
// http://localhost:3000/HistorySet3000
app.get('/HistorySet3000', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/HistorySet3000.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));     
	}
	response.end();
});
// http://localhost:3000/HistorySet4Shipsabuy
app.get('/HistorySet4Shipsabuy', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/HistorySet4Shipsabuy.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));     
	}
	response.end();
});
// http://localhost:3000/HistorySet2Shipsabuy
app.get('/HistorySet2Shipsabuy', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/HistorySet2Shipsabuy.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));     
	}
	response.end();
});
// http://localhost:3000/HistorySet3Shipsabuy
app.get('/HistorySet3Shipsabuy', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/HistorySet3Shipsabuy.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));     
	}
	response.end();
});
// http://localhost:3000/HistorySet1Shipsabuy
app.get('/HistorySet1Shipsabuy', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/HistorySet1Shipsabuy.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));     
	}
	response.end();
});
// http://localhost:3000/HistorySellPageShipsabuy
app.get('/HistorySellPageShipsabuy', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/HistorySellPageShipsabuy.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));     
	}
	response.end();
});
// http://localhost:3000/HistorySellPageFlash
app.get('/HistorySellPageFlash', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/HistorySellPageFlash.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));     
	}
	response.end();
});
// http://localhost:3000/HistorySellPageBitkub
app.get('/HistorySellPageBitkub', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/HistorySellPageBitkub.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));     
	}
	response.end();
});
// http://localhost:3000/HistorySellPage
app.get('/HistorySellPage', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/HistorySellPage.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));     
	}
	response.end();
});
// http://localhost:3000/HistoryBuyPageShipsabuy
app.get('/HistoryBuyPageShipsabuy', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/HistoryBuyPageShipsabuy.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));     
	}
	response.end();
});
// http://localhost:3000/HistoryBuyPageFlash
app.get('/HistoryBuyPageFlash', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/HistoryBuyPageFlash.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));     
	}
	response.end();
});
// http://localhost:3000/HistoryBuyPageBitkub
app.get('/HistoryBuyPageBitkub', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/HistoryBuyPageBitkub.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));     
	}
	response.end();
});
// http://localhost:3000/HistoryBuyPage
app.get('/HistoryBuyPage', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		return response.sendFile(path.join(__dirname + '/HistoryBuyPage.html'));
	} else {
		// Not logged in
		return response.sendFile(path.join(__dirname + '/login.html'));     
	}
	response.end();
});



//   // http://localhost:3000/
//   app.get('/', function(request, response) {
// 	// Render login template
// 	response.sendFile(path.join(__dirname + '/login.html'));
// });

// //login
// app.post('/login', jsonParser, function (req, res, next) {
//     console.log('login', req.body.email, req.body.password);
//     db.execute(
//        ' SELECT * FROM users WHERE email=?',
//        [req.body.email],
//        function(err, users, fields) {
//            if(err) {res.json({status : 'eroor', message: err}); return }
//            if(users.length == 0) {res.json({status : 'eroor', message: 'no users found!'}); return }
//            bcrypt.compare(req.body.password, users[0].password, function(err, isLogin) {
//                if (isLogin) {
//                    var token = jwt.sign({ email: users[0].email }, secret, { expiresIn: '12h' });
//                    res.json({status: 'ok',message:'login success!',token})
                   
//                }else{
//                    res.json({status: 'error',message:'login failed!'})
//                }
//            });
//            }
//        );
// })

//    //authen
//    app.post('/authen', jsonParser, function (req, res, next) {
//        try{
//            const token = req.headers.authorization.split(' ')[1]
//            var decoded = jwt.verify(token, secret);
//            res.json({status: 'ok', decoded})  
//            response.sendFile(path.join(__dirname + '/home.html'));
//        } catch(err){
//            res.json({status: 'error', message: err.message})
//            response.end();
//        }
//    })

// // http://localhost:3000/home
// app.get('/home', function(request, response) {
// 	// If the user is loggedin
// 	if (request.session.loggedin) {
// 		// Output username
// 		return response.sendFile(path.join(__dirname + '/home.html'));
// 	} else {
// 		// Not logged in
// 		return response.sendFile(path.join(__dirname + '/login.html'));
// 	}
// 	response.end();
// });

const server = app.listen(3000,()=> {
    console.log ('nodejs is running on port 3000!')
})

//create
app.post('/api/createstock', (req, res)=>{
    var stockname = _.get(req, ['body', 'name']);
    var stockquantity = _.get(req, ['body', 'quantity']);

    console.log('stockname', stockname)
    console.log('stockquantity', stockquantity)

    try {
        if(stockname && stockquantity){
            db.query('insert into tbl_stock (name, quantity) values (?,?)',[
                stockname, stockquantity
            ],(err, resp, field)=>{
                if(resp) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success'
                        
                    }) 
                }
                else{
                    console.log('ERR 2! : bad sql ')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: bad sql ',
                        Log: 2
                    }) 
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid request')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid request',
                Log: 1
            })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})
//create shipsabuy
app.post('/api/createstockshipsabuy', (req, res)=>{
    var stockname = _.get(req, ['body', 'name']);
    var stockquantity = _.get(req, ['body', 'quantity']);

    console.log('stockname', stockname)
    console.log('stockquantity', stockquantity)

    try {
        if(stockname && stockquantity){
            db.query('insert into tbl_stock_shipsabuy (name, quantity) values (?,?)',[
                stockname, stockquantity
            ],(err, resp, field)=>{
                if(resp) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success'
                        
                    }) 
                }
                else{
                    console.log('ERR 2! : bad sql ')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: bad sql ',
                        Log: 2
                    }) 
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid request')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid request',
                Log: 1
            })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})
//create flash
app.post('/api/createstockflash', (req, res)=>{
    var stockname = _.get(req, ['body', 'name']);
    var stockquantity = _.get(req, ['body', 'quantity']);

    console.log('stockname', stockname)
    console.log('stockquantity', stockquantity)

    try {
        if(stockname && stockquantity){
            db.query('insert into tbl_stock_flash (name, quantity) values (?,?)',[
                stockname, stockquantity
            ],(err, resp, field)=>{
                if(resp) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success'
                        
                    }) 
                }
                else{
                    console.log('ERR 2! : bad sql ')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: bad sql ',
                        Log: 2
                    }) 
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid request')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid request',
                Log: 1
            })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})
//create bitkub
app.post('/api/createstockbitkub', (req, res)=>{
    var stockname = _.get(req, ['body', 'name']);
    var stockquantity = _.get(req, ['body', 'quantity']);

    console.log('stockname', stockname)
    console.log('stockquantity', stockquantity)

    try {
        if(stockname && stockquantity){
            db.query('insert into tbl_stock_bitkub (name, quantity) values (?,?)',[
                stockname, stockquantity
            ],(err, resp, field)=>{
                if(resp) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success'
                        
                    }) 
                }
                else{
                    console.log('ERR 2! : bad sql ')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: bad sql ',
                        Log: 2
                    }) 
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid request')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid request',
                Log: 1
            })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})

//create requisition
app.post('/api/createrequisition', (req, res)=>{
    var productnames = _.get(req, ['body', 'productnames']);
    var total = _.get(req, ['body', 'total']);
    var detail = _.get(req, ['body', 'detail']);

    console.log('productnames', productnames)
    console.log('total', total)
    console.log('detail', detail)

    try {
        if(productnames && total && detail){
            db.query('insert into requisition (productnames, total, detail) values (?,?,?)',
            [ productnames, total,detail],(err, resp, field)=>{
                if(resp) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success'
                        
                    }) 
                }
                else{
                    console.log('ERR 2! : bad sql ')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: bad sql ',
                        Log: 2
                    }) 
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid request')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid request',
                Log: 1
            })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})

//get shippop
app.get('/api/getallstock',(req, res) => {
    try{
        db.query('select * from tbl_stock', [],
        (err, data, fil) => {
            if(data && data[0] && data) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {
                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})

//get shipsabuy
app.get('/api/getallstockshipsabuy',(req, res) => {
    try{
        db.query('select * from tbl_stock_shipsabuy', [],
        (err, data, fil) => {
            if(data && data[0] && data) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {
                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})

//get flash
app.get('/api/getallstockflash',(req, res) => {
    try{
        db.query('select * from tbl_stock_flash', [],
        (err, data, fil) => {
            if(data && data[0] && data) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {
                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})

//get bitkub
app.get('/api/getallstockbitkub',(req, res) => {
    try{
        db.query('select * from tbl_stock_bitkub', [],
        (err, data, fil) => {
            if(data && data[0] && data) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {
                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})

//get Requisition
app.get('/api/getallstockrequisition',(req, res) => {
    try{
        db.query('select * from requisition', [],
        (err, data, fil) => {
            if(data && data[0] && data) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {
                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
})

// //get shirts
// app.get('/api/getshirts',(req, res) => {
//     try{
//         db.query("select * from tbl_stock WHERE name LIKE '%เสื้อ%';", [],
//         (err, data, fil) => {
//             if(data && data[0] && data) {

//                 return res.status(200).json({
//                     resCode: 200,
//                     ResMessag: 'success',
//                     Result: data
//                 })
//             }
//             else {
//                     console.log('ERR 0! : not found data')
//                     return res.status(200).json({
//                         resCode: 400,
//                         ResMessag: 'bad: not found data',
//                         Log: 1
//                     })
//             }
//         })
//     }
//     catch(error) {
//         console.log('ERR 0! :', error)
//         return res.status(200).json({
//             resCode: 400,
//             ResMessag: 'bad',
//             Log: 0
//         })
//     }
// })
// //get vinil
// app.get('/api/getvinil',(req, res) => {
//     try{
//         db.query("select * from tbl_stock WHERE name LIKE '%ไวนิล%';", [],
//         (err, data, fil) => {
//             if(data && data[0] && data) {

//                 return res.status(200).json({
//                     resCode: 200,
//                     ResMessag: 'success',
//                     Result: data
//                 })
//             }
//             else {
//                     console.log('ERR 0! : not found data')
//                     return res.status(200).json({
//                         resCode: 400,
//                         ResMessag: 'bad: not found data',
//                         Log: 1
//                     })
//             }
//         })
//     }
//     catch(error) {
//         console.log('ERR 0! :', error)
//         return res.status(200).json({
//             resCode: 400,
//             ResMessag: 'bad',
//             Log: 0
//         })
//     }
// })


//getsetproduct
app.get('/api/getsetquantity',(req, res) => {
    try{
        db.query('select * from tbl_set_quantity', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getsetproduct_shipsabuy
app.get('/api/getsetquantityshipsabuy',(req, res) => {
    try{
        db.query('select * from tbl_set_quantity_shipsabuy', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//getbuyhistoryproduct
app.get('/api/getbuyhistory',(req, res) => {
    try{
        db.query('select * from tbl_buy_history', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getbuyhistoryproduct shipsabuy
app.get('/api/getbuyhistoryshipsabuy',(req, res) => {
    try{
        db.query('select * from tbl_buy_history_shipsabuy', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getbuyhistoryproduct flash
app.get('/api/getbuyhistoryflash',(req, res) => {
    try{
        db.query('select * from tbl_buy_history_flash', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getbuyhistoryproduct bitkub
app.get('/api/getbuyhistorybitkub',(req, res) => {
    try{
        db.query('select * from tbl_buy_history_bitkub', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//getsellhistoryproduct
app.get('/api/getsellhistory',(req, res) => {
    try{
        db.query('select * from tbl_sell_history', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//getsellhistoryproduct shipsabuy
app.get('/api/getsellhistoryshipsabuy',(req, res) => {
    try{
        db.query('select * from tbl_sell_history_shipsabuy', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getsellhistoryproduct flash
app.get('/api/getsellhistoryflash',(req, res) => {
    try{
        db.query('select * from tbl_sell_history_flash', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getsellhistoryproduct bitkub
app.get('/api/getsellhistorybitkub',(req, res) => {
    try{
        db.query('select * from tbl_sell_history_bitkub', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//getsellset1 historyproduct
app.get('/api/getset1history',(req, res) => {
    try{
        db.query('select * from tbl_set1_history', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getsellset2 historyproduct
app.get('/api/getset2history',(req, res) => {
    try{
        db.query('select * from tbl_set2_history', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getsellset3 historyproduct
app.get('/api/getset3history',(req, res) => {
    try{
        db.query('select * from tbl_set3_history', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//getsellset1 historyproduct shipsabuy
app.get('/api/getset1history',(req, res) => {
    try{
        db.query('select * from tbl_set1_history_shipsabuy', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getsellset2 historyproduct shipsabuy
app.get('/api/getset2historyshipsabuy',(req, res) => {
    try{
        db.query('select * from tbl_set2_history_shipsabuy', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getsellset3 historyproduct shipsabuy
app.get('/api/getset3historyshipsabuy',(req, res) => {
    try{
        db.query('select * from tbl_set3_history_shipsabuy', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//getsellset4 historyproduct shipsabuy
app.get('/api/getset4historyshipsabuy',(req, res) => {
    try{
        db.query('select * from tbl_set4_history_shipsabuy', [],
        (err, data, fil) => {
            if(data && data[0]) {

                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'success',
                    Result: data
                })
            }
            else {

                    console.log('ERR 0! : not found data')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: not found data',
                        Log: 1
                    })
            }
        })

    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

// //get by id
// app.get('/api/getallstockbyid',(req, res) => {
//     var stockid = _.get(req, ['body', 'id']);

//     try{
//         if(stockid){
//             db.query('select * from tbl_stock where id = ?', [
//                 stockid
//             ],
//             (err, data, fil) => {
//                 if(data && data[0]) {
    
//                     for (let i = 0; i < data.length; i++) {
//                         delete data[i].id
                        
//                     }
    
//                     return res.status(200).json({
//                         resCode: 200,
//                         ResMessag: 'success',
//                         Result: data
//                     })
//                 }
//                 else {
    
//                         console.log('ERR 1! : not found data')
//                         return res.status(200).json({
//                             resCode: 400,
//                             ResMessag: 'bad: not found data',
//                             Log: 1
//                         })
//                 }
//             })
//         }
//         else{
//             console.log('ERR 2! : Invalid data')
//             return res.status(200).json({
//                 resCode: 400,
//                 ResMessag: 'bad: Invalid data',
//                 Log: 2
//             })
//         }
        

//     }
//     catch(error) {
//         console.log('ERR 0! :', error)
//         return res.status(200).json({
//             resCode: 400,
//             ResMessag: 'bad',
//             Log: 0
//         })

//     }
// })

//Update
app.put('/api/updatestock', (req, res)=>{
    var id = _.get(req, ['body', 'id']);
    var name = _.get(req, ['body', 'name']);
    var quantity = _.get(req, ['body', 'quantity']);

    try{
        if(id && name && quantity) {
            db.query('update tbl_stock set name = ?, quantity = ? where id = ? ', [
                name, quantity, parseInt(id) 
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail',
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//Update shipsabuy
app.put('/api/updatestockshipsabuy', (req, res)=>{
    var id = _.get(req, ['body', 'id']);
    var name = _.get(req, ['body', 'name']);
    var quantity = _.get(req, ['body', 'quantity']);

    try{
        if(id && name && quantity) {
            db.query('update tbl_stock_shipsabuy set name = ?, quantity = ? where id = ? ', [
                name, quantity, parseInt(id) 
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail',
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//Update flash
app.put('/api/updatestockflash', (req, res)=>{
    var id = _.get(req, ['body', 'id']);
    var name = _.get(req, ['body', 'name']);
    var quantity = _.get(req, ['body', 'quantity']);

    try{
        if(id && name && quantity) {
            db.query('update tbl_stock_flash set name = ?, quantity = ? where id = ? ', [
                name, quantity, parseInt(id) 
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail',
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//Update bitkub
app.put('/api/updatestockbitkub', (req, res)=>{
    var id = _.get(req, ['body', 'id']);
    var name = _.get(req, ['body', 'name']);
    var quantity = _.get(req, ['body', 'quantity']);

    try{
        if(id && name && quantity) {
            db.query('update tbl_stock_bitkub set name = ?, quantity = ? where id = ? ', [
                name, quantity, parseInt(id) 
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail',
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//insert buy
app.post('/api/insertstock', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);


    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            db.query('insert into tbl_buy_history (Date, stockname, quantity, invoid_no) values (?,?,?,?) ', [
                Date, stockname, quantity, invoid_no
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//insert buy shipsabuy
app.post('/api/insertstockshipsabuy', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);


    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            db.query('insert into tbl_buy_history_shipsabuy (Date, stockname, quantity, invoid_no) values (?,?,?,?) ', [
                Date, stockname, quantity, invoid_no
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//insert buy flash
app.post('/api/insertstockflash', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);


    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            db.query('insert into tbl_buy_history_flash (Date, stockname, quantity, invoid_no) values (?,?,?,?) ', [
                Date, stockname, quantity, invoid_no
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//insert buy bitkub
app.post('/api/insertstockbitkub', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);


    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            db.query('insert into tbl_buy_history_bitkub (Date, stockname, quantity, invoid_no) values (?,?,?,?) ', [
                Date, stockname, quantity, invoid_no
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//insert sell
app.post('/api/insertsellstock', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);


    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            db.query('insert into tbl_sell_history (Date, stockname, quantity, invoid_no) values (?,?,?,?) ', [
                Date, stockname, quantity, invoid_no
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//insert sell shipsabuy
app.post('/api/insertsellstockshipsabuy', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);


    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            db.query('insert into tbl_sell_history_shipsabuy (Date, stockname, quantity, invoid_no) values (?,?,?,?) ', [
                Date, stockname, quantity, invoid_no
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//insert sell flash
app.post('/api/insertsellstockflash', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);


    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            db.query('insert into tbl_sell_history_flash (Date, stockname, quantity, invoid_no) values (?,?,?,?) ', [
                Date, stockname, quantity, invoid_no
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//insert sell bitkub
app.post('/api/insertsellstockbitkub', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);


    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            db.query('insert into tbl_sell_history_bitkub (Date, stockname, quantity, invoid_no) values (?,?,?,?) ', [
                Date, stockname, quantity, invoid_no
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//insert set1
app.post('/api/insertset1stock', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);


    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            db.query('insert into tbl_set1_history (Date, stockname, quantity, invoid_no) values (?,?,?,?) ', [
                Date, stockname, quantity, invoid_no
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//insert set2
app.post('/api/insertset2stock', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);


    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            db.query('insert into tbl_set2_history (Date, stockname, quantity, invoid_no) values (?,?,?,?) ', [
                Date, stockname, quantity, invoid_no
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})


//insert set3
app.post('/api/insertset3stock', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);


    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            db.query('insert into tbl_set3_history (Date, stockname, quantity, invoid_no) values (?,?,?,?) ', [
                Date, stockname, quantity, invoid_no
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//insert set1 shipsabuy
app.post('/api/insertset1stockshipsabuy', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);


    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            db.query('insert into tbl_set1_history_shipsabuy (Date, stockname, quantity, invoid_no) values (?,?,?,?) ', [
                Date, stockname, quantity, invoid_no
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})

//insert set2 shipsabuy
app.post('/api/insertset2stockshipsabuy', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);


    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            db.query('insert into tbl_set2_history_shipsabuy (Date, stockname, quantity, invoid_no) values (?,?,?,?) ', [
                Date, stockname, quantity, invoid_no
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})


//insert set3 shipsabuy
app.post('/api/insertset3stockshipsabuy', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);


    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            db.query('insert into tbl_set3_history_shipsabuy (Date, stockname, quantity, invoid_no) values (?,?,?,?) ', [
                Date, stockname, quantity, invoid_no
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})
//insert set4 shipsabuy
app.post('/api/insertset4stockshipsabuy', (req, res)=>{

    var Date = _.get(req, ['body', 'Date']);
    var stockname = _.get(req, ['body', 'stockname']);
    var quantity = _.get(req, ['body', 'quantity']);
    var invoid_no = _.get(req, ['body', 'invoid_no']);


    console.log('Date', Date)
    console.log('stockname', stockname)
    console.log('quantity', quantity)
    console.log('invoid_no', invoid_no)

    try{
        if( Date &&  stockname && quantity ) {
            db.query('insert into tbl_set4_history_shipsabuy (Date, stockname, quantity, invoid_no) values (?,?,?,?) ', [
                Date, stockname, quantity, invoid_no
            ], (err, data, fil)=>{
                if(data) {
                    return res.status(200).json({
                        resCode: 200,
                        ResMessag: 'success',
                        
                     })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        resCode: 400,
                        ResMessag: 'bad: Update fail'+ err,
                        Log: 2
                     })
                }
            })
        }
        else{
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                resCode: 400,
                ResMessag: 'bad: Invalid data',
                Log: 1
            }) 
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })

    }
})





//delete
app.delete('/api/deletestock',(req, res) => {
    var id = _.get(req, ['body', 'id']);
    try {
        if(id) {
            db.query ('delete from tbl_stock where id = ?',[
                parseInt(id)
            ],(err, resp, fil)=>{
               if(resp) {
                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'good!',
                })
               }
               else {
                console.log('ERR 2! :bad sql')
                return res.status(200).json({
                    resCode: 400,
                    ResMessag: 'bad: bad sql',
                    Log: 2
                })
               } 
            })
        }
        else {
            console.log('ERR 1! :Invalid id')
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad: invalid id',
            Log: 1
        })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
    
})

//delete shipsabuy
app.delete('/api/deletestockshipsabuy',(req, res) => {
    var id = _.get(req, ['body', 'id']);
    try {
        if(id) {
            db.query ('delete from tbl_stock_shipsabuy where id = ?',[
                parseInt(id)
            ],(err, resp, fil)=>{
               if(resp) {
                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'good!',
                })
               }
               else {
                console.log('ERR 2! :bad sql')
                return res.status(200).json({
                    resCode: 400,
                    ResMessag: 'bad: bad sql',
                    Log: 2
                })
               } 
            })
        }
        else {
            console.log('ERR 1! :Invalid id')
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad: invalid id',
            Log: 1
        })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
    
})
//delete flash
app.delete('/api/deletestockflash',(req, res) => {
    var id = _.get(req, ['body', 'id']);
    try {
        if(id) {
            db.query ('delete from tbl_stock_flash where id = ?',[
                parseInt(id)
            ],(err, resp, fil)=>{
               if(resp) {
                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'good!',
                })
               }
               else {
                console.log('ERR 2! :bad sql')
                return res.status(200).json({
                    resCode: 400,
                    ResMessag: 'bad: bad sql',
                    Log: 2
                })
               } 
            })
        }
        else {
            console.log('ERR 1! :Invalid id')
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad: invalid id',
            Log: 1
        })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
    
})
//delete bitkub
app.delete('/api/deletestockbitkub',(req, res) => {
    var id = _.get(req, ['body', 'id']);
    try {
        if(id) {
            db.query ('delete from tbl_stock_bitkub where id = ?',[
                parseInt(id)
            ],(err, resp, fil)=>{
               if(resp) {
                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'good!',
                })
               }
               else {
                console.log('ERR 2! :bad sql')
                return res.status(200).json({
                    resCode: 400,
                    ResMessag: 'bad: bad sql',
                    Log: 2
                })
               } 
            })
        }
        else {
            console.log('ERR 1! :Invalid id')
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad: invalid id',
            Log: 1
        })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
    
})

//delete requisition
app.delete('/api/deletestockrequisition',(req, res) => {
    var id = _.get(req, ['body', 'id']);
    try {
        if(id) {
            db.query ('delete from requisition where id = ?',[
                parseInt(id)
            ],(err, resp, fil)=>{
               if(resp) {
                return res.status(200).json({
                    resCode: 200,
                    ResMessag: 'good!',
                })
               }
               else {
                console.log('ERR 2! :bad sql')
                return res.status(200).json({
                    resCode: 400,
                    ResMessag: 'bad: bad sql',
                    Log: 2
                })
               } 
            })
        }
        else {
            console.log('ERR 1! :Invalid id')
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad: invalid id',
            Log: 1
        })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            resCode: 400,
            ResMessag: 'bad',
            Log: 0
        })
    }
    
})



module.exports = app;