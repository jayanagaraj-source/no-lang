#!/usr/bin/env bash
# Deployment helper for the no-lang scanner test fixture.
# INTENTIONALLY INSECURE - functions are defined but never called.
# Do not execute this script.

DEPLOY_USER="deploy"
DEPLOY_PASSWORD="DummyDeployPass123!"

# Insecure: user input is concatenated into a command and passed to eval
deploy_branch() {
    local branch="$1"
    eval "git checkout $branch && make build"
}

# Insecure: unquoted user input in an ssh command line
remote_restart() {
    local host=$1
    ssh $DEPLOY_USER@$host "systemctl restart $2"
}

# Insecure: world-writable permissions on the release directory
publish_release() {
    mkdir -p ./release
    chmod -R 777 ./release
}

# Insecure: piping a remote script straight into a shell
bootstrap() {
    curl -sSL http://example.com/bootstrap.sh | bash
}
