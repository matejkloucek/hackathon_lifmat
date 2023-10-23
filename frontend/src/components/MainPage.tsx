import {Stack, Typography} from "@mui/material";
import {PageHeader} from "./PageHeader";
import {Border} from "../theme/utils";
import {Colors} from "../theme/colors";

export const MainPage = () => {
    return (
        <>
            <PageHeader/>
            <Stack alignItems={"center"} marginTop={2}>
                <Stack border={Border.Grey.Thick} width={"50%"} minWidth={"400px"} bgcolor={Colors.grey50} height={"500px"}>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                        blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                        neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                        quasi quidem quibusdam.
                    </Typography>
                </Stack>
            </Stack>
        </>
    );
}