const      canv = document.getElementById( "canv_song" ),
   sidebar_canv = document.getElementById( "sidebar_canv_adam"),
         footer = document.getElementById( "footer"),
   state_select = document.getElementById( "state_select" ),
     submit_btn = document.getElementById( "submit_btn"),
      reset_btn = document.getElementById( "song_reset_btn" )
        sidebar = document.getElementById( "sidebar_adam"),
       statuses = ["songs_intro", "songs1", "songs2", "songs3", "songs4", "songs5", "songs6", "songs7", "songs8", "songs9", "songs10"];
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
    // CLEAR CANV
    canv.innerHTML = '';

    setfooter( "songs_intro" ); 
    setsidebar( "default" );


    // SET CONTAINERS

    // Tiltle head
    const songTitleHeaderContainer = document.createElement('div');
    songTitleHeaderContainer.id = 'songTitleHeaderContainer';
    songTitleHeaderContainer.innerHTML = "<h2> intro Slide Title </h2>"
    canv.appendChild(songTitleHeaderContainer);

    // visuals container
    const songVisualContainer = document.createElement('div');
    songVisualContainer.id = 'songVisualContainer2';
    canv.appendChild(songVisualContainer);

    // create the image element
    const img = document.createElement('img');
    img.src = 'assets/tsne.png';
    img.style.width = '37vw'; // set image width to 100% of container width
    img.style.height = '37vw'; // allow image to maintain its aspect ratio
    img.style.position = 'absolute'; // set image position to absolute
    img.style.top = '50%'; // set image top to 50%
    img.style.left = '50%'; // set image left to 50%
    img.style.transform = 'translate(-50%, -52%)'; // move image up and left by 50% of its own width and height

    // append the image to the songVisualContainer
    songVisualContainer.appendChild(img);

}


function songs1()
{
    // CLEAR CANV
    canv.innerHTML = '';

    setfooter( "songs1" ); 
    setsidebar( "default" );


    // SET CONTAINERS

    // Tiltle head
    const songTitleHeaderContainer = document.createElement('div');
    songTitleHeaderContainer.id = 'songTitleHeaderContainer';
    songTitleHeaderContainer.innerHTML = "<h2> Slide Title </h2>"
    canv.appendChild(songTitleHeaderContainer);

    // visuals container
    const songVisualContainer = document.createElement('div');
    songVisualContainer.id = 'songVisualContainer';
    canv.appendChild(songVisualContainer);
    
    // table
    const songTableContainer = document.createElement('div');
    songTableContainer.id = 'songTableContainer';
    songTableContainer.innerHTML = "<h2 style='margin-bottom:1.5vh;margin-top:8vh;' >  table title </h2>"
    songVisualContainer.appendChild(songTableContainer)

    // plot
    const songPlotContainer = document.createElement('div');
    songPlotContainer.id = 'songPlotContainer';
    // songPlotContainer.innerHTML = "<h2 style='margin-bottom:1.5vh;margin-top:2vh;' > plot title </h2>"
    songVisualContainer.appendChild(songPlotContainer)


    // APPEND THE PLOT

    // create the image element
    const img = document.createElement('img');
    img.src = 'assets/Bad Day - Daniel Powter.png';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center';

    // append the image to the songPlotContainer
    songPlotContainer.appendChild(img);


    // TABLE DATA 

    let table_data =   [['Song 1 Name', 'Cosine Similarity'],
                        ['a', '0.2'],
                        ['b', '0.5'],
                        ['c', '0.1'],
                        ['d', '0.9'],
                        ['e', '0.5'],
                        ['f', '0.2'],
                        ['g', '0.7'],
                        ['h', '0.3'],
                        ['i', '0.8'],
                        ['j', '0.2']]


    // CREATE AND APPEND THE TABLE BASED ON (TABLE_DATA)

    // create the table element
    const table = document.createElement('table');
    table.id = 'song_table';

    // create the table header
    const headerRow = document.createElement('tr');

    // create the left header cell and set its width to 2/3 of the table
    const headerCell1 = document.createElement('th');
    headerCell1.textContent = table_data[0][0];
    headerCell1.style.backgroundColor = '#8b0000';
    headerCell1.style.color = 'white';
    headerCell1.style.width = '21vw';

    // create the right header cell and set its width to 1/3 of the table
    const headerCell2 = document.createElement('th');
    headerCell2.textContent = table_data[0][1];
    headerCell2.style.backgroundColor = '#8b0000';
    headerCell2.style.color = 'white';
    headerCell2.style.width = '9vw';

    headerRow.appendChild(headerCell1);
    headerRow.appendChild(headerCell2);
    table.appendChild(headerRow);

    // create the table body
    for (let i = 1; i < table_data.length; i++) {
    const row = document.createElement('tr');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    cell1.textContent = table_data[i][0];
    cell2.textContent = table_data[i][1];
    row.appendChild(cell1);
    row.appendChild(cell2);
    table.appendChild(row);
    }

    // append the table to the container
    songTableContainer.appendChild(table);

}


