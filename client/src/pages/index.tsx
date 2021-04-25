import { NextPage } from 'next'

import s from '@styles/Home.module.sass'

const IndexPage: NextPage = () => {
  return (
    <div className={s.root}>
      <header className={s.header}>
        <h1>Nextjs app</h1>
      </header>
      <main className={s.content}>
        <div className={s.main}>
          <div className={s.item}></div>
          <div className={s.item}></div>
          <div className={s.item}></div>
          <div className={s.item}></div>
        </div>
      </main>
      <footer className={s.footer}>
        <p className={s.copyright}>(c) vs_phoenix</p>
      </footer>
    </div>
  )
}
export default IndexPage
