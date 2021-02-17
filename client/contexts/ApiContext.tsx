import React, { useMemo, FC, createContext } from "react";
import axios, { AxiosInstance } from "axios";

const ApiContext = createContext<AxiosInstance>(axios);

interface IProps {
    baseURL: string;
}

export const ApiProvider: FC<IProps> = ({ baseURL, children }) => {

    const client = useMemo(() => {
        const instance = axios.create({ baseURL });

        return instance;

    }, [])

    return <ApiContext.Provider value={client}>{children}</ApiContext.Provider>;
};

export default ApiContext;