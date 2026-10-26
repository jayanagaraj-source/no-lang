// Kotlin Gradle build script for the no-lang scanner test fixture.
// INTENTIONALLY INSECURE - do not use as a template.

plugins {
    java
    application
}

group = "com.example.nolang"
version = "0.0.1"

repositories {
    // Insecure: plain-HTTP repository with the protocol check disabled
    maven {
        url = uri("http://repo.example.com/maven2")
        isAllowInsecureProtocol = true
    }
    mavenCentral()
}

dependencies {
    // Text4Shell - CVE-2022-42889
    implementation("org.apache.commons:commons-text:1.9")
    // Unsafe constructor deserialization - CVE-2022-1471
    implementation("org.yaml:snakeyaml:1.33")
    // Insecure: dynamic version, resolves whatever is newest at build time
    implementation("com.google.guava:guava:+")
}

/*
 * Insecure dependency configuration: never fail on
 * version conflicts, so vulnerable transitive versions slip in.
 */
configurations.all {
    resolutionStrategy {
        cacheDynamicVersionsFor(0, "seconds")
    }
}

application {
    mainClass.set("com.example.nolang.MainKt")
}
