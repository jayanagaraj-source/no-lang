# Terraform for the no-lang fixture.
# INTENTIONALLY INSECURE - do not apply.

provider "aws" {
  region = "us-east-1"
}

# Insecure: publicly readable bucket, no encryption, no versioning
resource "aws_s3_bucket" "data" {
  bucket = "no-lang-example-data"
}

resource "aws_s3_bucket_acl" "data" {
  bucket = aws_s3_bucket.data.id
  acl    = "public-read"
}

resource "aws_s3_bucket_public_access_block" "data" {
  bucket                  = aws_s3_bucket.data.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# Insecure: SSH and all ports open to the world
resource "aws_security_group" "open" {
  name = "no-lang-open"

  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

/* Insecure: unencrypted volume and database */
resource "aws_ebs_volume" "data" {
  availability_zone = "us-east-1a"
  size              = 10
  encrypted         = false
}

resource "aws_db_instance" "db" {
  engine              = "mysql"
  instance_class      = "db.t3.micro"
  allocated_storage   = 20
  username            = "admin"
  password            = "DummyDbPass123!"
  publicly_accessible = true
  storage_encrypted   = false
  skip_final_snapshot = true
}
