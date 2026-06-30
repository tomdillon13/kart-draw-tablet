  var SodiLW= [];
  var DMAXLW = [];
  var SodiHW = [];
  var DMAXHW = [];
  var SodiIW = [];
  var DMAXIW = []
  var Sodi = []
  var DMAX = []

  var Junior = []
  var Cadet = []

  let arrays ={
    Sodi: Sodi,
    DMAX: DMAX,

    SodiLW: SodiLW,
    DMAXLW: DMAXLW,
    SodiHW: SodiHW,
    DMAXHW: DMAXHW,
    SodiIW: SodiIW,
    DMAXIW: DMAXIW,
    Junior: Junior,
    Cadet: Cadet,

  }


  function drawKart(list) {
      let selectedList = arrays[list];

      if (selectedList.length === 0) {
          document.getElementById('draw').innerHTML = "All karts drawn";
          return;
      }

      const drawElement = document.getElementById('draw');

      // Pick final selection
      const randomIndex = Math.floor(Math.random() * selectedList.length);
      const drawn = selectedList[randomIndex];

      // Animation settings
      let animationCount = 0;
      const animationLength = 20; // number of cycles
      const animationSpeed = 80; // milliseconds

      const animation = setInterval(() => {
          // Show random items while cycling
          const randomPreview = selectedList[
              Math.floor(Math.random() * selectedList.length)
          ];

          drawElement.innerHTML = "Kart: " + randomPreview;

          animationCount++;

          // Stop animation and show final result
          if (animationCount >= animationLength) {
              clearInterval(animation);

              drawElement.innerHTML = "Kart: "+ drawn;

              // Remove selected item after animation
              selectedList.splice(randomIndex, 1);

              console.log(selectedList);
          }

      }, animationSpeed);
  }


  function addKart(list){
    selectedList = arrays[list]
    var kart = document.getElementById("kartAdd").value;
    selectedList.push(kart);
    console.log(selectedList)

    document.getElementById("listFeedback").innerHTML = "List: " + selectedList.toString();

  }
  function removeKart(list){
    selectedList = arrays[list]
    selectedList.pop();

    document.getElementById("listFeedback").innerHTML = "List: " + selectedList.toString();

  }

  function OpenMenu(){
    document.getElementById("sideMenu").style.width="250px";
  }
  function CloseMenu(){
    document.getElementById("sideMenu").style.width = "0px";
  }
