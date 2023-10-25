import { Stack, Typography } from "@mui/material";
import { Border } from "../theme/utils";
import { Colors } from "../theme/colors";
import { useEffect, useState } from "react";

type Props = {
  response: string;
};

export const ChatResponsePage = ({ response }: Props) => {
  const initialText = response;
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const textArray = initialText.split("");
    let currentText = "";

    const displayTextInterval = setInterval(() => {
      if (textArray.length > 0) {
        currentText += textArray.shift();
        setDisplayText(currentText);
      } else {
        clearInterval(displayTextInterval);
      }
    }, 30);

    return () => clearInterval(displayTextInterval);
  }, [initialText]);
  return (
    <Stack marginTop={3}>
      <Typography fontSize={20} marginRight={"6px"}>
        Odpověď na Váš dotaz :
      </Typography>
      <Stack border={Border.Grey.Thick} width={"1000px"} bgcolor={Colors.grey50} padding={3} marginY={2}>
        {displayText}
      </Stack>
    </Stack>
  );
};
