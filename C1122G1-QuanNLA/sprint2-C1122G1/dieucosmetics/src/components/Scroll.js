import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'


export default function Scroll() {
    const [goToTop, setGoToTop] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            setGoToTop(window.scrollY >= 100)
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    const pathName = useLocation()
    const handleGoToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    useEffect(() => {
    }, [pathName])
    return (
        <>
            {goToTop && (
                <button style={{
                    position: 'fixed',
                    right: 40,
                    bottom: 40,
                    fontSize: 30,
                    width: 50,
                    borderRadius: 30,
                    color: 'rgb(202, 112, 154)',
                    zIndex: 999
                }}
                    onClick={() => { handleGoToTop() }}
                >
                    <i className='bi bi-chevron-up' />
                </button>
            )}
        </>
    )

}