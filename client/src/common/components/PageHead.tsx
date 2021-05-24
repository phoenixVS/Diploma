import Head from 'next/head'
import React, { FC } from 'react'

type PageHeadProps = {}

export const PageHead: FC<PageHeadProps> = () => {
  return (
    <Head>
      <link
        href="https://fonts.googleapis.com/css?family=Baloo+Bhaijaan%7CRoboto:300,400,500&display=swap"
        rel="stylesheet"
      />
      <link rel="manifest" href="/manifest.json" />
      <link href="/icons/icon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
      <link href="/icons/icon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
      <link rel="apple-touch-icon" href="/icons/apple-icon.png"></link>
      <meta name="theme-color" content="#317EFB" />
    </Head>
  )
}
