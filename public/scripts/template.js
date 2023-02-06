const      canv = document.getElementById( "canv" ),
        sidebar = document.getElementById( "sidebar"),
         footer = document.getElementById( "footer"),
       back_btn = document.getElementById( "back_btn" ),
        fwd_btn = document.getElementById( "fwd_btn" ),
       statuses = ["status1", "status2", "status3"];
let page_status = 0;
function meta() // sets and returns page metadata for meta div (top left corner of canvas)
{
    let output  = "<div id=\"meta\">";
        output += "<h2>title - \"" + statuses[page_status] + "\"</h2>";
        output += "<h3>page " + page_status + " out of ??</h3>";
        output += "</div>"
    return output;
}
function status1()
{
    setfooter( "default" );
    canv.dataset.mode = "n/a";
    canv.innerHTML  = meta(); //starts by populating meta div
    canv.innerHTML += "<div style=\"height:15vh\"></div>"; //im just gonna leave the html here from w2v page 1 but this is how u add the html
    canv.innerHTML += "<h2>select mode for word2vec:</h2>";
    let btn_holder  = "<div style=\"position:fixed;right:16.5vw;top:35vh;\">"
        btn_holder += "<button id = \"btn1\">yeah</button>"
        btn_holder += "<button id = \"btn2\">ok</button>"
        btn_holder += "</div>";
    canv.innerHTML += btn_holder;
    const btn1 = document.getElementById( "btn1" ),
          btn2 = document.getElementById( "btn2" );
    btn1.addEventListener( "click", () => { canv.dataset.mode = "yeah";     updater(1); } );
    btn2.addEventListener( "click", () => { canv.dataset.mode =   "ok"; updater(1); } );
    btn1.addEventListener( "mouseover", () => { setfooter( "yeah" ); } ); //sets footer when mousing over
    btn2.addEventListener( "mouseover", () => { setfooter( "ok" ); } );
    btn1.addEventListener( "mouseout",  () => { setfooter( "default" ); } ); //resets footer when mouse off
    btn2.addEventListener( "mouseout",  () => { setfooter( "default" ); } );
}
function status2()
{
    setfooter( "default" );
    canv.innerHTML  = meta(); //resets canvas html by re-initializing as meta() output
    canv.innerHTML += "<h1>put whatever else you want here</h1>"
}
function setfooter( input ) // takes input from event listener and then 
{
    switch( input ) {
        case "default": footer.innerHTML = "<h2>info box will be here!</h2>"; break;
        case "yeah": footer.innerHTML = "<h2>this is the first footer option ! :)</h2>"; break;
        case "ok": footer.innerHTML = "<h2>this is the second footer option ! :(</h2>"; break;
    }
}
function updater( val ) // takes input of 1 to advance page or -1 to go back a page
{
    if ( val ==  1 ) { page_status++; }
    if ( val == -1 ) { page_status--; }
    if( page_status > 0 ) { back_btn.style.display = "inline-block"; fwd_btn.style.display = "inline-block"; }
    else                  { back_btn.style.display = "none"; fwd_btn.style.display = "none"; }
    let page = statuses[ page_status ]; //gets status from index from statuses array
    console.log("page: " + page);
    switch( page ) //when updater runs, runs function corresponding to the page being switched to
    {
        case "status1": status1(); break;
        case "status2": status2(); break;
        case "status3": status3(); break;
    }
}
window.onload = (e) => {
    console.log('page loaded');
    updater(page_status);
};
 fwd_btn.addEventListener( "click", () => { updater( 1); } ); //adds listener to forwards and backwards button
back_btn.addEventListener( "click", () => { updater(-1); } );