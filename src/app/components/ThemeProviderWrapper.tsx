"use client";

import { Provider } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { store } from '@/store/store';

const theme = createTheme({
    palette: {
        mode: "light",
    },
});

export default function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </Provider>
    );
}