from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import UserMixin


class User(UserMixin):
   
    def __init__(self, id, username, password, fullname="", email="",country="",datecreated="") -> None:
        self.id = id
        self.username = username
        self.password = password
        self.fullname = fullname
        self.email = email
        self.country = country
        self.datecreated = datecreated

    @classmethod
    def check_password(self,hashed_password, password):
        return check_password_hash(hashed_password,password)
    
    @classmethod
    def hashear(self,password):
        return generate_password_hash(password)
    