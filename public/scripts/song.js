const      canv = document.getElementById( "canv_song" ),
   sidebar_canv = document.getElementById( "sidebar_canv_adam"),
         footer = document.getElementById( "footer"),
   state_select = document.getElementById( "state_select" ),
     submit_btn = document.getElementById( "song_submit_btn"),
      reset_btn = document.getElementById( "song_reset_btn" )
        sidebar = document.getElementById( "sidebar_adam"),
       statuses = ["songs_intro", "songs1", "songs2", "songs3", "songs4", "songs5", "songs6", "songs7", "songs8", "songs9", "songs10", "buffer_page"];
// init current page and epoch
let page_status = 0;
let epoch_status = 0;
// init data var
let adam_data;
// define page and epoch counts
let page_count = 12;
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
    img.src = 'assets/song_tsne_plots/tsne.png';
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
    img.src = 'assets/song_tsne_plots/Bad Day - Daniel Powter.png';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center';

    // append the image to the songPlotContainer
    songPlotContainer.appendChild(img);


    // TABLE DATA 

    let table_data =   [['Bad Day - Daniel Powter', 'Cosine Similarity'],
                        ['1: Gettysburg - Ratatat ', '1.000'],
                        ['2: No One Knows - Queens Of The Stone Age', '0.9997'],
                        ['3: Colorful Kids - Ha Ha Tonka', '0.9996'],
                        ['4: Idioteque - Radiohead', '0.9990'],
                        ['5: Im Not Okay (I Promise) - My Chemical Romance', '0.9981'],
                        ['6: Heart Skipped A Beat - The xx', '0.9978'],
                        ['7: And The Birds... - Light Heat', '0.9970'],
                        ['8: Crawling After You - Bass Drum Of Death', '0.9970'],
                        ['9: Ten Thousand Fists - Disturbed', '0.9962'],
                        ['10: Drive By - Train', '0.9961']]


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
    img.src = 'assets/song_tsne_plots/Born In The U.S.A. - Bruce Springsteen.png';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center';

    // append the image to the songPlotContainer
    songPlotContainer.appendChild(img);


    // TABLE DATA 

    let table_data =   [['Born In The U.S.A. - Bruce Springsteen', 'Cosine Similarity'],
                        ['1: (Dont Fear) The Reaper - Blue Oyster Cult', '0.9994'],
                        ['2: Light Me Up - Icona Po', '0.9994'],
                        ['3: Fire & Rain - Mat Kearney', '0.9991'],
                        ['4: Cruel City - Augustines', '0.9990'],
                        ['5: THISKIDSNOTALRIGHT - AWOLNATION', '0.9987'],
                        ['6: Parachute - Matthew Koma', '0.9986'],
                        ['7: Alla helveten - Jonathan Johansson', '0.9979'],
                        ['8: Paper Heart - Chlöe Howl', '0.9975'],
                        ['9: Cough Cough - Everything Everything', '0.9974'],
                        ['10: Safety In Numbers - Jakob', '0.9974']]


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
    img.src = 'assets/song_tsne_plots/Chasing Cars - Snow Patrol.png';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center';

    // append the image to the songPlotContainer
    songPlotContainer.appendChild(img);


    // TABLE DATA 

    let table_data =   [['Chasing Cars - Snow Patrol', 'Cosine Similarity'],
                        ['1: Stricken - Disturbed', '0.9998'],
                        ['2: Half The World Away - Oasis', '0.9997'],
                        ['3: Paris 2004 - Peter Bjorn And John', '0.9995'],
                        ['4: Living With the Pain - Fallen to Flux', '0.9995'],
                        ['5: ALPHA - LukHash', '0.9992'],
                        ['6: Tennsoldat och eldvakt - Imperiet', '0.9991'],
                        ['7: Going Under - Evanescence', '0.9990'],
                        ['8: Holly - Sleigh Bells', '0.9990'],
                        ['9: Spooky Language - The Palmer Squares', '0.9986'],
                        ['10: Only Fools Rush In - Elvis Presley', '0.9985']]


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
    img.src = 'assets/song_tsne_plots/Cheerleader - OMI.png';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center';

    // append the image to the songPlotContainer
    songPlotContainer.appendChild(img);


    // TABLE DATA 

    let table_data =   [['Cheerleader - OMI', 'Cosine Similarity'],
                        ['1: Carry You Home - James Blunt', '0.9997'],
                        ['2: Let There Be Love - 2002 Digital Remaster - Simple Minds', '0.9989'],
                        ['3: Earned It (Fifty Shades Of Grey) - From The Fifty Shades Of Grey" Soundtrack" - The Weeknd', '0.9989'],
                        ['4: Där elden falnar (men fortfarande glöder) - Lars Winnerbäck', '0.9985'],
                        ['5: Crush - Metaform', '0.9981'],
                        ['6: Come Away to the Water - Glen Hansard', '0.9980'],
                        ['7: Carry Your Cross - The Ziggens', '0.9979'],
                        ['8: Ingen kunde röra oss - Kent', '0.9979'],
                        ['9: Smokers Outside The Hospital Doors - Radio Edit - Editors', '0.9978'],
                        ['10: Half The World Away - Oasis', '0.9978']]


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
    img.src = 'assets/song_tsne_plots/Electric Feel - MGMT.png';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center';

    // append the image to the songPlotContainer
    songPlotContainer.appendChild(img);


    // TABLE DATA 

    let table_data =   [['Electric Feel - MGMT', 'Cosine Similarity'],
                        ['1: God & Satan - Biffy Clyro', '0.9996'],
                        ['2: Smother - Daughter', '0.9995'],
                        ['3: Everything You Wanted - Kele', '0.9992'],
                        ['4: Lonely Is The Night - Billy Squier', '0.9990'],
                        ['5: Roulette - System Of A Down', '0.9988'],
                        ['6: Aerodynamic - Daft Punk', '0.9982'],
                        ['7: Supertime - Berndsen', ' 0.9982'],
                        ['8: But Its Better If You Do - Panic! At The Disco', '0.9981'],
                        ['9: Woodys Roundup - Riders In The Sky', '0.9981'],
                        ['10: Without You - feat. Usher - David Guetta', '0.9980']]


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
    img.src = 'assets/song_tsne_plots/Wake Me Up - Avicii.png';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center';

    // append the image to the songPlotContainer
    songPlotContainer.appendChild(img);


    // TABLE DATA 

    let table_data =   [['Wake Me Up - Avicii', 'Cosine Similarity'],
                        ['1: Kiss Me - Sixpence None The Richer', '0.9998'],
                        ['2: Afterglow - Phaeleh ft. Soundmouse', '0.9994'],
                        ['3: Call My Name - Cheryl', '0.9994'],
                        ['4: Som vanligt - Den svenska björnstammen', '0.9987'],
                        ['5: Door - C418', '0.9976'],
                        ['6: Bad Day - R.E.M.', '0.9973'],
                        ['7: Father And Son - Cat Stevens', '0.9973'],
                        ['8: Bajen - Kenta', '0.9970'],
                        ['9: The Beat - C2C', '0.9967'],
                        ['10: Eyesdown - Machinedrum Remix - Bonobo', '0.9960']]


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
    img.src = 'assets/song_tsne_plots/Mr Brightside - The Killers.png';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center';

    // append the image to the songPlotContainer
    songPlotContainer.appendChild(img);


    // TABLE DATA 

    let table_data =   [['Mr Brightside - The Killers', 'Cosine Similarity'],
                        ['1: Love Will Tear Us Apart - Joy Division', '0.9996'],
                        ['2: Sleeping Sickness - City and Colour', '0.9995'],
                        ['3: The Outsiders - NEEDTOBREATHE', '0.9988'],
                        ['4: Goth In The Disco - Just Jack', '0.9987'],
                        ['5: One Month Off - Bloc Party', '0.9976'],
                        ['6: Drawn to You - Frida Sundemo', '0.9970'],
                        ['7: Rabbit Heart (Raise It Up) - Florence + The Machine', '0.9966'],
                        ['8: Hannah Hunt - Vampire Weekend', '0.9962'],
                        ['9: Som vanligt - Den svenska björnstammen', '0.9960'],
                        ['10: Deserted Homes - Fallulah', '0.9960']]


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
    img.src = 'assets/song_tsne_plots/Now - Paramore.png';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center';

    // append the image to the songPlotContainer
    songPlotContainer.appendChild(img);


    // TABLE DATA 

    let table_data =   [['Now - Paramore', 'Cosine Similarity'],
                        ['1: Ghetto Gospel - (Explicit) - 2Pac', '0.9999'],
                        ['2: Ares (Big Gigantic Remix) - Emancipator', '0.9995'],
                        ['3: Den andra sidan - Kent', '0.9994'],
                        ['4: Run And Hide - The Automatic', '0.9994'],
                        ['5: Disco Clash - 4TrakZ', '0.9984'],
                        ['6: BTSK - MS MR', '0.9983'],
                        ['7: Eclectic Eccentric - The Rifles', '0.9983'],
                        ['8: This Is The World We Live In - Joe Echo', '0.9981'],
                        ['9: Ivy - High Highs', '0.9977'],
                        ['10: Faded - Zhu', '0.9973']]


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
    img.src = 'assets/song_tsne_plots/Move Along - The All-American Rejects.png';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center';

    // append the image to the songPlotContainer
    songPlotContainer.appendChild(img);


    // TABLE DATA 

    let table_data =   [['Move Along - The All-American Rejects', 'Cosine Similarity'],
                        ['1: Jenny from the Block - Bronx Remix (No Rap) - Edit - Jennifer Lopez', '0.9998'],
                        ['2: 4th Of July - Soundgarden', '0.9995'],
                        ['3: The Ballad Of El Goodo - Evan Dando', '0.9994'],
                        ['4: Midsommarkransen Baby - Jonathan Johansson', '0.9993'],
                        ['5: Noll - Kent', '0.9991'],
                        ['6: Dance The Go-Go - The Breakers', '0.9990'],
                        ['7: I Love That Man - Devendra Banhart', '0.9990'],
                        ['8: Come Along - Titiyo', '0.9987'],
                        ['9: The Rockafeller Skank - Full Version - Fatboy Slim', '0.9985'],
                        ['10: Chop Suey! - System Of A Down', '0.9984']]


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
    img.src = 'assets/song_tsne_plots/Mad Sounds - Arctic Monkeys.png';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center';

    // append the image to the songPlotContainer
    songPlotContainer.appendChild(img);


    // TABLE DATA 

    let table_data =   [['Mad Sounds - Arctic Monkeys', 'Cosine Similarity'],
                        ['1: MTI - Koreless', '0.9999'],
                        ['2: More Than This - One Direction', '0.9993'],
                        ['3: Dear My Closest Friend - Flyleaf', '0.9991'],
                        ['4: Louder Than Words - Les Friction', '0.9991'],
                        ['5: Build That Wall (Zias Theme) - Darren Korb', '0.9990'],
                        ['6: Pleasant Street - Tim Buckley', '0.9986'],
                        ['7: Im Not In Love - 10cc', '0.9983'],
                        ['8: Say It Aint So - Weezer', '0.9980'],
                        ['9:  Rectifier - Daft Punk', '0.9975'],
                        ['10: Gimme Danger - Iggy Pop', '0.9972']]


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
    songPlotContainer.innerHTML += "<h2 style='margin-bottom:6vh;margin-top:2vh;' > Generating Outs.. </h2>"

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
        case "songs10":      footer.innerHTML = "<h2> buffer page desc </h2>"
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


    // ABOVE BUTTONS USER TEXT

    const sidebar_curr_param_text_container = document.createElement('div');
    // FORMATTING FOR THE TEXT IN CSS @ (#sidebar_new_text_container p)
    sidebar_curr_param_text_container.id = 'sidebar_new_text_container';
    // CHANGE THIS TEXT
    sidebar_curr_param_text_container.innerHTML = "<p> Select A Song to... and something and more words to more word content </p>";
    // IF SIDEBAR TEXT IS VARIABLE FROM SLIDE TO SLIDE (use commented logic instead)..
    // if ( page_status == 0 ) { sidebar_curr_param_text_container.innerHTML = "<p> slide 1/15 text </p>"; }
    // else if ( page_status == 1 ) { sidebar_curr_param_text_container.innerHTML = "<p> slide 2/15 text </p>"; }
    // else if ( page_status == 2 ) { sidebar_curr_param_text_container.innerHTML = "<p> slide 3/15 text </p>"; }

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

    
    // set buffer animation time in ms
    let buffer_delay = 800;

    if (page != 'songs_intro') {
    setTimeout(function() {
        // call buffer() with a delay of 400ms
        setTimeout(buffer_page, 10);

        // execute switch statement with a delay of 800ms
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
        }, 3000);
    }, buffer_delay);
    } else {
        setTimeout(songs_intro(), 400);
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
submit_btn.addEventListener("click", () => {
    const state = state_select.value;
    console.log('state: ', state)
    updater(state);
  });
reset_btn.addEventListener( "click", () => { updater('r'); });
