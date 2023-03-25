from flask import Flask, render_template, LoginManager, url_for
login_manager = LoginManager()


app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')



if __name__ == '__main__':
    
    app.run(host='0.0.0.0',port=4000, debug=True)
