const  canv = document.getElementById( "w2v_canv" ),
page_status = 0,
   statuses = ["init", "onehot"];
function canv_init()
{
    canv.innerHTML  = "<h1>begin</h1>"
    canv.innerHTML += "<div style=\"height:3vh;\"></div>"
    canv.innerHTML += "<div id = \"btn_holder\">"
    canv.innerHTML += "<button id = \"cbow_btn\">CBOW</button>"
    canv.innerHTML += "<button id = \"skip_btn\">skip-gram</button></div>"
    const cbow_btn = document.getElementById( "cbow_btn" ),
          skip_btn = document.getElementById( "skip_btn" );
    cbow_btn.addEventListener( "click", () => { updater("onehot"); canv.dataset.mode = "cbow"; } );
    skip_btn.addEventListener( "click", () => { updater("onehot"); canv.dataset.mode = "skipgram"; } );
}
function canv_onehot()
{
    canv.innerHTML  = "";
}
function updater( page_status )
{
    let page = statuses[ page_status ];
    console.log("updater");
    console.log(page);
    switch( page )
    {
        case "init":    { canv_init();   }
        case 'onehot':  { canv_onehot(); }
    }
}
window.onload = (e) => {
    console.log('page loaded');
    updater(page_status);
};