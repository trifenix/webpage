import React from 'react'
import PropTypes from 'prop-types'
import ScrollableAnchor from 'react-scrollable-anchor'
import { graphql, StaticQuery } from 'gatsby'




import Section from './section'
import { SectionCards, Card } from './card'
import SectionBoxes from './box'
import Subscribe from './formRegister'
import SectionWatch from './sectionWatch'
import SectionPhone from './sectionPhone'

import {  access,  boxes, control, form } from 'data/home.yml'
import { theme } from 'library/utils'
import { retinaImage } from 'polished';
import DividerStart from './backgrounds/start'

const Home = () => {
  
  return (
    <StaticQuery
      query={graphql`
        query {
          index : contentfulIndex(text : {eq : "index"}){
            wideContent{
              titulo
              imagen{
                title
                fluid(maxWidth: 657) {
                  ...GatsbyContentfulFluid_withWebp_noBase64
                }
              }
              contenido {
                  childMarkdownRemark{
                    html : rawMarkdownBody
                  }
                
              }
              blog{
                slug
              }
            }
            cards{
              id
              idNumber
              titulo
               contenido {
                  childMarkdownRemark{
                    html
                  }
                
              }
              imagen{
                title
                file{
                  url
                }
                
              }
              
            }
          }
        }
      `}
      render={({ index }) => (
        <>
          
          <ScrollableAnchor id={index.wideContent[0].blog.slug}>
            <div>
              <Section
                title={index.wideContent[0].titulo}
                content={index.wideContent[0].contenido.childMarkdownRemark.html}
                padding={'14vh 0 8vh'}
                
              />
            </div>
          </ScrollableAnchor>
          <SectionPhone image={index.wideContent[0].imagen}/>
          <DividerStart />
          <ScrollableAnchor id={index.wideContent[1].blog.slug}>
            <div>
              <Section
                title={index.wideContent[1].titulo}
                content={index.wideContent[1].contenido.childMarkdownRemark.html}
                padding={'14vh 0 8vh'}
                color={{
                  background: theme.whiteFont
                }}
              />
            </div>
          </ScrollableAnchor>
          <SectionPhone image={index.wideContent[1].imagen}/>
          
          
          
          <SectionCards>
            { index.cards.map(card => 
              {
                console.log(card)

                return (
                  <Card
                    key={card.idNumber}
                    title={card.titulo}
                    img={card.imagen.file.url}
                    card={card.idNumber}
                  />
                )

              }
              )
            }
          </SectionCards>
          <Section
            title={access.title}
            content={access.subTitle}
            background= {access.background}
          />
          <SectionBoxes
            data={boxes}
          />
          <Section
            title={control.title}
            content={control.subTitle}
            padding={'20vh 0 0'}
          />
          <Subscribe
            title={form.title}
            button={form.button}
          />
        </>
      )}
    />
  )
}



export default Home;