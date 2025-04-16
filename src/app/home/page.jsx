import { Button } from "@mui/material"
import Home from "../../components/Home/home"

export default function Page() {
    console.log(process.env.NEXT_PUBLIC_BASE_URL);
    return (
        <Home />
    )
}