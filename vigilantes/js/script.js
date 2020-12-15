(function () {

  const gameDiv = document.querySelector('#game')

  const FPS = 1;
  let jogoIniciado = false
  let gameDimensions = [1243, 960];
  let focoDimensions = [100, 130];
  let caveiraDimensions = focoDimensions.map((e) => e * 1.2)
  let probFoco = 25;
  let reserva;
  let focos = [];
  let gameLoop;
  let vidas = 5;
  let itemsLifetime = 2000
  let pontos = 0;
  let jogoPausado = false

  let intervaloFocoFogo = [1000, 4000]
  let intervaloFocoCaveira = [5000, 20000]

  let frames = 0

  let hud

  //elemento de alerta
  let alertaElemento

  function beforeInit() {
    alertaElemento = new Alerta()
    init()
  }

  function init() {
    alertaElemento.hidden = true
    reserva = new Reserva();
    jogoIniciado = true
    pontos = 0
    vidas = 5
    focos = []

    if (!hud)
      hud = new Hud();
    hud.initialize()

    gameLoop = setInterval(run, 1000 / FPS);

  }

  window.addEventListener("keydown", function (e) {
    if (e.key === 'o') {
      clearInterval(gameLoop);
    }
  })

  window.addEventListener("keydown", function (e) {
    if (e.key === 'p') {
      if (jogoIniciado && !jogoPausado) {
        clearInterval(gameLoop);
        alertaElemento.alerta('PAUSADO')
        alertaElemento.toggleShow()
      } else if (jogoPausado) {
        alertaElemento.toggleShow()
        setInterval(run, 1000 / FPS);
      }
    }
  })

  window.addEventListener("keydown", function (e) {
    if (e.key === 's' && !jogoIniciado){
      init();
      alertaElemento.hidden = true
    }
  })

  class Hud {
    constructor() {
      this.vidas = document.createElement('div')
      this.vidas.className = 'vidas'

      this.pontuacao = document.createElement('div')
      this.pontuacao.className = 'pontuacao'

      this.element = document.createElement('div')
      this.element.className = 'hud'
      this.element.append(this.vidas, this.pontuacao)

      this.element.style.width = `${gameDimensions[0]}px`;
      this.element.style.height = '100px'
      gameDiv.appendChild(this.element)
    }

    appendLife() {
      let img = document.createElement('img')
      img.src = '../css/assets/arvore.png'
      img.onload = () => {
        this.vidas.appendChild(img)
      }
    }

    formattedPoints() {
      let str = pontos.toString()
      let size = str.length
      for (let i = size; i < 5; i++)
        str = '0' + str
      return str
    }

    loseLife() {
      if (vidas > 0)
        this.vidas.removeChild(this.vidas.children[this.vidas.children.length - 1])
    }

    updateHud() {
      this.pontuacao.innerHTML = this.formattedPoints()
    }

    initialize() {
      this.updateHud()

      for (let i = 0; i < vidas; i++)
        this.appendLife()
    }
  }

  class Alerta {
    constructor() {
      this.element = document.createElement('div');
      this.element.className = 'alerta';
      this.element.hidden = true

      gameDiv.appendChild(this.element)

    }

    alerta(conteudo) {
      this.element.innerHTML = conteudo

    }

    toggleShow() {
      this.element.hidden = !this.element.hidden
    }
  }

  class Reserva {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "reserva";
      this.element.style.width = `${gameDimensions[0]}px`;
      this.element.style.height = `${gameDimensions[1]}px`;
      gameDiv.appendChild(this.element);
    }
  }

  class FocoIncendio {
    constructor() {
      this.initiate();
      this.spawn();
    }

    initiate() {
      this.element = document.createElement("div");
      this.element.className = "foco-incendio";
      this.element.style.width = `${focoDimensions[0]}px`;
      this.element.style.height = `${focoDimensions[1]}px`;

      let pos = this.getValidFirePos()

      this.element.style.left = `${pos[0]}px`;
      this.element.style.top = `${pos[1]}px`;
    }

    spawn() {
      reserva.element.appendChild(this.element);

      let timeout = setTimeout(() => {
        if (!jogoPausado) {
          hud.loseLife();
          vidas--;
          this.element.remove();
        }
      }, itemsLifetime);

      this.element.addEventListener('click', () => {
        this.element.remove();
        clearTimeout(timeout);
        pontos = pontos + 10
      })


    }

    isValidPos(x, y) {
      return !(((x < 0) && (y < 0)) ||
        ((x > 635 && x < 1150) && (y > 0 && y < 203)) || // primeiro lago
        ((x > 0 && x < 240) && (y > 440 && y < 745)) // segundo lago
      )
    }

    rand(val) {
      return Math.floor((Math.random() * val))
    }

    getValidFirePos() {
      let [x, y] = [-1, -1]
      for (; !this.isValidPos(x, y);)
        [x, y] = [
          this.rand(gameDimensions[0] - focoDimensions[0]),
          this.rand(gameDimensions[1] - focoDimensions[1])
        ]
      return [x, y]
    }
  }



  class Caveira {
    constructor() {
      this.initiate();
      this.spawn();
    }

    initiate() {
      this.element = document.createElement("div");
      this.element.className = "foco-caveira";
      this.element.style.width = `${caveiraDimensions[0]}px`;
      this.element.style.height = `${caveiraDimensions[1]}px`;

      let pos = this.getValidFirePos()

      this.element.style.left = `${pos[0]}px`;
      this.element.style.top = `${pos[1]}px`;
    }

    spawn() {
      reserva.element.appendChild(this.element);

      let timeout = setTimeout(() => {
        if (!jogoPausado) {
          hud.loseLife();
          hud.loseLife();
          vidas--;
          vidas--;
        }
        this.element.remove();
      }, itemsLifetime);

      this.element.addEventListener('click', () => {
        this.element.remove();
        clearTimeout(timeout);
        pontos = pontos + 10
      })


    }

    isValidPos(x, y) {
      return !(((x < 0) && (y < 0)) ||
        ((x > 635 && x < 1150) && (y > 0 && y < 203)) || // primeiro lago
        ((x > 0 && x < 240) && (y > 440 && y < 745)) // segundo lago
      )
    }

    rand(val) {
      return Math.floor((Math.random() * val))
    }

    getValidFirePos() {
      let [x, y] = [-1, -1]
      for (; !this.isValidPos(x, y);)
        [x, y] = [
          this.rand(gameDimensions[0] - caveiraDimensions[0]),
          this.rand(gameDimensions[1] - caveiraDimensions[1])
        ]
      return [x, y]
    }
  }

  function raiseDifficulty() {
    if (intervaloFocoFogo[1] > 100)
      intervaloFocoFogo[1] = intervaloFocoFogo[1] - 100

    if (intervaloFocoCaveira[1] > 100)
      intervaloFocoCaveira[1] = intervaloFocoCaveira[1] - 100

  }

  function run() {
    if (vidas > 0 && !jogoPausado) {
      frames++;

      if (frames % 60)
        raiseDifficulty()

      let calcTimeoutFogo = Math.floor(intervaloFocoFogo[1] * Math.random())

      setTimeout(() => {
        let foco = new FocoIncendio();
        focos.push(foco);
      }, (calcTimeoutFogo < intervaloFocoFogo[0]) ? intervaloFocoFogo[0] : calcTimeoutFogo)

      let calcTimeoutCaveira = Math.floor(intervaloFocoCaveira[1] * Math.random())

      setTimeout(() => {
        let foco = new Caveira();
        focos.push(foco);
      }, (calcTimeoutCaveira < intervaloFocoCaveira[0]) ? intervaloFocoCaveira[0] : calcTimeoutCaveira)

    } else {
      clearInterval(gameLoop);
      jogoIniciado = false

      alertaElemento.alerta('FIM DE JOGO')
      alertaElemento.toggleShow()
      alert("Fim de Jogo ! Clique em OK e pressione S para jogar novamente.");
    }

    hud.updateHud()
  }

  beforeInit()
})();