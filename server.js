const express = require( 'express' ),
          app = express(),
        bodyp = require( 'body-parser' ),
      favicon = require( 'serve-favicon' ),
         path = require( 'path' ),
      mongodb = require( 'mongodb' ),
       dotenv = require( 'dotenv' ).config(),
          uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}`,
       client = new mongodb.MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
let w2v_data = undefined;
app.use( bodyp.json() );
app.use( favicon( path.join( __dirname, 'public', 'favicon.ico' ) ) );
app.use( express.static( path.join( __dirname + '/public' ) ) );
client.connect().then( () => { w2v_data = client.db( 'visNLP' ).collection( 'w2v' ) } );
app.use( ( req, res, next ) =>
{
  if( w2v_data !== null ) { next(); }
  else  { res.status( 503 ).send(); }
} );

app.get('/',          ( req, res ) => { res.sendFile( path.join( __dirname + '/public/index.html'          ) ); } );
app.get('/intro',     ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/basics.html'    ) ); } );
app.get('/w2v',       ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/word2vec.html' ) ); } );
app.get('/s2v',       ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/sen2vec.html'  ) ); } );
app.get('/p2v',       ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/para2vec.html' ) ); } );
app.get('/song',      ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/song2vec.html' ) ); } );
app.get('/news',      ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/news2vec.html' ) ); } );
app.get('/adam',      ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/adam.html'     ) ); } );
app.get('/adamstep',  ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/adamstep.html'     ) ); } );

app.listen( process.env.PORT || 3000, function()
{
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
} );