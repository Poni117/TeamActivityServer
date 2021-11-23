    document.querySelector('.reg-button').onclick = async (event) => {
        event.preventDefault();
        
        let email = document.getElementById('email').value;
        
        let password = document.getElementById('password').value;
        
        let confirmPassword = document.getElementById('confirm-password').value;
        
        if (email.length == 0) {
            return;
        }
        
        if(password != confirmPassword){
            let form = document.querySelector('.box');
            let err = document.createElement('h1');
            err.setAttribute('value', 'error');
            err.setAttribute('class', 'error');
            
            form.appendChild(err);
            return;
        }

        let state = '';
        
        if (localStorage.getItem('state') === null) {

            var possible = email + password;

            for (var i = 0; i < 3; i++){

                state += possible.charAt(Math.floor(Math.random() * possible.length));
                state = btoa(state);
            } 

            localStorage.setItem('state', state);
        }
        else{
            state = localStorage.getItem('state')
        }

        if (localStorage.getItem('basicToken') === null) {
            
            localStorage.setItem('basicToken', "Basic " + btoa(email + ":" + password))
        }
        
        let response = await fetch(`https://actionsofemployees.herokuapp.com/registration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                state: state,
                email: email,
                password: password
            })
        });

        if(response.status == 201){
            window.open(`https://actionsofemployees.herokuapp.com/access?state=${state}`, "_self");
        }
    };