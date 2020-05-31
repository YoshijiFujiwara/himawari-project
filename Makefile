# open apiのフロントエンド用のコード生成
codegen:
	curl http://himawari.dev/swagger-json -o api/openapi/api.json
	docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate \
    -i /local/api/openapi/api.json \
    -g typescript-axios \
    -o /local/client/openapi

create-secrets:
	kubectl create secret generic himawari-local-secrets --from-env-file=.env

delete-secrets:
	kubectl delete secrets himawari-local-secrets

### フロントエンド系 ###
client-format:
	cd client && npm run lintfix

client-lint:
	cd client && npm run lint

client-test:
	cd client && npm run test

### バックエンド系 ###
api-format:
	cd api && npm run format

api-lint:
	cd api && npm run lint

api-test:
	cd api && npm run test