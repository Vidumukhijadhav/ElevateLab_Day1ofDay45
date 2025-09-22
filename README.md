# ElevateLab_Day1ofDay45

My First GitHub Actions Pipeline 🚀

Starting small, learning big! My journey into CI/CD automation with GitHub Actions.

About This Project:
      This project is my first hands-on experience with GitHub Actions.
The goal was simple: understand how to automate workflows for a Node.js app. I started with a few basic stages—test, build, login, and push—and learned a lot about CI/CD along the way.

GitHub Actions, allows you to automate tasks like testing, building, and deploying applications directly from your GitHub repository. It’s a powerful tool to reduce manual work and ensure code quality across every commit.

#Features:-

1.  Automated Testing: Every code change triggers tests to ensure stability.

2.  Docker Build: Builds a Docker image for the Node.js app automatically.

3.  Docker Hub Login: Authenticates securely to Docker Hub using GitHub Secrets.

4.  Docker Push: Pushes the Docker image to Docker Hub for deployment or sharing.

Each stage is modular so that I can add more stages as I continue learning.


#Pipeline Stages Explained

  //*Test Stage
  
Runs unit tests to validate the application.
Fails early if any test fails, helping catch bugs quickly.

  //*Build Stage

Creates a Docker image of the application.
Ensures consistent environments for development and deployment.

  //*Login Stage
  
Logs into Docker Hub using secure credentials stored as GitHub Secrets.

  //*Push Stage
  
Pushes the built Docker image to Docker Hub.
Makes the image ready for deployment or further use.


#How to Use This Project
Prerequisites:

Node.js installed
Docker installed
GitHub account
Docker Hub account


#Setup Instructions

1.  Clone the repository
      git clone https://github.com/Vidumukhijadhav/ElevateLab_Day1ofDay45
      cd ElevateLab_Day1ofDay45 

2.  Set up GitHub Secrets

  DOCKER_HUB_USERNAME → your Docker Hub username
  
  DOCKER_HUB_ACCESS_TOKEN → your Docker Hub access token

3.  Write Dockerfile


          FROM node:18
          WORKDIR /nodejs-demo-app
          COPY package*.json ./
          RUN npm install
          COPY . .
          EXPOSE 3000
          CMD ["npm", "start"]

4. Write .yml file for GitHub Action Workflow

        name: CI/CD Pipeline
        
        on:
          push:
            branches: [ main ]
        
        jobs:
          test:
            runs-on: ubuntu-latest
        
            steps:
              # Step 1: Checkout the Code
              - name: Checkout Repository
                uses: actions/checkout@v3
        
              # Step 2: Setup Node.js
              - name: Setup Node.js
                uses: actions/setup-node@v3
                with:
                  node-version: '18'
        
              # Step 3: Install dependencies
              - name: Install dependencies
                run: npm install
        
              # Step 4: Run tests
              - name: Run tests
                run: npm test
        
          build:
            runs-on: ubuntu-latest
            needs: test # Ensure tests pass first
        
            steps:
              # Checkout the code again (required in separate job)
              - name: Checkout Repository
                uses: actions/checkout@v3
        
              # Build Docker image
              - name: Build Docker image
                run: |
                  docker build -t ${{ secrets.DOCKERHUB_USERNAME }}/nodejs-demo-app-sample .
        
          login_push:
            runs-on: ubuntu-latest
            needs: build
        
            steps:
              # Checkout the code again (optional, mainly for context)
              - name: Checkout Repository
                uses: actions/checkout@v3
        
              # Login to DockerHub
              - name: Login to DockerHub
                uses: docker/login-action@v2
                with:
                  username: ${{ secrets.DOCKERHUB_USERNAME }}
                  password: ${{ secrets.DOCKERHUB_PASSWORD }}
        
                  # Build Docker image (must rebuild because new runner)
              - name: Build Docker image
                run: |
                 docker build -t ${{ secrets.DOCKERHUB_USERNAME }}/nodejs-demo-app-sample .
        
              # Push Docker image
              - name: Push Docker image to DockerHub
                run: |
                  docker push ${{ secrets.DOCKERHUB_USERNAME }}/nodejs-demo-app-sample


#OUTPUT:

  Check for the Screenshots uploaded on this repository!


Automation Matters: CI/CD pipelines save time and enforce consistent standards.
This project is my first real dive into CI/CD with GitHub Actions.
Starting small helped me learn the workflow step by step, and now I feel confident to expand it into more complex pipelines.

Every automation step is a learning milestone, and this is just the beginning of my DevOps journey! 


