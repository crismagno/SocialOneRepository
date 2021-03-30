type colors = { colors: Array<string> }
interface Color {
    splashInit: colors,
    signIn: colors
};

const typeColorPrimary: Color = {
    splashInit: {
        colors: ["#FFF", "#000"],
    },
    signIn: {
        colors: ["#FFF", "#000"]
    }
};

const getColorByChoose = (): Color => {
    return typeColorPrimary;
};

export default {
    ...getColorByChoose()
};