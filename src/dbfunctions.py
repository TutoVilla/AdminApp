from models.entities.accounts import Account, Distribution, Location


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
                account = Account(row[0], row[1], row[2],
                                  round(row[3], 2), row[4], row[5])
                accounts.append(account)
            return accounts

        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_distribution(cls, db, idaccount: int):
        try:
            if not isinstance(idaccount, int):
                raise ValueError('idaccount must be an integer')
            cursor = db.cursor()
            sql = 'SELECT iddistribution, name, amount from distribution WHERE accountid = %s'
            cursor.execute(sql, (idaccount,))
            rows = cursor.fetchall()
            dstrs = []
            for row in rows:
                dstr = Distribution(row[0], idaccount,
                                    row[1], round(row[2], 2), '', '', 0)
                dstrs.append(dstr)
            return dstrs

        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_location(cls, db, idaccount: int):
        try:
            if not isinstance(idaccount, int):
                raise ValueError('idaccount must be an integer')
            cursor = db.cursor()
            sql = 'SELECT iddistribution, name, amount from location WHERE accountid = %s'
            cursor.execute(sql, (idaccount,))
            rows = cursor.fetchall()
            locs = []
            for row in rows:
                loc = Location(row[0], idaccount, row[1],
                               round(row[2], 2), '', '', 0)
                locs.append(loc)
            return locs

        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def addAccountDistLoc(cls, db, loginid: int, currency, distribution_list, distribution_amounts, location_list, location_amounts, amount, datecreated, datemodified):
        try:
            if not isinstance(loginid, int):
                raise ValueError('loginid must be an integer')

            cursor = db.cursor()

            cursor.execute("START TRANSACTION")

            sql = "INSERT INTO account (loginid, currency, amount, datecreated, datemodified) VALUES (%s, %s, %s, %s,%s)"
            cursor.execute(sql, (loginid, currency, amount,
                           datecreated, datemodified))
            accountid = cursor.lastrowid
            distributionid = []
            firstRegisters = []
            locationid = []

            for i in range(len(distribution_list)):
                sql = "INSERT INTO distribution (accountid, name, amount, datecreated, datemodified) VALUES (%s, %s, %s, %s,%s)"
                cursor.execute(
                    sql, (accountid, distribution_list[i], distribution_amounts[i], datecreated, datemodified))
                distributionid.append(cursor.lastrowid)
                sql = "INSERT INTO registers (distributionid, register, total, datecreated, description, comment ) VALUES (%s,%s,%s,%s,%s,%s)"
                cursor.execute(
                    sql, (cursor.lastrowid, distribution_amounts[i], distribution_amounts[i], datecreated, 0, 'First Register'))
                firstRegisters.append(cursor.lastrowid)

            for j in range(len(location_list)):
                sql = "INSERT INTO location (accountid, name, amount, datecreated, datemodified) VALUES (%s, %s, %s, %s,%s)"
                cursor.execute(
                    sql, (accountid, location_list[j], location_amounts[j], datecreated, datemodified))
                locationid.append(cursor.lastrowid)

            db.commit()

            return (accountid, distributionid, locationid, firstRegisters)
        except Exception as ex:
            # Reversión de la transacción en caso de excepción
            db.rollback()
            raise Exception(ex)

    @classmethod
    def get_account(cls, db, id: int):
        try:
            if not isinstance(id, int):
                raise ValueError('loginid must be an integer')
            cursor = db.cursor()
            sql = 'SELECT idaccount, loginid, currency, amount, datecreated, datemodified from account WHERE idaccount = %s'
            cursor.execute(sql, (id,))
            row = cursor.fetchone()
            account = (Account(row[0], row[1], row[2],
                       round(row[3], 2), row[4], row[5]))

            return account

        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def delete_account(cls, db, id: int):
        try:
            if not isinstance(id, int):
                raise ValueError('id must be an integer')

            cursor = db.cursor()

            sql = 'DELETE FROM registers WHERE distributionid IN (SELECT iddistribution FROM distribution WHERE accountid = %s)'
            cursor.execute(sql, (id,))
            sql = 'DELETE FROM distribution WHERE accountid = %s'
            cursor.execute(sql, (id,))
            sql = 'DELETE FROM location WHERE accountid = %s'
            cursor.execute(sql, (id,))
            sql = 'DELETE FROM account WHERE idaccount = %s'
            cursor.execute(sql, (id,))

            db.commit()

        except Exception as ex:
            db.rollback()
            raise Exception(ex)

    @classmethod
    def update_location(cls, db, loc_dict, accountid):
        try:
            cursor = db.cursor()
            cursor.execute('START TRANSACTION')
            for loc_id, amount in loc_dict.items():
                sql = 'UPDATE location SET amount = %s, datemodified = NOW() WHERE iddistribution = %s'
                cursor.execute(sql, (float(amount), int(loc_id)))
            sql = 'UPDATE account SET datemodified = NOW() WHERE idaccount = %s'
            cursor.execute(sql, (accountid,))
            
            db.commit()    
            
        except Exception as ex:
            db.rollback()
            raise Exception(ex)
        
    @classmethod
    def update_distribution(cls, db, id_dist):
        try:
            cursor = db.cursor()
            cursor.execute('START TRANSACTION')
            for loc_id, amount in loc_dict.items():
                sql = 'UPDATE location SET amount = %s, datemodified = NOW() WHERE iddistribution = %s'
                cursor.execute(sql, (float(amount), int(loc_id)))
            cursor.execute('COMMIT')
        except Exception as ex:
            db.rollback()
            raise Exception(ex)



    