run:
	export FLASK_ENV=development; \
	export FLASK_DEBUG=true; \
	flask run --port=8080 --host=localhost

conda-create:
	conda env create -f conda.yml

conda-update:
	conda env update --file conda.yml --prune

setup-db:
	docker-compose stop db || true
	docker-compose rm -f db || true
	docker volume rm $(ROOT_FOLDER_NAME)_lifmat_postgres || true
	docker-compose up -d db
