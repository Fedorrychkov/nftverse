import { css } from "@emotion/react";
import { normalize } from "polished";

export const globalStyles = css`
  ${normalize()}

  body {
		font-family: 'Poppins', sans-serif;
		font-weight: 400;
		line-height: 1.38;
		max-width: 100%;
		overflow-x: hidden;
		overflow-y: scroll;

		&.-hidden {
			overflow: hidden;
		}
	}
`
