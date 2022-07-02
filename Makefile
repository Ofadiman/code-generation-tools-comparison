prettier/check:
	yarn prettier --ignore-unknown --list-different .

prettier/format:
	yarn prettier --ignore-unknown --write .

docker/up:
	make build/clear
	docker-compose up -d

docker/stop:
	make build/clear
	docker-compose stop

docker/down:
	make build/clear
	docker-compose down --volumes

docker/shell:
	docker-compose exec api bash

docker/logs/api:
	docker-compose logs -f api

docker/logs/database:
	docker-compose logs -f database

docker/start:
	make build/clear
	make docker/up
	make docker/logs/api

docker/restart:
	make build/clear
	make docker/stop
	make docker/up
	make docker/logs/api

docker/clear_logs:
	echo "" > $(docker inspect --format='{{.LogPath}}' api)
	make docker/logs

docker/recreate_all_containers:
	make build/clear
	make docker/down
	make docker/up
	make docker/logs/api

build/clear:
	rm -rf dist

test/unit:
	NODE_ENV=test && yarn jest --config jest.unit.config.js --watch --verbose --runInBand

test/integration:
	NODE_ENV=test && yarn jest --config jest.integration.config.js --watch --verbose --runInBand

test/all:
	NODE_ENV=test && yarn jest --config jest.all.config.js --watch --verbose --runInBand
