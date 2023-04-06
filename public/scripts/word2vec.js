const      canv = document.getElementById( "canv" ),
        sidebar = document.getElementById( "sidebar"),
         footer = document.getElementById( "footer"),
       back_btn = document.getElementById( "back_btn" ),
        fwd_btn = document.getElementById( "fwd_btn" ),
        adm_btn = document.getElementById( "adm_btn" ),
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
function init()
{
    setfooter();
    canv.dataset.mode = "n/a";
    canv.innerHTML  = meta();
    let cbow_btn = document.getElementById("cbow_btn"),
        skip_btn = document.getElementById("skip_btn"),
        prev_btn = document.getElementById("prev_btn"),
        next_btn = document.getElementById("next_btn");
        cbow_btn.innerHTML = "<h1>word2vec step-by-step: CBOW</h1>";
        skip_btn.innerHTML = "<h1>word2vec step-by-step: skip-gram</h1>";
        prev_btn.innerHTML = "<h2>prev:</h2><h1>home</h1>";
        next_btn.innerHTML = "<h2>next:</h2><h1>sen2vec</h1>";
        cbow_btn.addEventListener( "click"    , () => { canv.dataset.mode =     "cbow"; getData(epoch_status, canv.dataset.mode); updater(1); } );
        skip_btn.addEventListener( "click"    , () => { canv.dataset.mode = "skipgram"; getData(epoch_status, canv.dataset.mode); updater(1); } );
        prev_btn.addEventListener( "click"    , () => { window.location = '/'       ; } );
        next_btn.addEventListener( "click"    , () => { window.location = '/senback'; } );
        cbow_btn.addEventListener( "mouseover", () => { setfooter("cbow"); } );
        skip_btn.addEventListener( "mouseover", () => { setfooter("skip"); } );
        cbow_btn.addEventListener( "mouseout",  () => { setfooter(); } );
        skip_btn.addEventListener( "mouseout",  () => { setfooter(); } );
}
function textprep() 
{
    sidebar.innerHTML = "";
    setfooter();
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
    for( let i = 0 ; i < v1.length ; i++ )
    {
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
function onehotvec() 
{
    setfooter();
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
        else
        {
            a.textContent = "\"" + dict[i] + "\":";
            a.addEventListener( "mouseover", () => { setfooter( "onehot", a.textContent, i ); } );
            a.addEventListener( "mouseoff" , () => { setfooter(); } );
        }
        let z = document.createElement("tr");
        for( let j = 0 ; j < dict.length ; j++ )
        {
            let c = document.createElement("td");
                 if( j ==  i ) { c.textContent = "1"; c.style.backgroundColor =        "#000"; c.style.color  = "#fff"; }
            else if( i == -1 ) { c.textContent =   j; c.style.backgroundColor = "transparent"; c.style.border =  "0px"; }
            else               { c.textContent = "0"; c.style.backgroundColor =        "#aaa"; }
            c.style.fontSize = "1.5vw";
            c.style.height   =   "8vh";
            c.style.width    =   "8vw";
            c.addEventListener( "mouseover", () => { setfooter( "onehot", c.textContent, i, j ); } );
            c.addEventListener( "mouseout" , () => { setfooter(); } );
            z.appendChild(c);
        }
        b.appendChild(z);
        a.style.backgroundColor = "transparent";
        a.style.border          =         "0px";
        a.style.fontSize        =         "2vw";
        a.style.height          =         "8vh";
        if( i == -1 ) { a.style.paddingBottom = "0.0vh"; b.style.paddingBottom = "0.0vh"; }
        else          { a.style.paddingBottom = "3.5vh"; b.style.paddingBottom = "3.5vh"; }
        a.style.paddingRight    =         "3vw";
        a.style.textAlign       =       "right";
        a.style.width           =        "20vw";
        r.appendChild(a);
        r.appendChild(b);
        r.style.height = "8vh";
        t.appendChild(r);
    }
    t.style.height = "40vh";
    t.style.width  = "60vw";
    canv.appendChild(t);
}
function gen_batch() 
{
    setfooter();
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
        if( i == cntr )              
        {
            a.textContent = "(center) \""  + dict[i] + "\": ";
            let ohot = document.createElement("table");
            for( let k = 0 ; k < w2v_data["constants"]["embedding_dim"] ; k++ )
            {
                let ocell = document.createElement("td");
                    ocell.textContent    = w2v_data["params"]["param 1"][i][k];
                    ocell.style.fontSize = "1.5vw";
                    ocell.style.height   =   "8vh";
                    ocell.style.width    =   "6vw";
                ohot.appendChild(ocell);
            }
            ohot.style.left          = (50+(4*dict.length)) + "vw";
            ohot.style.position      =                     "fixed";
            ohot.style.top           =       (24.25+(12.5*i)) + "vh";
            ohot.style.verticalAlign =                    "middle";
            canv.appendChild(ohot);
            ohot.addEventListener( "mouseover", () => { ohot.style.backgroundColor =        "#bbb"; setfooter("genbatch", "ohot_cntr", cntr ); sidebar_params( 1, cntr, -1 ); } );
            ohot.addEventListener( "mouseout" , () => { ohot.style.backgroundColor = "transparent"; setfooter();                               sidebar_params(); } );
        }
        else if( i == ctx1 || i == ctx2 )
        {
            a.textContent = "(context) \"" + dict[i] + "\": ";
            let ohot = document.createElement("table");
            for( let k = 0 ; k < w2v_data["constants"]["embedding_dim"] ; k++ )
            {
                let ocell = document.createElement("td");
                    ocell.textContent    = w2v_data["params"]["param 1"][i][k];
                    ocell.style.fontSize = "1.5vw";
                    ocell.style.height   =   "8vh";
                    ocell.style.width    =   "6vw";
                ohot.appendChild(ocell);
            }
            ohot.style.left          = (50+(4*dict.length)) + "vw";
            ohot.style.position      =                     "fixed";
            ohot.style.top           =       (24.25+(12.5*i)) + "vh";
            ohot.style.verticalAlign =                    "middle";
            if( i == ctx1 ) { ohot.addEventListener( "mouseover", () => { ohot.style.backgroundColor =        "#bbb"; setfooter("genbatch", "ohot_ctx1", ctx1 ); sidebar_params( 1, ctx1, -1 ); } ); }
            if( i == ctx2 ) { ohot.addEventListener( "mouseover", () => { ohot.style.backgroundColor =        "#bbb"; setfooter("genbatch", "ohot_ctx2", ctx2 ); sidebar_params( 1, ctx2, -1 ); } ); }
                              ohot.addEventListener( "mouseout" , () => { ohot.style.backgroundColor = "transparent"; setfooter();                               sidebar_params(); } );
            canv.appendChild(ohot);
        }
        else if( i >=    0 )              { a.textContent = "\"" + dict[i] + "\": "; a.style.opacity = "50%"; }
        let z = document.createElement("tr");
        for( let j = 0 ; j < dict.length ; j++ )
        {
            let c = document.createElement("td");
            if( i == cntr )
            {
                if( j == i )
                {
                    c.textContent           =           "1";
                    c.style.backgroundColor =        "#060";
                    c.style.color           =        "#fff";
                }
                else
                {
                    c.textContent           =           "0";
                    c.style.backgroundColor =        "#9d9";
                }
                c.addEventListener("mouseover", () => { setfooter("genbatch",  "center", i); } );
                c.addEventListener("mouseout" , () => { setfooter(); } );
            }
            else if( i == ctx1 || i == ctx2 )
            {
                if( j == i )
                {
                    c.textContent           =           "1";
                    c.style.backgroundColor =        "#006";
                    c.style.color           =        "#fff";
                }
                else
                {
                    c.textContent           =           "0";
                    c.style.backgroundColor =        "#99d";
                }
                if( i == ctx1 ) { c.addEventListener("mouseover", () => { setfooter("genbatch", "context", i); } ); }
                if( i == ctx2 ) { c.addEventListener("mouseover", () => { setfooter("genbatch", "context", i); } ); }
                                  c.addEventListener("mouseout" , () => { setfooter(); } );
            }
            else if( i == -1 )
            {
                    c.textContent           =             j;
                    c.style.backgroundColor = "transparent";
                    c.style.border          =         "0px";
            }
            else
            {
                if( j == i )
                {
                    c.textContent           =           "1";
                    c.style.backgroundColor =        "#000";
                    c.style.color           =        "#fff";
                    c.style.opacity         =         "50%";
                }
                else
                {
                    c.textContent           =           "0";
                    c.style.backgroundColor =        "#fff";
                    c.style.color           =        "#000";
                    c.style.opacity         =         "50%";
                }
                c.addEventListener("mouseover", () => { setfooter("genbatch",   "other", i); } );
                c.addEventListener("mouseout" , () => { setfooter(); } );
            }
            c.style.fontSize = "1.5vw";
            c.style.height = "8vh";
            c.style.width = "4vw";
            if( i!= -1 ) { c.addEventListener( "mouseover", () => { sidebar_params( 1, i, -1 ); } ); }
                           c.addEventListener( "mouseout" , () => { sidebar_params(); } );
            z.appendChild(c);
        }
        b.appendChild(z);
        a.style.backgroundColor = "transparent";
        a.style.border          =         "0px";
        a.style.fontSize        =         "2vw";
        a.style.height          =         "8vh";
        if( i == -1 || i == dict.length - 1 ) { a.style.paddingBottom = "0.0vh"; b.style.paddingBottom = "0.0vh"; }
        else                                  { a.style.paddingBottom = "3.5vh"; b.style.paddingBottom = "3.5vh"; }
        a.style.paddingRight    =         "3vw";
        a.style.textAlign       =       "right";
        a.style.width           =        "16vw";
        r.appendChild(a);
        r.appendChild(b);
        r.style.height = "8vh";
        t.appendChild(r);
    }
    t.style.left     = "27.5vw";
    t.style.position =  "fixed";
    t.style.top      =   "16vh";
    canv.appendChild(t);
}
function mat_mult() {
    setfooter();
    sidebar_params();
    canv.innerHTML  = meta();
    canv.innerHTML += "<div style=\"height:15vh\"></div>";
    let t1 = document.createElement("table"),
        t2 = document.createElement("table"),
        t3 = document.createElement("table"),
        d1 = w2v_data["batch"]["context_embed"],
        d2 = w2v_data["params"]["param 2"],
        d3 = w2v_data["calcs"]["mat_mult"];
    for( let i = 0 ; i < d1.length ; i++ ) 
    {
        let r = document.createElement("tr");
        for( let j = 0 ; j < d1[0].length ; j++ ) 
        {
            let c = document.createElement("td");
            c.textContent = d1[i][j];
            c.style.height = "5vh";
            c.style.width  = "5vw";
            r.appendChild(c); 
        }
        r.addEventListener( "mouseover", () => { r.style.backgroundColor =        "#bbb"; setfooter( "matmult", "t1", i ); sidebar_params( 1, w2v_data["batch"]["contexts"][i], -1 ); } );
        r.addEventListener( "mouseout" , () => { r.style.backgroundColor = "transparent"; setfooter();                     sidebar_params(); } );
        t1.appendChild(r); 
    }
    for( let i = 0 ; i < d2[0].length ; i++ ) 
    {
        let r = document.createElement("tr");
        for( let j = 0 ; j < d2.length ; j++ ) 
        {
            let c = document.createElement("td");
            c.textContent = d2[j][i];
            c.style.height = "5vh";
            c.style.width  = "5vw";
            c.addEventListener( "mouseover", () => { c.style.backgroundColor =        "#bbb"; sidebar_params( 2, i, j ); } );
            c.addEventListener( "mouseout" , () => { c.style.backgroundColor = "transparent"; sidebar_params(); } );
            r.appendChild(c); 
        }
        t2.appendChild(r); 
    }
    t2.addEventListener( "mouseover", () => { setfooter( "matmult", "t2" ); } );
    t2.addEventListener( "mouseout" , () => { setfooter(); } );
    for( let i = 0 ; i < d3.length ; i++ ) 
    {
        let r = document.createElement("tr");
        for( let j = 0 ; j < d3[0].length ; j++ ) 
        {
            let c = document.createElement("td");
            c.textContent = d3[i][j];
            c.style.height = "5vh";
            c.style.width  = "5vw";
            c.addEventListener( "mouseover", () => { c.style.backgroundColor =        "#bbb"; setfooter( "matmult", "t3", i, j ); } );
            c.addEventListener( "mouseout" , () => { c.style.backgroundColor = "transparent"; setfooter(); } );
            r.appendChild(c); 
        }
        t3.appendChild(r); 
    }
    let t1label = document.createElement("h1"),
        t2label = document.createElement("h1"),
        t3label = document.createElement("h1");
        t1label.innerHTML      = "context embeddings";
        t2label.innerHTML      =     "linear weights";
        t3label.innerHTML      =             "output";
        t1.     style.left     =               "38vw";
        t2.     style.left     =               "62vw";
        t3.     style.left     =               "50vw";
        t1label.style.left     =               "38vw";
        t2label.style.left     =               "62vw";
        t3label.style.left     =               "50vw";
        t1.     style.position =              "fixed";
        t2.     style.position =              "fixed";
        t3.     style.position =              "fixed";
        t1label.style.position =              "fixed";
        t2label.style.position =              "fixed";
        t3label.style.position =              "fixed";
        t1.     style.top      =             "27.5vh";
        t2.     style.top      =               "25vh";
        t3.     style.top      =               "55vh";
        t1label.style.top      =               "24vh";
        t2label.style.top      =             "21.5vh";
        t3label.style.top      =             "51.5vh";
    canv.appendChild(t1     );
    canv.appendChild(t2     );
    canv.appendChild(t3     );
    canv.appendChild(t1label);
    canv.appendChild(t2label);
    canv.appendChild(t3label);
    let dot = document.createElement("div");
        dot.style.backgroundColor =    "#000";
        dot.style.borderRadius    =     "50%";
        dot.style.height          =     "2vh";
        dot.style.left            =    "57vw";
        dot.style.position        =   "fixed";
        dot.style.width           =     "2vh";
        dot.style.top             = "31.75vh";
    canv.appendChild( dot );
    let equals = document.createElement("div");
        equals.innerHTML      =       "=";
        equals.style.fontSize =     "2vw";  
        equals.style.left     =    "45vw";
        equals.style.position =   "fixed";
        equals.style.top      = "58.55vh";
    canv.appendChild( equals );
}
function add_bias() {
    setfooter();
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
            if( i === 0 )
            {
                let t2c = document.createElement("td");
                    t2c.textContent  = d2[j];
                    t2c.style.width  = "5vw";
                    t2c.style.height = "5vh";
                    t2c.addEventListener( "mouseover", () => { t2c.style.backgroundColor =        "#bbb"; setfooter( "addbias", "t2", i, j ); sidebar_params( 3, j ); } );
                    t2c.addEventListener( "mouseout" , () => { t2c.style.backgroundColor = "transparent"; setfooter();                        sidebar_params(); } );
                    t2r.appendChild(t2c);
            }
            let t1c = document.createElement("td"),
                t3c = document.createElement("td");
                t1c.textContent  = d1[i][j];
                t3c.textContent  = d3[i][j];
                t1c.style.width  =    "5vw";
                t3c.style.width  =    "5vw";
                t1c.style.height =    "5vh";
                t3c.style.height =    "5vh";
                t1c.addEventListener( "mouseover", () => { t1c.style.backgroundColor =        "#bbb"; setfooter( "addbias", "t1", i, j ); } );
                t1c.addEventListener( "mouseout" , () => { t1c.style.backgroundColor = "transparent"; setfooter(); } );
                t1r.appendChild(t1c);
                t3c.addEventListener( "mouseover", () => { t1c.style.backgroundColor =        "#bbb"; t2r.cells[j].style.backgroundColor =        "#bbb"; sidebar_params( 3, j );
                                                           t3c.style.backgroundColor =        "#bbb"; setfooter( "addbias", "t3", i, j ); } );
                t3c.addEventListener( "mouseout" , () => { t1c.style.backgroundColor = "transparent"; t2r.cells[j].style.backgroundColor = "transparent"; sidebar_params();
                                                           t3c.style.backgroundColor = "transparent"; setfooter(); } );
                t3r.appendChild(t3c);
        }
        t1.appendChild(t1r);
        t3.appendChild(t3r);
    }
    t2.appendChild(t2r);
    let t1label = document.createElement("h1"),
        t2label = document.createElement("h1"),
        t3label = document.createElement("h1");
        t1label.innerHTML      = "prev output";
        t2label.innerHTML      = "linear bias";
        t3label.innerHTML      =      "output";
        t1.     style.left     =      "32.5vw";
        t2.     style.left     =      "67.5vw";
        t3.     style.left     =        "50vw";
        t1label.style.left     =       "32.5vw";
        t2label.style.left     =       "67.5vw";
        t3label.style.left     =        "50vw";
        t1.     style.position =       "fixed";
        t2.     style.position =       "fixed";
        t3.     style.position =       "fixed";
        t1label.style.position =       "fixed";
        t2label.style.position =       "fixed";
        t3label.style.position =       "fixed";
        t1.     style.top      =        "25vh";
        t2.     style.top      =        "25vh";
        t3.     style.top      =        "50vh";
        t1label.style.top      =      "21.5vh";
        t2label.style.top      =      "21.5vh";
        t3label.style.top      =      "46.5vh";
        canv.appendChild(t1);
        canv.appendChild(t2);
        canv.appendChild(t3);
        canv.appendChild(t1label);
        canv.appendChild(t2label);
        canv.appendChild(t3label);
    let plus = document.createElement("div");
        plus.innerHTML      =       "+";
        plus.style.fontSize =     "2vw";  
        plus.style.left     =  "62.5vw";
        plus.style.position =   "fixed";
        plus.style.top      = "28.25vh";
    canv.appendChild( plus );
    let equals = document.createElement("div");
        equals.innerHTML      =       "=";
        equals.style.fontSize =     "2vw";  
        equals.style.position =   "fixed";
        equals.style.left     =    "45vw";
        equals.style.top      = "53.25vh";
    canv.appendChild( equals );
}
function log_softmax() {
    setfooter();
    sidebar_params();
    canv.innerHTML  = meta();
    let t1 =  document.createElement("table" ),
        t2 =  document.createElement("table" ),
        t3 =  document.createElement("table" ),
        d1 =  w2v_data["calcs"]["plus_bias"  ],
        d2 =  w2v_data["calcs"]["softmax"    ],
        d3 =  w2v_data["calcs"]["log_softmax"],
        t1label = document.createElement("h1"),
        t2label = document.createElement("h1"),
        t3label = document.createElement("h1");
        t1label.innerHTML =      "prev output";
        t2label.innerHTML =  "softmax(output)";
        t3label.innerHTML =     "log(softmax)";
    for( let i = 0 ; i < d1.length ; i++ )
    {
        let r1 = document.createElement("tr"),
            r2 = document.createElement("tr"),
            r3 = document.createElement("tr");
        for( let j = 0 ; j < d1[0].length ; j++ )
        {
            let c1 = document.createElement("td"),
                c2 = document.createElement("td"),
                c3 = document.createElement("td");
                c1.textContent  = d1[i][j];
                c2.textContent  = d2[i][j];
                c3.textContent  = d3[i][j];
                c1.style.height = "5vh";
                c2.style.height = "5vh";
                c3.style.height = "5vh";
                c1.style.width  = "5vw";
                c2.style.width  = "5vw";
                c3.style.width  = "5vw";
                c1.addEventListener( "mouseover", () => { c1.style.backgroundColor =        "#bbb"; c2.style.backgroundColor =        "#bbb";
                                                          c3.style.backgroundColor =        "#bbb"; setfooter( "softmax", "t1", i, j ); 
                                                        } );
                c1.addEventListener( "mouseout" , () => { c1.style.backgroundColor = "transparent"; c2.style.backgroundColor = "transparent";
                                                          c3.style.backgroundColor = "transparent"; setfooter(); } );
                c2.addEventListener( "mouseover", () => { c1.style.backgroundColor =        "#bbb"; c2.style.backgroundColor =        "#bbb";
                                                          c3.style.backgroundColor =        "#bbb"; setfooter( "softmax", "t2", i, j ); } );
                c2.addEventListener( "mouseout" , () => { c1.style.backgroundColor = "transparent"; c2.style.backgroundColor = "transparent";
                                                          c3.style.backgroundColor = "transparent"; setfooter();  } );
                c3.addEventListener( "mouseover", () => { c1.style.backgroundColor =        "#bbb"; c2.style.backgroundColor =        "#bbb";
                                                          c3.style.backgroundColor =        "#bbb"; setfooter( "softmax", "t3", i, j ); 
                                                        } );
                c3.addEventListener( "mouseout" , () => { c1.style.backgroundColor = "transparent"; c2.style.backgroundColor = "transparent";
                                                          c3.style.backgroundColor = "transparent"; setfooter();  } );
                r1.appendChild(c1);
                r2.appendChild(c2);
                r3.appendChild(c3);
        }
                t1.appendChild(r1);
                t2.appendChild(r2);
                t3.appendChild(r3);
    }
                t1.     style.position =  "fixed";
                t2.     style.position =  "fixed";
                t3.     style.position =  "fixed";
                t1.     style.left     =   "50vw";
                t2.     style.left     =   "50vw";
                t3.     style.left     =   "50vw";
                t1.     style.top      = "27.5vh";
                t2.     style.top      = "47.5vh";
                t3.     style.top      = "67.5vh";
                t1label.style.position =  "fixed";
                t2label.style.position =  "fixed";
                t3label.style.position =  "fixed";
                t1label.style.left     =   "50vw";
                t2label.style.left     =   "50vw";
                t3label.style.left     =   "50vw";
                t1label.style.top      =   "24vh";
                t2label.style.top      =   "44vh";
                t3label.style.top      =   "64vh";
                canv.appendChild(t1);
                canv.appendChild(t2);
                canv.appendChild(t3);
                canv.appendChild(t1label);
                canv.appendChild(t2label);
                canv.appendChild(t3label);
}
function end_epoch() 
{
    setfooter();
    sidebar_params();
    canv.innerHTML  = meta();
    let t1 = document.createElement("table"),
        d1 = w2v_data["calcs"]["log_softmax"],
        t1label = document.createElement("h1");
        t1label.innerHTML = "epoch outputs";
    for( let i = 0 ; i < d1.length ; i++ )
    {
        let r1 = document.createElement("tr");
        for( let j = 0 ; j < d1[0].length ; j++ )
        {
            let c1 = document.createElement("td");
            c1.textContent = d1[i][j];
            c1.style.height = "5vh";
            c1.style.width  = "5vw";
            c1.addEventListener( "mouseover", () => { c1.style.backgroundColor =        "#bbb"; setfooter( "endepoch", "t1", i, j ); } );
            c1.addEventListener( "mouseout" , () => { c1.style.backgroundColor = "transparent"; setfooter(); } );
            r1.appendChild(c1);
        }
        t1.appendChild(r1);
    }
    t1     .style.position =  "fixed";
    t1     .style.left     =   "30vw";
    t1     .style.top      = "25.5vh";
    t1label.style.position =  "fixed";
    t1label.style.left     =   "30vw";
    t1label.style.top      =   "22vh";
    canv.appendChild(t1);
    canv.appendChild(t1label);
    let arrow = document.createElement("div");
        arrow.innerHTML = "––>"
        arrow.style.fontSize = "4vw";
        arrow.style.position = "fixed";
        arrow.style.left = "58vw";
        arrow.style.top = "26.65vh";
    canv.appendChild(arrow);
    let model = document.createElement("img");
        model.src = "https://lilianweng.github.io/posts/2017-10-15-word-embedding/word2vec-skip-gram.png";
        model.style.display  = "inline-flex";
        model.style.height   =        "35vh";
        model.style.left     =        "45vw";
        model.style.position =       "fixed";
        model.style.top      =        "40vh";
        model.addEventListener( "mouseover", () => { setfooter( "endepoch", "model" ); } );
        model.addEventListener( "mouseout" , () => { setfooter(); } );
    canv.appendChild(model);
}
function sidebar_params(param, x, y)
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
            if( param == 1 && ( x == i || x == -1 ) && ( y == j || y == -1 ) ) { p1_cell.style.backgroundColor = "#777"; }
            else { p1_cell.style.backgroundColor = "#bbb"; }
            p1_row.appendChild( p1_cell );
            
        }
        p1_table.appendChild( p1_row );
        let p3_cell = document.createElement("td");
        p3_cell.textContent = p3[i];
        if( param == 3 && ( x == i || x == -1 ) ) { p3_cell.style.backgroundColor = "#999"; }
        else { p3_cell.style.backgroundColor = "#bbb"; }
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
            if( param == 2 && ( x == i || x == -1 ) && ( y == j || y == -1 ) ) { p2_cell.style.backgroundColor = "#777"; }
            else { p2_cell.style.backgroundColor = "#bbb"; }
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
function setfooter( input, content, i, j ) {
    if( !input ) { footer.innerHTML = "<h2>hover over items on the page for more information!</h2>"; }
    else if( !content && !i && !j )
    {
        switch( input )
        {
            case    "cbow": footer.innerHTML = "<h2>continuous bag of words (CBOW) is one of the two primary settings for word2vec</h2><h2>CBOW takes an input of two context words from the corpus and searches for which word should fall between them</h2>"; break;
            case    "skip": footer.innerHTML = "<h2>skip-gram is one of the two primary settings for word2vec</h2><h2>skip-gram takes an input of one word from the corpus and seeks out the two words on either side of it</h2>";                              break;
            case "param 1": footer.innerHTML = "<h2>param 1 - word embeddings</h2><h2>initialized from random values and updated in each epoch, param 1 is the matrix of word embeddings for our corpus</h2>";                                                  break;
            case "param 2": footer.innerHTML = "<h2>param 2 - linear weights</h2><h2>initialized from random values and updated in each epoch, param 2 is the matrix of linear weights for our neural network</h2>";                                            break;
            case "param 3": footer.innerHTML = "<h2>param 3 - linear bias</h2><h2>initialized from random values and updated in each epoch, param 3 is the matrix of bias values for our neural network</h2>";                                                  break;
        } 
    }
    else 
    {
        switch( input ) 
        {
            case "onehot": 
            {
                if( i == -1 ) { footer.innerHTML = ""; }
                else
                {
                    switch( content )
                    {
                        case        "0": footer.innerHTML = "<h2>this cell being \"0\" indicates that this one-hot encoded vector is not encoding word #" + i + " in the corpus dictionary.</h2>";     break;
                        case        "1": footer.innerHTML = "<h2>this cell being \"1\" indicates that this one-hot encoded vector is the encoding for word #" + i + " in the corpus dictionary.</h2>"; break;
                        case "\"UNK\":": footer.innerHTML = "<h2>this vector is encoding \"UNK\" or the unknown token for the corpus, used for all out-of-vocabulary words we may come across.</h2>";  break;
                        default        : footer.innerHTML = "<h2>this vector is encoding \"" + w2v_data["constants"]["vocabulary"][i-1] + "\", word #" + i + " in the corpus dictionary.</h2>";        break;
                    }
                }
                break;
            }
            case "genbatch":
            {
                let type = " this is the one-hot encoded vector ";
                if( content == "ohot_cntr" || content == "ohot_ctx1" || content == "ohot_ctx2" ) { type = " these are our current word embeddings "; }
                if( i == 0 ) { footer.innerHTML = "<h2>" + type + "for word #" + i + " in the corpus dictionary, \"UNK\"</h2>"; }
                else { footer.innerHTML = "<h2>" + type + "for word #" + i + " in the corpus dictionary, \"" + w2v_data["constants"]["vocabulary"][i-1] + "\"</h2>"; }
                switch( content )
                {
                    case    "center": footer.innerHTML += "<h2>this is the center word that word2vec will be seeking to find in this epoch</h2>";         break;
                    case   "context": footer.innerHTML += "<h2>this is one of the context words that word2vec will using as an input in this epoch</h2>"; break;
                    case "ohot_cntr": footer.innerHTML += "<h2>this is the center word that word2vec will be seeking to find in this epoch</h2>";         break;
                    case "ohot_ctx1": footer.innerHTML += "<h2>this is one of the context words that word2vec will using as an input in this epoch</h2>"; break;
                    case "ohot_ctx2": footer.innerHTML += "<h2>this is one of the context words that word2vec will using as an input in this epoch</h2>"; break;
                }
                break;
            }
            case "matmult":
            {
                let num;
                     if( i == 0 ) { num =  "first"; }
                else if( i == 1 ) { num = "second"; }
                switch( content )
                {
                    case "t1": footer.innerHTML = "<h2>these are the embeddings for our " + num + " context word, \"" + w2v_data["constants"]["vocabulary"][w2v_data["batch"]["contexts"][i]-1] + "\"</h2>"; break;
                    case "t2": footer.innerHTML = "<h2>multiply the embeddings by the matrix of linear weights from parameter #2</h2>"; break;
                    case "t3": footer.innerHTML = "<h2>matrix multiplication:</h2><h2>" + w2v_data["calcs"]["mat_mult_footer"][i][j] + "</h2>"; break;
                }
                break;
            }
            case "addbias":
            {
                switch( content )
                {
                    case "t1": footer.innerHTML = "<h2>matrix multiplication results from previous page:</h2><h2>" + w2v_data["calcs"]["mat_mult_footer"][i][j] + "</h2>"; break;
                    case "t2": footer.innerHTML = "<h2>linear bias value from parameter 3</h2>"; break;
                    case "t3": footer.innerHTML = "<h2>add linear bias</h2><h2>" + w2v_data["calcs"]["plus_bias_footer"][i][j] + "</h2>"; break;
                }
                break;
            }
            case "softmax":
            {
                switch( content )
                {
                    case "t1": footer.innerHTML = "<h2>matrix multiplication plus bias results from previous page:</h2><h2>" + w2v_data["calcs"]["plus_bias_footer"][i][j] + "</h2>"; break;
                    case "t2": 
                    {
                        let string = "<h2>result of softmax equation (scales set of values so they sum to 1) applied to each row:</h2><h2>";
                        let z = w2v_data["calcs"]["softmax"][i].length;
                        for( let k = 0 ; k < z ; k++ )
                        {
                            if( k >  0 ) { string += " + "; }
                            if( j == k ) { string += "<i>" + w2v_data["calcs"]["softmax"][i][k] + "</i>" }
                            else         { string += w2v_data["calcs"]["softmax"][i][k];  }
                        }
                        string += " = 1</h2>";
                        footer.innerHTML = string;
                        break;
                    }
                    case "t3": footer.innerHTML = "<h2>natural log of softmax results:</h2><h2>" + w2v_data["calcs"]["log_softmax_footer"][i][j] + "</h2>"; break;
                }
                break;
            }
            case "endepoch":
            {
                switch( content )
                {
                    case    "t1": footer.innerHTML = "<h2>log_softmax results from prev page:</h2><h2>" + w2v_data["calcs"]["softmax"][i][j] + "</h2>"; break;
                    case  "adam": footer.innerHTML = "<h2>utilizes adam optimizer to improve output quality</h2><h2>visit the adam optimizer page for more information</h2>"; break;
                    case "model": footer.innerHTML = "<h2>this is just an example model image i am going to add one for each epoch and add source links to the db</h2>"; break;
                }
                break;
            }
        }
    }
}
function updater( val )
{
    if ( val ==  1 && page_status < 53 ) { page_status++; }
    if ( val == -1 && page_status >  0 ) { page_status--; }
    if( page_status > 0 ) { back_btn.style.display = "inline-block"; fwd_btn.style.display = "inline-block"; }
    else                  { back_btn.style.display = "none";         fwd_btn.style.display = "none"; }
    let page = statuses[ page_status ];
    if( page_status > 2 && page_status < 53 )
    {
        if( rel_page == 7 && val ==  1                    ) { epoch_status++; getData( epoch_status, canv.dataset.mode ); }
        if( rel_page == 3 && val == -1 && page_status > 3 ) { epoch_status--; getData( epoch_status, canv.dataset.mode ); }
        rel_page = page_status - epoch_status*5;
        page = statuses[rel_page];
    }
         if( val ==  1 && page === "end of epoch"     ) {                          adm_btn.style.display = "inline-block"; }
         if( val == -1 && page === "log softmax"      ) {                          adm_btn.style.display =         "none"; }
         if( val ==  1 && page === "text preparation" ) { setTimeout( function() {  textprep(); }, 200 ); }
    else if( val ==  1 && page === "generate batch"   ) { setTimeout( function() { minihelper1(); }, 200 ); }
    else if( val == -1 && page === "end of epoch"     ) { setTimeout( function() { minihelper2(); }, 200 ); }
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
function minihelper1() { adm_btn.style.display =         "none"; gen_batch(); }
function minihelper2() { adm_btn.style.display = "inline-block"; end_epoch(); }
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
back_btn.addEventListener( "click"    , ()  => {   updater(                 -1 ); } );
 fwd_btn.addEventListener( "click"    , ()  => {   updater(                  1 ); } );
 adm_btn.addEventListener( "mouseover", ()  => { setfooter( "endepoch", "adam" ); } );
 adm_btn.addEventListener( "mouseout" , ()  => { setfooter(                    ); })
p1_table.addEventListener( "mouseover", ()  => { setfooter(          "param 1" ); } );
p1_table.addEventListener( "mouseout" , ()  => { setfooter(                    ); } );
p2_table.addEventListener( "mouseover", ()  => { setfooter(          "param 2" ); } );
p2_table.addEventListener( "mouseout" , ()  => { setfooter(                    ); } );
p3_table.addEventListener( "mouseover", ()  => { setfooter(          "param 3" ); } );
p3_table.addEventListener( "mouseout" , ()  => { setfooter(                    ); } );
document.addEventListener( "keydown"  , (e) => {
                   if( e.key == 'ArrowRight' ) {   updater(                  1 ); }
                   if( e.key == 'ArrowLeft'  ) {   updater(                 -1 ); } } );