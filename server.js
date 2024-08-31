const express = require('express')
const app = express()
const port = 3001
const cors = require("cors")
const mysql = require('mysql');
const path = require("path")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const fs = require('fs');
const axios = require("axios")
dotenv.config({ path:'./.env'})

app.use(cors());
app.use(express.json());

app.use('/', express.static(path.join(__dirname, '/')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, "components/uploads");
  },
  filename: function (req, file, cb) {
  cb(null, Date.now() + "-" + file.originalname);
  },
});

upload = multer({ storage: storage });

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'grocery',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// ==============================================================Users==============================================================


//Signup
app.post('/signup', (req, res) => {
    jwt.sign(req.body.password, process.env.SECRET_KEY, (err, token) => {
      const query = `INSERT INTO user(name, email, mobile, password) VALUES (?)`; 
      const values = [req.body.name, req.body.email, req.body.mobile, token]
      db.query(query,[values], (err, results) => {
        if (err) {
            if (err.errno == 1062)
            {
                res.json(err.errno)
                return;
            }
            else{
                res.status(500).json({ error: 'Error fetching data from the database' });
                return;
            }
          console.error('Error executing the query:', err);
        }
        res.json(results);
      });
      console.log('token = ', token)
    })
}); 

//get user
app.post('/getuser',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
      if(err){
        res.sendStatus(403)
      }
      else{
        const query = `SELECT * FROM user WHERE id = "${authData.User_Id}";`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
      }
    })
})

//edit user:
app.post('/edituser',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
      if(err){
        res.sendStatus(403)
      }
      else{
        const query = `UPDATE user SET name = "${req.body.name}", mobile = "${req.body.mobile}", email = "${req.body.email}", updated_at = CURRENT_TIMESTAMP WHERE id = "${authData.User_Id}";`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
      }
    })
})

//get user location 
app.post('/getlocations',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
      if(err){
        res.sendStatus(403)
      }
      else{
        const query = `SELECT * FROM location WHERE user_id = "${authData.User_Id}" AND status = 1;`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
      }
    })
})

//add user location
app.post('/addlocation',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
      if(err){
        res.sendStatus(403)
      }
      else{
        const query = `INSERT INTO location(user_id, address) VALUES(?,?);`
        const values = [authData.User_Id, req.body.address]
        db.query(query,values,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
      }
    })
})

//Delete user location
app.post('/deletelocation/:id',(req,res) => {
    const query = `UPDATE location SET status = 0 WHERE id = ${req.params.id};`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})



//Validator:
app.post('/validate',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
        if(err){
          res.sendStatus(403)
        }
        else{
          const query = `SELECT * FROM tokenizer WHERE user_id = ${authData.User_Id};`
          db.query(query,((err,results) => {
              if(err)
              {
                  res.status(500).json({ error: 'Error fetching data from the database' });
                  console.log(err)
              }
              else{
                  res.json(results)
              }
          }))
        }
      })
});

//internal Validator:
app.post('/updatetoken',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
        if(err){
          res.sendStatus(403)
        }
        else{
          const query = `UPDATE tokenizer set token = "${req.body.token}", updated_at = CURRENT_TIMESTAMP WHERE user_id = ${authData.User_Id};`
          db.query(query,((err,results) => {
              if(err)
              {
                  res.status(500).json({ error: 'Error fetching data from the database' });
                  console.log(err)
              }
              else{
                  res.json(results)
              }
          }))
        }
      })
});

//token Adder:
app.post('/addtoken',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
        if(err){
          res.sendStatus(403)
        }
        else{
          const query = `INSERT INTO tokenizer(token, user_id) VALUES("${req.body.token}", "${authData.User_Id}");`
          db.query(query,((err,results) => {
              if(err)
              {
                  res.status(500).json({ error: 'Error fetching data from the database' });
                  console.log(err)
              }
              else{
                  res.json(results)
              }
          }))
        }
      })
});

//delete token:
app.post('/deletetoken',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
        if(err){
          res.sendStatus(403)
        }
        else{
          const query = `DELETE FROM tokenizer WHERE token = "${req.body.token}" AND user_id = ${authData.User_Id};`
          db.query(query,((err,results) => {
              if(err)
              {
                  res.status(500).json({ error: 'Error fetching data from the database' });
                  console.log(err)
              }
              else{
                  res.json(results)
              }
          }))
        }
      })
});

