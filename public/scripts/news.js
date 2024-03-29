const      canv = document.getElementById( "canv_news" ),
   sidebar_canv = document.getElementById( "sidebar_canv_adam"),
         footer = document.getElementById( "footer"),
       true_btn = document.getElementById( "news_true_btn" ),
      false_btn = document.getElementById( "news_false_btn" ),
       next_btn = document.getElementById( "news_next_btn" ),
      reset_btn = document.getElementById( "news_reset_btn" ),
        sidebar = document.getElementById( "sidebar_news"),
       statuses = ["headline_1", "true_1", "false_1", "headline_2", "true_2", "false_2", "headline_3", "true_3", "false_3", "headline_4", "true_4", "false_4", "headline_5", "true_5", "false_5", "buffer_page"];
// init current page and epoch
let page_status = 0;
// define page and epoch counts
let page_count = 16;


function meta() // sets and returns page metadata for meta div (top left corner of canvas)
{
    let output  = "<div id=\"meta_adam\" class=\"meta_adam_class\" >";
        output += "<h4>Curr slide index: " + "<h5>" + (page_status) + "</h5>" + "</h4>";
        output += "</div>"
    return output;
}

function headline_1()
{
    // clear canv contents
    canv.innerHTML = '';

    // set footer and sidebar
    setfooter( "headline_1" ); 
    setsidebar( "default" );

    // title head
    const newsHeadlineContainer = document.createElement('div');
    newsHeadlineContainer.id = 'newsHeadlineContainer';
    newsHeadlineContainer.innerHTML = "<h2> 42 last-minute Mothers Day gifts that shell actually love </h2>"
    canv.appendChild(newsHeadlineContainer);

    // visuals container
    const newsVisualContainer = document.createElement('div');
    newsVisualContainer.id = 'newsVisualContainer';
    // newsVisualContainer.innerHTML = "<h2> headline (1) question canv content </h2>"
    canv.appendChild(newsVisualContainer);

    // APPEND IMAGE
    const img = document.createElement('img');
    img.src = 'assets/final-graph-pre.jpg';
    newsVisualContainer.appendChild(img);

}


function true_1()
{
    // clear canv contents
    canv.innerHTML = '';

    // set footer and sidebar
    setfooter( "true_1" ); 
    setsidebar( "default" );

    // title head
    const newsHeadlineContainer = document.createElement('div');
    newsHeadlineContainer.id = 'newsHeadlineContainer';
    newsHeadlineContainer.innerHTML = "<h2> 42 last-minute Mothers Day gifts that shell actually love </h2>"
    canv.appendChild(newsHeadlineContainer);

    // visuals container
    const newsVisualContainer = document.createElement('div');
    newsVisualContainer.id = 'newsVisualContainer';
    canv.appendChild(newsVisualContainer);

    // APPEND IMAGE
    const img = document.createElement('img');
    img.src = 'assets/first-graph.jpg';
    newsVisualContainer.appendChild(img);

}


function false_1()
{
    // clear canv contents
    canv.innerHTML = '';

    // set footer and sidebar
    setfooter( "false_1" ); 
    setsidebar( "default" );
    
    // title head
    const newsHeadlineContainer = document.createElement('div');
    newsHeadlineContainer.id = 'newsHeadlineContainer';
    newsHeadlineContainer.innerHTML = "<h2> 42 last-minute Mothers Day gifts that shell actually love </h2>"
    canv.appendChild(newsHeadlineContainer);

    // visuals container
    const newsVisualContainer = document.createElement('div');
    newsVisualContainer.id = 'newsVisualContainer';
    canv.appendChild(newsVisualContainer);

    // APPEND IMAGE
    const img = document.createElement('img');
    img.src = 'assets/first-graph.jpg';
    newsVisualContainer.appendChild(img);

}


function headline_2()
{
    // clear canv contents
    canv.innerHTML = '';

    // set footer and sidebar
    setfooter( "headline_2" ); 
    setsidebar( "default" );
    
    // title head
    const newsHeadlineContainer = document.createElement('div');
    newsHeadlineContainer.id = 'newsHeadlineContainer';
    newsHeadlineContainer.innerHTML = "<h2> Did Miley Cyrus get mad at Liam Hemsworth for refusing to wear his promise ring? </h2>"
    canv.appendChild(newsHeadlineContainer);

    // visuals container
    const newsVisualContainer = document.createElement('div');
    newsVisualContainer.id = 'newsVisualContainer';
    canv.appendChild(newsVisualContainer);

    // APPEND IMAGE
    const img = document.createElement('img');
    img.src = 'assets/final-graph-pre.jpg';
    newsVisualContainer.appendChild(img);

}