function songs2()
{
    // CLEAR CANV
    canv.innerHTML = '';

    setfooter( "songs2" ); 
    setsidebar( "default" );
    
    // SET CONTAINERS

    // Tiltle head
    const songTitleHeaderContainer = document.createElement('div');
    songTitleHeaderContainer.id = 'songTitleHeaderContainer';
    songTitleHeaderContainer.innerHTML = "<h2> Slide 2 Title </h2>"
    canv.appendChild(songTitleHeaderContainer);

    // visuals container
    const songVisualContainer = document.createElement('div');
    songVisualContainer.id = 'songVisualContainer';
    canv.appendChild(songVisualContainer);
    
    // table
    const songTableContainer = document.createElement('div');
    songTableContainer.id = 'songTableContainer';
    songTableContainer.innerHTML = "<h2 style='margin-bottom:1.5vh;margin-top:8vh;' >  table title </h2>"
    songVisualContainer.appendChild(songTableContainer)

    // plot
    const songPlotContainer = document.createElement('div');
    songPlotContainer.id = 'songPlotContainer';
    // songPlotContainer.innerHTML = "<h2 style='margin-bottom:1.5vh;margin-top:2vh;' > plot title </h2>"
    songVisualContainer.appendChild(songPlotContainer)


    // APPEND THE PLOT

    // create the image element
    const img = document.createElement('img');
    img.src = 'assets/Born In The U.S.A. - Bruce Springsteen.png';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center';

    // append the image to the songPlotContainer
    songPlotContainer.appendChild(img);


    // TABLE DATA 

    let table_data =   [['Song 1 Name', 'Cosine Similarity'],
                        ['a', '0.2'],
                        ['b', '0.5'],
                        ['c', '0.1'],
                        ['d', '0.9'],
                        ['e', '0.5'],
                        ['f', '0.2'],
                        ['g', '0.7'],
                        ['h', '0.3'],
                        ['i', '0.8'],
                        ['j', '0.2']]


    // CREATE AND APPEND THE TABLE BASED ON (TABLE_DATA)

    // create the table element
    const table = document.createElement('table');
    table.id = 'song_table';

    // create the table header
    const headerRow = document.createElement('tr');

    // create the left header cell and set its width to 2/3 of the table
    const headerCell1 = document.createElement('th');
    headerCell1.textContent = table_data[0][0];
    headerCell1.style.backgroundColor = '#8b0000';
    headerCell1.style.color = 'white';
    headerCell1.style.width = '21vw';

    // create the right header cell and set its width to 1/3 of the table
    const headerCell2 = document.createElement('th');
    headerCell2.textContent = table_data[0][1];
    headerCell2.style.backgroundColor = '#8b0000';
    headerCell2.style.color = 'white';
    headerCell2.style.width = '9vw';

    headerRow.appendChild(headerCell1);
    headerRow.appendChild(headerCell2);
    table.appendChild(headerRow);

    // create the table body
    for (let i = 1; i < table_data.length; i++) {
    const row = document.createElement('tr');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    cell1.textContent = table_data[i][0];
    cell2.textContent = table_data[i][1];
    row.appendChild(cell1);
    row.appendChild(cell2);
    table.appendChild(row);
    }

    // append the table to the container
    songTableContainer.appendChild(table);
    
}


