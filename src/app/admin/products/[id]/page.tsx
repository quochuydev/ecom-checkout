import React from 'react';
import Product from '@/ui/admin/product';
import configuration from '@/configuration';

export default function Page({ params: { id: productId } }: any) {
  return <Product productId={productId} appUrl={configuration.appUrl} />;
}
