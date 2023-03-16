const      canv = document.getElementById( "canv_adam" ),
         footer = document.getElementById( "footer_adam"),
       back_btn = document.getElementById( "adam_back_btn" ),
        fwd_btn = document.getElementById( "adam_fwd_btn" ),
         ff_btn = document.getElementById( "adam_ff_btn")
      reset_btn = document.getElementById( "adam_reset_btn" ),
        sidebar = document.getElementById( "sidebar_adam"),
       statuses = ["intro", "vectorization", "use_cases", "onehot", "blackbox"];
// init current page and epoch
let page_status = 0;
let epoch_status = 0;
// init data var
let adam_data;
// define page and epoch counts
let page_count = 5;
let epoch_count = 7;


function meta() // sets and returns page metadata for meta div (top left corner of canvas)
{
    let output  = "<div id=\"meta_adam\">";
        output += "<h2>basics - \"" + statuses[page_status] + "\"</h2>";
        output += "<h4>page " + (page_status+1) + " out of " + (page_count) + "</h4>";
        output += "<h4>epoch number: " + (epoch_status) + " out of " + (epoch_count-1) + "</h4>";
        output += "</div>"
    return output;
}

function intro()
{
    setfooter( "intro" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<div style='height:5vh'/>"
    canv.innerHTML += "<h3>intro to natural language processing</h3>";
    // sample call and display for loss scalar (should be same for any step of an epoch)
    canv.innerHTML += "<p> sample loaded content: " + adam_data["loss_steps"]["avg_epoch_loss"] + " </p>";

    // get desired tensor for this epoch
    my_matrix = adam_data["curr_model_params"]["param_1"];

    // create a new HTML element to hold the main content container
    const mainContentContainer = document.createElement('div');
    mainContentContainer.id = 'adam-main-content-container';

    // append the table container to the canvas element
    canv.appendChild(mainContentContainer);

    // ----- create a new HTML element to hold the table
    const tableDiv = document.createElement('div');
    tableDiv.id = 'adam-tensor-a';

    // append the table element to the canvas element
    mainContentContainer.appendChild(tableDiv);

    // bind the data to a table using D3
    const table = d3.select('#adam-tensor-a');
    const thead = table.append('thead');
    const tbody = table.append('tbody');

    // add table headers
    thead.append('tr')
        .selectAll('th')
        .enter()
        .append('th')

    const rows = table.selectAll('tr')
        .data(my_matrix)
        .enter()
        .append('tr');

    const cells = rows.selectAll('td')
        .data(d => d)
        .enter()
        .append('td')
        .text(d => {
            const formatted = d.toFixed(4);
            return (d >= 0 ? '\u00A0' : '') + formatted;
        });

    // add CSS classes to the table elements
    table.classed('my-table-class', true);
    cells.classed('my-cell-class', true);
    thead.selectAll('th').classed('my-header-class', true);

}

function vectorization()
{
    setfooter( "vectorization" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<div style='height:5vh'/>"
    canv.innerHTML += "<h3>what is word vectorization?</h3>";
    // sample call and display for loss scalar (should be same for any step of an epoch)
    canv.innerHTML += "<p> sample loaded content: " + adam_data["loss_steps"]["avg_epoch_loss"] + " </p>";

}

function use_cases()
{
    setfooter( "use_cases" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<div style='height:5vh'/>"
    canv.innerHTML += "<h3>how does it get used?</h3>";
    // sample call and display for loss scalar (should be same for any step of an epoch)
    canv.innerHTML += "<p> sample loaded content: " + adam_data["loss_steps"]["avg_epoch_loss"] + " </p>";
}

function onehot()
{
    setfooter( "onehot" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<div style='height:5vh'/>"
    canv.innerHTML += "<h3>what are one-hot encoded vectors?</h3?";
    // sample call and display for loss scalar (should be same for any step of an epoch)
    canv.innerHTML += "<p> sample loaded content: " + adam_data["loss_steps"]["avg_epoch_loss"] + " </p>";
}

function blackbox()
{
    setfooter( "blackbox" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<div style='height:5vh'/>"
    canv.innerHTML += "<h3>what is the black box problem?</h3>";
    // sample call and display for loss scalar (should be same for any step of an epoch)
    canv.innerHTML += "<p> sample loaded content: " + adam_data["loss_steps"]["avg_epoch_loss"] + " </p>";

    // TEST CODE BELOW

    // get desired tensor for this epoch
    my_matrix = adam_data["curr_model_params"]["param_1"];

    // create a new HTML element to hold the main content container
    const mainContentContainer = document.createElement('div');
    mainContentContainer.id = 'adam-main-content-container';

    // append the table container to the canvas element
    canv.appendChild(mainContentContainer);

    // ----- create a new HTML element to hold the table
    const tableDiv = document.createElement('div');
    tableDiv.id = 'adam-tensor-a';

    // append the table element to the canvas element
    mainContentContainer.appendChild(tableDiv);

    // bind the data to a table using D3
    const table = d3.select('#adam-tensor-a');
    const thead = table.append('thead');
    const tbody = table.append('tbody');

    // add table headers
    thead.append('tr')
        .selectAll('th')
        .enter()
        .append('th')

    const rows = table.selectAll('tr')
        .data(my_matrix)
        .enter()
        .append('tr');

    const cells = rows.selectAll('td')
        .data(d => d)
        .enter()
        .append('td')
        .text(d => {
            const formatted = d.toFixed(4);
            return (d >= 0 ? '\u00A0' : '') + formatted;
        });

    // add CSS classes to the table elements
    table.classed('my-table-class', true);
    cells.classed('my-cell-class', true);
    thead.selectAll('th').classed('my-header-class', true);

}

function setfooter( input ) // takes input from event listener and then 
{
    switch( input ) {
        case "default": footer.innerHTML = "<h2>sample footer</h2>"; break;
        // real topics
        case "vectorization":   footer.innerHTML = "<h2> vectorization desc </h2>"; break;
        case "intro":           footer.innerHTML = "<h2> intro desc </h2>"; break;
        case "use_cases":       footer.innerHTML = "<h2> use_cases desc </h2>"; break;
        case "onehot":          footer.innerHTML = "<h2> onehot desc </h2>"; break;
        case "blackbox":        footer.innerHTML = "<h2> blackbox desc </h2>"; break;
    }
}

function updater( val )
{
    // FORWARD 
    // if on last page -> increment epoch and set page status to 0
    // otherwise -> increment current page
    if ( val == 1 && page_status == page_count-1) {
        epoch_status++
        page_status = 0
    } else if (val == 1){
        page_status++;
    }
    // BACKWARD
    // if on first page -> decrement epoch and set page status to last page
    // otherwise -> decrement current page
    if ( val == -1 && page_status == 0) {
        epoch_status--
        page_status = page_count-1
    } else if (val == -1){
        page_status--;
    }
    // FAST FORWARD 
    // if on last page -> increment epoch
    // otherwise -> set page status to last page
    if ( val == 'f' && page_status == page_count - 1) {
        epoch_status++
    } else if ( val == 'f' ){
        page_status = page_count - 1
    }
    // RESET
    // set current page and epoch to 0 and 0
    if ( val == 'r' ){
        page_status = 0
        epoch_status = 0
    }

    // udpate local data from MongoDB at curr epoch
    getData(epoch_status);

    // hide buttons if use is not applicable at current state
    if (page_status <= 0 && epoch_status <= 0) { back_btn.style.display = "none"; }
    else { back_btn.style.display = "inline-block"; }
    if (page_status >= page_count-1 && epoch_status >= epoch_count -1) { fwd_btn.style.display = "none"; }
    else { fwd_btn.style.display = "inline-block"; }
    if (page_status == 0 && epoch_status == 0) { reset_btn.style.display = "none"; }
    else { reset_btn.style.display = "inline-block"; }
    if (epoch_status < epoch_count - 1) { ff_btn.style.display = "inline-block"; }
    else { ff_btn.style.display = "none"; }

    let page = statuses[ page_status ];
    console.log("page: " + page);

    // set display delay time in ms
    let delay = 300;
    // on pages we expect updates increase delay time
    //if (page_status == 0 || page_status == page_count - 1){ delay = 500 }    
    
    setTimeout(function() {
        switch(page) {
            case "intro": 
                intro(); 
                break;
            case "vectorization": 
                vectorization(); 
                break;
            case "use_cases": 
                use_cases(); 
                break;
            case "onehot": 
                onehot(); 
                break;
            case "blackbox": 
                blackbox(); 
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
  fwd_btn.addEventListener( "click", () => { updater( 1); } ); //adds listener to forwards and backwards button
 back_btn.addEventListener( "click", () => { updater(-1); } );
reset_btn.addEventListener( "click", () => { updater('r'); });
   ff_btn.addEventListener( "click", () => { updater('f'); });
