const      canv = document.getElementById( "canv" ),
        sidebar = document.getElementById( "sidebar"),
         footer = document.getElementById( "footer"),
       back_btn = document.getElementById( "back_btn" ),
        fwd_btn = document.getElementById( "fwd_btn" ),
       statuses = ["Model Selection", "Input and Initialization","Input Matrix","Initialize Weight + Bias Matrices","Compute Center Word Matrix","Hyperbolic Tangent Function","Compute Softmax and Loss Function","Update Weight and Bias Matrices"];
let page_status = 0;
function meta() // sets and returns page metadata for meta div (top left corner of canvas)
{
    let output  = "<div id=\"meta\">";
        output += "<h2>Sen2vec - \"" + statuses[page_status] + "\"</h2>";
        output += "<h3>page " + page_status + " out of 7</h3>";
        output += "</div>"
    return output;
}
function ModelSelection()
{
    sidebar.innerHTML = '';
    setfooter( "default" );
    canv.dataset.mode = "n/a";
    canv.innerHTML  = meta(); //starts by populating meta div
    canv.innerHTML += "<div style=\"height:15vh\"></div>"; //im just gonna leave the html here from w2v page 1 but this is how u add the html
    canv.innerHTML += "<h2>Select model for Sen2vec:</h2>";
    let btn_holder  = "<div style=\"position:fixed;right:16.5vw;top:35vh;\">"
        btn_holder += "<button id = \"btn1\">DM</button>"
        btn_holder += "<button id = \"btn2\">DBOW</button>"
        btn_holder += "</div>";
    canv.innerHTML += btn_holder;
    const btn1 = document.getElementById( "btn1" ),
          btn2 = document.getElementById( "btn2" );
    btn1.addEventListener( "click", () => { canv.dataset.mode = "dm";     updater(1); } );
    btn2.addEventListener( "click", () => { canv.dataset.mode =   "dbow"; updater(1); } );
    btn1.addEventListener( "mouseover", () => { setfooter( "dm" ); } ); //sets footer when mousing over
    btn2.addEventListener( "mouseover", () => { setfooter( "dbo" ); } );
    btn1.addEventListener( "mouseout",  () => { setfooter( "default" ); } ); //resets footer when mouse off
    btn2.addEventListener( "mouseout",  () => { setfooter( "default" ); } );

    const img = document.createElement('img');
    img.src = 'assets/para2vecstep.png';
    canv.appendChild(img);
}

