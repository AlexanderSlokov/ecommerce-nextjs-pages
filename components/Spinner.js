import {BounceLoader, MoonLoader} from "react-spinners";

export default function Spinner({fullWidth}) {
    if(fullWidth) {
        return (
            <div className={"w-full flex justify-center"}>
                <MoonLoader color={'#1E3A8A'} speedMultiplier={2}/>
            </div>
        )
    }

    return (
        <MoonLoader color={'#1E3A8A'} speedMultiplier={2}/>
    );
}