//login
app.post('/login',(req,res) => {
    console.log(req.body.email,req.body.password)
    jwt.sign(req.body.password,process.env.SECRET_KEY, (err, token) => {
        console.log(token)
      const query = `SELECT * FROM user WHERE email = "${req.body.email}" AND password = "${token}";`; 
      db.query(query, (err, results) => {
        if (err) {
          console.error('Error executing the query:', err);
          res.json({ error: 'Error fetching data from the database' });
        }
        if(results.length > 0)
        {
          const ndate = new Date().toLocaleString()
          jwt.sign({User_Id: results[0].id, User_name : results[0].name, Ip : req.body.ip, date : ndate}, process.env.SECRET_KEY, (err, token) => {
            res.json(token);
          })
        }
        else{
          res.json(results)
        }
      });
    })
});



//update location
app.post('/updatelocation',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
      if(err){
        res.sendStatus(403)
      }
      else{
        const query = `UPDATE location SET address = "${req.body.address}" WHERE user_id = "${authData.User_Id}";`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
      }
    })
})


//favorites
//add favorites
app.post('/addfavorites',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
        if(err){
          res.sendStatus(403)
        }
        else{
          const query = `INSERT INTO favorites(user_id, item_id) VALUES("${authData.User_Id}", "${req.body.item_id}");`
          db.query(query,((err,results) => {
              if(err)
              {
                  res.status(500).json({ error: 'Error fetching data from the database' });
                  console.log(err)
              }
              else{
                  res.json(results)
              }
          }))
        }
      })

});

//check favorites:
app.post('/checkfavorites',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
        if(err){
          res.sendStatus(403)
        }
        else{
          const query = `SELECT * FROM favorites WHERE user_id = "${authData.User_Id}" AND item_id = "${req.body.item_id}";`
          db.query(query,((err,results) => {
              if(err)
              {
                  res.status(500).json({ error: 'Error fetching data from the database' });
                  console.log(err)
              }
              else{
                  res.json(results)
              }
          }))
        }
      })
});



//delete favorites
app.post('/deletefavorites',(req,res) => {

    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
        if(err){
          res.sendStatus(403)
        }
        else{
            const query = `DELETE FROM favorites WHERE item_id = ${req.body.item_id} AND user_id = "${authData.User_Id}";`
          db.query(query,((err,results) => {
              if(err)
              {
                  res.status(500).json({ error: 'Error fetching data from the database' });
                  console.log(err)
              }
              else{
                  res.json(results)
              }
          }))
        }
      })

});

//get favorites
app.post('/getfavorites',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
        if(err){
          res.sendStatus(403)
        }
        else{
          const query = `SELECT favorites.*, items.id AS item_id, units.*, items.*, images.image FROM favorites JOIN items ON favorites.item_id = items.id JOIN images ON favorites.item_id = images.item_id JOIN units ON items.unit_id = units.id WHERE favorites.user_id = ${authData.User_Id} GROUP BY favorites.item_id;`
          db.query(query,((err,results) => {
              if(err)
              {
                  res.status(500).json({ error: 'Error fetching data from the database' });
                  console.log(err)
              }
              else{
                  res.json(results)
              }
          }))
        }
      })

});

//ratings
//add ratings
app.post('/addratings',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
        if(err){
          res.sendStatus(403)
        }
        else{
          const query = `INSERT INTO ratings(user_id, item_id, rating) VALUES("${authData.User_Id}", "${req.body.item_id}", "${req.body.rating}");`
          db.query(query,((err,results) => {
              if(err)
              {
                if(err.errno == 1062)
                {
                    res.json(err.errno);
                    console.log(err)

                }
                else{
                    res.status(500).json({ error: 'Error fetching data from the database' });
                    console.log(err)
                }
              }
              else{
                  res.json(results)
              }
          }))
        }
      })

});

//get 1 item rating
app.get('/getratings/:id',(req,res) => {
    const query = `SELECT rating from ratings WHERE item_id = ${req.params.id};`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
});



// ==============================================================Items==============================================================


