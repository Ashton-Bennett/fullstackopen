const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "GOOD":
      let updatedObj = { ...state };
      updatedObj = { ...updatedObj, good: (updatedObj.good += 1) };
      return updatedObj;

    case "OK":
      let updatedOk = { ...state };
      updatedOk = { ...updatedOk, ok: (updatedOk.ok += 1) };
      return updatedOk;

    case "BAD":
      let updatedBad = { ...state };
      updatedBad = { ...updatedBad, bad: (updatedBad.bad += 1) };
      return updatedBad;

    case "ZERO":
      return initialState;

    default:
      return state;
  }
};

export default counterReducer;
