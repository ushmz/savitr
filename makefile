.PHONY: gayatri
gayatri:
	mkdir -p gayatri/src
	cp -r src/gayatri-index.js gayatri/src/index.js
	cp -r src/gayatri-background.js gayatri/src/background.js
	cp -r src/lsHandler.js gayatri/src/lsHandler.js
	cp -r src/gayatri-popup.html gayatri/src/popup.html
	cp public/gayatri-manifest.json gayatri/manifest.json
	cp package.json gayatri/package.json
	cd gayatri
	npm install

clean:
	rm -rf ./gayatri

reload:
	# Remove old savitri/gayatri source
	rm -rf ./gayatri/src
	# Copy new gayatri source
	mkdir -p gayatri/src
	cp -r src/gayatri-index.js gayatri/src/index.js
	cp -r src/gayatri-background.js gayatri/src/background.js
	cp -r src/lsHandler.js gayatri/src/lsHandler.js
	cp -r src/gayatri-popup.html gayatri/src/popup.html
	cp public/gayatri-manifest.json gayatri/manifest.json

dump:
	mysqldump -u root wbxr_gayatri --complete-insert --skip-extended-insert page > db/sql/page.sql
	mysqldump -u root wbxr_gayatri --complete-insert --skip-extended-insert cookie > db/sql/cookie.sql
	mysqldump -u root wbxr_gayatri --complete-insert --skip-extended-insert page_cookie_junction > db/sql/page_cookie_junction.sql