//==========Items
//add item
app.post("/additem",(req,res) => {
    const query = `INSERT INTO items(name, summary, description, category_id, quantity, price, unit_id) VALUES(?,?,?,?,?,?);`
    const values = [req.body.name, req.body.summary, req.body.description, req.body.category, req.body.quantity, req.body.price, req.body.unit_id]
    db.query(query,values,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

//edit item
app.post("/edititem/:id",(req,res) => {
    const query = `UPDATE items SET name = ?, summary = ?, description = ?, category_id = ?, quantity = ?, price = ?, unit_id = ? WHERE id = ${req.params.id};`
    const values = [req.body.name, req.body.summary, req.body.description, req.body.category, req.body.quantity, req.body.price, req.body.unit_id]
    db.query(query,values,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

//status item
app.get("/deleteitem/:id",(req,res) => {
    const query = `UPDATE items SET status = CASE WHEN status = 0 THEN 1 ELSE 0 END WHERE id = ${req.params.id};`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

//get all item
app.get("/getallitem",(req,res) => {
    const query = `SELECT items.*, units.* FROM items JOIN units ON items.unit_id = units.id;`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

//get item
app.get("/getitem",(req,res) => {
    const query = `SELECT * FROM items WHERE status = 1;`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

//1 item 1 image
app.get("/one_item_one_image",(req,res) => {
    const query = `SELECT items.*, items.id AS item_id, units.*, images.image FROM items JOIN images ON items.id = images.item_id JOIN units ON items.unit_id = units.id WHERE items.status = 1 GROUP BY items.id;`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

//get one item
app.get("/getoneitem/:id",(req,res) => {
    const query = `SELECT items.*, units.* FROM items JOIN units ON items.unit_id = units.id WHERE items.id = "${req.params.id}";`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

//get item by category
app.get("/getcatitem/:id",(req,res) => {
    const query = `SELECT items.*, items.id AS item_id, units.*, images.image FROM items JOIN images ON items.id = images.item_id JOIN units ON items.unit_id = units.id WHERE items.status = 1 AND category_id = "${req.params.id}" GROUP BY items.id;`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})


//get item by Filter
app.post("/filteritem",(req,res) => {
    console.log(req.body.category)
    console.log(req.body.price)
    if(req.body.category == null && req.body.price != null)
    {
        const query = `SELECT items.*, items.id AS item_id, units.*, images.image FROM items JOIN images ON items.id = images.item_id JOIN units ON items.unit_id = units.id WHERE items.status = 1 AND price BETWEEN 0 AND ${req.body.price} GROUP BY items.id;`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
    }
    else if(req.body.category != null && req.body.price == null)
    {
        const query = `SELECT items.*, items.id AS item_id, units.*, images.image FROM items JOIN images ON items.id = images.item_id JOIN units ON items.unit_id = units.id WHERE items.status = 1 AND category_id = "${req.body.category}" GROUP BY items.id;`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
    }
    else{
        const query = `SELECT items.*, items.id AS item_id, units.*, images.image FROM items JOIN images ON items.id = images.item_id JOIN units ON items.unit_id = units.id WHERE items.status = 1 AND category_id = ${req.body.category} AND price BETWEEN 0 AND ${req.body.price} GROUP BY items.id;`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
    }
})


//==========Items

//==========Items Images
//add item image
app.post("/additemimage", upload.single("file"), (req, res) => {
    db.query(
      `INSERT INTO images(item_id, image) VALUES('${req.body.item_id}', '${req.file.filename}');`,
    (err, result) => {
    if (err) {
  
    res.status(500).send(err);
    } else {
  
    res.json("File uploaded and stored in database")
    }
    }
    );
  });

//delete item image
app.post("/deleteitemimage/:id",(req,res) => {
    const query = `DELETE FROM images WHERE id = "${req.params.id}";`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            fs.unlink(`./components/uploads/${req.body.image}`, (err) => {
                if (err) {
                console.error(err);
                } else {
                console.log('File deleted successfully');
                }
                });
            res.json(results)
        }
    }))
})

//get 1 item images
app.get("/getoneitemimages/:id",(req,res) => {
    const query = `SELECT image FROM images WHERE item_id = "${req.params.id}";`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

//get all item images
app.get("/getitemimages/:id",(req,res) => {
    const query = `SELECT * FROM images WHERE item_id = ${req.params.id};`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})


//==========Items Images


// ==========Category
// Add

app.post("/addcategory", upload.single("file"), (req, res) => {
    db.query(
      `INSERT INTO category(name, image) VALUES('${req.body.name}', '${req.file.filename}');`,
    (err, result) => {
    if (err) {
  
    res.status(500).send(err);
    } else {
  
    res.json("File uploaded and stored in database")
    }
    }
    );
  });


//get
app.get("/getcategory",(req,res) => {
    const query = `SELECT * FROM category WHERE status = 1;`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

//getall
app.get("/getallcategory",(req,res) => {
    const query = `SELECT * FROM category;`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

//status
app.get("/deletecategory/:id",(req,res) => {
    const query = `UPDATE category SET status = CASE WHEN status = 0 THEN 1 ELSE 0 END WHERE id = ${req.params.id};`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

// ==========Category

// ==========CARTS

//cart item check
app.post('/cartcheck',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
      if(err){
        res.sendStatus(403)
      }
      else{
        const query = `SELECT * FROM cart WHERE user_id = "${authData.User_Id}" AND item_id = ${req.body.item_id};`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
      }
    })
})

//Add to cart
app.post('/addtocart',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
      if(err){
        res.sendStatus(403)
      }
      else{
        const query = `INSERT INTO cart(user_id, item_id, count) VALUES("${authData.User_Id}", ${req.body.item_id}, ${req.body.count});`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
      }
    })
})

//update to cart
app.post('/updatecart',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
      if(err){
        res.sendStatus(403)
      }
      else{
        const query = `UPDATE cart SET count = count + ${req.body.count} WHERE user_id = "${authData.User_Id}" AND item_id = ${req.body.item_id};`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
      }
    })
})

//delete from cart
app.post('/deletecart',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
      if(err){
        res.sendStatus(403)
      }
      else{
        const query = `DELETE FROM cart WHERE user_id = "${authData.User_Id}" AND item_id = ${req.body.item_id};`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
      }
    })
})

//delete all from cart
app.post('/deleteallcart',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
      if(err){
        res.sendStatus(403)
      }
      else{
        const query = `DELETE FROM cart WHERE user_id = "${authData.User_Id}"`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
      }
    })
})

//Get from cart
app.post('/getcart',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
      if(err){
        res.sendStatus(403)
      }
      else{
        const query = `SELECT items.*, units.*, items.id AS item_id, items.id AS item_id, images.image, cart.count FROM cart JOIN items ON cart.item_id = items.id LEFT JOIN (SELECT item_id, image FROM images GROUP BY item_id) AS images ON cart.item_id = images.item_id JOIN units ON units.id = items.unit_id WHERE cart.user_id = "${authData.User_Id}";`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
      }
    })
})

//reduce item_count
app.post('/reduceitem',(req,res) => {
    const query = `UPDATE items SET quantity = quantity - ${req.body.quantity} WHERE id = ${req.body.item_id};`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

//increase item_count
app.post('/increaseitem',(req,res) => {
    const query = `UPDATE items SET quantity = quantity + ${req.body.quantity} WHERE id = ${req.body.item_id};`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})


//Cart reducer
app.post('/cartreducer',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
      if(err){
        res.sendStatus(403)
      }
      else{
        const query = `UPDATE cart SET count = count - 1 WHERE user_id = "${authData.User_Id}" AND item_id = ${req.body.item_id};`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
      }
    })
})

//Cart adder
app.post('/cartadder',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
      if(err){
        res.sendStatus(403)
      }
      else{
        const query = `UPDATE cart SET count = count + 1 WHERE user_id = "${authData.User_Id}" AND item_id = ${req.body.item_id};`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
      }
    })
})


