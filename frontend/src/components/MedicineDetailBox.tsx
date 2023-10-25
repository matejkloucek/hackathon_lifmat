import { Medicine } from "../model/Medicine";
import { List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { FontWeight } from "../theme/utils";
import ScienceIcon from "@mui/icons-material/Science";
import SickIcon from "@mui/icons-material/Sick";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { MedicineSimple } from "../model/MedicineSimple";

type Props = {
  medicine: Medicine | MedicineSimple;
};

export const MedicineDetailBox = ({ medicine }: Props) => {
  return (
    <Stack>
      <List>
        <ListItem sx={{ alignItems: "flex-start" }}>
          <ListItemIcon sx={{ marginTop: "3px" }}>
            <ScienceIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography fontWeight={FontWeight.Bold}>Účinné látky :</Typography>
            <List>
              {medicine.activeIngredients.map((entry) => (
                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecordIcon style={{ fontSize: 10 }} />
                  </ListItemIcon>
                  <ListItemText sx={{ marginLeft: -3 }}>
                    <Typography>
                      {entry.name} {entry.dosage} {entry.units}
                    </Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </ListItemText>
        </ListItem>
        <ListItem sx={{ alignItems: "flex-start" }}>
          <ListItemIcon>
            <SickIcon sx={{ marginTop: "3px" }} />
          </ListItemIcon>
          <ListItemText>
            <Typography fontWeight={FontWeight.Bold}>Vedlejší účinky :</Typography>
            <List>
              {medicine.adverseEffects.map((entry) => (
                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecordIcon style={{ fontSize: 10 }} />
                  </ListItemIcon>
                  <ListItemText sx={{ marginLeft: -3 }}>
                    <Typography>{entry}</Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </ListItemText>
        </ListItem>
        <ListItem sx={{ alignItems: "flex-start" }}>
          <ListItemIcon>
            <LocalHospitalIcon sx={{ marginTop: "3px" }} />
          </ListItemIcon>
          <ListItemText>
            <Typography fontWeight={FontWeight.Bold}>Kontraindikace :</Typography>
            <List>
              {medicine.contraindications.map((entry) => (
                <ListItem>
                  <ListItemIcon>
                    <FiberManualRecordIcon style={{ fontSize: 10 }} />
                  </ListItemIcon>
                  <ListItemText sx={{ marginLeft: -3 }}>
                    <Typography>{entry}</Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </ListItemText>
        </ListItem>
      </List>
    </Stack>
  );
};
