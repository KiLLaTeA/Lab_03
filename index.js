let express = require(`express`);
let app = express();
let port = 3000;

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
});

app.use(express.static(`public`));

let hbs = require(`hbs`);
app.set(`views`, `views`);
app.set(`view engine`, `hbs`);

app.get(`/`, (req, res)=>{
    res.render(`index`);
});