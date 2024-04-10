FROM openjdk:16 AS builder

# Create app directory
WORKDIR /usr/src/app

# Switch to root user to install git
USER root

# Install git
RUN apt-get update && apt-get install -y git

# Switch back to the default non-root user
USER openjdk

# Clone the repository
RUN git clone https://github.com/rou-qi-ng/SWE5006 .

# Build the Java application
RUN ./gradlew build

FROM openjdk:16

# Set the working directory
WORKDIR /usr/src/app

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/beautyApp /usr/src/app/beautyApp

# Expose the port on which your Java application is running
EXPOSE 8080

# Command to start the Java application
CMD ["java", "-cp", "beautyApp/backend/build/classes/java/main", "com.example.beautyApp.BeautyAppApplication"]
