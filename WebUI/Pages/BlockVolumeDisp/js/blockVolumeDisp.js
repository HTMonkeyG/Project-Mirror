function hsvToRgb(h, s, v) {
  let r, g, b, i, f, p, q, t;
  h %= 360;
  h /= 60;
  i = Math.floor(h);
  f = h - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

function getVarietySliceY(bV, y) {
  var result = [];
  for (var xC = 0; xC < bV.xL; xC++)
    for (var zC = 0; zC < bV.zL; zC++) {
      var ind = y + bV.yL * (zC + bV.zL * xC);
      if (result.indexOf(bV.data[ind]) < 0)
        result.push(bV.data[ind])
    }
  return result;
}

function getVariety(bV) {
  var result = [];
  for (var xC = 0; xC < bV.xL; xC++)
    for (var zC = 0; zC < bV.zL; zC++)
      for (var yC = 0; yC < bV.yL; yC++) {
        var ind = yC + bV.yL * (zC + bV.zL * xC);
        if (result.indexOf(bV.data[ind]) < 0)
          result.push(bV.data[ind])
      }
  return result;
}

function update(y) {
  if (!blockVolume) return;
  var C = document.getElementById("disp")
    , CTX = C.getContext('2d')
    , c = 360 / r.length;
  C.width = 16 * blockVolume.xL;
  C.height = 16 * blockVolume.zL;

  for (var xC = 0; xC < blockVolume.xL; xC++)
    for (var zC = 0; zC < blockVolume.zL; zC++) {
      var ind = y + blockVolume.yL * (zC + blockVolume.zL * xC)
        , color = hsvToRgb(c * r.indexOf(blockVolume.data[ind]), 50, 100);
      CTX.fillStyle = `rgb(${color.r},${color.g},${color.b})`;
      CTX.fillRect(16 * xC, 16 * zC, 16, 16);
    }
}

function updateList() {
  var d = document.getElementById("list");
  while (d.firstChild)
    d.removeChild(d.firstChild);
  for (var e of r) {
    var color = hsvToRgb(360 / r.length * r.indexOf(e), 50, 100);
    var f = document.createElement("a")
      , g = document.createElement("a")
      , br = document.createElement("br")
      , div = document.createElement("div");
    f.style = `display:inline-block;width:16px;height:16px;background-color:rgb(${color.r},${color.g},${color.b})`;
    g.innerText = e;

    div.appendChild(f);
    div.appendChild(g);
    d.appendChild(div).appendChild(br);
  }
}

var xhr = new XMLHttpRequest(), blockVolume = null, r = [];
xhr.open("POST", "/load-plugin?plugin-path=../WorldGeneration/TheEndGenerator/plugin.js");

xhr.onload = function (e) {
  console.log(e);
  if (e.target.status != 200) return;

  function handler() {
    var params = {
      x: document.getElementById("x").value,
      z: document.getElementById("z").value,
      seed: document.getElementById("seed").value
    };

    xhr.open("POST", `/block-volume?x=${params.x}&z=${params.z}&seed=${params.seed}`, true);
    xhr.send();
  }

  document.getElementById("x").addEventListener("change", handler);
  document.getElementById("z").addEventListener("change", handler);
  document.getElementById("seed").addEventListener("change", handler);

  xhr.open("POST", "/block-volume?x=0x44&z=0x1b&seed=0x5BD942DD", true);
  xhr.onload = function (e) {
    console.log(e)
    blockVolume = JSON.parse(e.target.response);
    console.log(blockVolume)

    var ySelect = document.getElementById("y");

    r = getVariety(blockVolume);
    updateList();

    ySelect.min = 0;
    ySelect.max = blockVolume.yL;
    update(Number(y.value));

    y.onchange = function (e) {
      console.log(e.target.value);
      update(Number(y.value))
    }
  };

  xhr.send()
};
xhr.send();