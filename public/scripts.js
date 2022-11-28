const homebtn = document.getElementById( "navhome"  ),
      w2vbtn1 = document.getElementById( "navword1" ),
      w2vbtn2 = document.getElementById( "navword2" ),
      p2vbtn1 = document.getElementById( "navpara1" ),
      p2vbtn2 = document.getElementById( "navpara2" ),
      adambtn = document.getElementById( "navadam"  );

homebtn.addEventListener('click', () => { fetch( '/',     { method:'GET', } ).then( response => response.json ); }, false );
w2vbtn1.addEventListener('click', () => { fetch( '/w2v1', { method:'GET', } ).then( response => response.json ); }, false );
w2vbtn2.addEventListener('click', () => { fetch( '/w2v2', { method:'GET', } ).then( response => response.json ); }, false );
p2vbtn1.addEventListener('click', () => { fetch( '/p2v1', { method:'GET', } ).then( response => response.json ); }, false );
p2vbtn2.addEventListener('click', () => { fetch( '/p2v2', { method:'GET', } ).then( response => response.json ); }, false );
adambtn.addEventListener('click', () => { fetch( '/adam', { method:'GET', } ).then( response => response.json ); }, false );
homebtn.onclick = "window.location = 'https://visnlp.herokuapp.com/';";
w2vbtn1.onclick = "window.location = 'https://visnlp.herokuapp.com/w2v1/';";
w2vbtn2.onclick = "window.location = 'https://visnlp.herokuapp.com/w2v2/';";
p2vbtn1.onclick = "window.location = 'https://visnlp.herokuapp.com/p2v1/';";
p2vbtn2.onclick = "window.location = 'https://visnlp.herokuapp.com/p2v2/';";
adambtn.onclick = "window.location = 'https://visnlp.herokuapp.com/adam/';";