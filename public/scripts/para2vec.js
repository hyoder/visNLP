const      canv = document.getElementById( "canv" ),
        sidebar = document.getElementById( "sidebar"),
         footer = document.getElementById( "footer"),
       back_btn = document.getElementById( "back_btn" ),
        fwd_btn = document.getElementById( "fwd_btn" ),
       statuses = ["Introduction and Model Selection", "Initialization of Data","Input Matrix","Initialize Weight + Bias","Predict Center Word","Hyperbolic Tangent","Softmax and Loss","Update Weight and Bias"];

      // let page_status = 0;
      // function meta() // sets and returns page metadata for meta div (top left corner of canvas)
      // {
      //     let output  = "<div id=\"meta\">";
      //         output += "<h2>Sen2vec - \"" + statuses[page_status] + "\"</h2>";
      //         output += "<h3>page " + page_status + " out of 6</h3>";
      //         output += "</div>"
      //     return output;
      // }

let page_status = 0;
function meta()
{
    let output  = "";
        output += "<div id=\"meta_lower\"><h4>step: " + (page_status) + "/7</div>";
        output += "<div id=\"meta_progress\">";
        output += "<div id=\"meta_bar\" style=\"width:" + (((page_status)/7)*74.75) + "vw\"></div></div>"
        output += "<div><h1 id=\"meta_title\">para2vec - " + statuses[page_status] + "</h1></div>";
    return output}

function ModelSelection()
{
    sidebar.innerHTML = '';
    setfooter( "default" );
    canv.dataset.mode = "n/a";
    canv.innerHTML  = meta();//starts by populating meta div
    canv.innerHTML += "<div style=\"height:15vh\"></div>"; //im just gonna leave the html here from w2v page 1 but this is how u add the html
    canv.innerHTML += "<h2>Select model for para2vec:</h2>";
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
    img.style.marginTop = "100px";
    img.style.marginLeft = "50px";
    img.style.marginRight = "50px";
    img.style.marginBottom = "100px";
    img.style.width = '70%';
    img.style.height = '60%';
    sidebar.appendChild(img);
}

