(function(exports) {
  "use strict";

  function Medida(valor,tipo)
  {
    /* tipo es opcional. Debería admitir  new Medida("45.2 Km") */
    /* ademas de new Medida(45.2, "Km") */
      this.valor = valor;
      this.tipo = tipo;
  }

  Temperatura.prototype = new Medida ();
  Temperatura.prototype.constructor = Temperatura;

  function Temperatura(valor,tipo)
  {
    /* tipo es opcional. Debería admitir new Medida("45.2 F") */
    Medida.call(this,valor,tipo);
  }

  Celsius.prototype = new Temperatura ();
  Celsius.prototype.constructor = Celsius;

  function Celsius(valor)
  {
    Temperatura.call(this,valor);
  }

  Celsius.prototype.toFarenheit = function () {
    return (((this.valor*9)/5)+32);
  }

  Celsius.prototype.toKelvin = function () {
    return this.valor+273.15;
  }

  Farenheit.prototype = new Temperatura ();
  Farenheit.prototype.constructor = Farenheit;

  function Farenheit(valor)
  {
    Temperatura.call(this,valor);
  }

  Farenheit.prototype.toCelsius = function () {
    return ((this.valor-32)/1.800);
  }

  Farenheit.prototype.toKelvin = function () {
    return (((this.valor-32)/1.8)+273.15);
  }

  Kelvin.prototype = new Temperatura ();
  Kelvin.prototype.constructor = Kelvin;


  function Kelvin(valor)
  {
    Temperatura.call(this,valor);
  }

  Kelvin.prototype.toFarenheit = function () {
    return this.valor-273.15;
  }

  Kelvin.prototype.toCelsius = function () {
    return ((this.valor-273.15)*1.8)+32;
  }

  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;
  exports.Kelvin = Kelvin;

  exports.convertir = function() {
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted'),
        /* Extienda la RegeExp a la especificación. use una XRegExp */
        /*regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([cfk]+)\s*(to)?\s+([cfk])$/i;*/
        xregexp =XRegExp ('(?<valor> [ ]*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)[ ]*) #valor \n' +
                          '(?<tipo> ([cfk]+)[ ]*) #tipo \n' +
                          '(?<opt> (to)?[ ]+) #opt \n' +
                          '(?<to>  (([cfk])[ ]*) #to','x');
        valor     = X.RegExp.exec(valor,xregexp);

    if (valor) {
      var numero = valor.valor,
      tipo   = valor.tipo.toLowerCase();
      var  to = valor.to.toLowerCase();

      numero = parseFloat(numero);
      console.log("Valor: " + numero + ", Tipo: " + tipo);

      switch (tipo) {
        case 'c':
          var celsius = new Celsius(numero);
          if(to=='f')
          elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
          if(to=='k')
            elemento.innerHTML = celsius.toKelvin().toFixed(2) + " Kelvin";
          if(to=='c')
            elemento.innerHTML = "Ya esta en Celsius";
          break;
        case 'f':
          var farenheit = new Farenheit(numero);
          if(to=='c')
            elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
          if(to=='k')
            elemento.innerHTML = farenheit.toKelvin().toFixed(2) + "Kelvin";
          if(to=='f')
            elemento.innerHTML = "Ya esta en farenheint";
          break;
        case 'k':
          var kelvin = new Kelvin(numero);
            if(to=='c')
              elemento.innerHTML = kelvin.toCelsius().toFixed(2) + " Celsius";
            if(to=='f')
              elemento.innerHTML = kelvin.toFarenheit().toFixed(2) + "Farenheit";
            if(to=='k')
              elemento.innerHTML = "Ya esta en Kelvin";
            break;

        default:
          /* rellene este código */
      }
    }
    else
      elemento.innerHTML = "Error pruebe a introduciar algo como: 32F C";
  }
})(this);
