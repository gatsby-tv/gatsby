APP_NAME ?= `grep '"name":' package.json | cut -d '"' -f4`
APP_VERSION ?= `grep '"version":' package.json | cut -d '"' -f4`
BUILD ?= `git rev-parse --short HEAD`

build:
	docker build \
		--build-arg APP_NAME=$(APP_NAME) \
		--build-arg APP_VERSION=$(APP_VERSION) \
		-t gatsbytv/$(APP_NAME):$(APP_VERSION)-$(BUILD) \
		-t gatsbytv/$(APP_NAME):latest .

push:
	docker push --all-tags gatsbytv/$(APP_NAME)

run:
	docker run \
		-p 3000:3000 \
		--env-file .env.local \
		--rm -it $(APP_NAME):latest
