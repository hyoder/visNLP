const      canv = document.getElementById( "canv_adam" ),
   sidebar_canv = document.getElementById( "sidebar_canv_adam"),
         footer = document.getElementById( "footer_adam"),
       back_btn = document.getElementById( "adam_back_btn" ),
        fwd_btn = document.getElementById( "adam_fwd_btn" ),
         ff_btn = document.getElementById( "adam_ff_btn")
      reset_btn = document.getElementById( "adam_reset_btn" ),
        sidebar = document.getElementById( "sidebar_adam"),
       statuses = ["intro", "cbow_contexts", "cbow_linear_dot_prod", "cbow_linear_bias_sum", "nll_loss_softmax", "nll_loss_log", "nll_loss_epoch_avg", "gradients", "first_moment_a", "first_moment_b", "first_moment_c", "second_moment_a", "second_moment_b", "second_moment_c", "second_moment_d", "bc_first_moment", "bc_second_moment", "update_params_a", "update_params_b", "update_params_c", "update_params_d", "update_params_e"];

// init current page and epoch
let page_status = 0;
let epoch_status = 0;
// init data var
let adam_data;
// define page and epoch counts
let page_count = 22;
let epoch_count = 20;


function meta() // sets and returns page metadata for meta div (top left corner of canvas)
{
    let output  = "<div id=\"meta_adam\" class=\"meta_adam_class\" >";
        output += "<h4>Iteration: " + "<h5>" + (epoch_status) + "</h5>" + "</h4>";
        output += "</div>"
    return output;
}

function meta_lower() // sets and returns page metadata for meta div (top left corner of canvas)
{
    let output  = "<div id=\"meta_adam_lower\" class=\"meta_adam_class\" >";
        output += "<h4>Step: " + "<h5>" + (page_status+1) + "/" + (page_count) + "</h5>" + "</h4>";
        output += "</div>"
    return output;
}

function meta_progress_bar() // sets and returns page metadata for meta div (top left corner of canvas)
{
    let bar_width = (page_status + 1) / page_count * 100;
    let output  = "<div id=\"meta_adam_progress_outline\" >";
        output += "<div style='width:" + bar_width + "%' id=\"meta_adam_progress_bar\" >";
        output += "</div>";
        output += "</div>";
    return output;
}


function intro()
{
    setfooter( "intro" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += meta_lower()
    canv.innerHTML += meta_progress_bar()

    // set title
    canv.innerHTML += "<div style='height:10vh'/>"
    canv.innerHTML += "<h3>Perform New Optimization Step</h3>";

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
    createTable(my_tensor_data, 'my-tensor-id', 'generic-table-class', 'my-table-container-4');

    // TABLE 2
    const my_tensor_data2 = adam_data["curr_model_params"]["param_2"];
    createTable(my_tensor_data2, 'my-tensor-id-2', 'generic-table-class', 'my-table-container-5');

    // TABLE 3
    const my_tensor_data3 = adam_data["curr_model_params"]["param_3"];
    // transpose the param3
    const temp_tensor = my_tensor_data3.map((value) => [value]);
    createTable(temp_tensor, 'my-tensor-id-3', 'generic-table-class', 'my-table-container-6');

    // TITLE HEADER 1
    const tableTitleContainer1 = document.createElement('div');
    tableTitleContainer1.id = 'tableTitleContainer-4';
    tableTitleContainer1.innerHTML = "<h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer1);

    // TITLE HEADER 2
    const tableTitleContainer2 = document.createElement('div');
    tableTitleContainer2.id = 'tableTitleContainer-5';
    tableTitleContainer2.innerHTML = "<h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer2);

    // TITLE HEADER 3
    const tableTitleContainer3 = document.createElement('div');
    tableTitleContainer3.id = 'tableTitleContainer-6';
    tableTitleContainer3.innerHTML = "<h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer3);
    
    // TITLE HEADER DESC 6
    const tableTitleContainer15 = document.createElement('div');
    tableTitleContainer15.id = 'tableTitleContainer-d6';
    if ( epoch_status == 0 ) {
        tableTitleContainer15.innerHTML = "<h2> Random Generated Initial Model Parameters </h2>"
    } else {
        tableTitleContainer15.innerHTML = "<h2> Parameters Obtained From Previous Update Step Are Passed Back To Objective Function </h2>"
    }
    mainContentContainer.appendChild(tableTitleContainer15);
}


function cbow_contexts()
{
    setfooter( "cbow_contexts" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += meta_lower()
    canv.innerHTML += meta_progress_bar()

    // set title
    canv.innerHTML += "<div style='height:10vh'/>"
    canv.innerHTML += "<h3>Perform Forward Pass: Contexts</h3>";

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

        let cells = d3.select(null);
        let formatted = '';

        if (tableId == "my-tensor-id-2" || tableId == "my-tensor-id-3") {
            cells = rows.selectAll('td')
            .data(d => d)
            .enter()
            .append('td')
            .text(d => {
                return ('\u00A0\u00A0' + d + '\u00A0\u00A0');
            });
        } else {
            cells = rows.selectAll('td')
            .data(d => d)
            .enter()
            .append('td')
            .text(d => {
                const formatted = d.toFixed(4);
                return (d >= 0 ? '\u00A0' : '') + formatted;
            });
        }
        
        // Add CSS classes to the table elements
        table.classed(tableClass, true);
        table.classed('my-table-class', true);
        cells.classed('my-cell-class', true);
    }

    // TABLE 1
    const my_tensor_data = adam_data["curr_model_params"]["param_1"];
    createTable(my_tensor_data, 'my-tensor-id', 'generic-table-class', 'my-table-container-9');

    // OPERATION 1
    const operationContainer1 = document.createElement('div');
    operationContainer1.id = 'operationContainer-4';
    mainContentContainer.appendChild(operationContainer1);
    // create the svg element
    const svg = d3.select('#operationContainer-4')
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
    .text('At Pos')
    .attr('x', 50)
    .attr('y', 50)
    .attr('text-anchor', 'middle')
    .attr("font-size", "18px")
    .attr('dominant-baseline', 'middle')
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // TABLE 2
    const my_tensor_data2 = adam_data["cbow_steps"]["context_one_hots"][0];
    createTable(my_tensor_data2, 'my-tensor-id-2', 'generic-table-class', 'my-table-container-10');

    // OPERATION 2
    const operationContainer2 = document.createElement('div');
    operationContainer2.id = 'operationContainer-5';
    mainContentContainer.appendChild(operationContainer2);
    // create the svg element
    const svg2 = d3.select('#operationContainer-5')
    .append('svg')
    .attr('width', 100)
    .attr('height', 100);
    // create the circle
    const circle2 = svg2.append('circle')
    .attr('cx', 50)
    .attr('cy', 50)
    .attr('r', 50)
    .attr('fill', 'rgb(0, 140, 255)');
    // create the text
    const text2 = svg2.append('text')
    .text('At Pos')
    .attr('x', 50)
    .attr('y', 50)
    .attr('text-anchor', 'middle')
    .attr("font-size", "18px")
    .attr('dominant-baseline', 'middle')
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // TABLE 3
    const my_tensor_data3 = adam_data["cbow_steps"]["context_one_hots"][1];
    createTable(my_tensor_data3, 'my-tensor-id-3', 'generic-table-class', 'my-table-container-11');

    // OPERATION 3
    const operationContainer3 = document.createElement('div');
    operationContainer3.id = 'operationContainer-6';
    mainContentContainer.appendChild(operationContainer3);
    // create svg element
    const svg3 = d3.select("#operationContainer-6").append("svg")
    .attr("width", 100)
    .attr("height", 100);
    // create arrow path
    const arrowPath = "M0,30 L70,30 L70,15 L100,50 L70,85 L70,70 L0,70 Z";
    // create arrow shape
    svg3.append("path")
    .attr("d", arrowPath)
    .attr("stroke", 'rgb(0, 140, 255)')
    .attr("stroke-width", "1")
    .attr("fill", 'rgb(0, 140, 255)');
    // create text element
    svg3.append("text")
    .attr("x", 50)
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("font-size", "18px")
    .text(" ")
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // TABLE 4
    const temp1 = adam_data["cbow_steps"]["context_matrix"][0][0];
    const temp2 = adam_data["cbow_steps"]["context_matrix"][1][0];
    const my_tensor_data4 = [temp1, temp2]
    createTable(my_tensor_data4, 'my-tensor-id-4', 'generic-table-class', 'my-table-container-12');

    // TITLE HEADER 1
    const tableTitleContainer1 = document.createElement('div');
    tableTitleContainer1.id = 'tableTitleContainer-9';
    tableTitleContainer1.innerHTML = "<h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer1);

    // TITLE HEADER 2
    const tableTitleContainer2 = document.createElement('div');
    tableTitleContainer2.id = 'tableTitleContainer-10';
    tableTitleContainer2.innerHTML = "<h2>Context 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer2);

    // TITLE HEADER 3
    const tableTitleContainer3 = document.createElement('div');
    tableTitleContainer3.id = 'tableTitleContainer-11';
    tableTitleContainer3.innerHTML = "<h2>Context 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer3); 

    // TITLE HEADER 3
    const tableTitleContainer4 = document.createElement('div');
    tableTitleContainer4.id = 'tableTitleContainer-12';
    tableTitleContainer4.innerHTML = "<h2>Context Matrix</h2>"
    mainContentContainer.appendChild(tableTitleContainer4); 
}


function cbow_linear_dot_prod()
{
    setfooter( "cbow_linear_dot_prod" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += meta_lower()
    canv.innerHTML += meta_progress_bar()

    // set title
    canv.innerHTML += "<div style='height:10vh'/>"
    canv.innerHTML += "<h3>Perform Forward Pass: Linear Transform pt.1/2</h3>";

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
    const my_tensor_data = adam_data["curr_model_params"]["param_2"];
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
    const temp1 = adam_data["cbow_steps"]["context_matrix"][0][0];
    const temp2 = adam_data["cbow_steps"]["context_matrix"][1][0];
    const my_tensor_data2 = [temp1, temp2]
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
    .text(" ")
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // TABLE 3
    const my_tensor_data3 = adam_data["cbow_steps"]["dot_prod"];
    // transpose the param3
    const temp_tensor = my_tensor_data3[0].map((col, i) => my_tensor_data3.map(row => row[i]));
    createTable(temp_tensor, 'my-tensor-id-3', 'generic-table-class', 'my-table-container-3');

    // TITLE HEADER 1
    const tableTitleContainer1 = document.createElement('div');
    tableTitleContainer1.id = 'tableTitleContainer-1';
    tableTitleContainer1.innerHTML = "<h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer1);

    // TITLE HEADER 2
    const tableTitleContainer2 = document.createElement('div');
    tableTitleContainer2.id = 'tableTitleContainer-2';
    tableTitleContainer2.innerHTML = "<h2>Context Matrix</h2>"
    mainContentContainer.appendChild(tableTitleContainer2);

    // TITLE HEADER 3
    const tableTitleContainer3 = document.createElement('div');
    tableTitleContainer3.id = 'tableTitleContainer-3';
    tableTitleContainer3.innerHTML = "<h2>Ans</h2>"
    mainContentContainer.appendChild(tableTitleContainer3); 
}


function cbow_linear_bias_sum()
{
    setfooter( "cbow_linear_bias_sum" );
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += meta_lower()
    canv.innerHTML += meta_progress_bar()

    // set title
    canv.innerHTML += "<div style='height:10vh'/>"
    canv.innerHTML += "<h3>Perform Forward Pass: Linear Transform pt.2/2</h3>";

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
    const my_tensor_data = adam_data["cbow_steps"]["dot_prod"];
    // transpose the param3
    const temp_tensor2 = my_tensor_data[0].map((col, i) => my_tensor_data.map(row => row[i]));
    createTable(temp_tensor2, 'my-tensor-id', 'generic-table-class', 'my-table-container-1');

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
    .text('Plus')
    .attr('x', 50)
    .attr('y', 50)
    .attr('text-anchor', 'middle')
    .attr("font-size", "18px")
    .attr('dominant-baseline', 'middle')
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // TABLE 2
    const my_tensor_data2 = adam_data["curr_model_params"]["param_3"];
    const temp_tensor3 = my_tensor_data2.map((value) => [value]);
    createTable(temp_tensor3, 'my-tensor-id-2', 'generic-table-class', 'my-table-container-2');

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
    .text(" ")
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // TABLE 3
    const my_tensor_data3 = adam_data["cbow_steps"]["dot_prod_bias_sum"];
    // transpose the param3
    const temp_tensor = my_tensor_data3[0].map((col, i) => my_tensor_data3.map(row => row[i]));
    createTable(temp_tensor, 'my-tensor-id-3', 'generic-table-class', 'my-table-container-3');

    // TITLE HEADER 1
    const tableTitleContainer1 = document.createElement('div');
    tableTitleContainer1.id = 'tableTitleContainer-1';
    tableTitleContainer1.innerHTML = "<h2>Ans</h2>"
    mainContentContainer.appendChild(tableTitleContainer1);

    // TITLE HEADER 2
    const tableTitleContainer2 = document.createElement('div');
    tableTitleContainer2.id = 'tableTitleContainer-2';
    tableTitleContainer2.innerHTML = "<h2>Param 3 (Bias)</h2>"
    mainContentContainer.appendChild(tableTitleContainer2);

    // TITLE HEADER 3
    const tableTitleContainer3 = document.createElement('div');
    tableTitleContainer3.id = 'tableTitleContainer-3';
    tableTitleContainer3.innerHTML = "<h2>Model Output</h2>"
    mainContentContainer.appendChild(tableTitleContainer3); 
}


function nll_loss_softmax()
{
    setfooter( "nll_loss_softmax" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += meta_lower()
    canv.innerHTML += meta_progress_bar()

    // set title
    canv.innerHTML += "<div style='height:10vh'/>"
    canv.innerHTML += "<h3>Compute the Loss: Take Softmax</h3>";

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
    const my_tensor_data = adam_data["cbow_steps"]["dot_prod_bias_sum"];
    // const temp_tensor = my_tensor_data[0].map((col, i) => my_tensor_data.map(row => row[i]));
    createTable(my_tensor_data, 'my-tensor-id', 'generic-table-class', 'my-table-container-7');

    // OPERATION 1
    const operationContainer2 = document.createElement('div');
    operationContainer2.id = 'operationContainer-3';
    mainContentContainer.appendChild(operationContainer2);
    // create svg element
    const svg2 = d3.select("#operationContainer-3").append("svg")
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
    .text("Softmax")
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // TABLE 2
    const my_tensor_data2 = adam_data["loss_steps"]["softmax"];
    createTable(my_tensor_data2, 'my-tensor-id-2', 'generic-table-class', 'my-table-container-8');

    // TITLE HEADER 1
    const tableTitleContainer1 = document.createElement('div');
    tableTitleContainer1.id = 'tableTitleContainer-7';
    tableTitleContainer1.innerHTML = "<h2>Model Out (Transposed)</h2>"
    mainContentContainer.appendChild(tableTitleContainer1);

    // TITLE HEADER 2
    const tableTitleContainer2 = document.createElement('div');
    tableTitleContainer2.id = 'tableTitleContainer-8';
    tableTitleContainer2.innerHTML = "<h2>Softmax Ans</h2>"
    mainContentContainer.appendChild(tableTitleContainer2);

}


function nll_loss_log()
{
    setfooter( "nll_loss_log" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += meta_lower()
    canv.innerHTML += meta_progress_bar()

    // set title
    canv.innerHTML += "<div style='height:10vh'/>"
    canv.innerHTML += "<h3>Compute the Loss: Take Log</h3>";

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
    const my_tensor_data = adam_data["loss_steps"]["softmax"];
    createTable(my_tensor_data, 'my-tensor-id', 'generic-table-class', 'my-table-container-7');

    // OPERATION 1
    const operationContainer2 = document.createElement('div');
    operationContainer2.id = 'operationContainer-3';
    mainContentContainer.appendChild(operationContainer2);
    // create svg element
    const svg2 = d3.select("#operationContainer-3").append("svg")
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
    .text("Log")
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // TABLE 2
    const my_tensor_data2 = adam_data["loss_steps"]["log_softmax"];
    createTable(my_tensor_data2, 'my-tensor-id-2', 'generic-table-class', 'my-table-container-8');

    // TITLE HEADER 1
    const tableTitleContainer1 = document.createElement('div');
    tableTitleContainer1.id = 'tableTitleContainer-7';
    tableTitleContainer1.innerHTML = "<h2>Softmax Ans</h2>"
    mainContentContainer.appendChild(tableTitleContainer1);

    // TITLE HEADER 2
    const tableTitleContainer2 = document.createElement('div');
    tableTitleContainer2.id = 'tableTitleContainer-8';
    tableTitleContainer2.innerHTML = "<h2>Log Probabilities</h2>"
    mainContentContainer.appendChild(tableTitleContainer2);
}


function nll_loss_epoch_avg()
{
    setfooter( "nll_loss_epoch_avg" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += meta_lower()
    canv.innerHTML += meta_progress_bar()

    // set title
    canv.innerHTML += "<div style='height:10vh'/>"
    canv.innerHTML += "<h3>Compute the Loss: Iteration Loss Measure</h3>";

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
        let cells = d3.select(null);
        let formatted = '';

        if (tableId == "my-tensor-id-3") {
            cells = rows.selectAll('td')
            .data(d => d)
            .enter()
            .append('td')
            .text(d => {
                return ('\u00A0\u00A0' + d + '\u00A0\u00A0');
            });
        } else {
            cells = rows.selectAll('td')
            .data(d => d)
            .enter()
            .append('td')
            .text(d => {
                const formatted = d.toFixed(4);
                return (d >= 0 ? '\u00A0' : '') + formatted;
            });
        }
        
        // Add CSS classes to the table elements
        table.classed(tableClass, true);
        table.classed('my-table-class', true);
        cells.classed('my-cell-class', true);
    }

    // TABLE 1
    const my_tensor_data = adam_data["loss_steps"]["log_softmax"];
    const temp_tensor3 = my_tensor_data[0].map((col, i) => my_tensor_data.map(row => row[i]));
    createTable(temp_tensor3, 'my-tensor-id', 'generic-table-class', 'my-table-container-9');

    // OPERATION 3
    const operationContainer1 = document.createElement('div');
    operationContainer1.id = 'operationContainer-4';
    mainContentContainer.appendChild(operationContainer1);
    // create svg element
    const svg1 = d3.select("#operationContainer-4").append("svg")
    .attr("width", 100)
    .attr("height", 100);
    // create arrow path
    const arrowPath1 = "M0,30 L70,30 L70,15 L100,50 L70,85 L70,70 L0,70 Z";
    // create arrow shape
    svg1.append("path")
    .attr("d", arrowPath1)
    .attr("stroke", 'rgb(0, 140, 255)')
    .attr("stroke-width", "1")
    .attr("fill", 'rgb(0, 140, 255)');
    // create text element
    svg1.append("text")
    .attr("x", 50)
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("font-size", "18px")
    .text("Avg")
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // TABLE 2
    const my_tensor_data2 = adam_data["loss_steps"]["log_softmax_vertical_avg"];
    // transpose the param3
    const temp_tensor = my_tensor_data2.map((value) => [value]);
    createTable(temp_tensor, 'my-tensor-id-2', 'generic-table-class', 'my-table-container-10');

    // OPERATION 2
    const operationContainer2 = document.createElement('div');
    operationContainer2.id = 'operationContainer-5';
    mainContentContainer.appendChild(operationContainer2);
    // create the svg element
    const svg2 = d3.select('#operationContainer-5')
    .append('svg')
    .attr('width', 100)
    .attr('height', 100);
    // create the circle
    const circle2 = svg2.append('circle')
    .attr('cx', 50)
    .attr('cy', 50)
    .attr('r', 50)
    .attr('fill', 'rgb(0, 140, 255)');
    // create the text
    const text2 = svg2.append('text')
    .text('At Pos')
    .attr('x', 50)
    .attr('y', 50)
    .attr('text-anchor', 'middle')
    .attr("font-size", "18px")
    .attr('dominant-baseline', 'middle')
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // TABLE 3
    const my_tensor_data3 = adam_data["loss_steps"]["center_one_hot"];
    createTable(my_tensor_data3, 'my-tensor-id-3', 'generic-table-class', 'my-table-container-11');

    // OPERATION 3
    const operationContainer3 = document.createElement('div');
    operationContainer3.id = 'operationContainer-6';
    mainContentContainer.appendChild(operationContainer3);
    // create svg element
    const svg3 = d3.select("#operationContainer-6").append("svg")
    .attr("width", 100)
    .attr("height", 100);
    // create arrow path
    const arrowPath = "M0,30 L70,30 L70,15 L100,50 L70,85 L70,70 L0,70 Z";
    // create arrow shape
    svg3.append("path")
    .attr("d", arrowPath)
    .attr("stroke", 'rgb(0, 140, 255)')
    .attr("stroke-width", "1")
    .attr("fill", 'rgb(0, 140, 255)');
    // create text element
    svg3.append("text")
    .attr("x", 50)
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("font-size", "18px")
    .text("Abs Val")
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // TABLE 4
    const my_tensor_data4 = [[adam_data["loss_steps"]["avg_epoch_loss"]]];
    createTable(my_tensor_data4, 'my-tensor-id-4', 'generic-table-class', 'my-table-container-12');

    // TITLE HEADER 1
    const tableTitleContainer1 = document.createElement('div');
    tableTitleContainer1.id = 'tableTitleContainer-9';
    tableTitleContainer1.innerHTML = "<h2>Log Probabilities</h2>"
    mainContentContainer.appendChild(tableTitleContainer1);

    // TITLE HEADER 2
    const tableTitleContainer2 = document.createElement('div');
    tableTitleContainer2.id = 'tableTitleContainer-10';
    tableTitleContainer2.innerHTML = "<h2>Loss Avgs</h2>"
    mainContentContainer.appendChild(tableTitleContainer2);

    // TITLE HEADER 3
    const tableTitleContainer3 = document.createElement('div');
    tableTitleContainer3.id = 'tableTitleContainer-11';
    tableTitleContainer3.innerHTML = "<h2>Center Pos</h2>"
    mainContentContainer.appendChild(tableTitleContainer3); 

    // TITLE HEADER 3
    const tableTitleContainer4 = document.createElement('div');
    tableTitleContainer4.id = 'tableTitleContainer-12';
    tableTitleContainer4.innerHTML = "<h2>Avg Loss Measure</h2>"
    mainContentContainer.appendChild(tableTitleContainer4); 
}


function gradients()
{
    setfooter( "gradients" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += meta_lower()
    canv.innerHTML += meta_progress_bar()

    // set title
    canv.innerHTML += "<div style='height:10vh'/>"
    canv.innerHTML += "<h3>Get Gradients With Respect To Stochastic Objective:</h3>";

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
    const my_tensor_data = adam_data["gradient_states"]["grads"]["param_1_grad"];
    createTable(my_tensor_data, 'my-tensor-id', 'generic-table-class', 'my-table-container-4');

    // TABLE 2
    const my_tensor_data2 = adam_data["gradient_states"]["grads"]["param_2_grad"];
    createTable(my_tensor_data2, 'my-tensor-id-2', 'generic-table-class', 'my-table-container-5');

    // TABLE 3
    const my_tensor_data3 = adam_data["gradient_states"]["grads"]["param_3_grad"];
    // transpose the param3
    const temp_tensor = my_tensor_data3.map((value) => [value]);
    createTable(temp_tensor, 'my-tensor-id-3', 'generic-table-class', 'my-table-container-6');

    // TITLE HEADER 1
    const tableTitleContainer1 = document.createElement('div');
    tableTitleContainer1.id = 'tableTitleContainer-4';
    tableTitleContainer1.innerHTML = "<h2>Gradient</h2><h2>w.r.t. Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer1);

    // TITLE HEADER 2
    const tableTitleContainer2 = document.createElement('div');
    tableTitleContainer2.id = 'tableTitleContainer-5';
    tableTitleContainer2.innerHTML = "<h2>Gradient</h2><h2>w.r.t. Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer2);

    // TITLE HEADER 3
    const tableTitleContainer3 = document.createElement('div');
    tableTitleContainer3.id = 'tableTitleContainer-6';
    tableTitleContainer3.innerHTML = "<h2>Gradient</h2><h2>w.r.t. Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer3); 

    // TITLE HEADER DESC 6
    const tableTitleContainer15 = document.createElement('div');
    tableTitleContainer15.id = 'tableTitleContainer-d6';
    tableTitleContainer15.innerHTML = "<h2> 3 Gradients Are Obtained w.r.t. (with respect to) The 3 Model Parameters to be Optimized </h2>"
    
    mainContentContainer.appendChild(tableTitleContainer15);
}


function first_moment_a()
{
    setfooter( "first_moment_a" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += meta_lower()
    canv.innerHTML += meta_progress_bar()

    // set title
    canv.innerHTML += "<div style='height:10vh'/>"
    canv.innerHTML += "<h3>Update Biased First Moment Vector: pt. 1/3</h3>";

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
        let cells = d3.select(null);
        let formatted = '';

        if (tableId == "my-tensor-id-4") {
            cells = rows.selectAll('td')
            .data(d => d)
            .enter()
            .append('td')
            .text(d => {
                return ('\u00A0\u00A0' + d + '\u00A0\u00A0');
            });
        } else {
            cells = rows.selectAll('td')
            .data(d => d)
            .enter()
            .append('td')
            .text(d => {
                const formatted = d.toFixed(4);
                return (d >= 0 ? '\u00A0' : '') + formatted;
            });
        }

        
      
        // Add CSS classes to the table elements
        table.classed(tableClass, true);
        table.classed('my-table-class', true);
        cells.classed('my-cell-class', true);
    }

    // TABLE 1
    const my_tensor_data = adam_data["gradient_states"]["grads"]["param_1_grad"];
    createTable(my_tensor_data, 'my-tensor-id', 'generic-table-class-grid', 'my-table-container-g1');

    // TABLE 2
    const my_tensor_data2 = adam_data["gradient_states"]["grads"]["param_2_grad"];
    createTable(my_tensor_data2, 'my-tensor-id-2', 'generic-table-class-grid', 'my-table-container-g2');

    // TABLE 3
    const my_tensor_data3 = adam_data["gradient_states"]["grads"]["param_3_grad"];
    const temp_tensor = my_tensor_data3.map((value) => [value]);
    createTable(temp_tensor, 'my-tensor-id-3', 'generic-table-class-grid', 'my-table-container-g3');

    // TABLE 4
    const my_tensor_data4 = [[adam_data["adam_optim_hyperparams"]["beta_1"]]];
    createTable(my_tensor_data4, 'my-tensor-id-4', 'generic-table-class-grid', 'my-table-container-g4');

    // TABLE 7
    const my_tensor_data7 = adam_data["first_moment_calculations"]["grad_beta_1_products"]["param_1"];
    createTable(my_tensor_data7, 'my-tensor-id-7', 'generic-table-class-grid', 'my-table-container-g7');

    // TABLE 8
    const my_tensor_data8 = adam_data["first_moment_calculations"]["grad_beta_1_products"]["param_2"];
    createTable(my_tensor_data8, 'my-tensor-id-8', 'generic-table-class-grid', 'my-table-container-g8');

    // TABLE 9
    const my_tensor_data9 = adam_data["first_moment_calculations"]["grad_beta_1_products"]["param_3"];
    const temp_tensor3 = my_tensor_data9.map((value) => [value]);
    createTable(temp_tensor3, 'my-tensor-id-9', 'generic-table-class-grid', 'my-table-container-g9');

    // OPERATION 1
    const operationContainer1 = document.createElement('div');
    operationContainer1.id = 'operationContainer-g1';
    mainContentContainer.appendChild(operationContainer1);
    // create the svg element
    const svg = d3.select('#operationContainer-g1')
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

    // OPERATION 2
    const operationContainer2 = document.createElement('div');
    operationContainer2.id = 'operationContainer-g3';
    mainContentContainer.appendChild(operationContainer2);
    // create svg element
    const svg2 = d3.select("#operationContainer-g3").append("svg")
    .attr("width", 100)
    .attr("height", 100);
    // create arrow path
    // const arrowPath = "M0,30 L70,30 L70,15 L100,50 L70,85 L70,70 L0,70 Z";
    const arrowPath = "M23,0 L23,70 L12,70 L50,100 L88,70 L77,70 L77,0 Z"
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
    .text(" ")
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // OPERATION 4 (DASHED LINE)
    const operationContainer4 = document.createElement('div');
    operationContainer4.id = 'operationContainer-g4';
    mainContentContainer.appendChild(operationContainer4);

    // TITLE HEADER 1
    const tableTitleContainer1 = document.createElement('div');
    tableTitleContainer1.id = 'tableTitleContainer-g1';
    tableTitleContainer1.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer1);

    // TITLE HEADER 2
    const tableTitleContainer2 = document.createElement('div');
    tableTitleContainer2.id = 'tableTitleContainer-g2';
    tableTitleContainer2.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer2);

    // TITLE HEADER 3
    const tableTitleContainer3 = document.createElement('div');
    tableTitleContainer3.id = 'tableTitleContainer-g3';
    tableTitleContainer3.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer3); 

    // TITLE HEADER 7
    const tableTitleContainer7 = document.createElement('div');
    tableTitleContainer7.id = 'tableTitleContainer-g7';
    tableTitleContainer7.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer7); 

    // TITLE HEADER 8
    const tableTitleContainer8 = document.createElement('div');
    tableTitleContainer8.id = 'tableTitleContainer-g8';
    tableTitleContainer8.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer8); 

    // TITLE HEADER 9
    const tableTitleContainer9 = document.createElement('div');
    tableTitleContainer9.id = 'tableTitleContainer-g9';
    tableTitleContainer9.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer9); 

    // TITLE HEADER DESC 1
    const tableTitleContainer10 = document.createElement('div');
    tableTitleContainer10.id = 'tableTitleContainer-d1';
    tableTitleContainer10.innerHTML = "<h2>Current Gradients (g<sub>t</sub>) </h2>"
    mainContentContainer.appendChild(tableTitleContainer10); 

    // TITLE HEADER DESC 3
    const tableTitleContainer12 = document.createElement('div');
    tableTitleContainer12.id = 'tableTitleContainer-d3';
    tableTitleContainer12.innerHTML = "<h2> Ans ((1 - β<sub>1</sub>) ● g<sub>t</sub>) </h2>"
    mainContentContainer.appendChild(tableTitleContainer12);

    // TITLE HEADER DESC 4
    const tableTitleContainer13 = document.createElement('div');
    tableTitleContainer13.id = 'tableTitleContainer-d4';
    tableTitleContainer13.innerHTML = "<h2>(1 - </h2>"
    mainContentContainer.appendChild(tableTitleContainer13);

    // TITLE HEADER DESC 5
    const tableTitleContainer14 = document.createElement('div');
    tableTitleContainer14.id = 'tableTitleContainer-d5';
    tableTitleContainer14.innerHTML = "<h2>)\u00A0\u00A0\u00A0\u00A0\u00A0Beta1</h2>"
    mainContentContainer.appendChild(tableTitleContainer14);
}


