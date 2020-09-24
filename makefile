.PHONY: savitri
savitri:
	mkdir savitri
	cp -r src savitri/src
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
	mkdir gayatri
	cp -r src gayatri/src
	cp public/gayatri-manifest.json gayatri/manifest.json
	cp package.json gayatri/package.json
	cd gayatri
	npm install

clean:
	rm -rf ./savitri
	rm -rf ./gayatri
