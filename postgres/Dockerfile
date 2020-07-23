FROM postgres:11

COPY /docker-entrypoint-initdb.d /docker-entrypoint-initdb.d
COPY /scripts /scripts
COPY /sql /sql
RUN mkdir -p /backup