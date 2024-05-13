// DOM ELEMENTS
const circleElement = document.querySelector(".circle");
const spinnerElement = document.querySelector(".spinner");
const infoContainerElement = document.querySelector(".info-container");
const checkMarkElement = document.querySelector(".check-mark");
const crossMarkElement = document.querySelector(".cross-mark");

const captureElement = document.querySelector("#capture");
const stateNameElement = document.querySelector("#state-name");
const businessUpdateElement = document.querySelector("#business-update");

const fcoRankOneUsernameElement = document.querySelector(
  "#fco-rank-one-username"
);
const fcoRankTwoUsernameElement = document.querySelector(
  "#fco-rank-two-username"
);
const fcoRankThreeUsernameElement = document.querySelector(
  "#fco-rank-three-username"
);
const fcoRankOneAmountElement = document.querySelector("#fco-rank-one-amount");
const fcoRankTwoAmountElement = document.querySelector("#fco-rank-two-amount");
const fcoRankThreeAmountElement = document.querySelector(
  "#fco-rank-three-amount"
);

const bmRankOneUsernameElement = document.querySelector(
  "#bm-rank-one-username"
);
const bmRankTwoUsernameElement = document.querySelector(
  "#bm-rank-two-username"
);
const bmRankThreeUsernameElement = document.querySelector(
  "#bm-rank-three-username"
);
const bmRankOneAmountElement = document.querySelector("#bm-rank-one-amount");
const bmRankTwoAmountElement = document.querySelector("#bm-rank-two-amount");
const bmRankThreeAmountElement = document.querySelector(
  "#bm-rank-three-amount"
);

const umRankOneUsernameElement = document.querySelector(
  "#um-rank-one-username"
);
const umRankTwoUsernameElement = document.querySelector(
  "#um-rank-two-username"
);
const umRankThreeUsernameElement = document.querySelector(
  "#um-rank-three-username"
);
const umRankOneAmountElement = document.querySelector("#um-rank-one-amount");
const umRankTwoAmountElement = document.querySelector("#um-rank-two-amount");
const umRankThreeAmountElement = document.querySelector(
  "#um-rank-three-amount"
);

const amRankOneUsernameElement = document.querySelector(
  "#am-rank-one-username"
);
const amRankTwoUsernameElement = document.querySelector(
  "#am-rank-two-username"
);
const amRankThreeUsernameElement = document.querySelector(
  "#am-rank-three-username"
);
const amRankOneAmountElement = document.querySelector("#am-rank-one-amount");
const amRankTwoAmountElement = document.querySelector("#am-rank-two-amount");
const amRankThreeAmountElement = document.querySelector(
  "#am-rank-three-amount"
);

// VARIABLES

// CONFIGS
const config = {
  fetchLeaderboardPerformerData: {
    bgColor: "#0f655e",
    message: "Fetching leaderboard performers data.",
  },

  preparingLeaderboardData: {
    bgColor: "#757109",
    message: "Preparing leaderboard data.",
  },

  generatingLeaderboardImages: {
    bgColor: "#b30a5e",
    message: "Generating leaderboard images.",
  },

  uploadImages: {
    bgColor: "#d57308",
    message: "Uploading images to the server.",
  },
  error: {
    bgColor: "#d50808",
    message: "Something went wrong. Please refresh the page.",
  },
  success: {
    bgColor: "#396e0a",
    message: "Hola! All images were uploaded successfully.",
  },
};

const leaderboardImages = [];
const leaderBoardData = [];
const leaderboardDataApiUrl =
  "https://tih-dev.annapurnamsme.net/document/get/all/leaderboard";
const uploadImageApiUrl =
  "https://tih-dev.annapurnamsme.net/document/leaderBoard/callback";
let responseData = undefined;

// METHODS
async function pause(time) {
  const promise = new Promise((resolve) => setTimeout(resolve, time));
  await promise;
}

function changeElementStyles({ bgColor, message }) {
  circleElement.style.backgroundColor = bgColor;
  spinnerElement.style.borderBottomColor = bgColor;
  const infoElement = document.querySelector(".info");
  infoElement.remove();
  const newInfoElement = document.createElement("span");
  newInfoElement.classList.add("info", "info-animation-in");
  newInfoElement.innerText = message;
  infoContainerElement.append(newInfoElement);
}

function uploadDone() {
  spinnerElement.style.borderColor = config.success.bgColor;
  checkMarkElement.classList.add("check-mark-anime");
}

function triggerError(message) {
  spinnerElement.style.borderColor = config.error.bgColor;
  crossMarkElement.classList.add("cross-mark-anime");
  changeElementStyles({
    ...config.error,
    message,
  });
}