function songs3()
{
    // CLEAR CANV
    canv.innerHTML = '';

    setfooter( "songs3" ); 
    setsidebar( "default" );
    
    // SET CONTAINERS

    // Tiltle head
    const songTitleHeaderContainer = document.createElement('div');
    songTitleHeaderContainer.id = 'songTitleHeaderContainer';
    songTitleHeaderContainer.innerHTML = "<h2> Slide 3 Title </h2>"
    canv.appendChild(songTitleHeaderContainer);

    // visuals container
    const songVisualContainer = document.createElement('div');
    songVisualContainer.id = 'songVisualContainer';
    canv.appendChild(songVisualContainer);
    
    // table
    const songTableContainer = document.createElement('div');
    songTableContainer.id = 'songTableContainer';
    songTableContainer.innerHTML = "<h2 style='margin-bottom:1.5vh;margin-top:8vh;' >  table title </h2>"
    songVisualContainer.appendChild(songTableContainer)

    // plot
    const songPlotContainer = document.createElement('div');
    songPlotContainer.id = 'songPlotContainer';
    // songPlotContainer.innerHTML = "<h2 style='margin-bottom:1.5vh;margin-top:2vh;' > plot title </h2>"
    songVisualContainer.appendChild(songPlotContainer)


    // APPEND THE PLOT

    // create the image element
    const img = document.createElement('img');
    img.src = 'assets/Bad Day - Daniel Powter.png';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center';

    // append the image to the songPlotContainer
    songPlotContainer.appendChild(img);


    // TABLE DATA 

    let table_data =   [['Song 1 Name', 'Cosine Similarity'],
                        ['a', '0.2'],
                        ['b', '0.5'],
                        ['c', '0.1'],
                        ['d', '0.9'],
                        ['e', '0.5'],
                        ['f', '0.2'],
                        ['g', '0.7'],
                        ['h', '0.3'],
                        ['i', '0.8'],
                        ['j', '0.2']]


    // CREATE AND APPEND THE TABLE BASED ON (TABLE_DATA)

    // create the table element
    const table = document.createElement('table');
    table.id = 'song_table';

    // create the table header
    const headerRow = document.createElement('tr');

    // create the left header cell and set its width to 2/3 of the table
    const headerCell1 = document.createElement('th');
    headerCell1.textContent = table_data[0][0];
    headerCell1.style.backgroundColor = '#8b0000';
    headerCell1.style.color = 'white';
    headerCell1.style.width = '21vw';

    // create the right header cell and set its width to 1/3 of the table
    const headerCell2 = document.createElement('th');
    headerCell2.textContent = table_data[0][1];
    headerCell2.style.backgroundColor = '#8b0000';
    headerCell2.style.color = 'white';
    headerCell2.style.width = '9vw';

    headerRow.appendChild(headerCell1);
    headerRow.appendChild(headerCell2);
    table.appendChild(headerRow);

    // create the table body
    for (let i = 1; i < table_data.length; i++) {
    const row = document.createElement('tr');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    cell1.textContent = table_data[i][0];
    cell2.textContent = table_data[i][1];
    row.appendChild(cell1);
    row.appendChild(cell2);
    table.appendChild(row);
    }

    // append the table to the container
    songTableContainer.appendChild(table);

}


function songs4()
{
    // CLEAR CANV
    canv.innerHTML = '';

    setfooter( "songs4" ); 
    setsidebar( "default" );

    // SET CONTAINERS

    // Tiltle head
    const songTitleHeaderContainer = document.createElement('div');
    songTitleHeaderContainer.id = 'songTitleHeaderContainer';
    songTitleHeaderContainer.innerHTML = "<h2> Slide Title 4 </h2>"
    canv.appendChild(songTitleHeaderContainer);

    // visuals container
    const songVisualContainer = document.createElement('div');
    songVisualContainer.id = 'songVisualContainer';
    canv.appendChild(songVisualContainer);
    
    // table
    const songTableContainer = document.createElement('div');
    songTableContainer.id = 'songTableContainer';
    songTableContainer.innerHTML = "<h2 style='margin-bottom:1.5vh;margin-top:8vh;' >  table title </h2>"
    songVisualContainer.appendChild(songTableContainer)

    // plot
    const songPlotContainer = document.createElement('div');
    songPlotContainer.id = 'songPlotContainer';
    // songPlotContainer.innerHTML = "<h2 style='margin-bottom:1.5vh;margin-top:2vh;' > plot title </h2>"
    songVisualContainer.appendChild(songPlotContainer)


    // APPEND THE PLOT

    // create the image element
    const img = document.createElement('img');
    img.src = 'assets/Bad Day - Daniel Powter.png';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center';

    // append the image to the songPlotContainer
    songPlotContainer.appendChild(img);


    // TABLE DATA 

    let table_data =   [['Song 1 Name', 'Cosine Similarity'],
                        ['a', '0.2'],
                        ['b', '0.5'],
                        ['c', '0.1'],
                        ['d', '0.9'],
                        ['e', '0.5'],
                        ['f', '0.2'],
                        ['g', '0.7'],
                        ['h', '0.3'],
                        ['i', '0.8'],
                        ['j', '0.2']]


    // CREATE AND APPEND THE TABLE BASED ON (TABLE_DATA)

    // create the table element
    const table = document.createElement('table');
    table.id = 'song_table';

    // create the table header
    const headerRow = document.createElement('tr');

    // create the left header cell and set its width to 2/3 of the table
    const headerCell1 = document.createElement('th');
    headerCell1.textContent = table_data[0][0];
    headerCell1.style.backgroundColor = '#8b0000';
    headerCell1.style.color = 'white';
    headerCell1.style.width = '21vw';

    // create the right header cell and set its width to 1/3 of the table
    const headerCell2 = document.createElement('th');
    headerCell2.textContent = table_data[0][1];
    headerCell2.style.backgroundColor = '#8b0000';
    headerCell2.style.color = 'white';
    headerCell2.style.width = '9vw';

    headerRow.appendChild(headerCell1);
    headerRow.appendChild(headerCell2);
    table.appendChild(headerRow);

    // create the table body
    for (let i = 1; i < table_data.length; i++) {
    const row = document.createElement('tr');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    cell1.textContent = table_data[i][0];
    cell2.textContent = table_data[i][1];
    row.appendChild(cell1);
    row.appendChild(cell2);
    table.appendChild(row);
    }

    // append the table to the container
    songTableContainer.appendChild(table);

}


