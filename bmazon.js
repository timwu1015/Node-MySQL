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
    displayProducts();
});

function displayProducts() {
    console.log("These are the products available: \n");
    var query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res);
        buyerChoice();
    });
}

function buyerChoice() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message:"What is the item id?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "units",
            type: "input",
            message: "How many units would you like to buy?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
    .then(function(answer) {
        var quant;
        var totalPrice;
        connection.query(
            "SELECT price, stock_quantity from products WHERE ?", 
            { item_id: answer.id},
            function(err, res) {
                if (err) throw err;

                if (res[0].stock_quantity < parseInt(answer.units)) {
                    console.log("Insufficient quantity!");
                }

                totalPrice = res[0].price * parseInt(answer.units);
                console.log("Here is the total cost of your purchase: $" + totalPrice);

                quant = res[0].stock_quantity - parseInt(answer.units);

                connection.query(
                    "Update products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: quant
                        },
                        {
                            item_id: answer.id
                        }
                    ],
                    function(err) {
                        if (err) throw err;
                        connection.query(
                            "SELECT stock_quantity from products WHERE ?", 
                            { item_id: answer.id},
                            function(err, res) {
                                if (err) throw err;
                                console.log("The current stock count of the item is: " + res[0].stock_quantity);
                                connection.end();
                            }    
                        );
                    }
                );
            }
        );   
    });
}