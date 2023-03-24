from flask import Flask
from flask_simplelogin import SimpleLogin


app = Flask(__name__)
SimpleLogin(app)


if __name__ == '__main__':
    
    app.run(host='0.0.0.0',port=4000, debug=True)
