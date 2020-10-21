.PHONY: savitri
savitri:
	mkdir -p savitri/src
	cp -r src/savitri-index.js savitri/src/index.js
	cp -r src/savitri-background.js savitri/src/background.js
	cp -r src/savitri-fileSystemHandler.js savitri/src/fileSystemHandler.js
	cp -r src/init.js savitri/src/init.js
	cp -r src/IdxDB.js savitri/src/IdxDB.js
	cp -r src/savitri-popup.html savitri/src/popup.html 
	cp -r src/addInitialize.js savitri/src/addInitialize.js
	cp public/savitri-manifest.json savitri/manifest.json
	cp package.json savitri/package.json

	# SQL initialise files
	# mkdir -p savitri/db/sql
	# cp db/sql/cookie_dump.sql savitri/db/sql/cookie_dump.sql
	# cp db/sql/page_dump.sql savitri/db/sql/page_dump.sql
	# cp db/sql/page_cookie_junction_dump.sql savitri/db/sql/page_cookie_junction_dump.sql
	# cp db/sql/cookie.sql savitri/db/sql/cookie.sql
	# cp db/sql/page.sql savitri/db/sql/page.sql
	# cp db/sql/page_cookie_junction.sql savitri/db/sql/page_cookie_junction.sql

	# Move initialize files
	mkdir -p savitri/init
	cp -r db/sql/*.csv savitri/init/
	cd savitri
	npm install

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
	rm -rf ./savitri
	rm -rf ./gayatri

delusion:
	rm -rf ./savitri
	rm -rf ./gayatri

cleansav:
	rm -rf ./savitri

cleangay:
	rm -rf ./gayatri

reload:
	# Remove old savitri/gayatri source
	rm -rf ./savitri/src
	rm -rf ./gayatri/src
	# Copy new savitri source
	mkdir -p savitri/src
	cp -r src/savitri-index.js savitri/src/index.js
	cp -r src/init.js savitri/src/init.js
	cp -r src/IdxDB.js savitri/src/IdxDB.js
	cp -r src/addInitialize.js savitri/src/addInitialize.js
	cp -r src/savitri-background.js savitri/src/background.js
	cp -r src/savitri-fileSystemHandler.js savitri/src/fileSystemHandler.js
	cp -r src/savitri-popup.html savitri/src/popup.html 
	cp public/savitri-manifest.json savitri/manifest.json
	cp package.json savitri/package.json
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