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

const { faker, id_ID } = require('@faker-js/faker');

hbs.registerHelper('EqualTerms', (v1, v2) => v1 == v2);
hbs.registerHelper('EqualTermsNot', (v1, v2) => v1 != v2);

dogs = [];
for (let i = 0; i < 178; i++){
    dogs.push(
        {
            _id: i,
            nick: faker.person.firstName(),
            sex: faker.person.sex(),
            breed: faker.animal.dog(),
            age: faker.number.int({ min: 1, max: 15 }),
            desc: faker.lorem.paragraph(1),
            img: faker.image.urlLoremFlickr({ width: 256, height: 256, category: 'dog' }),
            isAdmin : false,
            isHome : false,
        },
    );
}

app.get(`/`, (req, res)=>{
    res.render(`index`, {
        dogs: dogs.filter((item) => item.isHome == false),
    });
});

app.post(`/`, (req, res)=>{
    console.log(req.body.notHome);
    console.log(dogs[req.body.notHome]["isAdmin"]);
    dogs[req.body.notHome]["isAdmin"] = true;
    console.log(dogs[req.body.notHome]["isAdmin"]);
    res.render(`index`, {
        dogs: dogs.filter((item) => item.isHome == false),
    })
})


app.get(`/sorting`, (req, res)=>{
    let dogsSort = [];
    let dogsNames = [];

    if (req.query.sex == undefined && req.query.nick == ""){
        dogsSort = dogs;
    }
    else if(req.query.sex == undefined && req.query.nick != ""){
        dogsSort = dogs.filter((item) => item.nick == req.query.nick);
    }
    else if(req.query.sex != "" && req.query.nick == ""){
        dogsSort = dogs.filter((item) => item.sex == req.query.sex);
    }
    else if(req.query.sex != "" && req.query.nick != ""){
        dogsNames = dogs.filter((item) => item.sex == req.query.sex);
        dogsSort = dogsNames.filter((item) => item.nick == req.query.nick);
    }

    res.render(`index`, {
        dogs: dogsSort,
    });
})

app.post(`/sorting`, (req, res)=>{
    let dogsSort = [];
    let dogsNames = [];

    console.log(req.body.notHome);
    console.log(dogs[req.body.notHome]["isAdmin"]);
    dogs[req.body.notHome]["isAdmin"] = true;
    console.log(dogs[req.body.notHome]["isAdmin"]);

    if (req.query.sex == undefined && req.query.nick == ""){
        dogsSort = dogs;
    }
    else if(req.query.sex == undefined && req.query.nick != ""){
        dogsSort = dogs.filter((item) => item.nick == req.query.nick);
    }
    else if(req.query.sex != "" && req.query.nick == ""){
        dogsSort = dogs.filter((item) => item.sex == req.query.sex);
    }
    else if(req.query.sex != "" && req.query.nick != ""){
        dogsNames = dogs.filter((item) => item.sex == req.query.sex);
        dogsSort = dogsNames.filter((item) => item.nick == req.query.nick);
    }

    res.render(`index`, {
        dogs: dogsSort,
    });
})

app.get(`/profile`, (req, res) => {
    res.render(`profile`, {
        dogs: dogs.filter((item) => item.isAdmin == true),
    })
});

app.get(`/admin`, (req, res) => {
    res.render(`admin`, {
        dogs: dogs.filter((item) => item.isAdmin == true),
    })
});

app.post(`/admin`, (req, res)=>{
    console.log(req.body.sendDog);
    console.log(dogs[req.body.sendDog]["isHome"]);
    dogs[req.body.sendDog]["isHome"] = true;
    console.log(dogs[req.body.sendDog]["isHome"]);
    res.render(`admin`, {
        dogs: dogs.filter((item) => item.isAdmin == true),
    })
})