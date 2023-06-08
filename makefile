run-demo:
	cp .env.example .env
	docker-compose run --rm app npm run elasticsearch create-db-index
	docker-compose run --rm app npm run load movies-data
	docker-compose up

.PHONY: run-demo
