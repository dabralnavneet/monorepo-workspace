import type { AwsIconComponent } from '@aws-icons/react';
import { AmazonVirtualPrivateCloud } from '@aws-icons/react/architecture-service';
import { PublicSubnet } from '@aws-icons/react/architecture-group';
import { Firewall } from '@aws-icons/react/resource';

// Maps a curriculum topic's `order` to its official AWS Architecture Icon, when one exists.
export const awsTopicIcons: Record<number, AwsIconComponent> = {
  1: AmazonVirtualPrivateCloud,
  4: PublicSubnet,
  11: Firewall,
};
