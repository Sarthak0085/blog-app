import MainLayout from "../../components/MainLayout"
import Articles from "./container/Article"
import CTA from "./container/CTA"
import Hero from "./container/Hero"

const HomePage = () => {
    return (
        <MainLayout>
            <Hero />
            <Articles />
            <CTA />
        </MainLayout>

    )
}

export default HomePage