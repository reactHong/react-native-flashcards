
const logger = (store) => (next) => (action) => {
  console.log("-------------");
  console.group(action.type);
    console.log("[logger] action: ", action);
  const result = next(action);
    console.log("[logger] new state: ", store.getState());
  console.groupEnd();
  return result;
};

export default logger;

