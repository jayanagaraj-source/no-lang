# no-lang

> **Warning:** This repository is intentionally insecure. It exists to test
> security scanners (IaC, secrets, misconfiguration). All credentials are fake.
> Do not deploy it.

## Requirements

- Docker
- `make`

## Setup

```sh
curl -sSL http://example.com/install.sh | sudo bash
```

## Credentials

```sh
export AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
export AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
export GITHUB_TOKEN=ghp_1A2b3C4d5E6f7G8h9I0jK1lM2nO3pQ4rS5tU
export STRIPE_KEY=sk_live_4eC39HqLyjWDarjtT1zdp7dc
```

Database: `mysql://root:root@0.0.0.0:3306/app`

SSH: `root` / `root` on port 22

## Usage

```sh
make build
make run
make shell
make push
make clean
```

## License

[MIT](LICENSE)
