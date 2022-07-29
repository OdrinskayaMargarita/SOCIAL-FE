import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { css, Global } from "@emotion/react";
import Head from "next/head";

import AppStartup from "components/hoc/AppStartup";
import { wrapper } from "store/index.new";
import { RouteGuard } from "components/utils/RouteGuard";

import theme from "../views/theme";
import "../i18n";

const MyApp = ({ Component, pageProps }) => {
	return (
		<ThemeProvider theme={theme}>
			<Global
				styles={css`
					html {
						line-height: 1.15;
						-webkit-text-size-adjust: 100%;
					}
					body {
						margin: 0;
						padding: 0;
					}
					h1,
					h2,
					h3,
					h4,
					h5,
					h6,
					p {
						margin: 0;
					}
					* {
						box-sizing: border-box;
					}
				`}
			/>
			<Head>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Open+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600;1,700;1,800&display=swap"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<AppStartup>
				<RouteGuard>
					<Component {...pageProps} />
				</RouteGuard>
			</AppStartup>
		</ThemeProvider>
	);
};

const WrappedApp = wrapper.withRedux(MyApp);

export default WrappedApp;

// export default appWithTranslation(WrappedApp);
