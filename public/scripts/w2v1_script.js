const      canv = document.getElementById( "canv" ),
        sidebar = document.getElementById( "sidebar"),
         footer = document.getElementById( "footer"),
       back_btn = document.getElementById( "back_btn" ),
        fwd_btn = document.getElementById( "fwd_btn" ),
       statuses = ["init", "onehot", "textprep"];
let page_status = 0;
function meta()
{
    let output  = "<div id=\"meta\">";
        output += "<h2>word2vec - learning</h2>";
        output += "<h3>page " + page_status + " out of ??</h3>";
    if( page_status > 0 )
    {
        if( canv.dataset.mode === "cbow"     ) { meta += "<h3>mode: CBOW</h3>";      }
        if( canv.dataset.mode === "skipgram" ) { meta += "<h3>mode: skip-gram</h3>"; }
    }
        output += "</div>"
    return output;
}
function init()
{
    setfooter( "default" );
    canv.innerHTML  = meta();
    let btn_holder  = "<div id = \"btn_holder\">"
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
}
function onehot()
{
    setfooter( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<h1>what are one-hot encoded vectors?</h1>";
    canv.innerHTML += "<br/><h2>it's easy</h2>";
}
function setfooter( input )
{
    if( input === "default" ) { footer.innerHTML = "<h2>info box will be here!</h2>"; return; }
    switch ( page_status )
    {
        case 0: 
            switch( input )
            {
                case "cbow": footer.innerHTML = "<h2>Continuous Bag of Words (CBOW) is one of the two primary settings for word2vec</h2>"; break;
                case "skip": footer.innerHTML = "<h2>Skip-gram is one of the two primary settings for word2vec</h2>"; break;
            }
            break;
        case 1: 
            switch( input )
            {

            }
            break;
    }
}
function textprep()
{
    canv.innerHTML  = "";
}
function updater( val )
{
    if ( val ==  1 ) { page_status++; }
    if ( val == -1 ) { page_status--; }
    if( page_status > 0 ) { back_btn.style.display = "inline-block"; fwd_btn.style.display = "inline-block"; }
    else                  { back_btn.style.display = "none"; fwd_btn.style.display = "none"; }
    let page = statuses[ page_status ];
    console.log("mode: " + canv.dataset.mode );
    console.log("page: " + page);
    switch( page )
    {
        case     "init":     init(); break;
        case   "onehot":   onehot(); break;
        case "textprep": textprep(); break;
    }
}
window.onload = (e) => {
    console.log('page loaded');
    updater(page_status);
};
back_btn.addEventListener( "click", () => { updater(-1); } )