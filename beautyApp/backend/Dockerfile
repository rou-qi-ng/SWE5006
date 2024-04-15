FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean install

FROM openjdk:17-alpine
WORKDIR /app
COPY --from=build /app/target/beautyApp-0.0.1-SNAPSHOT.jar ./demo-aws.jar
EXPOSE 8401
CMD ["java", "-jar", "demo-aws.jar"]







# FROM openjdk:17-jdk-slim
# WORKDIR /app
# COPY /target/beautyApp-0.0.1-SNAPSHOT.jar /app/beautyApp.jar
# EXPOSE 8080
# CMD ["java", "-jar", "beautyApp.jar"]
