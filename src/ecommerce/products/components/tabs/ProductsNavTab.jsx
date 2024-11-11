
import React, { useState } from "react";

const ProductTabs = ["Productos", "Categorías"];

const ProductNavTab = ({ setCurrentCategory }) => {
    // Estado para controlar la pestaña actual
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const handleChange = (e) => {
        const selectedTab = e.target.innerText.toUpperCase();
        setCurrentCategory(selectedTab); // Actualiza la categoría actual
        setCurrentTabIndex(selectedTab === "PRODUCTOS" ? 0 : 1);
    };

    return (
        <Box sx={{ border: (theme) => `2px solid ${theme.palette.divider}`, mx: 1, padding: 0.5 }}>
            <Tabs
                value={currentTabIndex}
                variant={"fullWidth"}
                onChange={handleChange}
                aria-label="Product tabs"
                textColor="primary"
            >
                {ProductTabs.map((tab) => (
                    <Tab key={tab} label={tab} />
                ))}
            </Tabs>
        </Box>
    );
};

export default ProductNavTab;