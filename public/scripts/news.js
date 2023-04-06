const      canv = document.getElementById( "canv_song" ),
   sidebar_canv = document.getElementById( "sidebar_canv_adam"),
         footer = document.getElementById( "footer"),
   state_select = document.getElementById( "state_select" ),
     submit_btn = document.getElementById( "submit_btn"),
      reset_btn = document.getElementById( "song_reset_btn" )
        sidebar = document.getElementById( "sidebar_adam"),
       statuses = ["songs_intro", "songs0", "songs1", "songs2", "songs3", "songs4", "songs5", "songs6", "songs7", "songs8", "songs9"];
// init current page and epoch
let page_status = 0;
let epoch_status = 0;
// init data var
let adam_data;
// define page and epoch counts
let page_count = 11;
let epoch_count = 20;


function meta() // sets and returns page metadata for meta div (top left corner of canvas)
{
    let output  = "<div id=\"meta_adam\" class=\"meta_adam_class\" >";
        output += "<h4>Curr Song: " + "<h5>" + (page_status) + "</h5>" + "</h4>";
        output += "</div>"
    return output;
}

function songs_intro()
{
    setfooter( "songs_intro" ); 
    setsidebar( "default" );
    canv.innerHTML = "<h2> intro canv content </h2>"

}

function songs0()
{
    setfooter( "songs0" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<h2> songs 1 page content </h2>"

}

function songs1()
{
    setfooter( "songs1" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<h2> songs 2 page content  </h2>"
    
}

function songs2()
{
    setfooter( "songs2" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();   
    canv.innerHTML += "<h2> songs 3 page content  </h2>"      
    
}

function songs3()
{
    setfooter( "songs3" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<h2> songs 4 page content  </h2>"

}

function songs4()
{
    setfooter( "songs4" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<h2> songs 5 page content  </h2>"

}

function songs5()
{
    setfooter( "songs5" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();  
    canv.innerHTML += "<h2> songs 6 page content  </h2>" 
}


function songs6()
{
    setfooter( "songs6" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<h2> songs 7 page content  </h2>"

}

function songs7()
{
    setfooter( "songs7" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<h2> songs 8 page content  </h2>"
}

function songs8()
{
    setfooter( "song8" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<h2> songs 9 page content  </h2>"

}

function songs9()
{
    setfooter( "songs9" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<h2> songs 10 page content  </h2>"

}


function setfooter( input ) // takes input from event listener and then 
{
    switch( input ) {
        case "default": footer.innerHTML = "<h2>sample footer</h2>"; break;
        // SLIDE DESCRIPTIONS
        case "songs_intro": footer.innerHTML = "<h2> desc intro </h2>"
                            break;
        case "songs0":      footer.innerHTML = "<h2> desc 0</h2>"
                            break;
        case "songs1":      footer.innerHTML = "<h2> desc 1</h2>"
                            break;
        case "songs2":      footer.innerHTML = "<h2> desc 2</h2>"
                            break;
        case "songs3":      footer.innerHTML = "<h2> desc 3</h2>"
                            break;
        case "songs4":      footer.innerHTML = "<h2> desc 4</h2>"
                            break;
        case "songs5":      footer.innerHTML = "<h2> desc 5</h2>"
                            break;
        case "songs6":      footer.innerHTML = "<h2> desc 6</h2>"
                            break;
        case "songs7":      footer.innerHTML = "<h2> desc 7</h2>"
                            break;
        case "songs8":      footer.innerHTML = "<h2> desc 8</h2>"
                            break;
        case "songs9":      footer.innerHTML = "<h2> desc 9</h2>"
                            break;   
    }
}


function setsidebar( input )
{
    // CLEAR SIDEBAR CONTENTS every time it is set
    sidebar_canv.innerHTML = '';


    // INPUT HANDLER FOR CUSTOM STATES

    // might need to be used to update the first and second moment changes
    // just set a in fn variable to choose weather to query the old or new tensors
    // switch( input ) {
    //     case "default": sidebar_canv.innerHTML = "<div style='height:3vh'/>";
    //                     sidebar_canv.innerHTML += "<h2> default sidebar content </h2>";
    //                     break;
    // }


    // DROPDOWN USER TEXT


    const sidebar_curr_param_text_container = document.createElement('div');
    sidebar_curr_param_text_container.id = 'sidebar_curr_param_text_container';
    sidebar_curr_param_text_container.innerHTML = "<p> Select A Song to... </p>"
    sidebar_canv.appendChild(sidebar_curr_param_text_container);

}

function updater( val )
{
    // CHANGE PAGE STATES WITH DROPDOWN INPUT
    
    if ( val == 'r' ) { page_status = 0; }
    if ( val == 's0' ) { page_status = 1; }
    if ( val == 's1' ) { page_status = 2; }
    if ( val == 's2' ) { page_status = 3; }
    if ( val == 's3' ) { page_status = 4; }
    if ( val == 's4' ) { page_status = 5; }
    if ( val == 's5' ) { page_status = 6; }
    if ( val == 's6' ) { page_status = 7; }
    if ( val == 's7' ) { page_status = 8; }
    if ( val == 's8' ) { page_status = 9; }
    if ( val == 's9' ) { page_status = 10; }

    let page = statuses[ page_status ];
    console.log("page: " + page);

    // set display delay time in ms
    let delay = 400;
    // on pages we expect updates increase delay time
    //if (page_status == 0 || page_status == page_count - 1){ delay = 500 }    
    
    setTimeout(function() {
        switch(page) {
            case "songs_intro":
                songs_intro();
                break;
            case "songs0": 
                songs0(); 
                break;
            case "songs1": 
                songs1(); 
                break;
            case "songs2": 
                songs2(); 
                break;
            case "songs3": 
                songs3(); 
                break;
            case "songs4": 
                songs4(); 
                break;
            case "songs5": 
                songs5(); 
                break;
            case "songs6": 
                songs6(); 
                break;
            case "songs7": 
                songs7(); 
                break;
            case "songs8": 
                songs8(); 
                break;
            case "songs9": 
                songs9(); 
                break;
        }
    }, delay);
    
}

//call with getData(0) for 0: Object
function getData( step )
{
    fetch( '/adamdata?step='+step, { method: 'GET', headers: { "Content-Type": "application/json" } }, 0 )
    .then( function (response) { response.json().then( function(data) { setData(data)} ) } );
    return true;
}
function setData( json ) { adam_data = json; }

window.onload = (e) => {
    console.log('page loaded');
    updater(page_status);
};
submit_btn.addEventListener("click", () => {
    const state = state_select.value;
    console.log('state: ', state)
    updater(state);
  });
reset_btn.addEventListener( "click", () => { updater('r'); });