function Input()
{
  sidebar.innerHTML = "";
  setfooter("step1");

 const tableContainer2 = document.createElement("div");
 tableContainer2.style.display = "flex";
 tableContainer2.style.overflow = 'auto';
 tableContainer2.style.justifyContent = "space-between";
 tableContainer2.style.flexDirection = "column";

  const table7 = document.createElement("table");
  table7.style.marginTop = "10px";
  table7.style.marginLeft = "150px";
  table7.style.marginRight = "150px";
  table7.style.color = "white";
  table7.style.borderColor = "white";
  table7.innerHTML += "<caption style=\"font-size: 30px\"> Para2vec Parameters </caption>";
  table7.innerHTML += "<tr><td><div>Epoch = 1<div></td></tr>";
  table7.innerHTML += "<tr><td><div>Batch Size = 2<div></td></tr>";
  table7.innerHTML += "<tr><td><div>Vector Dimensions = 4<div></td></tr>";
  table7.innerHTML += "<tr><td><div>Learning Rate = 1e^-3<div></td></tr>";
  table7.innerHTML += "<tr><td><div>Context Size = 1<div></td></tr>";

  const table5 = document.createElement("table");
  table5.style.marginTop = "50px";
  table5.style.marginRight = "100px";
  table5.style.marginLeft = "100px";
  table5.style.color = "white";
  table5.style.borderColor = "white";
  table5.innerHTML += "<caption style=\"font-size: 30px\"> Input Data </caption>";
  table5.innerHTML += "<tr><td><div>I love Data Science. I really like Data Science.<div></td></tr>";
  table5.innerHTML += "<tr><td><div>I dislike Data Science. I really dislike it.<div></td></tr>";
  table5.innerHTML += "<tr><td><div>I really love Data Science. I love, and enjoy it.<div></td></tr>";
  table5.innerHTML += "<tr><td><div>I really enjoy Data Science. I love it.<div></td></tr>";
  table5.innerHTML += "<tr><td><div>I love and dislike Data Science. I enjoy Data Science. <div></td></tr>";

  const table6 = document.createElement("table");
  table6.style.marginTop = "50px";
  table6.style.marginLeft = "150px";
  table6.style.marginRight = "150px";
  table6.style.marginBottom = '80px';
  table6.style.color = "white";
  table6.style.borderColor = "white";
  table6.innerHTML += "<caption style=\"font-size: 30px\"> Vocabulary </caption>";
  table6.innerHTML += "<tr><td><div>I<div></td></tr>";
  table6.innerHTML += "<tr><td><div>love<div></td></tr>";
  table6.innerHTML += "<tr><td><div>data<div></td></tr>";
  table6.innerHTML += "<tr><td><div>science<div></td></tr>";
  table6.innerHTML += "<tr><td><div>.<div></td></tr>";
  table6.innerHTML += "<tr><td><div>really<div></td></tr>";
  table6.innerHTML += "<tr><td><div>like<div></td></tr>";
  table6.innerHTML += "<tr><td><div>dislike<div></td></tr>";
  table6.innerHTML += "<tr><td><div>it<div></td></tr>";
  table6.innerHTML += "<tr><td><div>,<div></td></tr>";
  table6.innerHTML += "<tr><td><div>enjoy<div></td></tr>";
  table6.innerHTML += "<tr><td><div>and<div></td></tr>";
  

  tableContainer2.appendChild(table7);
  tableContainer2.appendChild(table5);
  tableContainer2.appendChild(table6);

  sidebar.appendChild(tableContainer2);

  canv.innerHTML = meta(); //resets canvas html by re-initializing as meta() output

  const tableContainer = document.createElement("div");
  tableContainer.style.display = "flex";
  tableContainer.style.overflow = 'auto';
  tableContainer.style.justifyContent = "space-between";

  const table1 = document.createElement("table");
  table1.style.marginTop = "250px";
  table1.style.marginRight = "10px";
  table1.style.marginLeft = "10px";
  table1.innerHTML += "<caption style=\"font-size: 30px\"> Input Data for Para2vec Algorithm </caption>";
  table1.innerHTML += "<tr><td><div>I love Data Science. I really like Data Science.<div></td></tr>";
  table1.innerHTML += "<tr><td><div>I dislike Data Science. I really dislike it.<div></td></tr>";
  table1.innerHTML += "<tr><td><div>I really love Data Science. I love, and enjoy it.<div></td></tr>";
  table1.innerHTML += "<tr><td><div>I really enjoy Data Science. I love it.<div></td></tr>";
  table1.innerHTML += "<tr><td><div>I love and dislike Data Science. I enjoy Data Science.<div></td></tr>";

  const table3 = document.createElement("table");
  table3.style.marginTop = "250px";
  table3.style.marginRight = "10px";
  table3.style.marginLeft = "10px";
  table3.style.width= "80vw";
  table3.style.height= "40vh";
  table3.innerHTML += "<caption style=\"font-size: 30px\"> Create Paragraph IDs </caption>";
  table3.innerHTML += "<tr><td style=\"padding:10px;\"><div> 0 <div></td><td><div>I love Data Science. I really like Data Science.<div></td></tr>";
  table3.innerHTML += "<tr><td style=\"padding:10px;\"><div> 1 <div></td><td><div>I dislike Data Science. I really dislike it.<div></td></tr>";
  table3.innerHTML += "<tr><td style=\"padding:10px;\"><div> 2 <div></td><td><div>I really love Data Science. I love, and enjoy it.<div></td></tr>";
  table3.innerHTML += "<tr><td style=\"padding:10px;\"><div> 3 <div></td><td><div>I really enjoy Data Science. I love it.<div></td></tr>";
  table3.innerHTML += "<tr><td style=\"padding:10px;\"><div> 4 <div></td><td><div>I love and dislike Data Science. I enjoy Data Science.<div></td></tr>";

  const table2 = document.createElement("table");
  table2.style.marginTop = "250px";
  table2.style.marginLeft = "10px";
  table2.style.marginRight = '10px';
  table2.innerHTML += "<caption style=\"font-size: 30px\"> Create Vocabulary </caption>";
  table2.innerHTML += "<tr><td><div>I<div></td><td><div>like<div></td></tr>";
  table2.innerHTML += "<tr><td><div>love<div></td><td><div>dislike<div></td></tr>";
  table2.innerHTML += "<tr><td><div>data<div></td><td><div>it<div></td></tr>";
  table2.innerHTML += "<tr><td><div>science<div></td><td><div>,<div></td></tr>";
  table2.innerHTML += "<tr><td><div>.<div></td><td><div>enjoy<div></td></tr>";
  table2.innerHTML += "<tr><td><div>really<div></td><td><div>and<div></td></tr>";

  const table4 = document.createElement("table");
  table4.style.marginTop = "250px";
  table4.style.marginRight = "10px";
  table4.style.marginLeft = "10px";
  table4.style.width= "80vw";
  table4.style.height= "40vh";
  table4.innerHTML += "<caption style=\"font-size: 30px\"> Initialize Word Vectors </caption>";
  table4.innerHTML += "<tr><td><div>I <div></td><td><div>0.237, 0.016, 0.583, 0.286<div></td><td><div>like <div></td><td><div>1.154, 0.616, 0.893, 0.643<div></td></tr>";
  table4.innerHTML += "<tr><td><div>love <div></td><td><div>-1.689, 0.213, 0.871, 0.928<div></td><td><div>dislike <div></td><td><div>0.507, 0.264, 0.739, 0.234<div></td></tr>";
  table4.innerHTML += "<tr><td><div>data <div></td><td><div>1.538, 0.735, 0.120, 1.486<div></td><td><div>it <div></td><td><div>0.147, 0.246, 0.829, 0.873<div></td></tr>";
  table4.innerHTML += "<tr><td><div>science <div></td><td><div>-0.388, 0.987, 0.346, 1.243<div></td><td><div>, <div></td><td><div>-0.707, -0.124, -0.829, 0.123<div></td></tr>";
  table4.innerHTML += "<tr><td><div>.<div></td><td><div>-0.829, 0.378, 0.199, 0.128<div></td><td><div>enjoy <div></td><td><div>-0.339, 1.527, 1.276, 0.246<div></td></tr>";
  table4.innerHTML += "<tr><td><div>really <div></td><td><div>-1.710, 0.233, 0.789,-0.123<div></td><td><div>and <div></td><td><div>1.129, 0.125, 0.525, 0.245<div></td></tr>";

  const container = document.createElement("div");
  container.innerHTML += ">>";
  container.style.fontSize = "32px";
  container.style.marginTop = '350px';

  const container2 = document.createElement("div");
  container2.innerHTML += ">>";
  container2.style.fontSize = "32px";
  container2.style.marginTop = '350px';

  const container3 = document.createElement("div");
  container3.innerHTML += ">>";
  container3.style.fontSize = "32px";
  container3.style.marginTop = '350px';

  tableContainer.appendChild(table1);
  tableContainer.appendChild(container);
  tableContainer.appendChild(table3);
  tableContainer.appendChild(container2);
  tableContainer.appendChild(table2);
  tableContainer.appendChild(container3);
  tableContainer.appendChild(table4);

  canv.appendChild(tableContainer);
}

  function InputMatrix() {
    sidebar.innerHTML = '';
    setfooter("step2");
    canv.innerHTML = meta();
    canv.innerHTML += "<tr><td>&nbsp;</td></tr>";
    const tableContainer = document.createElement("div");
    tableContainer.style.display = "flex";
    tableContainer.style.overflow = 'auto';
    tableContainer.style.justifyContent = "space-between";
  
    const table1 = document.createElement("table");
    table1.style.marginTop = "232px";
    table1.style.marginLeft = "10px";
    table1.innerHTML += "<caption style=\"font-size: 30px\"> DM Input Matrix With Words </caption>";
    table1.innerHTML += "<tr><td><div>Paragraph ID<div></td><td><div>Context Word<div></td><td><div>Context Word<div></td><td><div>Center Word<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0<div></td><td><div>love<div></td><td><div>science<div></td><td><div>data<div></td></tr>";
    table1.innerHTML += "<tr><td><div>1<div></td><td><div>science<div></td><td><div>I<div></td><td><div>.<div></td></tr>";
    table1.innerHTML += "<tr><td><div>2<div></td><td><div>love<div></td><td><div>and<div></td><td><div>,<div></td></tr>";
    table1.innerHTML += "<tr><td><div>3<div></td><td><div>love<div></td><td><div>.<div></td><td><div>it<div></td></tr>";
    table1.innerHTML += "<tr><td><div>4<div></td><td><div>dislike<div></td><td><div>science<div></td><td><div>data<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0<div></td><td><div>like<div></td><td><div>science<div></td><td><div>data<div></td></tr>";
    table1.innerHTML += "<tr><td><div>1<div></td><td><div>really<div></td><td><div>it<div></td><td><div>dislike<div></td></tr>";
    table1.innerHTML += "<tr><td><div>2<div></td><td><div>really<div></td><td><div>data<div></td><td><div>love<div></td></tr>";
    table1.innerHTML += "<tr><td><div>3<div></td><td><div>I<div></td><td><div>it<div></td><td><div>love<div></td></tr>";
    table1.innerHTML += "<tr><td><div>4<div></td><td><div>love<div></td><td><div>dislike<div></td><td><div>and<div></td></tr>";

    const table2 = document.createElement("table");
    table2.style.marginTop = "232px";
    table2.style.marginRight = "10px";
    table2.style.width= "80vw";
    table2.style.height= "40vh";
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
    container.style.marginTop = '310px';

    const img = document.createElement('img');
    img.src = 'assets/para2vecstep1.png';
    img.style.marginTop = "232px";
    img.style.marginBottom = "10px";
    img.style.marginLeft = "10px";
    img.style.width = '17%';
    img.style.height = 'auto';

    tableContainer.appendChild(img);
    tableContainer.appendChild(table1);
    tableContainer.appendChild(container);
    tableContainer.appendChild(table2);
  
    canv.appendChild(tableContainer);

    const table3 = document.createElement("table");
    table3.style.marginTop = "5px";
    table3.style.marginRight = "100px";
    table3.style.marginLeft = "100px";
    table3.style.color = "white";
    table3.style.borderColor = "white";
    table3.innerHTML += "<caption style=\"font-size: 30px\"> DM Input Matrix With Words </caption>";
    table3.innerHTML += "<tr><td><div>Paragraph ID<div></td><td><div>Context Word<div></td><td><div>Context Word<div></td><td><div>Center Word<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0<div></td><td><div>love<div></td><td><div>science<div></td><td><div>data<div></td></tr>";
    table3.innerHTML += "<tr><td><div>1<div></td><td><div>science<div></td><td><div>I<div></td><td><div>.<div></td></tr>";
    table3.innerHTML += "<tr><td><div>2<div></td><td><div>love<div></td><td><div>and<div></td><td><div>,<div></td></tr>";
    table3.innerHTML += "<tr><td><div>3<div></td><td><div>love<div></td><td><div>.<div></td><td><div>it<div></td></tr>";
    table3.innerHTML += "<tr><td><div>4<div></td><td><div>dislike<div></td><td><div>science<div></td><td><div>data<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0<div></td><td><div>like<div></td><td><div>science<div></td><td><div>data<div></td></tr>";
    table3.innerHTML += "<tr><td><div>1<div></td><td><div>really<div></td><td><div>it<div></td><td><div>dislike<div></td></tr>";
    table3.innerHTML += "<tr><td><div>2<div></td><td><div>really<div></td><td><div>data<div></td><td><div>love<div></td></tr>";
    table3.innerHTML += "<tr><td><div>3<div></td><td><div>I<div></td><td><div>it<div></td><td><div>love<div></td></tr>";
    table3.innerHTML += "<tr><td><div>4<div></td><td><div>love<div></td><td><div>dislike<div></td><td><div>and<div></td></tr>";

    const tableContainer2 = document.createElement("div");
    tableContainer2.style.display = "flex";
    tableContainer2.style.overflow = 'auto';
    tableContainer2.style.flexDirection = "column";

    const table7 = document.createElement("table");
    table7.style.marginTop = "10px";
    table7.style.marginLeft = "150px";
    table7.style.marginRight = "150px";
    table7.style.marginBottom = "10px";
    table7.style.color = "white";
    table7.style.borderColor = "white";
    table7.innerHTML += "<caption style=\"font-size: 30px\"> Para2vec Parameters </caption>";
    table7.innerHTML += "<tr><td><div>Epoch = 1<div></td></tr>";
    table7.innerHTML += "<tr><td><div>Batch Size = 2<div></td></tr>";
    table7.innerHTML += "<tr><td><div>Vector Dimensions = 4<div></td></tr>";
    table7.innerHTML += "<tr><td><div>Learning Rate = 1e^-3<div></td></tr>";
    table7.innerHTML += "<tr><td><div>Context Size = 1<div></td></tr>";

    const table5 = document.createElement("table");
    table5.style.marginRight = "100px";
    table5.style.marginTop = "10px";
    table5.style.marginLeft = "100px";
    table5.style.color = "white";
    table5.style.borderColor = "white";
    table5.innerHTML += "<caption style=\"font-size: 30px\"> Input Data </caption>";
    table5.innerHTML += "<tr><td><div>I love Data Science. I really like Data Science.<div></td></tr>";
    table5.innerHTML += "<tr><td><div>I dislike Data Science. I really dislike it.<div></td></tr>";
    table5.innerHTML += "<tr><td><div>I really love Data Science. I love, and enjoy it.<div></td></tr>";
    table5.innerHTML += "<tr><td><div>I really enjoy Data Science. I love it.<div></td></tr>";
    table5.innerHTML += "<tr><td><div>I love and dislike Data Science. I enjoy Data Science.<div></td></tr>";

    const table6 = document.createElement("table");
    table6.style.marginTop = "10px";
    table6.style.marginLeft = "150px";
    table6.style.marginRight = "150px";
    table6.style.color = "white";
    table6.style.borderColor = "white";
    table6.innerHTML += "<caption style=\"font-size: 30px\"> Vocabulary </caption>";
    table6.innerHTML += "<tr><td><div>I<div></td><td><div>like<div></td></tr>";
    table6.innerHTML += "<tr><td><div>love<div></td><td><div>dislike<div></td></tr>";
    table6.innerHTML += "<tr><td><div>data<div></td><td><div>it<div></td></tr>";
    table6.innerHTML += "<tr><td><div>science<div></td><td><div>,<div></td></tr>";
    table6.innerHTML += "<tr><td><div>.<div></td><td><div>enjoy<div></td></tr>";
    table6.innerHTML += "<tr><td><div>really<div></td><td><div>and<div></td></tr>";

    tableContainer2.appendChild(table7);
    tableContainer2.appendChild(table5);
    tableContainer2.appendChild(table6);
    tableContainer2.appendChild(table3);

    sidebar.appendChild(tableContainer2);
  }

  function Initialize() {
    setfooter("step3");
    canv.innerHTML = meta();
  
    const tableContainer = document.createElement("div");
    tableContainer.style.display = "flex";
    tableContainer.style.overflow = 'auto';
  
    const table1 = document.createElement("table");
    table1.style.marginTop = "250px";
    table1.style.marginLeft = "30px";
    table1.style.marginRight = "120px";
    table1.innerHTML += "<caption style=\"font-size: 30px\"> Initialize Word Weight Matrix </caption>";
    table1.innerHTML += "<tr><td><div>0.264<div></td><td><div> -0.441<div></td><td><div> 0.329<div></td><td><div> 0.126<div></td></tr>";
    table1.innerHTML += "<tr><td><div>-0.3017<div></td><td><div> -0.132<div></td><td><div> -0.383<div></td><td><div> 0.107<div></td></tr>";
    table1.innerHTML += "<tr><td><div>-0.1947<div></td><td><div> -0.267<div></td><td><div> -0.122<div></td><td><div> -0.013<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.2895<div></td><td><div> -0.869<div></td><td><div> 0.188<div></td><td><div> -0.041<div></td></tr>";
    table1.innerHTML += "<tr><td><div>-0.1398<div></td><td><div> 0.877<div></td><td><div> -0.199<div></td><td><div> -0.076<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.1572<div></td><td><div> 0.047<div></td><td><div> -0.071<div></td><td><div> 0.209<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.3528<div></td><td><div> 0.294<div></td><td><div> 0.167<div></td><td><div> -0.204<div></td></tr>";
    table1.innerHTML += "<tr><td><div>-0.1549<div></td><td><div> -0.828<div></td><td><div> 0.285<div></td><td><div> 0.167<div></td></tr>";
    table1.innerHTML += "<tr><td><div>-0.2036<div></td><td><div> -0.192<div></td><td><div> 0.148<div></td><td><div> 0.134<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.2754<div></td><td><div> 0.074<div></td><td><div> -0.325<div></td><td><div> -0.215<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.3442<div></td><td><div> -0.206<div></td><td><div> -0.007<div></td><td><div> -0.106<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.1058<div></td><td><div> 0.121<div></td><td><div> -0.187<div></td><td><div> -0.228<div></td></tr>";
  
    const table2 = document.createElement("table");
    table2.style.marginTop = "250px";
    table2.style.marginLeft = "120px";
    table2.style.marginRight = "120px";
    table2.innerHTML += "<caption style=\"font-size: 30px\"> Initialize Paragraph Weight Matrix </caption>";
    table2.innerHTML += "<tr><td><div>0.031<div></td><td><div> 0.398<div></td><td><div> -0.447<div></td><td><div> 0.273<div></td></tr>";
    table2.innerHTML += "<tr><td><div>-0.323<div></td><td><div> -0.002<div></td><td><div> 0.005<div></td><td><div> 0.942<div></td></tr>";
    table2.innerHTML += "<tr><td><div>-0.043<div></td><td><div> 0.027<div></td><td><div> -0.224<div></td><td><div> -0.094<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0.119<div></td><td><div> 0.118<div></td><td><div> 0.427<div></td><td><div> 0.102<div></td></tr>";
    table2.innerHTML += "<tr><td><div>-0.376<div></td><td><div> -0.109<div></td><td><div> 0.127<div></td><td><div> -0.461<div></td></tr>";

    const table3 = document.createElement("table");
    table3.style.marginTop = "250px";
    table3.style.marginRight = "10px";
    table3.style.marginLeft = "120px";
    table3.innerHTML += "<caption style=\"font-size: 30px\"> Initialize Bias Matrix </caption>";
    table3.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";

    const container = document.createElement("div");
    container.innerHTML += ">>";
    container.style.fontSize = "32px";
    container.style.marginTop = '350px';

    const container2 = document.createElement("div");
    container2.innerHTML += ">>";
    container2.style.fontSize = "32px";
    container2.style.marginTop = '350px';

    const img = document.createElement('img');
    img.src = 'assets/para2vecstep2.png';
    img.style.marginTop = "250px";
    img.style.marginBottom = "10px";
    img.style.marginLeft = "10px";
    img.style.width = '17%';
    img.style.height = 'auto';

    tableContainer.appendChild(img);
    tableContainer.appendChild(table1);
    tableContainer.appendChild(container);
    tableContainer.appendChild(table2);
    tableContainer.appendChild(container2);
    tableContainer.appendChild(table3);

    canv.appendChild(tableContainer);

  }

  function ComputeCenter() {
    setfooter("step4");
    canv.innerHTML = meta();
  
    const tableContainer = document.createElement("div");
    tableContainer.style.display = "flex";
    tableContainer.style.overflow = 'auto';
    tableContainer.style.justifyContent = "space-between";
  
    const table1 = document.createElement("table");
    table1.style.marginTop = "250px";
    table1.style.marginLeft = "5px";
    table1.innerHTML += "<caption style=\"font-size: 30px\"> Input Vectors </caption>";
    table1.innerHTML += "<tr><td><div>Paragraph<div></td><td><div>Paragraph<div></td><td><div>Paragraph<div></td><td><div>Paragraph<div></td><td><div>Context 1<div></td><td><div>Context 1<div></td><td><div>Context 1<div></td><td><div>Context 1<div></td><td><div>Context 2<div></td><td><div>Context 2<div></td><td><div>Context 2<div></td><td><div>Context 2<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.031<div></td><td><div> 0.398<div></td><td><div> -0.447<div></td><td><div> 0.273<div></td><td><div>-1.689<div></td><td><div> 0.213<div></td><td><div> 0.871<div></td><td><div> 0.928<div></td><td><div>-0.388<div></td><td><div> 0.987<div></td><td><div> 0.346<div></td><td><div> 1.243<div></td></tr>";
    table1.innerHTML += "<tr><td><div>-0.323<div></td><td><div> -0.002<div></td><td><div> 0.005<div></td><td><div> 0.942<div></td><td><div>0.237<div></td><td><div> 0.016<div></td><td><div> 0.583<div></td><td><div> 0.286<div></td><td><div>1.538<div></td><td><div> 0.735<div></td><td><div> 0.120<div></td><td><div> 1.486<div></td></tr>";
    table1.innerHTML += "<tr><td><div>-0.043<div></td><td><div> 0.027<div></td><td><div> -0.224<div></td><td><div> -0.094<div></td><td><div>-0.707<div></td><td><div> -0.124<div></td><td><div> -0.829<div></td><td><div> 0.123<div></td><td><div>0.507<div></td><td><div> 0.264<div></td><td><div> 0.739<div></td><td><div> 0.234<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.119<div></td><td><div> 0.118<div></td><td><div> 0.427<div></td><td><div> 0.102<div></td><td><div>0.147<div></td><td><div> 0.246<div></td><td><div> 0.829<div></td><td><div> 0.873<div></td><td><div>-0.829<div></td><td><div> 0.378<div></td><td><div> 0.199<div></td><td><div> 0.128<div></td></tr>";
    table1.innerHTML += "<tr><td><div>-0.376<div></td><td><div> -0.109<div></td><td><div> 0.127<div></td><td><div> -0.461<div></td><td><div>0.237<div></td><td><div> 0.016<div></td><td><div> 0.583<div></td><td><div> 0.286<div></td><td><div>1.538<div></td><td><div> 0.735<div></td><td><div> 0.120<div></td><td><div> 1.486<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.031<div></td><td><div> 0.398<div></td><td><div> -0.447<div></td><td><div> 0.273<div></td><td><div>0.237<div></td><td><div> 0.016<div></td><td><div> 0.583<div></td><td><div> 0.286<div></td><td><div>1.538<div></td><td><div> 0.735<div></td><td><div> 0.120<div></td><td><div> 1.486<div></td></tr>";
    table1.innerHTML += "<tr><td><div>-0.323<div></td><td><div> -0.002<div></td><td><div> 0.005<div></td><td><div> 0.942<div></td><td><div>-0.829<div></td><td><div> 0.378<div></td><td><div> 0.199<div></td><td><div> 0.128<div></td><td><div>-0.388<div></td><td><div> 0.987<div></td><td><div> 0.346<div></td><td><div> 1.243<div></td></tr>";
    table1.innerHTML += "<tr><td><div>-0.043<div></td><td><div> 0.027<div></td><td><div> -0.224<div></td><td><div> -0.094<div></td><td><div>-0.388<div></td><td><div> 0.987<div></td><td><div> 0.346<div></td><td><div> 1.243<div></td><td><div>-0.707<div></td><td><div> -0.124<div></td><td><div> -0.829<div></td><td><div> 0.123<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.119<div></td><td><div> 0.118<div></td><td><div> 0.427<div></td><td><div> 0.102<div></td><td><div>0.147<div></td><td><div> 0.246<div></td><td><div> 0.829<div></td><td><div> 0.873<div></td><td><div>1.538<div></td><td><div> 0.735<div></td><td><div> 0.120<div></td><td><div> 1.486<div></td></tr>";
    table1.innerHTML += "<tr><td><div>-0.376<div></td><td><div> -0.109<div></td><td><div> 0.127<div></td><td><div> -0.461<div></td><td><div>-0.339<div></td><td><div> 1.527<div></td><td><div> 1.276<div></td><td><div> 0.246<div></td><td><div>-0.388<div></td><td><div> 0.987<div></td><td><div> 0.346<div></td><td><div> 1.243<div></td></tr>";
  
    const table2 = document.createElement("table");
    table2.style.marginTop = "250px";
    table2.style.marginRight = "5px";
    table2.innerHTML += "<caption style=\"font-size: 30px\"> Initial Word Weight Matrix </caption>";
    table2.innerHTML += "<tr><td><div>0.264<div></td><td><div> -0.441<div></td><td><div> 0.329<div></td><td><div> 0.126<div></td></tr>";
    table2.innerHTML += "<tr><td><div>-0.3017<div></td><td><div> -0.132<div></td><td><div> -0.383<div></td><td><div> 0.107<div></td></tr>";
    table2.innerHTML += "<tr><td><div>-0.1947<div></td><td><div> -0.267<div></td><td><div> -0.122<div></td><td><div> -0.013<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0.2895<div></td><td><div> -0.869<div></td><td><div> 0.188<div></td><td><div> -0.041<div></td></tr>";
    table2.innerHTML += "<tr><td><div>-0.1398<div></td><td><div> 0.877<div></td><td><div> -0.199<div></td><td><div> -0.076<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0.1572<div></td><td><div> 0.047<div></td><td><div> -0.071<div></td><td><div> 0.209<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0.3528<div></td><td><div> 0.294<div></td><td><div> 0.167<div></td><td><div> -0.204<div></td></tr>";
    table2.innerHTML += "<tr><td><div>-0.1549<div></td><td><div> -0.828<div></td><td><div> 0.285<div></td><td><div> 0.167<div></td></tr>";
    table2.innerHTML += "<tr><td><div>-0.2036<div></td><td><div> -0.192<div></td><td><div> 0.148<div></td><td><div> 0.134<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0.2754<div></td><td><div> 0.074<div></td><td><div> -0.325<div></td><td><div> -0.215<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0.3442<div></td><td><div> -0.206<div></td><td><div> -0.007<div></td><td><div> -0.106<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0.1058<div></td><td><div> 0.121<div></td><td><div> -0.187<div></td><td><div> -0.228<div></td></tr>";

    const table3 = document.createElement("table");
    table3.style.marginTop = "250px";
    table3.style.marginRight = "5px";
    table3.style.marginLeft = "5px";
    table3.innerHTML += "<caption style=\"font-size: 30px\"> Predicted Center Word Matrix </caption>";
    table3.innerHTML += "<tr><td><div>1.088<div></td><td><div> -1.940<div></td><td><div>   0.081<div></td><td><div>  -0.392<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0.405<div></td><td><div> -0.619<div></td><td><div>  -0.088<div></td><td><div>  -0.468<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0.013<div></td><td><div> -1.016<div></td><td><div>  -0.028<div></td><td><div>   0.101<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0.472<div></td><td><div> -0.447<div></td><td><div>   0.030<div></td><td><div>  -0.207<div></td></tr>";
    table3.innerHTML += "<tr><td><div>-0.005<div></td><td><div>  0.604<div></td><td><div>  -0.343<div></td><td><div>   -0.431<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0.272<div></td><td><div> -0.126<div></td><td><div>   -0.195<div></td><td><div>  -0.348<div></td></tr>";
    table3.innerHTML += "<tr><td><div>1.014<div></td><td><div> -1.207<div></td><td><div>   -0.334<div></td><td><div>  -0.541<div></td></tr>";
    table3.innerHTML += "<tr><td><div>-0.026<div></td><td><div> -0.752<div></td><td><div>   0.322<div></td><td><div>   0.368<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0.205<div></td><td><div> -0.695<div></td><td><div>   0.011<div></td><td><div>  -0.268<div></td></tr>";
    table3.innerHTML += "<tr><td><div>1.076<div></td><td><div>  0.719<div></td><td><div>  -0.554<div></td><td><div>  -0.500<div></td></tr>";

    const container = document.createElement("div");
    container.innerHTML += "*";
    container.style.fontSize = "32px";
    container.style.marginTop = '350px';

    const container2 = document.createElement("div");
    container2.innerHTML += ">>";
    container2.style.fontSize = "32px";
    container2.style.marginTop = '350px';

    const img = document.createElement('img');
    img.src = 'assets/para2vecstep2.png';
    img.style.marginTop = "250px";
    img.style.marginBottom = "10px";
    img.style.marginLeft = "10px";
    img.style.width = '17%';
    img.style.height = 'auto';

    tableContainer.appendChild(img);
    tableContainer.appendChild(table1);
    tableContainer.appendChild(container);
    tableContainer.appendChild(table2);
    tableContainer.appendChild(container2);
    tableContainer.appendChild(table3);

    canv.appendChild(tableContainer);

  }

  function HiddenLayer() {
    setfooter("step5");
    canv.innerHTML = meta();
  
    const tableContainer = document.createElement("div");
    tableContainer.style.display = "flex";
    tableContainer.style.overflow = 'auto';
    tableContainer.style.justifyContent = "space-between";
  
    const table1 = document.createElement("table");
    table1.style.marginTop = "250px";
    table1.style.marginLeft = "10px";
    table1.style.marginRight = "50px";
    table1.innerHTML += "<caption style=\"font-size: 30px\"> Predicted Center Word Matrix </caption>";
    table1.innerHTML += "<tr><td><div>1.088<div></td><td><div> -1.940<div></td><td><div>   0.081<div></td><td><div>  -0.392<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.405<div></td><td><div> -0.619<div></td><td><div>  -0.088<div></td><td><div>  -0.468<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.013<div></td><td><div> -1.016<div></td><td><div>  -0.028<div></td><td><div>   0.101<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.472<div></td><td><div> -0.447<div></td><td><div>   0.030<div></td><td><div>  -0.207<div></td></tr>";
    table1.innerHTML += "<tr><td><div>-0.005<div></td><td><div>  0.604<div></td><td><div>  -0.343<div></td><td><div>   -0.431<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.272<div></td><td><div> -0.126<div></td><td><div>   -0.195<div></td><td><div>  -0.348<div></td></tr>";
    table1.innerHTML += "<tr><td><div>1.014<div></td><td><div> -1.207<div></td><td><div>   -0.334<div></td><td><div>  -0.541<div></td></tr>";
    table1.innerHTML += "<tr><td><div>-0.026<div></td><td><div> -0.752<div></td><td><div>   0.322<div></td><td><div>   0.368<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.205<div></td><td><div> -0.695<div></td><td><div>   0.011<div></td><td><div>  -0.268<div></td></tr>";
    table1.innerHTML += "<tr><td><div>1.076<div></td><td><div>  0.719<div></td><td><div>  -0.554<div></td><td><div>  -0.500<div></td></tr>";

    const table4 = document.createElement("table");
    table4.style.marginTop = "250px";
    table4.style.marginRight = "50px";
    table4.style.marginLeft = "50px";
    table4.innerHTML += "<caption style=\"font-size: 30px\"> Bias Matrix </caption>";
    table4.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table4.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table4.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table4.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table4.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table4.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table4.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table4.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table4.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table4.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";

    const table3 = document.createElement("table");
    table3.style.marginTop = "250px";
    table3.style.marginLeft = "50px";
    table3.style.marginRight = "50px";
    table3.innerHTML += "<caption style=\"font-size: 30px\"> Predicted Center Word Matrix + Bias</caption>";
    table3.innerHTML += "<tr><td><div>1.088<div></td><td><div> -1.940<div></td><td><div>   0.081<div></td><td><div>  -0.392<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0.405<div></td><td><div> -0.619<div></td><td><div>  -0.088<div></td><td><div>  -0.468<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0.013<div></td><td><div> -1.016<div></td><td><div>  -0.028<div></td><td><div>   0.101<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0.472<div></td><td><div> -0.447<div></td><td><div>   0.030<div></td><td><div>  -0.207<div></td></tr>";
    table3.innerHTML += "<tr><td><div>-0.005<div></td><td><div>  0.604<div></td><td><div>  -0.343<div></td><td><div>   -0.431<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0.272<div></td><td><div> -0.126<div></td><td><div>   -0.195<div></td><td><div>  -0.348<div></td></tr>";
    table3.innerHTML += "<tr><td><div>1.014<div></td><td><div> -1.207<div></td><td><div>   -0.334<div></td><td><div>  -0.541<div></td></tr>";
    table3.innerHTML += "<tr><td><div>-0.026<div></td><td><div> -0.752<div></td><td><div>   0.322<div></td><td><div>   0.368<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0.205<div></td><td><div> -0.695<div></td><td><div>   0.011<div></td><td><div>  -0.268<div></td></tr>";
    table3.innerHTML += "<tr><td><div>1.076<div></td><td><div>  0.719<div></td><td><div>  -0.554<div></td><td><div>  -0.500<div></td></tr>";
  
    const table2 = document.createElement("table");
    table2.style.marginTop = "250px";
    table2.style.marginRight = "10px";
    table2.style.marginLeft = "75px";
    table2.style.height = "10vh";
    table2.innerHTML += "<caption style=\"font-size: 30px\"> Hyperbolic Tangent of Matrix </caption>";
    table2.innerHTML += "<tr><td><div>0.796<div></td><td><div> -0.96<div></td><td><div>   0.081<div></td><td><div> -0.374<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0.385<div></td><td><div> -0.551<div></td><td><div> -0.088<div></td><td><div> -0.437<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0.013<div></td><td><div> -0.768<div></td><td><div> -0.028<div></td><td><div>  0.101<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0.44<div></td><td><div>  -0.42<div></td><td><div>   0.031<div></td><td><div> -0.205<div></td></tr>";
    table2.innerHTML += "<tr><td><div>-0.006<div></td><td><div>  0.54<div></td><td><div>  -0.331<div></td><td><div> -0.406<div></td></tr>";
    table2.innerHTML += "<tr><td><div> 0.266<div></td><td><div> -0.126<div></td><td><div> -0.193<div></td><td><div> -0.335<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0.767<div></td><td><div> -0.836<div></td><td><div> -0.322<div></td><td><div> -0.494<div></td></tr>";
    table2.innerHTML += "<tr><td><div>-0.027<div></td><td><div> -0.636<div></td><td><div>  0.312<div></td><td><div>  0.353<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0.203<div></td><td><div> -0.601<div></td><td><div>  0.012<div></td><td><div> -0.262<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0.792<div></td><td><div>  0.617<div></td><td><div> -0.504<div></td><td><div> -0.462<div></td></tr>";

    const container = document.createElement("div");
    container.innerHTML += "+";
    container.style.fontSize = "32px";
    container.style.marginTop = '350px';

    const container2 = document.createElement("div");
    container2.innerHTML += ">>";
    container2.style.fontSize = "32px";
    container2.style.marginTop = '350px';

    const container3 = document.createElement("div");
    container3.innerHTML += ">>";
    container3.style.fontSize = "32px";
    container3.style.marginTop = '350px';

    const img = document.createElement('img');
    img.src = 'assets/para2vecstep3.png';
    img.style.marginTop = "250px";
    img.style.marginBottom = "10px";
    img.style.marginLeft = "10px";
    img.style.width = '17%';
    img.style.height = 'auto';

    tableContainer.appendChild(img);
    tableContainer.appendChild(table1);
    tableContainer.appendChild(container);
    tableContainer.appendChild(table4);
    tableContainer.appendChild(container2);
    tableContainer.appendChild(table3);
    tableContainer.appendChild(container3);
    tableContainer.appendChild(table2);

    canv.appendChild(tableContainer);

  }
  
  function ComputeSoftmax() {
    setfooter("step6");
    canv.innerHTML = meta();
  
    const tableContainer = document.createElement("div");
    tableContainer.style.display = "flex";
    tableContainer.style.overflow = 'auto';
    tableContainer.style.justifyContent = "space-between";

    const table1 = document.createElement("table");
    table1.style.marginTop = "250px";
    table1.style.marginLeft = "10px";
    table1.style.height = "10vh";
    table1.innerHTML += "<caption style=\"font-size: 30px\"> Hyperbolic Tangent Matrix </caption>";
    table1.innerHTML += "<tr><td><div>0.796<div></td><td><div> -0.96<div></td><td><div>   0.081<div></td><td><div> -0.374<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.385<div></td><td><div> -0.551<div></td><td><div> -0.088<div></td><td><div> -0.437<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.013<div></td><td><div> -0.768<div></td><td><div> -0.028<div></td><td><div>  0.101<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.44<div></td><td><div>  -0.42<div></td><td><div>   0.031<div></td><td><div> -0.205<div></td></tr>";
    table1.innerHTML += "<tr><td><div>-0.006<div></td><td><div>  0.54<div></td><td><div>  -0.331<div></td><td><div> -0.406<div></td></tr>";
    table1.innerHTML += "<tr><td><div> 0.266<div></td><td><div> -0.126<div></td><td><div> -0.193<div></td><td><div> -0.335<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.767<div></td><td><div> -0.836<div></td><td><div> -0.322<div></td><td><div> -0.494<div></td></tr>";
    table1.innerHTML += "<tr><td><div>-0.027<div></td><td><div> -0.636<div></td><td><div>  0.312<div></td><td><div>  0.353<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.203<div></td><td><div> -0.601<div></td><td><div>  0.012<div></td><td><div> -0.262<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.792<div></td><td><div>  0.617<div></td><td><div> -0.504<div></td><td><div> -0.462<div></td></tr>";
  
    const table2 = document.createElement("table");
    table2.style.marginTop = "250px";
    table2.style.marginLeft = "10px";
    table2.style.height = "10vh";
    table2.innerHTML += "<caption style=\"font-size: 30px\"> Softmax Matrix of Predicted Center Word </caption>";
    table2.innerHTML += "<tr><td><div>0.07<div></td><td><div>  0.003<div></td><td><div> 0.026<div></td><td><div> 0.016<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0.036<div></td><td><div> 0.013<div></td><td><div> 0.022<div></td><td><div> 0.015<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0.024<div></td><td><div> 0.009<div></td><td><div> 0.023<div></td><td><div> 0.026<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0.038<div></td><td><div> 0.015<div></td><td><div> 0.024<div></td><td><div> 0.019<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0.024<div></td><td><div> 0.043<div></td><td><div> 0.017<div></td><td><div> 0.015<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0.031<div></td><td><div> 0.021<div></td><td><div> 0.019<div></td><td><div> 0.017<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0.065<div></td><td><div> 0.007<div></td><td><div> 0.017<div></td><td><div> 0.014<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0.023<div></td><td><div> 0.011<div></td><td><div> 0.033<div></td><td><div> 0.034<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0.029<div></td><td><div> 0.012<div></td><td><div> 0.024<div></td><td><div> 0.018<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0.07 <div></td><td><div> 0.049<div></td><td><div> 0.014<div></td><td><div> 0.014<div></td></tr>";

    const table5 = document.createElement("table");
    table5.style.marginTop = "250px";
    table5.style.marginLeft = "10px";
    table5.style.height = "10vh";
    table5.innerHTML += "<caption style=\"font-size: 30px\"> True Center Word Matrix </caption>";
    table5.innerHTML += "<tr><td><div>1.538<div></td><td><div> 0.735<div></td><td><div> 0.120<div></td><td><div> 1.486<div></td></tr>";
    table5.innerHTML += "<tr><td><div>-0.829<div></td><td><div> 0.378<div></td><td><div> 0.199<div></td><td><div> 0.128<div></td></tr>";
    table5.innerHTML += "<tr><td><div>1.154<div></td><td><div> 0.616<div></td><td><div> 0.893 <div></td><td><div>0.643<div></td></tr>";
    table5.innerHTML += "<tr><td><div>1.538 <div></td><td><div>0.735<div></td><td><div> 0.120 <div></td><td><div>1.486<div></td></tr>";
    table5.innerHTML += "<tr><td><div>-0.339<div></td><td><div> 1.527<div></td><td><div> 1.276 <div></td><td><div>0.246<div></td></tr>";
    table5.innerHTML += "<tr><td><div>-1.689<div></td><td><div> 0.213 <div></td><td><div>0.871 <div></td><td><div>0.928<div></td></tr>";
    table5.innerHTML += "<tr><td><div>1.538 <div></td><td><div>0.735<div></td><td><div> 0.120 <div></td><td><div>1.486<div></td></tr>";
    table5.innerHTML += "<tr><td><div>-1.710 <div></td><td><div>0.233<div></td><td><div> 0.789<div></td><td><div>-0.123<div></td></tr>";
    table5.innerHTML += "<tr><td><div>-0.829 <div></td><td><div>0.378 <div></td><td><div>0.199 <div></td><td><div>0.128<div></td></tr>";
    table5.innerHTML += "<tr><td><div>1.538 <div></td><td><div>0.735 <div></td><td><div>0.120 <div></td><td><div>1.486<div></td></tr>";

    const table3 = document.createElement("table");
    table3.style.marginTop = "250px";
    table3.style.marginLeft = "10px";
    table3.style.marginRight = "10px";
    table3.innerHTML += "<caption style=\"font-size: 30px\"> Negative Log Likelihood Loss Matrix </caption>";
    table3.innerHTML += "<tr><td><div>4.081<div></td><td><div>  4.177 <div></td><td><div> 0.439  <div></td><td><div>6.145<div></td></tr>";
    table3.innerHTML += "<tr><td><div>-2.766 <div></td><td><div> 1.649 <div></td><td><div> 0.762  <div></td><td><div>0.539<div></td></tr>";
    table3.innerHTML += "<tr><td><div> 4.303 <div></td><td><div> 2.931 <div></td><td><div> 3.367  <div></td><td><div>2.341<div></td></tr>";
    table3.innerHTML += "<tr><td><div>5.029 <div></td><td><div> 3.08 <div></td><td><div>  0.445  <div></td><td><div>5.87<div></td></tr>";
    table3.innerHTML += "<tr><td><div>-1.271 <div></td><td><div> 4.792 <div></td><td><div> 5.214 <div></td><td><div> 1.027<div></td></tr>";
    table3.innerHTML += "<tr><td><div>-5.86  <div></td><td><div> 0.824 <div></td><td><div> 3.43  <div></td><td><div> 3.796<div></td></tr>";
    table3.innerHTML += "<tr><td><div> 4.196  <div></td><td><div>3.638 <div></td><td><div> 0.489<div></td><td><div>  6.365<div></td></tr>";
    table3.innerHTML += "<tr><td><div>-6.445 <div></td><td><div> 1.047 <div></td><td><div> 2.698<div></td><td><div> -0.415<div></td></tr>";
    table3.innerHTML += "<tr><td><div>-2.932 <div></td><td><div> 1.677 <div></td><td><div> 0.742<div></td><td><div>  0.513<div></td></tr>";
    table3.innerHTML += "<tr><td><div>4.1  <div></td><td><div>  2.222 <div></td><td><div> 0.516 <div></td><td><div> 6.305<div></td></tr>";

    const container2 = document.createElement("div");
    container2.innerHTML += ">>";
    container2.style.fontSize = "32px";
    container2.style.marginTop = '350px';

    const container3 = document.createElement("div");
    container3.innerHTML += ">>";
    container3.style.fontSize = "32px";
    container3.style.marginTop = '350px';

    const container4 = document.createElement("div");
    container4.innerHTML += ">>";
    container4.style.fontSize = "32px";
    container4.style.marginTop = '350px';

    const img = document.createElement('img');
    img.src = 'assets/para2vecstep4.png';
    img.style.marginTop = "250px";
    img.style.marginBottom = "10px";
    img.style.marginLeft = "10px";
    img.style.width = '17%';
    img.style.height = 'auto';

    tableContainer.appendChild(img);
    tableContainer.appendChild(table1);
    tableContainer.appendChild(container2);
    tableContainer.appendChild(table2);
    tableContainer.appendChild(container3);
    tableContainer.appendChild(table5);
    tableContainer.appendChild(container4);
    tableContainer.appendChild(table3);

    canv.appendChild(tableContainer);

  }

  function UpdateWeightBias() {
    setfooter("step7");
    canv.innerHTML = meta();
  
    const tableContainer = document.createElement("div");
    tableContainer.style.display = "flex";
    tableContainer.style.overflow = 'auto';
    tableContainer.style.justifyContent = "space-between";

    const table1 = document.createElement("table");
    table1.style.marginTop = "250px";
    table1.style.marginLeft = "10px";
    table1.innerHTML += "<caption style=\"font-size: 30px\"> Initial Word Weight Matrix </caption>";
    table1.innerHTML += "<tr><td><div>0.264<div></td><td><div> -0.441<div></td><td><div> 0.329<div></td><td><div> 0.126<div></td></tr>";
    table1.innerHTML += "<tr><td><div>-0.3017<div></td><td><div> -0.132<div></td><td><div> -0.383<div></td><td><div> 0.107<div></td></tr>";
    table1.innerHTML += "<tr><td><div>-0.1947<div></td><td><div> -0.267<div></td><td><div> -0.122<div></td><td><div> -0.013<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.2895<div></td><td><div> -0.869<div></td><td><div> 0.188<div></td><td><div> -0.041<div></td></tr>";
    table1.innerHTML += "<tr><td><div>-0.1398<div></td><td><div> 0.877<div></td><td><div> -0.199<div></td><td><div> -0.076<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.1572<div></td><td><div> 0.047<div></td><td><div> -0.071<div></td><td><div> 0.209<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.3528<div></td><td><div> 0.294<div></td><td><div> 0.167<div></td><td><div> -0.204<div></td></tr>";
    table1.innerHTML += "<tr><td><div>-0.1549<div></td><td><div> -0.828<div></td><td><div> 0.285<div></td><td><div> 0.167<div></td></tr>";
    table1.innerHTML += "<tr><td><div>-0.2036<div></td><td><div> -0.192<div></td><td><div> 0.148<div></td><td><div> 0.134<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.2754<div></td><td><div> 0.074<div></td><td><div> -0.325<div></td><td><div> -0.215<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.3442<div></td><td><div> -0.206<div></td><td><div> -0.007<div></td><td><div> -0.106<div></td></tr>";
    table1.innerHTML += "<tr><td><div>0.1058<div></td><td><div> 0.121<div></td><td><div> -0.187<div></td><td><div> -0.228<div></td></tr>";

    const table4 = document.createElement("table");
    table4.style.marginTop = "250px";
    table4.innerHTML += "<caption style=\"font-size: 30px\"> Updated Word Weight Matrix </caption>";
    table4.innerHTML += "<tr><td style='background-color:red'><div>0.147<div></td><td style='background-color:red'><div> -0.895<div></td><td style='background-color:red'><div> 0.282<div></td><td style='background-color:green'><div> 0.784<div></td></tr>";
    table4.innerHTML += "<tr><td style='background-color:red'><div>-0.3258<div></td><td style='background-color:green'><div> -0.032<div></td><td style='background-color:green'><div> -0.248<div></td><td style='background-color:green'><div> 0.253<div></td></tr>";
    table4.innerHTML += "<tr><td style='background-color:green'><div>-0.025<div></td><td style='background-color:red'><div> -0.369<div></td><td style='background-color:green'><div> -0.012<div></td><td style='background-color:red'><div> -0.089<div></td></tr>";
    table4.innerHTML += "<tr><td style='background-color:red'><div>0.186<div></td><td style='background-color:green'><div> -0.458<div></td><td style='background-color:green'><div> 0.784<div></td><td style='background-color:red'><div> -0.098<div></td></tr>";
    table4.innerHTML += "<tr><td style='background-color:green'><div>-0.001<div></td><td style='background-color:green'><div> 0.984<div></td><td style='background-color:red'><div> -0.369<div></td><td style='background-color:green'><div> 1.22<div></td></tr>";
    table4.innerHTML += "<tr><td style='background-color:red'><div>0.103<div></td><td style='background-color:red'><div> 0.001<div></td><td style='background-color:red'><div> -0.121<div></td><td style='background-color:green'><div> 1.209<div></td></tr>";
    table4.innerHTML += "<tr><td style='background-color:red'><div>0.145<div></td><td style='background-color:green'><div> 0.394<div></td><td style='background-color:red'><div> 0.161<div></td><td style='background-color:red'><div> -1.204<div></td></tr>";
    table4.innerHTML += "<tr><td style='background-color:green'><div>-0.1069<div></td><td style='background-color:red'><div> -0.987<div></td><td style='background-color:green'><div> 0.385<div></td><td style='background-color:green'><div> 1.167<div></td></tr>";
    table4.innerHTML += "<tr><td style='background-color:red'><div>-0.359<div></td><td style='background-color:green'><div> -0.025<div></td><td style='background-color:red'><div> 0.098<div></td><td style='background-color:red'><div> 0.022<div></td></tr>";
    table4.innerHTML += "<tr><td style='background-color:green'><div>0.385<div></td><td style='background-color:green'><div> 0.451<div></td><td style='background-color:red'><div> -0.542<div></td><td style='background-color:red'><div> -0.810<div></td></tr>";
    table4.innerHTML += "<tr><td style='background-color:green'><div>0.3789<div></td><td style='background-color:red'><div> -0.692<div></td><td style='background-color:red'><div> -0.058<div></td><td style='background-color:green'><div> 0.736<div></td></tr>";
    table4.innerHTML += "<tr><td style='background-color:green'><div>0.1471<div></td><td style='background-color:red'><div> 0.027<div></td><td style='background-color:green'><div> -0.198<div></td><td style='background-color:red'><div> -0.520<div></td></tr>";

    const table2 = document.createElement("table");
    table2.style.marginTop = "250px";
    table2.innerHTML += "<caption style=\"font-size: 30px\"> Initial Paragraph Weight Matrix </caption>";
    table2.innerHTML += "<tr><td><div>0.031<div></td><td><div> 0.398<div></td><td><div> -0.447<div></td><td><div> 0.273<div></td></tr>";
    table2.innerHTML += "<tr><td><div>-0.323<div></td><td><div> -0.002<div></td><td><div> 0.005<div></td><td><div> 0.942<div></td></tr>";
    table2.innerHTML += "<tr><td><div>-0.043<div></td><td><div> 0.027<div></td><td><div> -0.224<div></td><td><div> -0.094<div></td></tr>";
    table2.innerHTML += "<tr><td><div>0.119<div></td><td><div> 0.118<div></td><td><div> 0.427<div></td><td><div> 0.102<div></td></tr>";
    table2.innerHTML += "<tr><td><div>-0.376<div></td><td><div> -0.109<div></td><td><div> 0.127<div></td><td><div> -0.461<div></td></tr>";

    const table5 = document.createElement("table");
    table5.style.marginTop = "250px";
    table5.innerHTML += "<caption style=\"font-size: 30px\"> Updated Paragraph Weight Matrix </caption>";
    table5.innerHTML += "<tr><td style='background-color:red'><div>0.025<div></td><td style='background-color:green'><div> 0.451<div></td><td style='background-color:green'><div> -0.256<div></td><td style='background-color:green'><div> 0.284<div></td></tr>";
    table5.innerHTML += "<tr><td style='background-color:green'><div>-0.154<div></td><td style='background-color:red'><div> -0.062<div></td><td style='background-color:red'><div> 0.001<div></td><td style='background-color:green'><div> 0.987<div></td></tr>";
    table5.innerHTML += "<tr><td style='background-color:red'><div>-0.089<div></td><td style='background-color:green'><div> 0.456<div></td><td style='background-color:green'><div> -0.147<div></td><td style='background-color:green'><div> -0.023<div></td></tr>";
    table5.innerHTML += "<tr><td style='background-color:red'><div>0.021<div></td><td style='background-color:green'><div> 0.254<div></td><td style='background-color:green'><div> 0.578<div></td><td style='background-color:red'><div> 0.057<div></td></tr>";
    table5.innerHTML += "<tr><td style='background-color:green'><div>-0.245<div></td><td style='background-color:green'><div> -0.012<div></td><td style='background-color:green'><div> 0.250<div></td><td style='background-color:green'><div> -0.261<div></td></tr>";

    const table3 = document.createElement("table");
    table3.style.marginTop = "250px";
    table3.innerHTML += "<caption style=\"font-size: 30px\"> Initial Bias Matrix </caption>";
    table3.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";
    table3.innerHTML += "<tr><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td><td><div>0<div></td></tr>";

    const table6 = document.createElement("table");
    table6.style.marginTop = "250px";
    table6.style.marginRight = "10px";
    table6.innerHTML += "<caption style=\"font-size: 30px\"> Updated Bias Matrix </caption>";
    table6.innerHTML += "<tr><td style='background-color:green'><div>0.25<div></td><td style='background-color:red'><div>-0.12<div></td><td style='background-color:green'><div>0.84<div></td><td style='background-color:red'><div>-0.91<div></td></tr>";
    table6.innerHTML += "<tr><td style='background-color:red'><div>-0.74<div></td><td style='background-color:green'><div>1.78<div></td><td style='background-color:red'><div>-0.74<div></td><td style='background-color:green'><div>1.68<div></td></tr>";
    table6.innerHTML += "<tr><td style='background-color:red'><div>-1.24<div></td><td style='background-color:red'><div>-1.45<div></td><td style='background-color:green'><div>0.62<div></td><td style='background-color:red'><div>-0.45<div></td></tr>";
    table6.innerHTML += "<tr><td style='background-color:red'><div>-0.62<div></td><td style='background-color:green'><div>1.98<div></td><td style='background-color:green'><div>1.25<div></td><td style='background-color:red'><div>-1.68<div></td></tr>";
    table6.innerHTML += "<tr><td style='background-color:red'><div>-0.64<div></td><td style='background-color:red'><div>-0.62<div></td><td style='background-color:green'><div>0.84<div></td><td style='background-color:green'><div>0.30<div></td></tr>";
    table6.innerHTML += "<tr><td style='background-color:green'><div>1.62<div></td><td style='background-color:green'><div>0.78<div></td><td style='background-color:red'><div>-0.74<div></td><td style='background-color:green'><div>0.01<div></td></tr>";
    table6.innerHTML += "<tr><td style='background-color:green'><div>0.89<div></td><td style='background-color:green'><div>1.54<div></td><td style='background-color:green'><div>0.54<div></td><td style='background-color:red'><div>-0.36<div></td></tr>";
    table6.innerHTML += "<tr><td style='background-color:red'><div>-0.76<div></td><td style='background-color:green'><div>1.02<div></td><td style='background-color:green'><div>0.98<div></td><td style='background-color:red'><div>-0.78<div></td></tr>";
    table6.innerHTML += "<tr><td style='background-color:green'><div>0.78<div></td><td style='background-color:red'><div>-0.71<div></td><td style='background-color:red'><div>-0.84<div></td><td style='background-color:green'><div>0.99<div></td></tr>";
    table6.innerHTML += "<tr><td style='background-color:red'><div>-0.98<div></td><td style='background-color:green'><div>1.61<div></td><td style='background-color:red'><div>-0.74<div></td><td style='background-color:red'><div>-1.48<div></td></tr>";

    const container2 = document.createElement("div");
    container2.innerHTML += ">>";
    container2.style.fontSize = "32px";
    container2.style.marginTop = '350px';

    const container3 = document.createElement("div");
    container3.innerHTML += ">>";
    container3.style.fontSize = "32px";
    container3.style.marginTop = '350px';

    const container4 = document.createElement("div");
    container4.innerHTML += ">>";
    container4.style.fontSize = "32px";
    container4.style.marginTop = '350px';

    const img = document.createElement('img');
    img.src = 'assets/para2vecstep5.png';
    img.style.marginTop = "250px";
    img.style.marginBottom = "10px";
    img.style.marginLeft = "10px";
    img.style.width = '17%';
    img.style.height = 'auto';

    tableContainer.appendChild(img);
    tableContainer.appendChild(table1);
    tableContainer.appendChild(container2);
    tableContainer.appendChild(table4);
    tableContainer.appendChild(table2);
    tableContainer.appendChild(container3);
    tableContainer.appendChild(table5);
    tableContainer.appendChild(table3);
    tableContainer.appendChild(container4);
    tableContainer.appendChild(table6);

    canv.appendChild(tableContainer);
  }
  
