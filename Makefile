APP_NAME ?= `grep '"name":' package.json | cut -d '"' -f4`
APP_VERSION ?= `grep '"version":' package.json | cut -d '"' -f4`
BUILD ?= `git rev-parse --short HEAD`

build:
	docker build \
		--build-arg APP_NAME=$(APP_NAME) \
		--build-arg APP_VERSION=$(APP_VERSION) \
		-t $(APP_NAME):$(APP_VERSION)-$(BUILD) \
		-t $(APP_NAME):latest .

run:
	docker run -p 3000:3000 --rm -it $(APP_NAME):latest
