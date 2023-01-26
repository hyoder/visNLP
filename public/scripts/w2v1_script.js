const      canv = document.getElementById( "w2v_canv" ),
       back_btn = document.getElementById( "back_btn" ),
       statuses = ["init", "onehot", "textprep"];
let page_status = 0;
function init()
{
    canv.innerHTML  = "<h1>begin</h1>"
    canv.innerHTML += "<div style=\"height:3vh;\"></div>"
    canv.innerHTML += "<div id = \"btn_holder\">"
    canv.innerHTML += "<button id = \"cbow_btn\">CBOW</button>"
    canv.innerHTML += "<button id = \"skip_btn\">skip-gram</button></div>"
    const cbow_btn = document.getElementById( "cbow_btn" ),
          skip_btn = document.getElementById( "skip_btn" );
    cbow_btn.addEventListener( "click", () => { canv.dataset.mode = "cbow";     updater(1); } );
    skip_btn.addEventListener( "click", () => { canv.dataset.mode = "skipgram"; updater(1); } );
}
function onehot()
{
    let meta = "<div id=\"meta\">";
        meta += "<h2>word2vec - learning</h2>";
        meta += "<h3>page 2/??</h3>";
    if( canv.dataset.mode === "cbow"     ) { meta += "<h3>mode: CBOW</h3>";      }
    if( canv.dataset.mode === "skipgram" ) { meta += "<h3>mode: skip-gram</h3>"; }
        meta += "</div>"
    canv.innerHTML  = meta;
    canv.innerHTML += "<h1>what are one-hot encoded vectors?</h1>";
    canv.innerHTML += "<br/><h2>it's easy</h2>";
}
function textprep()
{
    canv.innerHTML  = "";
}
function updater( val )
{
    if ( val ==  1 ) { page_status++; }
    if ( val == -1 ) { page_status--; }
    if( page_status > 0 ) { back_btn.style.display = "inline-block"; }
    else                  { back_btn.style.display = "none"; }
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