// ==========CARTS

// ==========Orders

//add orders
app.post('/addorders',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
      if(err){
        res.sendStatus(403)
      }
      else{
        const query = `INSERT INTO orders (user_id, order_number, item_id, count, location_id) SELECT user_id, ${req.body.order_number}, item_id, count, ${req.body.address} FROM cart WHERE user_id = ${authData.User_Id};`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
      }
    })
})

//get ordernumber:
app.post('/getordernumber',(req,res) => {
    const query = `SELECT * FROM orders WHERE order_number = "${req.body.order_number}";`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

//get orders
app.post('/getorders',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
      if(err){
        res.sendStatus(403)
      }
      else{
        const query = `SELECT * FROM orders WHERE user_id = ${authData.User_Id};`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
      }
    })
})

//cancel orders
app.post('/cancelorders',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
        if(err){
          res.sendStatus(403)
        }
        else{
            const query = `UPDATE orders SET status = 2 WHERE order_number = "${req.body.order_number}" AND user_id = ${authData.User_Id}`
            db.query(query,((err,results) => {
                if(err)
                {
                    res.status(500).json({ error: 'Error fetching data from the database' });
                    console.log(err)
                }
                else{
                    res.json(results)
                }
            }))
        }
      })
})

//My orders on process
app.post('/getonprogress',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
      if(err){
        res.sendStatus(403)
      }
      else{
        const query = `SELECT orders.*, units.*, items.id AS item_id, items.*, images.image, user.name AS user_name FROM orders JOIN items ON orders.item_id = items.id LEFT JOIN (SELECT item_id, image FROM images GROUP BY item_id ) images ON orders.item_id = images.item_id JOIN user ON user.id = orders.user_id JOIN units ON units.id = items.unit_id WHERE orders.user_id = ${authData.User_Id} AND orders.status = 1;`

        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
      }
    })
})