function getFormattedName({ nameOne, nameTwo = "", rs = false }) {
  if (!nameOne) return "";
  if (!rs) return `${nameOne} - ${nameTwo}`;
  return `Rs. ${nameOne}`;
}

function setLeaderboardPerformersData({ data }) {
  data.forEach((item) => {
    const indexOfLeaderboardData = leaderBoardData.findIndex(
      (leaderboardItem) => leaderboardItem.state === item.state
    );
    const rankKeyName =
      item.rank === "1"
        ? "rankOne"
        : item.rank === "2"
        ? "rankTwo"
        : "rankThree";
    if (indexOfLeaderboardData === -1) {
      leaderBoardData.push({
        state: item.state,
        fco: {
          [rankKeyName]: {
            username: item.fcoName || "",
            branch: item.fcoBranch || "",
            amount: item.fcoDisbAmount || "",
          },
        },
        bm: {
          [rankKeyName]: {
            username: item.bmName || "",
            branch: item.bmBranch || "",
            amount: item.bmDisbAmount || "",
          },
        },
        um: {
          [rankKeyName]: {
            username: item.umName || "",
            branch: item.umBranch || "",
            amount: item.umDisbAmount || "",
          },
        },
        am: {
          [rankKeyName]: {
            username: item.amName || "",
            branch: item.amBranch || "",
            amount: item.amDisbAmount || "",
          },
        },
      });
    } else {
      leaderBoardData[indexOfLeaderboardData] = {
        ...leaderBoardData[indexOfLeaderboardData],
        fco: {
          ...leaderBoardData[indexOfLeaderboardData].fco,
          [rankKeyName]: {
            username: item.fcoName || "",
            branch: item.fcoBranch || "",
            amount: item.fcoDisbAmount || "",
          },
        },
        bm: {
          ...leaderBoardData[indexOfLeaderboardData].bm,
          [rankKeyName]: {
            username: item.bmName || "",
            branch: item.bmBranch || "",
            amount: item.bmDisbAmount || "",
          },
        },
        um: {
          ...leaderBoardData[indexOfLeaderboardData].um,
          [rankKeyName]: {
            username: item.umName || "",
            branch: item.umBranch || "",
            amount: item.umDisbAmount || "",
          },
        },
        am: {
          ...leaderBoardData[indexOfLeaderboardData].am,
          [rankKeyName]: {
            username: item.amName || "",
            branch: item.amBranch || "",
            amount: item.amDisbAmount || "",
          },
        },
      };
    }
  });
}

async function captureImage(state) {
  const dataUrl = await domtoimage.toPng(captureElement);
  leaderboardImages.push({
    state,
    dataUrl: dataUrl.replace("data:image/png;base64,", ""),
  });
}