function Input()
{
  sidebar.innerHTML = "";
  setfooter("default");

 const tableContainer2 = document.createElement("div");
 tableContainer2.style.display = "flex";
 tableContainer2.style.justifyContent = "space-between";
 tableContainer2.style.flexDirection = "column";

  const table7 = document.createElement("table");
  table7.style.marginTop = "10px";
  table7.style.marginLeft = "135px";
  table7.style.color = "white";
  table7.style.borderColor = "white";
  table7.innerHTML += "<caption style=\"font-size: 30px\"> Sen2vec Parameters </caption>";
  table7.innerHTML += "<tr><td><div>Epoch = 2<div></td></tr>";
  table7.innerHTML += "<tr><td><div>Batch Size = 2<div></td></tr>";
  table7.innerHTML += "<tr><td><div>Vector Dimensions = 4<div></td></tr>";
  table7.innerHTML += "<tr><td><div>Learning Rate = 1e^-3<div></td></tr>";
  table7.innerHTML += "<tr><td><div>Context Size = 1<div></td></tr>";

  const table5 = document.createElement("table");
  table5.style.marginTop = "50px";
  table5.style.marginRight = "10px";
  table5.style.marginLeft = "10px";
  table5.style.color = "white";
  table5.style.borderColor = "white";
  table5.innerHTML += "<caption style=\"font-size: 30px\"> Input Data </caption>";
  table5.innerHTML += "<tr><td><div>I love Data Science<div></td></tr>";
  table5.innerHTML += "<tr><td><div>I enjoy Data Science<div></td></tr>";
  table5.innerHTML += "<tr><td><div>Data Science is my favorite, because I love Data Science<div></td></tr>";
  table5.innerHTML += "<tr><td><div>I do enjoy Data Science<div></td></tr>";
  table5.innerHTML += "<tr><td><div>I dislike Data Science<div></td></tr>";

  const table6 = document.createElement("table");
  table6.style.marginTop = "50px";
  table6.style.marginLeft = "135px";
  table6.style.marginBottom = '80px';
  table6.style.color = "white";
  table6.style.borderColor = "white";
  table6.innerHTML += "<caption style=\"font-size: 30px\"> Vocabulary </caption>";
  table6.innerHTML += "<tr><td><div>I<div></td><td><div>favorite<div></td></tr>";
  table6.innerHTML += "<tr><td><div>love<div></td><td><div>because<div></td></tr>";
  table6.innerHTML += "<tr><td><div>data<div></td><td><div>do<div></td></tr>";
  table6.innerHTML += "<tr><td><div>science<div></td><td><div>my<div></td></tr>";
  table6.innerHTML += "<tr><td><div>enjoy<div></td><td><div>dislike<div></td></tr>";
  table6.innerHTML += "<tr><td><div>is<div></td><td><div>boring<div></td></tr>";

  tableContainer2.appendChild(table7);
  tableContainer2.appendChild(table5);
  tableContainer2.appendChild(table6);

  sidebar.appendChild(tableContainer2);

  canv.innerHTML = meta(); //resets canvas html by re-initializing as meta() output

  const tableContainer = document.createElement("div");
  tableContainer.style.display = "flex";
  tableContainer.style.justifyContent = "space-between";

  const table1 = document.createElement("table");
  table1.style.marginTop = "250px";
  table1.style.marginRight = "10px";
  table1.style.marginLeft = "10px";
  table1.innerHTML += "<caption style=\"font-size: 30px\"> Input Data for Sen2vec Algorithm </caption>";
  table1.innerHTML += "<tr><td><div>I love Data Science<div></td></tr>";
  table1.innerHTML += "<tr><td><div>I enjoy Data Science<div></td></tr>";
  table1.innerHTML += "<tr><td><div>Data Science is my favorite, because I love Data Science<div></td></tr>";
  table1.innerHTML += "<tr><td><div>I do enjoy Data Science<div></td></tr>";
  table1.innerHTML += "<tr><td><div>I dislike Data Science<div></td></tr>";

  const table3 = document.createElement("table");
  table3.style.marginTop = "250px";
  table3.style.marginRight = "10px";
  table3.style.marginLeft = "10px";
  table3.innerHTML += "<caption style=\"font-size: 30px\"> Create Paragraph IDs </caption>";
  table3.innerHTML += "<tr><td><div> 0 <div></td><td><div>I love Data Science<div></td></tr>";
  table3.innerHTML += "<tr><td><div> 1 <div></td><td><div>I enjoy Data Science<div></td></tr>";
  table3.innerHTML += "<tr><td><div> 2 <div></td><td><div>Data Science is my favorite, because I love Data Science<div></td></tr>";
  table3.innerHTML += "<tr><td><div> 3 <div></td><td><div>I do enjoy Data Science<div></td></tr>";
  table3.innerHTML += "<tr><td><div> 4 <div></td><td><div>I dislike Data Science<div></td></tr>";

  const table2 = document.createElement("table");
  table2.style.marginTop = "250px";
  table2.style.marginLeft = "10px";
  table2.style.marginRight = '10px';
  table2.innerHTML += "<caption style=\"font-size: 30px\"> Create Vocabulary </caption>";
  table2.innerHTML += "<tr><td><div>I<div></td><td><div>favorite<div></td></tr>";
  table2.innerHTML += "<tr><td><div>love<div></td><td><div>because<div></td></tr>";
  table2.innerHTML += "<tr><td><div>data<div></td><td><div>do<div></td></tr>";
  table2.innerHTML += "<tr><td><div>science<div></td><td><div>my<div></td></tr>";
  table2.innerHTML += "<tr><td><div>enjoy<div></td><td><div>dislike<div></td></tr>";
  table2.innerHTML += "<tr><td><div>is<div></td><td><div>boring<div></td></tr>";

  const table4 = document.createElement("table");
  table4.style.marginTop = "250px";
  table4.style.marginRight = "10px";
  table4.style.marginLeft = "10px";
  table4.innerHTML += "<caption style=\"font-size: 30px\"> Initialize Word Vectors </caption>";
  table4.innerHTML += "<tr><td><div>I <div></td><td><div>0.237, 0.016, 0.583, 0.286<div></td><td><div>favorite <div></td><td><div>1.154, 0.616, 0.893, 0.643<div></td></tr>";
  table4.innerHTML += "<tr><td><div>love <div></td><td><div>-1.689, 0.213, 0.871, 0.928<div></td><td><div>because <div></td><td><div>0.507, 0.264, 0.739, 0.234<div></td></tr>";
  table4.innerHTML += "<tr><td><div>data <div></td><td><div>1.538, 0.735, 0.120, 1.486<div></td><td><div>do <div></td><td><div>0.147, 0.246, 0.829, 0.873<div></td></tr>";
  table4.innerHTML += "<tr><td><div>science <div></td><td><div>-0.388, 0.987, 0.346, 1.243<div></td><td><div>my <div></td><td><div>-0.707, -0.124, -0.829, 0.123div></td></tr>";
  table4.innerHTML += "<tr><td><div>enjoy<div></td><td><div>-0.829, 0.378, 0.199, 0.128<div></td><td><div>dislike <div></td><td><div>-0.339, 1.527, 1.276, 0.246<div></td></tr>";
  table4.innerHTML += "<tr><td><div>is <div></td><td><div>-1.710, 0.233, 0.789,-0.123<div></td><td><div>boring <div></td><td><div>1.129, 0.125, 0.525, 0.245<div></td></tr>";

  const container = document.createElement("div");
  container.innerHTML += ">>";
  container.style.fontSize = "32px";
  container.style.marginTop = '35vh';

  const container2 = document.createElement("div");
  container2.innerHTML += ">>";
  container2.style.fontSize = "32px";
  container2.style.marginTop = '35vh';

  const container3 = document.createElement("div");
  container3.innerHTML += ">>";
  container3.style.fontSize = "32px";
  container3.style.marginTop = '35vh';

  tableContainer.appendChild(table1);
  tableContainer.appendChild(container);
  tableContainer.appendChild(table3);
  tableContainer.appendChild(container2);
  tableContainer.appendChild(table2);
  tableContainer.appendChild(container3);
  tableContainer.appendChild(table4);

  const img = document.createElement('img');
  img.src = 'assets/para2vecstep.png';
  canv.appendChild(img);

  canv.appendChild(tableContainer);
}

  function InputMatrix() {
    sidebar.innerHTML = '';
    canv.innerHTML = meta();
    canv.innerHTML += "<tr><td>&nbsp;</td></tr>";
    const tableContainer = document.createElement("div");
    tableContainer.style.display = "flex";
    tableContainer.style.justifyContent = "space-between";
  
    const table1 = document.createElement("table");
    table1.style.marginTop = "250px";
    table1.style.marginLeft = "50px";
    table1.innerHTML += "<caption style=\"font-size: 30px\"> DM Input Matrix With Words </caption>";
    table1.innerHTML += "<tr><td><div>Paragraph ID<div></td><td><div>Context Word<div></td><td><div>Context Word<div></td><td><div>Center Word<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0<div></td><td><div>love<div></td><td><div>science<div></td><td><div>data<div></td></tr>";
    table1.innerHTML += "<tr><td><div>1<div></td><td><div>I<div></td><td><div>data<div></td><td><div>enjoy<div></td></tr>";
    table1.innerHTML += "<tr><td><div>2<div></td><td><div>my<div></td><td><div>because<div></td><td><div>favorite<div></td></tr>";
    table1.innerHTML += "<tr><td><div>3<div></td><td><div>do<div></td><td><div>enjoy<div></td><td><div>data<div></td></tr>";
    table1.innerHTML += "<tr><td><div>4<div></td><td><div>I<div></td><td><div>data<div></td><td><div>dislike<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0<div></td><td><div>I<div></td><td><div>data<div></td><td><div>love<div></td></tr>";
    table1.innerHTML += "<tr><td><div>1<div></td><td><div>enjoy<div></td><td><div>science<div></td><td><div>data<div></td></tr>";
    table1.innerHTML += "<tr><td><div>2<div></td><td><div>science<div></td><td><div>my<div></td><td><div>is<div></td></tr>";
    table1.innerHTML += "<tr><td><div>3<div></td><td><div>do<div></td><td><div>data<div></td><td><div>enjoy<div></td></tr>";
    table1.innerHTML += "<tr><td><div>4<div></td><td><div>dislike<div></td><td><div>science<div></td><td><div>data<div></td></tr>";

    const table2 = document.createElement("table");
    table2.style.marginTop = "250px";
    table2.style.marginRight = "50px";
    table2.innerHTML += "<caption style=\"font-size: 30px\"> DM Input Matrix With Values</caption>";
    table2.innerHTML += "<tr><td><div>Paragraph ID<div></td><td><div>Context Word<div></td><td><div>Context Word<div></td><td><div>Center Word<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0<div></td><td><div>-1.689, 0.213, 0.871, 0.928<div></td><td><div>-0.388, 0.987, 0.346, 1.243<div></td><td><div>1.538, 0.735, 0.120, 1.486<div></td></tr>";
    table2.innerHTML += "<tr><td><div>1<div></td><td><div>0.237, 0.016, 0.583, 0.286<div></td><td><div>1.538, 0.735, 0.120, 1.486<div></td><td><div>-0.829, 0.378, 0.199, 0.128<div></td></tr>";
    table2.innerHTML += "<tr><td><div>2<div></td><td><div>-0.707, -0.124, -0.829, 0.123<div></td><td><div>0.507, 0.264, 0.739, 0.234<div></td><td><div>1.154, 0.616, 0.893, 0.643<div></td></tr>";
    table2.innerHTML += "<tr><td><div>3<div></td><td><div>0.147, 0.246, 0.829, 0.873<div></td><td><div>-0.829, 0.378, 0.199, 0.128<div></td><td><div>1.538, 0.735, 0.120, 1.486<div></td></tr>";
    table2.innerHTML += "<tr><td><div>4<div></td><td><div>0.237, 0.016, 0.583, 0.286<div></td><td><div>1.538, 0.735, 0.120, 1.486<div></td><td><div>-0.339, 1.527, 1.276, 0.246<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0<div></td><td><div>0.237, 0.016, 0.583, 0.286<div></td><td><div>1.538, 0.735, 0.120, 1.486<div></td><td><div>-1.689, 0.213, 0.871, 0.928<div></td></tr>";
    table2.innerHTML += "<tr><td><div>1<div></td><td><div>-0.829, 0.378, 0.199, 0.128<div></td><td><div>-0.388, 0.987, 0.346, 1.243<div></td><td><div>1.538, 0.735, 0.120, 1.486<div></td></tr>";
    table2.innerHTML += "<tr><td><div>2<div></td><td><div>-0.388, 0.987, 0.346, 1.243<div></td><td><div>-0.707, -0.124, -0.829, 0.123<div></td><td><div>-1.710, 0.233, 0.789,-0.123<div></td></tr>";
    table2.innerHTML += "<tr><td><div>3<div></td><td><div>0.147, 0.246, 0.829, 0.873<div></td><td><div>1.538, 0.735, 0.120, 1.486<div></td><td><div>-0.829, 0.378, 0.199, 0.128<div></td></tr>";
    table2.innerHTML += "<tr><td><div>4<div></td><td><div>-0.339, 1.527, 1.276, 0.246<div></td><td><div>-0.388, 0.987, 0.346, 1.243<div></td><td><div>1.538, 0.735, 0.120, 1.486<div></td></tr>";

    const container = document.createElement("div");
    container.innerHTML += ">>";
    container.style.fontSize = "32px";
    container.style.marginTop = '35vh';

    tableContainer.appendChild(table1);
    tableContainer.appendChild(container);
    tableContainer.appendChild(table2);

    const img = document.createElement('img');
    img.src = 'assets/para2vecstep2.png';
    canv.appendChild(img);
    
  
    canv.appendChild(tableContainer);

    const table3 = document.createElement("table");
    table3.style.marginTop = "5px";
    table3.style.marginRight = "10px";
    table3.style.marginLeft = "10px";
    table3.style.color = "white";
    table3.style.borderColor = "white";
    table3.innerHTML += "<caption style=\"font-size: 30px\"> DM Input Matrix With Words </caption>";
    table3.innerHTML += "<tr><td><div>Paragraph ID<div></td><td><div>Context Word<div></td><td><div>Context Word<div></td><td><div>Center Word<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0<div></td><td><div>love<div></td><td><div>science<div></td><td><div>data<div></td></tr>";
    table3.innerHTML += "<tr><td><div>1<div></td><td><div>I<div></td><td><div>data<div></td><td><div>enjoy<div></td></tr>";
    table3.innerHTML += "<tr><td><div>2<div></td><td><div>my<div></td><td><div>because<div></td><td><div>favorite<div></td></tr>";
    table3.innerHTML += "<tr><td><div>3<div></td><td><div>do<div></td><td><div>enjoy<div></td><td><div>data<div></td></tr>";
    table3.innerHTML += "<tr><td><div>4<div></td><td><div>I<div></td><td><div>data<div></td><td><div>dislike<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0<div></td><td><div>I<div></td><td><div>data<div></td><td><div>love<div></td></tr>";
    table3.innerHTML += "<tr><td><div>1<div></td><td><div>enjoy<div></td><td><div>science<div></td><td><div>data<div></td></tr>";
    table3.innerHTML += "<tr><td><div>2<div></td><td><div>science<div></td><td><div>my<div></td><td><div>is<div></td></tr>";
    table3.innerHTML += "<tr><td><div>3<div></td><td><div>do<div></td><td><div>data<div></td><td><div>enjoy<div></td></tr>";
    table3.innerHTML += "<tr><td><div>4<div></td><td><div>dislike<div></td><td><div>science<div></td><td><div>data<div></td></tr>";

    const tableContainer2 = document.createElement("div");
    tableContainer2.style.display = "flex";
    tableContainer2.style.flexDirection = "column";

    const table7 = document.createElement("table");
    table7.style.marginTop = "10px";
    table7.style.marginLeft = "135px";
    table7.style.marginBottom = "10px";
    table7.style.color = "white";
    table7.style.borderColor = "white";
    table7.innerHTML += "<caption style=\"font-size: 30px\"> Sen2vec Parameters </caption>";
    table7.innerHTML += "<tr><td><div>Epoch = 2<div></td></tr>";
    table7.innerHTML += "<tr><td><div>Batch Size = 2<div></td></tr>";
    table7.innerHTML += "<tr><td><div>Vector Dimensions = 4<div></td></tr>";
    table7.innerHTML += "<tr><td><div>Learning Rate = 1e^-3<div></td></tr>";
    table7.innerHTML += "<tr><td><div>Context Size = 1<div></td></tr>";

    const table5 = document.createElement("table");
    table5.style.marginRight = "10px";
    table5.style.marginTop = "10px";
    table5.style.marginLeft = "10px";
    table5.style.color = "white";
    table5.style.borderColor = "white";
    table5.innerHTML += "<caption style=\"font-size: 30px\"> Input Data </caption>";
    table5.innerHTML += "<tr><td><div>I love Data Science<div></td></tr>";
    table5.innerHTML += "<tr><td><div>I enjoy Data Science<div></td></tr>";
    table5.innerHTML += "<tr><td><div>Data Science is my favorite, because I love Data Science<div></td></tr>";
    table5.innerHTML += "<tr><td><div>I do enjoy Data Science<div></td></tr>";
    table5.innerHTML += "<tr><td><div>I dislike Data Science<div></td></tr>";

    const table6 = document.createElement("table");
    table6.style.marginTop = "10px";
    table6.style.marginLeft = "135px";
    table6.style.color = "white";
    table6.style.borderColor = "white";
    table6.innerHTML += "<caption style=\"font-size: 30px\"> Vocabulary </caption>";
    table6.innerHTML += "<tr><td><div>I<div></td><td><div>favorite<div></td></tr>";
    table6.innerHTML += "<tr><td><div>love<div></td><td><div>because<div></td></tr>";
    table6.innerHTML += "<tr><td><div>data<div></td><td><div>do<div></td></tr>";
    table6.innerHTML += "<tr><td><div>science<div></td><td><div>my<div></td></tr>";
    table6.innerHTML += "<tr><td><div>enjoy<div></td><td><div>dislike<div></td></tr>";
    table6.innerHTML += "<tr><td><div>is<div></td><td><div>boring<div></td></tr>";

    tableContainer2.appendChild(table7);
    tableContainer2.appendChild(table5);
    tableContainer2.appendChild(table6);
    tableContainer2.appendChild(table3);

    sidebar.appendChild(tableContainer2);
  }

  function Initialize() {
    setfooter("default");
    canv.innerHTML = meta();
  
    const tableContainer = document.createElement("div");
    tableContainer.style.display = "flex";
  
    const table1 = document.createElement("table");
    table1.style.marginTop = "250px";
    table1.style.marginLeft = "175px";
    table1.style.marginRight = "125px";
    table1.innerHTML += "<caption style=\"font-size: 30px\"> Initialize Word Weight Matrix </caption>";
    table1.innerHTML += "<tr><td><div>0.264, -0.441, 0.329, 0.126<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>-0.3017, -0.132, -0.383, 0.107<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>-0.1947, -0.267, -0.122, -0.013<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.2895, -0.869, 0.188, -0.041<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>-0.1398, 0.877, -0.199, -0.076<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.1572, 0.047, -0.071, 0.209<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.3528, 0.294, 0.167, -0.204<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>-0.1549, -0.828, 0.285, 0.167<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>-0.2036, -0.192, 0.148, 0.134<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.2754, 0.074, -0.325, -0.215<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.3442, -0.206, -0.007, -0.106<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.1058, 0.121, -0.187, -0.228<div></td><td><div>";
  
    const table2 = document.createElement("table");
    table2.style.marginTop = "250px";
    table2.style.marginLeft = "125px";
    table2.style.marginRight = "125px";
    table2.innerHTML += "<caption style=\"font-size: 30px\"> Initialize Paragraph Weight Matrix </caption>";
    table2.innerHTML += "<tr><td><div>0.031, 0.398, -0.447, 0.273<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>-0.323, -0.002, 0.005, 0.942<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>-0.043, 0.027, -0.224, -0.094<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>0.119, 0.118, 0.427, 0.102<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>-0.376, -0.109, 0.127, -0.461<div></td><td><div>";

    const table3 = document.createElement("table");
    table3.style.marginTop = "250px";
    table3.style.marginRight = "125px";
    table3.style.marginLeft = "125px";
    table3.innerHTML += "<caption style=\"font-size: 30px\"> Initialize Bias Matrix </caption>";
    table3.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";

    const container = document.createElement("div");
    container.innerHTML += ">>";
    container.style.fontSize = "32px";
    container.style.marginTop = '35vh';

    const container2 = document.createElement("div");
    container2.innerHTML += ">>";
    container2.style.fontSize = "32px";
    container2.style.marginTop = '35vh';

    tableContainer.appendChild(table1);
    tableContainer.appendChild(container);
    tableContainer.appendChild(table2);
    tableContainer.appendChild(container2);
    tableContainer.appendChild(table3);
  
    const img = document.createElement('img');
    img.src = 'assets/para2vecstep2.png';
    canv.appendChild(img);

    canv.appendChild(tableContainer);

  }

  function ComputeCenter() {
    setfooter("center");
    canv.innerHTML = meta();
  
    const tableContainer = document.createElement("div");
    tableContainer.style.display = "flex";
    tableContainer.style.justifyContent = "space-between";
  
    const table1 = document.createElement("table");
    table1.style.marginTop = "250px";
    table1.style.marginLeft = "10px";
    table1.innerHTML += "<caption style=\"font-size: 30px\"> Input Vectors </caption>";
    table1.innerHTML += "<tr><td><div>Paragraph<div></td><td><div>Paragraph<div></td><td><div>Paragraph<div></td><td><div>Paragraph<div></td><td><div>Context 1<div></td><td><div>Context 1<div></td><td><div>Context 1<div></td><td><div>Context 1<div></td><td><div>Context 2<div></td><td><div>Context 2<div></td><td><div>Context 2<div></td><td><div>Context 2<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.031<div></td><td><div> 0.398<div></td><td><div> -0.447<div></td><td><div> 0.273<div></td><td><div>-1.689<div></td><td><div> 0.213<div></td><td><div> 0.871<div></td><td><div> 0.928<div></td><td><div>-0.388<div></td><td><div> 0.987<div></td><td><div> 0.346<div></td><td><div> 1.243<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>-0.323<div></td><td><div> -0.002<div></td><td><div> 0.005<div></td><td><div> 0.942<div></td><td><div>0.237<div></td><td><div> 0.016<div></td><td><div> 0.583<div></td><td><div> 0.286<div></td><td><div>1.538<div></td><td><div> 0.735<div></td><td><div> 0.120<div></td><td><div> 1.486<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>-0.043<div></td><td><div> 0.027<div></td><td><div> -0.224<div></td><td><div> -0.094<div></td><td><div>-0.707<div></td><td><div> -0.124<div></td><td><div> -0.829<div></td><td><div> 0.123<div></td><td><div>0.507<div></td><td><div> 0.264<div></td><td><div> 0.739<div></td><td><div> 0.234<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.119<div></td><td><div> 0.118<div></td><td><div> 0.427<div></td><td><div> 0.102<div></td><td><div>0.147<div></td><td><div> 0.246<div></td><td><div> 0.829<div></td><td><div> 0.873<div></td><td><div>-0.829<div></td><td><div> 0.378<div></td><td><div> 0.199<div></td><td><div> 0.128<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>-0.376<div></td><td><div> -0.109<div></td><td><div> 0.127<div></td><td><div> -0.461<div></td><td><div>0.237<div></td><td><div> 0.016<div></td><td><div> 0.583<div></td><td><div> 0.286<div></td><td><div>1.538<div></td><td><div> 0.735<div></td><td><div> 0.120<div></td><td><div> 1.486<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.031<div></td><td><div> 0.398<div></td><td><div> -0.447<div></td><td><div> 0.273<div></td><td><div>0.237<div></td><td><div> 0.016<div></td><td><div> 0.583<div></td><td><div> 0.286<div></td><td><div>1.538<div></td><td><div> 0.735<div></td><td><div> 0.120<div></td><td><div> 1.486<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>-0.323<div></td><td><div> -0.002<div></td><td><div> 0.005<div></td><td><div> 0.942<div></td><td><div>-0.829<div></td><td><div> 0.378<div></td><td><div> 0.199<div></td><td><div> 0.128<div></td><td><div>-0.388<div></td><td><div> 0.987<div></td><td><div> 0.346<div></td><td><div> 1.243<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>-0.043<div></td><td><div> 0.027<div></td><td><div> -0.224<div></td><td><div> -0.094<div></td><td><div>-0.388<div></td><td><div> 0.987<div></td><td><div> 0.346<div></td><td><div> 1.243<div></td><td><div>-0.707<div></td><td><div> -0.124<div></td><td><div> -0.829<div></td><td><div> 0.123<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.119<div></td><td><div> 0.118<div></td><td><div> 0.427<div></td><td><div> 0.102<div></td><td><div>0.147<div></td><td><div> 0.246<div></td><td><div> 0.829<div></td><td><div> 0.873<div></td><td><div>1.538<div></td><td><div> 0.735<div></td><td><div> 0.120<div></td><td><div> 1.486<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>-0.376<div></td><td><div> -0.109<div></td><td><div> 0.127<div></td><td><div> -0.461<div></td><td><div>-0.339<div></td><td><div> 1.527<div></td><td><div> 1.276<div></td><td><div> 0.246<div></td><td><div>-0.388<div></td><td><div> 0.987<div></td><td><div> 0.346<div></td><td><div> 1.243<div></td></tr>";
  
    const table2 = document.createElement("table");
    table2.style.marginTop = "240px";
    table2.innerHTML += "<caption style=\"font-size: 30px\"> Initialize Word Weight Matrix </caption>";
    table2.innerHTML += "<tr><td><div>0.264<div></td><td><div> -0.441<div></td><td><div> 0.329<div></td><td><div> 0.126<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>-0.3017<div></td><td><div> -0.132<div></td><td><div> -0.383<div></td><td><div> 0.107<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>-0.1947<div></td><td><div> -0.267<div></td><td><div> -0.122<div></td><td><div> -0.013<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>0.2895<div></td><td><div> -0.869<div></td><td><div> 0.188<div></td><td><div> -0.041<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>-0.1398<div></td><td><div> 0.877<div></td><td><div> -0.199<div></td><td><div> -0.076<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>0.1572<div></td><td><div> 0.047<div></td><td><div> -0.071<div></td><td><div> 0.209<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>0.3528<div></td><td><div> 0.294<div></td><td><div> 0.167<div></td><td><div> -0.204<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>-0.1549<div></td><td><div> -0.828<div></td><td><div> 0.285<div></td><td><div> 0.167<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>-0.2036<div></td><td><div> -0.192<div></td><td><div> 0.148<div></td><td><div> 0.134<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>0.2754<div></td><td><div> 0.074<div></td><td><div> -0.325<div></td><td><div> -0.215<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>0.3442<div></td><td><div> -0.206<div></td><td><div> -0.007<div></td><td><div> -0.106<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>0.1058<div></td><td><div> 0.121<div></td><td><div> -0.187<div></td><td><div> -0.228<div></td><td><div>";

    const table3 = document.createElement("table");
    table3.style.marginTop = "250px";
    table3.style.marginRight = "10px";
    table3.innerHTML += "<caption style=\"font-size: 30px\"> Predicted Center Word Matrix </caption>";
    table3.innerHTML += "<tr><td><div>1.088<div></td><td><div> -1.940<div></td><td><div>   0.081<div></td><td><div>  -0.392<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>0.405<div></td><td><div> -0.619<div></td><td><div>  -0.088<div></td><td><div>  -0.468<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>0.013<div></td><td><div> -1.016<div></td><td><div>  -0.028<div></td><td><div>   0.101<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>0.472<div></td><td><div> -0.447<div></td><td><div>   0.030<div></td><td><div>  -0.207<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>-0.005<div></td><td><div>  0.604<div></td><td><div>  -0.343<div></td><td><div>   -0.431<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>0.272<div></td><td><div> -0.126<div></td><td><div>   -0.195<div></td><td><div>  -0.348<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>1.014<div></td><td><div> -1.207<div></td><td><div>   -0.334<div></td><td><div>  -0.541<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>-0.026<div></td><td><div> -0.752<div></td><td><div>   0.322<div></td><td><div>   0.368<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>0.205<div></td><td><div> -0.695<div></td><td><div>   0.011<div></td><td><div>  -0.268<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>1.076<div></td><td><div>  0.719<div></td><td><div>  -0.554<div></td><td><div>  -0.500<div></td><td><div>";

    const container = document.createElement("div");
    container.innerHTML += "*";
    container.style.fontSize = "32px";
    container.style.marginTop = '35vh';

    const container2 = document.createElement("div");
    container2.innerHTML += ">>";
    container2.style.fontSize = "32px";
    container2.style.marginTop = '35vh';

    tableContainer.appendChild(table1);
    tableContainer.appendChild(container);
    tableContainer.appendChild(table2);
    tableContainer.appendChild(container2);
    tableContainer.appendChild(table3);
  
    const img = document.createElement('img');
    img.src = 'assets/para2vecstep2.png';
    canv.appendChild(img);

    canv.appendChild(tableContainer);

  }

  function HiddenLayer() {
    setfooter("default");
    canv.innerHTML = meta();
  
    const tableContainer = document.createElement("div");
    tableContainer.style.display = "flex";
    tableContainer.style.justifyContent = "space-between";
  
    const table1 = document.createElement("table");
    table1.style.marginTop = "250px";
    table1.style.marginLeft = "175px";
    table1.style.marginRight = "125px";
    table1.style.height = "10vh";
    table1.innerHTML += "<caption style=\"font-size: 30px\"> Predicted Center Word Matrix </caption>";
    table1.innerHTML += "<tr><td><div>1.088, -1.940,   0.081,  -0.392<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.405, -0.619,  -0.088,  -0.468<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.013, -1.016,  -0.028,   0.101<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.472, -0.447,   0.030,  -0.207<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>-0.005,  0.604,  -0.343,   -0.431<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.272, -0.126,   -0.195,  -0.348<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>1.014, -1.207,   -0.334,  -0.541<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>-0.026, -0.752,   0.322,   0.368<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.205, -0.695,   0.011,  -0.268<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>1.076,  0.719,  -0.554,  -0.500<div></td><td><div>";

    const table4 = document.createElement("table");
    table4.style.marginTop = "250px";
    table4.style.marginRight = "125px";
    table4.style.marginLeft = "125px";
    table4.style.height = "10vh";
    table4.innerHTML += "<caption style=\"font-size: 30px\"> Bias Matrix </caption>";
    table4.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table4.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table4.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table4.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table4.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table4.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table4.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table4.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table4.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table4.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
  
    const table2 = document.createElement("table");
    table2.style.marginTop = "250px";
    table2.style.marginRight = "125px";
    table2.style.marginLeft = "125px";
    table2.style.height = "10vh";
    table2.innerHTML += "<caption style=\"font-size: 30px\"> Hyperbolic Tangent Matrix After Bias </caption>";
    table2.innerHTML += "<tr><td><div>0.796 -0.96   0.081 -0.374<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>0.385 -0.551 -0.088 -0.437<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>0.013 -0.768 -0.028  0.101<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>0.44  -0.42   0.031 -0.205<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>-0.006  0.54  -0.331 -0.406<div></td><td><div>";
    table2.innerHTML += "<tr><td><div> 0.266 -0.126 -0.193 -0.335<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>0.767 -0.836 -0.322 -0.494<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>-0.027 -0.636  0.312  0.353<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>0.203 -0.601  0.012 -0.262<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>0.792  0.617 -0.504 -0.462<div></td><td><div>";

    const container = document.createElement("div");
    container.innerHTML += "+";
    container.style.fontSize = "32px";
    container.style.marginTop = '35vh';

    const container2 = document.createElement("div");
    container2.innerHTML += ">>";
    container2.style.fontSize = "32px";
    container2.style.marginTop = '35vh';

    tableContainer.appendChild(table1);
    tableContainer.appendChild(container);
    tableContainer.appendChild(table4);
    tableContainer.appendChild(container2);
    tableContainer.appendChild(table2);
  
    const img = document.createElement('img');
    img.src = 'assets/para2vecste3.png';
    canv.appendChild(img);

    canv.appendChild(tableContainer);

  }
  
  function ComputeSoftmax() {
    setfooter("default");
    canv.innerHTML = meta();
  
    const tableContainer = document.createElement("div");
    tableContainer.style.display = "flex";
    tableContainer.style.justifyContent = "space-between";

    const table1 = document.createElement("table");
    table1.style.marginTop = "250px";
    table1.style.marginLeft = "10px";
    table1.style.height = "10vh";
    table1.innerHTML += "<caption style=\"font-size: 30px\"> Predicted Center Word Matrix After Bias + Hyperbolic Tangent function </caption>";
    table1.innerHTML += "<tr><td><div>0.796 -0.96   0.081 -0.374<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.385 -0.551 -0.088 -0.437<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.013 -0.768 -0.028  0.101<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.44  -0.42   0.031 -0.205<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>-0.006  0.54  -0.331 -0.406<div></td><td><div>";
    table1.innerHTML += "<tr><td><div> 0.266 -0.126 -0.193 -0.335<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.767 -0.836 -0.322 -0.494<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>-0.027 -0.636  0.312  0.353<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.203 -0.601  0.012 -0.262<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.792  0.617 -0.504 -0.462<div></td><td><div>";
  
    const table2 = document.createElement("table");
    table2.style.marginTop = "250px";
    table2.style.marginLeft = "10px";
    table2.style.height = "10vh";
    table2.innerHTML += "<caption style=\"font-size: 30px\"> Predicted Center Word Matrix After Softmax </caption>";
    table2.innerHTML += "<tr><td><div>0.07  0.003 0.026 0.016<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>0.036 0.013 0.022 0.015<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>0.024 0.009 0.023 0.026<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>0.038 0.015 0.024 0.019<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>0.024 0.043 0.017 0.015<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>0.031 0.021 0.019 0.017<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>0.065 0.007 0.017 0.014<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>0.023 0.011 0.033 0.034<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>0.029 0.012 0.024 0.018<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>0.07  0.049 0.014 0.014<div></td><td><div>";

    const table5 = document.createElement("table");
    table5.style.marginTop = "250px";
    table5.style.marginLeft = "10px";
    table5.style.height = "10vh";
    table5.innerHTML += "<caption style=\"font-size: 30px\"> True Center Word Matrix </caption>";
    table5.innerHTML += "<tr><td><div>1.538, 0.735, 0.120, 1.486<div></td><td><div>";
    table5.innerHTML += "<tr><td><div>-0.829, 0.378, 0.199, 0.128<div></td><td><div>";
    table5.innerHTML += "<tr><td><div>1.154, 0.616, 0.893, 0.643<div></td><td><div>";
    table5.innerHTML += "<tr><td><div>1.538, 0.735, 0.120, 1.486<div></td><td><div>";
    table5.innerHTML += "<tr><td><div>-0.339, 1.527, 1.276, 0.246<div></td><td><div>";
    table5.innerHTML += "<tr><td><div>-1.689, 0.213, 0.871, 0.928<div></td><td><div>";
    table5.innerHTML += "<tr><td><div>1.538, 0.735, 0.120, 1.486<div></td><td><div>";
    table5.innerHTML += "<tr><td><div>-1.710, 0.233, 0.789,-0.123<div></td><td><div>";
    table5.innerHTML += "<tr><td><div>-0.829, 0.378, 0.199, 0.128<div></td><td><div>";
    table5.innerHTML += "<tr><td><div>1.538, 0.735, 0.120, 1.486<div></td><td><div>";

    const table3 = document.createElement("table");
    table3.style.marginTop = "250px";
    table3.style.marginLeft = "10px";
    table3.style.marginRight = "10px";
    table3.innerHTML += "<caption style=\"font-size: 30px\"> Predicted Center Word Matrix After Loss Function </caption>";
    table3.innerHTML += "<tr><td><div>4.081  4.177  0.439  6.145<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>-2.766  1.649  0.762  0.539<div></td><td><div>";
    table3.innerHTML += "<tr><td><div> 4.303  2.931  3.367  2.341<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>5.029  3.08   0.445  5.87<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>-1.271  4.792  5.214  1.027<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>-5.86   0.824  3.43   3.796<div></td><td><div>";
    table3.innerHTML += "<tr><td><div> 4.196  3.638  0.489  6.365<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>-6.445  1.047  2.698 -0.415<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>-2.932  1.677  0.742  0.513<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>4.1    2.222  0.516  6.305<div></td><td><div>";

    const container2 = document.createElement("div");
    container2.innerHTML += ">>";
    container2.style.fontSize = "32px";
    container2.style.marginTop = '35vh';

    const container3 = document.createElement("div");
    container3.innerHTML += ">>";
    container3.style.fontSize = "32px";
    container3.style.marginTop = '35vh';

    const container4 = document.createElement("div");
    container4.innerHTML += ">>";
    container4.style.fontSize = "32px";
    container4.style.marginTop = '35vh';

    tableContainer.appendChild(table1);
    tableContainer.appendChild(container2);
    tableContainer.appendChild(table2);
    tableContainer.appendChild(container3);
    tableContainer.appendChild(table5);
    tableContainer.appendChild(container4);
    tableContainer.appendChild(table3);
  
    const img = document.createElement('img');
    img.src = 'assets/para2vecstep4.png';
    canv.appendChild(img);

    canv.appendChild(tableContainer);

  }

  function UpdateWeightBias() {
    setfooter("default");
    canv.innerHTML = meta();
  
    const tableContainer = document.createElement("div");
    tableContainer.style.display = "flex";
    tableContainer.style.justifyContent = "space-between";

    const table1 = document.createElement("table");
    table1.style.marginTop = "250px";
    table1.innerHTML += "<caption style=\"font-size: 30px\"> Initial Word Weight Matrix </caption>";
    table1.innerHTML += "<tr><td><div>0.264, -0.441, 0.329, 0.126<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>-0.3017, -0.132, -0.383, 0.107<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>-0.1947, -0.267, -0.122, -0.013<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.2895, -0.869, 0.188, -0.041<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>-0.1398, 0.877, -0.199, -0.076<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.1572, 0.047, -0.071, 0.209<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.3528, 0.294, 0.167, -0.204<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>-0.1549, -0.828, 0.285, 0.167<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>-0.2036, -0.192, 0.148, 0.134<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.2754, 0.074, -0.325, -0.215<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.3442, -0.206, -0.007, -0.106<div></td><td><div>";
    table1.innerHTML += "<tr><td><div>0.1058, 0.121, -0.187, -0.228<div></td><td><div>";

    const table4 = document.createElement("table");
    table4.style.marginTop = "250px";
    table4.innerHTML += "<caption style=\"font-size: 30px\"> Updated Word Weight Matrix </caption>";
    table4.innerHTML += "<tr><td><div>0.264, -0.441, 0.329, 0.126<div></td><td><div>";
    table4.innerHTML += "<tr><td><div>-0.3017, -0.132, -0.383, 0.107<div></td><td><div>";
    table4.innerHTML += "<tr><td><div>-0.1947, -0.267, -0.122, -0.013<div></td><td><div>";
    table4.innerHTML += "<tr><td><div>0.2895, -0.869, 0.188, -0.041<div></td><td><div>";
    table4.innerHTML += "<tr><td><div>-0.1398, 0.877, -0.199, -0.076<div></td><td><div>";
    table4.innerHTML += "<tr><td><div>0.1572, 0.047, -0.071, 0.209<div></td><td><div>";
    table4.innerHTML += "<tr><td><div>0.3528, 0.294, 0.167, -0.204<div></td><td><div>";
    table4.innerHTML += "<tr><td><div>-0.1549, -0.828, 0.285, 0.167<div></td><td><div>";
    table4.innerHTML += "<tr><td><div>-0.2036, -0.192, 0.148, 0.134<div></td><td><div>";
    table4.innerHTML += "<tr><td><div>0.2754, 0.074, -0.325, -0.215<div></td><td><div>";
    table4.innerHTML += "<tr><td><div>0.3442, -0.206, -0.007, -0.106<div></td><td><div>";
    table4.innerHTML += "<tr><td><div>0.1058, 0.121, -0.187, -0.228<div></td><td><div>";

    const table2 = document.createElement("table");
    table2.style.marginTop = "250px";
    table2.innerHTML += "<caption style=\"font-size: 30px\"> Initial Paragraph Weight Matrix </caption>";
    table2.innerHTML += "<tr><td><div>0.031, 0.398, -0.447, 0.273<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>-0.323, -0.002, 0.005, 0.942<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>-0.043, 0.027, -0.224, -0.094<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>0.119, 0.118, 0.427, 0.102<div></td><td><div>";
    table2.innerHTML += "<tr><td><div>-0.376, -0.109, 0.127, -0.461<div></td><td><div>";

    const table5 = document.createElement("table");
    table5.style.marginTop = "250px";
    table5.innerHTML += "<caption style=\"font-size: 30px\"> Updated Paragraph Weight Matrix </caption>";
    table5.innerHTML += "<tr><td><div>0.031, 0.398, -0.447, 0.273<div></td><td><div>";
    table5.innerHTML += "<tr><td><div>-0.323, -0.002, 0.005, 0.942<div></td><td><div>";
    table5.innerHTML += "<tr><td><div>-0.043, 0.027, -0.224, -0.094<div></td><td><div>";
    table5.innerHTML += "<tr><td><div>0.119, 0.118, 0.427, 0.102<div></td><td><div>";
    table5.innerHTML += "<tr><td><div>-0.376, -0.109, 0.127, -0.461<div></td><td><div>";

    const table3 = document.createElement("table");
    table3.style.marginTop = "250px";
    table3.innerHTML += "<caption style=\"font-size: 30px\"> Initial Bias Matrix </caption>";
    table3.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table3.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";

    const table6 = document.createElement("table");
    table6.style.marginTop = "250px";
    table6.style.marginRight = "10px";
    table6.innerHTML += "<caption style=\"font-size: 30px\"> Updated Bias Matrix </caption>";
    table6.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table6.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table6.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table6.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table6.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table6.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table6.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table6.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table6.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";
    table6.innerHTML += "<tr><td><div>0,0,0,0<div></td><td><div>";

    const container2 = document.createElement("div");
    container2.innerHTML += ">>";
    container2.style.fontSize = "32px";
    container2.style.marginTop = '35vh';

    const container3 = document.createElement("div");
    container3.innerHTML += ">>";
    container3.style.fontSize = "32px";
    container3.style.marginTop = '35vh';

    const container4 = document.createElement("div");
    container4.innerHTML += ">>";
    container4.style.fontSize = "32px";
    container4.style.marginTop = '35vh';

    tableContainer.appendChild(table1);
    tableContainer.appendChild(container2);
    tableContainer.appendChild(table4);
    tableContainer.appendChild(table2);
    tableContainer.appendChild(container3);
    tableContainer.appendChild(table5);
    tableContainer.appendChild(table3);
    tableContainer.appendChild(container4);
    tableContainer.appendChild(table6);
  
    const img = document.createElement('img');
    img.src = 'assets/para2vecstep5.png';
    canv.appendChild(img);

    canv.appendChild(tableContainer);
  }
  
