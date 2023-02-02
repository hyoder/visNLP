const express = require( 'express' ),
          app = express(),
        bodyp = require( 'body-parser' ),
      favicon = require( 'serve-favicon' ),
         path = require( 'path' );
app.use( bodyp.json() );
app.use( favicon( path.join( __dirname, 'public', 'favicon.ico' ) ) );
app.use( express.static( path.join( __dirname + '/public' ) ) );

app.get('/',      ( req, res ) => { res.sendFile( path.join( __dirname + '/public/index.html'          ) ); } );
app.get('/intro', ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/basics.html'    ) ); } );
app.get('/w2v',   ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/word2vec.html' ) ); } );
app.get('/s2v',   ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/sen2vec.html'  ) ); } );
app.get('/p2v',   ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/para2vec.html' ) ); } );
app.get('/song',  ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/song2vec.html' ) ); } );
app.get('/news',  ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/news2vec.html' ) ); } );
app.get('/adam',  ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/adam.html'     ) ); } );

app.listen( process.env.PORT || 3000, function()
{
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
} );