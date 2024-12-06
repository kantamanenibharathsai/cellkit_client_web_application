import React, { useState } from "react";
import { useStyles, style } from "./useStyles";
import { translate } from "../../config/i18n";
import {
  Box,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  styled,
} from "@mui/material";
import CommonInput from "../common/commonInput/CommonInput";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommonButton from "../common/commonButton/CommonButton";
import CommonWhiteBg from "../common/commonWhiteBg/CommonWhiteBg";
interface IProps {}

type TnewPlanType =
  | "planName"
  | "coveragePeriod"
  | "planValue"
  | "coverageDescription"
  | "deductibleText"
  | "additionalFee"
  | "totalPrice"
  | "discountAvailable"
  | "basePrice"
  | "releaseDate"
  | "warrantyInfo";

interface IFeildData {
  name: TnewPlanType;
  helperText: string;
  required: boolean;
  label: string;
  placeholder: string;
  maxCharacters?: number;
  fullWidth: boolean;
}

const newProtectionPlanFeilds: IFeildData[] = [
  {
    helperText: "",
    name: "planName",
    label: translate("settings.planNameText"),
    placeholder: translate("settings.planTextPlaceHolder"),
    required: true,
    maxCharacters: 90,
    fullWidth: true,
  },
  {
    helperText: "",
    name: "coveragePeriod",
    label: translate("settings.coveragePeriod"),
    placeholder: translate("settings.coveragePlaceholder"),
    required: true,
    fullWidth: false,
  },
  {
    helperText: "",
    name: "planValue",
    label: translate("settings.planValue"),
    placeholder: translate("settings.planValuePlaceholder"),
    required: true,
    fullWidth: false,
  },
  {
    helperText: "",
    name: "coverageDescription",
    label: translate("settings.coverageDescription"),
    placeholder: "",
    required: true,
    maxCharacters: 90,
    fullWidth: true,
  },
  {
    helperText: "",
    name: "deductibleText",
    label: translate("settings.deductibleText"),
    placeholder: translate("settings.planValuePlaceholder"),
    required: true,
    fullWidth: false,
  },
];

const priceNInventoryFeildData: IFeildData[] = [
  {
    helperText: "",
    name: "basePrice",
    label: translate("settings.basePriceText"),
    placeholder: translate("settings.basePricePlaceholder"),
    required: true,
    fullWidth: false,
  },
  {
    helperText: "",
    name: "basePrice",
    label: translate("settings.additionalFeeText"),
    placeholder: translate("settings.additionalFeePlaceholder"),
    required: true,
    fullWidth: false,
  },
  {
    helperText: "",
    name: "totalPrice",
    label: translate("settings.totalPriceText"),
    placeholder: translate("settings.totalPricePlaceholder"),
    required: true,
    fullWidth: false,
  },
  {
    helperText: "",
    name: "discountAvailable",
    label: translate("settings.discountAvailText"),
    placeholder: translate("settings.discountAvailPlaceholder"),
    required: true,
    fullWidth: false,
  },
];

const additionalInfoFeilds: IFeildData[] = [
  {
    helperText: "",
    name: "releaseDate",
    label: translate("settings.releaseDate"),
    placeholder: translate("settings.releaseDatePlaceholder"),
    required: true,
    fullWidth: false,
  },
  {
    helperText: "",
    name: "warrantyInfo",
    label: translate("settings.warrantyInfo"),
    placeholder: translate("settings.planValuePlaceholder"),
    required: true,
    fullWidth: false,
  },
];

const settingPageData = [
  {
    name: translate("settings.addNewProtectionHeading"),
    list: newProtectionPlanFeilds,
  },
  {
    name: translate("settings.priceAndInventoryText"),
    list: priceNInventoryFeildData,
  },
  {
    name: translate("settings.specificationText"),
    list: translate("settings.specificatoinDescription"),
  },
  {
    name: translate("settings.coverageDescription"),
    list: translate("settings.coverageDescriptionDescription"),
  },
  {
    name: translate("settings.exclutionsText"),
    list: translate("settings.exclutionsDescriptions"),
  },
  {
    name: translate("settings.additionalInfoText"),
    list: additionalInfoFeilds,
  },
];

const StyledAccordion = styled(Accordion)(
  () => ({
    transition: "all 0.3s ease",
    "&:before": { display: "none" },
    borderBottom: "none",
    width: "min(100%,748px)",
  })
);

const StyledAccordionSummary = styled(AccordionSummary)(
  ({ expanded }: { expanded: boolean }) => ({
    borderBottom: expanded ? "1px solid #EFEFF4" : "1px solid #EFEFF4",
    marginBottom: expanded ? "1rem" : "auto",
    minHeight: "4.5rem"
  })
);

const Settings: React.FC<IProps> = (props) => {
  const [name, setName] = useState<Record<string, string>>({});
  const [activePannel, setActivePannel] = useState<string | false>(false);
  const classes = useStyles();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleAccordiaChange =
    (pannel: string) => (event: React.SyntheticEvent, isExanded: boolean) => {
      setActivePannel(isExanded ? pannel : false);
    };

  return (
    <Box className={classes.container}>
      <Typography variant="h2">{translate("settings.settingsText")}</Typography>
      <CommonWhiteBg>
        {settingPageData.map((section, index) => (
          <StyledAccordion
            key={section.name}
            disableGutters={true}
            expanded={activePannel === "pannel" + index}
            className={classes.accordion}
            onChange={handleAccordiaChange("pannel" + index)}
          >
            <StyledAccordionSummary
              expanded={activePannel === "pannel" + index}
              className={classes.accordionSummery}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="h4">{section.name}</Typography>
            </StyledAccordionSummary>
            <AccordionDetails className={classes.accordionSummery}>
              {Array.isArray(section.list) && (
                <Grid container columnSpacing={"1rem"} rowGap={"1.5rem"}>
                  {section.list.map(({ fullWidth, ...plan }) => (
                    <Grid item xs={fullWidth ? 12 : 6}>
                      <CommonInput
                        key={plan.label}
                        {...plan}
                        value={name[plan.name] || ""}
                        onChange={handleChange}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
              {typeof section.list === "string" && (
                <Typography>{section.list}</Typography>
              )}
            </AccordionDetails>
          </StyledAccordion>
        ))}
        <CommonButton title="Save" styles={style.button} />
      </CommonWhiteBg>
    </Box>
  );
};

export default Settings;
