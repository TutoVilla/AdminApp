from models.entities.accounts import Account

class DbFunctions():

    @classmethod
    def get_accounts(cls, db, id: int):
        try:
            if not isinstance(id, int):
                raise ValueError('loginid must be an integer')
            cursor = db.cursor()
            sql = 'SELECT idaccount, loginid, currency, amount, datecreated, name, datemodified from account WHERE loginid = %s'
            cursor.execute(sql, (id,))
            rows = cursor.fetchall()
            accounts = []
            for row in rows:
                account = Account(row[0], row[1], row[2],row[3],row[4],row[5],row[6])
                accounts.append(account)
            return accounts
            
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def addAccount(cls, db, iduser: int, currency):
        try:
            if not isinstance(id, int):
                raise ValueError('loginid must be an integer')
            cursor = db.cursor()
            sql = 'SELECT * from account WHERE loginid = %s'
            cursor.execute(sql, (id,))
            accounts = cursor.fetchall()
            return accounts
        
            
        
        
        except Exception as ex:
            raise Exception(ex)