function first_moment_b()
{
    setfooter( "first_moment_b" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += meta_lower()
    canv.innerHTML += meta_progress_bar()

    // set title
    canv.innerHTML += "<div style='height:10vh'/>"
    canv.innerHTML += "<h3>Update Biased First Moment Vector: pt. 2/3</h3>";

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
        let cells = d3.select(null);
        let formatted = '';

        if (tableId == "my-tensor-id-4") {
            cells = rows.selectAll('td')
            .data(d => d)
            .enter()
            .append('td')
            .text(d => {
                return ('\u00A0\u00A0' + d + '\u00A0\u00A0');
            });
        } else {
            cells = rows.selectAll('td')
            .data(d => d)
            .enter()
            .append('td')
            .text(d => {
                const formatted = d.toFixed(4);
                return (d >= 0 ? '\u00A0' : '') + formatted;
            });
        }

        
      
        // Add CSS classes to the table elements
        table.classed(tableClass, true);
        table.classed('my-table-class', true);
        cells.classed('my-cell-class', true);
    }

    // TABLE 1
    const my_tensor_data = adam_data["gradient_states"]["prev_first_moments_raw"]["prev_param_1_m"];
    createTable(my_tensor_data, 'my-tensor-id', 'generic-table-class-grid', 'my-table-container-g1');

    // TABLE 2
    const my_tensor_data2 = adam_data["gradient_states"]["prev_first_moments_raw"]["prev_param_2_m"];
    createTable(my_tensor_data2, 'my-tensor-id-2', 'generic-table-class-grid', 'my-table-container-g2');

    // TABLE 3
    const my_tensor_data3 = adam_data["gradient_states"]["prev_first_moments_raw"]["prev_param_3_m"];
    const temp_tensor = my_tensor_data3.map((value) => [value]);
    createTable(temp_tensor, 'my-tensor-id-3', 'generic-table-class-grid', 'my-table-container-g3');

    // TABLE 4
    const my_tensor_data4 = [[adam_data["adam_optim_hyperparams"]["beta_1"]]];
    createTable(my_tensor_data4, 'my-tensor-id-4', 'generic-table-class-grid', 'my-table-container-g4');

    // TABLE 7
    const my_tensor_data7 = adam_data["first_moment_calculations"]["prev_m_beta_1_products"]["param_1"];
    createTable(my_tensor_data7, 'my-tensor-id-7', 'generic-table-class-grid', 'my-table-container-g7');

    // TABLE 8
    const my_tensor_data8 = adam_data["first_moment_calculations"]["prev_m_beta_1_products"]["param_2"];
    createTable(my_tensor_data8, 'my-tensor-id-8', 'generic-table-class-grid', 'my-table-container-g8');

    // TABLE 9
    const my_tensor_data9 = adam_data["first_moment_calculations"]["prev_m_beta_1_products"]["param_3"];
    const temp_tensor3 = my_tensor_data9.map((value) => [value]);
    createTable(temp_tensor3, 'my-tensor-id-9', 'generic-table-class-grid', 'my-table-container-g9');

    // OPERATION 1
    const operationContainer1 = document.createElement('div');
    operationContainer1.id = 'operationContainer-g1';
    mainContentContainer.appendChild(operationContainer1);
    // create the svg element
    const svg = d3.select('#operationContainer-g1')
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

    // OPERATION 2
    const operationContainer2 = document.createElement('div');
    operationContainer2.id = 'operationContainer-g3';
    mainContentContainer.appendChild(operationContainer2);
    // create svg element
    const svg2 = d3.select("#operationContainer-g3").append("svg")
    .attr("width", 100)
    .attr("height", 100);
    // create arrow path
    // const arrowPath = "M0,30 L70,30 L70,15 L100,50 L70,85 L70,70 L0,70 Z";
    const arrowPath = "M23,0 L23,70 L12,70 L50,100 L88,70 L77,70 L77,0 Z"
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
    .text(" ")
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // OPERATION 4 (DASHED LINE)
    const operationContainer4 = document.createElement('div');
    operationContainer4.id = 'operationContainer-g4';
    mainContentContainer.appendChild(operationContainer4);

    // TITLE HEADER 1
    const tableTitleContainer1 = document.createElement('div');
    tableTitleContainer1.id = 'tableTitleContainer-g1';
    tableTitleContainer1.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer1);

    // TITLE HEADER 2
    const tableTitleContainer2 = document.createElement('div');
    tableTitleContainer2.id = 'tableTitleContainer-g2';
    tableTitleContainer2.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer2);

    // TITLE HEADER 3
    const tableTitleContainer3 = document.createElement('div');
    tableTitleContainer3.id = 'tableTitleContainer-g3';
    tableTitleContainer3.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer3); 

    // TITLE HEADER 7
    const tableTitleContainer7 = document.createElement('div');
    tableTitleContainer7.id = 'tableTitleContainer-g7';
    tableTitleContainer7.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer7); 

    // TITLE HEADER 8
    const tableTitleContainer8 = document.createElement('div');
    tableTitleContainer8.id = 'tableTitleContainer-g8';
    tableTitleContainer8.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer8); 

    // TITLE HEADER 9
    const tableTitleContainer9 = document.createElement('div');
    tableTitleContainer9.id = 'tableTitleContainer-g9';
    tableTitleContainer9.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer9); 

    // TITLE HEADER DESC 1
    const tableTitleContainer10 = document.createElement('div');
    tableTitleContainer10.id = 'tableTitleContainer-d1';
    tableTitleContainer10.innerHTML = "<h2> Previous First Moment (m<sub>t-1</sub>)</h2>"
    mainContentContainer.appendChild(tableTitleContainer10); 

    // TITLE HEADER DESC 3
    const tableTitleContainer12 = document.createElement('div');
    tableTitleContainer12.id = 'tableTitleContainer-d3';
    tableTitleContainer12.innerHTML = "<h2> Ans (β<sub>1</sub> ● m<sub>t-1</sub>) </h2>"
    mainContentContainer.appendChild(tableTitleContainer12);

    // TITLE HEADER DESC 4
    const tableTitleContainer13 = document.createElement('div');
    tableTitleContainer13.id = 'tableTitleContainer-d4';
    tableTitleContainer13.innerHTML = "<h2></h2>"
    mainContentContainer.appendChild(tableTitleContainer13);

    // TITLE HEADER DESC 5
    const tableTitleContainer14 = document.createElement('div');
    tableTitleContainer14.id = 'tableTitleContainer-d5';
    tableTitleContainer14.innerHTML = "<h2>\u00A0\u00A0\u00A0\u00A0\u00A0Beta1</h2>"
    mainContentContainer.appendChild(tableTitleContainer14);
}


