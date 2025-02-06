import Link from 'next/link'

const AboutPage = () => {
    return(
        <div className="bg-[url(/images/sky4.jpg)] w-screen h-screen bg-left bg-cover bg-no-repeat flex items-center justify-center px-[40px]">
            <div className="w-full max-w-[600px] h-[400px] sm:-mt-[50px] -mt-0 flex flex-col gap-[40px] text-white">
                <h1 className="text-4xl custom-shadow">
                    About
                </h1>
                <p className="text-xl darker-shadow">
                    Do you ever walk outside and find that the weather is completely different from what was forecasted?
                    If so, this app is for you! 
                    <br/>
                    <br/>
                    The website calls the OpenWeather API to get the current weather forecast of your current location, 
                    then takes the adjectives of that forecast, and sends it to the Merriam Webster Dictionary Thesaurus API to 
                    get synonyms for each of those words, which then falls from the sky using 3js.
                    <br/>
                    <br/>
                    Enjoy the uselessness!
                </p>
            </div>
            {/* nav */}
            <div className="absolute top-0 w-full h-fit flex justify-end py-[16px] px-[60px]">
            <Link href="/" className="text-white text-2xl custom-shadow">
            Useless Weather App
            </Link>
            </div>
            {/* nav
            <div className="absolute w-full h-fit top-0 flex py-[16px] px-[60px] justify-end">
                <Link href="/" className="text-white text-2xl custom-shadow">
                Useless Weather App
                </Link>
            </div> */}
        </div>
    )
}

export default AboutPage