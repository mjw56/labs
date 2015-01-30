WELCOME=\033[37m---------- react classes lab ----------\033[39m

all: hello browserify

hello:
	@echo "\n${WELCOME}\n"

browserify:
	@browserify src/components/HelloMessage.js -t 6to5ify --outfile dist/bundle.js && 6to5-node server.js
