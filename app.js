// Browser script for the no-lang fixture.
// INTENTIONALLY INSECURE - do not reuse.

"use strict";

// Insecure: hardcoded dummy API key in client-side code
const API_KEY = "tok_EXAMPLE_0000000000000000";

/* Insecure: query parameter assigned to innerHTML (DOM XSS) */
function renderSearch() {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q");
  document.getElementById("results").innerHTML = "Results for " + q;
}

// Insecure: user input evaluated as code
function calculate(expr) {
  return eval(expr);
}

// Insecure: message handler without an origin check
window.addEventListener("message", function (event) {
  document.body.innerHTML = event.data;
});

// Insecure: predictable token from Math.random
function newSessionToken() {
  return Math.random().toString(36).slice(2);
}

// Insecure: API call over plain HTTP with the key in the URL
function loadData() {
  return fetch("http://api.example.com/data?key=" + API_KEY);
}
