// Package fixtures holds Go ResponseWriter fixtures. Static-scan only: handlers are never registered.
package fixtures

import (
	"html/template"
	"io"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
)

// ---- Candidate false positives ----

func helpText(w http.ResponseWriter, r *http.Request) {
	data, _ := os.ReadFile("/srv/app/static/help.txt")
	w.Write(data) // FP-XSS-GO-001
}

func uptime(w http.ResponseWriter, r *http.Request) {
	out, _ := exec.Command("uptime").Output()
	w.Write(out) // FP-XSS-GO-002
}

func ping(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("ok")) // FP-XSS-GO-003
}

// ---- Review: file chosen by the request (also a path traversal) ----

func userFile(w http.ResponseWriter, r *http.Request) {
	data, _ := os.ReadFile(filepath.Join("/srv/app/files", r.URL.Query().Get("f")))
	w.Write(data) // REVIEW-XSS-GO-004
}

// ---- Positive controls ----

func greet(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	w.Write([]byte("<p>Hello " + r.URL.Query().Get("name") + "</p>")) // TP-XSS-GO-001
}

var bioTmpl = template.Must(template.New("bio").Parse(`<div>{{.}}</div>`))

func bio(w http.ResponseWriter, r *http.Request) {
	bioTmpl.Execute(w, template.HTML(r.FormValue("bio"))) // TP-XSS-GO-002
}

func proxy(w http.ResponseWriter, r *http.Request) {
	resp, err := http.Get(r.URL.Query().Get("url"))
	if err != nil {
		return
	}
	defer resp.Body.Close()
	w.Header().Set("Content-Type", "text/html")
	io.Copy(w, resp.Body) // TP-XSS-GO-003
}
