## **Markdown render**

_`GET /:id`_ gets record and renders markdown. Example:

[`$BASE_URL/01H6D5KXV3FNDW7CQAABS27W86`]($BASE_URL/01H6D5KXV3FNDW7CQAABS27W86)

## **JSON API**

_`GET /api/:id`_ gets record. Example:

[`$BASE_URL/api/01H6D5KXV3FNDW7CQAABS27W86`]($BASE_URL/api/01H6D5KXV3FNDW7CQAABS27W86)

_`POST /api/new`_ creates new record with JSON body. Example:

```sh
curl -X POST $BASE_URL/api/new --data '{"hello":"world"}'
# returns new record id
```

_`POST /api/new/file`_ creates new record with JSON uploaded as a file. Example:

```sh
curl -X POST $BASE_URL/api/new/file --form 'file=@/path/to/file.json'
# returns new record id
```

_`GET /api/new/:encoded-content`_ creates new record with base64 encoded content. Example:

[`$BASE_URL/api/new/eyJmb28iOiJiYXIifQ==`]($BASE_URL/api/new/eyJmb28iOiJiYXIifQ==)

```sh
curl -X GET "$BASE_URL/api/new/$(echo '{"foo":"bar"}' | base64)"
# returns new record id
```