function first_moment_c()
{
    setfooter( "first_moment_c" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += meta_lower()
    canv.innerHTML += meta_progress_bar()

    // set title
    canv.innerHTML += "<div style='height:10vh'/>"
    canv.innerHTML += "<h3>Update Biased First Moment Vector: pt. 3/3</h3>";

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
    const my_tensor_data = adam_data["first_moment_calculations"]["prev_m_beta_1_products"]["param_1"];
    createTable(my_tensor_data, 'my-tensor-id', 'generic-table-class-grid', 'my-table-container-g1');

    // TABLE 2
    const my_tensor_data2 = adam_data["first_moment_calculations"]["prev_m_beta_1_products"]["param_2"];
    createTable(my_tensor_data2, 'my-tensor-id-2', 'generic-table-class-grid', 'my-table-container-g2');

    // TABLE 3
    const my_tensor_data3 = adam_data["first_moment_calculations"]["prev_m_beta_1_products"]["param_3"];
    const temp_tensor = my_tensor_data3.map((value) => [value]);
    createTable(temp_tensor, 'my-tensor-id-3', 'generic-table-class-grid', 'my-table-container-g3');

    // TABLE 4
    const my_tensor_data4 = adam_data["first_moment_calculations"]["grad_beta_1_products"]["param_1"];
    createTable(my_tensor_data4, 'my-tensor-id-4', 'generic-table-class-grid', 'my-table-container-g4');

    // TABLE 5
    const my_tensor_data5 = adam_data["first_moment_calculations"]["grad_beta_1_products"]["param_2"];
    createTable(my_tensor_data5, 'my-tensor-id-5', 'generic-table-class-grid', 'my-table-container-g5');

    // TABLE 6
    const my_tensor_data6 = adam_data["first_moment_calculations"]["grad_beta_1_products"]["param_3"];
    const temp_tensor2 = my_tensor_data6.map((value) => [value]);
    createTable(temp_tensor2, 'my-tensor-id-6', 'generic-table-class-grid', 'my-table-container-g6');

    // TABLE 7
    const my_tensor_data7 = adam_data["gradient_states"]["first_moments_raw"]["param_1_m"];
    createTable(my_tensor_data7, 'my-tensor-id-7', 'generic-table-class-grid', 'my-table-container-g7');

    // TABLE 8
    const my_tensor_data8 = adam_data["gradient_states"]["first_moments_raw"]["param_2_m"];
    createTable(my_tensor_data8, 'my-tensor-id-8', 'generic-table-class-grid', 'my-table-container-g8');

    // TABLE 9
    const my_tensor_data9 = adam_data["gradient_states"]["first_moments_raw"]["param_3_m"];
    const temp_tensor3 = my_tensor_data9.map((value) => [value]);
    createTable(temp_tensor3, 'my-tensor-id-9', 'generic-table-class-grid', 'my-table-container-g9');

    // OPERATION 1
    const operationContainer1 = document.createElement('div');
    operationContainer1.id = 'operationContainer-g1';
    mainContentContainer.appendChild(operationContainer1);
    // create the svg element
    const svg = d3.select('#operationContainer-g1')
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
    .text('Plus')
    .attr('x', 50)
    .attr('y', 50)
    .attr('text-anchor', 'middle')
    .attr("font-size", "18px")
    .attr('dominant-baseline', 'middle')
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // OPERATION 2
    const operationContainer2 = document.createElement('div');
    operationContainer2.id = 'operationContainer-g3';
    mainContentContainer.appendChild(operationContainer2);
    // create svg element
    const svg2 = d3.select("#operationContainer-g3").append("svg")
    .attr("width", 100)
    .attr("height", 100);
    // create arrow path
    // const arrowPath = "M0,30 L70,30 L70,15 L100,50 L70,85 L70,70 L0,70 Z";
    const arrowPath = "M23,0 L23,70 L12,70 L50,100 L88,70 L77,70 L77,0 Z"
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
    .text(" ")
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // OPERATION 4 (DASHED LINE)
    const operationContainer4 = document.createElement('div');
    operationContainer4.id = 'operationContainer-g4';
    mainContentContainer.appendChild(operationContainer4);

    // TITLE HEADER 1
    const tableTitleContainer1 = document.createElement('div');
    tableTitleContainer1.id = 'tableTitleContainer-g1';
    tableTitleContainer1.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer1);

    // TITLE HEADER 2
    const tableTitleContainer2 = document.createElement('div');
    tableTitleContainer2.id = 'tableTitleContainer-g2';
    tableTitleContainer2.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer2);

    // TITLE HEADER 3
    const tableTitleContainer3 = document.createElement('div');
    tableTitleContainer3.id = 'tableTitleContainer-g3';
    tableTitleContainer3.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer3); 

    // TITLE HEADER 4
    const tableTitleContainer4 = document.createElement('div');
    tableTitleContainer4.id = 'tableTitleContainer-g4';
    tableTitleContainer4.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer4); 

    // TITLE HEADER 5
    const tableTitleContainer5 = document.createElement('div');
    tableTitleContainer5.id = 'tableTitleContainer-g5';
    tableTitleContainer5.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer5); 

    // TITLE HEADER 6
    const tableTitleContainer6 = document.createElement('div');
    tableTitleContainer6.id = 'tableTitleContainer-g6';
    tableTitleContainer6.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer6); 

    // TITLE HEADER 7
    const tableTitleContainer7 = document.createElement('div');
    tableTitleContainer7.id = 'tableTitleContainer-g7';
    tableTitleContainer7.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer7); 

    // TITLE HEADER 8
    const tableTitleContainer8 = document.createElement('div');
    tableTitleContainer8.id = 'tableTitleContainer-g8';
    tableTitleContainer8.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer8); 

    // TITLE HEADER 9
    const tableTitleContainer9 = document.createElement('div');
    tableTitleContainer9.id = 'tableTitleContainer-g9';
    tableTitleContainer9.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer9); 

    // TITLE HEADER DESC 1
    const tableTitleContainer10 = document.createElement('div');
    tableTitleContainer10.id = 'tableTitleContainer-d1';
    tableTitleContainer10.innerHTML = "<h2> Ans (β<sub>1</sub> ● m<sub>t-1</sub>) </h2>"
    mainContentContainer.appendChild(tableTitleContainer10); 

    // TITLE HEADER DESC 2
    const tableTitleContainer11 = document.createElement('div');
    tableTitleContainer11.id = 'tableTitleContainer-d2';
    tableTitleContainer11.innerHTML = "<h2> Ans ((1 - β<sub>1</sub>) ● g<sub>t</sub>) </h2>"
    mainContentContainer.appendChild(tableTitleContainer11); 

    // TITLE HEADER DESC 3
    const tableTitleContainer12 = document.createElement('div');
    tableTitleContainer12.id = 'tableTitleContainer-d3';
    tableTitleContainer12.innerHTML = "<h2>Updated First Moment (m<sub>t</sub>)</h2>"
    mainContentContainer.appendChild(tableTitleContainer12); 
}

testtttt = "<h2> m<sub>t</sub> ← <span style='color: #32cd32'>β<sub>1</sub> ● m<sub>t-1</sub></span> <span style='color: rgb(0, 140, 255)'>+ (1 - β<sub>1</sub>) ● g<sub>t</sub></span> </h2>"

function second_moment_a()
{
    setfooter( "second_moment_a" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += meta_lower()
    canv.innerHTML += meta_progress_bar()

    // set title
    canv.innerHTML += "<div style='height:10vh'/>"
    canv.innerHTML += "<h3>Update Biased Second Raw Moment Vector: pt. 1/4</h3>";

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
    const my_tensor_data = adam_data["gradient_states"]["grads"]["param_1_grad"];
    createTable(my_tensor_data, 'my-tensor-id', 'generic-table-class-grid', 'my-table-container-g1');

    // TABLE 2
    const my_tensor_data2 = adam_data["gradient_states"]["grads"]["param_2_grad"];
    createTable(my_tensor_data2, 'my-tensor-id-2', 'generic-table-class-grid', 'my-table-container-g2');

    // TABLE 3
    const my_tensor_data3 = adam_data["gradient_states"]["grads"]["param_3_grad"];
    const temp_tensor = my_tensor_data3.map((value) => [value]);
    createTable(temp_tensor, 'my-tensor-id-3', 'generic-table-class-grid', 'my-table-container-g3');

    // TABLE 7
    const my_tensor_data7 = adam_data["second_moment_calculations"]["grads_sq"]["param_1"];
    createTable(my_tensor_data7, 'my-tensor-id-7', 'generic-table-class-grid', 'my-table-container-g7');

    // TABLE 8
    const my_tensor_data8 = adam_data["second_moment_calculations"]["grads_sq"]["param_2"];
    createTable(my_tensor_data8, 'my-tensor-id-8', 'generic-table-class-grid', 'my-table-container-g8');

    // TABLE 9
    const my_tensor_data9 = adam_data["second_moment_calculations"]["grads_sq"]["param_3"];
    const temp_tensor3 = my_tensor_data9.map((value) => [value]);
    createTable(temp_tensor3, 'my-tensor-id-9', 'generic-table-class-grid', 'my-table-container-g9');


    // OPERATION 1
    const operationContainer2 = document.createElement('div');
    operationContainer2.id = 'operationContainer-g2';
    mainContentContainer.appendChild(operationContainer2);
    // create svg element
    const svg2 = d3.select("#operationContainer-g2").append("svg")
    .attr("width", 100)
    .attr("height", 100);
    // create arrow path
    // const arrowPath = "M0,30 L70,30 L70,15 L100,50 L70,85 L70,70 L0,70 Z";
    const arrowPath = "M23,0 L23,70 L12,70 L50,100 L88,70 L77,70 L77,0 Z"
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
    .text("Sqaure")
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // OPERATION 4 (DASHED LINE)
    const operationContainer4 = document.createElement('div');
    operationContainer4.id = 'operationContainer-g4';
    mainContentContainer.appendChild(operationContainer4);

    // TITLE HEADER 1
    const tableTitleContainer1 = document.createElement('div');
    tableTitleContainer1.id = 'tableTitleContainer-g1';
    tableTitleContainer1.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer1);

    // TITLE HEADER 2
    const tableTitleContainer2 = document.createElement('div');
    tableTitleContainer2.id = 'tableTitleContainer-g2';
    tableTitleContainer2.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer2);

    // TITLE HEADER 3
    const tableTitleContainer3 = document.createElement('div');
    tableTitleContainer3.id = 'tableTitleContainer-g3';
    tableTitleContainer3.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer3); 

    // TITLE HEADER 7
    const tableTitleContainer7 = document.createElement('div');
    tableTitleContainer7.id = 'tableTitleContainer-g7';
    tableTitleContainer7.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer7); 

    // TITLE HEADER 8
    const tableTitleContainer8 = document.createElement('div');
    tableTitleContainer8.id = 'tableTitleContainer-g8';
    tableTitleContainer8.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer8); 

    // TITLE HEADER 9
    const tableTitleContainer9 = document.createElement('div');
    tableTitleContainer9.id = 'tableTitleContainer-g9';
    tableTitleContainer9.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer9); 

    // TITLE HEADER DESC 1
    const tableTitleContainer10 = document.createElement('div');
    tableTitleContainer10.id = 'tableTitleContainer-d1';
    tableTitleContainer10.innerHTML = "<h2> Current Gradients (g<sub>t</sub>) </h2>"
    mainContentContainer.appendChild(tableTitleContainer10); 

    // TITLE HEADER DESC 3
    const tableTitleContainer12 = document.createElement('div');
    tableTitleContainer12.id = 'tableTitleContainer-d3';
    tableTitleContainer12.innerHTML = "<h2>Gradients Squared (g<sup>2</sup><sub>t</sub>) </h2>"
    mainContentContainer.appendChild(tableTitleContainer12); 
}


function second_moment_b()
{
    setfooter( "second_moment_b" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += meta_lower()
    canv.innerHTML += meta_progress_bar()

    // set title
    canv.innerHTML += "<div style='height:10vh'/>"
    canv.innerHTML += "<h3>Update Biased Second Raw Moment Vector: pt. 2/4</h3>";

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
        let cells = d3.select(null);
        let formatted = '';

        if (tableId == "my-tensor-id-4") {
            cells = rows.selectAll('td')
            .data(d => d)
            .enter()
            .append('td')
            .text(d => {
                return ('\u00A0\u00A0' + d + '\u00A0\u00A0');
            });
        } else {
            cells = rows.selectAll('td')
            .data(d => d)
            .enter()
            .append('td')
            .text(d => {
                const formatted = d.toFixed(4);
                return (d >= 0 ? '\u00A0' : '') + formatted;
            });
        }
      
        // Add CSS classes to the table elements
        table.classed(tableClass, true);
        table.classed('my-table-class', true);
        cells.classed('my-cell-class', true);
    }

    // TABLE 1
    const my_tensor_data = adam_data["second_moment_calculations"]["grads_sq"]["param_1"];
    createTable(my_tensor_data, 'my-tensor-id', 'generic-table-class-grid', 'my-table-container-g1');

    // TABLE 2
    const my_tensor_data2 = adam_data["second_moment_calculations"]["grads_sq"]["param_2"];
    createTable(my_tensor_data2, 'my-tensor-id-2', 'generic-table-class-grid', 'my-table-container-g2');

    // TABLE 3
    const my_tensor_data3 = adam_data["second_moment_calculations"]["grads_sq"]["param_3"];
    const temp_tensor = my_tensor_data3.map((value) => [value]);
    createTable(temp_tensor, 'my-tensor-id-3', 'generic-table-class-grid', 'my-table-container-g3');

    // TABLE 4
    const my_tensor_data4 = [[adam_data["adam_optim_hyperparams"]["beta_2"]]];
    createTable(my_tensor_data4, 'my-tensor-id-4', 'generic-table-class-grid', 'my-table-container-g4');

    // TABLE 7
    const my_tensor_data7 = adam_data["second_moment_calculations"]["grad_sq_beta_2_products"]["param_1"];
    createTable(my_tensor_data7, 'my-tensor-id-7', 'generic-table-class-grid', 'my-table-container-g7');

    // TABLE 8
    const my_tensor_data8 = adam_data["second_moment_calculations"]["grad_sq_beta_2_products"]["param_2"];
    createTable(my_tensor_data8, 'my-tensor-id-8', 'generic-table-class-grid', 'my-table-container-g8');

    // TABLE 9
    const my_tensor_data9 = adam_data["second_moment_calculations"]["grad_sq_beta_2_products"]["param_3"];
    const temp_tensor3 = my_tensor_data9.map((value) => [value]);
    createTable(temp_tensor3, 'my-tensor-id-9', 'generic-table-class-grid', 'my-table-container-g9');

    // OPERATION 1
    const operationContainer1 = document.createElement('div');
    operationContainer1.id = 'operationContainer-g1';
    mainContentContainer.appendChild(operationContainer1);
    // create the svg element
    const svg = d3.select('#operationContainer-g1')
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

    // OPERATION 2
    const operationContainer2 = document.createElement('div');
    operationContainer2.id = 'operationContainer-g3';
    mainContentContainer.appendChild(operationContainer2);
    // create svg element
    const svg2 = d3.select("#operationContainer-g3").append("svg")
    .attr("width", 100)
    .attr("height", 100);
    // create arrow path
    // const arrowPath = "M0,30 L70,30 L70,15 L100,50 L70,85 L70,70 L0,70 Z";
    const arrowPath = "M23,0 L23,70 L12,70 L50,100 L88,70 L77,70 L77,0 Z"
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
    .text(" ")
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // OPERATION 4 (DASHED LINE)
    const operationContainer4 = document.createElement('div');
    operationContainer4.id = 'operationContainer-g4';
    mainContentContainer.appendChild(operationContainer4);

    // TITLE HEADER 1
    const tableTitleContainer1 = document.createElement('div');
    tableTitleContainer1.id = 'tableTitleContainer-g1';
    tableTitleContainer1.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer1);

    // TITLE HEADER 2
    const tableTitleContainer2 = document.createElement('div');
    tableTitleContainer2.id = 'tableTitleContainer-g2';
    tableTitleContainer2.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer2);

    // TITLE HEADER 3
    const tableTitleContainer3 = document.createElement('div');
    tableTitleContainer3.id = 'tableTitleContainer-g3';
    tableTitleContainer3.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer3); 

    // TITLE HEADER 7
    const tableTitleContainer7 = document.createElement('div');
    tableTitleContainer7.id = 'tableTitleContainer-g7';
    tableTitleContainer7.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer7); 

    // TITLE HEADER 8
    const tableTitleContainer8 = document.createElement('div');
    tableTitleContainer8.id = 'tableTitleContainer-g8';
    tableTitleContainer8.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer8); 

    // TITLE HEADER 9
    const tableTitleContainer9 = document.createElement('div');
    tableTitleContainer9.id = 'tableTitleContainer-g9';
    tableTitleContainer9.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer9); 

    // TITLE HEADER DESC 1
    const tableTitleContainer10 = document.createElement('div');
    tableTitleContainer10.id = 'tableTitleContainer-d1';
    tableTitleContainer10.innerHTML = "<h2> Gradients Squared (g<sup>2</sup><sub>t</sub>) </h2>"
    mainContentContainer.appendChild(tableTitleContainer10); 

    // TITLE HEADER DESC 3
    const tableTitleContainer12 = document.createElement('div');
    tableTitleContainer12.id = 'tableTitleContainer-d3';
    tableTitleContainer12.innerHTML = "<h2> Ans ((1 - β<sub>2</sub>) ● g<sup>2</sup><sub>t</sub>)</h2>"
    mainContentContainer.appendChild(tableTitleContainer12);

    // TITLE HEADER DESC 4
    const tableTitleContainer13 = document.createElement('div');
    tableTitleContainer13.id = 'tableTitleContainer-d4';
    tableTitleContainer13.innerHTML = "<h2>(1 - </h2>"
    mainContentContainer.appendChild(tableTitleContainer13);

    // TITLE HEADER DESC 5
    const tableTitleContainer14 = document.createElement('div');
    tableTitleContainer14.id = 'tableTitleContainer-d5';
    tableTitleContainer14.innerHTML = "<h2>) \u00A0\u00A0\u00A0\u00A0\u00A0Beta2</h2>"
    mainContentContainer.appendChild(tableTitleContainer14);
}


