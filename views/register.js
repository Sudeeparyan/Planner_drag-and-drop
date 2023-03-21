function nameToUpper(){
    var name = document.getElementById('name').value
    name = name.charAt(0).toUpperCase()+name.slice(1).toLowerCase()
    document.getElementById('name').value = name
}

function checkPassword(){
    var pwd = document.getElementById('password').value;
    if(pwd.length<15){
        if(pwd.length<8){
            document.getElementById('pout').innerText="Min Length Of Password is 8";
            document.getElementById('ppout').style.display = "block";
            document.getElementById('ppout').style.backgroundColor="red"
        }else if(pwd.length<11){
            document.getElementById('pout').innerText="";
            document.getElementById('ppout').style.backgroundColor="orange"
        }
    }else{
        document.getElementById('ppout').style.backgroundColor="green"
    }
}

function showPassowrd(){
    var pwd = document.getElementById('password');
    if(pwd.type == 'password'){
        pwd.type = "text"
    }else{
        pwd.type = "password"
    }
}





