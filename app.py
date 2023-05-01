from flask import Flask, render_template, request, redirect, url_for, flash
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_wtf.csrf import CSRFProtect
import datetime
import re

import mysql.connector

from config import config, DevelopmentConfig

# models
from models.modeluser import ModelUser
# entities
from models.entities.user import User
from models.entities.accounts import Account, Distribution, Location, Total

# Functions
from src.dbfunctions import DbFunctions

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
def load_user(id):
    current_user = ModelUser.get_by_id(db, id)
    return current_user


@app.route('/')
def index():
    return redirect(url_for('login'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = User(0, request.form['username'], request.form['password'])
        logged_user = ModelUser.login(db, user)
        if logged_user and logged_user.password:
            login_user(logged_user)
            return redirect(url_for('home'))
        flash('Invalid Password') if logged_user else flash('User not Found...')
    return render_template('auth/login.html')


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':

        now = datetime.datetime.now()
        date = now.strftime("%Y-%m-%d")
        newUser = User(0, request.form['username'],
                       request.form['password'],
                       request.form['fullname'],
                       request.form['email'],
                       'CTB',
                       date
                       )
        if len(newUser.password) < 8:
            flash('Password to short')
            return render_template('auth/signup.html')

        pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$'
        if not re.match(pattern, newUser.password):
            flash('The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.')
            return render_template('auth/signup.html')

        if newUser.password != request.form['confirm_password']:
            flash('The Passwords must match')
            return render_template('auth/signup.html')

        result = ModelUser.new_user(db, newUser)
        print(result)
        if type(result) == bool:
            return render_template('auth/login.html')
        else:
            if result[1] == request.form['username']:
                flash('User already exists')
            if result[2] == request.form['email']:
                flash('Email already exists')
            return render_template('auth/signup.html')

    else:
        return render_template('auth/signup.html')


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('login'))


@app.route('/home', methods=['GET', 'POST'])
@login_required
def home():
    accounts = DbFunctions.get_accounts(db, current_user.id)
    if request.method == 'GET':

        dstrs = []
        locs = []
        totals = []
        totalDst = 0
        totalLoc = 0

        if len(accounts) > 0:
            for account in accounts:
                dst = DbFunctions.get_distribution(db, account.id)
                loca = DbFunctions.get_location(db, account.id)
                for i in dst:
                    dstrs.append(i)
                    totalDst += i.amount
                for i in loca:
                    locs.append(i)
                    totalLoc += i.amount

                total = Total(
                    round(float((totalLoc - totalDst)), 2), account.id)
                totals.append(total)

        return render_template('home.html', accounts=accounts, dsrts=dstrs, locs=locs, totals=totals)

    elif request.method == 'POST':
        return render_template(url_for('home'))


@app.route('/addact', methods=['GET', 'POST'])
@login_required
def addact():

    if request.method == 'GET':
        accounts = DbFunctions.get_accounts(db, current_user.id)
        currencies = []
        if len(accounts) != 0:
            for account in accounts:
                currencies.append(account.currency)
        return render_template('views/addaccount.html', accounts=currencies)
    elif request.method == 'POST':
        inicialAmount = request.form['amount']
        currency = request.form['currency_type']
        now = datetime.datetime.now()
        date = now.strftime("%Y-%m-%d %H:%M:%S")

        # amount of distributions
        temp = [key for key in request.form.keys(
        ) if re.match(r'^amount-\d+$', key)]
        amount_values = []
        for var in temp:
            value = request.form[var]
            if value.strip():
                try:
                    amount_values.append(float(value))
                except ValueError:
                    amount_values.append(0.0)
            else:
                amount_values.append(0.0)

        # name of distributions
        temp = [key for key in request.form.keys(
        ) if re.match(r'^Dist-\d+$', key)]
        distList = [request.form[var] for var in temp]

        # amount of Locations
        temp = [key for key in request.form.keys(
        ) if re.match(r'^amountB-\d+$', key)]
        amountB_values = []
        for var in temp:
            value = request.form[var]
            if value.strip():
                try:
                    amountB_values.append(float(value))
                except ValueError:
                    amountB_values.append(0.0)
            else:
                amountB_values.append(0.0)

        # name of locations
        temp = [key for key in request.form.keys() if re.match(r'^loc-\d+$', key)]
        locationList = [request.form[var] for var in temp]

        DbFunctions.addAccountDistLoc(db, current_user.id, currency, distList,
                                      amount_values, locationList, amountB_values, inicialAmount, date, date,)
        return redirect(url_for('home'))

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
