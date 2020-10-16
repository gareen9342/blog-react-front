import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        /* 서버사이드 렌더링에서 styledComponents 를 적용하는 방법 */
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                })
            const initialProps = await Document.getInitialProps(ctx)

            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } catch (err) {
            console.error(err)
        } finally {
            sheet.seal()
        }
    }
    render() {
        return (
            <Html>
                <Head />
                <body>
                    <script src="https://polyfill.io/v3/polyfill.min.js?features=default%2Ces2015%2Ces2016%2Ces2017%2Ces2018%2Ces2019"></script>
                    {/* <script src="noflash.js" /> */}
                    <Main />
                    <div id="modal" />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
