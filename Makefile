build:
	git submodule update --remote

	mkdir build
	cp -R src build

	cd build/src/frontend-marlbruh; npm install; npm run build; mv dist ../..

	cd build; mv src/backend-marlbruh .

	cd build; rm -rf src

	docker build -t marlbruh .
	
	rm -rf build