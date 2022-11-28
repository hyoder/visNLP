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

app.get('/',     ( req, res ) => { res.sendFile( path.join( __dirname + '/public/index.html'      ) ); } );
app.get('/w2v1', ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/w2v1.html' ) ); } );
app.get('/w2v2', ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/w2v2.html' ) ); } );
app.get('/p2v1', ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/p2v1.html' ) ); } );
app.get('/p2v2', ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/p2v2.html' ) ); } );
app.get('/adam', ( req, res ) => { res.sendFile( path.join( __dirname + '/public/views/adam.html' ) ); } );

app.listen( process.env.PORT || 3000, function() { console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env); } );
//app.set( "views", path.join( __dirname + "/public/views" ) );

/*
app.get('/',     ( req, res ) => { res.render(      'index.html', function (err, html) { res.send(html); } ); } );
app.get('/w2v1', ( req, res ) => { res.render('/views/w2v1.html', function (err, html) { res.send(html); } ); } );
app.get('/w2v2', ( req, res ) => { res.render('/views/w2v2.html', function (err, html) { res.send(html); } ); } );
app.get('/p2v1', ( req, res ) => { res.render('/views/p2v1.html', function (err, html) { res.send(html); } ); } );
app.get('/p2v2', ( req, res ) => { res.render('/views/p2v2.html', function (err, html) { res.send(html); } ); } );
app.get('/adam', ( req, res ) => { res.render('/views/adam.html', function (err, html) { res.send(html); } ); } );
*/

/*
app.use('/', router);
app.use('/w2v1', router);
app.use('/w2v2', router);
app.use('/p2v1', router);
app.use('/p2v2', router);
app.use('/adam', router);
*/