function second_moment_c()
{
    setfooter( "second_moment_c" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += meta_lower()
    canv.innerHTML += meta_progress_bar()

    // set title
    canv.innerHTML += "<div style='height:10vh'/>"
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
        let cells = d3.select(null);
        let formatted = '';

        if (tableId == "my-tensor-id-4") {
            cells = rows.selectAll('td')
            .data(d => d)
            .enter()
            .append('td')
            .text(d => {
                return ('\u00A0\u00A0' + d + '\u00A0\u00A0');
            });
        } else {
            cells = rows.selectAll('td')
            .data(d => d)
            .enter()
            .append('td')
            .text(d => {
                const formatted = d.toFixed(4);
                return (d >= 0 ? '\u00A0' : '') + formatted;
            });
        }
      
        // Add CSS classes to the table elements
        table.classed(tableClass, true);
        table.classed('my-table-class', true);
        cells.classed('my-cell-class', true);
    }

    // TABLE 1
    const my_tensor_data = adam_data["gradient_states"]["prev_second_moments_raw"]["prev_param_1_v"];
    createTable(my_tensor_data, 'my-tensor-id', 'generic-table-class-grid', 'my-table-container-g1');

    // TABLE 2
    const my_tensor_data2 = adam_data["gradient_states"]["prev_second_moments_raw"]["prev_param_2_v"];
    createTable(my_tensor_data2, 'my-tensor-id-2', 'generic-table-class-grid', 'my-table-container-g2');

    // TABLE 3
    const my_tensor_data3 = adam_data["gradient_states"]["prev_second_moments_raw"]["prev_param_3_v"];
    const temp_tensor = my_tensor_data3.map((value) => [value]);
    createTable(temp_tensor, 'my-tensor-id-3', 'generic-table-class-grid', 'my-table-container-g3');

    // TABLE 4
    const my_tensor_data4 = [[adam_data["adam_optim_hyperparams"]["beta_2"]]];
    createTable(my_tensor_data4, 'my-tensor-id-4', 'generic-table-class-grid', 'my-table-container-g4');

    // TABLE 7
    const my_tensor_data7 = adam_data["second_moment_calculations"]["prev_v_beta_2_products"]["param_1"];
    createTable(my_tensor_data7, 'my-tensor-id-7', 'generic-table-class-grid', 'my-table-container-g7');

    // TABLE 8
    const my_tensor_data8 = adam_data["second_moment_calculations"]["prev_v_beta_2_products"]["param_2"];
    createTable(my_tensor_data8, 'my-tensor-id-8', 'generic-table-class-grid', 'my-table-container-g8');

    // TABLE 9
    const my_tensor_data9 = adam_data["second_moment_calculations"]["prev_v_beta_2_products"]["param_3"];
    const temp_tensor3 = my_tensor_data9.map((value) => [value]);
    createTable(temp_tensor3, 'my-tensor-id-9', 'generic-table-class-grid', 'my-table-container-g9');

    // OPERATION 1
    const operationContainer1 = document.createElement('div');
    operationContainer1.id = 'operationContainer-g1';
    mainContentContainer.appendChild(operationContainer1);
    // create the svg element
    const svg = d3.select('#operationContainer-g1')
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

    // OPERATION 2
    const operationContainer2 = document.createElement('div');
    operationContainer2.id = 'operationContainer-g3';
    mainContentContainer.appendChild(operationContainer2);
    // create svg element
    const svg2 = d3.select("#operationContainer-g3").append("svg")
    .attr("width", 100)
    .attr("height", 100);
    // create arrow path
    // const arrowPath = "M0,30 L70,30 L70,15 L100,50 L70,85 L70,70 L0,70 Z";
    const arrowPath = "M23,0 L23,70 L12,70 L50,100 L88,70 L77,70 L77,0 Z"
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
    .text(" ")
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // OPERATION 4 (DASHED LINE)
    const operationContainer4 = document.createElement('div');
    operationContainer4.id = 'operationContainer-g4';
    mainContentContainer.appendChild(operationContainer4);

    // TITLE HEADER 1
    const tableTitleContainer1 = document.createElement('div');
    tableTitleContainer1.id = 'tableTitleContainer-g1';
    tableTitleContainer1.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer1);

    // TITLE HEADER 2
    const tableTitleContainer2 = document.createElement('div');
    tableTitleContainer2.id = 'tableTitleContainer-g2';
    tableTitleContainer2.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer2);

    // TITLE HEADER 3
    const tableTitleContainer3 = document.createElement('div');
    tableTitleContainer3.id = 'tableTitleContainer-g3';
    tableTitleContainer3.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer3); 

    // TITLE HEADER 7
    const tableTitleContainer7 = document.createElement('div');
    tableTitleContainer7.id = 'tableTitleContainer-g7';
    tableTitleContainer7.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer7); 

    // TITLE HEADER 8
    const tableTitleContainer8 = document.createElement('div');
    tableTitleContainer8.id = 'tableTitleContainer-g8';
    tableTitleContainer8.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer8); 

    // TITLE HEADER 9
    const tableTitleContainer9 = document.createElement('div');
    tableTitleContainer9.id = 'tableTitleContainer-g9';
    tableTitleContainer9.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer9); 

    // TITLE HEADER DESC 1
    const tableTitleContainer10 = document.createElement('div');
    tableTitleContainer10.id = 'tableTitleContainer-d1';
    tableTitleContainer10.innerHTML = "<h2>Previous Second Raw Moment (v<sub>t-1</sub>) </h2>"
    mainContentContainer.appendChild(tableTitleContainer10); 

    // TITLE HEADER DESC 3
    const tableTitleContainer12 = document.createElement('div');
    tableTitleContainer12.id = 'tableTitleContainer-d3';
    tableTitleContainer12.innerHTML = "<h2> Ans (β<sub>2</sub> ● v<sub>t-1</sub>) </h2>"
    mainContentContainer.appendChild(tableTitleContainer12);

    // TITLE HEADER DESC 4
    const tableTitleContainer13 = document.createElement('div');
    tableTitleContainer13.id = 'tableTitleContainer-d4';
    tableTitleContainer13.innerHTML = "<h2></h2>"
    mainContentContainer.appendChild(tableTitleContainer13);

    // TITLE HEADER DESC 5
    const tableTitleContainer14 = document.createElement('div');
    tableTitleContainer14.id = 'tableTitleContainer-d5';
    tableTitleContainer14.innerHTML = "<h2> \u00A0\u00A0\u00A0\u00A0\u00A0Beta2</h2>"
    mainContentContainer.appendChild(tableTitleContainer14);
}


function second_moment_d()
{
    setfooter( "second_moment_d" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += meta_lower()
    canv.innerHTML += meta_progress_bar()

    // set title
    canv.innerHTML += "<div style='height:10vh'/>"
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
    const my_tensor_data = adam_data["second_moment_calculations"]["prev_v_beta_2_products"]["param_1"];
    createTable(my_tensor_data, 'my-tensor-id', 'generic-table-class-grid', 'my-table-container-g1');

    // TABLE 2
    const my_tensor_data2 = adam_data["second_moment_calculations"]["prev_v_beta_2_products"]["param_2"];
    createTable(my_tensor_data2, 'my-tensor-id-2', 'generic-table-class-grid', 'my-table-container-g2');

    // TABLE 3
    const my_tensor_data3 = adam_data["second_moment_calculations"]["prev_v_beta_2_products"]["param_3"];
    const temp_tensor = my_tensor_data3.map((value) => [value]);
    createTable(temp_tensor, 'my-tensor-id-3', 'generic-table-class-grid', 'my-table-container-g3');

    // TABLE 4
    const my_tensor_data4 = adam_data["second_moment_calculations"]["grad_sq_beta_2_products"]["param_1"];
    createTable(my_tensor_data4, 'my-tensor-id-4', 'generic-table-class-grid', 'my-table-container-g4');

    // TABLE 5
    const my_tensor_data5 = adam_data["second_moment_calculations"]["grad_sq_beta_2_products"]["param_2"];
    createTable(my_tensor_data5, 'my-tensor-id-5', 'generic-table-class-grid', 'my-table-container-g5');

    // TABLE 6
    const my_tensor_data6 = adam_data["second_moment_calculations"]["grad_sq_beta_2_products"]["param_3"];
    const temp_tensor2 = my_tensor_data6.map((value) => [value]);
    createTable(temp_tensor2, 'my-tensor-id-6', 'generic-table-class-grid', 'my-table-container-g6');

    // TABLE 7
    const my_tensor_data7 = adam_data["gradient_states"]["second_moments_raw"]["param_1_v"];
    createTable(my_tensor_data7, 'my-tensor-id-7', 'generic-table-class-grid', 'my-table-container-g7');

    // TABLE 8
    const my_tensor_data8 = adam_data["gradient_states"]["second_moments_raw"]["param_2_v"];
    createTable(my_tensor_data8, 'my-tensor-id-8', 'generic-table-class-grid', 'my-table-container-g8');

    // TABLE 9
    const my_tensor_data9 = adam_data["gradient_states"]["second_moments_raw"]["param_3_v"];
    const temp_tensor3 = my_tensor_data9.map((value) => [value]);
    createTable(temp_tensor3, 'my-tensor-id-9', 'generic-table-class-grid', 'my-table-container-g9');

    // OPERATION 1
    const operationContainer1 = document.createElement('div');
    operationContainer1.id = 'operationContainer-g1';
    mainContentContainer.appendChild(operationContainer1);
    // create the svg element
    const svg = d3.select('#operationContainer-g1')
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
    .text('Plus')
    .attr('x', 50)
    .attr('y', 50)
    .attr('text-anchor', 'middle')
    .attr("font-size", "18px")
    .attr('dominant-baseline', 'middle')
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // OPERATION 2
    const operationContainer2 = document.createElement('div');
    operationContainer2.id = 'operationContainer-g3';
    mainContentContainer.appendChild(operationContainer2);
    // create svg element
    const svg2 = d3.select("#operationContainer-g3").append("svg")
    .attr("width", 100)
    .attr("height", 100);
    // create arrow path
    // const arrowPath = "M0,30 L70,30 L70,15 L100,50 L70,85 L70,70 L0,70 Z";
    const arrowPath = "M23,0 L23,70 L12,70 L50,100 L88,70 L77,70 L77,0 Z"
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
    .text(" ")
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // OPERATION 4 (DASHED LINE)
    const operationContainer4 = document.createElement('div');
    operationContainer4.id = 'operationContainer-g4';
    mainContentContainer.appendChild(operationContainer4);

    // TITLE HEADER 1
    const tableTitleContainer1 = document.createElement('div');
    tableTitleContainer1.id = 'tableTitleContainer-g1';
    tableTitleContainer1.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer1);

    // TITLE HEADER 2
    const tableTitleContainer2 = document.createElement('div');
    tableTitleContainer2.id = 'tableTitleContainer-g2';
    tableTitleContainer2.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer2);

    // TITLE HEADER 3
    const tableTitleContainer3 = document.createElement('div');
    tableTitleContainer3.id = 'tableTitleContainer-g3';
    tableTitleContainer3.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer3); 

    // TITLE HEADER 4
    const tableTitleContainer4 = document.createElement('div');
    tableTitleContainer4.id = 'tableTitleContainer-g4';
    tableTitleContainer4.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer4); 

    // TITLE HEADER 5
    const tableTitleContainer5 = document.createElement('div');
    tableTitleContainer5.id = 'tableTitleContainer-g5';
    tableTitleContainer5.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer5); 

    // TITLE HEADER 6
    const tableTitleContainer6 = document.createElement('div');
    tableTitleContainer6.id = 'tableTitleContainer-g6';
    tableTitleContainer6.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer6); 

    // TITLE HEADER 7
    const tableTitleContainer7 = document.createElement('div');
    tableTitleContainer7.id = 'tableTitleContainer-g7';
    tableTitleContainer7.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer7); 

    // TITLE HEADER 8
    const tableTitleContainer8 = document.createElement('div');
    tableTitleContainer8.id = 'tableTitleContainer-g8';
    tableTitleContainer8.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer8); 

    // TITLE HEADER 9
    const tableTitleContainer9 = document.createElement('div');
    tableTitleContainer9.id = 'tableTitleContainer-g9';
    tableTitleContainer9.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer9); 

    // TITLE HEADER DESC 1
    const tableTitleContainer10 = document.createElement('div');
    tableTitleContainer10.id = 'tableTitleContainer-d1';
    tableTitleContainer10.innerHTML = "<h2> Ans (β<sub>2</sub> ● v<sub>t-1</sub>) </h2>"
    mainContentContainer.appendChild(tableTitleContainer10); 

    // TITLE HEADER DESC 2
    const tableTitleContainer11 = document.createElement('div');
    tableTitleContainer11.id = 'tableTitleContainer-d2';
    tableTitleContainer11.innerHTML = "<h2> Ans ((1 - β<sub>2</sub>) ● g<sup>2</sup><sub>t</sub>) </h2>"
    mainContentContainer.appendChild(tableTitleContainer11); 

    // TITLE HEADER DESC 3
    const tableTitleContainer12 = document.createElement('div');
    tableTitleContainer12.id = 'tableTitleContainer-d3';
    tableTitleContainer12.innerHTML = "<h2>Updated Second Moment (v<sub>t</sub>)</h2>"
    mainContentContainer.appendChild(tableTitleContainer12); 
}


function bc_first_moment()
{
    setfooter( "bc_first_moment" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += meta_lower()
    canv.innerHTML += meta_progress_bar()

    // set title
    canv.innerHTML += "<div style='height:10vh'/>"
    canv.innerHTML += "<h3>Compute Bias-Corrected First Moment Estimate</h3>";

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
        let cells = d3.select(null);
        let formatted = '';

        if (tableId == "my-tensor-id-4") {
            cells = rows.selectAll('td')
            .data(d => d)
            .enter()
            .append('td')
            .text(d => {
                return ('\u00A0\u00A0' + d + '\u00A0\u00A0');
            });
        } else {
            cells = rows.selectAll('td')
            .data(d => d)
            .enter()
            .append('td')
            .text(d => {
                const formatted = d.toFixed(4);
                return (d >= 0 ? '\u00A0' : '') + formatted;
            });
        }
      
        // Add CSS classes to the table elements
        table.classed(tableClass, true);
        table.classed('my-table-class', true);
        cells.classed('my-cell-class', true);
    }

    // TABLE 1
    const my_tensor_data = adam_data["gradient_states"]["first_moments_raw"]["param_1_m"];
    createTable(my_tensor_data, 'my-tensor-id', 'generic-table-class-grid', 'my-table-container-g1');

    // TABLE 2
    const my_tensor_data2 = adam_data["gradient_states"]["first_moments_raw"]["param_2_m"];
    createTable(my_tensor_data2, 'my-tensor-id-2', 'generic-table-class-grid', 'my-table-container-g2');

    // TABLE 3
    const my_tensor_data3 = adam_data["gradient_states"]["first_moments_raw"]["param_3_m"];
    const temp_tensor = my_tensor_data3.map((value) => [value]);
    createTable(temp_tensor, 'my-tensor-id-3', 'generic-table-class-grid', 'my-table-container-g3');

    // TABLE 4
    const my_tensor_data4 = [[adam_data["adam_optim_hyperparams"]["beta_1"]]];
    createTable(my_tensor_data4, 'my-tensor-id-4', 'generic-table-class-grid', 'my-table-container-g4');

    // TABLE 7
    const my_tensor_data7 = adam_data["gradient_states"]["first_moments_bc"]["param_1_m_hat"];
    createTable(my_tensor_data7, 'my-tensor-id-7', 'generic-table-class-grid', 'my-table-container-g7');

    // TABLE 8
    const my_tensor_data8 = adam_data["gradient_states"]["first_moments_bc"]["param_2_m_hat"];
    createTable(my_tensor_data8, 'my-tensor-id-8', 'generic-table-class-grid', 'my-table-container-g8');

    // TABLE 9
    const my_tensor_data9 = adam_data["gradient_states"]["first_moments_bc"]["param_3_m_hat"];
    const temp_tensor3 = my_tensor_data9.map((value) => [value]);
    createTable(temp_tensor3, 'my-tensor-id-9', 'generic-table-class-grid', 'my-table-container-g9');

    // OPERATION 1
    const operationContainer1 = document.createElement('div');
    operationContainer1.id = 'operationContainer-g1';
    mainContentContainer.appendChild(operationContainer1);
    // create the svg element
    const svg = d3.select('#operationContainer-g1')
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
    .text('Divide')
    .attr('x', 50)
    .attr('y', 50)
    .attr('text-anchor', 'middle')
    .attr("font-size", "18px")
    .attr('dominant-baseline', 'middle')
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // OPERATION 2
    const operationContainer2 = document.createElement('div');
    operationContainer2.id = 'operationContainer-g3';
    mainContentContainer.appendChild(operationContainer2);
    // create svg element
    const svg2 = d3.select("#operationContainer-g3").append("svg")
    .attr("width", 100)
    .attr("height", 100);
    // create arrow path
    // const arrowPath = "M0,30 L70,30 L70,15 L100,50 L70,85 L70,70 L0,70 Z";
    const arrowPath = "M23,0 L23,70 L12,70 L50,100 L88,70 L77,70 L77,0 Z"
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
    .text(" ")
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // OPERATION 4 (DASHED LINE)
    const operationContainer4 = document.createElement('div');
    operationContainer4.id = 'operationContainer-g4';
    mainContentContainer.appendChild(operationContainer4);

    // TITLE HEADER 1
    const tableTitleContainer1 = document.createElement('div');
    tableTitleContainer1.id = 'tableTitleContainer-g1';
    tableTitleContainer1.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer1);

    // TITLE HEADER 2
    const tableTitleContainer2 = document.createElement('div');
    tableTitleContainer2.id = 'tableTitleContainer-g2';
    tableTitleContainer2.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer2);

    // TITLE HEADER 3
    const tableTitleContainer3 = document.createElement('div');
    tableTitleContainer3.id = 'tableTitleContainer-g3';
    tableTitleContainer3.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer3); 

    // TITLE HEADER 7
    const tableTitleContainer7 = document.createElement('div');
    tableTitleContainer7.id = 'tableTitleContainer-g7';
    tableTitleContainer7.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer7); 

    // TITLE HEADER 8
    const tableTitleContainer8 = document.createElement('div');
    tableTitleContainer8.id = 'tableTitleContainer-g8';
    tableTitleContainer8.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer8); 

    // TITLE HEADER 9
    const tableTitleContainer9 = document.createElement('div');
    tableTitleContainer9.id = 'tableTitleContainer-g9';
    tableTitleContainer9.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer9); 

    // TITLE HEADER DESC 1
    const tableTitleContainer10 = document.createElement('div');
    tableTitleContainer10.id = 'tableTitleContainer-d1';
    tableTitleContainer10.innerHTML = "<h2>Current First Moment (m)</h2>"
    mainContentContainer.appendChild(tableTitleContainer10); 

    // TITLE HEADER DESC 3
    const tableTitleContainer12 = document.createElement('div');
    tableTitleContainer12.id = 'tableTitleContainer-d3';
    tableTitleContainer12.innerHTML = "<h2>Bias Corrected First Moment (<span>m&#770;</span>) </h2>"
    mainContentContainer.appendChild(tableTitleContainer12);

    // TITLE HEADER DESC 4
    const tableTitleContainer13 = document.createElement('div');
    tableTitleContainer13.id = 'tableTitleContainer-d4';
    tableTitleContainer13.innerHTML = "<h2>(1 - </h2>"
    mainContentContainer.appendChild(tableTitleContainer13);

    // TITLE HEADER DESC 5
    const tableTitleContainer14 = document.createElement('div');
    tableTitleContainer14.id = 'tableTitleContainer-d5';
    tableTitleContainer14.innerHTML = "<h2>)\u00A0\u00A0\u00A0\u00A0\u00A0Beta1</h2>"
    mainContentContainer.appendChild(tableTitleContainer14);
}


