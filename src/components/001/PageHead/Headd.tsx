import Head from "next/head";

interface propTypes {
    title?: string;
}
const Headd = (props: propTypes) => {
    const { title="QlickTicket" } = props;
    return(
        <Head>
            <title>{title}</title>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </Head>
    )
}
export default Headd;