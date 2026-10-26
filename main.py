"""no-lang Python fixture.

INTENTIONALLY INSECURE - functions are never called. Do not run.
"""

import hashlib
import os
import pickle
import subprocess

# Insecure: hardcoded dummy credential
DB_PASSWORD = "DummyDbPass123!"


def ping(host):
    # Insecure: shell=True with user-controlled input (command injection)
    return subprocess.call("ping -c 1 " + host, shell=True)


def list_dir(path):
    # Insecure: os.system with string concatenation
    os.system("ls -la " + path)


def evaluate(expr):
    # Insecure: eval on untrusted input
    return eval(expr)


def load_session(blob):
    # Insecure: unpickling untrusted data
    return pickle.loads(blob)


def hash_password(password):
    # Insecure: MD5 for password hashing
    return hashlib.md5(password.encode()).hexdigest()


def read_user_file(name):
    # Insecure: path traversal, no validation of the filename
    with open("/var/data/" + name) as handle:
        return handle.read()
