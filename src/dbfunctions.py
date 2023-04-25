from models.entities.accounts import Account

class DbFunctions():

    @classmethod
    def get_accounts(cls, db, id: int):
        try:
            if not isinstance(id, int):
                raise ValueError('loginid must be an integer')
            cursor = db.cursor()
            sql = 'SELECT idaccount, loginid, currency, amount, datecreated, datemodified from account WHERE loginid = %s'
            cursor.execute(sql, (id,))
            rows = cursor.fetchall()
            accounts = []
            for row in rows:
                account = Account(row[0], row[1], row[2],row[3],row[4],row[5])
                accounts.append(account)
            return accounts
            
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def addAccountDistLoc(cls, db, loginid: int, currency, distribution_list,distribution_amounts, location_list, location_amounts, amount, datecreated, datemodified):
        try:
            if not isinstance(loginid, int):
                raise ValueError('loginid must be an integer')

            cursor = db.cursor()

            cursor.execute("START TRANSACTION")

            sql = "INSERT INTO account (loginid, currency, amount, datecreated, datemodified) VALUES (%s, %s, %s, %s,%s)"
            cursor.execute(sql, (loginid, currency, amount, datecreated, datemodified))
            accountid = cursor.lastrowid
            distributionid = []
            firstRegisters = []
            locationid = []
            
            for i in range(len(distribution_list)):
                sql = "INSERT INTO distribution (accountid, name, amount, datecreated, datemodified) VALUES (%s, %s, %s, %s,%s)"
                cursor.execute(sql, (accountid, distribution_list[i], distribution_amounts[i], datecreated, datemodified))
                distributionid.append(cursor.lastrowid)
                sql = "INSERT INTO registers (distributionid, register, total, datecreated, description, comment ) VALUES (%s,%s,%s,%s,%s,%s)"
                cursor.execute(sql, (cursor.lastrowid, distribution_amounts[i], distribution_amounts[i], datecreated, 0, 'First Register'))
                firstRegisters.append(cursor.lastrowid)    
                    
            for j in range(len(location_list)):
                sql = "INSERT INTO location (accountid, name, amount, datecreated, datemodified) VALUES (%s, %s, %s, %s,%s)"
                cursor.execute(sql, (accountid, location_list[j], location_amounts[j], datecreated, datemodified))
                locationid.append(cursor.lastrowid)

            db.commit()

            return (accountid, distributionid, locationid, firstRegisters)
        except Exception as ex:
            # Reversión de la transacción en caso de excepción
            db.rollback()
            raise Exception(ex)
             