import React, { useState } from "react";
import { useStyles } from "./tabsUseStyles";
import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import { translate } from "../../config/i18n";
import SettingsEditProfile from "./settings_edit_profile/SettingsEditProfile";
import { colors } from "../../config/theme";

interface IProps { }

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </Box>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const SettingsTabs: React.FC<IProps> = (props) => {
    const [value, setValue] = useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    const classes = useStyles();


    return (
        <Box className={classes.container}>
            <Typography variant="h2">{translate("settings.settingsText")}</Typography>
            <Paper className={classes.paperContainer}>
                <Box sx={{ paddingLeft: '15px' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        sx={{ "& .MuiTabs-indicator": { backgroundColor: colors.primaryGreen, }, }}
                    >
                        <Tab label="Edit Profile" {...a11yProps(0)}
                            className={classes.tab}
                            style={{
                                color: '#14ACA4',
                                textTransform: 'capitalize',
                                fontWeight: '700',
                                paddingBottom: '3px'
                            }} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <SettingsEditProfile />
                </CustomTabPanel>
            </Paper>
        </Box>
    );
};

export default SettingsTabs;
