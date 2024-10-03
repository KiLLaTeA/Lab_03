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
const { faker } = require('@faker-js/faker');
hbs.registerHelper('paginate', paginate);

// const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

// console.log(animals.slice(2));
// // Expected output: Array ["camel", "duck", "elephant"]

// console.log(animals.slice(2, 4));
// // Expected output: Array ["camel", "duck"]

hbs.registerHelper('EqualSex', (v1, v2) => v1 == v2);

dogs = [];
for (let i = 0; i < 178; i++){
    dogs.push(
        {
            nick: faker.person.firstName(),
            sex: faker.person.sex(),
            breed: faker.animal.dog(),
            age: faker.number.int({ min: 1, max: 16 }),
            desc: faker.lorem.paragraph(1),
            img: faker.image.urlLoremFlickr({ width: 256, height: 256, category: 'dog' }),
        },
    );
}

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

    if(endEntry > dogs[dogs.length - 1]){
        endEntry = dogs[dogs.length - 1];
    }

    res.render(`index`, {
        pagination: {
            page: page,      // The current page the user is on
            pageCount: Math.ceil(dogs.length/16)    // The total number of available pages
        },
        dogs: dogs,
    });
});