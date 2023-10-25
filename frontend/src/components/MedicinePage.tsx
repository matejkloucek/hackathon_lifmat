import { Medicine } from "../model/Medicine";
import { Button, Dialog, IconButton, Stack, Typography } from "@mui/material";
import { Border, FontWeight } from "../theme/utils";
import { Colors } from "../theme/colors";
import { MedicineDetailBox } from "./MedicineDetailBox";
import LinkIcon from "@mui/icons-material/Link";
import { useState } from "react";
import QRCode from "qrcode.react";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";

type Props = {
  medicine: Medicine;
};

export const MedicinePage = ({ medicine }: Props) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [pdfPath, setPdfPath] = useState<string>("");

  const handleClose = () => {
    setDialogOpen(false);
  };
  const alternativesText = () => {
    if (medicine.alternativeMedicines.length > 1 && medicine.alternativeMedicines.length < 5) {
      return (
        <Stack direction={"row"} marginTop={5}>
          <Typography fontSize={20} marginRight={"6px"}>
            Pro lék
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            {medicine.name}
          </Typography>
          <Typography fontSize={20} marginRight={"6px"}>
            byly nalezeny
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            {medicine.alternativeMedicines.length}
          </Typography>
          <Typography fontSize={20}>alternativy :</Typography>
        </Stack>
      );
    } else if (medicine.alternativeMedicines.length > 4) {
      return (
        <Stack direction={"row"} marginTop={5}>
          <Typography fontSize={20} marginRight={"6px"}>
            Pro lék
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            {medicine.name}
          </Typography>
          <Typography fontSize={20} marginRight={"6px"}>
            bylo nalezeno
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            {medicine.alternativeMedicines.length}
          </Typography>
          <Typography fontSize={20}>alternativ :</Typography>
        </Stack>
      );
    } else if (medicine.alternativeMedicines.length === 1) {
      return (
        <Stack direction={"row"} marginTop={5}>
          <Typography fontSize={20} marginRight={"6px"}>
            Pro lék
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            {medicine.name}
          </Typography>
          <Typography fontSize={20} marginRight={"6px"}>
            byla nalezena
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            1
          </Typography>
          <Typography fontSize={20}>alternativa :</Typography>
        </Stack>
      );
    } else {
      return (
        <Stack direction={"row"} marginTop={5}>
          <Typography fontSize={20} marginRight={"6px"}>
            Pro lék
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            {medicine.name}
          </Typography>
          <Typography fontSize={20}>nebyla nalezena žádná alternativa...</Typography>
        </Stack>
      );
    }
  };
  return (
    <Stack marginBottom={10}>
      <Stack direction={"row"} marginTop={5} alignItems={"center"}>
        <Typography fontSize={20} marginRight={"6px"}>
          Detail léku
        </Typography>
        <Typography fontWeight={FontWeight.Bold} fontSize={20}>
          {medicine.name}
        </Typography>
        <Typography fontSize={20} marginLeft={"3px"}>
          :
        </Typography>
        <IconButton
          size={"large"}
          onClick={() => {
            setDialogOpen(true);
            setPdfPath(medicine.pdfDropboxLink);
          }}
        >
          <LinkIcon />
        </IconButton>
      </Stack>
      <Stack border={Border.Grey.Thick} width={"1000px"} bgcolor={Colors.grey50} paddingX={1} marginTop={1}>
        <MedicineDetailBox medicine={medicine} />
      </Stack>
      {alternativesText()}
      {medicine.alternativeMedicines.length > 0 &&
        medicine.alternativeMedicines.map((entry) => (
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
            <MedicineDetailBox medicine={medicine} />
          </Stack>
        ))}
      <Dialog open={dialogOpen} onClose={handleClose}>
        <Stack padding={2} width={"300px"} height={"300px"} alignItems={"center"} justifyContent={"center"}>
          <QRCode value={pdfPath} size={250} />
          <Stack marginTop={2}>
            <Link to={pdfPath}>
              <Button variant={"contained"} endIcon={<LaunchIcon />}>
                <Typography fontWeight={FontWeight.Bold}>OPEN</Typography>
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Dialog>
    </Stack>
  );
};
