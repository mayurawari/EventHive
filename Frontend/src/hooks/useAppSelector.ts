import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { Rootstate } from "../app/store"; 


export const useAppSelector : TypedUseSelectorHook<Rootstate> = useSelector;