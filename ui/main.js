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