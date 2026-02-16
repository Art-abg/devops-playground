/*
terraform {
  backend "s3" {
    bucket         = "artur-abg-terraform-state"
    key            = "devops-playground/terraform.tfstate"
    region         = "eu-central-1"
    dynamodb_table = "terraform-lock-table"
    encrypt        = true
  }
}
*/
