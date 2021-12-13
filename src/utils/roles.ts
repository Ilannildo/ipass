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
