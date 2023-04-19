from flask import Flask, render_template, request, redirect, url_for, flash
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_wtf.csrf import CSRFProtect

import mysql.connector

from config import config, DevelopmentConfig

#models
from models.modeluser import ModelUser
#entities
from models.entities.user import User

app = Flask(__name__)
csrf = CSRFProtect()
login_manager_app = LoginManager(app)
# Database conexion
db = mysql.connector.connect(
        host=DevelopmentConfig.MYSQL_HOST,
        user=DevelopmentConfig.MYSQL_USER,
        password=DevelopmentConfig.MYSQL_PASSWORD,
        port=DevelopmentConfig.MYSQL_PORT,
        database=DevelopmentConfig.MYSQL_DB
    )

@login_manager_app.user_loader
def load_user(idlogin):
    current_user = ModelUser.get_by_id(db, idlogin)
    return current_user

@app.route('/')
def index():
    return redirect(url_for('login'))

@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        user = User(0,request.form['username'],request.form['password'])
        logged_user = ModelUser.login(db,user)
        if logged_user and logged_user.password:
            login_user(logged_user)
            return redirect(url_for('home'))
        flash('Invalid Password') if logged_user else flash('User not Found...')
    return render_template('auth/login.html')

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/home', methods=['GET','POST'])
@login_required
def home():
    if request.method == 'GET': 
        accounts = ModelUser.get_accounts(db,current_user.userid)
        return render_template('home.html', accounts=accounts)
    else:    
        return render_template('views/addaccount.html')

@app.route('/addact', methods=['GET','POST'])
@login_required
def addact():
    if request.method == 'GET': 
        
        return render_template('views/addaccount.html')
    else: 
        a = request.form['amount'] 
        b = request.form['currency_type']  
        print(b)
        return render_template('home.html')
    

def status_401(error):
    return redirect(url_for('login'))

def status_404(error):
    return "<h1>Página no encontrada</h1>", 404

if __name__ == '__main__':
    app.config.from_object(config['development'])
    csrf.init_app(app)
    app.register_error_handler(401, status_401)
    app.register_error_handler(404, status_404)
    app.run(port=8080)
    
