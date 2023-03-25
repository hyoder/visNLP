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
    canv.innerHTML += "<div style='height:3vh'/>"

    // create a new HTML element to hold the main content container
    const mainContentContainer = document.createElement('div');
    mainContentContainer.id = 'adam-main-content-container';

    // append the table container to the canvas element
    canv.appendChild(mainContentContainer);

    // sample call and display for loss scalar (should be same for any step of an epoch)
    // mainContentContainer.innerHTML += "<p> sample loaded content: " + adam_data["loss_steps"]["avg_epoch_loss"] + " </p>";

    function createTable(data, tableId, tableClass) {
        const tableDiv = document.createElement('div');
        tableDiv.id = tableId;
        mainContentContainer.appendChild(tableDiv);
      
        const table = d3.select(`#${tableId}`);
        const tbody = table.append('tbody');
      
        const rows = tbody.selectAll('tr')
            .data(data)
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
      
        // Add CSS classes to the table elements
        table.classed(tableClass, true);
        table.classed('my-table-class', true);
        cells.classed('my-cell-class', true);
    }

    // create tables with loaded tensor data
    const my_tensor_data = adam_data["gradient_states"]["first_moments_bc"]["param_1_m_hat"];
    createTable(my_tensor_data, 'my-tensor-id', 'generic-table-class');


    // Create a new image element
    var img = new Image();

    // Set the source URL of the image
    img.src = 'https://static.thenounproject.com/png/5380101-200.png';

    // Wait for the image to load
    img.onload = function() {
        // Create a new canvas element inside the mainContentContainer element
        var canvas = document.createElement('canvas');
        
        // Set the desired width and height of the canvas
        var canvasWidth = 100;
        var canvasHeight = 100;
        
        // Set the width and height of the canvas element
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        // Append the canvas to the mainContentContainer
        mainContentContainer.appendChild(canvas);
    
        // Get the canvas context for the new canvas
        var ctx = canvas.getContext('2d');
    
        // Draw the image on the new canvas, scaled down to fit the canvas
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);


        const my_tensor_data2 = adam_data["param_update_steps"]["ans_eps_sum"]["param_1"];
        createTable(my_tensor_data2, 'my-tensor-id-2', 'generic-table-class');

        // Create a new image element
        var img2 = new Image();

        // Set the source URL of the image
        img2.src = 'https://cdn-icons-png.flaticon.com/512/189/189253.png';

        // Wait for the image to load
        img2.onload = function() {
            // Create a new canvas element inside the mainContentContainer element
            var canvas2 = document.createElement('canvas');
            
            // Set the desired width and height of the canvas
            var canvasWidth2 = 100;
            var canvasHeight2 = 100;
            
            // Set the width and height of the canvas element
            canvas2.width = canvasWidth2;
            canvas2.height = canvasHeight2;
            
            // Append the canvas to the mainContentContainer
            mainContentContainer.appendChild(canvas2);
        
            // Get the canvas context for the new canvas
            var ctx2 = canvas2.getContext('2d');
        
            // Draw the image on the new canvas, scaled down to fit the canvas
            ctx2.drawImage(img2, 0, 0, canvasWidth2, canvasHeight2);


            const my_tensor_data3 = adam_data["param_update_steps"]["m_hat_ans_quotient"]["param_1"];
            createTable(my_tensor_data3, 'my-tensor-id-3', 'generic-table-class');

        };

        
    };

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

    function createTable(data, tableId, tableClass) {
        const tableDiv = document.createElement('div');
        tableDiv.id = tableId;
        mainContentContainer.appendChild(tableDiv);
      
        const table = d3.select(`#${tableId}`);
        const tbody = table.append('tbody');
      
        const rows = tbody.selectAll('tr')
            .data(data)
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
      
        // Add CSS classes to the table elements
        table.classed(tableClass, true);
        table.classed('my-table-class', true);
        cells.classed('my-cell-class', true);
    }

    // create tables with loaded tensor data
    const my_tensor_data = adam_data["second_moment_calculations"]["grads_sq"]["param_1"];
    createTable(my_tensor_data, 'my-tensor-id', 'generic-table-class');

    const my_tensor_data2 = adam_data["curr_model_params"]["param_2"];
    createTable(my_tensor_data2, 'my-tensor-id-2', 'generic-table-class');

    const my_tensor_data3 = adam_data["curr_model_params"]["param_3"];
    // transpose the param3
    const temp_tensor = my_tensor_data3.map((value) => [value]);
    createTable(temp_tensor, 'my-tensor-id-3', 'generic-table-class');

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

    function createTable(data, tableId, tableClass) {
        const tableDiv = document.createElement('div');
        tableDiv.id = tableId;
        mainContentContainer.appendChild(tableDiv);
      
        const table = d3.select(`#${tableId}`);
        const tbody = table.append('tbody');
      
        const rows = tbody.selectAll('tr')
            .data(data)
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
      
        // Add CSS classes to the table elements
        table.classed(tableClass, true);
        table.classed('my-table-class', true);
        cells.classed('my-cell-class', true);
    }

    // create tables with loaded tensor data
    const my_tensor_data = adam_data["second_moment_calculations"]["grads_sq"]["param_1"];
    createTable(my_tensor_data, 'my-tensor-id', 'generic-table-class');

    const my_tensor_data2 = adam_data["curr_model_params"]["param_2"];
    createTable(my_tensor_data2, 'my-tensor-id-2', 'generic-table-class');

    const my_tensor_data3 = adam_data["curr_model_params"]["param_3"];
    // transpose the param3
    const temp_tensor = my_tensor_data3.map((value) => [value]);
    createTable(temp_tensor, 'my-tensor-id-3', 'generic-table-class');

}

