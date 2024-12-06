export interface IPropsChild { updateUser: (state: UserProfile) => void }

export interface UserProfileResponse {
    active: boolean | null;
    address: string | null;
    countryCode: string | null;
    createdAt: string | null;
    dob: string | null;
    email: string;
    fullName: string | null;
    gender: string | null;
    id: number;
    image: string | null;
    isDeleted: boolean | null;
    latitude: number | null;
    longitude: number | null;
    mobileNumber: string | null;
    password: string | null;
    roleId: number | null;
    status: string | null;
    twoStepVerificationEnabled: boolean | null;
    updatedAt: string | null;
    userStatus: string | null;
}
export interface IFieldData {
    name: string;
    helperText: string;
    required: boolean;
    label: string;
    placeholder: string;
    maxCharacters?: number;
    fullWidth: boolean;
}
export interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: string;
    presentAddress: string;
    permantAddress: string;
    city: string;
    postalCode: string;
    country: string;
    [key: string]: string
}