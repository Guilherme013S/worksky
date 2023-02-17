import React from "react";

export default interface Route {
	path: string;
	component: React.ReactElement;
	auth?: boolean;
}
