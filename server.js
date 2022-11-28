const express = require( 'express' ),
          app = express(),
        bodyp = require( 'body-parser' ),
      favicon = require( 'serve-favicon' ),
        https = require( 'https' ),
         path = require( 'path' ),
       router = express.Router();
app.use( bodyp.json() );
app.use( favicon( path.join( __dirname, 'public', 'favicon.ico' ) ) );
app.use( express.static( path.join( __dirname + '/public' ) ) );
app.use( express.static( path.join( __dirname + '/public/views' ) ) );

app.get('/',     ( req, res ) => { res.redirect( 'index' ); } );
app.get('/w2v1', ( req, res ) => { res.redirect(  'w2v1' ); } );
app.get('/w2v2', ( req, res ) => { res.redirect(  'w2v2' ); } );
app.get('/p2v1', ( req, res ) => { res.redirect(  'p2v1' ); } );
app.get('/p2v2', ( req, res ) => { res.redirect(  'p2v2' ); } );
app.get('/adam', ( req, res ) => { res.redirect(  'adam' ); } );

/*
app.use('/', router);
app.use('/w2v1', router);
app.use('/w2v2', router);
app.use('/p2v1', router);
app.use('/p2v2', router);
app.use('/adam', router);
*/

app.listen( process.env.PORT || 3000, function() { console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env); } );
//app.set( "views", path.join( __dirname + "/public/views" ) );