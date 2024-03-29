import Document, {Html, Head, Main, NextScript} from "next/document";

export default class CustomDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="stylesheet"
                          href="https://cdn.rawgit.com/mfd/09b70eb47474836f25a21660282ce0fd/raw/e06a670afcb2b861ed2ac4a1ef752d062ef6b46b/Gilroy.css"/>
                </Head>
                <body>
                <Main/>
                </body>
                <NextScript/>
            </Html>
        );
    }
}