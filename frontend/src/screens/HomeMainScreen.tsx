
import ImageSlider from "../components/ImageSlider";
import HomeCardGrids from "../components/HomeCardGrids";
import HomeScreenProductCard from "../components/HomeScreenProductCard";
import {NavLink} from "react-router-dom";
import Footer from "../components/Footer";
// @ts-ignore
import {Helmet} from "react-helmet"


export default function HomeMainScreen() {
    return (
        <>
            <Helmet>
                <title>Home</title>
                <meta name="description" content="Home Page" />
            </Helmet>
            <ImageSlider/>
            <HomeCardGrids/>

            <div className={"bg-white"}>
                <div className={"mx-auto sm: px-6 sm: py-6 lg: max-w-6xl lg: px-8"}>
                    <div className={"md: flex md: items-center md: justify-between"}>
                        <h2 className={"text-2xl font-bold tracking-tight text-gray-800"}>Trending Projects</h2>
                        <NavLink to={"/projects"}
                                 className={"hidden text-lg font-medium text-indigo-700 hover:text-blue-600 md:block"}>Find your projects
                            <span aria-hidden={"true"}>&rarr;</span></NavLink>
                    </div>
                </div>
                <HomeScreenProductCard/>
            </div>
            <Footer/>
        </>
    )
}