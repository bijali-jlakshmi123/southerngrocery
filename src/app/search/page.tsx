import { Suspense } from 'react';
import SearchClientContent from './SearchClientContent';

export const metadata = {
  title: 'Search | Southern Spices',
};

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="section-container pt-12 pb-24 min-h-[50vh] flex items-center justify-center">
        <div className="animate-pulse text-slate-400 font-medium">Loading results...</div>
      </div>
    }>
      <SearchClientContent />
    </Suspense>
  );
}
