# Stage 1: build the app
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

COPY ../../../Downloads/AIU%20hackaton/backend/demo/pom.xml ./
COPY ../../../Downloads/AIU%20hackaton/backend/demo/src ./src
RUN mvn clean package -DskipTests

# Stage 2: run the app
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]