import boto3
from botocore.exceptions import ClientError

def create_eb_application(eb_client, app_name):
    """Create an Elastic Beanstalk application."""
    try:
        eb_client.create_application(ApplicationName=app_name)
        print(f"Application {app_name} created successfully.")
    except ClientError as e:
        print(f"Failed to create application: {e}")

def deploy_eb_application(eb_client, app_name, env_name, solution_stack_name, app_version_label, sample_application_url):
    """Deploy an application to Elastic Beanstalk."""
    try:
        # Create environment
        response = eb_client.create_environment(
            ApplicationName=app_name,
            EnvironmentName=env_name,
            SolutionStackName=solution_stack_name,
            VersionLabel=app_version_label
        )
        print(f"Environment {env_name} created successfully. URL: {response['EnvironmentResources']['Endpoints'][0]}")
    except ClientError as e:
        print(f"Failed to create environment: {e}")

def upload_source_bundle(eb_client, app_name, version_label, s3_bucket, s3_key):
    """Upload a new version to Elastic Beanstalk."""
    try:
        eb_client.create_application_version(
            ApplicationName=app_name,
            VersionLabel=version_label,
            SourceBundle={
                'S3Bucket': s3_bucket,
                'S3Key': s3_key
            }
        )
        print(f"Application version {version_label} created successfully.")
    except ClientError as e:
        print(f"Failed to upload source bundle: {e}")

def main():
    # AWS Configuration
    app_name = "FlaskAppAPI"
    env_name = "FlaskAppAPIEnv"
    solution_stack_name = "64bit Amazon Linux 2 v3.3.6 running Python 3.8"
    version_label = "v1"
    sample_application_url = "https://github.com/chase-b04/Sunhacks-Coupon/archive/refs/heads/main.zip"

    # Initialize Boto3 client
    session = boto3.Session(profile_name='your-aws-profile')
    eb_client = session.client('elasticbeanstalk')

    # Create Elastic Beanstalk application
    create_eb_application(eb_client, app_name)

    # Deploy the application
    deploy_eb_application(eb_client, app_name, env_name, solution_stack_name, version_label, sample_application_url)

if __name__ == "__main__":
    main()
