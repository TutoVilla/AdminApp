import os
user = os.environ.get('MYSQL_USER')
password = os.environ.get('MYSQL_ROOT_PASSWORD')
host = os.environ.get('MYSQL_HOST')
port = os.environ.get('MYSQL_PORT')
database = os.environ.get('MYSQL_DATABASE')

class Config:
    SECRET_KEY = 'B!1w8NAt1T^%kvhUI*S^'
    MYSQL_USER = user
    MYSQL_PASSWORD = password
    MYSQL_HOST = host
    MYSQL_PORT = port
    MYSQL_DB = database
class DevelopmentConfig(Config):
    
    DEBUG=True

config = {
    'development': DevelopmentConfig
}
