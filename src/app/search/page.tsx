import { Suspense } from 'react';
import SearchClientContent from './SearchClientContent';
import { getProducts } from '@/lib/woocommerce';
import { mapWcProduct } from '@/lib/utils';

export const metadata = {
  title: 'Search | Southern Spices',
};

export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const resolvedSearchParams = await searchParams;
  const query = (resolvedSearchParams.q as string) || '';
  
  let results: any[] = [];
  if (query) {
    const wcProducts = await getProducts({ search: query, per_page: 50 });
    results = wcProducts.map(mapWcProduct);
  }

  return (
    <Suspense fallback={
      <div className="section-container pt-12 pb-24 min-h-[50vh] flex items-center justify-center">
        <div className="animate-pulse text-slate-400 font-medium">Loading results...</div>
      </div>
    }>
      <SearchClientContent initialResults={results} query={query} />
    </Suspense>
  );
}