function true_2()
{
    // clear canv contents
    canv.innerHTML = '';

    // set footer and sidebar
    setfooter( "true_2" ); 
    setsidebar( "default" );
    
    // title head
    const newsHeadlineContainer = document.createElement('div');
    newsHeadlineContainer.id = 'newsHeadlineContainer';
    newsHeadlineContainer.innerHTML = "<h2>Did Miley Cyrus get mad at Liam Hemsworth for refusing to wear his promise ring? </h2>"
    canv.appendChild(newsHeadlineContainer);

    // visuals container
    const newsVisualContainer = document.createElement('div');
    newsVisualContainer.id = 'newsVisualContainer';
    canv.appendChild(newsVisualContainer);

    // APPEND IMAGE
    const img = document.createElement('img');
    img.src = 'assets/second-graph.jpg';
    newsVisualContainer.appendChild(img);

}


function false_2()
{
    // clear canv contents
    canv.innerHTML = '';

    // set footer and sidebar
    setfooter( "false_2" ); 
    setsidebar( "default" );
    
    // title head
    const newsHeadlineContainer = document.createElement('div');
    newsHeadlineContainer.id = 'newsHeadlineContainer';
    newsHeadlineContainer.innerHTML = "<h2> Did Miley Cyrus get mad at Liam Hemsworth for refusing to wear his promise ring? </h2>"
    canv.appendChild(newsHeadlineContainer);

    // visuals container
    const newsVisualContainer = document.createElement('div');
    newsVisualContainer.id = 'newsVisualContainer';
    canv.appendChild(newsVisualContainer);

    // APPEND IMAGE
    const img = document.createElement('img');
    img.src = 'assets/second-graph.jpg';
    newsVisualContainer.appendChild(img);
    
}


function headline_3()
{
    // clear canv contents
    canv.innerHTML = '';

    // set footer and sidebar
    setfooter( "headline_3" ); 
    setsidebar( "default" );
    
    // title head
    const newsHeadlineContainer = document.createElement('div');
    newsHeadlineContainer.id = 'newsHeadlineContainer';
    newsHeadlineContainer.innerHTML = "<h2> Nicole Kidman and Prince Harry named sexiest redheads </h2>"
    canv.appendChild(newsHeadlineContainer);

    // visuals container
    const newsVisualContainer = document.createElement('div');
    newsVisualContainer.id = 'newsVisualContainer';
    canv.appendChild(newsVisualContainer);

    // APPEND IMAGE
    const img = document.createElement('img');
    img.src = 'assets/final-graph-pre.jpg';
    newsVisualContainer.appendChild(img);

}


function true_3()
{
    // clear canv contents
    canv.innerHTML = '';

    // set footer and sidebar
    setfooter( "true_3" ); 
    setsidebar( "default" );
    
    // title head
    const newsHeadlineContainer = document.createElement('div');
    newsHeadlineContainer.id = 'newsHeadlineContainer';
    newsHeadlineContainer.innerHTML = "<h2> Nicole Kidman and Prince Harry named sexiest redheads </h2>"
    canv.appendChild(newsHeadlineContainer);

    // visuals container
    const newsVisualContainer = document.createElement('div');
    newsVisualContainer.id = 'newsVisualContainer';
    canv.appendChild(newsVisualContainer);

    // APPEND IMAGE
    const img = document.createElement('img');
    img.src = 'assets/third-graph.jpg';
    newsVisualContainer.appendChild(img);

}


function false_3()
{
    // clear canv contents
    canv.innerHTML = '';

    // set footer and sidebar
    setfooter( "false_3" ); 
    setsidebar( "default" );
    
    // title head
    const newsHeadlineContainer = document.createElement('div');
    newsHeadlineContainer.id = 'newsHeadlineContainer';
    newsHeadlineContainer.innerHTML = "<h2> Nicole Kidman and Prince Harry named sexiest redheads </h2>"
    canv.appendChild(newsHeadlineContainer);

    // visuals container
    const newsVisualContainer = document.createElement('div');
    newsVisualContainer.id = 'newsVisualContainer';
    canv.appendChild(newsVisualContainer);

    // APPEND IMAGE
    const img = document.createElement('img');
    img.src = 'assets/third-graph.jpg';
    newsVisualContainer.appendChild(img);
    
}


