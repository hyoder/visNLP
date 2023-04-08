const express = require( 'express' ),
          app = express(),
        bodyp = require( 'body-parser' ),
      favicon = require( 'serve-favicon' ),
         path = require( 'path' ),
      mongodb = require( 'mongodb' ),
           d3 = import( 'd3' ),
       Plotly = require('plotly')('VisNLP2', 'yK5zTReZvX73Fg8f1faO'),
       dotenv = require( 'dotenv' ).config(),
          uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}`,
       client = new mongodb.MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
let cbow_data = undefined,
    skip_data = undefined,
    adam_data = undefined;
app.use( bodyp.json() );
app.use( favicon( path.join( __dirname, '/public', 'favicon.ico' ) ) );
app.use( express.static( path.join( __dirname + '/public' ) ) );
client.connect();
cbow_data = client.db('w2v').collection('cbow');
skip_data = client.db('w2v').collection('skip');
adam_data = client.db('adam').collection('outputs');

app.use( ( req, res, next ) =>
{
  if( adam_data !== null ) { next(); }
  else  { res.status( 503 ).send(); }
} );

// API route that generates plot data and returns it as a JSON response
app.get('/plot-data', (req, res) => {
  // Retrieve any relevant query parameters
  const plotType = req.query.plotType;
  const xData = req.query.xData;
  const yData = req.query.yData;
  // Generate the plot data using Plotly
  const plotData = {x: xData,y: yData,type: plotType};
  // Send the plot data back to the client as a JSON response
  res.json(plotData);
});

app.get('/',          ( req, res ) => { res.sendFile( path.join( __dirname + '/public/index.html'          ) ); } );
app.get('/intro',     ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/basics.html'   ) ); } );
app.get('/w2v',       ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/word2vec.html' ) ); } );
app.get('/s2v',       ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/sen2vec.html'  ) ); } );
app.get('/senback',   ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/senback.html'  ) ); } );
app.get('/p2v',       ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/para2vec.html' ) ); } );
app.get('/paraback',  ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/paraback.html' ) ); } );
app.get('/song',      ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/song2vec.html' ) ); } );
app.get('/news',  ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/news2vec.html' ) ); } );
app.get('/newsback',      ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/newsback.html' ) ); } );
app.get('/adamstep',  ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/adamstep.html'     ) ); } );
app.get('/adam',      ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/adam.html'     ) ); } );
app.get('/cbowdata',  ( req, res ) => { cbow_data.find( {} ).toArray().then( (docs) => res.json( docs[0][req.query.step] ) ); } );
//app.get('/skipdata',  ( req, res ) => { skip_data.find( {} ).toArray().then( (docs) => res.json( docs[0][req.query.step] ) ); } );
app.get('/adamdata',  ( req, res ) => { adam_data.find( {} ).toArray().then( (docs) => res.json( docs[0][req.query.step] ) ); } );
app.get('/songback',      ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/songback.html') ); } );
app.listen( process.env.PORT || 3000, function()
{
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
} );
