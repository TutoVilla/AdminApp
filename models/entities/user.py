from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import UserMixin


class User(UserMixin):
    
    def __init__(self, id, username, password, fullname="", userid=None) -> None:
        self.id = id
        self.username = username
        self.password = password
        self.fullname = fullname
        self.userid = userid

    @classmethod
    def check_password(self,hashed_password, password):
        return check_password_hash(hashed_password,password)

    # def hashear():
    #     print (generate_password_hash('19253790'))
    
    # hashear()