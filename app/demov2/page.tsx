'use client'

import dynamic from 'next/dynamic';

const Panel = dynamic(() => import('@/components/demov2/panel'), { ssr: false })


export default function Home() {
  return (
    <Panel />
  );
}