const      canv = document.getElementById( "canv_adam" ),
   sidebar_canv = document.getElementById( "sidebar_canv_adam"),
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
        // shortented page title meta
        //output += "<h2>basics - \"" + statuses[page_status] + "\"</h2>";
        output += "<h4>Step: " + "<h5>" + (page_status+1) + "/" + (page_count) + "</h5>" + "</h4>";
        //output += "<h4>epoch: " + (epoch_status) + " out of " + (epoch_count-1) + "</h4>";
        output += "<h4>Iteration: " + "<h5>" + (epoch_status) + "</h5>" + "</h4>";
        output += "</div>"
    return output;
}

function intro()
{
    setfooter( "intro" );
    setsidebar( "default" );

    canv.innerHTML  = meta();
    canv.innerHTML += "<div style='height:11vh'/>"
    canv.innerHTML += "<h3>Page 1 Title (intro)</h3>";
    canv.innerHTML += "<div style='height:2vh'/>"
    // sample call and display for loss scalar (should be same for any step of an epoch)
    //canv.innerHTML += "<p> sample loaded content: " + adam_data["loss_steps"]["avg_epoch_loss"] + " </p>";

    // get desired tensor for this epoch
    my_matrix = adam_data["curr_model_params"]["param_1"];

    // create a new HTML element to hold the main content container
    const mainContentContainer = document.createElement('div');
    mainContentContainer.id = 'adam-main-content-container';

    // append the table container to the canvas element
    canv.appendChild(mainContentContainer);

    // sample call and display for loss scalar (should be same for any step of an epoch)
    mainContentContainer.innerHTML += "<p> sample loaded content: " + adam_data["loss_steps"]["avg_epoch_loss"] + " </p>";

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
    setsidebar( "default" );
    canv.innerHTML  = meta();

    // set title
    canv.innerHTML += "<div style='height:11vh'/>"
    canv.innerHTML += "<h3>Update Biased Second Raw Moment Vector: pt. 1/4</h3>";
    canv.innerHTML += "<div style='height:3vh'/>"

    // create a new HTML element to hold the main content container
    const mainContentContainer = document.createElement('div');
    mainContentContainer.id = 'adam-main-content-container';

    // append the table container to the canvas element
    canv.appendChild(mainContentContainer);

    // sample call and display for loss scalar (should be same for any step of an epoch)
    mainContentContainer.innerHTML += "<p> sample loaded content: " + adam_data["loss_steps"]["avg_epoch_loss"] + " </p>";

}

function use_cases()
{
    setfooter( "use_cases" );
    setsidebar( "default" );
    canv.innerHTML  = meta();

    // set title
    canv.innerHTML += "<div style='height:11vh'/>"
    canv.innerHTML += "<h3>Update Biased Second Raw Moment Vector: pt. 2/4</h3>";
    canv.innerHTML += "<div style='height:3vh'/>"

    // create a new HTML element to hold the main content container
    const mainContentContainer = document.createElement('div');
    mainContentContainer.id = 'adam-main-content-container';

    // append the table container to the canvas element
    canv.appendChild(mainContentContainer);

    // sample call and display for loss scalar (should be same for any step of an epoch)
    mainContentContainer.innerHTML += "<p> sample loaded content: " + adam_data["loss_steps"]["avg_epoch_loss"] + " </p>";
}

function onehot()
{
    setfooter( "onehot" );
    setsidebar( "default" );
    canv.innerHTML  = meta();

    // set title
    canv.innerHTML += "<div style='height:11vh'/>"
    canv.innerHTML += "<h3>Update Biased Second Raw Moment Vector: pt. 3/4</h3>";
    canv.innerHTML += "<div style='height:3vh'/>"

    // create a new HTML element to hold the main content container
    const mainContentContainer = document.createElement('div');
    mainContentContainer.id = 'adam-main-content-container';

    // append the table container to the canvas element
    canv.appendChild(mainContentContainer);

    // sample call and display for loss scalar (should be same for any step of an epoch)
    mainContentContainer.innerHTML += "<p> sample loaded content: " + adam_data["loss_steps"]["avg_epoch_loss"] + " </p>";
}

