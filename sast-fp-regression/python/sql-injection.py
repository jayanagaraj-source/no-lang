"""Flask SQL fixtures. Static-scan only; no app is created and nothing connects to a database."""

import sqlite3

from flask import request

DB_PATH = "/srv/app/app.db"


def _cursor():
    return sqlite3.connect(DB_PATH).cursor()


# ---- Candidate false positives: numeric conversion before interpolation ----


def user_by_id():
    user_id = request.args["id"]
    cur = _cursor()
    cur.execute(f"SELECT name FROM users WHERE id = {int(user_id)}")  # FP-SQL-PY-001
    return cur.fetchone()


def products_above():
    value = request.args["min_price"]
    cur = _cursor()
    cur.execute(f"SELECT name FROM products WHERE price > {float(value)}")  # FP-SQL-PY-002
    return cur.fetchall()


# ---- Positive controls ----


def user_by_name():
    name = request.args["name"]
    cur = _cursor()
    cur.execute(f"SELECT id FROM users WHERE name = '{name}'")  # TP-SQL-PY-001
    return cur.fetchone()


def user_by_email():
    email = request.form["email"]
    cur = _cursor()
    cur.execute("SELECT id FROM users WHERE email = '" + email + "'")  # TP-SQL-PY-002
    return cur.fetchone()


# ---- Safe negative control ----


def user_by_id_param():
    cur = _cursor()
    cur.execute("SELECT name FROM users WHERE id = ?", (request.args["id"],))  # SAFE-SQL-PY-001
    return cur.fetchone()
