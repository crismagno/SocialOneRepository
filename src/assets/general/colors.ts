interface IColors {
  colorA1: '#FFF';
  colorA2: '#000';
  colorA3: '#ff3e89';
  colorA4: '#9584ff';
  colorA5: '#9e95da';
  colorA6: '#59518d';
  colorA7: '#313131';
  colorA8: '#65ec99';
  colorA9: '#313131';
  colorA10: '#31313124';
  colorA11: '#FFF5';
  colorA12: 'rgba(148, 132, 255, 0.15)';
  colorA13: 'yellow';
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
