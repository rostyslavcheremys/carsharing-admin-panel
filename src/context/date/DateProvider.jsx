import dayjs from "dayjs";
import "dayjs/locale/uk";

import {
    LocalizationProvider,
    AdapterDayjs
} from "../../libs/mui";

dayjs.locale("uk");

export const DateLocalizationProvider = ({ children }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
            {children}
        </LocalizationProvider>
    );
};