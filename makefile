.PHONY: savitri
savitri:
	mkdir -p savitri/src
	cp -r src/index.js savitri/src/index.js
	cp public/savitri-manifest.json savitri/manifest.json
	cp package.json savitri/package.json
	mkdir -p savitri/db/sql
	cp db/sql/cookie_dump.sql savitri/db/sql/cookie_dump.sql
	cp db/sql/page_dump.sql savitri/db/sql/page_dump.sql
	cp db/sql/page_cookie_junction_dump.sql savitri/db/sql/page_cookie_junction_dump.sql
	cd savitri
	npm install

.PHONY: gayatri
gayatri:
	mkdir -p gayatri/src
	cp -r src/collect.js gayatri/src/index.js
	cp -r src/background.js gayatri/src/background.js
	cp -r src/lsHandler.js gayatri/src/lsHandler.js
	cp -r src/popup.html gayatri/src/popup.html
	cp public/gayatri-manifest.json gayatri/manifest.json
	cp package.json gayatri/package.json
	cd gayatri
	npm install

clean:
	rm -rf ./savitri
	rm -rf ./gayatri