function headline_4()
{
    // clear canv contents
    canv.innerHTML = '';

    // set footer and sidebar
    setfooter( "headline_4" ); 
    setsidebar( "default" );
    
    // title head
    const newsHeadlineContainer = document.createElement('div');
    newsHeadlineContainer.id = 'newsHeadlineContainer';
    newsHeadlineContainer.innerHTML = "<h2> Jim Carrey lawsuit: Unearthed note from ex-girlfriend makes shocking claims </h2>"
    canv.appendChild(newsHeadlineContainer);

    // visuals container
    const newsVisualContainer = document.createElement('div');
    newsVisualContainer.id = 'newsVisualContainer';
    canv.appendChild(newsVisualContainer);

    // APPEND IMAGE
    const img = document.createElement('img');
    img.src = 'assets/final-graph-pre.jpg';
    newsVisualContainer.appendChild(img);

}


function true_4()
{
    // clear canv contents
    canv.innerHTML = '';

    // set footer and sidebar
    setfooter( "true_4" ); 
    setsidebar( "default" );
    
    // title head
    const newsHeadlineContainer = document.createElement('div');
    newsHeadlineContainer.id = 'newsHeadlineContainer';
    newsHeadlineContainer.innerHTML = "<h2> Jim Carrey lawsuit: Unearthed note from ex-girlfriend makes shocking claims </h2>"
    canv.appendChild(newsHeadlineContainer);

    // visuals container
    const newsVisualContainer = document.createElement('div');
    newsVisualContainer.id = 'newsVisualContainer';
    canv.appendChild(newsVisualContainer);

    // APPEND IMAGE
    const img = document.createElement('img');
    img.src = 'assets/fourth-graph.jpg';
    newsVisualContainer.appendChild(img);

}


function false_4()
{
    // clear canv contents
    canv.innerHTML = '';

    // set footer and sidebar
    setfooter( "false_4" ); 
    setsidebar( "default" );
    
    // title head
    const newsHeadlineContainer = document.createElement('div');
    newsHeadlineContainer.id = 'newsHeadlineContainer';
    newsHeadlineContainer.innerHTML = "<h2> Jim Carrey lawsuit: Unearthed note from ex-girlfriend makes shocking claims </h2>"
    canv.appendChild(newsHeadlineContainer);

    // visuals container
    const newsVisualContainer = document.createElement('div');
    newsVisualContainer.id = 'newsVisualContainer';
    canv.appendChild(newsVisualContainer);

    // APPEND IMAGE
    const img = document.createElement('img');
    img.src = 'assets/fourth-graph.jpg';
    newsVisualContainer.appendChild(img);
    
}


function headline_5()
{
    // clear canv contents
    canv.innerHTML = '';

    // set footer and sidebar
    setfooter( "headline_5" ); 
    setsidebar( "default" );
    
    // title head
    const newsHeadlineContainer = document.createElement('div');
    newsHeadlineContainer.id = 'newsHeadlineContainer';
    newsHeadlineContainer.innerHTML = "<h2> Brad Pitt Could Get A Full-Time Kid In Custody Battle </h2>"
    canv.appendChild(newsHeadlineContainer);

    // visuals container
    const newsVisualContainer = document.createElement('div');
    newsVisualContainer.id = 'newsVisualContainer';
    canv.appendChild(newsVisualContainer);

    // APPEND IMAGE
    const img = document.createElement('img');
    img.src = 'assets/final-graph-pre.jpg';
    newsVisualContainer.appendChild(img);

}


function true_5()
{
    // clear canv contents
    canv.innerHTML = '';

    // set footer and sidebar
    setfooter( "true_5" ); 
    setsidebar( "default" );
    
    // title head
    const newsHeadlineContainer = document.createElement('div');
    newsHeadlineContainer.id = 'newsHeadlineContainer';
    newsHeadlineContainer.innerHTML = "<h2> Brad Pitt Could Get A Full-Time Kid In Custody Battle </h2>"
    canv.appendChild(newsHeadlineContainer);

    // visuals container
    const newsVisualContainer = document.createElement('div');
    newsVisualContainer.id = 'newsVisualContainer';
    canv.appendChild(newsVisualContainer);

    // APPEND IMAGE
    const img = document.createElement('img');
    img.src = 'assets/last-graph.jpg';
    newsVisualContainer.appendChild(img);

}


