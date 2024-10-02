let express = require(`express`);
let app = express();
let port = 3000;

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
});

app.use(express.static(`public`));
app.use(express.urlencoded({extended: true}));

let hbs = require(`hbs`);
app.set(`views`, `views`);
app.set(`view engine`, `hbs`);

var paginate = require('handlebars-paginate');
hbs.registerHelper('paginate', paginate);
// hbs.registerHelper('IntMod', (v1, v2) => v1 % v2 == 0); - скорее всего не пригодится

// const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

// console.log(animals.slice(2));
// // Expected output: Array ["camel", "duck", "elephant"]

// console.log(animals.slice(2, 4));
// // Expected output: Array ["camel", "duck"]

app.get(`/`, (req, res)=>{
    let page = "";
    if (req.query.p == "" || req.query.p == undefined || req.query.p == NaN){
        page = 1;
    }
    else{
        page = req.query.p;
    }

    startEntry = page*16-16;
    endEntry = page*16-1;
    // if(endEntry > index){
    //     endEntry = index;
    // }

    console.log(Math.ceil(178/16));

    res.render(`index`, {
        pagination: {
            page: page,      // The current page the user is on
            pageCount: 10    // The total number of available pages
        }
    });
});