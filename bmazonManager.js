var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",
    database: "bmazon_db"
});

connection.connect(function(err) {
    if(err) throw err;
    start();
});

function start() {
    inquirer
      .prompt({
          name: "action",
          type: "rawlist",
          message: "What would you like to do?",
          choices: [
              "View Products for Sale",
              "View Low Inventory",
              "Add to Inventory",
              "Add New Product"
          ]
      })
      .then(function(answer) {
          switch (answer.action) {
          case "View Products for Sale":
            productView();
            break;    

          case "View Low Inventory":
            inventoryView();
            break;

          case "Add to Inventory":
            addInventory();
            break;
        
          case "Add New Product":
            addProduct();
            break;
        }
      });
}

function productView() {
    var query = "SELECT * from products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " || Name: " + res[i].product_name + " || Price: " + res[i].price + " || Quantities: " + res[i].stock_quantity + "\n");
        }
        start();
    });
}

function inventoryView() {
    var query = "SELECT product_name FROM products WHERE stock_quantity < 40";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log("These items are low in inventory (< 40)\n");
        for( var i = 0; i < res.length; i++) {
            console.log("Name: " + res[i].product_name + "\n");
        }
        start();
    });
}

function addInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "item",
                    type: "rawlist",
                    choices: function() {
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "Which product would you like to replenish?"
                },
                {
                    name: "amount",
                    type: "input",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    },
                    message: "how many units would you like to restock?"
                }
            ])
            .then(function(answer) {
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: answer.amount
                        },
                        {
                            product_name: answer.item
                        }
                    ],
                    function(error) {
                        if(error) throw err;
                        console.log("Item replenished successfully!");
                        start();
                    }
                );
            });
    }); 
}

function addProduct() {
    inquirer
      .prompt([
          {
            name: "product",
            type: "input",
            message: "what product would you like to add?"
          },
          {
            name: "department",
            type: "input",
            message: "which department does this product belong? (Initial Capital)"
          },
          {
            name: "price",
            type: "input",
            message: "How much is this product?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
          },
          {
            name: "quantity",
            type: "input",
            message: "How many units would you add?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
          }
      ])
      .then(function(answer) {
          connection.query(
              "INSERT INTO products SET ?",
              {
                  product_name: answer.product,
                  department_name: answer.department,
                  price: answer.price,
                  stock_quantity: answer.quantity
              },
              function(err) {
                  if (err) throw err;
                  console.log("You new product was added successfully!")
                  start();
              }
          );
      });
}