function bc_second_moment()
{
    setfooter( "bc_second_moment" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += meta_lower()
    canv.innerHTML += meta_progress_bar()

    // set title
    canv.innerHTML += "<div style='height:10vh'/>"
    canv.innerHTML += "<h3>Compute Bias-Corrected Second Raw Moment Estimate</h3>";

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
        let cells = d3.select(null);
        let formatted = '';

        if (tableId == "my-tensor-id-4") {
            cells = rows.selectAll('td')
            .data(d => d)
            .enter()
            .append('td')
            .text(d => {
                return ('\u00A0\u00A0' + d + '\u00A0\u00A0');
            });
        } else {
            cells = rows.selectAll('td')
            .data(d => d)
            .enter()
            .append('td')
            .text(d => {
                const formatted = d.toFixed(4);
                return (d >= 0 ? '\u00A0' : '') + formatted;
            });
        }
      
        // Add CSS classes to the table elements
        table.classed(tableClass, true);
        table.classed('my-table-class', true);
        cells.classed('my-cell-class', true);
    }

    // TABLE 1
    const my_tensor_data = adam_data["gradient_states"]["second_moments_raw"]["param_1_v"];
    createTable(my_tensor_data, 'my-tensor-id', 'generic-table-class-grid', 'my-table-container-g1');

    // TABLE 2
    const my_tensor_data2 = adam_data["gradient_states"]["second_moments_raw"]["param_2_v"];
    createTable(my_tensor_data2, 'my-tensor-id-2', 'generic-table-class-grid', 'my-table-container-g2');

    // TABLE 3
    const my_tensor_data3 = adam_data["gradient_states"]["second_moments_raw"]["param_3_v"];
    const temp_tensor = my_tensor_data3.map((value) => [value]);
    createTable(temp_tensor, 'my-tensor-id-3', 'generic-table-class-grid', 'my-table-container-g3');

    // TABLE 4
    const my_tensor_data4 = [[adam_data["adam_optim_hyperparams"]["beta_2"]]];
    createTable(my_tensor_data4, 'my-tensor-id-4', 'generic-table-class-grid', 'my-table-container-g4');

    // TABLE 7
    const my_tensor_data7 = adam_data["gradient_states"]["second_moments_bc"]["param_1_v_hat"];
    createTable(my_tensor_data7, 'my-tensor-id-7', 'generic-table-class-grid', 'my-table-container-g7');

    // TABLE 8
    const my_tensor_data8 = adam_data["gradient_states"]["second_moments_bc"]["param_2_v_hat"];
    createTable(my_tensor_data8, 'my-tensor-id-8', 'generic-table-class-grid', 'my-table-container-g8');

    // TABLE 9
    const my_tensor_data9 = adam_data["gradient_states"]["second_moments_bc"]["param_3_v_hat"];
    const temp_tensor3 = my_tensor_data9.map((value) => [value]);
    createTable(temp_tensor3, 'my-tensor-id-9', 'generic-table-class-grid', 'my-table-container-g9');

    // OPERATION 1
    const operationContainer1 = document.createElement('div');
    operationContainer1.id = 'operationContainer-g1';
    mainContentContainer.appendChild(operationContainer1);
    // create the svg element
    const svg = d3.select('#operationContainer-g1')
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
    .text('Divide')
    .attr('x', 50)
    .attr('y', 50)
    .attr('text-anchor', 'middle')
    .attr("font-size", "18px")
    .attr('dominant-baseline', 'middle')
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // OPERATION 2
    const operationContainer2 = document.createElement('div');
    operationContainer2.id = 'operationContainer-g3';
    mainContentContainer.appendChild(operationContainer2);
    // create svg element
    const svg2 = d3.select("#operationContainer-g3").append("svg")
    .attr("width", 100)
    .attr("height", 100);
    // create arrow path
    // const arrowPath = "M0,30 L70,30 L70,15 L100,50 L70,85 L70,70 L0,70 Z";
    const arrowPath = "M23,0 L23,70 L12,70 L50,100 L88,70 L77,70 L77,0 Z"
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
    .text(" ")
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // OPERATION 4 (DASHED LINE)
    const operationContainer4 = document.createElement('div');
    operationContainer4.id = 'operationContainer-g4';
    mainContentContainer.appendChild(operationContainer4);

    // TITLE HEADER 1
    const tableTitleContainer1 = document.createElement('div');
    tableTitleContainer1.id = 'tableTitleContainer-g1';
    tableTitleContainer1.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer1);

    // TITLE HEADER 2
    const tableTitleContainer2 = document.createElement('div');
    tableTitleContainer2.id = 'tableTitleContainer-g2';
    tableTitleContainer2.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer2);

    // TITLE HEADER 3
    const tableTitleContainer3 = document.createElement('div');
    tableTitleContainer3.id = 'tableTitleContainer-g3';
    tableTitleContainer3.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer3); 

    // TITLE HEADER 7
    const tableTitleContainer7 = document.createElement('div');
    tableTitleContainer7.id = 'tableTitleContainer-g7';
    tableTitleContainer7.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer7); 

    // TITLE HEADER 8
    const tableTitleContainer8 = document.createElement('div');
    tableTitleContainer8.id = 'tableTitleContainer-g8';
    tableTitleContainer8.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer8); 

    // TITLE HEADER 9
    const tableTitleContainer9 = document.createElement('div');
    tableTitleContainer9.id = 'tableTitleContainer-g9';
    tableTitleContainer9.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer9); 

    // TITLE HEADER DESC 1
    const tableTitleContainer10 = document.createElement('div');
    tableTitleContainer10.id = 'tableTitleContainer-d1';
    tableTitleContainer10.innerHTML = "<h2>Current Second Moment (v)</h2>"
    mainContentContainer.appendChild(tableTitleContainer10); 

    // TITLE HEADER DESC 3
    const tableTitleContainer12 = document.createElement('div');
    tableTitleContainer12.id = 'tableTitleContainer-d3';
    tableTitleContainer12.innerHTML = "<h2>Bias Corrected Second Moment (<span>v&#770;</span>) </h2>"
    mainContentContainer.appendChild(tableTitleContainer12);

    // TITLE HEADER DESC 4
    const tableTitleContainer13 = document.createElement('div');
    tableTitleContainer13.id = 'tableTitleContainer-d4';
    tableTitleContainer13.innerHTML = "<h2>(1 - </h2>"
    mainContentContainer.appendChild(tableTitleContainer13);

    // TITLE HEADER DESC 5
    const tableTitleContainer14 = document.createElement('div');
    tableTitleContainer14.id = 'tableTitleContainer-d5';
    tableTitleContainer14.innerHTML = "<h2>)\u00A0\u00A0\u00A0\u00A0\u00A0Beta2</h2>"
    mainContentContainer.appendChild(tableTitleContainer14);
}


function update_params_a()
{
    setfooter( "update_params_a" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += meta_lower()
    canv.innerHTML += meta_progress_bar()

    // set title
    canv.innerHTML += "<div style='height:10vh'/>"
    canv.innerHTML += "<h3>Update Parameters With Adam: pt. 1/5</h3>";

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
    const my_tensor_data = adam_data["gradient_states"]["second_moments_bc"]["param_1_v_hat"];
    createTable(my_tensor_data, 'my-tensor-id', 'generic-table-class-grid', 'my-table-container-g1');

    // TABLE 2
    const my_tensor_data2 = adam_data["gradient_states"]["second_moments_bc"]["param_2_v_hat"];
    createTable(my_tensor_data2, 'my-tensor-id-2', 'generic-table-class-grid', 'my-table-container-g2');

    // TABLE 3
    const my_tensor_data3 = adam_data["gradient_states"]["second_moments_bc"]["param_3_v_hat"];
    const temp_tensor = my_tensor_data3.map((value) => [value]);
    createTable(temp_tensor, 'my-tensor-id-3', 'generic-table-class-grid', 'my-table-container-g3');

    // TABLE 7
    const my_tensor_data7 = adam_data["param_update_steps"]["sqrt_v_hat"]["param_1"];
    createTable(my_tensor_data7, 'my-tensor-id-7', 'generic-table-class-grid', 'my-table-container-g7');

    // TABLE 8
    const my_tensor_data8 = adam_data["param_update_steps"]["sqrt_v_hat"]["param_2"];
    createTable(my_tensor_data8, 'my-tensor-id-8', 'generic-table-class-grid', 'my-table-container-g8');

    // TABLE 9
    const my_tensor_data9 = adam_data["param_update_steps"]["sqrt_v_hat"]["param_3"];
    const temp_tensor3 = my_tensor_data9.map((value) => [value]);
    createTable(temp_tensor3, 'my-tensor-id-9', 'generic-table-class-grid', 'my-table-container-g9');


    // OPERATION 1
    const operationContainer2 = document.createElement('div');
    operationContainer2.id = 'operationContainer-g2';
    mainContentContainer.appendChild(operationContainer2);
    // create svg element
    const svg2 = d3.select("#operationContainer-g2").append("svg")
    .attr("width", 100)
    .attr("height", 100);
    // create arrow path
    // const arrowPath = "M0,30 L70,30 L70,15 L100,50 L70,85 L70,70 L0,70 Z";
    const arrowPath = "M23,0 L23,70 L12,70 L50,100 L88,70 L77,70 L77,0 Z"
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
    .text("Sqrt")
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // OPERATION 4 (DASHED LINE)
    const operationContainer4 = document.createElement('div');
    operationContainer4.id = 'operationContainer-g4';
    mainContentContainer.appendChild(operationContainer4);

    // TITLE HEADER 1
    const tableTitleContainer1 = document.createElement('div');
    tableTitleContainer1.id = 'tableTitleContainer-g1';
    tableTitleContainer1.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer1);

    // TITLE HEADER 2
    const tableTitleContainer2 = document.createElement('div');
    tableTitleContainer2.id = 'tableTitleContainer-g2';
    tableTitleContainer2.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer2);

    // TITLE HEADER 3
    const tableTitleContainer3 = document.createElement('div');
    tableTitleContainer3.id = 'tableTitleContainer-g3';
    tableTitleContainer3.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer3); 

    // TITLE HEADER 7
    const tableTitleContainer7 = document.createElement('div');
    tableTitleContainer7.id = 'tableTitleContainer-g7';
    tableTitleContainer7.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer7); 

    // TITLE HEADER 8
    const tableTitleContainer8 = document.createElement('div');
    tableTitleContainer8.id = 'tableTitleContainer-g8';
    tableTitleContainer8.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer8); 

    // TITLE HEADER 9
    const tableTitleContainer9 = document.createElement('div');
    tableTitleContainer9.id = 'tableTitleContainer-g9';
    tableTitleContainer9.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer9); 

    // TITLE HEADER DESC 1
    const tableTitleContainer10 = document.createElement('div');
    tableTitleContainer10.id = 'tableTitleContainer-d1';
    tableTitleContainer10.innerHTML = "<h2>Bias Corrected Second Moment (<span>v&#770;</span>)</h2>"
    mainContentContainer.appendChild(tableTitleContainer10); 

    // TITLE HEADER DESC 3
    const tableTitleContainer12 = document.createElement('div');
    tableTitleContainer12.id = 'tableTitleContainer-d3';
    tableTitleContainer12.innerHTML = "<h2>Bias Corrected Second Moment Square-Root (sqrt(<span>v&#770;</span><sub>t</sub>)) </h2>"
    mainContentContainer.appendChild(tableTitleContainer12); 
}


function update_params_b()
{
    setfooter( "update_params_b" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += meta_lower()
    canv.innerHTML += meta_progress_bar()

    // set title
    canv.innerHTML += "<div style='height:10vh'/>"
    canv.innerHTML += "<h3>Update Parameters With Adam: pt. 2/5</h3>";

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
        let cells = d3.select(null);
        let formatted = '';

        if (tableId == "my-tensor-id-4") {
            cells = rows.selectAll('td')
            .data(d => d)
            .enter()
            .append('td')
            .text(d => {
                return ('\u00A0\u00A0' + d + '\u00A0\u00A0');
            });
        } else {
            cells = rows.selectAll('td')
            .data(d => d)
            .enter()
            .append('td')
            .text(d => {
                const formatted = d.toFixed(4);
                return (d >= 0 ? '\u00A0' : '') + formatted;
            });
        }
      
        // Add CSS classes to the table elements
        table.classed(tableClass, true);
        table.classed('my-table-class', true);
        cells.classed('my-cell-class', true);
    }

    // TABLE 1
    const my_tensor_data = adam_data["param_update_steps"]["sqrt_v_hat"]["param_1"];
    createTable(my_tensor_data, 'my-tensor-id', 'generic-table-class-grid', 'my-table-container-g1');

    // TABLE 2
    const my_tensor_data2 = adam_data["param_update_steps"]["sqrt_v_hat"]["param_2"];
    createTable(my_tensor_data2, 'my-tensor-id-2', 'generic-table-class-grid', 'my-table-container-g2');

    // TABLE 3
    const my_tensor_data3 = adam_data["param_update_steps"]["sqrt_v_hat"]["param_3"];
    const temp_tensor = my_tensor_data3.map((value) => [value]);
    createTable(temp_tensor, 'my-tensor-id-3', 'generic-table-class-grid', 'my-table-container-g3');

    // TABLE 4
    const my_tensor_data4 = [[adam_data["adam_optim_hyperparams"]["eps"]]];
    createTable(my_tensor_data4, 'my-tensor-id-4', 'generic-table-class-grid', 'my-table-container-g4');

    // TABLE 7
    const my_tensor_data7 = adam_data["param_update_steps"]["ans_eps_sum"]["param_1"];
    createTable(my_tensor_data7, 'my-tensor-id-7', 'generic-table-class-grid', 'my-table-container-g7');

    // TABLE 8
    const my_tensor_data8 = adam_data["param_update_steps"]["ans_eps_sum"]["param_2"];
    createTable(my_tensor_data8, 'my-tensor-id-8', 'generic-table-class-grid', 'my-table-container-g8');

    // TABLE 9
    const my_tensor_data9 = adam_data["param_update_steps"]["ans_eps_sum"]["param_3"];
    const temp_tensor3 = my_tensor_data9.map((value) => [value]);
    createTable(temp_tensor3, 'my-tensor-id-9', 'generic-table-class-grid', 'my-table-container-g9');

    // OPERATION 1
    const operationContainer1 = document.createElement('div');
    operationContainer1.id = 'operationContainer-g1';
    mainContentContainer.appendChild(operationContainer1);
    // create the svg element
    const svg = d3.select('#operationContainer-g1')
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
    .text('Plus')
    .attr('x', 50)
    .attr('y', 50)
    .attr('text-anchor', 'middle')
    .attr("font-size", "18px")
    .attr('dominant-baseline', 'middle')
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // OPERATION 2
    const operationContainer2 = document.createElement('div');
    operationContainer2.id = 'operationContainer-g3';
    mainContentContainer.appendChild(operationContainer2);
    // create svg element
    const svg2 = d3.select("#operationContainer-g3").append("svg")
    .attr("width", 100)
    .attr("height", 100);
    // create arrow path
    // const arrowPath = "M0,30 L70,30 L70,15 L100,50 L70,85 L70,70 L0,70 Z";
    const arrowPath = "M23,0 L23,70 L12,70 L50,100 L88,70 L77,70 L77,0 Z"
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
    .text(" ")
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // OPERATION 4 (DASHED LINE)
    const operationContainer4 = document.createElement('div');
    operationContainer4.id = 'operationContainer-g4';
    mainContentContainer.appendChild(operationContainer4);

    // TITLE HEADER 1
    const tableTitleContainer1 = document.createElement('div');
    tableTitleContainer1.id = 'tableTitleContainer-g1';
    tableTitleContainer1.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer1);

    // TITLE HEADER 2
    const tableTitleContainer2 = document.createElement('div');
    tableTitleContainer2.id = 'tableTitleContainer-g2';
    tableTitleContainer2.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer2);

    // TITLE HEADER 3
    const tableTitleContainer3 = document.createElement('div');
    tableTitleContainer3.id = 'tableTitleContainer-g3';
    tableTitleContainer3.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer3); 

    // TITLE HEADER 7
    const tableTitleContainer7 = document.createElement('div');
    tableTitleContainer7.id = 'tableTitleContainer-g7';
    tableTitleContainer7.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer7); 

    // TITLE HEADER 8
    const tableTitleContainer8 = document.createElement('div');
    tableTitleContainer8.id = 'tableTitleContainer-g8';
    tableTitleContainer8.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer8); 

    // TITLE HEADER 9
    const tableTitleContainer9 = document.createElement('div');
    tableTitleContainer9.id = 'tableTitleContainer-g9';
    tableTitleContainer9.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer9); 

    // TITLE HEADER DESC 1
    const tableTitleContainer10 = document.createElement('div');
    tableTitleContainer10.id = 'tableTitleContainer-d1';
    tableTitleContainer10.innerHTML = "<h2> Ans (sqrt(<span>v&#770;</span><sub>t</sub>)) </h2>"
    mainContentContainer.appendChild(tableTitleContainer10); 

    // TITLE HEADER DESC 3
    const tableTitleContainer12 = document.createElement('div');
    tableTitleContainer12.id = 'tableTitleContainer-d3';
    tableTitleContainer12.innerHTML = "<h2> Ans (sqrt(<span>v&#770;</span><sub>t</sub>)+𝝐)</h2>"
    mainContentContainer.appendChild(tableTitleContainer12);

    // TITLE HEADER DESC 4
    const tableTitleContainer13 = document.createElement('div');
    tableTitleContainer13.id = 'tableTitleContainer-d4';
    tableTitleContainer13.innerHTML = "<h2> </h2>"
    mainContentContainer.appendChild(tableTitleContainer13);

    // TITLE HEADER DESC 5
    const tableTitleContainer14 = document.createElement('div');
    tableTitleContainer14.id = 'tableTitleContainer-d5';
    tableTitleContainer14.innerHTML = "<h2>\u00A0\u00A0\u00A0\u00A0\u00A0eps (𝝐)</h2>"
    mainContentContainer.appendChild(tableTitleContainer14);
}


