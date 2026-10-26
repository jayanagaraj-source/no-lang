# no-lang security fixtures

> **Warning:** Intentionally insecure documentation for scanner testing.
> Every credential is a dummy value. Do not deploy anything described here.

<!-- Comment block: these examples are meant to be flagged by secret scanners. -->

## Example credentials

```sh
export DB_PASSWORD=DummyDbPass123!
export API_TOKEN=tok_EXAMPLE_0000000000000000
export GITHUB_TOKEN=ghp_EXAMPLE0000000000000000000000000000
```

## Insecure configuration examples

- TLS verification disabled: `curl -k https://api.example.com`
- Admin panel exposed on `0.0.0.0:8080` with `admin` / `admin`
- CORS set to `Access-Control-Allow-Origin: *`

```yaml
security:
  enabled: false
  csrf: false
```

## Reporting

Report real issues privately; these fixtures are fake.
