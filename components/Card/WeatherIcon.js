import React from 'react';
import { createComponent } from '@cloudflare/style-container';
export default createComponent(
  () => ({
    width: '100px',
    height: '100px',
    borderRadius: '2px 2px 0 0'
  }),
  'img',
  ['src']
);
