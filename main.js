let totalfloors;
let totallifts;
let liftArray = [];
let map = new Map();
document.addEventListener("DOMContentLoaded", () => {
  // console.log("first");
  const confirmbtn = document.querySelector(".confirm-btn");

  // const form = document.querySelector(".input-values");
  // form.addEventListener("submit", (e) => {
  //   e.preventDefault();

  //   console.log("subtk");
  // });
  confirmbtn.addEventListener("click", (e) => {
    console.log("inserted btn");
    generateBtn();
  });
});

// const section = document.querySelector(".container");

//check the input

function generateBtn() {
  // e.preventDefault();
  const floorValue = document.querySelector("#floor-input");
  const liftValue = document.querySelector("#lift-input");
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
  floorMaking();
  liftMaking();
  liftMovement();
  let inputCheck = document.querySelector(".input-values");
  if (floorValue.value && liftValue.value) {
    inputCheck.classList.add("hidden");
  }
}

// section.classList.add("floor");
// const createSection = document.createElement("section");
function floorMaking() {
  const floorContainer = document.querySelector(".floors-container");
  console.log(totalfloors);
  for (let i = 0; i < totalfloors; i++) {
    var rowfloor = document.createElement("section");
    rowfloor.setAttribute("class", "floor");
    console.log(rowfloor);
    floorContainer.append(rowfloor);
    const floors = ` <div class="floor-no-${i} floor-common">
    <div class="btn-floor ">
    <h1>Floor-${i}</h1>
    <button class="call-btn" id="${i}">Call</button>
    </div>
</div>
    `;
    rowfloor.innerHTML = floors;
    floorContainer.append(rowfloor);
  }
}
function liftMaking() {
  let liftContainer = document.querySelector(".floor");
  for (let i = 0; i < totallifts; i++) {
    var liftSection = document.createElement("div");
    liftSection.setAttribute("class", "lift");
    liftContainer.append(liftSection);
    const lifts = `<div class="left-door "></div>
    <div class="right-door "></div>
    `;
    liftSection.id = `lift-${i}`;
    liftArray.push(`lift-${i}`);
    map.set(`lift-${i}`, true);

    liftSection.innerHTML = lifts;
    const groundFloor = document.querySelector(".floor-no-0");
    groundFloor.append(liftSection);
  }
  console.log(liftArray);
  console.log(map);
}

function liftMovement() {
  const liftBtn = document.querySelectorAll(".call-btn");
  liftBtn.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const floorId = parseInt(e.target.id);
      console.log(floorId);
      console.log("lift btn pressed");

      getFreeLift(floorId);
      // console.log(liftId);
      // map.set(liftId, false);
    });
  });
}
function movingLift(liftId, floorId) {
  const mainArea = document.querySelector(".floors-container");
  let height = mainArea.offsetHeight;
  console.log(height);

  const floorHeight = height / totalfloors;
  const randomFloor = document.querySelector(".floor");
  const spacing = parseInt(
    getComputedStyle(randomFloor).marginTop.slice(0, -2)
  );

  const liftMove = document.querySelector(`#${liftId}`);

  liftMove.style.transform = `translateY(-${floorHeight * floorId}px)`;
  liftMove.style.transition = `all  ${floorId + 1 * 2}s ease-in-out`;
  liftMove.addEventListener("transitionend", () => doorMovement(liftId), {
    once: true,
  });
}

function doorMovement(liftId) {
  const liftMove = document.querySelector(`#${liftId}`);
  let liftLeftmove = document.querySelector(".left-door");
  let liftRightmove = document.querySelector(".right-door");

  liftLeftmove.classList.add("left-move-open");
  liftRightmove.classList.add("right-move-open");
  setTimeout(() => {
    liftLeftmove.classList.add("left-move-close");
    liftRightmove.classList.add("right-move-close");
    liftLeftmove.classList.remove("left-move-open");
    liftRightmove.classList.remove("right-move-open");
  }, 2500 * 2);
  setTimeout(() => {
    liftLeftmove.classList.remove("left-move-close");
    liftRightmove.classList.remove("right-move-close");
    // liftMove.classList.remove("busy");
    map.set(liftId, true);
  }, 2500 * 4);
}
function getFreeLift(floorId) {
  let notFound = true;
  while (notFound) {
    for (const liftId of liftArray) {
      if (map.get(liftId)) {
        console.log(liftId);
        notFound = false;
        map.set(liftId, false);
        movingLift(liftId, floorId);
        return;
      }
    }
  }

  // map vlaues of true and false
  // timing of lifts
}
