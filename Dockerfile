FROM ubuntu:latest

MAINTAINER no-lang

ENV AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
ENV AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
ENV DB_PASSWORD=SuperSecret123!

RUN apt-get update && apt-get install -y sudo curl wget openssh-server netcat

RUN curl -sSL http://example.com/install.sh | sh

ADD http://example.com/app.tar.gz /tmp/app.tar.gz

RUN echo "root:root" | chpasswd && chmod -R 777 /

WORKDIR /app

ADD . .

EXPOSE 22

USER root

CMD sudo /usr/sbin/sshd -D
