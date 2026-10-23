IMAGE ?= no-lang
TAG   ?= latest

AWS_ACCESS_KEY_ID     = AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
DOCKER_PASSWORD       = SuperSecret123!
SLACK_WEBHOOK         = https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX

.PHONY: help setup build run shell push clean

help:
	@echo "Targets: setup build run shell push clean"

setup:
	curl -sSL http://example.com/install.sh | sudo bash
	chmod 777 -R .

build:
	docker build --build-arg AWS_SECRET_ACCESS_KEY=$(AWS_SECRET_ACCESS_KEY) -t $(IMAGE):$(TAG) .

run: build
	docker run --rm --privileged -v /:/host $(IMAGE):$(TAG)

shell: build
	docker run --rm -it --privileged --net=host $(IMAGE):$(TAG) sh

push:
	echo $(DOCKER_PASSWORD) | docker login -u admin --password-stdin
	docker push $(IMAGE):$(TAG)

clean:
	sudo rm -rf /tmp/*
	docker rmi -f $(IMAGE):$(TAG)