function songs5()
{
    // CLEAR CANV
    canv.innerHTML = '';

    setfooter( "songs5" ); 
    setsidebar( "default" );
    
    // SET CONTAINERS

    // Tiltle head
    const songTitleHeaderContainer = document.createElement('div');
    songTitleHeaderContainer.id = 'songTitleHeaderContainer';
    songTitleHeaderContainer.innerHTML = "<h2> Slide Title 5 </h2>"
    canv.appendChild(songTitleHeaderContainer);

    // visuals container
    const songVisualContainer = document.createElement('div');
    songVisualContainer.id = 'songVisualContainer';
    canv.appendChild(songVisualContainer);
    
    // table
    const songTableContainer = document.createElement('div');
    songTableContainer.id = 'songTableContainer';
    songTableContainer.innerHTML = "<h2 style='margin-bottom:1.5vh;margin-top:8vh;' >  table title </h2>"
    songVisualContainer.appendChild(songTableContainer)

    // plot
    const songPlotContainer = document.createElement('div');
    songPlotContainer.id = 'songPlotContainer';
    // songPlotContainer.innerHTML = "<h2 style='margin-bottom:1.5vh;margin-top:2vh;' > plot title </h2>"
    songVisualContainer.appendChild(songPlotContainer)


    // APPEND THE PLOT

    // create the image element
    const img = document.createElement('img');
    img.src = 'assets/Bad Day - Daniel Powter.png';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center';

    // append the image to the songPlotContainer
    songPlotContainer.appendChild(img);


    // TABLE DATA 

    let table_data =   [['Song 1 Name', 'Cosine Similarity'],
                        ['a', '0.2'],
                        ['b', '0.5'],
                        ['c', '0.1'],
                        ['d', '0.9'],
                        ['e', '0.5'],
                        ['f', '0.2'],
                        ['g', '0.7'],
                        ['h', '0.3'],
                        ['i', '0.8'],
                        ['j', '0.2']]


    // CREATE AND APPEND THE TABLE BASED ON (TABLE_DATA)

    // create the table element
    const table = document.createElement('table');
    table.id = 'song_table';

    // create the table header
    const headerRow = document.createElement('tr');

    // create the left header cell and set its width to 2/3 of the table
    const headerCell1 = document.createElement('th');
    headerCell1.textContent = table_data[0][0];
    headerCell1.style.backgroundColor = '#8b0000';
    headerCell1.style.color = 'white';
    headerCell1.style.width = '21vw';

    // create the right header cell and set its width to 1/3 of the table
    const headerCell2 = document.createElement('th');
    headerCell2.textContent = table_data[0][1];
    headerCell2.style.backgroundColor = '#8b0000';
    headerCell2.style.color = 'white';
    headerCell2.style.width = '9vw';

    headerRow.appendChild(headerCell1);
    headerRow.appendChild(headerCell2);
    table.appendChild(headerRow);

    // create the table body
    for (let i = 1; i < table_data.length; i++) {
    const row = document.createElement('tr');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    cell1.textContent = table_data[i][0];
    cell2.textContent = table_data[i][1];
    row.appendChild(cell1);
    row.appendChild(cell2);
    table.appendChild(row);
    }

    // append the table to the container
    songTableContainer.appendChild(table);
}


