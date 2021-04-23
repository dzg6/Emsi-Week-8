const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/salesTax', function (req, res, next) {
    let revenue = req.body.revenue;
    
    //Idaho sales tax is 6%
    let salesTax = Number(revenue * .06).toFixed(2);

    res.json({salesTax: salesTax})
})

app.listen(port, () => {
  console.log(`Sales Tax API is listening @ http://localhost:${port}`)
})