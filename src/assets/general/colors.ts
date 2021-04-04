interface IColors { 
    colorA1: string,
    colorA2: string,
    colorA3: string, 
    colorA4: string,
}

const generalType1: IColors = {
    colorA1: "#FFF",
    colorA2: "#000",
    colorA3: "#ff3e89",
    colorA4: "#9584ff",
};

const getColorsGeneral = (): IColors => {
    return generalType1;
};

const colorsSocial: IColors = getColorsGeneral();

export {
    colorsSocial
};