function onehot()
{
    setfooter( "onehot" );
    setsidebar( "default" );
    canv.innerHTML  = meta();

    // set title
    canv.innerHTML += "<div style='height:14vh'/>"
    canv.innerHTML += "<h3>Update Biased Second Raw Moment Vector: pt. 3/4</h3>";

    // create a new HTML element to hold the main content container
    const mainContentContainer = document.createElement('div');
    mainContentContainer.id = 'adam-main-content-container';

    // append the table container to the canvas element
    canv.appendChild(mainContentContainer);

    function createTable(data, tableId, tableClass, containerId) {
        const containerDiv = document.createElement('div');
        containerDiv.id = containerId;
        mainContentContainer.appendChild(containerDiv);
      
        const tableDiv = document.createElement('div');
        tableDiv.id = tableId;
        containerDiv.appendChild(tableDiv);
      
        const table = d3.select(`#${tableId}`);
        const tbody = table.append('tbody');
        const rows = tbody.selectAll('tr')
            .data(data)
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
      
        // Add CSS classes to the table elements
        table.classed(tableClass, true);
        table.classed('my-table-class', true);
        cells.classed('my-cell-class', true);
    }

    // TABLE 1
    const my_tensor_data = adam_data["curr_model_params"]["param_1"];
    createTable(my_tensor_data, 'my-tensor-id', 'generic-table-class', 'my-table-container-1');

    // OPERATION 1
    const operationContainer1 = document.createElement('div');
    operationContainer1.id = 'operationContainer-1';
    mainContentContainer.appendChild(operationContainer1);
    // create the svg element
    const svg = d3.select('#operationContainer-1')
    .append('svg')
    .attr('width', 100)
    .attr('height', 100);
    // create the circle
    const circle = svg.append('circle')
    .attr('cx', 50)
    .attr('cy', 50)
    .attr('r', 50)
    .attr('fill', 'rgb(0, 140, 255)');
    // create the text
    const text = svg.append('text')
    .text('Dot Prod')
    .attr('x', 50)
    .attr('y', 50)
    .attr('text-anchor', 'middle')
    .attr("font-size", "18px")
    .attr('dominant-baseline', 'middle')
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // TABLE 2
    const my_tensor_data2 = adam_data["curr_model_params"]["param_2"];
    createTable(my_tensor_data2, 'my-tensor-id-2', 'generic-table-class', 'my-table-container-2');

    // OPERATION 2
    const operationContainer2 = document.createElement('div');
    operationContainer2.id = 'operationContainer-2';
    mainContentContainer.appendChild(operationContainer2);
    // create svg element
    const svg2 = d3.select("#operationContainer-2").append("svg")
    .attr("width", 100)
    .attr("height", 100);
    // create arrow path
    const arrowPath = "M0,30 L70,30 L70,15 L100,50 L70,85 L70,70 L0,70 Z";
    // create arrow shape
    svg2.append("path")
    .attr("d", arrowPath)
    .attr("stroke", 'rgb(0, 140, 255)')
    .attr("stroke-width", "1")
    .attr("fill", 'rgb(0, 140, 255)');
    // create text element
    svg2.append("text")
    .attr("x", 50)
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("font-size", "18px")
    .text("N/A")
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // TABLE 3
    const my_tensor_data3 = adam_data["curr_model_params"]["param_3"];
    // transpose the param3
    const temp_tensor = my_tensor_data3.map((value) => [value]);
    createTable(temp_tensor, 'my-tensor-id-3', 'generic-table-class', 'my-table-container-3');

    // TITLE HEADER 1
    const tableTitleContainer1 = document.createElement('div');
    tableTitleContainer1.id = 'tableTitleContainer-1';
    tableTitleContainer1.innerHTML = "<h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer1);

    // TITLE HEADER 2
    const tableTitleContainer2 = document.createElement('div');
    tableTitleContainer2.id = 'tableTitleContainer-2';
    tableTitleContainer2.innerHTML = "<h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer2);

    // TITLE HEADER 3
    const tableTitleContainer3 = document.createElement('div');
    tableTitleContainer3.id = 'tableTitleContainer-3';
    tableTitleContainer3.innerHTML = "<h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer3); 
}

