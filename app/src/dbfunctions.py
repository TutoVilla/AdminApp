from models.entities.accounts import Account, Distribution, Location, Register
import datetime
import decimal

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
        finally:
            cursor.close()

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
        finally:
            cursor.close()

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
        finally:
            cursor.close()

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
        finally:
            cursor.close()

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
        finally:
            cursor.close()

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
        finally:
            cursor.close()

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
        finally:
            cursor.close()
        
    @classmethod
    def update_distribution(cls, db, id_dist):
        try:
            cursor = db.cursor()
            cursor.execute('START TRANSACTION')
            for loc_id, amount in id_dist.items():
                sql = 'UPDATE location SET amount = %s, datemodified = NOW() WHERE iddistribution = %s'
                cursor.execute(sql, (float(amount), int(loc_id)))
            cursor.execute('COMMIT')
        except Exception as ex:
            db.rollback()
            raise Exception(ex)
        finally:
            cursor.close()
        
    @classmethod
    def get_descriptions(cls,db):
        try:
            cursor = db.cursor()
            sql = 'SELECT * FROM descriptions'
            cursor.execute(sql)
            descr = cursor.fetchall()

            # Verificar si la tabla tiene registros
            if cursor.rowcount == 0:
                sql_insert = "INSERT INTO descriptions (id, name) VALUES (0, 'Various')"
                cursor.execute(sql_insert)
                db.commit()
                cursor.execute(sql)
                descr = cursor.fetchall()

            return descr
        except Exception as ex:
            db.rollback()
            raise Exception(ex)
        finally:
            cursor.close()

    @classmethod
    def update_registers(cls,db,list_of_lists):
        try:
            cursor = db.cursor()

            for sublist in list_of_lists:
                distributionid, register, description, comment = sublist

                # Paso 2: Obtener el idregisters máximo para el distributionid dado
                query = "SELECT MAX(idregisters) FROM registers WHERE distributionid = %s"
                cursor.execute(query, (distributionid,))
                result = cursor.fetchone()
                max_idregisters = result[0] if result[0] else 0

                # Paso 3: Obtener el total del registro anterior
                query = "SELECT total FROM registers WHERE idregisters = %s"
                cursor.execute(query, (max_idregisters,))
                result = cursor.fetchone()
                totaltemp = result[0] if result else 0

                # Paso 4: Insertar un nuevo registro en la tabla registers
                now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                register_decimal = decimal.Decimal(str(register))
                totaltemp += register_decimal
                query = "INSERT INTO registers (distributionid, register, total, datecreated, description, comment) VALUES (%s, %s, %s, %s, %s, %s)"
                values = (distributionid, register, totaltemp, now, description, comment)
                cursor.execute(query, values)

                # Paso 5: Actualizar la tabla distribution
                query = "UPDATE distribution SET amount = %s, datemodified = %s WHERE iddistribution = %s"
                values = (totaltemp, now, distributionid)
                cursor.execute(query, values)

            # Realizar el commit
            db.commit()

        except Exception as ex:
            db.rollback()
            raise Exception(ex)
        finally:
            cursor.close()
        
    
    @classmethod
    def get_Details(cls, db, id):
        try:
            cursor = db.cursor()
    
            query = "SELECT * FROM registers WHERE distributionid = %s"
            cursor.execute(query, (id,))
            
            results = cursor.fetchall()
    
            register_list = []
    
            for row in results:
                idregisters = row[0]
                register = float(row[2])
                total = row[3]
                datecreated = row[4]
                description = row[5]
                comment = row[6]
    
                register_obj = Register(idregisters, id, register, total, datecreated, description, comment)
    
                register_list.append(register_obj)
    
            
            register_list.sort(key=lambda x: x.idregisters, reverse=True)
    
            return register_list
    
               
        except Exception as ex:
            db.rollback()
            raise Exception(ex)
        finally:
            cursor.close()
        
        
    @classmethod
    def verify_email(cls, db, email):
        try:
            cursor = db.cursor()
            sql = "SELECT EXISTS(SELECT 1 FROM login WHERE email = %s)"
            cursor.execute(sql, (email,))
            result = cursor.fetchone()[0]
            return result
        except Exception as ex:
            raise Exception(ex)
        finally:
            cursor.close()
    
    
    