import { Header } from "../../components";

export function PageTemplate({...props}){
    return(
        <>   
            <Header />
            <main>
                <div className="max-w-7xl mx-auto">{props.children}</div>
            </main>
        </> 
    )
}