function blackbox()
{
    setfooter( "blackbox" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();

    // set title
    canv.innerHTML += "<div style='height:14vh'/>"
    canv.innerHTML += "<h3>Update Biased Second Raw Moment Vector: pt. 4/4</h3>";

    // create a new HTML element to hold the main content container
    const mainContentContainer = document.createElement('div');
    mainContentContainer.id = 'adam-main-content-container';

    // append the table container to the canvas element
    canv.appendChild(mainContentContainer);

    function createTable(data, tableId, tableClass, containerId) {
        const containerDiv = document.createElement('div');
        containerDiv.id = containerId;
        mainContentContainer.appendChild(containerDiv);
      
        const tableDiv = document.createElement('div');
        tableDiv.id = tableId;
        containerDiv.appendChild(tableDiv);
      
        const table = d3.select(`#${tableId}`);
        const tbody = table.append('tbody');
        const rows = tbody.selectAll('tr')
            .data(data)
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
      
        // Add CSS classes to the table elements
        table.classed(tableClass, true);
        table.classed('my-table-class', true);
        cells.classed('my-cell-class', true);
    }

    // TABLE 1
    const my_tensor_data = adam_data["curr_model_params"]["param_1"];
    createTable(my_tensor_data, 'my-tensor-id', 'generic-table-class', 'my-table-container-1');

    // OPERATION 1
    const operationContainer1 = document.createElement('div');
    operationContainer1.id = 'operationContainer-1';
    mainContentContainer.appendChild(operationContainer1);
    // create the svg element
    const svg = d3.select('#operationContainer-1')
    .append('svg')
    .attr('width', 100)
    .attr('height', 100);
    // create the circle
    const circle = svg.append('circle')
    .attr('cx', 50)
    .attr('cy', 50)
    .attr('r', 50)
    .attr('fill', 'rgb(0, 140, 255)');
    // create the text
    const text = svg.append('text')
    .text('Dot Prod')
    .attr('x', 50)
    .attr('y', 50)
    .attr('text-anchor', 'middle')
    .attr("font-size", "18px")
    .attr('dominant-baseline', 'middle')
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // TABLE 2
    const my_tensor_data2 = adam_data["curr_model_params"]["param_2"];
    createTable(my_tensor_data2, 'my-tensor-id-2', 'generic-table-class', 'my-table-container-2');

    // OPERATION 2
    const operationContainer2 = document.createElement('div');
    operationContainer2.id = 'operationContainer-2';
    mainContentContainer.appendChild(operationContainer2);
    // create svg element
    const svg2 = d3.select("#operationContainer-2").append("svg")
    .attr("width", 100)
    .attr("height", 100);
    // create arrow path
    const arrowPath = "M0,30 L70,30 L70,15 L100,50 L70,85 L70,70 L0,70 Z";
    // create arrow shape
    svg2.append("path")
    .attr("d", arrowPath)
    .attr("stroke", 'rgb(0, 140, 255)')
    .attr("stroke-width", "1")
    .attr("fill", 'rgb(0, 140, 255)');
    // create text element
    svg2.append("text")
    .attr("x", 50)
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("font-size", "18px")
    .text("N/A")
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // TABLE 3
    const my_tensor_data3 = adam_data["curr_model_params"]["param_3"];
    // transpose the param3
    const temp_tensor = my_tensor_data3.map((value) => [value]);
    createTable(temp_tensor, 'my-tensor-id-3', 'generic-table-class', 'my-table-container-3');

    // TITLE HEADER 1
    const tableTitleContainer1 = document.createElement('div');
    tableTitleContainer1.id = 'tableTitleContainer-1';
    tableTitleContainer1.innerHTML = "<h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer1);

    // TITLE HEADER 2
    const tableTitleContainer2 = document.createElement('div');
    tableTitleContainer2.id = 'tableTitleContainer-2';
    tableTitleContainer2.innerHTML = "<h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer2);

    // TITLE HEADER 3
    const tableTitleContainer3 = document.createElement('div');
    tableTitleContainer3.id = 'tableTitleContainer-3';
    tableTitleContainer3.innerHTML = "<h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer3); 
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
        case "intro":           footer_desc.innerHTML = "intro desc -   ( m_hat / (sqrt(v_hat) + eps) ) -> ans";
                                footer_eq_title.innerHTML = "<h2> intro eq title </h2>";
                                footer_eq.innerHTML = "<h2> intro eq </h2>";
                                break;
        case "vectorization":   footer_desc.innerHTML = "Update the biased second raw moment estimate (vt). The biased second raw moment estimate vector is set to zero prior to updating. First, calculate the square of the current gradient (g2t) by squaring the current gradient (gt).";
                                footer_eq_title.innerHTML = "<h2> biased second raw moment estimate: </h2>";
                                footer_eq.innerHTML = "<h2> vt ← β<sup>2</sup> ● v<sup>t−1</sup> + (1 − β<sup>2</sup>) ● <span style='color: #32cd32'>g</span><span style='color: #00ffff'><sup>2</sup><sub>t</sub></span> </h2>";
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
    // clear the sidebar contents every time it is set
    sidebar_canv.innerHTML = '';

    // might need to be used to update the first and second moment changes
    // just set a in fn variable to choose weather to query the old or new tensors
    // switch( input ) {
    //     case "default": sidebar_canv.innerHTML = "<div style='height:3vh'/>";
    //                     sidebar_canv.innerHTML += "<h2> default sidebar content </h2>";
    //                     break;
    // }


    // CURRENT PARAMS TENSORS

    // create a new HTML element to hold the main content container
    const sidebar_curr_param_container = document.createElement('div');
    sidebar_curr_param_container.id = 'sidebar-curr-param-container';

    // append the table container to the canvas element
    sidebar_canv.appendChild(sidebar_curr_param_container);

    // CURRENT PARAMS TEXT
    const sidebar_curr_param_text_container = document.createElement('div');
    sidebar_curr_param_text_container.id = 'sidebar_curr_param_text_container';
    sidebar_curr_param_text_container.innerHTML = "<h2>current params</h2>"
    sidebar_curr_param_container.appendChild(sidebar_curr_param_text_container);

    function createTable(data, tableId, tableClass, containerId) {
        const containerDiv = document.createElement('div');
        containerDiv.id = containerId;
        sidebar_curr_param_container.appendChild(containerDiv);
      
        const tableDiv = document.createElement('div');
        tableDiv.id = tableId;
        containerDiv.appendChild(tableDiv);
      
        const table = d3.select(`#${tableId}`);
        const tbody = table.append('tbody');
      
        const rows = tbody.selectAll('tr')
            .data(data)
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
      
        // Add CSS classes to the table elements
        table.classed(tableClass, true);
        table.classed('my-table-class', true);
        cells.classed('my-cell-class', true);
    }

    const my_tensor_data = adam_data["curr_model_params"]["param_1"];
    createTable(my_tensor_data, 'my-sidebar-tensor-id', 'generic-sidebar-table-class', 'my-sidebar-container-1');

    const my_tensor_data2 = adam_data["curr_model_params"]["param_2"];
    createTable(my_tensor_data2, 'my-sidebar-tensor-id-2', 'generic-sidebar-table-class', 'my-sidebar-container-2');

    const my_tensor_data3 = adam_data["curr_model_params"]["param_3"];
    // transpose the param3
    const temp_tensor = my_tensor_data3.map((value) => [value]);
    createTable(temp_tensor, 'my-sidebar-tensor-id-3', 'generic-sidebar-table-class', 'my-sidebar-container-3');


    // CURRENT FIRST MOMENT TENSORS

    // create a new HTML element to hold the main content container
    const sidebar_first_moment_container = document.createElement('div');
    sidebar_first_moment_container.id = 'sidebar-first-moment-container';

    // append the table container to the canvas element
    sidebar_canv.appendChild(sidebar_first_moment_container);

    // FIRST MOMENT TEXT
    const sidebar_first_moment_text_container = document.createElement('div');
    sidebar_first_moment_text_container.id = 'sidebar_first_moment_text_container';
    sidebar_first_moment_text_container.innerHTML = "<h2>current bc first moment vectors</h2>"
    sidebar_first_moment_container.appendChild(sidebar_first_moment_text_container);

    function createTable2(data, tableId, tableClass, containerId) {
        const containerDiv = document.createElement('div');
        containerDiv.id = containerId;
        sidebar_first_moment_container.appendChild(containerDiv);
      
        const tableDiv = document.createElement('div');
        tableDiv.id = tableId;
        containerDiv.appendChild(tableDiv);
      
        const table = d3.select(`#${tableId}`);
        const tbody = table.append('tbody');
      
        const rows = tbody.selectAll('tr')
            .data(data)
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
      
        // Add CSS classes to the table elements
        table.classed(tableClass, true);
        table.classed('my-table-class', true);
        cells.classed('my-cell-class', true);
    }

    const my_tensor_data_b = adam_data["gradient_states"]["first_moments_bc"]["param_1_m_hat"];
    createTable2(my_tensor_data_b, 'my-sidebar-tensor-id-b', 'generic-sidebar-table-class', 'my-sidebar-container-1-b');

    const my_tensor_data2_b = adam_data["gradient_states"]["first_moments_bc"]["param_2_m_hat"];
    createTable2(my_tensor_data2_b, 'my-sidebar-tensor-id-2-b', 'generic-sidebar-table-class', 'my-sidebar-container-2-b');

    const my_tensor_data3_b = adam_data["gradient_states"]["first_moments_bc"]["param_3_m_hat"];
    // transpose the param3
    const temp_tensor_b = my_tensor_data3_b.map((value) => [value]);
    createTable2(temp_tensor_b, 'my-sidebar-tensor-id-3-b', 'generic-sidebar-table-class', 'my-sidebar-container-3-b');


    // CURRENT SECOND MOMENT TENSORS

    // create a new HTML element to hold the main content container
    const sidebar_second_moment_container = document.createElement('div');
    sidebar_second_moment_container.id = 'sidebar-second-moment-container';

    // append the table container to the canvas element
    sidebar_canv.appendChild(sidebar_second_moment_container);

    // END PLOT CONTENT TEXT
    const sidebar_second_moment_text_container = document.createElement('div');
    sidebar_second_moment_text_container.id = 'sidebar_second_moment_text_container';
    sidebar_second_moment_text_container.innerHTML = "<h2>current bc second moment vectors</h2>"
    sidebar_second_moment_container.appendChild(sidebar_second_moment_text_container);

    function createTable3(data, tableId, tableClass, containerId) {
        const containerDiv = document.createElement('div');
        containerDiv.id = containerId;
        sidebar_second_moment_container.appendChild(containerDiv);
      
        const tableDiv = document.createElement('div');
        tableDiv.id = tableId;
        containerDiv.appendChild(tableDiv);
      
        const table = d3.select(`#${tableId}`);
        const tbody = table.append('tbody');
      
        const rows = tbody.selectAll('tr')
            .data(data)
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
      
        // Add CSS classes to the table elements
        table.classed(tableClass, true);
        table.classed('my-table-class', true);
        cells.classed('my-cell-class', true);
    }

    const my_tensor_data_c = adam_data["gradient_states"]["second_moments_bc"]["param_1_v_hat"];
    createTable3(my_tensor_data_c, 'my-sidebar-tensor-id-c', 'generic-sidebar-table-class', 'my-sidebar-container-1-c');

    const my_tensor_data2_c = adam_data["gradient_states"]["second_moments_bc"]["param_2_v_hat"];
    createTable3(my_tensor_data2_c, 'my-sidebar-tensor-id-2-c', 'generic-sidebar-table-class', 'my-sidebar-container-2-c');

    const my_tensor_data3_c = adam_data["gradient_states"]["second_moments_bc"]["param_3_v_hat"];
    // transpose the param3
    const temp_tensor_c = my_tensor_data3_c.map((value) => [value]);
    createTable3(temp_tensor_c, 'my-sidebar-tensor-id-3-c', 'generic-sidebar-table-class', 'my-sidebar-container-3-c');


    // PLOT LOSS
    
    // ----- create a new HTML element to hold the table
    const loss_plot_div = document.createElement('div');
    loss_plot_div.id = 'sidebar-loss-plot';

    // append the plot element to the canvas element
    sidebar_canv.appendChild(loss_plot_div);

    // get desired tensor for this epoch
    loss_arr_y = adam_data["loss_steps"]["avg_loss_vals"];
    loss_arr_x = Array.from({ length: loss_arr_y.length }, (_, i) => i);
    console.log(loss_arr_y)
    console.log(loss_arr_x)

    // Make an AJAX request to retrieve the plot data
    $.ajax({
        type: 'GET',
        url: '/plot-data',
        data: {
        plotType: 'scatter',
        //xData: [1, 2, 3, 4, 5],
        //yData: [2, 4, 1, 3, 5]
        xData: loss_arr_x,
        yData: loss_arr_y
        },
        success: function(data) {
        // Create a new plotly graph with the received data
        var plotData = [data];
        var plotLayout = {
            margin: {
                t: 50, // top margin
                l: 40, // left margin
                r: 40, // right margin
                b: 60 // bottom margin
            },
            title: 'Average Loss at Iterations',
            xaxis: {title: 'Iteration'}
            // yaxis: {title: 'Y Axis Title'}
        };
        var plotConfig = {
            responsive: true
        };
        Plotly.newPlot('sidebar-loss-plot', plotData, plotLayout, plotConfig);
        },
        error: function(jqXHR, textStatus, errorThrown) {
        console.error('Error making AJAX request:', errorThrown);
        }
    });

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
    let delay = 400;
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
