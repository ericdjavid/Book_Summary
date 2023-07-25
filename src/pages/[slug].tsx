
/*
| Developed by Reskue
| Filename: [slug].tsx
| Author: eric@reskue.art
*/

import React from 'react'
//import { styled } from '@mui/material'
import image from '../assets/reskue_art.jpeg';

/*
|--------------------------------------------------------------------------
| Contracts
|--------------------------------------------------------------------------
*/
export interface BookPageProps //extends buttonProps
{
    children?: React.ReactNode,
    book: any
}
/*
|--------------------------------------------------------------------------
| Styles
|--------------------------------------------------------------------------
*/
//const [slug]Styled = styled(Button)(({ theme }) => ({
//borderColor: theme.palette.primary.main,
//[theme.breakpoints.up('md')]: {
//borderColor: theme.palette.secondary.main,
//},
//}))

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
const BookPage: React.FC<BookPageProps> = ({ book }) => {

    console.log(book)
    const router = useRouter()
    // Render
    //--------------------------------------------------------------------------
    return (
        <>
            <NextSeo
                title={`${book.data.attributes.Name} - Reskue`}
                description={book.data.attributes.teaser}
                openGraph={{
                    type: "website",
                    url: StartonUtils.getURL() + router.asPath,
                    title: `${book.data.attributes.Name} - Reskue`,
                    description: book.data.attributes.teaser,
                    images: [
                        {
                            url: process.env.NEXT_PUBLIC_API_URL + book.data.attributes.Image.data.attributes.url ?? image.src,
                            width: 600,
                            height: 600,
                            alt: book.data.attributes.Name,
                        },
                    ],
                }}
            />
            <Box
                m={5}
                p={7}
                display={"flex"}
                flexDirection={"column"}
            >
                <Image
                    src={process.env.NEXT_PUBLIC_API_URL + book.data.attributes.Image.data.attributes.url ?? image.src}
                    alt='image'
                    width={300}
                    height={200}

                />

                <Typography gutterBottom variant="h1" component="div">
                    {book.data.attributes.Name}
                </Typography>
                <Typography gutterBottom variant="h3" component="div">
                    {book.data.attributes.Author}
                </Typography>
                <ReactMarkdown>
                    {book.data.attributes.Summary}
                </ReactMarkdown>
            </Box>

        </>
    )
}

export default BookPage


/*
|--------------------------------------------------------------------------
| Static Props & Path
|--------------------------------------------------------------------------
*/

import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { Box, Typography } from '@mui/material'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import Image from 'next/image'
import { NextSeo } from 'next-seo';
import StartonUtils from 'utils/starton.utils';
import { useRouter } from 'next/router';

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/api/books?populate=*"
    );
    const books: any = res.data.data;

    const locales = ["en", "fr"];

    const paths = locales.flatMap((locale) =>
        books.map((book: any) => ({
            params: { slug: book.id.toString() },
            locale,
        }))
    );


    return {
        // paths
        paths: [...paths, { params: { name: "next.js", slug: "next" } }],
        fallback: false, // false or "blocking" }
    };
};

export const getStaticProps: GetStaticProps<any> = async ({ params }: any) => {
    if (params) {
        try {
            const res = await axios.get(
                process.env.NEXT_PUBLIC_API_URL + "/api/books/" + params.slug + "?populate=*"
            );
            const book = res.data;
            return { props: { book: book } };
        } catch (e) {
            console.error(e);
        }
    }
    return { notFound: true };
};
