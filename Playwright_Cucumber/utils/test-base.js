const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testDataOrder:{
        email : "luckystone@gmail.com",
        password : "Luckystone90",
        productName : "ZARA COAT 3"
        }
    }
);