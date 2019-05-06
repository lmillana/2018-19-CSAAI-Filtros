
function main() {
  console.log("En main()....")

  //-- Acceso al objeto con la imagen
  var img = document.getElementById('img')

  //-- Acceso al objeto con el canvas
  var canvas = document.getElementById('display');

  //-- Acceso a los deslizadores: R,G,B
  deslizador_R = document.getElementById('deslizador_R')  //-- ROJO
  deslizador_G = document.getElementById('deslizador_G')  //-- VERDE
  deslizador_B = document.getElementById('deslizador_B')  //-- AZUL

  //-- Valor de los deslizadores:
  range_value_R = document.getElementById('range_value_R')  //-- ROJO
  range_value_G = document.getElementById('range_value_G')  //-- VERDE
  range_value_B = document.getElementById('range_value_B')  //-- AZUL

  //-- Botón para el cambio a escala de grises:
  gris = document.getElementById('gris')

  //-- Botón para volver a la imagen original:
  restart = document.getElementById('restart')

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Obtener el contexto del canvas para
  //-- trabajar con el
  var ctx = canvas.getContext("2d");

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  function toReset () {
    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    //-- Obtener el array con todos los píxeles
    data = imgData.data


    deslizador_R.value = 255;
    deslizador_G.value = 255;
    deslizador_B.value = 255;
  }

  function toRGB() {
    // -- Mostrar el nuevo valor del deslizador:
    range_value_R.innerHTML = deslizador_R.value
    range_value_G.innerHTML = deslizador_G.value
    range_value_B.innerHTML = deslizador_B.value

    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    //-- Obtener el array con todos los píxeles
    data = imgData.data

    //-- Obtener el umbral según el deslizador:
    umbral_R = deslizador_R.value
    umbral_G = deslizador_G.value
    umbral_B = deslizador_B.value

    //-- Filtrar la imagen según el umbral:
    for (var i = 0; i < data.length; i+=4) {
      if (data[i] > umbral_R){
        data[i] = umbral_R;
      }

      if (data[i+1] > umbral_G){
        data[i+1] = umbral_G;
      }

      if (data[i+2] > umbral_B){
        data[i+2] = umbral_B;
      }
    }
  }

  function toGrey() {

    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    //-- Obtener el array con todos los píxeles
    data = imgData.data


    for (var i = 0; i < data.length;i +=4) {
      light = (3 * data[i] + 4 * data[i+1] + data[i+2])/8
        data[i] = light;
        data[i+1] = light;
        data[i+2] = light;
    }
  }

  //-- Funcion de retrollamada del deslizador ROJO:
  deslizador_R.oninput = () => {
    toRGB();
    //-- Poner la imagen modificada en el canvas:
    ctx.putImageData(imgData, 0, 0);
  }
  //-- Funcion de retrollamada del deslizador VERDE:
  deslizador_G.oninput = () => {
    toRGB();
    //-- Poner la imagen modificada en el canvas:
    ctx.putImageData(imgData, 0, 0);
  }
  //-- Funcion de retrollamada del deslizador AZUL:
  deslizador_B.oninput = () => {
    toRGB();
    //-- Poner la imagen modificada en el canvas:
    ctx.putImageData(imgData, 0, 0);
  }

  gris.onclick = () => {
    toGrey();
    //-- Poner la imagen modificada en el canvas:
    ctx.putImageData(imgData, 0, 0);
  }

  restart.onclick = () => {
    toReset();
    //-- Poner la imagen modificada en el canvas:
    ctx.putImageData(imgData, 0, 0);
  }

}
