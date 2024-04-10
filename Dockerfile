# Use the official OpenJDK base image
FROM openjdk:16

# Set the working directory inside the container
WORKDIR /app

COPY . /app

# Copy the executable JAR file from the target directory into the container at /app
COPY beautyApp/backend/build/libs/beautyApp.jar /app/beautyApp/backend/build/libs/beautyApp.jar

# Specify the command to run your Spring Boot application when the container starts
CMD ["java", "-jar", "/app/beautyApp.jar"]
