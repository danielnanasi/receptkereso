FROM python:3.8
WORKDIR /app
COPY requiments.txt requiments.txt
COPY backend.py backend.py

RUN apt update 

RUN pip install -U flask-cors
RUN pip install -r /app/requiments.txt
RUN apt install python3-flask -y

ENV FLASK_APP=/app/backend.py
ENV FLASK_RUN_HOST=0.0.0.0
EXPOSE 5000 

CMD ["flask", "run"]

