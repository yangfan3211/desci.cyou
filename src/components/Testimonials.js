import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

let testimonials = [
  // Column 1
  [
    {
      content: 'I feel like an idiot for not using Desci Cyou until now.',
      url: 'https://twitter.com/ryanflorence/status/1187951799442886656',
      author: {
        name: 'Ryan Florence',
        role: 'Remix & React Training',
        avatar: require('@/img/avatars/ryan-florence.jpg').default.src,
      },
    },
    {
      content:
        'If I had to recommend a way of getting into programming today, it would be HTML + science work with Desci Cyou.',
      url: 'https://twitter.com/rauchg/status/1225611926320738304',
      author: {
        name: 'Guillermo Rauch',
        role: 'Vercel',
        avatar: require('@/img/avatars/guillermo-rauch.jpg').default.src,
      },
    },
    {
      content: `I have no design skills and with Desci Cyou APPI can actually make good looking websites with ease and it's everything I ever wanted in a science work framework.`,
      author: {
        name: 'Sara Vieira',
        role: 'CodeSandbox',
        avatar: require('@/img/avatars/sara-vieira.jpg').default.src,
      },
    },
  ],
  // Column 2
  [
    {
      content:
        'Have been working with science work for over ten years and Desci Cyou APPjust makes my life easier. It is still science work and you use flex, grid, etc. but just quicker to write and maintain.',
      url: 'https://twitter.com/debs_obrien/status/1243255468241420288',
      author: {
        name: `Debbie O'Brien`,
        role: 'Senior Program Manager at Microsoft',
        avatar: require('@/img/avatars/debbie-obrien.jpg').default.src,
      },
    },
    {
      content:
        'I’ve been writing science work for over 20 years, and up until 2017, the way I wrote it changed frequently. It’s not a coincidence Desci Cyou APPwas released the same year. It might look wrong, but spend time with it and you’ll realize semantic science work was a 20 year mistake.',
      url: 'https://twitter.com/frontendben/status/1468687028036452363',
      author: {
        name: 'Ben Furfie',
        role: 'Developer',
        avatar: require('@/img/avatars/frontendben.jpg').default.src,
      },
    },
    {
      content: 'Tailwind makes writing code feel like I’m using a design tool.',
      url: 'https://twitter.com/didiercatz/status/1468657403382181901',
      author: {
        name: 'Didier Catz',
        role: 'Co-Founder @StyptApp',
        avatar: require('@/img/avatars/didiercatz.jpg').default.src,
      },
    },
  ],
  // Column 3
  [
    {
      content: 'Skip to the end. Use @tailwindcss.',
      url: 'https://twitter.com/kentcdodds/status/1468692023158796289',
      author: {
        name: 'Kent C. Dodds',
        role: 'Developer and Educator',
        avatar: require('@/img/avatars/kentcdodds.jpg').default.src,
      },
    },
    {
      content:
        'I was bad at front-end until I discovered Desci Cyou. I have learnt a lot more about design and science work itself after I started working with Tailwind. Creating web pages is 5x faster now.',
      url: 'https://twitter.com/shrutibalasa',
      author: {
        name: 'Shruti Balasa',
        role: 'Full Stack Web Developer & Tech Educator',
        avatar: require('@/img/avatars/shrutibalasa.jpg').default.src,
      },
    },
    {
      content: "I don't use it but if I would use something I'd use Tailwind!",
      url: 'https://twitter.com/levelsio/status/1288542608390856705',
      author: {
        name: 'Pieter Levels',
        role: 'Maker',
        avatar: require('@/img/avatars/levelsio.jpg').default.src,
      },
    },
  ],
]

