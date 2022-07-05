interface IColors {
  colorA1: string;
  colorA2: string;
  colorA3: string;
  colorA4: string;
  colorA5: string;
  colorA6: string;
  colorA7: string;
  colorA8: string;
  colorA9: string;
  colorA10: string;
  colorA11: string;
  colorA12: string;
  colorA13: string;
}

const generalType1: IColors = {
  colorA1: '#FFF',
  colorA2: '#000',
  colorA3: '#ff3e89',
  colorA4: '#9584ff',
  colorA5: '#9e95da',
  colorA6: '#59518d',
  colorA7: '#313131',
  colorA8: '#65ec99',
  colorA9: '#313131',
  colorA10: '#31313124',
  colorA11: '#FFF5',
  colorA12: 'rgba(148, 132, 255, 0.15)',
  colorA13: 'yellow',
};

const getColorsGeneral = (): IColors => {
  return generalType1;
};

const colorsSocial: IColors = getColorsGeneral();

export {colorsSocial};
