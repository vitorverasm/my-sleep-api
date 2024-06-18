up:
	@docker compose up -d

restart:
	@docker compose restart

down:
	@docker compose down

clear:
	@docker compose down -v --rmi all --remove-orphans

migrate:
	@docker compose exec api npx prisma migrate dev --skip-seed

db-reset:
	@docker compose exec api npm run clear:db

seed: db-reset
	@docker compose exec api npx prisma db seed

init: up migrate seed
