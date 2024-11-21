import { useEffect, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

// Define Topic structure
// 定义课题结构
class Topic {
  constructor(title, description, proposer, proposerLink, grantor, grantAmount) {
    this.title = title;              // 标题
    this.description = description;   // 描述
    this.proposer = proposer;        // 提出人
    this.proposerLink = proposerLink; // 提出人链接
    this.grantor = grantor;          // 资助人
    this.grantAmount = grantAmount;  // 资助金额
    this.date = new Date();          // 提出日期 - initialized with current date
  }
}

// Initialize some example topics
const initialTopics = [
  new Topic(
    "The Evolution of Cryptographic Organizations from an Organizational Sociology Perspective: Case Studies of Bitcoin and Ethereum",
    "Based on the theoretical framework of 'organizational sociology', this research analyzes the organizational structure and evolution of Bitcoin and Ethereum, filling the gap in cryptographic research from an organizational social perspective.",
    "LeeDuckGo",
    "https://leeduckgo.com",
    "",
    ""
  ),
  // Add more topics as needed
];

export default function Topics() {
  const dateFormat = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }
  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(true)

  

  // useEffect(() => {
  //   async function fetchPapers() {
  //     try {
  //       const response = await fetch('https://api.desci.cyou/api/top_sci_rss/rss?category=cs.AI')
  //       const data = await response.json()
  //       if (data.code === 0) {
  //         setPapers(data.data)
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch papers:", error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchPapers()
  // }, [])

  return (
    <main className="max-w-[52rem] mx-auto px-4 pb-28 sm:px-6 md:px-8 xl:px-12 lg:max-w-6xl">
      <header className="py-16 sm:text-center">
        <h1 className="mb-4 text-3xl sm:text-4xl tracking-tight text-slate-900 font-extrabold dark:text-slate-200">
          Topics
        </h1>
        <p className="text-lg text-slate-700 dark:text-slate-400">
          🧪✨ Match the Grantor and the Topics, supporting c00l Topics for the next DECADE.
        </p>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="border p-3 text-left">Title</th>
              <th className="border p-3 text-left">Description</th>
              <th className="border p-3 text-left">Proposer</th>
              <th className="border p-3 text-left">Grantor</th>
              <th className="border p-3 text-left">Amount</th>
              <th className="border p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {initialTopics.map((topic, index) => (
              <tr key={index} className="border-b hover:bg-slate-50 dark:hover:bg-slate-700">
                <td className="border p-3">{topic.title}</td>
                <td className="border p-3">{topic.description}</td>
                <td className="border p-3">
                  <a href={topic.proposerLink} className="text-blue-500 hover:underline">
                    {topic.proposer}
                  </a>
                </td>
                <td className="border p-3">{topic.grantor}</td>
                <td className="border p-3">{topic.grantAmount}</td>
                <td className="border p-3">
                  {topic.date.toLocaleDateString(undefined, dateFormat)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </main>
  )
}

Topics.layoutProps = {
  meta: {
    title: 'AI Research Papers',
    description: 'Latest AI research papers from arXiv.',
  },
}