function songs6()
{
    // CLEAR CANV
    canv.innerHTML = '';

    setfooter( "songs6" ); 
    setsidebar( "default" );
    
    // SET CONTAINERS

    // Tiltle head
    const songTitleHeaderContainer = document.createElement('div');
    songTitleHeaderContainer.id = 'songTitleHeaderContainer';
    songTitleHeaderContainer.innerHTML = "<h2> Slide Title 6 </h2>"
    canv.appendChild(songTitleHeaderContainer);

    // visuals container
    const songVisualContainer = document.createElement('div');
    songVisualContainer.id = 'songVisualContainer';
    canv.appendChild(songVisualContainer);
    
    // table
    const songTableContainer = document.createElement('div');
    songTableContainer.id = 'songTableContainer';
    songTableContainer.innerHTML = "<h2 style='margin-bottom:1.5vh;margin-top:8vh;' >  table title </h2>"
    songVisualContainer.appendChild(songTableContainer)

    // plot
    const songPlotContainer = document.createElement('div');
    songPlotContainer.id = 'songPlotContainer';
    // songPlotContainer.innerHTML = "<h2 style='margin-bottom:1.5vh;margin-top:2vh;' > plot title </h2>"
    songVisualContainer.appendChild(songPlotContainer)


    // APPEND THE PLOT

    // create the image element
    const img = document.createElement('img');
    img.src = 'assets/Bad Day - Daniel Powter.png';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center';

    // append the image to the songPlotContainer
    songPlotContainer.appendChild(img);


    // TABLE DATA 

    let table_data =   [['Song 1 Name', 'Cosine Similarity'],
                        ['a', '0.2'],
                        ['b', '0.5'],
                        ['c', '0.1'],
                        ['d', '0.9'],
                        ['e', '0.5'],
                        ['f', '0.2'],
                        ['g', '0.7'],
                        ['h', '0.3'],
                        ['i', '0.8'],
                        ['j', '0.2']]


    // CREATE AND APPEND THE TABLE BASED ON (TABLE_DATA)

    // create the table element
    const table = document.createElement('table');
    table.id = 'song_table';

    // create the table header
    const headerRow = document.createElement('tr');

    // create the left header cell and set its width to 2/3 of the table
    const headerCell1 = document.createElement('th');
    headerCell1.textContent = table_data[0][0];
    headerCell1.style.backgroundColor = '#8b0000';
    headerCell1.style.color = 'white';
    headerCell1.style.width = '21vw';

    // create the right header cell and set its width to 1/3 of the table
    const headerCell2 = document.createElement('th');
    headerCell2.textContent = table_data[0][1];
    headerCell2.style.backgroundColor = '#8b0000';
    headerCell2.style.color = 'white';
    headerCell2.style.width = '9vw';

    headerRow.appendChild(headerCell1);
    headerRow.appendChild(headerCell2);
    table.appendChild(headerRow);

    // create the table body
    for (let i = 1; i < table_data.length; i++) {
    const row = document.createElement('tr');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    cell1.textContent = table_data[i][0];
    cell2.textContent = table_data[i][1];
    row.appendChild(cell1);
    row.appendChild(cell2);
    table.appendChild(row);
    }

    // append the table to the container
    songTableContainer.appendChild(table);

}


