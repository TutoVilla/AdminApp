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



-----------------------------------------
    <div >
  {% if accounts|length != 0 %}
  {% for account in accounts %}
  <div class="col-md-5">
    <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
      <div class="col p-4 d-flex flex-column position-static">
        <strong class="d-inline-block mb-2 text-primary">Account in {{ account.currency }}</strong>
        <h3 class="mb-0"> {{ account.currency }}{{ account.amount }} </h3>
        <div class="mb-1 text-body-secondary">Last Update {{ account.datemodified.strftime('%d/%m/%Y') }}
          <br />{{ account.datemodified.strftime("%H:%M:%S") }}
        </div>
        <div>
          <H1 class="mb-0">LOCATIONS</H1>
          {% for loca in locs %}
          {% if loca.accountid == account.id %}
          <div class="d-inline-block flex-row flex-column">
            <h5 class="mb-0"> {{ loca.name }} --> {{ loca.amount }} </h5>
          </div>
          <br />
          {% endif %}
          {% endfor %}

        </div>
        <div>
          <H1 class="mb-0">DISTRIBUTION</H1>
          {% for dstr in dsrts %}
          {% if dstr.accountid == account.id %}
          <div class="d-inline-block flex-row flex-column">
            <h5 class="mb-0"> {{ dstr.name }} --> {{ dstr.amount }} </h5>
          </div>
          <br />
          {% endif %}
          {% endfor %}
        </div>
        <H1 class="mb-0">----------------------------</H1>
        {% for total in totals %}
        {% if total.accountid == account.id %}
        <div class="d-inline-block flex-row flex-column">
          <h5 class="mb-0"> TOTAL IN ACCOUNT: {{ account.currency }}{{ total.total }} </h5>
        </div>
        <br />
        {% endif %}
        {% endfor %}
      </div>
      <a href="#" class="stretched-link">Continue reading</a>
    </div>
  </div>
</div>
{% endfor %}
{% else %}
<div class="col-md-12">
  <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
    <p>No accounts found.</p>
    <a href="{{ url_for('addact') }}" class="stretched-link">Create new account</a>
  </div>
</div>
{% endif %}
</div>