export const passwordForce = (pass: string) => {
  let chEspeciais = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;
  let forca = 0;

  if (pass.length >= 6 && pass.length <= 8) {
    forca += 10;
  } else if (pass.length > 8) {
    forca += 25;
  } else {
    forca -= 20;
  }
  if (pass.match(/[a-z]+/)) {
    forca += 10;
  }
  if (pass.match(/[A-Z]+/)) {
    forca += 20;
  }
  if (pass.match(chEspeciais)) {
    forca += 20;
  }
  if (pass.match(/W+/)) {
    forca += 25;
  }

  return forca;
};

export function hexToRgbA(hex: string) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return (
      'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)'
    );
  }
  throw new Error('Bad Hex');
}

export const verifyPasswordForce = (pass: string) => {
  let chEspeciais = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;
  let forca = 0;

  if (pass.length >= 6 && pass.length <= 8) {
    forca += 10;
  } else if (pass.length > 8) {
    forca += 25;
  } else {
    forca -= 20;
  }
  if (pass.match(/[a-z]+/)) {
    forca += 10;
  }
  if (pass.match(/[A-Z]+/)) {
    forca += 20;
  }
  if (pass.match(chEspeciais)) {
    forca += 20;
  }
  if (pass.match(/W+/)) {
    forca += 25;
  }

  return forca;
};
