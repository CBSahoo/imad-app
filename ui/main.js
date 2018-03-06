var button = document.getElementById('counter');

button.onclick = function(){
    //Create a request
    var request = new XMLHttpRequest();
    
    //Capture the request
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //take some action
            if(request.status === 200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();            
            }
        }
        //Not done yet
    };
    
    //Make request
    request.open('GET','http://bhanusahoo08.imad.hasura-app.io/counter',true);
    request.send(null);
};

var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');
submit.onclick = function(){
    //Create request object
     var request = new XMLHttpRequest();
    
    //Capture the request
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //take some action
            if(request.status === 200){
               var names = request.responseText;
               names = JSON.parse(names);
  var list = '';
  for (var i=0;i<names.length;i++){
      list += '<li>' + names[i] + '</li>';
  }
  var ul = document.getElementById('namelist');
  ul.innerHTML = list;        
            }
        }
        //Not done yet
    };
    
    //Make request
    request.open('GET','http://bhanusahoo08.imad.hasura-app.io/submit-name?name=' +name,true);
    request.send(null);
};