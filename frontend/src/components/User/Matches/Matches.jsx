import { useState, useEffect } from 'react'
import Axios from 'axios'
import UserListItem from './UserListItem'
import { useAlert } from '../../utils/AlertProvider'
import PageHeading from '../../utils/PageHeading'
import { useLoading } from '../../utils/LoadingProvider'

export default function Matches() {
  const [matches, setMatches] = useState([])
  const { alert, setAlert } = useAlert()
  const { setIsLoading } = useLoading()

  useEffect(() => {
    async function getMatches() {
      setIsLoading(true)
      try {
        const response = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}user/matches`)
        if (response.status === 200) {
          console.log(response.data)
          setAlert({
            message: "Fetch successful.",
            type: "success"
          })
          setMatches(response.data)
        }
        else if(response.status === 201) {
          setMatches([])
        }
      } catch (err) {
        console.log(`${err.message}`)
        setAlert({
          message: "Error fetching matches."
        })
      }
      setIsLoading(false)
    }

    getMatches()
  }, [])

  return (
    <div className='w-full max-w-4xl mx-auto px-4 md:px-6 py-6 min-h-96'>
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <PageHeading>Matches</PageHeading>
          {matches.length > 0 &&
            <span className="text-sm font-grotesk text-slate-500 dark:text-slate-400">{matches.length} connection{matches.length === 1 ? '' : 's'}</span>
          }
        </div>
        <div className="card w-full mb-5 p-3 md:p-4 overflow-hidden animate-scale-in">
          <ul className="flex flex-col gap-1">
            {matches.length > 0 ? (
              matches.map((user, index) => (
                <UserListItem key={index} user={user} />
              ))
            ) : (
              <li className="flex flex-col items-center text-center py-16 text-slate-500 dark:text-slate-400">
                <span className="text-4xl mb-3">🤝</span>
                <span className="font-grotesk font-medium text-slate-700 dark:text-slate-200">No matches yet</span>
                <span className="text-sm mt-1">Head to Swipe and start swapping skills.</span>
              </li>
            )}
          </ul>
        </div>
    </div>
  )
}