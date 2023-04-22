from models.entities.user import User


class ModelUser():

    @classmethod
    def login(self, db, user):
        try:
            cursor = db.cursor()
            sql = """SELECT id, username, password FROM login 
                    WHERE username = '{}'""".format(user.username)
            cursor.execute(sql)
            row = cursor.fetchone()
            if row != None:
                user = User(row[0], row[1], User.check_password(
                    row[2], user.password))
                return user
            else:
                return None
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_by_id(self, db, idlogin):
        try:
            cursor = db.cursor()
            sql = "SELECT id, username, fullname, email, country, datecreated FROM login WHERE id = {}".format(
                idlogin)
            cursor.execute(sql)
            row = cursor.fetchone()
            if row != None:
                return User(row[0], row[1], None, row[2], row[3], row[4], row[5])
            else:
                return None
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_accounts(self, db, id: int):
        try:
            if not isinstance(id, int):
                raise ValueError('loginid must be an integer')

            cursor = db.cursor()
            sql = 'SELECT idaccount, currency, amount, datecreated, name, datemodified from account WHERE loginid = %s'
            cursor.execute(sql, (id,))
            accounts = cursor.fetchall()
            return accounts
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def new_user(self, db, newuser):

        try:
            cursor = db.cursor()
            sql = "SELECT * FROM login WHERE username = %s OR email = %s"
            cursor.execute(sql, (newuser.username, newuser.email))
            result = cursor.fetchone()
            if result is not None:
                return False, result[1], result[4]
            else:
                sql = "INSERT INTO login (username, password, fullname, email, country, datecreated) VALUES (%s, %s, %s, %s, %s, %s)"
                cursor.execute(sql, (newuser.username, User.hashear(
                    newuser.password), newuser.fullname, newuser.email, newuser.country, newuser.datecreated))
                db.commit()
                return True
        except Exception as ex:
            raise Exception(ex)
