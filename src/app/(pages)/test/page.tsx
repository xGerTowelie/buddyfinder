import { auth } from "@/auth"

const TestPage = async () => {
    const session = await auth()

    return (
        <main>
            <h1>SMALL TEST FOR AUTHENTICATION</h1>
            <p>{
                session
                    ? session.user?.name
                    : "not logged in"
            }</p>
        </main>
    )
}

export default TestPage
