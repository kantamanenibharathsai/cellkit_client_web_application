import React, { ChangeEvent, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useStyles, style } from "./useStyles";
import { translate } from "../../../config/i18n";
import CommonInput from "../../common/commonInput/CommonInput";
import CommonButton from "../../common/commonButton/CommonButton";
import Storage from "../../../utils/Storage";
import { useAppSelector } from "../../../utils/useRedux";
import {
  IFieldData,
  IPropsChild,
  UserProfile,
  UserProfileResponse,
} from "./Interfaces";
import { displayAlertRed } from "../../../utils/toastMessage";
import {
  checkForNumbers,
  checkForSpecialCharacters,
  validatepinCode,
} from "../../../utils/regex";

const EditProfileFormInputs: IFieldData[] = [
  {
    helperText: "",
    name: "firstName",
    label: translate("settings.textFirstName"),
    placeholder: translate("settings.textFirstName"),
    required: true,
    fullWidth: false,
  },
  {
    helperText: "",
    name: "lastName",
    label: translate("settings.textLastName"),
    placeholder: translate("settings.textLastName"),
    required: true,
    fullWidth: false,
  },
  {
    helperText: "",
    name: "email",
    label: translate("settings.textEmail"),
    placeholder: translate("settings.textEmail"),
    required: true,
    fullWidth: false,
  },
  {
    helperText: "",
    name: "password",
    label: translate("settings.textPassword"),
    placeholder: translate("settings.textPassword"),
    required: true,
    fullWidth: false,
  },
  {
    helperText: "",
    name: "dateOfBirth",
    label: translate("settings.textDateOfBirth"),
    placeholder: translate("settings.textDateOfBirth"),
    required: true,
    fullWidth: false,
  },
  {
    helperText: "",
    name: "presentAddress",
    label: translate("settings.textPresentAddress"),
    placeholder: translate("settings.textPresentAddress"),
    required: true,
    fullWidth: false,
  },
  {
    helperText: "",
    name: "permantAddress",
    label: translate("settings.textPermantAddress"),
    placeholder: translate("settings.textPermantAddress"),
    required: true,
    fullWidth: false,
  },
  {
    helperText: "",
    name: "city",
    label: translate("settings.textCity"),
    placeholder: translate("settings.textCity"),
    required: true,
    fullWidth: false,
  },
  {
    helperText: "",
    name: "postalCode",
    label: translate("settings.textPostalCode"),
    placeholder: translate("settings.textPostalCode"),
    required: true,
    fullWidth: false,
  },
  {
    helperText: "",
    name: "country",
    label: translate("settings.textCountry"),
    placeholder: translate("settings.textCountry"),
    required: true,
    fullWidth: false,
  },
];

const EditProfileForm: React.FC<IPropsChild> = (props) => {
  const [editProfileData, setEditProfileData] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    presentAddress: "",
    permantAddress: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const classes = useStyles();

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.name === "firstName" || event.target.name === "lastName") {
      if (checkForNumbers(event.target.value)) {
        displayAlertRed(translate("settings.textNoNumbers"));
        return;
      }
      if (checkForSpecialCharacters(event.target.value)) {
        displayAlertRed(translate("settings.textnoSpecialCharacters"));
        return;
      }
    } else if (event.target.name === "postalCode") {
      if (validatepinCode(event.target.value)) {
        displayAlertRed(translate("settings.textonlyNumbersAllowed"));
        return;
      }

      if (event.target.value.length > 6) {
        displayAlertRed(translate("settings.textmaxSixDigits"));
        return;
      }
    }
    setEditProfileData({
      ...editProfileData,
      [event.target.name]: event.target.value,
    });
  };
  const { userData, token } = useAppSelector((state) => state.Auth);
  const handleSubmit = () => {
    props.updateUser(editProfileData);

    setEditProfileData((prev) => ({
      ...prev,
      password: "",
    }));
  };

  const populateFields = (user: UserProfileResponse) => {
    if (user) {
      const fullName = user.fullName!.split("  ");
      const firstName = fullName[0] || "";
      const lastName = fullName[1] || "";

      setEditProfileData((prev: UserProfile) => ({
        ...prev,
        firstName: firstName,
        lastName: lastName,
        email: user.email,
        dateOfBirth: user.dob ?? "",
        presentAddress: user.address ?? " ",
        permantAddress: "",
        city: "",
        postalCode: "",
        country: "",
      }));
    }
  };

  useEffect(() => {
    const user = Storage.get("user") ?? "";
    populateFields(user);
  }, [userData]);

  return (
    <Grid
      container
      columnSpacing={"3rem"}
      rowGap={"1.5rem"}
      style={{ justifyContent: "center", paddingTop: "5px" }}
    >
      {EditProfileFormInputs.map((item) => (
        <Grid item md={5}>
          <CommonInput
            type={item.name === "password" ? "password" : "text"}
            name={item.name}
            onChange={handleOnChange}
            value={editProfileData[item.name]}
            placeholder={item.placeholder}
            label={item.label}
          />
        </Grid>
      ))}
      <CommonButton title="Save" styles={style.button} onClick={handleSubmit} />
    </Grid>
  );
};

export default EditProfileForm;
