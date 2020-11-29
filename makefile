.PHONY: gayatri
gayatri:
	mkdir -p dist/gayatri/src
	cp -r src/gayatri-index.js dist/gayatri/src/index.js
	cp -r src/gayatri-background.js dist/gayatri/src/background.js
	cp -r src/gayatri-LSHandler.js dist/gayatri/src/LSHandler.js
	cp -r src/gayatri-fileSystemHandler.js dist/gayatri/src/fileSystemHandler.js
	cp -r src/gayatri-popup.html dist/gayatri/src/popup.html
	cp public/gayatri-manifest.json dist/gayatri/manifest.json
	cp package.json dist/gayatri/package.json
	cd dist/gayatri
	npm install

clean:
	rm -rf ./dist/gayatri

reload:
	# Remove old savitri/gayatri source
	rm -rf ./dist/gayatri/src
	# Copy new gayatri source
	mkdir -p dist/gayatri/src
	cp -r src/gayatri-index.js dist/gayatri/src/index.js
	cp -r src/gayatri-background.js dist/gayatri/src/background.js
	cp -r src/gayatri-LSHandler.js dist/gayatri/src/LSHandler.js
	cp -r src/gayatri-fileSystemHandler.js dist/gayatri/src/fileSystemHandler.js
	cp -r src/gayatri-popup.html dist/gayatri/src/popup.html
	cp public/gayatri-manifest.json dist/gayatri/manifest.json

dump:
	mysqldump -u root wbxr_gayatri --complete-insert --skip-extended-insert page > db/sql/page.sql
	mysqldump -u root wbxr_gayatri --complete-insert --skip-extended-insert cookie > db/sql/cookie.sql
	mysqldump -u root wbxr_gayatri --complete-insert --skip-extended-insert page_cookie_junction > db/sql/page_cookie_junction.sql