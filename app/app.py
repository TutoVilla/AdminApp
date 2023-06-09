from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, abort
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_wtf.csrf import CSRFProtect, validate_csrf
from wtforms import ValidationError

import datetime
import re
import json
import mysql.connector
from config import config, DevelopmentConfig

# models
from models.modeluser import ModelUser
# entities
from models.entities.user import User
from models.entities.accounts import Total

# Functions
from src.dbfunctions import DbFunctions

app = Flask(__name__)
csrf = CSRFProtect()
login_manager_app = LoginManager(app)

db = mysql.connector.connect(
        user = DevelopmentConfig.MYSQL_USER,
        password = DevelopmentConfig.MYSQL_PASSWORD,
        host = DevelopmentConfig.MYSQL_HOST,
        port = DevelopmentConfig.MYSQL_PORT,
        database = DevelopmentConfig.MYSQL_DB
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

        pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]+$'

        if not re.match(pattern, newUser.password):
            error_messages = []
            if not re.search(r'[a-z]', newUser.password):
                error_messages.append('Debe contener al menos una letra minúscula.')
            if not re.search(r'[A-Z]', newUser.password):
                error_messages.append('Debe contener al menos una letra mayúscula.')
            if not re.search(r'\d', newUser.password):
                error_messages.append('Debe contener al menos un dígito.')
            if not re.search(r'[@$!%*?&.]', newUser.password):
                error_messages.append(
                        'Debe contener al menos uno de los siguientes caracteres especiales: @$!%*?&.')
        
                flash('La contraseña no cumple con los siguientes requisitos: {}'.format(
                ', '.join(error_messages)))
            return render_template('auth/signup.html')

        if newUser.password != request.form['confirm_password']:
            flash('The Passwords must match')
            return render_template('auth/signup.html')

        result = ModelUser.new_user(db, newUser)

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

        if len(accounts) > 0:

            for account in accounts:
                totalDst = 0
                totalLoc = 0
                dst = DbFunctions.get_distribution(db, account.id)
                loca = DbFunctions.get_location(db, account.id)
                for i in dst:
                    dstrs.append(i)
                    totalDst += i.amount
                for j in loca:
                    locs.append(j)
                    totalLoc += j.amount

                total = Total(
                    round(float((totalLoc - totalDst)), 2), account.id)
                totals.append(total)
        return render_template('home.html', accounts=accounts, dsrts=dstrs, locs=locs, totals=totals)

    elif request.method == 'POST':

        return render_template('home.html')


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
        inicialAmount = 0
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


@app.route('/to_delete/<int:account_id>')
@login_required
def toDelete(account_id):
    accountName = DbFunctions.get_account(db, account_id)

    return jsonify(objecto=accountName.currency)


@app.route('/delete_account/<int:account_id>')
@login_required
def delete(account_id):
    DbFunctions.delete_account(db, account_id)
    return redirect(url_for('home'))


@app.route('/update_account', methods=['POST'])
def update_account():
    csrf_token = request.form.get('csrf_token')
    try:
        validate_csrf(csrf_token)
    except ValidationError:
        abort(400, 'Token CSRF inválido')
    loc_data = request.form.get('loc_data')
    loc_dict = json.loads(loc_data)
    idaccount = request.form.get('account_id')
    id = int(idaccount)

    DbFunctions.update_location(db, loc_dict, id)

    return jsonify({'message': 'Location updated successfully'})

@app.route('/addtransaction', methods=['GET', 'POST'])
@login_required
def addtransaction():
    accounts = DbFunctions.get_accounts(db, current_user.id)
    if request.method == 'GET':
        showaccount = request.args.get('showaccount', 0)
        return render_template('views/addtransaction.html', accounts=accounts, showaccount=showaccount)
    else:
        csrf_token = request.form.get('csrf_token')
        try:
            validate_csrf(csrf_token)
        except ValidationError:
            abort(400, 'Token CSRF inválido')
        data = json.loads(request.form.get('holders_Values'))
        datalist = []
        for key, values_list in data.items():
            new_key = int(key)
            for value_dict in values_list:
                new_list = []
                for val, lst in value_dict.items():
                    val_float = round(float(val), 2)
                    val_int = int(lst[0])
                    val_str = lst[1]
                    new_list = [new_key, val_float, val_int, val_str]
                    if val_float != 0:
                        datalist.append(new_list)

        DbFunctions.update_registers(db, datalist)
        response = {'message': 'Actualización exitosa'}
        return jsonify(response)


@app.route('/selectaccount', methods=['POST'])
@login_required
def selectaccount():
    csrf_token = request.form.get('csrf_token')
    try:
        validate_csrf(csrf_token)
    except ValidationError:
        abort(400, 'Token CSRF inválido')
    id = int(request.form.get('id'))
    accounts = DbFunctions.get_account(db, id)
    totalDst = 0
    totalLoc = 0
    dstr = {}
    iddstr = {}
    dst = DbFunctions.get_distribution(db, id)
    loca = DbFunctions.get_location(db, id)
    dateupdated = accounts.datemodified
    descriptions = DbFunctions.get_descriptions(db)
    for i in dst:
        dstr[i.name] = i.amount
        iddstr[i.name] = i.iddistribution
        totalDst += i.amount
    for j in loca:
        totalLoc += j.amount
    total = round(float((totalLoc - totalDst)), 2)

    object = {
        'total': total,
        'id': id,
        'lastupdate': dateupdated,
        'holders': dstr,
        'idholders': iddstr,
        'currency': accounts.currency,
        'descriptions': descriptions
    }
    return jsonify(object)

@app.route('/accountdetails', methods=['GET', 'POST'])
@login_required
def accountdetails():
    accounts = DbFunctions.get_accounts(db, current_user.id)
    return render_template('views/accountdetails.html')


@app.route('/getdetails', methods=['POST'])
@login_required
def getdetails():
    csrf_token = request.form.get('csrf_token')
    try:
        validate_csrf(csrf_token)
    except ValidationError:
        abort(400, 'Token CSRF inválido')
    holderId = int(request.form.get('holderid'))
    accounts = DbFunctions.get_Details(db, holderId)

    # Convertir la lista de objetos Register en una lista de diccionarios
    register_dict_list = [register.to_dict() for register in accounts]

    return jsonify(register_dict_list)


def status_401(error):
    return redirect(url_for('login'))


def status_404(error):
    return "<h1>Página no encontrada</h1>", 404


if __name__ == '__main__':
    app.config.from_object(config['development'])
    csrf.init_app(app)
    app.register_error_handler(401, status_401)
    app.register_error_handler(404, status_404)
    app.run(host='0.0.0.0', port=5000)
