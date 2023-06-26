import { Content } from "./Content.js"
import { Box } from "./Box.js";
import React from 'react';

export const Layout = ({ children }) => (
    <Box
        css={{
            maxW: "100%"
        }}
    >
        {children}
        <Content />
    </Box>
);