function blackbox()
{
    setfooter( "blackbox" );
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += "<div style='height:11vh'/>"
    canv.innerHTML += "<h3>Update Biased Second Raw Moment Vector: pt. 4/4</h3>";
    canv.innerHTML += "<div style='height:3vh'/>"

    // TEST CODE BELOW

    // get desired tensor for this epoch
    my_matrix = adam_data["curr_model_params"]["param_1"];

    // create a new HTML element to hold the main content container
    const mainContentContainer = document.createElement('div');
    mainContentContainer.id = 'adam-main-content-container';

    // append the table container to the canvas element
    canv.appendChild(mainContentContainer);

    // sample call and display for loss scalar (should be same for any step of an epoch)
    mainContentContainer.innerHTML += "<p> sample loaded content: " + adam_data["loss_steps"]["avg_epoch_loss"] + " </p>";

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

// Create new div elements for the three sections of the footer
const footer_desc = document.createElement("div");
footer_desc.classList.add("footer_adam_desc");

const footer_eq_title = document.createElement("div");
footer_eq_title.classList.add("footer_adam_eq_title");

const footer_eq = document.createElement("div");
footer_eq.classList.add("footer_adam_eq");

// Append the three sections to the footer element
footer.appendChild(footer_desc);
footer.appendChild(footer_eq_title);
footer.appendChild(footer_eq);

function setfooter( input ) // takes input from event listener and then 
{
    switch( input ) {
        case "default": footer.innerHTML = "<h2>sample footer</h2>"; break;
        // real topics
        case "intro":           footer_desc.innerHTML = "intro desc";
                                footer_eq_title.innerHTML = "<h2> intro eq title </h2>";
                                footer_eq.innerHTML = "<h2> intro eq </h2>";
                                break;
        case "vectorization":   footer_desc.innerHTML = "Update the biased second raw moment estimate (vt). The biased second raw moment estimate vector is set to zero prior to updating. First, calculate the square of the current gradient (g2t) by squaring the current gradient (gt).";
                                footer_eq_title.innerHTML = "<h2> biased second raw moment estimate: </h2>";
                                footer_eq.innerHTML = "<h2> vt ← β2 ● vt−1 + (1 − β2) ● <span style='color: #32cd32'>g</span> <span style='color: #00ffff'>2t</span> </h2>";
                                break;
        case "use_cases":       footer_desc.innerHTML = "Continue update on the biased second raw moment estimate (vt). Next, the square of the current gradient (g2t) is scaled by the complementary factor (1 -  β2), which determines how much weight to give to the new information. Beta-2 (β2) is a hyperparameter that controls the influence of the previous estimate on the current estimate, and is set to 0.999 in this simulation.";
                                footer_eq_title.innerHTML = "<h2> biased second raw moment estimate: </h2>";
                                footer_eq.innerHTML = "<h2> vt ← β2 ● vt−1 + <span style='color: #32cd32'>(1 − β2)</span> <span style='color: #00ffff'>● g2t</span> </h2>";
                                break;
        case "onehot":          footer_desc.innerHTML = "Continue update on the biased second raw moment estimate (vt). Next, the previous estimate is scaled by the hyperparameter Beta-2 (β2), which determines how much weight to give to the past estimate.";
                                footer_eq_title.innerHTML = "<h2> biased second raw moment estimate: </h2>";
                                footer_eq.innerHTML = "<h2> vt ← <span style='color: #32cd32'>β2</span> <span style='color: #00ffff'>● vt−1</span> + (1 − β2) ● g2t </h2>";
                                break;
        case "blackbox":        footer_desc.innerHTML = "Continue update on the biased second raw moment estimate (vt). Finally, sum both intermediate products calculated in pt.(2) and pt.(3). This yields the updated estimate of the biased second raw moment vector which will be later used to adjust the learning rate for each parameter during the optimization process. By taking into account the history of squared gradients, Adam optimization can adaptively adjust the learning rate for each parameter and converge more quickly to the optimal solution.";
                                footer_eq_title.innerHTML = "<h2> biased second raw moment estimate: </h2>";
                                footer_eq.innerHTML = "<h2> vt ← <span style='color: #32cd32'>β2 ● vt−1</span> <span style='color: #00ffff'>+ (1 − β2) ● g2t</span> </h2>";
                                break;                                
    }
}

function setsidebar( input )
{
    switch( input ) {
        case "default": sidebar_canv.innerHTML = "<div style='height:3vh'/>";
                        sidebar_canv.innerHTML += "<h2> default sidebar content </h2>";
                        break;
    }

    sidebar_canv.innerHTML += "<h2> start plot content </h2>";

    // get desired tensor for this epoch
    my_arr = adam_data["loss_steps"]["avg_loss_vals"];

    // ----- create a new HTML element to hold the table
    const plotDiv = document.createElement('div');
    plotDiv.id = 'adam-plot-a';

    // set up the dimensions and margins of the plot
    const margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = 400 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    // append the plot element to the canvas element
    sidebar_canv.appendChild(plotDiv);

    // set up the x and y scales
    const x = d3.scaleLinear()
    .domain([0, my_arr.length])
    .range([0, width]);
    const y = d3.scaleLinear()
    .domain([d3.min(my_arr), d3.max(my_arr)])
    .range([height, 0]);

    // set up the line function
    const line = d3.line()
    .x((d, i) => x(i))
    .y(d => y(d));

    // create the SVG element
    const svg = d3.select(`#${plotDiv.id}`)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // add the line to the plot
    svg.append("path")
    .datum(my_arr)
    .attr("class", "line")
    .attr("d", line);

    sidebar_canv.innerHTML += "<h2> end plot content </h2>";

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
