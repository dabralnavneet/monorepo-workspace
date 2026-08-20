// Full planned curriculum for the AWS SAA guide series, independent of which parts are written yet.
// `order` must match the `order` frontmatter field in the corresponding .mdx/.md file once published.
export interface CurriculumTopic {
  slug: string;
  title: string;
  order: number;
}

export interface CurriculumDomain {
  domain: string;
  topics: CurriculumTopic[];
}

export const awsSaaCurriculum: CurriculumDomain[] = [
  {
    domain: 'Networking',
    topics: [
      { slug: 'vpc-overview', title: 'VPC Overview', order: 1 },
      { slug: 'custom-vpc', title: 'Custom VPC', order: 2 },
      { slug: 'default-vpc', title: 'Default VPC', order: 3 },
      { slug: 'subnets', title: 'Subnets', order: 4 },
      { slug: 'routing-in-vpc', title: 'Routing in VPC', order: 5 },
      { slug: 'internet-gateways', title: 'Internet Gateways', order: 6 },
      { slug: 'nat-gateways', title: 'NAT Gateways', order: 7 },
      { slug: 'private-public-subnets', title: 'Private and Public Subnets', order: 8 },
      { slug: 'dns-vpc', title: 'DNS in VPC', order: 9 },
      { slug: 'elastic-ip', title: 'Elastic IP', order: 10 },
      { slug: 'security-groups', title: 'Security Groups', order: 11 },
      { slug: 'nacls', title: 'NACLs', order: 12 },
      { slug: 'load-balancers', title: 'Load Balancers', order: 13 },
      { slug: 'vpn', title: 'VPN', order: 14 },
      { slug: 'direct-connect', title: 'Direct Connect', order: 15 },
      { slug: 'vpc-peering', title: 'VPC Peering', order: 16 },
      { slug: 'vpc-peering-demo', title: 'VPC Peering Demo', order: 17 },
      { slug: 'transit-gateway', title: 'Transit Gateway', order: 18 },
      { slug: 'privatelink', title: 'PrivateLink', order: 19 },
      { slug: 'cloudfront', title: 'CloudFront', order: 20 },
      { slug: 'lambda-edge', title: 'Lambda@Edge', order: 21 },
      { slug: 'global-accelerator', title: 'Global Accelerator', order: 22 },
      { slug: 'route53', title: 'Route 53', order: 23 },
      { slug: 'route53-arc', title: 'Route 53 Application Recovery Controller', order: 24 },
    ],
  },
  {
    domain: 'Storage',
    topics: [
      { slug: 'ebs', title: 'EBS', order: 25 },
      { slug: 'ebs-demo-part-1', title: 'EBS Demo Part 1', order: 26 },
      { slug: 'ebs-demo-part-2', title: 'EBS Demo Part 2', order: 27 },
      { slug: 'instance-store', title: 'Instance Store', order: 28 },
      { slug: 'instance-store-demo', title: 'Instance Store Demo', order: 29 },
      { slug: 'efs', title: 'EFS', order: 30 },
      { slug: 'efs-demo', title: 'EFS Demo', order: 31 },
      { slug: 'fsx-windows-lustre-netapp-openzfs', title: 'FSx for Windows / Lustre / NetApp / OpenZFS', order: 32 },
      { slug: 's3-overview', title: 'S3 Overview', order: 33 },
      { slug: 's3-demo', title: 'S3 Demo', order: 34 },
      { slug: 's3-storage-classes', title: 'S3 Storage Classes', order: 35 },
      { slug: 's3-storage-classes-demo', title: 'S3 Storage Classes Demo', order: 36 },
      { slug: 's3-versioning', title: 'S3 Versioning', order: 37 },
      { slug: 's3-versioning-demo', title: 'S3 Versioning Demo', order: 38 },
      { slug: 's3-acl-and-resource-policies', title: 'S3 ACL and Resource Policies', order: 39 },
      { slug: 's3-acl-and-resource-policies-demo', title: 'S3 ACL and Resource Policies Demo', order: 40 },
      { slug: 's3-static-website-hosting', title: 'S3 Static Website Hosting', order: 41 },
      { slug: 's3-static-website-hosting-demo', title: 'S3 Static Website Hosting Demo', order: 42 },
      { slug: 's3-pre-signed-urls', title: 'S3 Pre-Signed URLs', order: 43 },
      { slug: 's3-pre-signed-urls-demo', title: 'S3 Pre-Signed URLs Demo', order: 44 },
      { slug: 's3-access-points', title: 'S3 Access Points', order: 45 },
      { slug: 's3-access-points-demo', title: 'S3 Access Points Demo', order: 46 },
      { slug: 'aws-backup', title: 'AWS Backup', order: 47 },
      { slug: 'elastic-disaster-recovery-storage', title: 'Elastic Disaster Recovery', order: 48 },
      { slug: 'storage-gateway', title: 'Storage Gateway', order: 49 },
    ],
  },
  {
    domain: 'Compute',
    topics: [
      { slug: 'ec2', title: 'EC2', order: 50 },
      { slug: 'ec2-demo', title: 'EC2 Demo', order: 51 },
      { slug: 'ec2-image-builder', title: 'EC2 Image Builder', order: 52 },
      { slug: 'elastic-network-interfaces', title: 'Elastic Network Interfaces', order: 53 },
      { slug: 'elastic-network-interfaces-demo', title: 'Elastic Network Interfaces Demo', order: 54 },
      { slug: 'elastic-beanstalk', title: 'Elastic Beanstalk', order: 55 },
      { slug: 'elastic-beanstalk-demo', title: 'Elastic Beanstalk Demo', order: 56 },
      { slug: 'lightsail', title: 'Lightsail', order: 57 },
      { slug: 'ecs', title: 'ECS', order: 58 },
      { slug: 'ecs-demo-part-1', title: 'ECS Demo Part 1', order: 59 },
      { slug: 'ecs-demo-part-2', title: 'ECS Demo Part 2', order: 60 },
      { slug: 'eks', title: 'EKS', order: 61 },
      { slug: 'ecr', title: 'ECR', order: 62 },
      { slug: 'ecr-demo', title: 'ECR Demo', order: 63 },
      { slug: 'app-runner', title: 'App Runner', order: 64 },
      { slug: 'batch', title: 'Batch', order: 65 },
      { slug: 'lambda', title: 'Lambda', order: 66 },
      { slug: 'lambda-demo', title: 'Lambda Demo', order: 67 },
      { slug: 'serverless-application-model', title: 'Serverless Application Model', order: 68 },
      { slug: 'amplify', title: 'Amplify', order: 69 },
      { slug: 'outposts', title: 'Outposts', order: 70 },
      { slug: 'ecs-eks-anywhere', title: 'ECS/EKS Anywhere', order: 71 },
      { slug: 'vmware-cloud-on-aws', title: 'VMware Cloud on AWS', order: 72 },
      { slug: 'snow-family-compute', title: 'The Snow Family (Compute)', order: 73 },
    ],
  },
  {
    domain: 'Database',
    topics: [
      { slug: 'database-agenda-and-introduction', title: 'Database Agenda and Introduction', order: 74 },
      { slug: 'aws-rds', title: 'AWS RDS', order: 75 },
      { slug: 'rds-aurora-and-aurora-serverless', title: 'RDS Aurora and Aurora Serverless', order: 76 },
      { slug: 'rds-proxy', title: 'RDS Proxy', order: 77 },
      { slug: 'redshift-main', title: 'Redshift', order: 78 },
      { slug: 'redshift-serverless', title: 'Redshift Serverless', order: 79 },
      { slug: 'dynamodb', title: 'DynamoDB', order: 80 },
      { slug: 'dynamodb-demo', title: 'DynamoDB Demo', order: 81 },
      { slug: 'dynamodb-accelerator', title: 'DynamoDB Accelerator (DAX)', order: 82 },
      { slug: 'opensearch', title: 'OpenSearch', order: 83 },
      { slug: 'opensearch-demo', title: 'OpenSearch Demo', order: 84 },
      { slug: 'elasticache', title: 'ElastiCache', order: 85 },
      { slug: 'memorydb-for-redis', title: 'MemoryDB for Redis', order: 86 },
      { slug: 'documentdb', title: 'DocumentDB', order: 87 },
      { slug: 'keyspaces', title: 'Keyspaces', order: 88 },
      { slug: 'neptune', title: 'Neptune', order: 89 },
      { slug: 'qldb', title: 'QLDB', order: 90 },
      { slug: 'timestream', title: 'Timestream', order: 91 },
    ],
  },
  {
    domain: 'Application Integration',
    topics: [
      { slug: 'autoscaling', title: 'Autoscaling', order: 92 },
      { slug: 'autoscaling-demo', title: 'Autoscaling Demo', order: 93 },
      { slug: 'api-gateway', title: 'API Gateway', order: 94 },
      { slug: 'api-gateway-demo', title: 'API Gateway Demo', order: 95 },
      { slug: 'appflow', title: 'AppFlow', order: 96 },
      { slug: 'sns', title: 'SNS', order: 97 },
      { slug: 'sqs', title: 'SQS', order: 98 },
      { slug: 'sns-sqs-demo', title: 'SNS/SQS Demo', order: 99 },
      { slug: 'amazon-mq', title: 'Amazon MQ', order: 100 },
      { slug: 'eventbridge', title: 'EventBridge', order: 101 },
      { slug: 'simple-email-service', title: 'Simple Email Service', order: 102 },
      { slug: 'step-functions', title: 'Step Functions', order: 103 },
      { slug: 'simple-workflow-service', title: 'Simple Workflow Service', order: 104 },
      { slug: 'managed-apache-airflow', title: 'Managed Apache Airflow', order: 105 },
    ],
  },
  {
    domain: 'Data and ML',
    topics: [
      { slug: 'kinesis', title: 'Kinesis', order: 106 },
      { slug: 'kinesis-demo', title: 'Demo: Kinesis Real-Time Consumption and Production', order: 107 },
      { slug: 'managed-service-for-kafka', title: 'Managed Service for Kafka', order: 108 },
      { slug: 'glue', title: 'Glue', order: 109 },
      { slug: 'emr', title: 'EMR', order: 110 },
      { slug: 'glue-databrew', title: 'Glue DataBrew', order: 111 },
      { slug: 'lake-formation', title: 'Lake Formation', order: 112 },
      { slug: 'athena', title: 'Athena', order: 113 },
      { slug: 'athena-demo', title: 'Demo: Athena in Action', order: 114 },
      { slug: 'quicksight', title: 'QuickSight', order: 115 },
      { slug: 'sagemaker', title: 'SageMaker', order: 116 },
      { slug: 'rekognition', title: 'Rekognition', order: 117 },
      { slug: 'rekognition-demo', title: 'Demo: Rekognition Recognizing an Image', order: 118 },
      { slug: 'polly', title: 'Polly', order: 119 },
      { slug: 'lex', title: 'Lex', order: 120 },
      { slug: 'comprehend', title: 'Comprehend', order: 121 },
      { slug: 'forecast', title: 'Forecast', order: 122 },
      { slug: 'augmented-ai', title: 'Augmented AI', order: 123 },
      { slug: 'fraud-detector', title: 'Fraud Detector', order: 124 },
      { slug: 'transcribe', title: 'Transcribe', order: 125 },
      { slug: 'translate', title: 'Translate', order: 126 },
      { slug: 'translate-demo', title: 'Demo: AWS Translate', order: 127 },
      { slug: 'textract', title: 'Textract', order: 128 },
    ],
  },
  {
    domain: 'Migration and Transfer',
    topics: [
      { slug: 'migration-transfer-agenda-and-introduction', title: 'Migration & Transfer Agenda and Introduction', order: 129 },
      { slug: 'migration-hub', title: 'Migration Hub', order: 130 },
      { slug: 'application-discovery-service', title: 'Application Discovery Service', order: 131 },
      { slug: 'application-migration-service', title: 'Application Migration Service', order: 132 },
      { slug: 'database-migration-service', title: 'Database Migration Service', order: 133 },
      { slug: 'elastic-disaster-recovery-migration', title: 'Elastic Disaster Recovery', order: 134 },
      { slug: 'aws-mainframe-modernization', title: 'AWS Mainframe Modernization', order: 135 },
      { slug: 'datasync', title: 'DataSync', order: 136 },
      { slug: 'datasync-demo', title: 'Demo: File Server to EFS Using DataSync', order: 137 },
      { slug: 'aws-transfer-family', title: 'AWS Transfer Family for FTP/AS2', order: 138 },
      { slug: 'snow-family-storage', title: 'The Snow Family (Storage)', order: 139 },
    ],
  },
  {
    domain: 'Management and Governance',
    topics: [
      { slug: 'cloudformation', title: 'CloudFormation', order: 140 },
      { slug: 'cloudformation-demo', title: 'CloudFormation Demo', order: 141 },
      { slug: 'cdk', title: 'CDK', order: 142 },
      { slug: 'cdk-demo', title: 'Demo: S3 Bucket with Python and the CDK', order: 143 },
      { slug: 'cloudwatch', title: 'CloudWatch', order: 144 },
      { slug: 'cloudwatch-demo', title: 'CloudWatch Demo', order: 145 },
      { slug: 'x-ray', title: 'X-Ray', order: 146 },
      { slug: 'x-ray-demo', title: 'Demo: X-Ray Your Applications on AWS', order: 147 },
      { slug: 'aws-health-dashboard', title: 'AWS Health Dashboard', order: 148 },
      { slug: 'prometheus', title: 'Prometheus', order: 149 },
      { slug: 'grafana', title: 'Grafana', order: 150 },
      { slug: 'trusted-advisor', title: 'Trusted Advisor', order: 151 },
      { slug: 'launch-wizard', title: 'Launch Wizard', order: 152 },
      { slug: 'compute-optimizer', title: 'Compute Optimizer', order: 153 },
      { slug: 'aws-organizations', title: 'AWS Organizations', order: 154 },
      { slug: 'control-tower', title: 'Control Tower', order: 155 },
      { slug: 'control-tower-demo', title: 'Demo: SSO, Audit, and Security in a Control Tower Account', order: 156 },
      { slug: 'systems-manager', title: 'Systems Manager', order: 157 },
      { slug: 'service-catalog', title: 'Service Catalog', order: 158 },
      { slug: 'license-manager', title: 'License Manager', order: 159 },
      { slug: 'proton', title: 'Proton', order: 160 },
      { slug: 'resource-group-and-tag-manager', title: 'Resource Group and Tag Manager', order: 161 },
      { slug: 'resilience-hub', title: 'Resilience Hub', order: 162 },
      { slug: 'resource-explorer', title: 'Resource Explorer', order: 163 },
      { slug: 'resource-access-manager', title: 'Resource Access Manager', order: 164 },
    ],
  },
  {
    domain: 'Security',
    topics: [
      { slug: 'iam', title: 'IAM', order: 165 },
      { slug: 'iam-demo', title: 'IAM Demo', order: 166 },
      { slug: 'iam-demo-roles-for-ec2', title: 'IAM Demo: Roles for EC2 Instances', order: 167 },
      { slug: 'iam-identity-center-sso', title: 'IAM Identity Center (SSO)', order: 168 },
      { slug: 'iam-identity-center-sso-demo', title: 'IAM Identity Center (SSO) Demo', order: 169 },
      { slug: 'cognito', title: 'Cognito', order: 170 },
      { slug: 'directory-service', title: 'Directory Service', order: 171 },
      { slug: 'verified-permissions', title: 'Verified Permissions', order: 172 },
      { slug: 'cloudtrail', title: 'CloudTrail', order: 173 },
      { slug: 'cloudtrail-demo', title: 'Demo: Setting Up CloudTrail for the First Time', order: 174 },
      { slug: 'config', title: 'Config', order: 175 },
      { slug: 'artifact', title: 'Artifact', order: 176 },
      { slug: 'guardduty', title: 'GuardDuty', order: 177 },
      { slug: 'inspector', title: 'Inspector', order: 178 },
      { slug: 'macie', title: 'Macie', order: 179 },
      { slug: 'macie-demo', title: 'Demo: Macie in Action', order: 180 },
      { slug: 'security-hub', title: 'Security Hub', order: 181 },
      { slug: 'kms', title: 'KMS', order: 182 },
      { slug: 'cloudhsm', title: 'CloudHSM', order: 183 },
      { slug: 'certificate-manager', title: 'Certificate Manager', order: 184 },
      { slug: 'private-certificate-authority', title: 'Private Certificate Authority', order: 185 },
      { slug: 'secrets-manager', title: 'Secrets Manager', order: 186 },
      { slug: 'nacls-and-security-groups-recap', title: 'NACLs and Security Groups', order: 187 },
      { slug: 'security-lake', title: 'Security Lake', order: 188 },
      { slug: 'waf', title: 'WAF', order: 189 },
      { slug: 'shield-and-shield-advanced', title: 'Shield and Shield Advanced', order: 190 },
      { slug: 'network-firewall', title: 'Network Firewall', order: 191 },
      { slug: 'firewall-manager', title: 'Firewall Manager', order: 192 },
    ],
  },
];

export interface SidebarTopic extends CurriculumTopic {
  url: string | null;
  published: boolean;
}

export interface SidebarDomain {
  domain: string;
  topics: SidebarTopic[];
  publishedCount: number;
}

// Merges the static curriculum with whichever .mdx/.md parts actually exist on disk.
export function getAwsSaaSidebar(): { domains: SidebarDomain[]; flatPublished: SidebarTopic[] } {
  const modules = import.meta.glob('../pages/guides/aws-saa/*.{md,mdx}', { eager: true }) as Record<
    string,
    { frontmatter: { order: number }; url: string }
  >;

  const urlByOrder = new Map<number, string>();
  for (const mod of Object.values(modules)) {
    urlByOrder.set(mod.frontmatter.order, mod.url);
  }

  const domains = awsSaaCurriculum.map((d) => {
    const topics = d.topics.map((t) => ({
      ...t,
      url: urlByOrder.get(t.order) ?? null,
      published: urlByOrder.has(t.order),
    }));
    return { domain: d.domain, topics, publishedCount: topics.filter((t) => t.published).length };
  });

  const flatPublished = domains
    .flatMap((d) => d.topics.filter((t) => t.published))
    .sort((a, b) => a.order - b.order);

  return { domains, flatPublished };
}
