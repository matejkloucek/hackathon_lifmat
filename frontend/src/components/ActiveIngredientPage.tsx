import { ActiveIngredientDetail } from "../model/ActiveIngredientDetail";
import { Button, Dialog, IconButton, Stack, Typography } from "@mui/material";
import { Border, FontWeight } from "../theme/utils";
import { Colors } from "../theme/colors";
import { MedicineDetailBox } from "./MedicineDetailBox";
import QRCode from "qrcode.react";
import { useState } from "react";
import LinkIcon from "@mui/icons-material/Link";
import { Link } from "react-router-dom";

type Props = {
  activeIngredient: ActiveIngredientDetail;
};

export const ActiveIngredientPage = ({ activeIngredient }: Props) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [pdfPath, setPdfPath] = useState<string>("");

  const handleClose = () => {
    setDialogOpen(false);
  };
  const alternativeText = () => {
    if (activeIngredient.medicines.length > 4) {
      return (
        <Stack direction={"row"} marginTop={5}>
          <Typography fontSize={20} marginRight={"6px"}>
            Bylo nalezeno
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            {activeIngredient.medicines.length}
          </Typography>
          <Typography fontSize={20} marginRight={"6px"}>
            léčiv obsahující aktivní látku
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            {activeIngredient.name}
          </Typography>
          <Typography>:</Typography>
        </Stack>
      );
    } else if (activeIngredient.medicines.length > 1 && activeIngredient.medicines.length < 5) {
      return (
        <Stack direction={"row"} marginTop={5}>
          <Typography fontSize={20} marginRight={"6px"}>
            Bylo nalezeny
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            {activeIngredient.medicines.length}
          </Typography>
          <Typography fontSize={20} marginRight={"6px"}>
            léčiva obsahující aktivní látku
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            {activeIngredient.name}
          </Typography>
          <Typography>:</Typography>
        </Stack>
      );
    } else if (activeIngredient.medicines.length === 1) {
      return (
        <Stack direction={"row"} marginTop={5}>
          <Typography fontSize={20} marginRight={"6px"}>
            Byl nalezen
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            {activeIngredient.medicines.length}
          </Typography>
          <Typography fontSize={20} marginRight={"6px"}>
            lék obsahující aktivní látku
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            {activeIngredient.name}
          </Typography>
          <Typography>:</Typography>
        </Stack>
      );
    } else {
      return (
        <Stack direction={"row"} marginTop={5}>
          <Typography fontSize={20} marginRight={"6px"}>
            Nebyl nalezen žádný lék obsahující aktivní látku
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20}>
            {activeIngredient.name}
          </Typography>
          <Typography>...</Typography>
        </Stack>
      );
    }
  };
  return (
    <Stack marginBottom={10} marginTop={5}>
      {alternativeText()}
      {activeIngredient.medicines.length > 0 &&
        activeIngredient.medicines.map((entry) => (
          <Stack border={Border.Grey.Thick} width={"1000px"} bgcolor={Colors.grey50} paddingX={1} marginY={3}>
            <Stack direction={"row"}>
              <Typography marginTop={1} fontWeight={FontWeight.Bold} fontSize={20}>
                {entry.name}
              </Typography>
              <IconButton
                size={"large"}
                onClick={() => {
                  setDialogOpen(true);
                  setPdfPath(entry.pdfDropboxLink);
                }}
              >
                <LinkIcon sx={{ marginTop: "3px" }} />
              </IconButton>
            </Stack>
            <MedicineDetailBox medicine={entry} />
          </Stack>
        ))}
      <Dialog open={dialogOpen} onClose={handleClose}>
        <Stack padding={2} width={"300px"} height={"300px"} alignItems={"center"} justifyContent={"center"}>
          <QRCode value={pdfPath} size={250} />
          <Link to={pdfPath}>
            <Button variant={"contained"}>
              <Typography fontWeight={FontWeight.Bold}>OPEN</Typography>
            </Button>
          </Link>
        </Stack>
      </Dialog>
    </Stack>
  );
};
