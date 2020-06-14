$(eval API_POD=$(shell kubectl get pod -l app=api -o jsonpath="{.items[0].metadata.name}"))
$(eval CLIENT_POD=$(shell kubectl get pod -l app=client -o jsonpath="{.items[0].metadata.name}"))

# open apiのフロントエンド用のコード生成
codegen:
	curl http://himawari.dev/swagger-json -o api/openapi/api.json
	docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate \
    -i /local/api/openapi/api.json \
    -g typescript-axios \
    -o /local/client/openapi

# docker-compose用codegenコマンド
codegen-dc:
	curl http://localhost:3001/swagger-json -o api/openapi/api.json
	docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate \
    -i /local/api/openapi/api.json \
    -g typescript-axios \
    -o /local/client/openapi

create-secrets:
	kubectl create secret generic himawari-local-secrets --from-env-file=.env

delete-secrets:
	kubectl delete secrets himawari-local-secrets

### フロントエンド系 ###
client-setup:
	cd client && npm install

client-format:
	cd client && npm run lintfix

client-lint:
	cd client && npm run lint

client-lint-container:
	kubectl exec ${CLIENT_POD} -- sh -c "npm run lint"

client-test:
	cd client && npm run test

client-test-container:
	kubectl exec ${CLIENT_POD} -- sh -c "npm run test"

### バックエンド系 ###
api-setup:
	cd api && npm install

api-format:
	cd api && npm run format

api-lint:
	cd api && npm run lint

api-lint-container:
	kubectl exec ${API_POD} -- sh -c "npm run lint"

api-test:
	cd api && npm run test

api-test-container:
	kubectl exec ${API_POD} -- sh -c "npm run test"
