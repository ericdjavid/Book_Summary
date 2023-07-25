/*
| Developed by Starton
| Filename : index.tsx
*/

import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { NextSeo } from 'next-seo'
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Typography } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import axios, { Axios } from 'axios'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import image from '../assets/reskue_art.jpeg';

const Home: NextPage = () => {
	const { t } = useTranslation()
	const router = useRouter()
	const [bookData, setBookData] = useState<any>(null)

	useEffect(() => {
		axios.get(
			process.env.NEXT_PUBLIC_API_URL + "/api/books?populate=*"
		).then((e) => {
			console.log(e)
			setBookData(e)
		}).catch((e) => { console.error(e) })
	}, [])


	if (!bookData)
		return (<>Loading</>)
	return (
		<React.Fragment>
			<NextSeo title={t('index:seo.title')} description={t('index:seo.description')} />
			<Container
				sx={{
					pt: "1rem",
					// height: '100vh',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
				}}
			>
				<Typography variant={'h2'} textAlign={'center'} width={'100%'}>
					Book Summary Pilot Project
				</Typography>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						m: 3,
						gap: 2,
					}}
				>
					{bookData.data.data.map((e: any, index: number) => (
						<Card sx={{
							maxWidth: 345,
							overflow: "hidden",
							maxHeight: "600px"
						}}
							key={e.id}
						>
							<CardActionArea
								onClick={() => router.push("/" + e.id)}
							>
								<CardMedia
									sx={{
									}}
									component="img"
									height="140"
									image={process.env.NEXT_PUBLIC_API_URL + e.attributes.Image.data.attributes.url ?? image.src}
									alt="Book Image"
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										{e.attributes.Name}
									</Typography>
									<Typography gutterBottom variant="body1" component="div">
										{e.attributes.Author}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										<ReactMarkdown>
											{e.attributes.teaser}
										</ReactMarkdown>
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>

					))}
				</Box>
			</Container>
		</React.Fragment>
	)
}

export default Home
