import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { AwsIconComponent } from '@aws-icons/react';

// Pre-renders an AWS icon to a data URI so it can be embedded directly in a
// Mermaid node's HTML label (Mermaid can't import React components itself).
export function awsIconDataUri(Icon: AwsIconComponent, size = 20): string {
  const svg = renderToStaticMarkup(createElement(Icon, { width: size, height: size }));
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}
