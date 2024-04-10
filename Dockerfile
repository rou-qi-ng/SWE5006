# Use the official OpenJDK base image
FROM openjdk:16

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file from the target directory into the container at /app
COPY beautyApp/backend/target/beautyApp-0.0.1-SNAPSHOT.jar /app/beautyApp.jar

# Specify the command to run your Spring Boot application when the container starts
CMD ["java", "-jar", "/app/beautyApp.jar"]