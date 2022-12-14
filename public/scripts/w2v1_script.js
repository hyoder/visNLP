const canv = document.getElementById( "w2v_canv" );
function canv_init()
{
    canv.innerHTML  = "<h1>begin</h1>";
    canv.innerHTML += "<div style=\"height:3vh;\"></div>";
    canv.innerHTML += "<div id = \"btn_holder\">";
    canv.innerHTML += "<button id = \"cbow_btn\">CBOW</button>"
    canv.innerHTML += "<button id = \"skip_btn\">skip-gram</button></div>"
    const cbow_btn = document.getElementById( "cbow_btn" ),
          skip_btn = document.getElementById( "skip_btn" );
    cbow_btn.addEventListener( "click", () => { canv.dataset.status = "onehot"; canv.dataset.mode = "cbow"; } );
    skip_btn.addEventListener( "click", () => { canv.dataset.status = "onehot"; canv.dataset.mode = "skipgram"; } );
}
function canv_onehot()
{
    canv.innerHTML  = "";
}
function canv_updater( status )
{
    console.log("updater");
    if( status === "init" ) { canv_init(); }
    switch( status )
    {
        case "init":    { canv_init();   }
        case 'onehot':  { canv_onehot(); }
    }
}
canv.dataset.status.addEventListener( "change", () => { canv_updater( canv.dataset.status ); } );
window.onload = (e) => {
    console.log('page loaded');
    canv.dataset.status = "init";
    canv.dataset.mode   = "init";
    canv_updater( canv.dataset.status );
};