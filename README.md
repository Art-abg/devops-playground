# devops-playground

A professional DevOps demonstration environment for simulating enterprise workflows. This repository showcases containerization, Infrastructure as Code (IaC), and automated CI/CD pipelines.

### Features
- **Containerization**: Multi-stage Docker builds for optimized React application serving.
- **Infrastructure as Code**: AWS infrastructure provisioned via Terraform with remote S3 backend and DynamoDB locking.
- **CI/CD Pipeline**: GitHub Actions for automated building, testing, and continuous deployment (CD) to AWS EC2 via SSH.

### What it Uses
- **Frontend**: React 19 + Vite 7
- **Containerization**: Docker, Nginx
- **Infrastructure**: Terraform (AWS EC2, S3 Backend, Security Groups)
- **CI/CD**: GitHub Actions, Docker Hub
- **Deployment**: AWS EC2 (SSH-based CD)