async function generateImages() {
  const currentDate = new Date();
  const month = currentDate.getMonth();
  const formattedDate = `${currentDate.getDate()}-${month < 10 ? `0${month}` : month}-${currentDate.getFullYear()}`
  for (const performer of leaderBoardData) {
    stateNameElement.innerHTML = `${performer.state.toUpperCase()} STATE`;
    businessUpdateElement.innerHTML = `Business update as of ${formattedDate}`;
    businessUpdateElement.innerHTML = `Business update as of ${formattedDate}`;

    fcoRankOneUsernameElement.innerHTML = getFormattedName({
      nameOne: performer.fco.rankOne.username,
      nameTwo: performer.fco.rankOne.branch,
    });
    fcoRankTwoUsernameElement.innerHTML = getFormattedName({
      nameOne: performer.fco.rankTwo.username,
      nameTwo: performer.fco.rankTwo.branch,
    });
    fcoRankThreeUsernameElement.innerHTML = getFormattedName({
      nameOne: performer.fco.rankThree.username,
      nameTwo: performer.fco.rankThree.branch,
    });
    fcoRankOneAmountElement.innerHTML = getFormattedName({
      nameOne: performer.fco.rankOne.amount,
      rs: true,
    });
    fcoRankTwoAmountElement.innerHTML = getFormattedName({
      nameOne: performer.fco.rankTwo.amount,
      rs: true,
    });
    fcoRankThreeAmountElement.innerHTML = getFormattedName({
      nameOne: performer.fco.rankThree.amount,
      rs: true,
    });

    bmRankOneUsernameElement.innerHTML = getFormattedName({
      nameOne: performer.bm.rankOne.username,
      nameTwo: performer.bm.rankOne.branch,
    });
    bmRankTwoUsernameElement.innerHTML = getFormattedName({
      nameOne: performer.bm.rankTwo.username,
      nameTwo: performer.bm.rankTwo.branch,
    });
    bmRankThreeUsernameElement.innerHTML = getFormattedName({
      nameOne: performer.bm.rankThree.username,
      nameTwo: performer.bm.rankThree.branch,
    });
    bmRankOneAmountElement.innerHTML = getFormattedName({
      nameOne: performer.bm.rankOne.amount,
      rs: true,
    });
    bmRankTwoAmountElement.innerHTML = getFormattedName({
      nameOne: performer.bm.rankTwo.amount,
      rs: true,
    });
    bmRankThreeAmountElement.innerHTML = getFormattedName({
      nameOne: performer.bm.rankThree.amount,
      rs: true,
    });

    umRankOneUsernameElement.innerHTML = getFormattedName({
      nameOne: performer.um.rankOne.username,
      nameTwo: performer.um.rankOne.branch,
    });
    umRankTwoUsernameElement.innerHTML = getFormattedName({
      nameOne: performer.um.rankTwo.username,
      nameTwo: performer.um.rankTwo.branch,
    });
    umRankThreeUsernameElement.innerHTML = getFormattedName({
      nameOne: performer.um.rankThree.username,
      nameTwo: performer.um.rankThree.branch,
    });
    umRankOneAmountElement.innerHTML = getFormattedName({
      nameOne: performer.um.rankOne.amount,
      rs: true,
    });
    umRankTwoAmountElement.innerHTML = getFormattedName({
      nameOne: performer.um.rankTwo.amount,
      rs: true,
    });
    umRankThreeAmountElement.innerHTML = getFormattedName({
      nameOne: performer.um.rankThree.amount,
      rs: true,
    });

    amRankOneUsernameElement.innerHTML = getFormattedName({
      nameOne: performer.am.rankOne.username,
      nameTwo: performer.am.rankOne.branch,
    });
    amRankTwoUsernameElement.innerHTML = getFormattedName({
      nameOne: performer.am.rankTwo.username,
      nameTwo: performer.am.rankTwo.branch,
    });
    amRankThreeUsernameElement.innerHTML = getFormattedName({
      nameOne: performer.am.rankThree.username,
      nameTwo: performer.am.rankThree.branch,
    });
    amRankOneAmountElement.innerHTML = getFormattedName({
      nameOne: performer.am.rankOne.amount,
      rs: true,
    });
    amRankTwoAmountElement.innerHTML = getFormattedName({
      nameOne: performer.am.rankTwo.amount,
      rs: true,
    });
    amRankThreeAmountElement.innerHTML = getFormattedName({
      nameOne: performer.am.rankThree.amount,
      rs: true,
    });

    await pause(500);
    await captureImage(performer.state);
  }
}

async function run() {
  // PAUSE CODE FOR 4 SECONDS
  await pause(4000);

  // INFORM USER WHILE FETCHING DATA
  changeElementStyles(config.fetchLeaderboardPerformerData);

  // CALLING API TO GET LEADERBOARD PERFORMERS DATA
  try {
    const response = await fetch(leaderboardDataApiUrl);
    responseData = await response.json();

    if (responseData?.statusCode !== 200) {
      triggerError(
        "Failed to fetch leaderboard data. Please refresh the page."
      );
      return;
    }
  } catch (error) {
    triggerError("Failed to fetch leaderboard data. Please refresh the page.");
    return;
  }

  // PAUSE CODE FOR 4 SECONDS
  await pause(4000);

  // INFORM USER WHILE PREPARING LEADERBOARD DATA
  changeElementStyles(config.preparingLeaderboardData);

  // SETTING UP DATA OF LEADERBOARD PERFORMERS
  setLeaderboardPerformersData(responseData);

  // PAUSE CODE FOR 4 SECONDS
  await pause(4000);

  // INFORM USER WHILE GENERATING LEADERBOARD IMAGES
  changeElementStyles(config.generatingLeaderboardImages);

  // GENERATING LEADERBOARD IMAGES
  await generateImages();

  // PAUSE CODE FOR 4 SECONDS
  await pause(4000);

  // INFORM USER WHILE UPLOADING IMAGES
  changeElementStyles(config.uploadImages);

  // CALL UPLOAD IMAGE API
  try {
    const response = await fetch(uploadImageApiUrl, {
      method: "POST",
      body: JSON.stringify({ callBacks: leaderboardImages }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    responseData = await response.json();
    if (responseData?.statusCode !== 200) {
      triggerError(
        "Failed to upload leaderboard images. Please refresh the page."
      );
      return;
    }
  } catch (error) {
    triggerError(
      "Failed to upload leaderboard images. Please refresh the page."
    );
    return;
  }

  // PAUSE CODE FOR 4 SECONDS
  await pause(4000);

  // INFORM USER WHEN SUCCESSFUL
  changeElementStyles(config.success);

  // GENERATING LEADERBOARD IMAGES
  uploadDone();
}

run();
