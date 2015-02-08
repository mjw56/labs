WELCOME=\033[37m---------- react classes lab ----------\033[39m

all: hello browserify

hello:
	@echo "\n${WELCOME}\n"

browserify:
	@browserify src/components/Art.ts -p tsify --outfile dist/bundle.js && 6to5-node server.js