function update_params_c()
{
    setfooter( "update_params_c" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += meta_lower()
    canv.innerHTML += meta_progress_bar()

    // set title
    canv.innerHTML += "<div style='height:10vh'/>"
    canv.innerHTML += "<h3>Update Parameters With Adam: pt. 3/5</h3>";

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
    const my_tensor_data = adam_data["gradient_states"]["first_moments_bc"]["param_1_m_hat"];
    createTable(my_tensor_data, 'my-tensor-id', 'generic-table-class-grid', 'my-table-container-g1');

    // TABLE 2
    const my_tensor_data2 = adam_data["gradient_states"]["first_moments_bc"]["param_2_m_hat"];
    createTable(my_tensor_data2, 'my-tensor-id-2', 'generic-table-class-grid', 'my-table-container-g2');

    // TABLE 3
    const my_tensor_data3 = adam_data["gradient_states"]["first_moments_bc"]["param_3_m_hat"];
    const temp_tensor = my_tensor_data3.map((value) => [value]);
    createTable(temp_tensor, 'my-tensor-id-3', 'generic-table-class-grid', 'my-table-container-g3');

    // TABLE 4
    const my_tensor_data4 = adam_data["param_update_steps"]["ans_eps_sum"]["param_1"];
    createTable(my_tensor_data4, 'my-tensor-id-4', 'generic-table-class-grid', 'my-table-container-g4');

    // TABLE 5
    const my_tensor_data5 = adam_data["param_update_steps"]["ans_eps_sum"]["param_2"];
    createTable(my_tensor_data5, 'my-tensor-id-5', 'generic-table-class-grid', 'my-table-container-g5');

    // TABLE 6
    const my_tensor_data6 = adam_data["param_update_steps"]["ans_eps_sum"]["param_3"];
    const temp_tensor2 = my_tensor_data6.map((value) => [value]);
    createTable(temp_tensor2, 'my-tensor-id-6', 'generic-table-class-grid', 'my-table-container-g6');

    // TABLE 7
    const my_tensor_data7 = adam_data["param_update_steps"]["m_hat_ans_quotient"]["param_1"];
    createTable(my_tensor_data7, 'my-tensor-id-7', 'generic-table-class-grid', 'my-table-container-g7');

    // TABLE 8
    const my_tensor_data8 = adam_data["param_update_steps"]["m_hat_ans_quotient"]["param_2"];
    createTable(my_tensor_data8, 'my-tensor-id-8', 'generic-table-class-grid', 'my-table-container-g8');

    // TABLE 9
    const my_tensor_data9 = adam_data["param_update_steps"]["m_hat_ans_quotient"]["param_3"];
    const temp_tensor3 = my_tensor_data9.map((value) => [value]);
    createTable(temp_tensor3, 'my-tensor-id-9', 'generic-table-class-grid', 'my-table-container-g9');

    // OPERATION 1
    const operationContainer1 = document.createElement('div');
    operationContainer1.id = 'operationContainer-g1';
    mainContentContainer.appendChild(operationContainer1);
    // create the svg element
    const svg = d3.select('#operationContainer-g1')
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
    .text('Divide')
    .attr('x', 50)
    .attr('y', 50)
    .attr('text-anchor', 'middle')
    .attr("font-size", "18px")
    .attr('dominant-baseline', 'middle')
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // OPERATION 2
    const operationContainer2 = document.createElement('div');
    operationContainer2.id = 'operationContainer-g3';
    mainContentContainer.appendChild(operationContainer2);
    // create svg element
    const svg2 = d3.select("#operationContainer-g3").append("svg")
    .attr("width", 100)
    .attr("height", 100);
    // create arrow path
    // const arrowPath = "M0,30 L70,30 L70,15 L100,50 L70,85 L70,70 L0,70 Z";
    const arrowPath = "M23,0 L23,70 L12,70 L50,100 L88,70 L77,70 L77,0 Z"
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
    .text(" ")
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // OPERATION 4 (DASHED LINE)
    const operationContainer4 = document.createElement('div');
    operationContainer4.id = 'operationContainer-g4';
    mainContentContainer.appendChild(operationContainer4);

    // TITLE HEADER 1
    const tableTitleContainer1 = document.createElement('div');
    tableTitleContainer1.id = 'tableTitleContainer-g1';
    tableTitleContainer1.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer1);

    // TITLE HEADER 2
    const tableTitleContainer2 = document.createElement('div');
    tableTitleContainer2.id = 'tableTitleContainer-g2';
    tableTitleContainer2.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer2);

    // TITLE HEADER 3
    const tableTitleContainer3 = document.createElement('div');
    tableTitleContainer3.id = 'tableTitleContainer-g3';
    tableTitleContainer3.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer3); 

    // TITLE HEADER 4
    const tableTitleContainer4 = document.createElement('div');
    tableTitleContainer4.id = 'tableTitleContainer-g4';
    tableTitleContainer4.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer4); 

    // TITLE HEADER 5
    const tableTitleContainer5 = document.createElement('div');
    tableTitleContainer5.id = 'tableTitleContainer-g5';
    tableTitleContainer5.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer5); 

    // TITLE HEADER 6
    const tableTitleContainer6 = document.createElement('div');
    tableTitleContainer6.id = 'tableTitleContainer-g6';
    tableTitleContainer6.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer6); 

    // TITLE HEADER 7
    const tableTitleContainer7 = document.createElement('div');
    tableTitleContainer7.id = 'tableTitleContainer-g7';
    tableTitleContainer7.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer7); 

    // TITLE HEADER 8
    const tableTitleContainer8 = document.createElement('div');
    tableTitleContainer8.id = 'tableTitleContainer-g8';
    tableTitleContainer8.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer8); 

    // TITLE HEADER 9
    const tableTitleContainer9 = document.createElement('div');
    tableTitleContainer9.id = 'tableTitleContainer-g9';
    tableTitleContainer9.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer9); 

    // TITLE HEADER DESC 1
    const tableTitleContainer10 = document.createElement('div');
    tableTitleContainer10.id = 'tableTitleContainer-d1';
    tableTitleContainer10.innerHTML = "<h2>Current First Moments (<span>m&#770;</span>)</h2>"
    mainContentContainer.appendChild(tableTitleContainer10); 

    // TITLE HEADER DESC 2
    const tableTitleContainer11 = document.createElement('div');
    tableTitleContainer11.id = 'tableTitleContainer-d2';
    tableTitleContainer11.innerHTML = "<h2> Ans (sqrt(<span>v&#770;</span><sub>t</sub>)+𝝐) </h2>"
    mainContentContainer.appendChild(tableTitleContainer11); 

    // TITLE HEADER DESC 3
    const tableTitleContainer12 = document.createElement('div');
    tableTitleContainer12.id = 'tableTitleContainer-d3';
    //tableTitleContainer12.innerHTML = "<h2>[ <span>m&#770;</span> / sqrt(<span>v&#770;</span>) + eps ] Ans</h2>"
    tableTitleContainer12.innerHTML = "<h2> Ans (<span>m&#770;</span><sub>t</sub>/(sqrt(<span>v&#770;</span><sub>t</sub>)+𝝐)))</h2>"
    mainContentContainer.appendChild(tableTitleContainer12); 
}


function update_params_d()
{
    setfooter( "update_params_d" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += meta_lower()
    canv.innerHTML += meta_progress_bar()

    // set title
    canv.innerHTML += "<div style='height:10vh'/>"
    canv.innerHTML += "<h3>Update Parameters With Adam: pt. 4/5</h3>";

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
        let cells = d3.select(null);
        let formatted = '';

        if (tableId == "my-tensor-id-4") {
            cells = rows.selectAll('td')
            .data(d => d)
            .enter()
            .append('td')
            .text(d => {
                return ('\u00A0\u00A0' + d + '\u00A0\u00A0');
            });
        } else {
            cells = rows.selectAll('td')
            .data(d => d)
            .enter()
            .append('td')
            .text(d => {
                const formatted = d.toFixed(4);
                return (d >= 0 ? '\u00A0' : '') + formatted;
            });
        }
      
        // Add CSS classes to the table elements
        table.classed(tableClass, true);
        table.classed('my-table-class', true);
        cells.classed('my-cell-class', true);
    }

    // TABLE 1
    const my_tensor_data = adam_data["param_update_steps"]["m_hat_ans_quotient"]["param_1"];
    createTable(my_tensor_data, 'my-tensor-id', 'generic-table-class-grid', 'my-table-container-g1');

    // TABLE 2
    const my_tensor_data2 = adam_data["param_update_steps"]["m_hat_ans_quotient"]["param_2"];
    createTable(my_tensor_data2, 'my-tensor-id-2', 'generic-table-class-grid', 'my-table-container-g2');

    // TABLE 3
    const my_tensor_data3 = adam_data["param_update_steps"]["m_hat_ans_quotient"]["param_3"];
    const temp_tensor = my_tensor_data3.map((value) => [value]);
    createTable(temp_tensor, 'my-tensor-id-3', 'generic-table-class-grid', 'my-table-container-g3');

    // TABLE 4
    const my_tensor_data4 = [[adam_data["adam_optim_hyperparams"]["learning_rate"]]];
    createTable(my_tensor_data4, 'my-tensor-id-4', 'generic-table-class-grid', 'my-table-container-g4');

    // TABLE 7
    const my_tensor_data7 = adam_data["param_update_steps"]["alpha_ans_product"]["param_1"];
    createTable(my_tensor_data7, 'my-tensor-id-7', 'generic-table-class-grid', 'my-table-container-g7');

    // TABLE 8
    const my_tensor_data8 = adam_data["param_update_steps"]["alpha_ans_product"]["param_2"];
    createTable(my_tensor_data8, 'my-tensor-id-8', 'generic-table-class-grid', 'my-table-container-g8');

    // TABLE 9
    const my_tensor_data9 = adam_data["param_update_steps"]["alpha_ans_product"]["param_3"];
    const temp_tensor3 = my_tensor_data9.map((value) => [value]);
    createTable(temp_tensor3, 'my-tensor-id-9', 'generic-table-class-grid', 'my-table-container-g9');

    // OPERATION 1
    const operationContainer1 = document.createElement('div');
    operationContainer1.id = 'operationContainer-g1';
    mainContentContainer.appendChild(operationContainer1);
    // create the svg element
    const svg = d3.select('#operationContainer-g1')
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

    // OPERATION 2
    const operationContainer2 = document.createElement('div');
    operationContainer2.id = 'operationContainer-g3';
    mainContentContainer.appendChild(operationContainer2);
    // create svg element
    const svg2 = d3.select("#operationContainer-g3").append("svg")
    .attr("width", 100)
    .attr("height", 100);
    // create arrow path
    // const arrowPath = "M0,30 L70,30 L70,15 L100,50 L70,85 L70,70 L0,70 Z";
    const arrowPath = "M23,0 L23,70 L12,70 L50,100 L88,70 L77,70 L77,0 Z"
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
    .text(" ")
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // OPERATION 4 (DASHED LINE)
    const operationContainer4 = document.createElement('div');
    operationContainer4.id = 'operationContainer-g4';
    mainContentContainer.appendChild(operationContainer4);

    // TITLE HEADER 1
    const tableTitleContainer1 = document.createElement('div');
    tableTitleContainer1.id = 'tableTitleContainer-g1';
    tableTitleContainer1.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer1);

    // TITLE HEADER 2
    const tableTitleContainer2 = document.createElement('div');
    tableTitleContainer2.id = 'tableTitleContainer-g2';
    tableTitleContainer2.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer2);

    // TITLE HEADER 3
    const tableTitleContainer3 = document.createElement('div');
    tableTitleContainer3.id = 'tableTitleContainer-g3';
    tableTitleContainer3.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer3); 

    // TITLE HEADER 7
    const tableTitleContainer7 = document.createElement('div');
    tableTitleContainer7.id = 'tableTitleContainer-g7';
    tableTitleContainer7.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer7); 

    // TITLE HEADER 8
    const tableTitleContainer8 = document.createElement('div');
    tableTitleContainer8.id = 'tableTitleContainer-g8';
    tableTitleContainer8.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer8); 

    // TITLE HEADER 9
    const tableTitleContainer9 = document.createElement('div');
    tableTitleContainer9.id = 'tableTitleContainer-g9';
    tableTitleContainer9.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer9); 

    // TITLE HEADER DESC 1
    const tableTitleContainer10 = document.createElement('div');
    tableTitleContainer10.id = 'tableTitleContainer-d1';
    tableTitleContainer10.innerHTML = "<h2> Ans (<span>m&#770;</span><sub>t</sub>/(sqrt(<span>v&#770;</span><sub>t</sub>)+𝝐))) </h2>"
    mainContentContainer.appendChild(tableTitleContainer10); 

    // TITLE HEADER DESC 3
    const tableTitleContainer12 = document.createElement('div');
    tableTitleContainer12.id = 'tableTitleContainer-d3';
    tableTitleContainer12.innerHTML = "<h2> Update Step (-𝞪●<span>m&#770;</span><sub>t</sub>/(sqrt(<span>v&#770;</span><sub>t</sub>)+𝝐)) </h2>"
    mainContentContainer.appendChild(tableTitleContainer12);

    // TITLE HEADER DESC 4
    const tableTitleContainer13 = document.createElement('div');
    tableTitleContainer13.id = 'tableTitleContainer-d4';
    tableTitleContainer13.innerHTML = "<h2> </h2>"
    mainContentContainer.appendChild(tableTitleContainer13);

    // TITLE HEADER DESC 5
    const tableTitleContainer14 = document.createElement('div');
    tableTitleContainer14.id = 'tableTitleContainer-d5';
    tableTitleContainer14.innerHTML = "<h2> \u00A0\u00A0\u00A0\u00A0\u00A0Learning Rate (𝞪)</h2>"
    mainContentContainer.appendChild(tableTitleContainer14);
}


function update_params_e()
{
    setfooter( "update_params_e" ); 
    setsidebar( "default" );
    canv.innerHTML  = meta();
    canv.innerHTML += meta_lower()
    canv.innerHTML += meta_progress_bar()

    // set title
    canv.innerHTML += "<div style='height:10vh'/>"
    canv.innerHTML += "<h3>Update Parameters With Adam: pt. 5/5</h3>";

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
    createTable(my_tensor_data, 'my-tensor-id', 'generic-table-class-grid', 'my-table-container-g1');

    // TABLE 2
    const my_tensor_data2 = adam_data["curr_model_params"]["param_2"];
    createTable(my_tensor_data2, 'my-tensor-id-2', 'generic-table-class-grid', 'my-table-container-g2');

    // TABLE 3
    const my_tensor_data3 = adam_data["curr_model_params"]["param_3"];
    const temp_tensor = my_tensor_data3.map((value) => [value]);
    createTable(temp_tensor, 'my-tensor-id-3', 'generic-table-class-grid', 'my-table-container-g3');

    // TABLE 4
    const my_tensor_data4 = adam_data["param_update_steps"]["alpha_ans_product"]["param_1"];
    createTable(my_tensor_data4, 'my-tensor-id-4', 'generic-table-class-grid', 'my-table-container-g4');

    // TABLE 5
    const my_tensor_data5 = adam_data["param_update_steps"]["alpha_ans_product"]["param_2"];
    createTable(my_tensor_data5, 'my-tensor-id-5', 'generic-table-class-grid', 'my-table-container-g5');

    // TABLE 6
    const my_tensor_data6 = adam_data["param_update_steps"]["alpha_ans_product"]["param_3"];
    const temp_tensor2 = my_tensor_data6.map((value) => [value]);
    createTable(temp_tensor2, 'my-tensor-id-6', 'generic-table-class-grid', 'my-table-container-g6');

    // TABLE 7
    const my_tensor_data7 = adam_data["param_update_steps"]["updated_params"]["param_1"];
    createTable(my_tensor_data7, 'my-tensor-id-7', 'generic-table-class-grid', 'my-table-container-g7');

    // TABLE 8
    const my_tensor_data8 = adam_data["param_update_steps"]["updated_params"]["param_2"];
    createTable(my_tensor_data8, 'my-tensor-id-8', 'generic-table-class-grid', 'my-table-container-g8');

    // TABLE 9
    const my_tensor_data9 = adam_data["param_update_steps"]["updated_params"]["param_3"];
    const temp_tensor3 = my_tensor_data9.map((value) => [value]);
    createTable(temp_tensor3, 'my-tensor-id-9', 'generic-table-class-grid', 'my-table-container-g9');

    // OPERATION 1
    const operationContainer1 = document.createElement('div');
    operationContainer1.id = 'operationContainer-g1';
    mainContentContainer.appendChild(operationContainer1);
    // create the svg element
    const svg = d3.select('#operationContainer-g1')
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
    .text('Subtract')
    .attr('x', 50)
    .attr('y', 50)
    .attr('text-anchor', 'middle')
    .attr("font-size", "18px")
    .attr('dominant-baseline', 'middle')
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // OPERATION 2
    const operationContainer2 = document.createElement('div');
    operationContainer2.id = 'operationContainer-g3';
    mainContentContainer.appendChild(operationContainer2);
    // create svg element
    const svg2 = d3.select("#operationContainer-g3").append("svg")
    .attr("width", 100)
    .attr("height", 100);
    // create arrow path
    // const arrowPath = "M0,30 L70,30 L70,15 L100,50 L70,85 L70,70 L0,70 Z";
    const arrowPath = "M23,0 L23,70 L12,70 L50,100 L88,70 L77,70 L77,0 Z"
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
    .text(" ")
    .attr('font-family', 'Segoe UI')
    .attr('fill', 'white');

    // OPERATION 4 (DASHED LINE)
    const operationContainer4 = document.createElement('div');
    operationContainer4.id = 'operationContainer-g4';
    mainContentContainer.appendChild(operationContainer4);

    // TITLE HEADER 1
    const tableTitleContainer1 = document.createElement('div');
    tableTitleContainer1.id = 'tableTitleContainer-g1';
    tableTitleContainer1.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer1);

    // TITLE HEADER 2
    const tableTitleContainer2 = document.createElement('div');
    tableTitleContainer2.id = 'tableTitleContainer-g2';
    tableTitleContainer2.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer2);

    // TITLE HEADER 3
    const tableTitleContainer3 = document.createElement('div');
    tableTitleContainer3.id = 'tableTitleContainer-g3';
    tableTitleContainer3.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer3); 

    // TITLE HEADER 4
    const tableTitleContainer4 = document.createElement('div');
    tableTitleContainer4.id = 'tableTitleContainer-g4';
    tableTitleContainer4.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer4); 

    // TITLE HEADER 5
    const tableTitleContainer5 = document.createElement('div');
    tableTitleContainer5.id = 'tableTitleContainer-g5';
    tableTitleContainer5.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer5); 

    // TITLE HEADER 6
    const tableTitleContainer6 = document.createElement('div');
    tableTitleContainer6.id = 'tableTitleContainer-g6';
    tableTitleContainer6.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer6); 

    // TITLE HEADER 7
    const tableTitleContainer7 = document.createElement('div');
    tableTitleContainer7.id = 'tableTitleContainer-g7';
    tableTitleContainer7.innerHTML = "<h2>w.r.t.</h2><h2>Param 1</h2>"
    mainContentContainer.appendChild(tableTitleContainer7); 

    // TITLE HEADER 8
    const tableTitleContainer8 = document.createElement('div');
    tableTitleContainer8.id = 'tableTitleContainer-g8';
    tableTitleContainer8.innerHTML = "<h2>w.r.t.</h2><h2>Param 2</h2>"
    mainContentContainer.appendChild(tableTitleContainer8); 

    // TITLE HEADER 9
    const tableTitleContainer9 = document.createElement('div');
    tableTitleContainer9.id = 'tableTitleContainer-g9';
    tableTitleContainer9.innerHTML = "<h2>w.r.t.</h2><h2>Param 3</h2>"
    mainContentContainer.appendChild(tableTitleContainer9); 

    // TITLE HEADER DESC 1
    const tableTitleContainer10 = document.createElement('div');
    tableTitleContainer10.id = 'tableTitleContainer-d1';
    tableTitleContainer10.innerHTML = "<h2>Current Model Parameters (θ<sub>t-1</sub>) </h2>"
    mainContentContainer.appendChild(tableTitleContainer10); 

    // TITLE HEADER DESC 2
    const tableTitleContainer11 = document.createElement('div');
    tableTitleContainer11.id = 'tableTitleContainer-d2';
    tableTitleContainer11.innerHTML = "<h2> Update Step (-𝞪●<span>m&#770;</span><sub>t</sub>/(sqrt(<span>v&#770;</span><sub>t</sub>)+𝝐)) </h2>"
    mainContentContainer.appendChild(tableTitleContainer11); 

    // TITLE HEADER DESC 3
    const tableTitleContainer12 = document.createElement('div');
    tableTitleContainer12.id = 'tableTitleContainer-d3';
    tableTitleContainer12.innerHTML = "<h2>Updated Model Parameters (θ<sub>t</sub>) </h2>"
    mainContentContainer.appendChild(tableTitleContainer12); 

}


// Create new div elements for the three sections of the footer
const footer_desc = document.createElement("div");
footer_desc.classList.add("footer_adam_desc");

const footer_eq_container = document.createElement("div");
footer_eq_container.classList.add("footer_adam_eq_container");

const footer_eq_title = document.createElement("div");
footer_eq_title.classList.add("footer_adam_eq_title");

