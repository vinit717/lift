document.addEventListener("DOMContentLoaded ", () => {
  const floorValue = document.querySelector("#floor-input");
  const liftValue = document.querySelector("#lift-input");
  const confirmbtn = document.querySelector(".confirm-btn");
  const floorContainer = document.querySelector(".floors-container");
  const liftSection = document.querySelector(".floor");
  confirmbtn.addEventListener("click", (e) => generateBtn(e));
});

// const section = document.querySelector(".container");

//check the input

function generateBtn(e) {
  e.preventDefault();
  let totalfloors;
  let totallifts;
  if (floorValue.value > 16) {
    alert("only 15 floors is availabe!!");
  }
  if (liftValue.value > 8) {
    alert("Only 7 lifts is availabe!!");
  }
  if (liftValue.Value < 0 || floorValue.Value < 0) {
    alert("negative number is not allowed");
  }
  if (floorValue.value) {
    totalfloors = Number(floorValue.value);
  } else {
    alert("please enter floors");
  }
  if (liftValue.value) {
    totallifts = Number(liftValue.value);
  } else {
    alert("please enter lifts");
  }
}

// section.classList.add("floor");
// const createSection = document.createElement("section");
function floorMaking() {
  for (let i = 0; i < totalfloors; i++) {
    var rowfloor = document.createElement("section");
    rowfloor.setAttribute("class", "floor");
    console.log(rowfloor);
    floorContainer.append(rowfloor);
    const floors = ` <div class="floor-no-${i} floor-common">
    <div class="btn-floor ">
    <h1>Floor-${i}</h1>
    <button class="call-btn" id="${i}">call</button>
    </div>
</div>
    `;
    rowfloor.innerHTML = floors;
    floorContainer.append(rowfloor);
  }
}
function liftMaking() {
  for (let i = 0; i < totallifts; i++) {
    var liftSection = document.createElement("div");
    liftSection.setAttribute("class", "lift");
    rowfloor.append(liftSection);
    const lifts = `<div class="left-door "></div>
    <div class="right-door "></div>
    `;
    liftSection.innerHTML = lifts;
    const groundFloor = document.querySelector(".floor-no-0");
    groundFloor.append(liftSection);
  }
}

function liftMovement() {
  const mainArea = document.querySelector(".floors-container");
  let height = mainArea.offsetHeight;
  console.log(height);

  const floorHeight = height / totalfloors;
  const randomFloor = document.querySelector(".floor");
  const spacing = parseInt(
    getComputedStyle(randomFloor).marginTop.slice(0, -2)
  );

  console.log(spacing);

  const liftBtn = document.querySelectorAll(".call-btn");
  liftBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      const floorId = parseInt(e.target.id);
      console.log(floorId);
      console.log("lift btn pressed");

      const liftMove = document.querySelector(".lift");
      liftMove.style.transform = `translateY(-${floorHeight * floorId}px)`;
      liftMove.style.transition = `all  ${floorId * 2}s ease-in-out`;
    });
  });
}
function doorMovement() {
  let liftLeftmove = document.querySelector(".left-door");
  liftLeftmove.classList.add("left-move");
  let liftRightmove = document.querySelector(".right-door");
  liftRightmove.classList.add("right-move");
}