//My orders on process
app.post('/getcanceled',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
      if(err){
        res.sendStatus(403)
      }
      else{
        const query = `SELECT orders.*, units.*, items.id AS item_id, items.*, images.image, user.name AS user_name FROM orders JOIN items ON orders.item_id = items.id LEFT JOIN (SELECT item_id, image FROM images GROUP BY item_id ) images ON orders.item_id = images.item_id JOIN user ON user.id = orders.user_id JOIN units ON units.id = items.unit_id WHERE orders.user_id = ${authData.User_Id} AND orders.status = 2;`

        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
      }
    })
})

//My orders on process
app.post('/getcompleted',(req,res) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY, (err, authData) => {
      if(err){
        res.sendStatus(403)
      }
      else{
        const query = `SELECT orders.*, units.*, items.id AS item_id, items.*, images.image, user.name AS user_name FROM orders JOIN items ON orders.item_id = items.id LEFT JOIN (SELECT item_id, image FROM images GROUP BY item_id ) images ON orders.item_id = images.item_id JOIN user ON user.id = orders.user_id JOIN units ON units.id = items.unit_id WHERE orders.user_id = ${authData.User_Id} AND orders.status = 0;`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
      }
    })
})

// ==========Orders

// ==========Delivery Status

//delivered status
app.post('/delivered',(req,res) => {
    const query = `UPDATE orders SET status = 0 WHERE order_number = "${req.body.order_number}"`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

//reversed status
app.post('/returned',(req,res) => {
    const query = `UPDATE orders SET status = 1 WHERE order_number = "${req.body.order_number}"`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})



// ==========Delivery Status

// ==========Contact us

//add contacts
app.post('/addcontacts',(req,res) => {
    const query = `INSERT INTO contacts(name,email,mobile,comment) VALUES(?,?,?,?);`
    const values = [req.body.name,req.body.email,req.body.mobile,req.body.comment]
    db.query(query,values,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})


// ==========Contact us

// ==============================================================Admin==============================================================


//add units
app.post('/addunits',(req,res) => {
    const query = `INSERT INTO units(unit_name) VALUES("${req.body.name}");`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

//get units
app.get('/getunits',(req,res) => {
    const query = `SELECT * FROM units;`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

//edit units
app.post('/updateunits',(req,res) => {
    const query = `UPDATE units SET unit_name = "${req.body.name}", updated_at = CURRENT_TIMESTAMP WHERE id=${req.body.unit_id};`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

//get contacts
app.get('/getcontacts',(req,res) => {
    const query = `SELECT * FROM contacts;`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

//get users
app.get('/getallusers',(req,res) => {
    const query = `SELECT * FROM user;`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})


//ratings filter
app.post('/ratingsfilter',(req,res) => {
    if(req.body.item_id == null)
    {
        const query = `SELECT ratings.*, items.name AS item_name, user.name AS user_name FROM ratings JOIN items ON ratings.item_id = items.id JOIN user ON ratings.user_id = user.id WHERE ratings.user_id = ${req.body.user_id};`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
    }
    else if(req.body.user_id == null)
    {
        const query = `SELECT ratings.*, items.name AS item_name, user.name AS user_name FROM ratings JOIN items ON ratings.item_id = items.id JOIN user ON ratings.user_id = user.id WHERE ratings.item_id = ${req.body.item_id};`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
    }
    else{
        const query = `SELECT ratings.*, items.name AS item_name, user.name AS user_name FROM ratings JOIN items ON ratings.item_id = items.id JOIN user ON ratings.user_id = user.id WHERE ratings.user_id = ${req.body.user_id} AND ratings.item_id = ${req.body.item_id};`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
    }
})

//All Ratings users
app.get('/getallratings',(req,res) => {
    const query = `SELECT ratings.*, items.name AS item_name, user.name AS user_name FROM ratings JOIN items ON ratings.item_id = items.id JOIN user ON ratings.user_id = user.id;`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})


//All orders on process
app.get('/getonprogressadmin',(req,res) => {
    const query = `SELECT orders.* , units.*, items.id AS item_id, items.*, images.image, user.name AS user_name FROM orders JOIN items ON orders.item_id = items.id LEFT JOIN (SELECT item_id, image FROM images GROUP BY item_id ) images ON orders.item_id = images.item_id JOIN user ON user.id = orders.user_id JOIN units ON units.id = items.unit_id WHERE orders.status = 1;`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

//All orders cancelled
app.get('/getcanceledadmin',(req,res) => {
    const query = `SELECT orders.*, units.*, items.id AS item_id, items.*, images.image, user.name AS user_name FROM orders JOIN items ON orders.item_id = items.id LEFT JOIN (SELECT item_id, image FROM images GROUP BY item_id ) images ON orders.item_id = images.item_id JOIN user ON user.id = orders.user_id JOIN units ON units.id = items.unit_id WHERE orders.status = 2;`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)    
        }
        else{
            res.json(results)
        }
    }))
})

//All orders completed
app.get('/getcompletedadmin',(req,res) => {
    const query = `SELECT orders.*, units.*, items.id AS item_id, items.*, images.image, user.name AS user_name FROM orders JOIN items ON orders.item_id = items.id LEFT JOIN (SELECT item_id, image FROM images GROUP BY item_id ) images ON orders.item_id = images.item_id JOIN user ON user.id = orders.user_id JOIN units ON units.id = items.unit_id WHERE orders.status = 0;`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})



//orders filter completed
app.post('/ordersfilter_getcompletedadmin',(req,res) => {
    if(req.body.item_id == null)
    {
        const query = `SELECT orders.*, units.*, items.id AS item_id, items.*, images.image, user.name AS user_name FROM orders JOIN items ON orders.item_id = items.id LEFT JOIN (SELECT item_id, image FROM images GROUP BY item_id ) images ON orders.item_id = images.item_id JOIN user ON user.id = orders.user_id JOIN units ON units.id = items.unit_id WHERE orders.status = 0 AND orders.user_id = ${req.body.user_id};`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
    }
    else if(req.body.user_id == null)
    {
        const query = `SELECT orders.*, units.*, items.id AS item_id, items.*, images.image, user.name AS user_name FROM orders JOIN items ON orders.item_id = items.id LEFT JOIN (SELECT item_id, image FROM images GROUP BY item_id ) images ON orders.item_id = images.item_id JOIN user ON user.id = orders.user_id JOIN units ON units.id = items.unit_id WHERE orders.status = 0 AND orders.item_id = ${req.body.item_id};`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
    }
    else{
        const query = `SELECT orders.*, units.*, items.id AS item_id, items.*, images.image, user.name AS user_name FROM orders JOIN items ON orders.item_id = items.id LEFT JOIN (SELECT item_id, image FROM images GROUP BY item_id ) images ON orders.item_id = images.item_id JOIN user ON user.id = orders.user_id JOIN units ON units.id = items.unit_id WHERE orders.status = 0 AND orders.user_id = ${req.body.user_id} AND orders.item_id = ${req.body.item_id};`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
    }
})

//orders filter inprogress
app.post('/ordersfilter_getonprogressadmin',(req,res) => {
    if(req.body.item_id == null)
    {
        const query = `SELECT orders.*, units.*, items.id AS item_id, items.*, images.image, user.name AS user_name FROM orders JOIN items ON orders.item_id = items.id LEFT JOIN (SELECT item_id, image FROM images GROUP BY item_id ) images ON orders.item_id = images.item_id JOIN user ON user.id = orders.user_id WHERE JOIN units ON units.id = items.unit_id orders.status = 1 AND orders.user_id = ${req.body.user_id};`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
    }
    else if(req.body.user_id == null)
    {
        const query = `SELECT orders.*, units.*, items.id AS item_id, items.*, images.image, user.name AS user_name FROM orders JOIN items ON orders.item_id = items.id LEFT JOIN (SELECT item_id, image FROM images GROUP BY item_id ) images ON orders.item_id = images.item_id JOIN user ON user.id = orders.user_id JOIN units ON units.id = items.unit_id WHERE orders.status = 1 AND orders.item_id = ${req.body.item_id};`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
    }
    else{
        const query = `SELECT orders.*, units.*, items.id AS item_id, items.*, images.image, user.name AS user_name FROM orders JOIN items ON orders.item_id = items.id LEFT JOIN (SELECT item_id, image FROM images GROUP BY item_id ) images ON orders.item_id = images.item_id JOIN user ON user.id = orders.user_id JOIN units ON units.id = items.unit_id WHERE orders.status = 1 AND orders.user_id = ${req.body.user_id} AND orders.item_id = ${req.body.item_id};`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
    }
})

//orders filter cancelled
app.post('/ordersfilter_getcanceledadmin',(req,res) => {
    if(req.body.item_id == null)
    {
        const query = `SELECT orders.*, units.*, items.id AS item_id, items.*, images.image, user.name AS user_name FROM orders JOIN items ON orders.item_id = items.id LEFT JOIN (SELECT item_id, image FROM images GROUP BY item_id ) images ON orders.item_id = images.item_id JOIN user ON user.id = orders.user_id JOIN units ON units.id = items.unit_id WHERE orders.status = 2 AND orders.user_id = ${req.body.user_id};`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
    }
    else if(req.body.user_id == null)
    {
        const query = `SELECT orders.*, units.*, items.id AS item_id, items.*, images.image, user.name AS user_name FROM orders JOIN items ON orders.item_id = items.id LEFT JOIN (SELECT item_id, image FROM images GROUP BY item_id ) images ON orders.item_id = images.item_id JOIN user ON user.id = orders.user_id JOIN units ON units.id = items.unit_id WHERE orders.status = 2 AND orders.item_id = ${req.body.item_id};`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
    }
    else{
        const query = `SELECT orders.*, units*, items.id AS item_id, items.*, images.image, user.name AS user_name FROM orders JOIN items ON orders.item_id = items.id LEFT JOIN (SELECT item_id, image FROM images GROUP BY item_id ) images ON orders.item_id = images.item_id JOIN user ON user.id = orders.user_id JOIN units ON units.id = items.unit_id WHERE orders.status = 2 AND orders.user_id = ${req.body.user_id} AND orders.item_id = ${req.body.item_id};`
        db.query(query,((err,results) => {
            if(err)
            {
                res.status(500).json({ error: 'Error fetching data from the database' });
                console.log(err)
            }
            else{
                res.json(results)
            }
        }))
    }
})


// =====================================Chart============================//

//Completed Item :
app.get('/chart_completed_item',(req,res) => {
    const query = ``
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

//Completed category :
app.get('/chart_completed_category',(req,res) => {
    const query = ``
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

//Cancelled Item :
app.get('/chart_cancelled_item',(req,res) => {
    const query = ``
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

//Cancelled category :
app.get('/chart_completed_category',(req,res) => {
    const query = ``
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

app.get('/total_sold',(req,res) => {
    const query = `SELECT * FROM orders WHERE status = 0;`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

app.get('/total_cancelled',(req,res) => {
    const query = `SELECT * FROM orders WHERE status = 2;`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})


//Most Sold:
app.get('/most_sold',(req,res) => {
    // const query = `SELECT items.name, COUNT(orders.item_id) AS totals FROM orders JOIN items ON orders.item_id = items.id WHERE orders.status = 0 GROUP BY orders.item_id, items.name ORDER BY totals DESC LIMIT 1;`
    const query = `SELECT items.name, COUNT(orders.item_id) AS count FROM orders JOIN items ON orders.item_id = items.id WHERE orders.status = 0 GROUP BY items.name;`
    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
})

// 
//most Cancelled
app.get('/most_cancelled',(req,res) => {
    // const query = `SELECT items.name, COUNT(orders.item_id) AS totals FROM orders JOIN items ON orders.item_id = items.id WHERE orders.status = 2 GROUP BY orders.item_id, items.name ORDER BY totals DESC LIMIT 1;`
    const query = `SELECT items.name, COUNT(orders.item_id) AS count FROM orders JOIN items ON orders.item_id = items.id WHERE orders.status = 2 GROUP BY items.name;`

    db.query(query,((err,results) => {
        if(err)
        {
            res.status(500).json({ error: 'Error fetching data from the database' });
            console.log(err)
        }
        else{
            res.json(results)
        }
    }))
}) 






app.listen(port, "192.168.29.108",() => {
    console.log(`Example apps listening on port ${port}`)
}) 
// , "192.168.29.108"