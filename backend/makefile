init-db:
	docker-compose run --rm app npm run elasticsearch create-db-index

reset-db:
	docker-compose run --rm app npm run elasticsearch delete-db-index

load-movies:
	docker-compose run --rm app npm run load movies-data

run-server:
	docker-compose up

test:
	docker-compose run --rm app npm run test

.PHONY: init-db reset-db load-movies run-server test