const footer_eq = document.createElement("div");
footer_eq.classList.add("footer_adam_eq");

// Append the three sections to the footer element
footer.appendChild(footer_desc);
footer.appendChild(footer_eq_container);
footer_eq_container.appendChild(footer_eq_title);
footer_eq_container.appendChild(footer_eq);


function setfooter( input ) // takes input from event listener and then 
{
    switch( input ) {
        case "default": footer.innerHTML = "<h2>sample footer</h2>"; break;
        // SLIDE DESCRIPTIONS
        case "intro":                   footer_desc.innerHTML = "Perform a new optimization step with the Adam Optimization Method. An optimization step can be generally broken into the (5) following parts: <ol><li>Perform a forward pass in the model with inputs</li><li>Compute the loss at the specific iteration on outputs</li><li>Get the gradients of loss function with respect to the parameters</li><li>Compute the first and second moment estimates of the gradients</li><li>Perform an update on the model parameters</li></ol>";
                                        footer_eq_title.innerHTML = "";
                                        footer_eq.innerHTML = "";
                                        break;
        case "cbow_contexts":           footer_desc.innerHTML = "Perform a forward pass in the model. Performing an optimization step is dependant on the loss implementation and in turn is also dependant on the specific model being implemented. <span style='font-weight: bold'>In this simulation we perform a forward pass in a CBOW model.</span> This begins by taking the embeddings of the contexts and creating a single context vector.";
                                        footer_eq_title.innerHTML = "<h2> Generate Contexts: </h2>";
                                        footer_eq.innerHTML = "<h2> contexts-vector = <span style='color: #32cd32'>contexts</span><span style='color: rgb(0, 140, 255)'> ● embeddings</span></h2>";
                                        break;
        case "cbow_linear_dot_prod":    footer_desc.innerHTML = "Pass the context vector obtained in the previous step through the linear layer. In the first part of the Linear transformation take the <span style='font-weight: bold'>dot product</span> of the <span style='font-weight: bold'>model input</span> (context vector) with the <span style='font-weight: bold'>model weights</span> (param-2)";
                                        footer_eq_title.innerHTML = "<h2> Linear Pass: </h2>";
                                        footer_eq.innerHTML = "<h2> output = <span style='color: #32cd32'>weights</span><span style='color: rgb(0, 140, 255)'> ● input</span> + bias </h2>";
                                        break;
        case "cbow_linear_bias_sum":    footer_desc.innerHTML = "Continue through the linear layer. In the second part of the Linear transformation take the <span style='font-weight: bold'>sum</span> of the <span style='font-weight: bold'>product</span> computed in the previous step with the <span style='font-weight: bold'>model bias</span> (param-3). ";
                                        footer_eq_title.innerHTML = "<h2> Linear Pass: </h2>";
                                        footer_eq.innerHTML = "<h2> output = <span style='color: #32cd32'>weights ● input </span><span style='color: rgb(0, 140, 255)'>+ bias</span> </h2>";
                                        break;
        case "nll_loss_softmax":        footer_desc.innerHTML = "Apply the activation function to the result of the linear-transform performed in the previous step. <span style='font-weight: bold'>In this simulation we will use negative log-likelihood loss (NLL-Loss).</span> The first part of NLL-Loss is to <span style='font-weight: bold'>perform a softmax transform per row</span>. This normalizes each row to have values within the range (0,1) to preserves the ratios of magnitude of values within a column. The result can now be interpreted as probabilities that sum up to 1.";
                                        footer_eq_title.innerHTML = "<h2> NLL-Loss: </h2>";
                                        footer_eq.innerHTML = "<h2> loss = log ( <span style='color: rgb(0, 140, 255)'>softmax ( <span style='color: #32cd32'>input</span> )</span> ) </h2>";
                                        break;    
        case "nll_loss_log":            footer_desc.innerHTML = "Continue applying the activation function to the result of the previous step. The second part of NLL-Loss is to <span style='font-weight: bold'>compute the log of each probability on a value by value basis.</span> The resulting loss vector measures the negative log-probabilities of the target word for each training example, and can be interpreted as a measure of the dissimilarity between the predicted distribution and the true distribution of the target word. Minimizing the NLL loss corresponds to maximizing the likelihood of the observed data under the model.";
                                        footer_eq_title.innerHTML = "<h2> NLL-Loss: </h2>";
                                        footer_eq.innerHTML = "<h2> loss = <span style='color: #32cd32'>log ( <span style='color: rgb(0, 140, 255)'>softmax ( input )</span> )</span> </h2>";
                                        break;      
        case "nll_loss_epoch_avg":      footer_desc.innerHTML = "Take the horizontal average of our loss vector obtained in the previous step. Then obtain the loss value at the position of the current center by taking the dot product of the average vector and the center one-hot vector. <span style='font-weight: bold'>This scalar loss value is used as a general measure of the loss at the current iteration of the training, and can be used to indicator for model training performance.</span> Note that the full model loss vector computed in the previous step will be used in the optimization step.";
                                        footer_eq_title.innerHTML = "<h2> Iteration Loss: </h2>";
                                        footer_eq.innerHTML = "<h2> loss-scalar =  <span style='color: #32cd32'>-avg ( <span style='color: rgb(0, 140, 255)'>loss</span> ) ● center</span> </h2>";
                                        break;         
        case "gradients":               footer_desc.innerHTML = "Obtain the gradient of the loss function w.r.t. the model parameters at the current timestep (t) using backpropagation. The chain rule of differentiation is used during backpropagation to calculate the gradients of the loss function for each parameter, starting from the output layer and working backward towards the input layer. The loss function in this simulation is the negative log probability of the target word given the context words. <span style='font-weight: bold'>The resulting gradient vector (g<sub>t</sub>) consists of partial derivatives of the loss function for each parameter.</span> The gradient vector indicates the direction of the steepest descent of the loss function for the model parameters and guides towards a set of parameters that minimizes the loss.";
                                        footer_eq_title.innerHTML = "<h2> Get Gradients: </h2>";
                                        footer_eq.innerHTML = "<h2> <span style='color: rgb(0, 140, 255)'>g<sub>t</sub></span> <span style='color: #32cd32'>← ∇θ ƒ<sub>t</sub> (θ<sub>t-1</sub>)</span> </h2>";
                                        break;    
        case "first_moment_a":          footer_desc.innerHTML = "Update the biased first moment estimate (m<sub>t</sub>). The biased first moment estimate vector is set to zero prior to updating. First, <span style='font-weight: bold'>the current gradient (g<sub>t</sub>) is scaled by the complementary factor (1 - β<sub>1</sub>), which determines how much weight to give to the new information.</span> Beta1 (β<sub>1</sub>) is a hyperparameter that controls the influence of the previous estimate on the current estimate, and is set to 0.9 in this simulation.";
                                        footer_eq_title.innerHTML = "<h2> Biased First Moment Estimate: </h2>";
                                        footer_eq.innerHTML = "<h2> m<sub>t</sub> ← β<sub>1</sub> ● m<sub>t-1</sub> + <span style='color: #32cd32'>(1 - β<sub>1</sub>)</span> <span style='color: rgb(0, 140, 255)'>● g<sub>t</sub></span> </h2>";
                                        break;     
        case "first_moment_b":          footer_desc.innerHTML = "Continue update on the biased first moment estimate (m<sub>t</sub>). Next, <span style='font-weight: bold'>the previous estimate (m<sub>t-1</sub>) is scaled by the hyperparameter Beta1(β<sub>1</sub>)</span>, which determines how much weight to give to the past estimate.";
                                        footer_eq_title.innerHTML = "<h2> Biased First Moment Estimate: </h2>";
                                        footer_eq.innerHTML = "<h2> m<sub>t</sub> ← <span style='color: #32cd32'>β<sub>1</sub></span> <span style='color: rgb(0, 140, 255)'>● m<sub>t-1</sub></span> + (1 - β<sub>1</sub>) ● g<sub>t</sub> </h2>";
                                        break;  
        case "first_moment_c":          footer_desc.innerHTML = "Continue update on the biased first moment estimate (m<sub>t</sub>). Finally, <span style='font-weight: bold'>sum both intermediate products calculated in pt.(1) and pt.(2)</span>. This <span style='font-weight: bold'>yields the updated estimate of the biased first moment vector</span> which will be later used to adjust the learning rate for each parameter during the optimization process. By taking into account the history of gradients, Adam optimization can adaptively adjust the learning rate for each parameter and converge more quickly to the optimal solution.";
                                        footer_eq_title.innerHTML = "<h2> Biased First Moment Estimate: </h2>";
                                        footer_eq.innerHTML = "<h2> m<sub>t</sub> ← <span style='color: #32cd32'>β<sub>1</sub> ● m<sub>t-1</sub></span> <span style='color: rgb(0, 140, 255)'>+ (1 - β<sub>1</sub>) ● g<sub>t</sub></span> </h2>";
                                        break;  
        case "second_moment_a":         footer_desc.innerHTML = "Update the biased second raw moment estimate (v<sub>t</sub>). The biased second raw moment estimate vector is set to zero prior to updating. First, <span style='font-weight: bold'>calculate the square of the current gradient (g<sup>2</sup><sub>t</sub>) by squaring the current gradient (g<sub>t</sub>).</span>";
                                        footer_eq_title.innerHTML = "<h2> Biased Second Raw Moment Estimate: </h2>";
                                        footer_eq.innerHTML = "<h2> v<sub>t</sub> ← β<sub>2</sub> ● v<sub>t-1</sub> + (1 - β<sub>2</sub>) ● <span style='color: #32cd32'>g<sup><span style='color: rgb(0, 140, 255)'>2</span></sup><sub>t</sub></span> </h2>";
                                        break;  
        case "second_moment_b":         footer_desc.innerHTML = "Continue update on the biased second raw moment estimate (v<sub>t</sub>). Next, <span style='font-weight: bold'>the square of the current gradient (g<sup>2</sup><sub>t</sub>) is scaled by the complementary factor (1 -  β<sub>2</sub>)</span>, which determines how much weight to give to the new information. Beta2 (β<sub>2</sub>) is a hyperparameter that controls the influence of the previous estimate on the current estimate, and is set to 0.999 in this simulation.";
                                        footer_eq_title.innerHTML = "<h2> Biased Second Raw Moment Estimate: </h2>";
                                        footer_eq.innerHTML = "<h2> v<sub>t</sub> ← β<sub>2</sub> ● v<sub>t-1</sub> + <span style='color: #32cd32'>(1 - β<sub>2</sub>)</span> <span style='color: rgb(0, 140, 255)'>● g<sup>2</sup><sub>t</sub></span> </h2>";
                                        break;  
        case "second_moment_c":         footer_desc.innerHTML = "Continue update on the biased second raw moment estimate (v<sub>t</sub>). Next, <span style='font-weight: bold'>the previous estimate is scaled by the hyperparameter Beta2 (β<sub>2</sub>)</span>, which determines how much weight to give to the past estimate.";
                                        footer_eq_title.innerHTML = "<h2> Biased Second Raw Moment Estimate: </h2>";
                                        footer_eq.innerHTML = "<h2> v<sub>t</sub> ← <span style='color: #32cd32'>β<sub>2</sub></span> <span style='color: rgb(0, 140, 255)'>● v<sub>t-1</sub></span> + (1 - β<sub>2</sub>) ● g<sup>2</sup><sub>t</sub> </h2>";
                                        break;  
        case "second_moment_d":         footer_desc.innerHTML = "Continue update on the biased second raw moment estimate (v<sub>t</sub>). Finally, <span style='font-weight: bold'>sum both intermediate products calculated in pt.(2) and pt.(3)</span>. This <span style='font-weight: bold'>yields the updated estimate of the biased second raw moment vector</span> which will be later used to adjust the learning rate for each parameter during the optimization process. By taking into account the history of squared gradients, Adam optimization can adaptively adjust the learning rate for each parameter and converge more quickly to the optimal solution.";
                                        footer_eq_title.innerHTML = "<h2> Biased Second Raw Moment Estimate: </h2>";
                                        footer_eq.innerHTML = "<h2> v<sub>t</sub> ← <span style='color: #32cd32'>β<sub>2</sub> ● v<sub>t-1</sub></span> <span style='color: rgb(0, 140, 255)'>+ (1 - β<sub>2</sub>) ● g<sup>2</sup><sub>t</sub></span> </h2>";
                                        break;  
        case "bc_first_moment":         footer_desc.innerHTML = "Compute the bias-corrected first moment estimate (<span>m&#770;</span><sub>t</sub>). <span style='font-weight: bold'>Take the previously updated biased first moment estimate (m<sub>t</sub>), and divide it by the bias correction factor (1 - Beta1 ** t).</span> Where Beta1 (β<sub>1</sub>) is the hyperparameter that controls the influence of the past estimates on the current estimate, and time-step (t) is current iteration count. This corrects the bias introduced when initializing (m<sub>t</sub>) to a zero vector, where the first moment estimate is biased towards 0 and the performance of convergence can be hindered.";
                                        footer_eq_title.innerHTML = "<h2> Bias-Corrected First Moment Estimate: </h2>";
                                        footer_eq.innerHTML = "<h2> <span>m&#770;</span><sub>t</sub> ← <span style='color: #32cd32'>m<sub>t</sub></spam> <span style='color: rgb(0, 140, 255)'>/ (1 - β<sup>t</sup><sub>1</sub>)</span> </h2>";
                                        break;          
        case "bc_second_moment":        footer_desc.innerHTML = "Compute the bias-corrected first moment estimate (<span>v&#770;</span><sub>t</sub>). <span style='font-weight: bold'>Take the previously updated biased first moment estimate (v<sub>t</sub>), and divide it by the bias correction factor (1 - Beta2 ** t).</span> Where Beta2 (β<sub>2</sub>) is the hyperparameter that controls the influence of the past estimates on the current estimate, and time-step (t) is current iteration count. This corrects the bias introduced when initializing (v<sub>t</sub>) to a zero vector, where the first moment estimate is biased towards 0 and the performance of convergence can be hindered.";
                                        footer_eq_title.innerHTML = "<h2> Bias-Corrected Second Raw Moment Estimate: </h2>";
                                        footer_eq.innerHTML = "<h2> <span>v&#770;</span><sub>t</sub> ← <span style='color: #32cd32'>v<sub>t</sub></spam> <span style='color: rgb(0, 140, 255)'>/ (1 - β<sup>t</sup><sub>2</sub>)</span> </h2>";
                                        break;     
        case "update_params_a":         footer_desc.innerHTML = "Update the parameters (θ<sub>t</sub>). First, <span style='font-weight: bold'>take the square root of the previously computed bias-corrected second raw moment estimate (<span>v&#770;</span><sub>t</sub>).</span> The denominator is effectively a measure of the variance of the gradient. If the variance is large, a smaller updates occurs. Conversely, If the variance is small, a larger updates occurs. This helps to prevent oscillations in the optimization process and results in more stable updates to the parameters.";
                                        footer_eq_title.innerHTML = "<h2> Update Parameters: </h2>";
                                        footer_eq.innerHTML = "<h2> θ<sub>t</sub> ← θ<sub>t-1</sub> - 𝞪 ● <span>m&#770;</span><sub>t</sub> / ( <span style='color: rgb(0, 140, 255)'>sqrt ( <span style='color: #32cd32'><span>v&#770;</span><sub>t</sub></span> )</span> + 𝝐  ) </h2>";
                                        break;     
        case "update_params_b":         footer_desc.innerHTML = "Continue updating the parameters (θ<sub>t</sub>). Next, <span style='font-weight: bold'>add epsilon (𝝐) to the square root of the bias-corrected second raw moment estimate computed in pt.(1).</span> This is a small constant added to the denominator to avoid division by zero. In this simulation (𝝐) is set to 10<sup>-8</sup> , which is a standard default value commonly used for epsilon. ";
                                        footer_eq_title.innerHTML = "<h2> Update Parameters: </h2>";
                                        footer_eq.innerHTML = "<h2> θ<sub>t</sub> ← θ<sub>t-1</sub> - 𝞪 ● <span>m&#770;</span><sub>t</sub> / ( <span style='color: #32cd32'>sqrt ( <span>v&#770;</span><sub>t</sub> )</span> <span style='color: rgb(0, 140, 255)'>+ 𝝐</span>  ) </h2>";
                                        break;     
        case "update_params_c":         footer_desc.innerHTML = "Continue updating the parameters (θ<sub>t</sub>). Next, <span style='font-weight: bold'>divide the previously computed bias corrected first moment estimate by the sum computed in pt.(2).</span> Dividing the bias-corrected first moment estimate (<span>m&#770;</span><sub>t</sub>) by the bias-corrected second raw moment estimate (<span>v&#770;</span><sub>t</sub>) effectively scales bias-corrected first moment estimate (<span>m&#770;</span><sub>t</sub>) by a factor that is inversely proportional to the variance of the gradient. This ensures that the update step for the parameters is not biased towards one direction or the other due to the biased first moment estimate.";
                                        footer_eq_title.innerHTML = "<h2> Update Parameters: </h2>";
                                        footer_eq.innerHTML = "<h2> θ<sub>t</sub> ← θ<sub>t-1</sub> - 𝞪 ● <span style='color: #32cd32'><span>m&#770;</span><sub>t</sub></span> <span style='color: rgb(0, 140, 255)'>/ ( sqrt ( <span>v&#770;</span><sub>t</sub> ) + 𝝐  )</span> </h2>";
                                        break;     
        case "update_params_d":         footer_desc.innerHTML = "Continue updating the parameters (θ<sub>t</sub>). Next, <span style='font-weight: bold'>multiply the quotient computed in pt.(3) by the models learning rate denoted by alpha (𝞪).</span> The learning rate is a hyperparameter that determines the step size for updating the parameter. This controls the size of the step taken in the direction of the estimated gradient when updating the model parameters. Effective learning rates are determined by the specific model, in this simulation we use a learning rate (𝞪) value of 0.05 .";
                                        footer_eq_title.innerHTML = "<h2> Update Parameters: </h2>";
                                        footer_eq.innerHTML = "<h2> θ<sub>t</sub> ← θ<sub>t-1</sub> - <span style='color: #32cd32'>𝞪</span> <span style='color: rgb(0, 140, 255)'>● <span>m&#770;</span><sub>t</sub> / ( sqrt ( <span>v&#770;</span><sub>t</sub> ) + 𝝐  )</span> </h2>";
                                        break;        
        case "update_params_e":         footer_desc.innerHTML = "Continue updating the parameters (θ<sub>t</sub>). Finally we <span style='font-weight: bold'>subtract our update (the right side of the equation) from the previous parameters (θ<sub>t-1</sub>)</span> . This <span style='font-weight: bold'>yields the updated parameters (θ<sub>t</sub>) , completing the update step using Adam optimization. These new parameters are now passed back into our objective function</span>, in this case CBOW Word2Vec.  ";
                                        footer_eq_title.innerHTML = "<h2> Update Parameters: </h2>";
                                        footer_eq.innerHTML = "<h2> θ<sub>t</sub> ← <span style='color: #32cd32'>θ<sub>t-1</sub></span> <span style='color: rgb(0, 140, 255)'>- 𝞪 ● <span>m&#770;</span><sub>t</sub> / ( sqrt ( <span>v&#770;</span><sub>t</sub> ) + 𝝐  )</span> </h2>";
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


    // CURRENT PARAMS TEXT


    const sidebar_curr_param_text_container = document.createElement('div');
    sidebar_curr_param_text_container.id = 'sidebar_curr_param_text_container';
    sidebar_curr_param_text_container.innerHTML = "<p>Current Model Parameters</p>"
    sidebar_canv.appendChild(sidebar_curr_param_text_container);


    // CURRENT PARAMS TENSORS

    // create a new HTML element to hold the main content container
    const sidebar_curr_param_container = document.createElement('div');
    sidebar_curr_param_container.id = 'sidebar-curr-param-container';

    // append the table container to the canvas element
    sidebar_canv.appendChild(sidebar_curr_param_container);

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

    // set the sidebar curr model params data
    // if on the last step set to the updated params otherwise use current params
    let my_tensor_data = adam_data["curr_model_params"]["param_1"];
    if ( page_status >= page_count - 1 ) { my_tensor_data = adam_data["param_update_steps"]["updated_params"]["param_1"]; }
    createTable(my_tensor_data, 'my-sidebar-tensor-id', 'generic-sidebar-table-class', 'my-sidebar-container-1');

    let my_tensor_data2 = adam_data["curr_model_params"]["param_2"];
    if ( page_status >= page_count - 1 ) { my_tensor_data2 = adam_data["param_update_steps"]["updated_params"]["param_2"]; }
    createTable(my_tensor_data2, 'my-sidebar-tensor-id-2', 'generic-sidebar-table-class-b', 'my-sidebar-container-2');

    let my_tensor_data3 = adam_data["curr_model_params"]["param_3"];
    if ( page_status >= page_count - 1 ) { my_tensor_data3 = adam_data["param_update_steps"]["updated_params"]["param_3"]; }
    // transpose the param3
    const temp_tensor = my_tensor_data3.map((value) => [value]);
    createTable(temp_tensor, 'my-sidebar-tensor-id-3', 'generic-sidebar-table-class-c', 'my-sidebar-container-3');


    // // CURRENT FIRST MOMENT TENSORS

    // // create a new HTML element to hold the main content container
    // const sidebar_first_moment_container = document.createElement('div');
    // sidebar_first_moment_container.id = 'sidebar-first-moment-container';

    // // append the table container to the canvas element
    // sidebar_canv.appendChild(sidebar_first_moment_container);

    // // FIRST MOMENT TEXT
    // const sidebar_first_moment_text_container = document.createElement('div');
    // sidebar_first_moment_text_container.id = 'sidebar_first_moment_text_container';
    // sidebar_first_moment_text_container.innerHTML = "<p>Current B.C. First Moments</p>"
    // sidebar_first_moment_container.appendChild(sidebar_first_moment_text_container);

    // function createTable2(data, tableId, tableClass, containerId) {
    //     const containerDiv = document.createElement('div');
    //     containerDiv.id = containerId;
    //     sidebar_first_moment_container.appendChild(containerDiv);
      
    //     const tableDiv = document.createElement('div');
    //     tableDiv.id = tableId;
    //     containerDiv.appendChild(tableDiv);
      
    //     const table = d3.select(`#${tableId}`);
    //     const tbody = table.append('tbody');
      
    //     const rows = tbody.selectAll('tr')
    //         .data(data)
    //         .enter()
    //         .append('tr');
      
    //     const cells = rows.selectAll('td')
    //         .data(d => d)
    //         .enter()
    //         .append('td')
    //         .text(d => {
    //             const formatted = d.toFixed(4);
    //             return (d >= 0 ? '\u00A0' : '') + formatted;
    //         });
      
    //     // Add CSS classes to the table elements
    //     table.classed(tableClass, true);
    //     table.classed('my-table-class', true);
    //     cells.classed('my-cell-class', true);
    // }

    // const my_tensor_data_b = adam_data["gradient_states"]["first_moments_bc"]["param_1_m_hat"];
    // createTable2(my_tensor_data_b, 'my-sidebar-tensor-id-b', 'generic-sidebar-table-class', 'my-sidebar-container-1-b');

    // const my_tensor_data2_b = adam_data["gradient_states"]["first_moments_bc"]["param_2_m_hat"];
    // createTable2(my_tensor_data2_b, 'my-sidebar-tensor-id-2-b', 'generic-sidebar-table-class-b', 'my-sidebar-container-2-b');

    // const my_tensor_data3_b = adam_data["gradient_states"]["first_moments_bc"]["param_3_m_hat"];
    // // transpose the param3
    // const temp_tensor_b = my_tensor_data3_b.map((value) => [value]);
    // createTable2(temp_tensor_b, 'my-sidebar-tensor-id-3-b', 'generic-sidebar-table-class-c', 'my-sidebar-container-3-b');


    // // CURRENT SECOND MOMENT TENSORS

    // // create a new HTML element to hold the main content container
    // const sidebar_second_moment_container = document.createElement('div');
    // sidebar_second_moment_container.id = 'sidebar-second-moment-container';

    // // append the table container to the canvas element
    // sidebar_canv.appendChild(sidebar_second_moment_container);

    // // END PLOT CONTENT TEXT
    // const sidebar_second_moment_text_container = document.createElement('div');
    // sidebar_second_moment_text_container.id = 'sidebar_second_moment_text_container';
    // sidebar_second_moment_text_container.innerHTML = "<p>Current Bias-Corrected Second Moments</p>"
    // sidebar_second_moment_container.appendChild(sidebar_second_moment_text_container);

    // function createTable3(data, tableId, tableClass, containerId) {
    //     const containerDiv = document.createElement('div');
    //     containerDiv.id = containerId;
    //     sidebar_second_moment_container.appendChild(containerDiv);
      
    //     const tableDiv = document.createElement('div');
    //     tableDiv.id = tableId;
    //     containerDiv.appendChild(tableDiv);
      
    //     const table = d3.select(`#${tableId}`);
    //     const tbody = table.append('tbody');
      
    //     const rows = tbody.selectAll('tr')
    //         .data(data)
    //         .enter()
    //         .append('tr');
      
    //     const cells = rows.selectAll('td')
    //         .data(d => d)
    //         .enter()
    //         .append('td')
    //         .text(d => {
    //             const formatted = d.toFixed(4);
    //             return (d >= 0 ? '\u00A0' : '') + formatted;
    //         });
      
    //     // Add CSS classes to the table elements
    //     table.classed(tableClass, true);
    //     table.classed('my-table-class', true);
    //     cells.classed('my-cell-class', true);
    // }

    // const my_tensor_data_c = adam_data["gradient_states"]["second_moments_bc"]["param_1_v_hat"];
    // createTable3(my_tensor_data_c, 'my-sidebar-tensor-id-c', 'generic-sidebar-table-class', 'my-sidebar-container-1-c');

    // const my_tensor_data2_c = adam_data["gradient_states"]["second_moments_bc"]["param_2_v_hat"];
    // createTable3(my_tensor_data2_c, 'my-sidebar-tensor-id-2-c', 'generic-sidebar-table-class-b', 'my-sidebar-container-2-c');

    // const my_tensor_data3_c = adam_data["gradient_states"]["second_moments_bc"]["param_3_v_hat"];
    // // transpose the param3
    // const temp_tensor_c = my_tensor_data3_c.map((value) => [value]);
    // createTable3(temp_tensor_c, 'my-sidebar-tensor-id-3-c', 'generic-sidebar-table-class-c', 'my-sidebar-container-3-c');


    // PARAM COLOR KEY

    // create a new HTML element to hold the main content container
    const sidebar_color_key_container = document.createElement('div');
    sidebar_color_key_container.id = 'sidebar-color-key-container';
    sidebar_color_key_container.innerHTML = "<p>Param 1<span style='color: rgb(255, 0, 76)'> Embeddings</span> | Param 2<span style='color: rgb(0, 255, 85)'> Weights</span> | Param 3<span style='color: rgb(0, 255, 242)'> Bias</span></p>"

    // append the table container to the canvas element
    sidebar_canv.appendChild(sidebar_color_key_container);


    // DYNAMIC FULL ADAM EQUASION

    let eq_state = page_status + 1;
    
    //// create a new HTML element to hold the main content container
    const sidebar_adam_eq_container = document.createElement('div');
    sidebar_adam_eq_container.id = 'sidebar-adam-eq-container';

    // append the table container to the canvas element
    sidebar_canv.appendChild(sidebar_adam_eq_container);

    sidebar_adam_eq_container.innerHTML = "<h1> Adam Optimization Algorithm </h1> "

    // construct the algorithm line by line
    // format:
    // if (eq_state == specify) { 
    //    custom state  } else { 
    //    default state }
    if ( eq_state == 1 && epoch_status == 0 )  { 
        sidebar_adam_eq_container.innerHTML += "<p> <span style='color: rgb(0, 140, 255); font-weight: bold;'> Require: 𝞪 &nbsp; (Stepsize) </span> </p>" } else { 
        sidebar_adam_eq_container.innerHTML += "<p> <span style='font-weight: bold'> Require: </span> 𝞪 &nbsp; (Stepsize) </p>" }
    if ( eq_state == 1 && epoch_status == 0 )  { 
        sidebar_adam_eq_container.innerHTML += "<p> <span style='color: rgb(0, 140, 255); font-weight: bold;'> Require: β<sub>1</sub>, β<sub>2</sub> ∈ [0,1) &nbsp; (Decay Rates) </span> </p>" } else { 
        sidebar_adam_eq_container.innerHTML += "<p> <span style='font-weight: bold'> Require: </span> β<sub>1</sub>, β<sub>2</sub> ∈ [0,1) &nbsp; (Decay Rates) </p>" }
    if ( eq_state == 1 && epoch_status == 0 || eq_state >= 2 && eq_state <= 7 )  { 
        sidebar_adam_eq_container.innerHTML += "<p> <span style='color: rgb(0, 140, 255); font-weight: bold;'> Require: ƒ(θ) &nbsp; (Objective Function) </span> </p>" } else { 
        sidebar_adam_eq_container.innerHTML += "<p> <span style='font-weight: bold'> Require: </span> ƒ(θ) &nbsp; (Objective Function) </p>" }
    if ( eq_state == 1 && epoch_status == 0 )  { 
        sidebar_adam_eq_container.innerHTML += "<p> <span style='color: rgb(0, 140, 255); font-weight: bold;'> Require: θ<sub>0</sub> &nbsp; (Initial Parameters) </span> </p>" } else { 
        sidebar_adam_eq_container.innerHTML += "<p> <span style='font-weight: bold'> Require: </span> θ<sub>0</sub> &nbsp; (Initial Parameters) </p>" }
    if ( eq_state == 1 && epoch_status == 0 )  { 
        sidebar_adam_eq_container.innerHTML += "<p> &nbsp; &nbsp; <span style='color: rgb(0, 140, 255); font-weight: bold;'> m<sub>0</sub>, v<sub>0</sub>, t ← 0, 0, 0 &nbsp; (Initialize Vectors) </span> </p>" } else { 
        sidebar_adam_eq_container.innerHTML += "<p> &nbsp; &nbsp; m<sub>0</sub>, v<sub>0</sub>, t ← 0, 0, 0 &nbsp; (Initialize Vectors) </p>" }
    if ( eq_state >= 8 && eq_state <= 22 || eq_state <= 7 && epoch_status > 0 )  { 
        sidebar_adam_eq_container.innerHTML += "<p> &nbsp; &nbsp; <span style='color: rgb(0, 140, 255); font-weight: bold;'> while θ<sub>t</sub> not converged do </span> </p>" } else { 
        sidebar_adam_eq_container.innerHTML += "<p> &nbsp; &nbsp; <span style='font-weight: bold'> while </span> θ<sub>t</sub> not converged <span style='font-weight: bold'> do </span> </p>" }
    if ( eq_state == 8 )  { 
        sidebar_adam_eq_container.innerHTML += "<p> &nbsp; &nbsp; &nbsp; &nbsp; <span style='color: rgb(0, 140, 255); font-weight: bold;'> g<sub>t</sub> ← ∇<sub>θ</sub> ƒ<sub>t</sub> (θ<sub>t-1</sub>) </span> </p>" } else { 
        sidebar_adam_eq_container.innerHTML += "<p> &nbsp; &nbsp; &nbsp; &nbsp; g<sub>t</sub> ← ∇<sub>θ</sub> ƒ<sub>t</sub> (θ<sub>t-1</sub>) </p>" }
    if ( eq_state >= 9 && eq_state <= 11 )  { 
        sidebar_adam_eq_container.innerHTML += "<p> &nbsp; &nbsp; &nbsp; &nbsp; <span style='color: rgb(0, 140, 255); font-weight: bold;'> m<sub>t</sub> ← β<sub>1</sub> ● m<sub>t-1</sub> + (1 - β<sub>1</sub>) ● g<sub>t</sub> </span> </p>" } else { 
        sidebar_adam_eq_container.innerHTML += "<p> &nbsp; &nbsp; &nbsp; &nbsp; m<sub>t</sub> ← β<sub>1</sub> ● m<sub>t-1</sub> + (1 - β<sub>1</sub>) ● g<sub>t</sub> </p>" }
    if ( eq_state >= 12 && eq_state <= 15 )  { 
        sidebar_adam_eq_container.innerHTML += "<p> &nbsp; &nbsp; &nbsp; &nbsp; <span style='color: rgb(0, 140, 255); font-weight: bold;'> v<sub>t</sub> ← β<sub>2</sub> ● v<sub>t-1</sub> + (1 - β<sub>2</sub>) ● g<sup>2</sup><sub>t</sub> </span> </p>" } else { 
        sidebar_adam_eq_container.innerHTML += "<p> &nbsp; &nbsp; &nbsp; &nbsp; v<sub>t</sub> ← β<sub>2</sub> ● v<sub>t-1</sub> + (1 - β<sub>2</sub>) ● g<sup>2</sup><sub>t</sub> </p>" }    
    if ( eq_state == 16 )  { 
        sidebar_adam_eq_container.innerHTML += "<p> &nbsp; &nbsp; &nbsp; &nbsp; <span style='color: rgb(0, 140, 255); font-weight: bold;'> <span>m&#770;</span><sub>t</sub> ← m<sub>t</sub> / (1 - β<sup>t</sup><sub>1</sub>) </span> </p>" } else { 
        sidebar_adam_eq_container.innerHTML += "<p> &nbsp; &nbsp; &nbsp; &nbsp; <span>m&#770;</span><sub>t</sub> ← m<sub>t</sub> / (1 - β<sup>t</sup><sub>1</sub>) </p>" }   
    if ( eq_state == 17 )  { 
        sidebar_adam_eq_container.innerHTML += "<p> &nbsp; &nbsp; &nbsp; &nbsp; <span style='color: rgb(0, 140, 255); font-weight: bold;'> <span>v&#770;</span><sub>t</sub> ← v<sub>t</sub> / (1 - β<sup>t</sup><sub>2</sub>) </span> </p>" } else { 
            sidebar_adam_eq_container.innerHTML += "<p> &nbsp; &nbsp; &nbsp; &nbsp; <span>v&#770;</span><sub>t</sub> ← v<sub>t</sub> / (1 - β<sup>t</sup><sub>2</sub>) </p>" }   
    if ( eq_state >= 18 && eq_state <= 22 )  { 
        sidebar_adam_eq_container.innerHTML += "<p> &nbsp; &nbsp; &nbsp; &nbsp; <span style='color: rgb(0, 140, 255); font-weight: bold;'> θ<sub>t</sub> ← θ<sub>t-1</sub> - 𝞪 ● <span>m&#770;</span><sub>t</sub> / ( sqrt ( <span>v&#770;</span><sub>t</sub> ) + 𝝐  ) </span> </p>" } else { 
        sidebar_adam_eq_container.innerHTML += "<p> &nbsp; &nbsp; &nbsp; &nbsp; θ<sub>t</sub> ← θ<sub>t-1</sub> - 𝞪 ● <span>m&#770;</span><sub>t</sub> / ( sqrt ( <span>v&#770;</span><sub>t</sub> ) + 𝝐  ) </p>" }   
    if ( eq_state == 22 && epoch_status >= epoch_count - 1 )  { 
        sidebar_adam_eq_container.innerHTML += "<p> &nbsp; &nbsp; <span style='color: rgb(0, 140, 255); font-weight: bold;'> end while </span> </p>" } else { 
        sidebar_adam_eq_container.innerHTML += "<p> &nbsp; &nbsp; <span style='font-weight: bold'> end while </span> </p>" }   
    if ( eq_state == 22 && epoch_status >= epoch_count - 1 )  { 
        sidebar_adam_eq_container.innerHTML += "<p> &nbsp; &nbsp; <span style='color: rgb(0, 140, 255); font-weight: bold;'> return 0<sub>t</sub> &nbsp; (Resulting Parameters) </span> </p>" } else { 
        sidebar_adam_eq_container.innerHTML += "<p> &nbsp; &nbsp; <span style='font-weight: bold'> return </span> 0<sub>t</sub> &nbsp; (Resulting Parameters) </p>" }   


    // PLOT LOSS
    
    // ----- create a new HTML element to hold the table
    const loss_plot_div = document.createElement('div');
    loss_plot_div.id = 'sidebar-loss-plot';

    // append the plot element to the canvas element
    sidebar_canv.appendChild(loss_plot_div);

    // get desired tensor for this epoch
    loss_arr_y = adam_data["loss_steps"]["avg_loss_vals"];

    // only display newest loss value at step where it is calculated
    if ( epoch_status > 0 && page_status < 7 - 1 ){
        loss_arr_y.pop()
    }
    
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
            titlefont: {
                color: 'Black',
                family: 'Segoe UI'
            },
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

    // hide eq bar on initial step
    if (page_status == 0) { footer_eq_container.style.display = "none"; }
    else {footer_eq_container.style.display = "inline-flex"; }

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
            case "cbow_contexts": 
                cbow_contexts(); 
                break;
            case "cbow_linear_dot_prod": 
                cbow_linear_dot_prod(); 
                break;
            case "cbow_linear_bias_sum": 
                cbow_linear_bias_sum(); 
                break;
            case "nll_loss_softmax": 
                nll_loss_softmax(); 
                break;
            case "nll_loss_log": 
                nll_loss_log(); 
                break;
            case "nll_loss_epoch_avg": 
                nll_loss_epoch_avg(); 
                break;
            case "gradients": 
                gradients(); 
                break;
            case "first_moment_a": 
                first_moment_a(); 
                break;
            case "first_moment_b": 
                first_moment_b(); 
                break;
            case "first_moment_c": 
                first_moment_c(); 
                break;
            case "second_moment_a": 
                second_moment_a(); 
                break;
            case "second_moment_b": 
                second_moment_b(); 
                break;
            case "second_moment_c": 
                second_moment_c(); 
                break;
            case "second_moment_d": 
                second_moment_d(); 
                break;
            case "bc_first_moment": 
                bc_first_moment(); 
                break;
            case "bc_second_moment": 
                bc_second_moment(); 
                break;
            case "update_params_a": 
                update_params_a(); 
                break;
            case "update_params_b": 
                update_params_b(); 
                break;
            case "update_params_c": 
                update_params_c(); 
                break;
            case "update_params_d": 
                update_params_d(); 
                break;
            case "update_params_e": 
                update_params_e(); 
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
