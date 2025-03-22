// components/Seo.tsx
import { Helmet } from 'react-helmet-async'

interface SeoProps {
  title?: string
  description: string
  keywords?: string
  author?: string
  image?: string
  url?: string
  twitterUsername?: string
  type?: string
}

export default function Seo({
  title,
  description = 'Venha comprar seus tênis no melhor preço! Confira e veja seus produtos favoritos aqui, temos diversas opções para todos os gostos!',
  keywords = 'shoes, react, typescript, vite',
  author = 'Lucas de Lima Martins de Souza',
  image = 'https://i.imgur.com/OW72ewf.png',
  url = 'https://rocketshoes-sand.vercel.app/',
  twitterUsername = '@LmsSouza39',
  type = 'website',
}: Readonly<SeoProps>) {
  return (
    <Helmet title={title}>
      {/* Básico */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content={twitterUsername} />

      {/* Dados Estruturados */}
      <script type="application/ld+json">
        {`
          {
            "@context": "http://schema.org",
            "@type": "SoftwareApplication",
            "name": "${title}",
            "description": "${description}",
            "potentialAction": {
              "@type": "Action",
              "name": "View",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "${url}"
              }
            }
          }
        `}
      </script>
    </Helmet>
  )
}
