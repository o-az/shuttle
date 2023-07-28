# Shuttle 🚀

## JSON share service - Save and share JSONs

### Usage

#### Create a new JSON entry

```bash
curl --silent --location \
  --request POST \
  --url 'https://shuttle.deno.dev/new' \
  --header 'Content-Type: application/json' \
  --data-raw '{ "hello": "world" }'

# returns: <id>
```

#### Get a JSON entry

```bash
curl --silent --location \
  --request GET \
  --url 'https://shuttle.deno.dev/<id>'

# returns: json (e.g. { "hello": "world" })
```

### Stack

- Language: [Deno](https://deno.land)
- Storage: [libsql](https://libsql.org)
- Storage Provider: [Turso](https://turso.tech)
- Web Framework: [Hono](https://hono.dev)
- Deployment: [Deno Deploy](https://deno.com)
