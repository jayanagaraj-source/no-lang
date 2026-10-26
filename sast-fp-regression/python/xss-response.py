"""Django HttpResponse fixtures. Static-scan only; not wired to any URLconf."""

from django.contrib.auth.models import User
from django.http import HttpResponse
from django.utils.html import escape

from shop.models import Order


# ---- Candidate false positives / review ----


def profile_name(request):
    user = User.objects.get(pk=request.user.id)
    # Usernames are often user-chosen: attacker control is plausible, so this is REVIEW.
    return HttpResponse(user.username)  # REVIEW-XSS-PY-001


def order_count(request):
    total = Order.objects.filter(owner_id=request.user.id).count()
    return HttpResponse(str(total))  # FP-XSS-PY-002


def health(request):
    return HttpResponse("OK")  # FP-XSS-PY-003


# ---- Positive controls ----


def greet(request):
    return HttpResponse("Hello " + request.GET.get("name", ""))  # TP-XSS-PY-001


def search(request):
    term = request.GET["q"]
    return HttpResponse(f"<p>Results for {term}</p>", content_type="text/html")  # TP-XSS-PY-002


# ---- Safe negative control ----


def search_escaped(request):
    term = escape(request.GET.get("q", ""))
    return HttpResponse(f"<p>Results for {term}</p>", content_type="text/html")  # SAFE-XSS-PY-001