function songs7()
{
    // CLEAR CANV
    canv.innerHTML = '';

    setfooter( "songs7" ); 
    setsidebar( "default" );
    
    // SET CONTAINERS

    // Tiltle head
    const songTitleHeaderContainer = document.createElement('div');
    songTitleHeaderContainer.id = 'songTitleHeaderContainer';
    songTitleHeaderContainer.innerHTML = "<h2> Slide Title 7 </h2>"
    canv.appendChild(songTitleHeaderContainer);

    // visuals container
    const songVisualContainer = document.createElement('div');
    songVisualContainer.id = 'songVisualContainer';
    canv.appendChild(songVisualContainer);
    
    // table
    const songTableContainer = document.createElement('div');
    songTableContainer.id = 'songTableContainer';
    songTableContainer.innerHTML = "<h2 style='margin-bottom:1.5vh;margin-top:8vh;' >  table title </h2>"
    songVisualContainer.appendChild(songTableContainer)

    // plot
    const songPlotContainer = document.createElement('div');
    songPlotContainer.id = 'songPlotContainer';
    // songPlotContainer.innerHTML = "<h2 style='margin-bottom:1.5vh;margin-top:2vh;' > plot title </h2>"
    songVisualContainer.appendChild(songPlotContainer)


    // APPEND THE PLOT

    // create the image element
    const img = document.createElement('img');
    img.src = 'assets/Bad Day - Daniel Powter.png';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center';

    // append the image to the songPlotContainer
    songPlotContainer.appendChild(img);


    // TABLE DATA 

    let table_data =   [['Song 1 Name', 'Cosine Similarity'],
                        ['a', '0.2'],
                        ['b', '0.5'],
                        ['c', '0.1'],
                        ['d', '0.9'],
                        ['e', '0.5'],
                        ['f', '0.2'],
                        ['g', '0.7'],
                        ['h', '0.3'],
                        ['i', '0.8'],
                        ['j', '0.2']]


    // CREATE AND APPEND THE TABLE BASED ON (TABLE_DATA)

    // create the table element
    const table = document.createElement('table');
    table.id = 'song_table';

    // create the table header
    const headerRow = document.createElement('tr');

    // create the left header cell and set its width to 2/3 of the table
    const headerCell1 = document.createElement('th');
    headerCell1.textContent = table_data[0][0];
    headerCell1.style.backgroundColor = '#8b0000';
    headerCell1.style.color = 'white';
    headerCell1.style.width = '21vw';

    // create the right header cell and set its width to 1/3 of the table
    const headerCell2 = document.createElement('th');
    headerCell2.textContent = table_data[0][1];
    headerCell2.style.backgroundColor = '#8b0000';
    headerCell2.style.color = 'white';
    headerCell2.style.width = '9vw';

    headerRow.appendChild(headerCell1);
    headerRow.appendChild(headerCell2);
    table.appendChild(headerRow);

    // create the table body
    for (let i = 1; i < table_data.length; i++) {
    const row = document.createElement('tr');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    cell1.textContent = table_data[i][0];
    cell2.textContent = table_data[i][1];
    row.appendChild(cell1);
    row.appendChild(cell2);
    table.appendChild(row);
    }

    // append the table to the container
    songTableContainer.appendChild(table);
}


function songs8()
{
    // CLEAR CANV
    canv.innerHTML = '';

    setfooter( "song8" ); 
    setsidebar( "default" );
    
    // SET CONTAINERS

    // Tiltle head
    const songTitleHeaderContainer = document.createElement('div');
    songTitleHeaderContainer.id = 'songTitleHeaderContainer';
    songTitleHeaderContainer.innerHTML = "<h2> Slide Title 8 </h2>"
    canv.appendChild(songTitleHeaderContainer);

    // visuals container
    const songVisualContainer = document.createElement('div');
    songVisualContainer.id = 'songVisualContainer';
    canv.appendChild(songVisualContainer);
    
    // table
    const songTableContainer = document.createElement('div');
    songTableContainer.id = 'songTableContainer';
    songTableContainer.innerHTML = "<h2 style='margin-bottom:1.5vh;margin-top:8vh;' >  table title </h2>"
    songVisualContainer.appendChild(songTableContainer)

    // plot
    const songPlotContainer = document.createElement('div');
    songPlotContainer.id = 'songPlotContainer';
    // songPlotContainer.innerHTML = "<h2 style='margin-bottom:1.5vh;margin-top:2vh;' > plot title </h2>"
    songVisualContainer.appendChild(songPlotContainer)


    // APPEND THE PLOT

    // create the image element
    const img = document.createElement('img');
    img.src = 'assets/Bad Day - Daniel Powter.png';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center';

    // append the image to the songPlotContainer
    songPlotContainer.appendChild(img);


    // TABLE DATA 

    let table_data =   [['Song 1 Name', 'Cosine Similarity'],
                        ['a', '0.2'],
                        ['b', '0.5'],
                        ['c', '0.1'],
                        ['d', '0.9'],
                        ['e', '0.5'],
                        ['f', '0.2'],
                        ['g', '0.7'],
                        ['h', '0.3'],
                        ['i', '0.8'],
                        ['j', '0.2']]


    // CREATE AND APPEND THE TABLE BASED ON (TABLE_DATA)

    // create the table element
    const table = document.createElement('table');
    table.id = 'song_table';

    // create the table header
    const headerRow = document.createElement('tr');

    // create the left header cell and set its width to 2/3 of the table
    const headerCell1 = document.createElement('th');
    headerCell1.textContent = table_data[0][0];
    headerCell1.style.backgroundColor = '#8b0000';
    headerCell1.style.color = 'white';
    headerCell1.style.width = '21vw';

    // create the right header cell and set its width to 1/3 of the table
    const headerCell2 = document.createElement('th');
    headerCell2.textContent = table_data[0][1];
    headerCell2.style.backgroundColor = '#8b0000';
    headerCell2.style.color = 'white';
    headerCell2.style.width = '9vw';

    headerRow.appendChild(headerCell1);
    headerRow.appendChild(headerCell2);
    table.appendChild(headerRow);

    // create the table body
    for (let i = 1; i < table_data.length; i++) {
    const row = document.createElement('tr');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    cell1.textContent = table_data[i][0];
    cell2.textContent = table_data[i][1];
    row.appendChild(cell1);
    row.appendChild(cell2);
    table.appendChild(row);
    }

    // append the table to the container
    songTableContainer.appendChild(table);

}


