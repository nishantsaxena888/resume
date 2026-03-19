# AWS Deployment Instructions

This folder is designed to hold Infrastructure as Code (IaC) templates for AWS.

When the SuperAdmin creates a `deployment_target` record with `provider="aws"`, 
the backend can be configured to trigger AWS CDK, Terraform, or CloudFormation scripts here 
to automatically spin up isolated RDS Postgres instances and Fargate API services.

## Suggested Templates
- `template.yml` (SAM)
- `main.tf` (Terraform)
- `cdk/` (AWS CDK App)
