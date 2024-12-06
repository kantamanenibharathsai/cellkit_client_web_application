import { toast } from "react-toastify";
import { colors } from "../config/theme";
export const userNameRegex = /^[a-zA-Z-]+$/;
export const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,3}$/;
export const PasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const PhoneRegex = /^[6-9]\d{9}$/;
export const LowerCase = /[a-z]/;
export const UpperCase = /[A-Z]/;
export const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/;
export const NameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
export const NumberRegex = /\D/g;
export const DateOfBirthRegex =
  /^((19[6-9]\d|200[0-4])-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))|((20[01]\d|2005)-(0[1-9]|1[0-2])-(0[1-9]|1\d|2[0-9]|30))$/;
export const PinCodeRegex = /^\d{1,6}$/;
export const AadharRegex =
  /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/;
export const SpaceRegex = /^(?! )[^\s](?!  )[^ \n]+(?! )$/;
export const validInputRegx = /^(?!\s*$).+/;
export const onlyNumbersRegx = /^[1-9]\d*$/;
export const AddressRegex = /^(?!@)[^.#$%\s]+(?:\s[^.#$%\s]+)*$/;
export const Prevent_Plus_Minus_Regex = /^[1-9]\d*$/;
export const licenceNumberRegex =
  /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/;
export const GoogleMapKey = "AIzaSyA5qXJUAX0OlM-l6Yzh3iFBJwhZjF1v_vk";
export type IProps = any;
export const ToastError = (data: string) => {
  toast.error(data, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",

  });
  return;
};
export const VaidateToastError = (data: string) => {
  toast.error(data, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    style:{
      color:colors.white,
      backgroundColor:colors.pieOrenge,
      fontWeight:500,
      textTransform:"capitalize",
      boxShadow: "0px 8px 10px 0px #00000033, 0px 6px 30px 0px #0000001F,0px 16px 24px 0px #00000024",
    }
  });
  return;
};

export const ToastSuccess = (data: string) => {
  toast.success(data, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  return;
};

export const PreventMinusPlus = (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  if (
    event.code === "Minus" ||
    event.code === "NumpadMinus" ||
    event.code === "Equal" ||
    event.code === "NumpadAdd" ||
    (event.code === "ArrowDown" && Number(event.currentTarget.value) <= 0)
  ) {
    event.preventDefault();
  }
};
