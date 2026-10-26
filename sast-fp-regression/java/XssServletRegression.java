// SAST false-positive regression fixtures (Java servlet XSS). Static-scan only; never deployed.
package nolang.fixtures;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class XssServletRegression extends HttpServlet {

    // ---- Candidate false positives ----

    // Parameter read but never written to the response.
    protected void searchFlag(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String mode = request.getParameter("mode"); // FP-XSS-JAVA-001
        boolean verbose = "full".equals(mode);
        response.setStatus(verbose ? 200 : 204);
    }

    // Parameter converted to an int before output.
    protected void pageNumber(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int page = Integer.parseInt(request.getParameter("page"));
        response.getWriter().print("Page " + page); // FP-XSS-JAVA-002
    }

    // Parameter stored in the session; never rendered here.
    protected void rememberLanguage(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        session.setAttribute("lang", request.getParameter("lang")); // FP-XSS-JAVA-003
        response.setStatus(204);
    }

    // Complete HTML encoding (ampersand first) before output.
    protected void encodedGreeting(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String name = request.getParameter("name");
        String safe = name
            .replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace("\"", "&quot;")
            .replace("'", "&#x27;");
        response.setContentType("text/html");
        response.getWriter().print("<p>Hello " + safe + "</p>"); // FP-XSS-JAVA-004
    }

    // ---- Positive controls ----

    protected void directWrite(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.getWriter().write(request.getParameter("q")); // TP-XSS-JAVA-001
    }

    protected void htmlWithoutEncoding(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String title = request.getParameter("title");
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<h1>" + title + "</h1>"); // TP-XSS-JAVA-002
    }

    // Only angle brackets are escaped, but the value lands in a quoted attribute: '" onmouseover=...' still works.
    protected void incompleteEscaping(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String link = request.getParameter("link").replace("<", "&lt;").replace(">", "&gt;");
        response.setContentType("text/html");
        response.getWriter().print("<a href=\"" + link + "\">open</a>"); // TP-XSS-JAVA-003
    }

    // ---- Safe negative control ----

    protected void constantBody(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.getWriter().print("<p>OK</p>"); // SAFE-XSS-JAVA-001
    }
}