function setfooter( input ) // takes input from event listener and then 
{
    switch( input ) {
        case "default": footer.innerHTML = "<h2>info box will be here!</h2>"; break;
        case "dm": footer.innerHTML = "<h2>Distributed Memory (DM) is one of two models for Sen2vec</h2>"; break;
        case "dbo": footer.innerHTML = "<h2>Distribute Bag of Words (DBOW) is one of two models for Sen2vec</h2>"; break;
        case "center": footer.innerHTML = "<h2>In this step, a batch of two input vectors is randomly selected and multiplied by the initial word weight matrix. This results in the predicted value for the center words of the given training vectors. The predicted center word matrix is then used in the subsequent step to calculate the negative log-likelihood loss.</h2>"; break;
    }
}
function removeContent() {
    const sidebar = document.getElementById("sidebar");
    sidebar.innerHTML = "";
}
function updater( val ) // takes input of 1 to advance page or -1 to go back a page
{
    if ( val ==  1 ) { page_status++; }
    if ( val == -1 ) { page_status--; }
    if( page_status > 0 ) { back_btn.style.display = "inline-block"; fwd_btn.style.display = "inline-block"; }
    else                  { back_btn.style.display = "none"; fwd_btn.style.display = "none"; }
    let page = statuses[ page_status ]; //gets status from index from statuses array
    console.log("page: " + page);
    switch( page ) //when updater runs, runs function corresponding to the page being switched to
    {
        case "Model Selection": ModelSelection(); break;
        case "Input and Initialization": Input(); break;
        case "Input Matrix": InputMatrix(); break;
        case "Initialize Weight + Bias Matrices": Initialize(); break;
        case "Compute Center Word Matrix": ComputeCenter(); break;
        case "Hyperbolic Tangent Function": HiddenLayer(); break;
        case "Compute Softmax and Loss Function": ComputeSoftmax(); break;
        case "Update Weight and Bias Matrices": UpdateWeightBias(); break;
    }
}
window.onload = (e) => {
    console.log('page loaded');
    updater(page_status);
};
 fwd_btn.addEventListener( "click", () => { updater( 1); } ); //adds listener to forwards and backwards button
back_btn.addEventListener( "click", () => { updater(-1); } );