const      canv = document.getElementById( "canv_adam" ),
         footer = document.getElementById( "footer_NSB"),
       back_btn = document.getElementById( "back_btn" ),
        fwd_btn = document.getElementById( "fwd_btn" ),
        sidebar = document.getElementById( "sidebar_adam"),
       statuses = ["intro", "vectorization", "use_cases", "onehot", "blackbox"];
let page_status = 0;
let epoch_status = 0;
let page_count = 5;
let epoch_count = 40;
function meta() // sets and returns page metadata for meta div (top left corner of canvas)
{
    let output  = "<div id=\"meta_adam\">";
        output += "<h2>basics - \"" + statuses[page_status] + "\"</h2>";
        output += "<h4>page " + (page_status+1) + " out of ??</h4>";

        //
        output += "<h4>epoch number: " + (epoch_status) + " !</h4>";

        output += "</div>"
    return output;
}
function intro()
{
    setfooter( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<div style='height:5vh'/>"
    canv.innerHTML += "<h3>intro to natural language processing</h3>";
}
function vectorization()
{
    setfooter( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<div style='height:5vh'/>"
    canv.innerHTML += "<h3>what is word vectorization?</h3>";
}
function use_cases()
{
    setfooter( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<div style='height:5vh'/>"
    canv.innerHTML += "<h3>how does it get used?</h3>";
}
function onehot()
{
    setfooter( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<div style='height:5vh'/>"
    canv.innerHTML += "<h3>what are one-hot encoded vectors?</h3?";
}
function blackbox()
{
    setfooter( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<div style='height:5vh'/>"
    canv.innerHTML += "<h3>what is the black box problem?</h3>";
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
    // if we are going forward and are on the last page -> update epoch +
    if ( val == 1 && page_status == page_count-1) {
        epoch_status++
        page_status = 0
    } else if (val == 1){
        page_status++;
    }
    // if we are going backward and are on the first page -> update epoch -
    if ( val == -1 && page_status == 0) {
        epoch_status--
        page_status = page_count-1
    } else if (val == -1){
        page_status--;
    }

    if (page_status <= 0 && epoch_status <= 0) { back_btn.style.display = "none"; }
    else { back_btn.style.display = "inline-block"; }
    if (page_status >= page_count-1 && epoch_status >= epoch_count -1) { fwd_btn.style.display = "none"; }
    else { fwd_btn.style.display = "inline-block"; }

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
    updater(page_status, epoch_status);
};
 fwd_btn.addEventListener( "click", () => { updater( 1); } ); //adds listener to forwards and backwards button
back_btn.addEventListener( "click", () => { updater(-1); } );
switch_adam_btn.addEventListener('click', () => { fetch( '/adam', { method:'GET' } ).then( response => response.json ); }, false );