function false_5()
{
    // clear canv contents
    canv.innerHTML = '';

    // set footer and sidebar
    setfooter( "false_5" ); 
    setsidebar( "default" );
    
    // title head
    const newsHeadlineContainer = document.createElement('div');
    newsHeadlineContainer.id = 'newsHeadlineContainer';
    newsHeadlineContainer.innerHTML = "<h2> Brad Pitt Could Get A Full-Time Kid In Custody Battle </h2>"
    canv.appendChild(newsHeadlineContainer);

    // visuals container
    const newsVisualContainer = document.createElement('div');
    newsVisualContainer.id = 'newsVisualContainer';
    canv.appendChild(newsVisualContainer);

    // APPEND IMAGE
    const img = document.createElement('img');
    img.src = 'assets/last-graph.jpg';
    newsVisualContainer.appendChild(img);
    
}


function buffer_page()
{
    // CLEAR CANV
    canv.innerHTML = '';

    setfooter( "buffer_page" ); 
    setsidebar( "default" );
    
    // SET CONTAINERS

    // visuals container
    const songVisualContainer = document.createElement('div');
    songVisualContainer.id = 'songVisualContainer';
    canv.appendChild(songVisualContainer);

    // LOADING ANIMATION AND TEXT
    const songPlotContainer = document.createElement('div');
    songPlotContainer.id = 'songPlotContainer2';
    songVisualContainer.appendChild(songPlotContainer)
    // LOADING TEXT
    songPlotContainer.innerHTML += "<h2 style='margin-bottom:6vh;margin-top:2vh;' > Classifying Article.. </h2>"

    // LOADING GIF
    const img = document.createElement('img');
    img.src = 'assets/gifs/ajax-loader.gif';
    img.style.width = '50%';
    img.style.height = 'auto';

    // append the image to the songPlotContainer
    songPlotContainer.appendChild(img);


}


