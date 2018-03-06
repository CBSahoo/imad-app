var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user:'bhanusahoo08',
    database:'bhanusahoo08',
    host:'db.imad.hasura-app.io',
    port:5432,
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = {
 'article-one' : {
    title: 'Article One|CB Sahoo',
    heading: 'Article One',
    date: 'March 2,2018',
    content: ` <p>
                It is a period of civil war.
                Rebel spaceships, striking
                from a hidden base, have won
                their first victory against
                the evil Galactic Empire.
            </p>
            <p>
                During the battle, Rebel
                spies managed to steal secret
                plans to the Empire's
                ultimate weapon, the DEATH
                STAR, an armored space
                station with enough power to
                destroy an entire planet.
                </p>
                <p>
                Pursued by the Empire's
                sinister agents, Princess
                Leia races home aboard her
                starship, custodian of the
                stolen plans that can save
                her people and restore
                freedom to the galaxy..... 

            </p>`},
 'article-two':{
     title: 'Article Two|CB Sahoo',
    heading: 'Article Two',
    date: 'March 12,2018',
    content: ` <p>
                It is a dark time for the
                Rebellion. Although the Death
                Star has been destroyed,
                Imperial troops have driven the
                Rebel forces from their hidden
                base and pursued them across
                the galaxy.
                </p>
                <p>
                Evading the dreaded Imperial
                Starfleet, a group of freedom
                fighters led by Luke Skywalker
                has established a new secret
                base on the remote ice world
                of Hoth.
                </p>
                <p>
                The evil lord Darth Vader,
                obsessed with finding young
                Skywalker, has dispatched
                thousands of remote probes into
                the far reaches of space....
            </p>`

            },
 'article-three':{ 
    title: 'Article Three|CB Sahoo',
    heading: 'Article Three',
    date: 'March 17,2018',
    content: ` <p>  
                Luke Skywalker has returned to
                his home planet of Tatooine in
                an attempt to rescue his
                friend Han Solo from the
                clutches of the vile gangster
                Jabba the Hutt.
                </p>
                <p>
                Little does Luke know that the
                GALACTIC EMPIRE has secretly
                begun construction on a new
                armored space station even
                more powerful than the first
                dreaded Death Star.
                </p>
                <p>
                When completed, this ultimate
                weapon will spell certain doom
                for the small band of rebels
                struggling to restore freedom
                to the galaxy...</p>`
    }
};

function createTemplate(data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
var htmlTemplate = `<html>
<head>
    <title>
      ${title}
    </title>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <link href="/ui/style.css" rel="stylesheet" />
</head>
<body>
    <div class="container">
    <a href='/'>Home</a>
    <hr/>
    <h3>
        ${heading}
    </h3>

    <div>
       ${date}
    </div>
    <div>
       ${content}
    </div>
    </div>
</body>
</html>
`;
return htmlTemplate;
}

app.get('/', function (req, res) {
     res.sendFile(path.join(__dirname, 'ui', 'index.html')); 
});
app.get('/ui/main.js', function (req, res) {
     res.sendFile(path.join(__dirname, 'ui', 'main.js')); 
});

var pool = new Pool(config);
app.get('/test-db',function(req,res){
    //make a select request
    //return a response with the results
    pool.query('SELECT * FROM test',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result));
        }
    });
});

var counter=0;
app.get('/counter',function(req,res){
    counter = counter + 1;
    res.send(counter.toString());
});

var names=[];
app.get('/submit-name',function(req,res){
   var name = req.query.name;
   names.push(name);
   res.send(JSON.stringify(names));
});

app.get('/:articles/articleName',function(req,res){
     pool.query("SELECT * FROM article WHERE title = '"+ req.params.articleName +"'", function(err,result){
         if(err){
             res.status(500).send(err.toString());
         }else{
             if (result.rows.length === 0){
                 res.status(404).send('Article not found');
             }else{
                 var articleData = result.rows[0];     
                 res.send(createTemplate(articleData));
             }
         }
     } );
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
