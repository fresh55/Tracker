import Container from "./Container";


const Header = () => {
    return (

        <div className="w-full">

            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 mt-4" >
                <div className="flex-1  pl-5 text-lg font-medium">Welcome, John Doe</div>
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0 ">
                        
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Header