const express = require("express");
const textService = require("./textService");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// app.use(express.urlencoded({
//     extended: true
// }));


app.get("/posts", (req, res, next) => {

    let posts = JSON.parse(textService.getData("./db.json"));

    res.send(posts);
});


app.post("/posts", (req, res, next) => {
    
    const user = {
        name: req.body.name,
        email: req.body.email,
        address: {
            street: req.body.address.street,
            city: req.body.address.city
        },
        website: req.body.website,
        company: {
            name: req.body.company.name,
            bs: req.body.company.bs
        }
    };
    
    textService.addData(user, "./db.json");
    res.send(user);
});


app.delete("/posts", (req, res, next) => {
    
    const company = req.body.company.name;
    
    textService.deleteData(company, "./db.json");
    res.send(JSON.stringify({ deleted: true }));

});

app.listen(3000, () => {
    console.log('Server is listening at http://localhost:3000');
});
