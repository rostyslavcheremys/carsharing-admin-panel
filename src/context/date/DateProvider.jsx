import dayjs from "dayjs";
import "dayjs/locale/uk";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

dayjs.locale("uk");

export const DateLocalizationProvider = ({ children }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
            {children}
        </LocalizationProvider>
    );
};