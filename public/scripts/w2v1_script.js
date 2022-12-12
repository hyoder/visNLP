const canv = document.getElementById( "w2v_canv" );
function init_canv()
{
    canv.innerHTML  = "<h1>begin</h1>";
    canv.innerHTML += "<div style=\"height:3vh;\"></div>";
    canv.innerHTML += "<div id = \"btn_holder\">";
    canv.innerHTML += "<button id = \"cbow_btn\">CBOW</button>"
    canv.innerHTML += "<button id = \"cbow_btn\">CBOW</button>"
    canv.innerHTML += "<button id = \"skip_btn\">skip-gram</button></div>"
    const cbow_btn = document.getElementById( "cbow_btn" ),
    skip_btn = document.getElementById( "skip_btn" );
    cbow_btn.addEventListener( "click", () => { canv.dataset.status = "onehot"; canv.dataset.mode = "cbow"; } );
    skip_btn.addEventListener( "click", () => { canv.dataset.status = "onehot"; canv.dataset.mode = "skipgram"; } );
}
function onehot_canv()
{
    canv.innerHTML  = "";
}
function updater( status )
{
         if( status === "init" )   {   init_canv(); }
    else if( status === "onehot" ) { onehot_canv(); }
}
canv.dataset.status.addEventListener( "change", () => { updater(canv.dataset.status); } );
window.onload = function() { updater("init"); }