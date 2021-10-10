import * as React from 'react'
import { useRouter } from 'next/router'
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'
import { IoSunnyOutline, IoMoonSharp } from 'react-icons/io5'
import * as config from 'lib/config'

import styles from './styles.module.css'

export default function Home() {
  function makeLinksNoFollow() {
    const whitelist = [
      'www.filizguvenlik.com.tr',
      'livicom.net',
      'livicomturkiye.com',
      'www.cbsofyalioglu.com',
      'alarmsistemleri.org',
      'tr.wikipedia.org'
    ]

    const allAnchors = document.querySelectorAll('a')
    for (const a of allAnchors.values()) {
      if (whitelist.includes(a.host)) {
        a.rel="noopener"
      }
      else if (!whitelist.includes(a.host)) {
        a.rel = 'nofollow noopener'
      }
    }
  }
  React.useEffect(() => {
    makeLinksNoFollow()
  }, [])
  return (
    <div>
      {}
    </div>
  )
}
export const Footer: React.FC<{
  isDarkMode: boolean
  toggleDarkMode: () => void
}> = ({ isDarkMode, toggleDarkMode }) => {
  //const router = useRouter()
  //console.log('\n\n', router.pathname)
  const [hasMounted, setHasMounted] = React.useState(false)
  const toggleDarkModeCb = React.useCallback(
    (e) => {
      e.preventDefault()
      toggleDarkMode()
    },
    [toggleDarkMode]
  )

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        Copyright 2021.{' '}
        <a href='https://www.cbsofyalioglu.com/' rel='me'>
          {config.author}
        </a>
      </div>

      {hasMounted ? (
        <div className={styles.settings}>
          <a
            className={styles.toggleDarkMode}
            onClick={toggleDarkModeCb}
            title='Tottle dark mode'
          >
            {isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
          </a>
        </div>
      ) : null}

      <div className={styles.social}>
        {config.twitter && (
          <a
            className={styles.twitter}
            href={`https://twitter.com/${config.twitter}`}
            title={`Twitter @${config.twitter}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaTwitter />
          </a>
        )}

        {config.github && (
          <a
            className={styles.github}
            href={`https://github.com/${config.github}`}
            title={`GitHub @${config.github}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaGithub />
          </a>
        )}

        {config.linkedin && (
          <a
            className={styles.linkedin}
            href={`https://www.linkedin.com/in/${config.linkedin}`}
            title={`LinkedIn ${config.author}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaLinkedin />
          </a>
        )}
      </div>
      <Home />
    </footer>
  )
}