function setfooter( input ) // takes input from event listener and then 
{
    let footer = document.getElementById('footer');  
    switch( input ) {
        case "default": footer.innerHTML = "<h2>Welcome to the Para2vec step-by-step simulation!<div>The sidebar contains an image of the Para2vec architecture that will be updated throughout the simulation to display the current architecture.<div>Please select a model to continue.</h2>"; break;
        case "dm": footer.innerHTML = "<h2>Distributed Memory (DM) is one of two models for Para2vec</h2>"; break;
        case "dbo": footer.innerHTML = "<h2>Distribute Bag of Words (DBOW) is one of two models for Para2vec</h2>"; break;
        case "step4": footer.innerHTML = "<h2>In this step, input vectors are created by the concatenation of paragraph IDs and context words. The values for the paragraphs are taken by the paragraph weight matrix associated with each paragraph. Since batch size is 2 in the parameters, a batch of two input vectors is randomly selected and multiplied by the initial word weight matrix. This results in the predicted value for the center words of the given training vectors.</h2>"; break;
        case "step1": footer.innerHTML = "<h2>In this step, data is used as input for the Para2vec algortithm. Para2vec creates paragraph IDs based on the input data with 0 based indexing. Text processing occurs to create a vocabulary based on the unique words in the data. Each word in the vocabulary is then intialized as a vector based on the vector dimensions in the Para2vec parameters.</h2>"; break;
        case "step2": footer.innerHTML = "<h2>In this step, the paragraph ID, context word vectors, and center word vectors are concatenated to form an input matrix to be used in Para2vec training. Context word size is determined in the parameters, in this example context size is 1, therefore it takes 1 word from the left and right of the center word as context. The size of the input matrix is based on the amount of pre-generated batches, in this example we have 2.</h2>"; break;
        case "step3": footer.innerHTML = "<h2>In this step, Para2vec initializes the word and paragraph weight matrices along with the bias matrix. The size of the word weight matrix is based on the vocabulary size of the data, in this case, the vocabulary is 13. The size of the paragraph weight matrix is based on the number of paragraphs in the data, which is 5. The size of the bias matrix is based on the input matrix, and is intialized as a 0 matrix. All of these matrices have the same dimensions as the vector dimensions in the parameters.</h2>"; break;
        case "step5": footer.innerHTML = "<h2>In this step, the bias matrix is added to the predicted center word matrix to introduce another parameter that improves the accuracy of the model. The hyperbolic tangent function is then applied to the result matrix to introduce non linearity to the model. This allows the model to capture more complex relationships between words and paragraphs. </h2>"; break;
        case "step6": footer.innerHTML = "<h2>In this step, the hyperbolic tangent matrix is transformed by the softmax function to get the probability distribution of the vocabulary. The result matrix then uses the true center word matrix, which was gathered from the input matrix, to calculate the negative log likelihood loss of the predicted center word matrix. The negative log likelihood loss is a measure of how well the model predicts the true center word.</h2>"; break;
        case "step7": footer.innerHTML = "<h2>In this step, the negative log likelihood loss values are sent to the adam optimizer to update the weights. The weights will be updated for the word and paragraph matrices along with the bias matrix. The updated matrices are used in the next batch of training vectors. Once all training vectors have been trained, that is the end of one epoch. Once the number of epochs set in the parameter are met, the paragraph weight matrix is returned and is now ready to be used in other applications. Red indicates a decrease in value and green indicates increase.</h2>"; break;
    }
    footer.style.overflow='auto';
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
        case "Introduction and Model Selection": ModelSelection(); break;
        case "Initialization of Data": Input(); break;
        case "Input Matrix": InputMatrix(); break;
        case "Initialize Weight + Bias": Initialize(); break;
        case "Predict Center Word": ComputeCenter(); break;
        case "Hyperbolic Tangent": HiddenLayer(); break;
        case "Softmax and Loss": ComputeSoftmax(); break;
        case "Update Weight and Bias": UpdateWeightBias(); break;
    }
}
window.onload = (e) => {
    console.log('page loaded');
    updater(page_status);
};
 fwd_btn.addEventListener( "click", () => { updater( 1); } ); //adds listener to forwards and backwards button
back_btn.addEventListener( "click", () => { updater(-1); } );