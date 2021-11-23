
    document.getElementById('auth-button').onclick = async() => {
        
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        
        let basicToken = btoa(`Bearer ${email}:${password}`);
        
        
        let response = await fetch(window.location.href + `authorize`, {
            method: "POST",
            
            headers:{
                'Authorization': basicToken
            }
        });
        
        if(response.status == 200){
            window.open('/access', "_blank");
        }
    };


