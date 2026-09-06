import type { AwsIconComponent } from '@aws-icons/react';
import {
  AmazonVirtualPrivateCloud,
  AmazonElasticBlockStore,
  AmazonEfs,
  AmazonFsx,
  AmazonSimpleStorageService,
  AwsBackup,
  AwsElasticDisasterRecovery,
  AwsStorageGateway,
} from '@aws-icons/react/architecture-service';
import { PublicSubnet } from '@aws-icons/react/architecture-group';
import { Firewall } from '@aws-icons/react/resource';

// Maps a curriculum topic's `order` to its official AWS Architecture Icon, when one exists.
export const awsTopicIcons: Record<number, AwsIconComponent> = {
  1: AmazonVirtualPrivateCloud,
  4: PublicSubnet,
  11: Firewall,
  25: AmazonElasticBlockStore,
  27: AmazonEfs,
  28: AmazonFsx,
  29: AmazonSimpleStorageService,
  30: AmazonSimpleStorageService,
  31: AmazonSimpleStorageService,
  32: AmazonSimpleStorageService,
  33: AmazonSimpleStorageService,
  34: AmazonSimpleStorageService,
  35: AmazonSimpleStorageService,
  36: AwsBackup,
  37: AwsElasticDisasterRecovery,
  38: AwsStorageGateway,
};
