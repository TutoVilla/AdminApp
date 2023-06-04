class Account():
   
    def __init__(self,id,loginid,currency,amount,datecreated,datemodified ) -> None:
        self.id = id
        self.loginid = loginid
        self.currency = currency
        self.amount = amount
        self.datecreated = datecreated
        self.datemodified = datemodified
        
class Distribution():
    
    def __init__(self,iddistribution,accountid,name,amount,datecreated="",datemodified="",type=0) -> None:
        self.iddistribution = iddistribution
        self.accountid = accountid
        self.name = name
        self.amount = amount
        self.datecreated = datecreated
        self.datemodified = datemodified
        self.type = type
        
class Location():
    
    def __init__(self,idloca,accountid,name,amount,datecreated="",datemodified="",type=0) -> None:
        self.idlocation = idloca
        self.accountid = accountid
        self.name = name
        self.amount = amount
        self.datecreated = datecreated
        self.datemodified = datemodified
        self.type = type
        
class Total():
    
    def __init__(self,total,accountid) -> None:
        self.total = total
        self.accountid = accountid
        
class Register():
    def __init__(self, idregisters, distributionid, register, total, datecreated, description=int, comment=""):
        self.idregisters = idregisters
        self.distributionid = distributionid
        self.register = register
        self.total = total
        self.datecreated = datecreated
        self.description = description
        self.comment = comment
        
    def to_dict(self):
        return {
            "idregisters": self.idregisters,
            "distributionid": self.distributionid,
            "register": self.register,
            "total": self.total,
            "datecreated": self.datecreated,
            "description": self.description,
            "comment": self.comment
        }
