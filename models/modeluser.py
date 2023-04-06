from models.entities.user import User


class ModelUser():
    
    @classmethod
    def login(self,db,user):
        try:
            cursor=db.cursor()
            sql = """SELECT id, username, password, fullname, userid FROM login 
                    WHERE username = '{}'""".format(user.username)
            cursor.execute(sql)
            row=cursor.fetchone()
            if row != None:
                user = User(row[0],row[1],User.check_password(row[2],user.password),row[3],row[4])
                return user
            else:
                return None
        except Exception as ex:
            raise Exception(ex)
        
    @classmethod
    def get_by_id(self, db, idlogin):
        try:
            cursor = db.cursor()
            sql = "SELECT id, username, fullname, userid FROM login WHERE id = {}".format(idlogin)
            cursor.execute(sql)
            row = cursor.fetchone()
            if row != None:
                return User(row[0], row[1], None, row[2],row[3])
            else:
                return None
        except Exception as ex:
            raise Exception(ex)  
        
    @classmethod
    def get_accounts(self, db, loginid=int):
        try:
            cursor = db.cursor()
            sql = "SHOW TABLES LIKE 'accounts'"
            cursor.execute(sql)
            exist = cursor.fetchone() is not None
            if exist:
                sql = 'SELECT loginid, type, amount, idaccount from accounts WHERE loginid = {}'.format(loginid)
                cursor.execute(sql)
                accounts = cursor.fetchall()
                return accounts
            else:
                return None 
        except Exception as ex:
            raise Exception(ex)

       

        # Verificar si la tabla existe
        tabla_existente = mycursor.fetchone() is not None

        # Si la tabla no existe, crearla
        if not tabla_existente:
            mycursor.execute("CREATE TABLE mi_tabla (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(255), edad INT)")

        # Cerrar la conexión a la base de datos
        mydb.close()