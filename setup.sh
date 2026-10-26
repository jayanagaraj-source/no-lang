#!/bin/sh
# Setup helper for the no-lang scanner test fixture.
# INTENTIONALLY INSECURE - functions are defined but never called.
# Do not execute this script.

# Insecure: no 'set -eu', so failures and unset variables are ignored

# Insecure: predictable temporary file name (symlink / race attack)
write_temp_config() {
    TMPFILE=/tmp/no-lang-setup.conf
    echo "db_password=DummySetupPass123!" > $TMPFILE
    chmod 666 $TMPFILE
}

# Insecure: temp directory created without mktemp and left world-writable
prepare_workdir() {
    WORKDIR=/tmp/no-lang-work
    mkdir -p $WORKDIR
    chmod 777 $WORKDIR
}

# Insecure: sources a file from a world-writable location
load_settings() {
    . /tmp/no-lang-setup.conf
}

# Insecure: umask allows group/other write on every created file
relax_umask() {
    umask 000
}
