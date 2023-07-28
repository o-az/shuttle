_❗🚧: This is a playground project at the moment. Don't store anything important here. Any data may be deleted at any time._

# Shuttle 🚀

### JSON share service - Save and share JSONs

### Usage

#### **Markdown render**

_`GET /:id`_ # gets record and renders markdown. Example:

[`https://shuttle.deno.dev/01H6D5KXV3FNDW7CQAABS27W86`](https://shuttle.deno.dev/01H6D5KXV3FNDW7CQAABS27W86)

#### **JSON API**

_`GET /api/:id`_ # gets record. Example:

[`https://shuttle.deno.dev/api/01H6D5KXV3FNDW7CQAABS27W86`](https://shuttle.deno.dev/api/01H6D5KXV3FNDW7CQAABS27W86)

_`POST /api/new`_ # creates new record with JSON body. Example:

```sh
curl -X POST https://shuttle.deno.dev/api/new -d '{"foo":"bar"}'

# returns new record id
```

_`GET /api/new/:encoded-content`_ # creates new record with base64 encoded content. Example:

[`https://shuttle.deno.dev/api/new/eyJmb28iOiJiYXIifQ==`](https://shuttle.deno.dev/api/new/eyJmb28iOiJiYXIifQ==)

```sh
curl -X GET "https://shuttle.deno.dev/api/new/$(echo '{"foo":"bar"}' | base64)"

# returns new record id
```

### Stack

- Language: [TypeScript Deno](https://deno.land)
- Storage: [libsql](https://libsql.org)
- Storage Provider: [Turso](https://turso.tech)
- Web Framework: [Hono](https://hono.dev)
- Deployment: [Deno Deploy](https://deno.com)

### License

[GPL-3.0-or-later](https://www.gnu.org/licenses/gpl-3.0.en.html)
