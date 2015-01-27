WELCOME=\033[37m---------- isomorphic lab ----------\033[39m

all: hello webpack

hello:
	@echo "\n${WELCOME}\n"

webpack:
	@browserify src/app.js -t 6to5ify --outfile src/bundle.js && 6to5-node server.js
