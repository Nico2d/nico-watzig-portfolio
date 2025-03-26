'use client'

import { useEffect } from "react"

export const TestUI = () => {
	const width = window.innerWidth
	console.log('width: ', width)


    useEffect

	return <p>My test client component: {width}</p>
}