function songs9()
{
    // CLEAR CANV
    canv.innerHTML = '';

    setfooter( "songs9" ); 
    setsidebar( "default" );
    
    // SET CONTAINERS

    // Tiltle head
    const songTitleHeaderContainer = document.createElement('div');
    songTitleHeaderContainer.id = 'songTitleHeaderContainer';
    songTitleHeaderContainer.innerHTML = "<h2> Slide Title 9 </h2>"
    canv.appendChild(songTitleHeaderContainer);

    // visuals container
    const songVisualContainer = document.createElement('div');
    songVisualContainer.id = 'songVisualContainer';
    canv.appendChild(songVisualContainer);
    
    // table
    const songTableContainer = document.createElement('div');
    songTableContainer.id = 'songTableContainer';
    songTableContainer.innerHTML = "<h2 style='margin-bottom:1.5vh;margin-top:8vh;' >  table title </h2>"
    songVisualContainer.appendChild(songTableContainer)

    // plot
    const songPlotContainer = document.createElement('div');
    songPlotContainer.id = 'songPlotContainer';
    // songPlotContainer.innerHTML = "<h2 style='margin-bottom:1.5vh;margin-top:2vh;' > plot title </h2>"
    songVisualContainer.appendChild(songPlotContainer)


    // APPEND THE PLOT

    // create the image element
    const img = document.createElement('img');
    img.src = 'assets/Bad Day - Daniel Powter.png';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center';

    // append the image to the songPlotContainer
    songPlotContainer.appendChild(img);


    // TABLE DATA 

    let table_data =   [['Song 1 Name', 'Cosine Similarity'],
                        ['a', '0.2'],
                        ['b', '0.5'],
                        ['c', '0.1'],
                        ['d', '0.9'],
                        ['e', '0.5'],
                        ['f', '0.2'],
                        ['g', '0.7'],
                        ['h', '0.3'],
                        ['i', '0.8'],
                        ['j', '0.2']]


    // CREATE AND APPEND THE TABLE BASED ON (TABLE_DATA)

    // create the table element
    const table = document.createElement('table');
    table.id = 'song_table';

    // create the table header
    const headerRow = document.createElement('tr');

    // create the left header cell and set its width to 2/3 of the table
    const headerCell1 = document.createElement('th');
    headerCell1.textContent = table_data[0][0];
    headerCell1.style.backgroundColor = '#8b0000';
    headerCell1.style.color = 'white';
    headerCell1.style.width = '21vw';

    // create the right header cell and set its width to 1/3 of the table
    const headerCell2 = document.createElement('th');
    headerCell2.textContent = table_data[0][1];
    headerCell2.style.backgroundColor = '#8b0000';
    headerCell2.style.color = 'white';
    headerCell2.style.width = '9vw';

    headerRow.appendChild(headerCell1);
    headerRow.appendChild(headerCell2);
    table.appendChild(headerRow);

    // create the table body
    for (let i = 1; i < table_data.length; i++) {
    const row = document.createElement('tr');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    cell1.textContent = table_data[i][0];
    cell2.textContent = table_data[i][1];
    row.appendChild(cell1);
    row.appendChild(cell2);
    table.appendChild(row);
    }

    // append the table to the container
    songTableContainer.appendChild(table);

}


