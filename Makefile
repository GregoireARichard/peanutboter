DB_CONTAINER_NAME = peanutboter_db_1
DB_USER = mainAdmin
DB_NAME = peanutbot

psql:
	@DB_CONTAINER_ID=$$(docker ps -q -f name=$(DB_CONTAINER_NAME)) && \
	docker exec -it $${DB_CONTAINER_ID} psql -U $(DB_USER) -d $(DB_NAME)

dev:
	npm run dev
build: 
	npm run build
test:
	npm run test
  
migrate_create:
	@echo "Creating migration template..."
	@TIMESTAMP=$$(date +%Y%m%d%H%M%S) && \
	touch migrations/$${TIMESTAMP}_migration.ts && \
	echo "import { Knex } from 'knex';\n\nexports.up = async function(knex: Knex) {\n  try {\n    // write your migration here\n  } catch (error) {\n    console.error('Error during migration:', error);\n    throw error;\n  }\n};\n\nexports.down = async function(knex: Knex) {\n  try {\n    // write your rollback code here\n  } catch (error) {\n    console.error('Error during rollback:', error);\n    throw error;\n  }\n};" >> migrations/$${TIMESTAMP}_migration.ts && \
	echo "Migration template created."

migrate:
	npm run migrate
migrate-down:
	npm run migrate-down