function setfooter( input ) // takes input from event listener and then 
{
    switch( input ) {
        case "default": footer.innerHTML = "<h2>sample footer</h2>"; break;
        // SLIDE DESCRIPTIONS
        case "headline_1": footer.innerHTML = "<h2> Predict if this news article is real or fake based on the title </h2>"
                            break;
        case "true_1":      footer.innerHTML = "<h2>That is correct! This article is from the real article dataset and the svm model was accurate and predicted it to be real.  </h2>"
                            break;
        case "false_1":      footer.innerHTML = "<h2>That is incorrect! This article is from the real article dataset and the svm model was accurate and predicted it to be real.  </h2>"
                            break;
        case "headline_2":  footer.innerHTML = "<h2>Predict if this news article is real or fake based on the title </h2>"
                            break;
        case "true_2":      footer.innerHTML = "<h2>That is incorrect! This article is from the fake article dataset and the svm model was accurate and predicted it to be fake. </h2>"
                            break;
        case "false_2":     footer.innerHTML = "<h2>That is correct! This article is from the fake article dataset and the svm model was accurate and predicted it to be fake.  </h2>"
                            break;
        case "headline_3":  footer.innerHTML = "<h2>Predict if this news article is real or fake based on the title </h2>"
                            break;
        case "true_3":      footer.innerHTML = "<h2>That is incorrect! This article is from the fake article dataset and the svm model was accurate and predicted it to be fake. </h2>"
                            break;
        case "false_3":      footer.innerHTML = "<h2>That is correct! This article is from the fake article dataset and the svm model was accurate and predicted it to be fake. </h2>"
                            break;
        case "headline_4":  footer.innerHTML = "<h2>Predict if this news article is real or fake based on the title</h2>"
                            break;
        case "true_4":      footer.innerHTML = "<h2>That is correct! This article is from the real article dataset and the svm model was accurate and predicted it to be real.  </h2>"
                            break;
        case "false_4":     footer.innerHTML = "<h2>That is incorrect! This article is from the real article dataset and the svm model was accurate and predicted it to be real.  </h2>"
                            break;
        case "headline_5":  footer.innerHTML = "<h2>Predict if this news article is real or fake based on the title </h2>"
                            break;
        case "true_5":      footer.innerHTML = "<h2>That is incorrect! This article is from the fake article dataset and the svm model was accurate and predicted it to be fake. </h2>"
                            break;
        case "false_5":     footer.innerHTML = "<h2>That is correct! This article is from the fake article dataset and the svm model was accurate and predicted it to be fake. </h2>"
                            break;
        case "buffer_page": footer.innerHTML = "<h2> Classifying.. </h2>"
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


    // ABOVE BUTTONS USER TEXT

    const sidebar_curr_param_text_container = document.createElement('div');
    // FORMATTING FOR THE TEXT IN CSS @ (#sidebar_new_text_container p)
    sidebar_curr_param_text_container.id = 'sidebar_new_text_container';
    // CHANGE THIS TEXT
    sidebar_curr_param_text_container.innerHTML = "<p>Do you think the news article title to the right is real or fake?</p>";
    // IF SIDEBAR TEXT IS VARIABLE FROM SLIDE TO SLIDE (use commented logic instead)..
    // if ( page_status == 0 ) { sidebar_curr_param_text_container.innerHTML = "<p> slide 1/15 text </p>"; }
    // else if ( page_status == 1 ) { sidebar_curr_param_text_container.innerHTML = "<p> slide 2/15 text </p>"; }
    // else if ( page_status == 2 ) { sidebar_curr_param_text_container.innerHTML = "<p> slide 3/15 text </p>"; }

    sidebar_canv.appendChild(sidebar_curr_param_text_container);

}

function updater( val )
{
    // CHANGE PAGE STATES WITH SIDEBAR BUTTON INPUT
    // selects true
    if ( page_status % 3 == 0 && val == 't' ) { page_status = page_status + 1 }
    // selects false
    else if ( page_status % 3 == 0 && val == 'f' ) { page_status = page_status + 2 }
    // selects next
    else if ( page_status % 3 == 1 && val == 'n' ) { page_status = page_status + 2 }
    // selects next
    else if ( page_status % 3 == 2 && val == 'n' ) { page_status = page_status + 1 }
    // selects reset
    else if ( val == 'r') { page_status = 0 }


    // HIDE BUTTONS IF UNAPPLICABLE AT CURRENT STATE
    // if a question slide do not show next btn   or   if one of the last 2 steps do not show next
    if ( page_status % 3 == 0 || page_status >= page_count - 2) { next_btn.style.display = "none"; }
    else { next_btn.style.display = "inline-block"; }
    // if true/false option slide do not show true/false buttons
    if ( page_status % 3 != 0 ) { true_btn.style.display = "none"; false_btn.style.display = "none";}
    else { true_btn.style.display = "inline-block"; false_btn.style.display = "inline-block"; }
    // the the first page do not show reset btn
    if ( page_status == 0 ) { reset_btn.style.display = "none"; }
    else { reset_btn.style.display = "inline-block"; }
    

    let page = statuses[ page_status ];
    console.log("page: " + page);


    // set buffer animation time in ms
    let buffer_delay = 100;

    if (page_status % 3 != 0) {
    setTimeout(function() {
        // call buffer() with a delay of 400ms
        setTimeout(buffer_page, 10);

        // execute switch statement with a delay of 800ms
        setTimeout(function() {
        switch(page) {
            case "headline_1":
                headline_1();
                break;
            case "true_1": 
                true_1(); 
                break;
            case "false_1": 
                false_1(); 
                break;
            case "headline_2":
                headline_2();
                break;
            case "true_2": 
                true_2(); 
                break;
            case "false_2": 
                false_2(); 
                break;
            case "headline_3":
                headline_3();
                break;
            case "true_3": 
                true_3(); 
                break;
            case "false_3": 
                false_3(); 
                break;
            case "headline_4":
                headline_4();
                break;
            case "true_4": 
                true_4(); 
                break;
            case "false_4": 
                false_4(); 
                break;
            case "headline_5":
                headline_5();
                break;
            case "true_5": 
                true_5(); 
                break;
            case "false_5": 
                false_5(); 
                break;
        }
        }, 1200);
    }, buffer_delay);
    } else {
        setTimeout(function() {
            switch(page) {
                case "headline_1":
                    headline_1();
                    break;
                case "true_1": 
                    true_1(); 
                    break;
                case "false_1": 
                    false_1(); 
                    break;
                case "headline_2":
                    headline_2();
                    break;
                case "true_2": 
                    true_2(); 
                    break;
                case "false_2": 
                    false_2(); 
                    break;
                case "headline_3":
                    headline_3();
                    break;
                case "true_3": 
                    true_3(); 
                    break;
                case "false_3": 
                    false_3(); 
                    break;
                case "headline_4":
                    headline_4();
                    break;
                case "true_4": 
                    true_4(); 
                    break;
                case "false_4": 
                    false_4(); 
                    break;
                case "headline_5":
                    headline_5();
                    break;
                case "true_5": 
                    true_5(); 
                    break;
                case "false_5": 
                    false_5(); 
                    break;
            }
            }, 400);
    }
    
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

true_btn.addEventListener( "click", () => { updater('t'); });
false_btn.addEventListener( "click", () => { updater('f'); });
next_btn.addEventListener( "click", () => { updater('n'); });
reset_btn.addEventListener( "click", () => { updater('r'); });
