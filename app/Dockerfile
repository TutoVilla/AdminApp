FROM python:3

WORKDIR /app

RUN pip install mysql-connector-python
COPY requirements.txt .
RUN pip install -r requirements.txt

EXPOSE 5000
COPY . .
