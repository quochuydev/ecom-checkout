import React from 'react';
import NewProduct from '@/ui/admin/new_product';
import configuration from '@/configuration';

export default function Page() {
  return <NewProduct appUrl={configuration.appUrl} />;
}
