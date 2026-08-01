# Stage 1 (builder): compile and package the application with Maven.
FROM amazoncorretto:21-alpine3.16 AS builder

RUN apk add --no-cache maven

WORKDIR /app

COPY pom.xml ./
COPY saasapp-core/pom.xml saasapp-core/pom.xml
COPY saasapp-app/pom.xml saasapp-app/pom.xml
COPY saasapp-tests/pom.xml saasapp-tests/pom.xml

RUN mvn -B -q -DskipTests dependency:go-offline

COPY saasapp-core/src saasapp-core/src
COPY saasapp-app/src saasapp-app/src

RUN mvn -B -q -DskipTests -pl saasapp-app -am clean package

# Stage 2 (runtime): start from a clean image and copy only the executable JAR.
# We intentionally use FROM again for a multi-stage build to keep the final image smaller and safer. (No maven inside)
FROM amazoncorretto:21-alpine3.16

RUN apk add --no-cache tzdata wget

WORKDIR /opt/saasapp

COPY --from=builder /app/saasapp-app/target/*-exec.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/opt/saasapp/app.jar"]
