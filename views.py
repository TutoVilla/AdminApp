# views.py
from flask import render_template, request, redirect, session
from flask import url_for
from app import app

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        
        user = 'tutovilla'
        mypassword = '1234'
        # Si no hay usuario o la contraseña es incorrecta, muestra un mensaje de error.
        if (user != username )or (password != mypassword):
            message = 'Nombre de usuario o contraseña incorrectos'
            return render_template('login.html', message=message)

        # De lo contrario, almacena el id del usuario en la sesión y redirige al usuario a la página principal.
        return redirect(url_for('index'))
        
    return render_template('login.html')
