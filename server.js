const express = require( 'express' ),
          app = express(),
      favicon = require( 'serve-favicon' ),
        bodyp = require( 'body-parser' ),
         path = require( 'path' );
app.use( bodyp.json() );
app.use( favicon( path.join( __dirname, 'public', 'favicon.ico' ) ) );
app.use( express.static( path.join( __dirname + '/public' ) ) );

app.get('/',     ( req, res ) => { res.render( "index", { msg: "", layout: false } ); } );
app.get('/home', ( req, res ) => { res.render( "index", { msg: "", layout: false } ); } );
app.get('/w2v1', ( req, res ) => { res.render( "w2v1",  { msg: "", layout: false } ); } );
app.get('/w2v2', ( req, res ) => { res.render( "w2v2",  { msg: "", layout: false } ); } );
app.get('/p2v1', ( req, res ) => { res.render( "p2v1",  { msg: "", layout: false } ); } );
app.get('/p2v2', ( req, res ) => { res.render( "p2v2",  { msg: "", layout: false } ); } );
app.get('/adam', ( req, res ) => { res.render( "adam",  { msg: "", layout: false } ); } );

app.listen(process.env.PORT || 3000, function() { console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env); } );