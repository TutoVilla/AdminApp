if (elements.length == 2){    
    elements.forEach(function(element){
        const el = document.getElementById(element);
    
        el.addEventListener('input', () => {
            const valor = initialAmount.value - restAmount.value
        console.log(valor);
        return valor
        })})}

        if (elements.length == 2){    
            elements.forEach(function(element){
                const el = document.getElementById(element);
            
                el.addEventListener('input', () => {
                    const valor = initialAmount.value - restAmount.value
                console.log(valor);
                output.textContent = `El valor actual del input es: ${valor}`;
            });
        });
        }
        else{
        
            for (let j = 0; j < elements.length; j++){
                element = document.getElementById('')
                valor = valor - element.value
            }
        }


        function setListener(array,inicial,indexingb,ii){
            const second = document.getElementById(array[ii])
              second.addEventListener("input", () => {
                  var sum = 0;
                  for (let d = 1; d < array.length; d++) {
                    const amountRest = document.getElementById(indexingb + d).value;
                    let amount = amountRest != undefined ? amountRest : 0;
                    sum += amount;
                    console.log(sum)
                  }
                  const valueToRest = inicial.value - sum;
                  console.log(valueToRest)
                  return valueToRest
              })
          }


          //-----------



          if (elements.length = 2){

            elements.forEach(function(element){
                const el = document.getElementById(element);
            
                el.addEventListener('input', () => {
                  var restAmount = (document.getElementById(elements[1])).value
                  var valor = initialAmount
                  valor = initialAmount.value - restAmount
                  output.textContent = `El valor actual del input es: ${valor}`
                })
              })
            }
          
            else{
              elements.forEach(function(element){
                const el = document.getElementById(element);
                var valor = initialAmount
                var restAmount =1000
                  valor = initialAmount.value - restAmount
                  output.textContent = `El valor actual del input es: ${valor}`
                el.addEventListener('input', () => {
            }
          )})
            }


          //

          @classmethod
    def get_accounts(self, db, loginid=int):
        try:
            cursor = db.cursor()
            sql = 'SELECT idaccount, currency, amount, datecreated, name, datemodified from account WHERE loginid = {}'.format(
                loginid)
            cursor.execute(sql)
            accounts = cursor.fetchall()
            if accounts != None:
                return accounts
            else:
                return None
        except Exception as ex:
            raise Exception(ex)


            //-------------------

            <link rel="stylesheet" href="{{ url_for('static', filename='css/login.css') }}">
<!-- Custom styles for this template -->
<form class="form-signin" action="/login" method="POST">
    <img class="mb-4" src="{{ url_for('static', filename='img/logo.png') }}" alt="" width="100" height="60">
    {% with messages = get_flashed_messages() %}
    
    {% if messages %}
    <br />
    {% for message in messages %}
    <div class="alert alert-primary alert-dismissible" role="alert">
        <strong>{{ message }}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    {% endfor %}
    {% endif %}

    {% endwith %}
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
    <input type="hidden" name="csrf_token" value="{{ csrf_token() }}">
    <div class="form-floating">
        <input type="text" class="form-control" id="username" name="username" placeholder="Username">
        <label for="username">Username</label>
    </div>
    <div class="form-floating mt-2">
        <input type="password" class="form-control" name="password" placeholder="Password">
        <label for="password">Password</label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit">Log in</button>
</form>
    <button class="mt-2 w-100 btn btn-lg btn-primary form-signin" type="submit">Sign up</button>