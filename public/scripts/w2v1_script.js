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
    cbow_btn.addEventListener( "click", () => { updater("r"); canv.dataset.mode = "cbow"; } );
    skip_btn.addEventListener( "click", () => { updater("r"); canv.dataset.mode = "skipgram"; } );
}
function onehot()
{
    canv.innerHTML  = "";
}
function textprep()
{
    canv.innerHTML  = "";
}
function updater( r_or_l )
{
    if ( r_or_l === "r" ) { page_status++; }
    if ( r_or_l === "l" ) { page_status--; }
    if( page_status > 0 ) { back_btn.style.display = "inline-block"; }
    else                  { back_btn.style.display = "none"; }
    let page = statuses[ page_status ];
    switch( page )
    {
        case   "init":       init(); break;
        case "onehot":     onehot(); break;
        case "textprep": textprep(); break;
    }
}
window.onload = (e) => {
    console.log('page loaded');
    updater(page_status);
};
back_btn.addEventListener( "click", () => { updater("l"); } )