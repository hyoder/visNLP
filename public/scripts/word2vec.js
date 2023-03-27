const      canv = document.getElementById( "canv" ),
        sidebar = document.getElementById( "sidebar"),
         footer = document.getElementById( "footer"),
       back_btn = document.getElementById( "back_btn" ),
        fwd_btn = document.getElementById( "fwd_btn" ),
       statuses = ["init", "text preparation", "one-hot encoding", "generate batch", "multiply matrices", "add bias", "log softmax", "end of epoch"],
       p1_table = document.getElementById( "param1" ),
       p2_table = document.getElementById( "param2" ),
       p3_table = document.getElementById( "param3" ),
       p1_label = document.getElementById( "p1label" ),
       p2_label = document.getElementById( "p2label" ),
       p3_label = document.getElementById( "p3label" ),
    epoch_count = 10;
let page_status = 0, rel_page = 0, epoch_status = 0, dict = [];
let w2v_data;
function meta()
{
    let output  = "<div id=\"meta\">";
    if( page_status < 3 ) { output += "<h2>word2vec - \"" + statuses[page_status] + "\"</h2>"; }
    else{ output += "<h2>word2vec - \"" + statuses[rel_page] + "\" (epoch " + (epoch_status+1) + ")</h2>";}    
    if( page_status > 0 )
    {
        if( canv.dataset.mode === "cbow"     ) { output += "<h4>page #" + (page_status+1) + ", mode: CBOW</h4>";      }
        if( canv.dataset.mode === "skipgram" ) { output += "<h4>page #" + (page_status+1) + ", mode: skip-gram</h4>"; }
    }
    else { output += "<h4>page #" + (page_status+1) + "</h4>"; }
    return output += "</div>"
}
function init() {
    setfooter( "default" );
    canv.dataset.mode = "n/a";
    canv.innerHTML  = meta();
    canv.innerHTML += "<div style=\"height:15vh\"></div>";
    canv.innerHTML += "<h2>select mode for word2vec:</h2>";
    let btn_holder  = "<div style=\"position:fixed;right:12.5vw;top:35vh;\">"
        btn_holder += "<button id = \"cbow_btn\">CBOW</button>"
        btn_holder += "<button id = \"skip_btn\">skip-gram</button>"
        btn_holder += "</div>";
    canv.innerHTML += btn_holder;
    const cbow_btn = document.getElementById( "cbow_btn" ),
          skip_btn = document.getElementById( "skip_btn" );
    cbow_btn.addEventListener( "click", () => { canv.dataset.mode =     "cbow"; getData(0, canv.dataset.mode); updater(1); } );
    skip_btn.addEventListener( "click", () => { canv.dataset.mode = "skipgram"; getData(0, canv.dataset.mode); updater(1); } );
    cbow_btn.addEventListener( "mouseover", () => { setfooter( "cbow" ); } );
    skip_btn.addEventListener( "mouseover", () => { setfooter( "skip" ); } );
    cbow_btn.addEventListener( "mouseout",  () => { setfooter( "default" ); } );
    skip_btn.addEventListener( "mouseout",  () => { setfooter( "default" ); } );
}
function textprep() {
    setfooter( "default" );
    const t = document.createElement("table");
    canv.innerHTML  = meta();
    canv.innerHTML += "<div style=\"height:15vh\"></div>";
    let i1 = w2v_data["constants"]["input"],
        i2 = i1.replace(/[^\w\s]/gi, ''),
        i3 = i2.toLowerCase();
        i0 = w2v_data["constants"]["vocabulary"],
        i4 = "[ \"" + i0[0] + "\", \"" + i0[1] + "\", \"" + i0[2] + "\", \"" + i0[3] + "\" ]",
        v1 = ["input", "remove non-alphanumeric characters", "make lowercase", "split words into array"],
        v2 = [i1,i2,i3,i4];
    for( let i = 0 ; i < v1.length ; i++ ) {
        let r = document.createElement("tr");
        r.style.height   = "8vh";
        r.style.fontSize = "1.5vw";
        let a = document.createElement("td"),
            b = document.createElement("td");
        a.textContent = v1[i];
        b.textContent = v2[i];
        a.style.width = "25vw";
        b.style.width = "20vw";
        a.style.backgroundColor = "#ccc";
        b.style.backgroundColor = "#ccc";
        r.appendChild( a );
        r.appendChild( b );
        t.appendChild( r );
    }
    canv.appendChild(t);
    canv.innerHTML += "<div style=\"height:5vh\"></div>";
    canv.innerHTML += "<h2>dictionary: <h2>";
    canv.innerHTML += "<div style=\"height:2vh\"></div>";
    dict[0] = "UNK";
    for( let i = 0 ; i < i0.length ; i++ ) { dict[i+1] = i0[i]; }
    let ds = "{ ";
    for( let i = 0 ; i < dict.length-1 ; i++ ) { ds += "\"" + dict[i] + "\": " + i + ", "}
    ds += "\"" + dict[4] + "\" }";
    canv.innerHTML += "<h1>" + ds + "</h1>";
}
function onehotvec() {
    clear_params();
    canv.innerHTML  = meta();
    canv.innerHTML += "<div style=\"height:8vh\"></div>";
    let t = document.createElement("table");
    for( let i = -1 ; i < dict.length ; i++ )
    {
        let r = document.createElement("tr"),
            a = document.createElement("td"),
            b = document.createElement("table");
        if( i == -1 ) { a.textContent = ""; }
        else { a.textContent = "\"" + dict[i] + "\":"; }
        let z = document.createElement("tr");
        for( let j = 0 ; j < dict.length ; j++ )
        {
            let c = document.createElement("td");
            if( j == i ) { c.textContent = "1"; c.style.backgroundColor = "#000"; c.style.color = "#fff"; }
            else if( i == -1 ) { c.textContent = j; c.style.backgroundColor = "transparent"; c.style.border = "0px"; }
            else { c.textContent = "0"; c.style.backgroundColor = "#aaa"; }
            c.style.fontSize = "1.5vw";
            c.style.height = "8vh";
            c.style.width = "8vw";
            z.appendChild(c);
        }
        b.appendChild(z);
        a.style.backgroundColor = "transparent";
        a.style.border          = "0px";
        a.style.fontSize        = "2vw";
        a.style.height          = "8vh";
        if( i == -1 ) { a.style.paddingBottom = "0.0vh"; b.style.paddingBottom = "0.0vh"; }
        else          { a.style.paddingBottom = "3.5vh"; b.style.paddingBottom = "3.5vh"; }
        a.style.paddingRight    = "3vw";
        a.style.textAlign       = "right";
        a.style.width           = "20vw";
        r.appendChild(a);
        r.appendChild(b);
        r.style.height = "8vh";
        t.appendChild(r);
    }
    t.style.height = "40vh";
    t.style.width  = "60vw";
    canv.appendChild(t);
}
function gen_batch() {
    sidebar_params();
    canv.innerHTML  = meta();
    canv.innerHTML += "<div style=\"height:8vh\"></div>";
    let cntr = w2v_data["batch"]["centers"][0],
        ctx1 = w2v_data["batch"]["contexts"][0],
        ctx2 = w2v_data["batch"]["contexts"][1];
    let t = document.createElement("table");
    for( let i = -1 ; i < dict.length ; i++ )
    {
        let r = document.createElement("tr"),
            a = document.createElement("td"),
            b = document.createElement("table");
             if( i == cntr )              { a.textContent = "(center) \"" + dict[i] + "\": "; }
        else if( i == ctx1 || i == ctx2 ) { a.textContent = "(context) \"" + dict[i] + "\": "; }
        else                              { a.textContent = ""; }
        let z = document.createElement("tr");
        for( let j = 0 ; j < dict.length ; j++ )
        {
            let c = document.createElement("td");
            if( i == cntr )
            {
                if( j == i ) { c.textContent = "1"; c.style.backgroundColor = "#060"; c.style.color = "#fff"; }
                else         { c.textContent = "0"; c.style.backgroundColor = "#9d9"; }
            }
            else if( i == ctx1 || i == ctx2 )
            {
                if( j == i ) { c.textContent = "1"; c.style.backgroundColor = "#006"; c.style.color = "#fff"; }
                else         { c.textContent = "0"; c.style.backgroundColor = "#99d"; }
            }
            else if( i == -1 ) { c.textContent = j; c.style.backgroundColor = "transparent"; c.style.border = "0px"; }
            else { c.style.backgroundColor = "transparent"; c.style.border = "0px"; }
            c.style.fontSize = "1.5vw";
            c.style.height = "8vh";
            c.style.width = "8vw";
            z.appendChild(c);
        }
        b.appendChild(z);
        a.style.backgroundColor = "transparent";
        a.style.border          = "0px";
        a.style.fontSize        = "2vw";
        a.style.height          = "8vh";
        if( i == -1 ) { a.style.paddingBottom = "0.0vh"; b.style.paddingBottom = "0.0vh"; }
        else          { a.style.paddingBottom = "3.5vh"; b.style.paddingBottom = "3.5vh"; }
        a.style.paddingRight    = "3vw";
        a.style.textAlign       = "right";
        a.style.width           = "20vw";
        r.appendChild(a);
        r.appendChild(b);
        r.style.height = "8vh";
        t.appendChild(r);
    }
    t.style.height = "40vh";
    t.style.width  = "60vw";
    canv.appendChild(t);
}
function mat_mult() {
    sidebar_params();
    canv.innerHTML  = meta();
    canv.innerHTML += "<div style=\"height:15vh\"></div>";
    let t1 = document.createElement("table"),
        t2 = document.createElement("table"),
        t3 = document.createElement("table"),
        d1 = w2v_data["batch"]["context_embed"],
        d2 = w2v_data["params"]["param 2"],
        d3 = w2v_data["calcs"]["mat_mult"];
    for( let i = 0 ; i < d1.length ; i++ ) {
        let r = document.createElement("tr");
        for( let j = 0 ; j < d1[0].length ; j++ ) {
            let c = document.createElement("td");
            c.textContent = d1[i][j];
            c.style.height = "5vh";     c.style.width  = "5vw";
            r.appendChild(c); }
        t1.appendChild(r); }
    for( let i = 0 ; i < d2[0].length ; i++ ) {
        let r = document.createElement("tr");
        for( let j = 0 ; j < d2.length ; j++ ) {
            let c = document.createElement("td");
            c.textContent = d2[j][i];
            c.style.height = "5vh";     c.style.width  = "5vw";
            r.appendChild(c); }
        t2.appendChild(r); }
    for( let i = 0 ; i < d3.length ; i++ ) {
        let r = document.createElement("tr");
        for( let j = 0 ; j < d3[0].length ; j++ ) {
            let c = document.createElement("td");
            c.textContent = d3[i][j];
            c.style.height = "5vh";     c.style.width  = "5vw";
            r.appendChild(c); }
        t3.appendChild(r); }
    t1.style.left     = "38vw";     t2.style.left     = "62vw";     t3.style.left     = "50vw";
    t1.style.position = "fixed";    t2.style.position = "fixed";    t3.style.position = "fixed";
    t1.style.top      = "27.5vh";   t2.style.top      = "25vh";     t3.style.top      = "55vh";
    canv.appendChild(t1);           canv.appendChild(t2);           canv.appendChild(t3);
    let t1label = document.createElement("h1"),     t2label = document.createElement("h1"),     t3label = document.createElement("h1");
        t1label.innerHTML = "context embeddings";   t2label.innerHTML = "linear weights";       t3label.innerHTML = "output";
        t1label.style.left     = "38vw";            t2label.style.left     = "62vw";            t3label.style.left     = "50vw";
        t1label.style.position = "fixed";           t2label.style.position = "fixed";           t3label.style.position = "fixed";
        t1label.style.top      = "24vh";            t2label.style.top      = "21.5vh";          t3label.style.top      = "51.5vh";
        canv.appendChild(t1label);                  canv.appendChild(t2label);                  canv.appendChild(t3label);
    let dot = document.createElement("div");    dot.style.backgroundColor = "#000"; dot.style.height = "2vh";   dot.style.left = "57vw";
    dot.style.position = "fixed";               dot.style.borderRadius    = "50%";  dot.style.width  = "2vh";   dot.style.top  = "31.75vh";
    canv.appendChild( dot );
    let equals = document.createElement("div");     equals.innerHTML  = "=";     equals.style.fontSize = "2vw";  
    equals.style.position = "fixed";                equals.style.left = "45vw"; equals.style.top       = "58.55vh";
    canv.appendChild( equals );
}
function add_bias() {
    sidebar_params();
    canv.innerHTML  = meta();
    let t1 = document.createElement("table"),
        t2 = document.createElement("table"),
        t3 = document.createElement("table"),
        d1 = w2v_data["calcs"]["mat_mult"],
        d2 = w2v_data["params"]["param 3"],
        d3 = w2v_data["calcs"]["plus_bias"],
       t2r = document.createElement("tr");
    for( let i = 0 ; i < d1.length ; i++ )
    {
        let t1r = document.createElement("tr"),
            t3r = document.createElement("tr");
        for( let j = 0 ; j < d1[0].length ; j++ )
        {
            let t1c = document.createElement("td"),         t3c = document.createElement("td");
            t1c.textContent = d1[i][j];     t1c.style.width = "5vw";    t1c.style.height = "5vh";   t1r.appendChild(t1c);
            t3c.textContent = d3[i][j];     t3c.style.width = "5vw";    t3c.style.height = "5vh";   t3r.appendChild(t3c);
            if( i === 0 ) {
                let t2c = document.createElement("td");
                t2c.textContent = d2[j];    t2c.style.width = "5vw";    t2c.style.height = "5vh";   t2r.appendChild(t2c); }
        }
        t1.appendChild(t1r);
        t3.appendChild(t3r);
    }
    t2.appendChild(t2r);
    t1.style.left     = "32.5vw";       t2.style.left     = "67.5vw";       t3.style.left     = "50vw";
    t1.style.position = "fixed";        t2.style.position = "fixed";        t3.style.position = "fixed";
    t1.style.top      = "25vh";         t2.style.top      = "25vh";         t3.style.top      = "50vh";
    canv.appendChild(t1);               canv.appendChild(t2);               canv.appendChild(t3);
    let t1label = document.createElement("h1"), t2label = document.createElement("h1"), t3label = document.createElement("h1");
        t1label.innerHTML = "prev output";      t2label.innerHTML = "linear bias";      t3label.innerHTML = "output";
        t1label.style.left = "32.5vw";          t2label.style.left = "67.5vw";          t3label.style.left = "50vw";
        t1label.style.position = "fixed";       t2label.style.position = "fixed";       t3label.style.position = "fixed";
        t1label.style.top = "21.5vh";           t2label.style.top = "21.5vh";           t3label.style.top = "46.5vh";
        canv.appendChild(t1label);              canv.appendChild(t2label);              canv.appendChild(t3label);
    let plus = document.createElement("div");   plus.innerHTML  = "+";      plus.style.fontSize = "2vw";  
    plus.style.position = "fixed";              plus.style.left = "62.5vw";   plus.style.top       = "28.25vh";
    canv.appendChild( plus );
    let equals = document.createElement("div");     equals.innerHTML  = "=";     equals.style.fontSize = "2vw";  
    equals.style.position = "fixed";                equals.style.left = "45vw"; equals.style.top       = "53.25vh";
    canv.appendChild( equals );
}
function log_softmax() {
    sidebar_params();
    canv.innerHTML  = meta();
    let         t1 = document.createElement("table"),   t2 = document.createElement("table"),   t3 = document.createElement("table"),
                d1 = w2v_data["calcs"]["plus_bias"],    d2 = w2v_data["calcs"]["softmax"],      d3 = w2v_data["calcs"]["log_softmax"],
                t1label = document.createElement("h1"), t2label = document.createElement("h1"), t3label = document.createElement("h1");
                t1label.innerHTML = "prev output";      t2label.innerHTML = "softmax(output)";  t3label.innerHTML = "log(softmax)";
    for( let i = 0 ; i < d1.length ; i++ )
    {
        let     r1 = document.createElement("tr"),      r2 = document.createElement("tr"),      r3 = document.createElement("tr");
        for( let j = 0 ; j < d1[0].length ; j++ )
        {
            let c1 = document.createElement("td"),      c2 = document.createElement("td"),      c3 = document.createElement("td");
                c1.textContent  = d1[i][j];             c2.textContent  = d2[i][j];             c3.textContent  = d3[i][j];
                c1.style.height = "5vh";                c2.style.height = "5vh";                c3.style.height = "5vh";
                c1.style.width  = "5vw";                c2.style.width  = "5vw";                c3.style.width  = "5vw";
                r1.appendChild(c1);                     r2.appendChild(c2);                     r3.appendChild(c3);
        }
                t1.appendChild(r1);                     t2.appendChild(r2);                     t3.appendChild(r3);
    }
                t1.style.position      = "fixed";       t2.style.position      = "fixed";       t3.style.position      = "fixed";
                t1.style.left          = "50vw";        t2.style.left          = "50vw";        t3.style.left          = "50vw";
                t1.style.top           = "27.5vh";      t2.style.top           = "47.5vh";      t3.style.top           = "67.5vh";
                t1label.style.position = "fixed";       t2label.style.position = "fixed";       t3label.style.position = "fixed";
                t1label.style.left     = "50vw";        t2label.style.left     = "50vw";        t3label.style.left     = "50vw";
                t1label.style.top      = "24vh";        t2label.style.top      = "44vh";        t3label.style.top      = "64vh";
                canv.appendChild(t1);                   canv.appendChild(t2);                   canv.appendChild(t3);
                canv.appendChild(t1label);              canv.appendChild(t2label);              canv.appendChild(t3label);
}
function end_epoch() {
    sidebar_params();
    canv.innerHTML  = meta();
}
function sidebar_params()
{
    clear_params();
    let p1 = w2v_data["params"]["param 1"],
        p2 = w2v_data["params"]["param 2"],
        p3 = w2v_data["params"]["param 3"];
    p1_label.innerHTML = "param 1 - word embeddings";
    p2_label.innerHTML = "param 2 - linear weights";
    p3_label.innerHTML = "param 3 - linear bias";
    let p3_row = document.createElement("tr");
    for( let i = 0 ; i < p1.length ; i++ )
    {
        let p1_row = document.createElement("tr");
        for( let j = 0 ; j < p1[0].length ; j++ )
        {
            let p1_cell = document.createElement("td");
            p1_cell.textContent = p1[i][j];
            p1_row.appendChild( p1_cell );
        }
        p1_table.appendChild( p1_row );
        let p3_cell = document.createElement("td");
        p3_cell.textContent = p3[i];
        p3_row.appendChild( p3_cell );
    }
    p3_table.appendChild( p3_row );
    for( let i = 0 ; i < p2[0].length ; i++ )
    {
        let p2_row = document.createElement("tr");
        for( let j = 0 ; j < p2.length ; j++ )
        {
            let p2_cell = document.createElement("td");
            p2_cell.textContent = p2[j][i];
            p2_row.appendChild( p2_cell );
        }
        p2_table.appendChild( p2_row );
    }
}
function clear_params()
{
    while( p1_table.firstChild ) { p1_table.removeChild( p1_table.firstChild ); }
    while( p2_table.firstChild ) { p2_table.removeChild( p2_table.firstChild ); }
    while( p3_table.firstChild ) { p3_table.removeChild( p3_table.firstChild ); }
    p1_label.innerHTML = "";
    p2_label.innerHTML = "";
    p3_label.innerHTML = "";
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
    if ( val ==  1 && page_status < 53 ) { page_status++; }
    if ( val == -1 && page_status >  0 ) { page_status--; }
    if( page_status > 0 ) { back_btn.style.display = "inline-block"; fwd_btn.style.display = "inline-block"; }
    else                  { back_btn.style.display = "none"; fwd_btn.style.display = "none"; }
    let page = statuses[ page_status ];
    if( page_status > 2 && page_status < 53 )
    {
        if( rel_page == 7 && val ==  1                    ) { epoch_status++; getData( epoch_status, canv.dataset.mode ); }
        if( rel_page == 3 && val == -1 && page_status > 3 ) { epoch_status--; getData( epoch_status, canv.dataset.mode ); }
        rel_page = page_status - epoch_status*5;
        page = statuses[rel_page];
    }
         if( val ==  1 && page === "text preparation" ) { setTimeout( function() {  textprep(); }, 200 ); }
    else if( val ==  1 && page === "generate batch"   ) { setTimeout( function() { gen_batch(); }, 200 ); }
    else if( val == -1 && page === "end of epoch"     ) { setTimeout( function() { end_epoch(); }, 200 ); }
    else {
        switch( page ) {
            case "init":                  init(); break;
            case "text preparation":  textprep(); break;
            case "one-hot encoding": onehotvec(); break;
            case "generate batch":   gen_batch(); break;
            case "multiply matrices": mat_mult(); break;
            case "add bias":          add_bias(); break;
            case "log softmax":    log_softmax(); break;
            case "end of epoch":     end_epoch(); break;
        }
    }
    console.log( "page_num: " + page_status + ", page: " + page );
}
//call with getData(0) for 0: Object
function getData( epoch, type )
{
    if( type === "cbow" ) {
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
document.addEventListener( "keydown", (e) => {
    if( e.key == 'ArrowRight' ) { updater( 1); }
    if( e.key == 'ArrowLeft'  ) { updater(-1); }
    if( e.key == 'ArrowDown'  ) { updater( 0); } } );