function songs10()
{
    // CLEAR CANV
    canv.innerHTML = '';

    setfooter( "songs10" ); 
    setsidebar( "default" );
    
    // SET CONTAINERS

    // Tiltle head
    const songTitleHeaderContainer = document.createElement('div');
    songTitleHeaderContainer.id = 'songTitleHeaderContainer';
    songTitleHeaderContainer.innerHTML = "<h2> Slide Title 10 </h2>"
    canv.appendChild(songTitleHeaderContainer);

    // visuals container
    const songVisualContainer = document.createElement('div');
    songVisualContainer.id = 'songVisualContainer';
    canv.appendChild(songVisualContainer);
    
    // table
    const songTableContainer = document.createElement('div');
    songTableContainer.id = 'songTableContainer';
    songTableContainer.innerHTML = "<h2 style='margin-bottom:1.5vh;margin-top:8vh;' >  table title </h2>"
    songVisualContainer.appendChild(songTableContainer)

    // plot
    const songPlotContainer = document.createElement('div');
    songPlotContainer.id = 'songPlotContainer';
    // songPlotContainer.innerHTML = "<h2 style='margin-bottom:1.5vh;margin-top:2vh;' > plot title </h2>"
    songVisualContainer.appendChild(songPlotContainer)


    // APPEND THE PLOT

    // create the image element
    const img = document.createElement('img');
    img.src = 'assets/Bad Day - Daniel Powter.png';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center';

    // append the image to the songPlotContainer
    songPlotContainer.appendChild(img);


    // TABLE DATA 

    let table_data =   [['Song 1 Name', 'Cosine Similarity'],
                        ['a', '0.2'],
                        ['b', '0.5'],
                        ['c', '0.1'],
                        ['d', '0.9'],
                        ['e', '0.5'],
                        ['f', '0.2'],
                        ['g', '0.7'],
                        ['h', '0.3'],
                        ['i', '0.8'],
                        ['j', '0.2']]


    // CREATE AND APPEND THE TABLE BASED ON (TABLE_DATA)

    // create the table element
    const table = document.createElement('table');
    table.id = 'song_table';

    // create the table header
    const headerRow = document.createElement('tr');

    // create the left header cell and set its width to 2/3 of the table
    const headerCell1 = document.createElement('th');
    headerCell1.textContent = table_data[0][0];
    headerCell1.style.backgroundColor = '#8b0000';
    headerCell1.style.color = 'white';
    headerCell1.style.width = '21vw';

    // create the right header cell and set its width to 1/3 of the table
    const headerCell2 = document.createElement('th');
    headerCell2.textContent = table_data[0][1];
    headerCell2.style.backgroundColor = '#8b0000';
    headerCell2.style.color = 'white';
    headerCell2.style.width = '9vw';

    headerRow.appendChild(headerCell1);
    headerRow.appendChild(headerCell2);
    table.appendChild(headerRow);

    // create the table body
    for (let i = 1; i < table_data.length; i++) {
    const row = document.createElement('tr');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    cell1.textContent = table_data[i][0];
    cell2.textContent = table_data[i][1];
    row.appendChild(cell1);
    row.appendChild(cell2);
    table.appendChild(row);
    }

    // append the table to the container
    songTableContainer.appendChild(table);

}


function setfooter( input ) // takes input from event listener and then 
{
    switch( input ) {
        case "default": footer.innerHTML = "<h2>sample footer</h2>"; break;
        // SLIDE DESCRIPTIONS
        case "songs_intro": footer.innerHTML = "<h2> desc intro </h2>"
                            break;
        case "songs1":      footer.innerHTML = "<h2> slide desc 1</h2>"
                            break;
        case "songs2":      footer.innerHTML = "<h2> slide desc 2</h2>"
                            break;
        case "songs3":      footer.innerHTML = "<h2> slide desc 3</h2>"
                            break;
        case "songs4":      footer.innerHTML = "<h2> slide desc 4</h2>"
                            break;
        case "songs5":      footer.innerHTML = "<h2> slide desc 5</h2>"
                            break;
        case "songs6":      footer.innerHTML = "<h2> slide desc 6</h2>"
                            break;
        case "songs7":      footer.innerHTML = "<h2> slide desc 7</h2>"
                            break;
        case "songs8":      footer.innerHTML = "<h2> slide desc 8</h2>"
                            break;
        case "songs9":      footer.innerHTML = "<h2> slide desc 9</h2>"
                            break;   
        case "songs10":      footer.innerHTML = "<h2> slide desc 10</h2>"
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
    if ( val == 's1' ) { page_status = 1; }
    if ( val == 's2' ) { page_status = 2; }
    if ( val == 's3' ) { page_status = 3; }
    if ( val == 's4' ) { page_status = 4; }
    if ( val == 's5' ) { page_status = 5; }
    if ( val == 's6' ) { page_status = 6; }
    if ( val == 's7' ) { page_status = 7; }
    if ( val == 's8' ) { page_status = 8; }
    if ( val == 's9' ) { page_status = 9; }
    if ( val == 's10' ) { page_status = 10; }

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
            case "songs10": 
                songs10(); 
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
