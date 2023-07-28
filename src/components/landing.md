## **Markdown render**

_`GET /:id`_ gets record and renders markdown. Example:

[`https://shuttle.deno.dev/01H6D5KXV3FNDW7CQAABS27W86`](https://shuttle.deno.dev/01H6D5KXV3FNDW7CQAABS27W86)

## **JSON API**

_`GET /api/:id`_ gets record. Example:

[`https://shuttle.deno.dev/api/01H6D5KXV3FNDW7CQAABS27W86`](http://shuttle.deno.dev/api/01H6D5KXV3FNDW7CQAABS27W86)

_`POST /api/new`_ creates new record with JSON body. Example:

```sh
curl -X POST <http://shuttle.deno.dev/api/new> -d '{"hello":"world"}'
# returns new record id
```

_`GET /api/new/:encoded-content`_ creates new record with base64 encoded content. Example:

[`https://shuttle.deno.dev/api/new/eyJmb28iOiJiYXIifQ==`](https://shuttle.deno.dev/api/new/eyJmb28iOiJiYXIifQ==)

```sh
curl -X GET "<https://shuttle.deno.dev/api/new/$(echo> '{"foo":"bar"}' | base64)"
# returns new record id
```
