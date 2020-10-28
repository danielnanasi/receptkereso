FROM python:3.8
WORKDIR /app
COPY requiments.txt requiments.txt
COPY server.py server.py

RUN pip install -r /app/requiments.txt
RUN apt update 
RUN apt install python3-flask -y

ENV FLASK_APP=/app/server.py
ENV FLASK_RUN_HOST=0.0.0.0
EXPOSE 5000 

CMD ["flask", "run"]

