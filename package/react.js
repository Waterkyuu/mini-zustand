import { useState } from "react";
import { createStore } from "./vanilla.js";

const create = (createState) => {
	const store = createStore(createState);
};