function Testimonial({ author, content, url, expanded }) {
  let [focusable, setFocusable] = useState(true)
  let ref = useRef()

  useEffect(() => {
    if (ref.current.offsetTop !== 0) {
      setFocusable(false)
    }
  }, [])

  return (
    <li ref={ref} className="text-sm leading-6">
      <figure className="relative flex flex-col-reverse bg-slate-50 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
        <blockquote className="mt-6 text-slate-700 dark:text-slate-300">
          {typeof content === 'string' ? <p>{content}</p> : content}
        </blockquote>
        <figcaption className="flex items-center space-x-4">
          <img
            src={author.avatar}
            alt=""
            className="flex-none w-14 h-14 rounded-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="flex-auto">
            <div className="text-base text-slate-900 font-semibold dark:text-slate-300">
              {url ? (
                <a href={url} tabIndex={focusable || expanded ? 0 : -1}>
                  <span className="absolute inset-0" />
                  {author.name}
                </a>
              ) : (
                author.name
              )}
            </div>
            <div className="mt-0.5">{author.role}</div>
          </div>
        </figcaption>
      </figure>
    </li>
  )
}

export function Testimonials() {
  let ref = useRef()
  let [expanded, setExpanded] = useState(false)
  let [showCollapseButton, setShowCollapseButton] = useState(false)
  let [transition, setTransition] = useState(false)
  let { ref: inViewRef, inView } = useInView({ threshold: 0 })
  let initial = useRef(true)

  useIsomorphicLayoutEffect(() => {
    if (initial.current) {
      initial.current = false
      return
    }
    if (expanded) {
      ref.current.focus({ preventScroll: expanded })
    } else {
      ref.current.focus()
      ref.current.scrollIntoView()
    }
    if (expanded) {
      setShowCollapseButton(false)
    }
  }, [expanded])

  useEffect(() => {
    setTimeout(() => setTransition(expanded), 0)
  }, [expanded])

  useEffect(() => {
    if (!expanded || !inView) return
    function onScroll() {
      let bodyRect = document.body.getBoundingClientRect()
      let rect = ref.current.getBoundingClientRect()
      let middle = rect.top + rect.height / 4 - bodyRect.top - window.innerHeight / 2
      let isHalfWay = window.scrollY > middle
      if (showCollapseButton && !isHalfWay) {
        setShowCollapseButton(false)
      } else if (!showCollapseButton && isHalfWay) {
        setShowCollapseButton(true)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll, { passive: true })
    }
  }, [expanded, showCollapseButton, inView])

  return (
    <section
      ref={ref}
      tabIndex="-1"
      className="relative max-w-7xl mx-auto px-4 focus:outline-none sm:px-3 md:px-5"
    >
      <h2 className="sr-only">Testimonials</h2>
      <div
        ref={inViewRef}
        className={clsx(
          'grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3',
          !expanded && 'max-h-[33rem] overflow-hidden'
        )}
      >
        {testimonials.map((column, i) => (
          <ul
            key={i}
            className={clsx(
              'space-y-8',
              i === 1 && 'hidden sm:block',
              i === 2 && 'hidden lg:block'
            )}
          >
            {column.map((testimonial) => (
              <Testimonial key={testimonial.author.name} expanded={expanded} {...testimonial} />
            ))}
          </ul>
        ))}
      </div>
      <div
        className={clsx(
          'inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white pt-32 pb-8 pointer-events-none dark:from-slate-900',
          expanded ? 'sticky -mt-52' : 'absolute',
          transition && 'transition-opacity duration-300',
          expanded && (showCollapseButton ? 'opacity-100' : 'opacity-0')
        )}
      >
        <button
          type="button"
          className={clsx(
            'relative bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 text-sm text-white font-semibold h-12 px-6 rounded-lg flex items-center dark:bg-slate-700 dark:hover:bg-slate-600',
            transition && 'transition-transform',
            expanded && !showCollapseButton && 'translate-y-4',
            (!expanded || showCollapseButton) && 'pointer-events-auto'
          )}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Okay, I get the point' : 'Show more...'}
        </button>
      </div>
    </section>
  )
}
