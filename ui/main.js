//Submit username,password to login
    var submit = document.getElementById('submit_btn');
    submit.onclick = function(){
    //Create request object
    var request = new XMLHttpRequest();
    
    //Capture the request
    request.onreadystatechange = function(){
    if(request.readyState === XMLHttpRequest.DONE){
    //take some action
    if(request.status === 200){
        console.log('user logged in!');
        alert('Logged in successfully!');
    }else if (request.status === 403){
        alert('Username/password is incorrect!');
    }else if (request.status === 500){
        alert('Something went wrong in server');
    }
    }
    //Not done yet
    };
    
    //Make request
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST','http://bhanusahoo08.imad.hasura-app.io/login',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username:username,password:password}));
    };