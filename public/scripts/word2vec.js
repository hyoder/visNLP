const      canv = document.getElementById( "canv" ),
        sidebar = document.getElementById( "sidebar"),
         footer = document.getElementById( "footer"),
       back_btn = document.getElementById( "back_btn" ),
        fwd_btn = document.getElementById( "fwd_btn" ),
       statuses = ["init", "text prep", 
                   "epoch 0: generate_batch", "epoch 0: multiply matrices", "epoch 0: add bias", "epoch 0: log softmax",
                   "epoch 1: generate_batch", "epoch 1: multiply matrices", "epoch 1: add bias", "epoch 1: log softmax",
                   "epoch 2: generate_batch", "epoch 2: multiply matrices", "epoch 2: add bias", "epoch 2: log softmax",
                   "epoch 3: generate_batch", "epoch 3: multiply matrices", "epoch 3: add bias", "epoch 3: log softmax",
                   "epoch 4: generate_batch", "epoch 4: multiply matrices", "epoch 4: add bias", "epoch 4: log softmax",
                   "epoch 5: generate_batch", "epoch 5: multiply matrices", "epoch 5: add bias", "epoch 5: log softmax",
                   "epoch 6: generate_batch", "epoch 6: multiply matrices", "epoch 6: add bias", "epoch 6: log softmax",
                   "epoch 7: generate_batch", "epoch 7: multiply matrices", "epoch 7: add bias", "epoch 7: log softmax",
                   "epoch 8: generate_batch", "epoch 8: multiply matrices", "epoch 8: add bias", "epoch 8: log softmax",
                   "epoch 9: generate_batch", "epoch 9: multiply matrices", "epoch 9: add bias", "epoch 9: log softmax" ];
let page_status = 0, epoch = 0;
let w2v_data;
function meta()
{
    let output  = "<div id=\"meta\">";
        output += "<h2>w2v - \"" + statuses[page_status] + "\"</h2>";
        output += "<h4>page " + (page_status+1) + " out of ??</h4>";
    if( page_status > 0 )
    {
        if( canv.dataset.mode === "cbow"     ) { output += "<h4>mode: CBOW</h4>";      }
        if( canv.dataset.mode === "skipgram" ) { output += "<h4>mode: skip-gram</h4>"; }
    }
    else { output += "<h4/>"}
        output += "</div>"
    return output;
}
function init()
{
    setfooter( "default" );
    canv.dataset.mode = "n/a";
    canv.innerHTML  = meta();
    canv.innerHTML += "<div style=\"height:15vh\"></div>";
    canv.innerHTML += "<h2>select mode for word2vec:</h2>";
    let btn_holder  = "<div style=\"position:fixed;right:16.5vw;top:35vh;\">"
        btn_holder += "<button id = \"cbow_btn\">CBOW</button>"
        btn_holder += "<button id = \"skip_btn\">skip-gram</button>"
        btn_holder += "</div>";
    canv.innerHTML += btn_holder;
    const cbow_btn = document.getElementById( "cbow_btn" ),
          skip_btn = document.getElementById( "skip_btn" );
    cbow_btn.addEventListener( "click", () => { canv.dataset.mode = "cbow";     updater(1); } );
    skip_btn.addEventListener( "click", () => { canv.dataset.mode = "skipgram"; updater(1); } );
    cbow_btn.addEventListener( "mouseover", () => { setfooter( "cbow" ); } );
    skip_btn.addEventListener( "mouseover", () => { setfooter( "skip" ); } );
    cbow_btn.addEventListener( "mouseout",  () => { setfooter( "default" ); } );
    skip_btn.addEventListener( "mouseout",  () => { setfooter( "default" ); } );
    getData(0, "CBOW");
}
function onehot()
{
    setfooter( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<div style=\"height:15vh\"></div>";
    canv.innerHTML += "<h1>what are one-hot encoded vectors?</h1>";
    canv.innerHTML += "<br/><h2>it's easy</h2>";
}
function textprep()
{
    canv.innerHTML  = meta();
}
function setfooter( input )
{
    switch( input )
    {
        case "default": footer.innerHTML = "<h2>info box will be here!</h2>"; break;
        case "cbow": footer.innerHTML = "<h2>continuous bag of words (CBOW) is one of the two primary settings for word2vec</h2>"; break;
        case "skip": footer.innerHTML = "<h2>skip-gram is one of the two primary settings for word2vec</h2>"; break;
    }
    
    /* will switch to using this structure once there's enough footer settings to make it faster
    if( input === "default" ) { footer.innerHTML = "<h2>info box will be here!</h2>"; return; }
    switch ( page_status ) {
        case 0: 
            switch( input )
            {
            }
            break; } */
}
function updater( val )
{
    if ( val ==  1 ) { page_status++; }
    if ( val == -1 ) { page_status--; }
    if( page_status > 0 ) { back_btn.style.display = "inline-block"; fwd_btn.style.display = "inline-block"; }
    else                  { back_btn.style.display = "none"; fwd_btn.style.display = "none"; }
    let page = statuses[ page_status ];
    //console.log("mode: " + canv.dataset.mode );
    console.log("page: " + page);
    switch( page )
    {
        case     "init":     init(); break;
        case   "onehot":   onehot(); break;
        case "textprep": textprep(); break;
    }
}
//call with getData(0) for 0: Object
function getData( epoch, type )
{
    if( type === "CBOW" ) {
        fetch( '/cbowdata?step='+epoch, { method: 'GET', headers: { "Content-Type": "application/json" } }, 0 )
        .then( function (response) { response.json().then( function(data) { setData(data); } ) } ); }
    else {
        fetch( '/skipdata?step='+epoch, { method: 'GET', headers: { "Content-Type": "application/json" } }, 0 )
        .then( function (response) { response.json().then( function(data) { setData(data); } ) } ); }
    return false;
}
function setData( json ) { w2v_data = json; console.log( w2v_data ); }
window.onload = (e) => {
    console.log('page loaded');
    updater(page_status);
};
 fwd_btn.addEventListener( "click", () => { updater( 1); } );
back_btn.addEventListener( "click", () => { updater(-1); } );