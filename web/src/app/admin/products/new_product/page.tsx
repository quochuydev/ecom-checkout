import React from 'react';
import NewProduct from '@/ui/admin/new_product';
import { config } from '@/lib/config';

export default function Page() {
  return <NewProduct apiUrl={config.app.url} />;
}
