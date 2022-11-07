const express = require( 'express' ),
          app = express(),
      favicon = require( 'serve-favicon' ),
        bodyp = require( 'body-parser' ),
         path = require( 'path' ),
       router = express.Router();
app.use( bodyp.json() );
app.use( favicon( path.join( __dirname, 'public', 'favicon.ico' ) ) );
app.use( express.static( path.join( __dirname + '/public' ) ) );

app.get('/',     ( req, res ) => { res.sendFile( '/index.html' ); } );
app.get('/w2v1', ( req, res ) => { res.sendFile( path.join( __dirname, 'assets', '/w2v1.html' ) ); } );
app.get('/w2v2', ( req, res ) => { res.sendFile( path.join( __dirname, 'assets', '/w2v2.html' ) ); } );
app.get('/p2v1', ( req, res ) => { res.sendFile( path.join( __dirname, 'assets', '/p2v1.html' ) ); } );
app.get('/p2v2', ( req, res ) => { res.sendFile( path.join( __dirname, 'assets', '/p2v2.html' ) ); } );
app.get('/adam', ( req, res ) => { res.sendFile( path.join( __dirname, 'assets', '/adam.html' )); } );

app.use('/', router);
app.listen(process.env.PORT || 3000, function() { console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env); } );