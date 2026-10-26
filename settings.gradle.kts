// Kotlin settings script for the no-lang scanner test fixture.
// INTENTIONALLY INSECURE - do not use as a template.

pluginManagement {
    repositories {
        // Insecure: plugin repository over plain HTTP
        maven {
            url = uri("http://plugins.example.com/m2")
            isAllowInsecureProtocol = true
        }

        /*
         * Insecure: credentials for the plugin repository are
         * hardcoded instead of read from the environment.
         */
        maven {
            url = uri("http://private.example.com/plugins")
            isAllowInsecureProtocol = true
            credentials {
                username = "admin"
                password = "DummyPluginPass123!"
            }
        }
    }
}

rootProject.name = "no-lang"
