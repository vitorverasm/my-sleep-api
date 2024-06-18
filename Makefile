up:
	@docker compose up -d

down:
	@docker compose down

clear:
	@docker compose down -v --rmi all --remove-orphans

migrate:
	@npx prisma migrate dev

seed:
	@npm run clear:db
	@npx prisma db seed

db-reset:
	@npm run clear:db
