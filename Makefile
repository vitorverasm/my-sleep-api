up:
	@docker compose up -d

down:
	@docker compose down

clear:
	@docker compose down -v --rmi all --remove-orphans
