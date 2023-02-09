const      canv = document.getElementById( "canv_NSB" ),
         footer = document.getElementById( "footer_NSB"),
       back_btn = document.getElementById( "back_btn" ),
        fwd_btn = document.getElementById( "fwd_btn" ),
       statuses = ["intro", "vectorization", "use_cases", "onehot", "blackbox"];
let page_status = 0;
function meta() // sets and returns page metadata for meta div (top left corner of canvas)
{
    let output  = "<div id=\"meta_NSB\">";
        output += "<h2>basics - \"" + statuses[page_status] + "\"</h2>";
        output += "<h3>page " + page_status + " out of ??</h3>";
        output += "</div>"
    return output;
}
function intro()
{
    setfooter( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<h2>intro to natural language processing</h2>";
}
function vectorization()
{
    setfooter( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<h2>what is word vectorization?</h2>";
}
function use_cases()
{
    setfooter( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<h2>how does it get used?</h2>";
}
function onehot()
{
    setfooter( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<h2>what are one-hot encoded vectors?</h2>";
}
function blackbox()
{
    setfooter( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<h2>what is the black box problem?</h2>";
}

function setfooter( input ) // takes input from event listener and then 
{
    switch( input ) {
        case "default": footer.innerHTML = "<h2>sample footer</h2>"; break;
        case "yeah": footer.innerHTML = "<h2>this is the first footer option ! :)</h2>"; break;
        case "ok": footer.innerHTML = "<h2>this is the second footer option ! :(</h2>"; break;
    }
}
function updater( val )
{
    if ( val ==  1 ) { page_status++; }
    if ( val == -1 ) { page_status--; }
    if( page_status < statuses.length ) {  fwd_btn.display = "inline-block"; }
    else                                {  fwd_btn.display = "none"; }
    if( page_status > 0 )               { back_btn.display = "inline-block"; }
    else                                { back_btn.display = "none"; }
    let page = statuses[ page_status ];
    console.log("page: " + page);
    switch( page )
    {
        case "intro":                 intro(); break;
        case "vectorization": vectorization(); break;
        case "use_cases":         use_cases(); break;
        case "onehot":               onehot(); break;
        case "blackbox":           blackbox(); break;
    }
}
window.onload = (e) => {
    console.log('page loaded');
    updater(page_status);
};
 fwd_btn.addEventListener( "click", () => { updater( 1); } ); //adds listener to forwards and backwards button
back_btn.addEventListener( "click", () => { updater(-1); } );